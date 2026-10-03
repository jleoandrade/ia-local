// Busca modelos novos no Hugging Face e estima como rodam neste PC.
// Roda todo dia pelo GitHub Actions e grava models-auto.json, que o site carrega.
import { readFile, writeFile } from "node:fs/promises";

// Hardware (ajuste aqui se trocar de peça)
const VRAM_GB = 12;   // RTX 3060
const GPU_BW = 360;   // GB/s da VRAM
const RAM_GB = 56;    // RAM livre para o modelo (64 GB menos o sistema)
const RAM_BW = 30;    // GB/s da RAM (DDR4-1866, 2 canais)
const EFF = 0.7;      // fração da banda aproveitada na prática

const MIN_DOWNLOADS = 1000;  // ignora uploads sem tração
const MAX_MODELS = 200;
const API = "https://huggingface.co/api/models";

// Tarefa do Hugging Face → categoria do site
const TASKS = {
  "text-generation": "text", "image-text-to-text": "text",
  "text-to-image": "img", "image-to-image": "img",
  "text-to-video": "vid", "image-to-video": "vid",
  "automatic-speech-recognition": "stt", "text-to-speech": "tts",
  "feature-extraction": "emb", "sentence-similarity": "emb",
};

// Onde procurar: GGUF dos conversores conhecidos (mais novos primeiro)
// e, para áudio e embeddings, os mais em alta de cada tarefa.
const SOURCES = [
  ...["unsloth", "ggml-org", "lmstudio-community", "city96", "QuantStack"]
    .map((a) => ({ url: `${API}?author=${a}&filter=gguf&sort=createdAt&direction=-1&limit=100`, weights: "gguf" })),
  ...["automatic-speech-recognition", "text-to-speech", "feature-extraction", "sentence-similarity"]
    .map((t) => ({ url: `${API}?pipeline_tag=${t}&sort=trendingScore&direction=-1&limit=40`, weights: "safetensors" })),
];

const FILE = new URL("../models-auto.json", import.meta.url);

async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  return res.json();
}

// Detalhes do modelo: tamanho (gguf/safetensors) e ficha (licença, idiomas, modelo de origem).
// A lista não traz esses campos, por isso é uma chamada à parte.
const detailsOf = (id) => getJson(`${API}/${id}`);

// Frase com os metadados da ficha do modelo no Hugging Face.
function metadata(info, weights) {
  const card = info.cardData ?? {};
  const base = [].concat(card.base_model ?? [])[0];
  const maker = base ? base.split("/")[0] : weights === "safetensors" ? info.author : null;
  const parts = [];
  const ctx = info.gguf?.context_length;
  if (ctx) parts.push(`Contexto de até ${Math.round(ctx / 1024)} mil tokens.`);
  const langs = [].concat(card.language ?? []).map((l) => String(l).toLowerCase());
  if (langs.some((l) => l.startsWith("pt") || l === "portuguese")) parts.push("Suporta português.");
  else if (langs.length === 1 && langs[0] === "en") parts.push("Focado em inglês.");
  else if (langs.length > 1) parts.push("Multilíngue; o português não aparece na lista oficial.");
  const lic = card.license_name || card.license;
  if (lic) {
    const rule = /nc|non-commercial/i.test(lic) ? "só para uso não comercial"
      : /^(apache-2\.0|mit|bsd.*|cc-by-4\.0)$/i.test(lic) ? "permite uso comercial"
      : "tem regras próprias; confira antes de uso comercial";
    parts.push(`Licença ${lic}: ${rule}.`);
  }
  return { by: maker ? ` criado por ${maker}` : "", text: parts.length ? " " + parts.join(" ") : "" };
}

function estimate(id, cat, params, weights) {
  const gb = params * (weights === "gguf" ? 0.6 : 2);   // GGUF em Q4_K_M (≈4,8 bits) ou FP16
  const fits = gb <= VRAM_GB, loads = gb <= VRAM_GB + RAM_GB;
  const round = (x) => Math.round(x * 10) / 10;
  if (cat !== "text") {
    // Sem tok/s: a nota vem de caber ou não na memória.
    // Áudio e embeddings são leves e rápidos; imagem e vídeo demoram mesmo cabendo.
    const ok = cat === "img" || cat === "vid" ? 40 : 85;
    return { active: params, gb: round(gb), tps: 0, s: fits ? ok : loads ? 10 : 0 };
  }
  const active = Number((id.match(/A(\d+(?:\.\d+)?)B/i) || [])[1]) || params;  // MoE: "35B-A3B"
  const perToken = gb * Math.min(1, active / params);   // GB lidos por token gerado
  let tps = 0;
  if (fits) {
    tps = (GPU_BW * EFF) / perToken;
    if (gb > 0.85 * VRAM_GB) tps *= 0.7;   // pouca folga na VRAM para o contexto
  } else if (loads) {
    const onGpu = perToken * (VRAM_GB / gb);
    tps = 1 / (onGpu / (GPU_BW * EFF) + (perToken - onGpu) / (RAM_BW * EFF));
  }
  tps = Math.round(tps);
  const s = tps > 0 ? Math.min(95, Math.round(100 * (1 - Math.exp(-tps / 35)))) : 0;
  return { active, gb: round(gb), tps, s };
}

const KINDS = {
  img: ["Modelo de imagem", "Gerar e editar imagens", " Além dele, precisa do codificador de texto e do VAE."],
  vid: ["Modelo de vídeo", "Gerar vídeos curtos", " Além dele, precisa do codificador de texto e do VAE."],
  stt: ["Modelo de transcrição (fala → texto)", "Transcrever áudios, reuniões e vídeos", ""],
  tts: ["Modelo de voz (texto → fala)", "Narração, leitura de textos, assistentes de voz", ""],
  emb: ["Modelo de embeddings", "Busca em documentos e RAG", ""],
};

function describe(r, cat, params, e, m) {
  const name = r.id.split("/")[1];
  const size = params >= 10 ? `${Math.round(params)}B parâmetros`
    : params >= 1 ? `${params.toFixed(1).replace(".", ",")}B parâmetros` : `${Math.round(params * 1000)}M parâmetros`;
  if (cat !== "text") {
    const [what, use, extra] = KINDS[cat];
    const fit = e.gb <= VRAM_GB ? "cabe na RTX 3060" : e.s > 0 ? "passa dos 12 GB e fica bem mais lento" : "grande demais para este PC";
    return { c: cat, r: false, d: `${what}${m.by} com ${size}; ${fit}.${extra}${m.text}`, u: use };
  }
  const code = /coder|code|devstral/i.test(name);
  const vision = !code && (r.pipeline_tag === "image-text-to-text" || /vl|vision/i.test(name));
  const reasoning = /r1\b|think|reason|qwq|magistral/i.test(name);
  const moe = e.active < params;
  const kind = code ? "Modelo de código" : vision ? "Modelo de visão e texto" : "Modelo de texto";
  const fit = e.gb <= VRAM_GB ? "cabe inteiro na RTX 3060" : e.tps > 0 ? "passa dos 12 GB e usa a RAM" : "grande demais para este PC";
  return {
    c: code ? "code" : vision ? "vis" : "chat",
    r: reasoning,
    d: `${kind}${m.by} com ${size}${moe ? ` (MoE, ~${e.active}B ativos por token)` : ""}; ${fit}.${m.text}`,
    u: code ? "Programação, autocomplete, agentes de código"
      : vision ? "Ler imagens, prints e documentos"
      : reasoning ? "Raciocínio, matemática, lógica"
      : "Chat e tarefas gerais",
  };
}

const old = await readFile(FILE, "utf8").then(JSON.parse).catch(() => ({ models: [] }));
const addedOn = new Map(old.models.map((m) => [m.id, m.added]));
const today = new Date().toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });

const seen = new Set();
const models = [];
for (const src of SOURCES) {
  for (const r of await getJson(src.url)) {
    const group = TASKS[r.pipeline_tag];
    if (!group || (r.downloads ?? 0) < MIN_DOWNLOADS) continue;
    const n = r.id.split("/")[1].replace(/[-_.]?GGUF$/i, "").replace(/[-_]/g, " ");
    const key = n.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (seen.has(key)) continue;   // mesmo modelo publicado por mais de um autor
    seen.add(key);
    const info = await detailsOf(r.id).catch(() => null);
    const params = (info?.[src.weights]?.total ?? 0) / 1e9;
    if (!params) continue;         // sem contagem de parâmetros não dá para estimar
    const e = estimate(r.id, group, params, src.weights);
    models.push({ id: r.id, n, gb: e.gb, tps: e.tps, s: e.s, ...describe(r, group, params, e, metadata(info, src.weights)), created: r.createdAt ?? "", added: addedOn.get(r.id) ?? today });
  }
}

models.sort((a, b) => b.created.localeCompare(a.created));
const out = { updated: new Date().toISOString(), models: models.slice(0, MAX_MODELS) };
await writeFile(FILE, JSON.stringify(out, null, 1) + "\n");
console.log(`${out.models.length} modelos gravados em models-auto.json`);
