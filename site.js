// Dados e funções compartilhadas pelas páginas do site (catálogo e comparativo).
// Para adicionar ou corrigir um modelo do catálogo, edite a lista DATA abaixo.
const DATA = [
["Phi-4 Mini Reasoning","chat",2.4,105,"Modelo pequeno da Microsoft treinado para raciocinar passo a passo, principalmente em matemática.","Matemática, lógica, exercícios de estudo"],
["Llama 3.2 3B","chat",2.0,126,"Llama compacto da Meta, bem suportado em tudo que é ferramenta.","Chat simples, resumos, assistente offline"],
["SmolLM3 3B","chat",2.0,126,"Modelo pequeno e totalmente aberto da Hugging Face, com modo de raciocínio e contexto longo.","Testes, protótipos, tarefas leves"],
["Granite 4.1 3B","chat",2.0,126,"Linha da IBM voltada a empresas, eficiente e boa em seguir instruções.","RAG, extração de dados, uso de ferramentas"],
["Ministral 3 3B","chat",2.0,126,"Menor modelo da linha Ministral 3 da Mistral, pensado para rodar em dispositivos.","Assistente leve, classificação, edge"],
["Gemma 3 4B","chat",2.5,101,"Gemma pequeno do Google, multilíngue e capaz de ler imagens.","Chat em português, descrever imagens"],
["Qwen3-VL 4B","vis",2.8,90,"Versão leve do modelo de visão e linguagem da Qwen: entende imagens e texto.","OCR, ler prints e documentos"],
["Qwen 2.5 Coder 1.5B","code",1.3,194,"Mini modelo de código, rápido o bastante para autocompletar enquanto você digita.","Autocomplete no editor (Continue, Tabby)"],
["DeepSeek R1 1.5B","chat",1.3,194,"Destilado minúsculo do DeepSeek R1: mostra o raciocínio, mas erra bastante.","Experimentar modelos de raciocínio"],
["Qwen 3.5 2B","chat",2.5,101,"Qwen 3.5 de bolso, rápido para tarefas simples.","Respostas rápidas, rascunhos, extração"],
["Qwen 3.5 0.8B","chat",1.3,194,"O menor Qwen 3.5; resolve tarefas bem delimitadas.","Classificação, extração, roteamento"],
["Llama 3.2 1B","chat",1.0,252,"Ultraleve da Meta, roda até em celular. Só para tarefas muito simples.","Classificar textos, completar frases"],
["Gemma 3 1B","chat",1.0,252,"Menor Gemma, só texto, com respostas curtas e rápidas.","Tarefas simples, testes de pipeline"],
["Qwen 2.5 Coder 7B","code",4.1,61,"Modelo de código consagrado; gera, explica e corrige código localmente.","Programação, explicar código, scripts"],
["DeepSeek R1 Distill 7B","chat",4.1,61,"Qwen 7B treinado com o raciocínio do DeepSeek R1: pensa antes de responder.","Problemas de lógica e matemática"],
["Llama 3.1 8B","chat",4.6,55,"Clássico da Meta, base de milhares de fine-tunes.","Chat geral, base para ajuste fino"],
["Qwen 3 8B","chat",4.6,55,"Qwen 3 com modo pensar/não pensar; ótimo custo-benefício.","Assistente geral, agentes, português"],
["Granite 4.1 8B","chat",4.6,55,"Granite intermediário da IBM, focado em uso corporativo.","RAG, resumos, chamadas de função"],
["Ministral 8B","chat",4.6,55,"Modelo de 8B da Mistral para uso local.","Chat, agentes simples, chamadas de função"],
["Qwen 3.5 4B","chat",4.6,55,"Qwen 3.5 pequeno com bom equilíbrio entre velocidade e qualidade.","Assistente do dia a dia"],
["Qwen3-VL 8B","vis",5.0,50,"Modelo de visão e linguagem da Qwen: entende imagens, prints e documentos e conversa sobre eles.","OCR, análise de prints, gráficos e PDFs"],
["GLM-4 9B","chat",5.1,49,"Modelo da Zhipu (Z.ai), bom em chamadas de função.","Chat, ferramentas, tradução"],
["Nemotron Nano 9B v2","chat",5.1,49,"Modelo da NVIDIA de arquitetura híbrida (Mamba + Transformer), ágil em raciocínio.","Raciocínio, agentes, contexto longo"],
["Ornith 1.0 9B","chat",5.1,49,"Versão de 9B da família Ornith.","Chat geral",1],
["Gemma 4 E2B IT","chat",5.6,45,"Gemma 4 para dispositivos (cerca de 2B efetivos), multimodal.","Assistente leve com imagem"],
["Gemma 3 12B","chat",6.6,38,"Gemma de porte médio, multimodal e muito bom em português.","Escrita, resumo, análise de imagens"],
["Mistral Nemo 12B","chat",6.6,38,"Feito pela Mistral com a NVIDIA, contexto de 128 mil tokens.","Escrita criativa, roleplay, chat"],
["Gemma 4 12B IT","chat",6.6,38,"Gemma 4 de porte médio, ajustado para seguir instruções.","Assistente geral",1],
["Phi-4 14B","chat",7.7,33,"Modelo da Microsoft forte em matemática e raciocínio para o tamanho.","Raciocínio, STEM, estudo"],
["Qwen 3 14B","chat",7.7,33,"Maior Qwen 3 que cabe com folga em 12 GB: qualidade geral bem melhor.","Assistente geral de qualidade, agentes"],
["DeepSeek R1 Distill 14B","chat",7.7,33,"Destilado do R1 em 14B; raciocínio bem mais sólido que o 7B.","Lógica, matemática, planejamento"],
["Ministral 3 14B","chat",7.7,33,"Maior modelo da linha Ministral 3, com suporte a imagens.","Chat, documentos, imagens"],
["Gemma 4 E4B IT","chat",8.7,29,"Gemma 4 para dispositivos (cerca de 4B efetivos), multimodal.","Assistente com imagem no dispositivo"],
["GPT-OSS 20B","chat",11.3,130,"Modelo aberto da OpenAI em MoE: só uma fração dos parâmetros trabalha por token, por isso é tão rápido.","Raciocínio, ferramentas, assistente geral"],
["Qwen 3.5 9B","chat",9.7,26,"Generalista da família Qwen 3.5, equilibrando qualidade e tamanho.","Chat, resumo, agentes"],
["LFM2 24B","chat",12.8,126,"Modelo da Liquid AI em MoE com poucos parâmetros ativos, daí a velocidade alta.","Chat rápido, extração, agentes leves"],
["DiffusionGemma 26B-A4B IT","chat",13.8,59,"Variante do Gemma (MoE, ~4B ativos) que parece gerar texto por difusão em vez de token a token.","Experimentos",1],
["Qwen3-VL 30B-A3B","vis",16.4,51,"Versão MoE maior do Qwen3-VL (3B ativos): visão mais precisa, usando parte da RAM.","Documentos complexos, gráficos, OCR"],
["Nemotron 3 Nano 30B","chat",15.9,53,"MoE da NVIDIA com poucos parâmetros ativos; continua rápido mesmo passando para a RAM.","Agentes, raciocínio, contexto longo"],
["North Mini Code","code",15.9,53,"Modelo de código compacto.","Programação",1],
["Agents-A1 35B-A3B","chat",18.4,43,"MoE de 35B com ~3B ativos; o nome indica foco em fluxos de agente.","Agentes, uso de ferramentas",1],
["Ornith 1.0 35B-A3B","chat",18.4,43,"MoE de 35B com ~3B ativos da família Ornith.","Chat geral",1],
["Qwen 3.6 35B-A3B","chat",18.9,42,"Qwen MoE de 35B com ~3B ativos, geração mais nova da família.","Chat, código, agentes",1],
["Qwen 3 Next 80B-A3B","chat",41.5,25,"Qwen experimental com atenção híbrida e só 3B ativos: enorme, mas ainda usável.","Contexto longo, assistente geral"],
["Qwen 3 Coder Next 80B-A3B","code",41.5,25,"Versão de código do Qwen 3 Next, feita para agentes de programação.","Agentes de código, refatoração"],
["Devstral Small 2 24B","code",12.8,12,"Agente de programação da Mistral, feito para trabalhar em repositórios inteiros.","Agentes de código (OpenHands, Cline)"],
["Mistral Small 3.1 24B","chat",12.8,12,"Generalista multimodal da Mistral; bom, mas no limite da VRAM.","Chat, documentos, imagens"],
["Qwen 3.5 35B-A3B","chat",36.4,13,"MoE do Qwen 3.5; nesta quantização pesa 36 GB e roda pela RAM.","Assistente geral de qualidade"],
["Gemma 4 26B-A4B IT","chat",28.2,11,"MoE multimodal do Google (~4B ativos); nesta versão não cabe na VRAM.","Chat, imagens, documentos"],
["Mixtral 8x7B","chat",24.6,8,"MoE pioneiro da Mistral (2023), hoje superado por modelos menores.","Uso legado"],
["HunyuanImage 3.0 Instruct","img",45.4,0,"Gerador de imagens de grande porte da Tencent, com edição por instrução.","Imagens a partir de texto, edição"],
["HunyuanImage 3.0","img",45.4,0,"Gerador de imagens de grande porte da Tencent.","Imagens a partir de texto"],
["Qwen 3.8 27B","chat",14.3,7,"Qwen denso de 27B: todos os parâmetros trabalham por token, por isso é lento aqui.","Assistente geral",1],
["MiniMax H3","vid",31.7,0,"Gerador de vídeo da MiniMax.","Vídeos curtos",1],
["GLM-4.5 Air","chat",54.8,6,"MoE da Zhipu, bom em código e agentes, mas pesado para 12 GB.","Código, agentes"],
["LTX 2.3","vid",14.1,0,"Gerador de vídeo da Lightricks, rápido e com áudio.","Clipes curtos, texto ou imagem para vídeo"],
["Qwen Image 2512","img",31.5,0,"Gerador de imagens da Qwen, forte em texto legível dentro da imagem.","Posters, banners, imagens com texto"],
["Wan 2.2 T2V A14B","vid",30.1,0,"Texto para vídeo da Alibaba (MoE), com visual cinematográfico.","Vídeos curtos a partir de texto"],
["Muse Glimmer 30B","chat",15.9,5,"Modelo denso de 30B.","Chat geral",1],
["Llama 4 Scout 17B","chat",56.3,4,"MoE multimodal da Meta (17B ativos, 109B no total), com contexto muito longo.","Documentos enormes, imagens"],
["FLUX.2 Klein 9B","img",25.6,0,"Versão compacta de 9B do FLUX.2, da Black Forest Labs.","Gerar e editar imagens"],
["Granite 4.1 30B","chat",15.9,5,"Maior Granite 4.1 da IBM; denso, lento nesta placa.","RAG corporativo, resumos"],
["Qwen 3 32B","chat",16.9,5,"Qwen 3 denso de 32B: qualidade alta, velocidade baixa aqui.","Respostas de qualidade sem pressa"],
["DeepSeek R1 Distill 32B","chat",16.9,5,"Melhor destilado do R1; raciocínio forte, mas lento em 12 GB.","Raciocínio pesado"],
["OLMo 2 32B","chat",16.9,5,"Modelo 100% aberto do Allen Institute (pesos, dados e código).","Pesquisa, estudo de LLMs"],
["Wan 2.2 TI2V 5B","vid",21.2,0,"Versão compacta do Wan 2.2: texto ou imagem para vídeo.","Animar imagens, clipes curtos"],
["Z-Image Turbo","img",15.7,0,"Gerador de imagens rápido (poucos passos), focado em fotorrealismo.","Fotos realistas, iterações rápidas"],
["HunyuanVideo 1.5","vid",13.7,0,"Gerador de vídeo da Tencent em versão mais leve.","Texto ou imagem para vídeo"],
["Gemma 4 31B","chat",17.4,4,"Maior Gemma 4 denso.","Assistente geral de qualidade"],
["Command R 35B","chat",18.4,4,"Modelo da Cohere feito para RAG com citações.","Buscar e responder em documentos"],
["FLUX.2 Klein 4B","img",14.6,0,"Versão pequena do FLUX.2 para gerar e editar imagens rápido.","Imagens rápidas, edição"],
["Wan 2.1 T2V 1.3B","vid",17.0,0,"Versão leve do Wan 2.1 para texto para vídeo.","Vídeos curtos em baixa resolução"],
["Qwen 3.5 27B","chat",29.0,2,"Qwen 3.5 denso de 27B; nesta quantização não cabe.","Assistente geral"],
["Llama 3.3 70B","chat",36.4,1,"Llama 70B: muito bom, mas fica em ~1 tok/s aqui.","Qualidade alta, sem pressa"],
["Gemma 4 31B IT","chat",34.3,1,"Gemma 4 31B com instrução, em quantização maior.","Assistente geral"],
["FLUX.2 Dev","img",69.1,0,"Modelo de imagem topo de linha da Black Forest Labs; grande demais para esta placa.","Imagens de alta qualidade"],
["GPT-OSS 120B","chat",60.4,0,"Irmão maior do GPT-OSS; exige ~60 GB.","Raciocínio avançado"],
["Mistral Small 4 119B","chat",61.5,0,"Modelo MoE de 119B da Mistral.","Assistente avançado"],
["Qwen 3 VL 235B-A22B","vis",120.9,0,"Maior Qwen3-VL; visão de ponta, só em servidor.","Visão avançada"],
["Hy3","chat",151.6,0,"Modelo grande da Tencent Hunyuan.","Uso em servidor",1],
["MiniMax M3","chat",219.7,0,"Modelo grande da MiniMax.","Uso em servidor",1],
["GLM-5.3","chat",386.2,0,"Modelo de fronteira da Z.ai (Zhipu).","Uso em servidor",1],
["LongCat 2.0","chat",820.1,0,"Modelo gigante da Meituan.","Uso em servidor",1],
["DeepSeek V4 Pro","chat",820.1,0,"Topo da linha DeepSeek V4; só roda em cluster.","Uso em servidor"],
["Qwen 3.8 2.4T-A95B","chat",1229.8,0,"MoE de 2,4 trilhões de parâmetros (95B ativos).","Uso em servidor",1],
["Kimi K3","chat",1424.5,0,"Modelo gigante da Moonshot AI.","Uso em servidor",1],
["Qwen 3.5 122B-A10B","chat",125.5,0,"MoE do Qwen 3.5 com 10B ativos.","Uso em servidor"],
["DeepSeek V4 Flash","chat",81.4,0,"Versão mais rápida e leve do DeepSeek V4.","Uso em servidor"],
["Qwen 3 235B-A22B","chat",120.9,0,"Maior Qwen 3 MoE (22B ativos).","Uso em servidor"],
["GLM-4.6","chat",183.4,0,"Modelo da Zhipu forte em código e agentes.","Uso em servidor"],
["Qwen 3.5 397B-A17B","chat",203.9,0,"Topo da linha Qwen 3.5.","Uso em servidor"],
["Llama 4 Maverick 17B-128E","chat",205.4,0,"MoE da Meta com 128 especialistas (~400B no total).","Uso em servidor"],
["Qwen 3 Coder 480B","code",246.4,0,"Maior Qwen de código, nível de ferramentas comerciais.","Agentes de código em servidor"],
["DeepSeek R1","chat",344.2,0,"O R1 original de 671B, que popularizou os modelos de raciocínio.","Uso em servidor"],
["DeepSeek V3.2","chat",351.4,0,"Generalista da DeepSeek com atenção esparsa.","Uso em servidor"],
["Whisper Large v3 Turbo","stt",1.6,0,"Transcrição da OpenAI, versão acelerada do Large v3: quase a mesma precisão, bem mais rápida. Muito boa em português.","Transcrever reuniões, vídeos, legendas"],
["Whisper Large v3","stt",3.1,0,"O Whisper mais preciso, com suporte a cerca de 100 idiomas.","Transcrição de alta precisão, tradução para inglês"],
["Whisper Small","stt",0.5,0,"Whisper leve, bom para ditado e transcrição em tempo real.","Ditado, transcrição rápida"],
["Kokoro 82M","tts",0.3,0,"Voz sintética minúscula e de ótima qualidade, com vozes em português do Brasil.","Narração, leitura de textos, assistentes de voz"],
["Piper","tts",0.1,0,"Voz sintética ultraleve que roda até sem GPU, com vozes em pt-BR.","Assistentes de voz, automação residencial"],
["XTTS v2","tts",1.9,0,"Voz da Coqui que clona uma voz a partir de poucos segundos de áudio; licença só para uso não comercial.","Clonar voz, dublagem"],
["BGE-M3","emb",1.1,0,"Embeddings multilíngues da BAAI, bons em português, para textos de até 8 mil tokens.","Busca em documentos, RAG"],
["Qwen3-Embedding 0.6B","emb",1.2,0,"Embeddings leves e multilíngues da Qwen.","RAG, busca semântica"],
["Qwen3-Embedding 8B","emb",4.7,0,"Versão grande dos embeddings da Qwen, entre os melhores multilíngues (aqui em Q4).","RAG de alta qualidade"],
["nomic-embed-text v1.5","emb",0.3,0,"Embeddings pequenos e populares no Ollama; melhores em inglês.","RAG leve, busca semântica"]
];

const CAT = { chat: "Chat", vis: "Visão", code: "Código", img: "Imagem", vid: "Vídeo", stt: "Fala → texto", tts: "Texto → fala", emb: "Embeddings" };
const NO_TPS = { img: "gera imagem", vid: "gera vídeo", stt: "transcreve áudio", tts: "gera voz", emb: "indexa textos" };
const REASONING = new Set(["Phi-4 Mini Reasoning","DeepSeek R1 1.5B","DeepSeek R1 Distill 7B","DeepSeek R1 Distill 14B","DeepSeek R1 Distill 32B","DeepSeek R1","Qwen 3 8B","Qwen 3 14B","Qwen 3 32B","Qwen 3 235B-A22B","GPT-OSS 20B","GPT-OSS 120B","Nemotron Nano 9B v2","SmolLM3 3B"]);

const SAMPLE_CHAT = "Rodar um modelo de IA no seu próprio computador tem três vantagens principais.\n\n1. Privacidade: nada do que você digita sai da sua máquina.\n2. Custo: depois de baixar o modelo, você não paga por uso.\n3. Disponibilidade: funciona sem internet.\n\nO limite é a memória da placa de vídeo. Se o modelo cabe inteiro na VRAM, a resposta sai rápida. Se não cabe, parte dele vai para a RAM do sistema, que é bem mais lenta, e a velocidade despenca. Por isso modelos MoE, que usam só uma parte dos parâmetros a cada token, costumam ser a melhor escolha para quem tem 12 GB: você ganha a qualidade de um modelo grande com a velocidade de um pequeno.";
const SAMPLE_CODE = "def ler_csv(caminho):\n    \"\"\"Lê um CSV e devolve uma lista de dicionários.\"\"\"\n    import csv\n    with open(caminho, newline=\"\", encoding=\"utf-8\") as f:\n        return list(csv.DictReader(f))\n\n\ndef total_por_categoria(linhas):\n    totais = {}\n    for linha in linhas:\n        cat = linha[\"categoria\"]\n        valor = float(linha[\"valor\"])\n        totais[cat] = totais.get(cat, 0) + valor\n    return totais\n\n\nif __name__ == \"__main__\":\n    dados = ler_csv(\"vendas.csv\")\n    for cat, total in sorted(total_por_categoria(dados).items()):\n        print(f\"{cat:<20} R$ {total:>10.2f}\")";

const TOKENS = {
  chat: SAMPLE_CHAT.match(/\s*\S{1,4}/g),
  code: SAMPLE_CODE.match(/\s*[\S]{1,4}/g)
};

// Hardware (os mesmos valores do topo de scripts/update-models.mjs)
const VRAM_GB = 12;   // RTX 3060
const RAM_GB = 56;    // RAM livre para o modelo

// Nota de 0 a 100: a mesma fórmula do robô, para o catálogo e os modelos novos ficarem na mesma régua.
// Texto: cresce com tok/s (~32 tok/s = 60, "Roda liso"). Os demais: cabe ou não na memória.
function scoreOf(c, gb, tps) {
  if (["chat", "code", "vis"].includes(c)) return tps > 0 ? Math.min(95, Math.round(100 * (1 - Math.exp(-tps / 35)))) : 0;
  const ok = c === "img" || c === "vid" ? 40 : 85;
  return gb <= VRAM_GB ? ok : gb <= VRAM_GB + RAM_GB ? 10 : 0;
}

const MODELS = DATA.map((r) => ({ n: r[0], c: r[1], gb: r[2], tps: r[3], s: scoreOf(r[1], r[2], r[3]), d: r[4], u: r[5], unsure: !!r[6], r: REASONING.has(r[0]) }))
  .sort((a, b) => b.s - a.s || b.tps - a.tps);

function status(s) {
  if (s >= 60) return ["Roda liso", "#1D6B3C", "#DCF0E2"];
  if (s >= 20) return ["Usável", "#8A5300", "#FBEBC8"];
  if (s > 0) return ["Pesado", "#A3271A", "#F8DEDA"];
  return ["Não roda", "#4A4D53", "#E6E3DD"];
}
function fmt(x, d) { return x.toFixed(d).replace(".", ","); }
// Comandos do Ollama conhecidos. Modelos fora desta lista ganham um link de busca.
const OLLAMA = {
  "Phi-4 Mini Reasoning": "phi4-mini-reasoning", "Llama 3.2 3B": "llama3.2:3b", "Llama 3.2 1B": "llama3.2:1b",
  "Gemma 3 4B": "gemma3:4b", "Gemma 3 1B": "gemma3:1b", "Gemma 3 12B": "gemma3:12b",
  "Qwen3-VL 4B": "qwen3-vl:4b", "Qwen3-VL 8B": "qwen3-vl:8b", "Qwen3-VL 30B-A3B": "qwen3-vl:30b", "Qwen 3 VL 235B-A22B": "qwen3-vl:235b",
  "Qwen 2.5 Coder 1.5B": "qwen2.5-coder:1.5b", "Qwen 2.5 Coder 7B": "qwen2.5-coder:7b", "Qwen 3 Coder 480B": "qwen3-coder:480b",
  "DeepSeek R1 1.5B": "deepseek-r1:1.5b", "DeepSeek R1 Distill 7B": "deepseek-r1:7b", "DeepSeek R1 Distill 14B": "deepseek-r1:14b",
  "DeepSeek R1 Distill 32B": "deepseek-r1:32b", "DeepSeek R1": "deepseek-r1:671b",
  "Llama 3.1 8B": "llama3.1:8b", "Llama 3.3 70B": "llama3.3:70b", "Llama 4 Scout 17B": "llama4:scout", "Llama 4 Maverick 17B-128E": "llama4:maverick",
  "Qwen 3 8B": "qwen3:8b", "Qwen 3 14B": "qwen3:14b", "Qwen 3 32B": "qwen3:32b", "Qwen 3 235B-A22B": "qwen3:235b",
  "Phi-4 14B": "phi4:14b", "Mistral Nemo 12B": "mistral-nemo:12b", "Mistral Small 3.1 24B": "mistral-small3.1:24b",
  "Mixtral 8x7B": "mixtral:8x7b", "GPT-OSS 20B": "gpt-oss:20b", "GPT-OSS 120B": "gpt-oss:120b",
  "Command R 35B": "command-r:35b", "GLM-4 9B": "glm4:9b",
};
const PULL = { "BGE-M3": "bge-m3", "nomic-embed-text v1.5": "nomic-embed-text", "Qwen3-Embedding 0.6B": "qwen3-embedding:0.6b", "Qwen3-Embedding 8B": "qwen3-embedding:8b" };
const WHISPER = { "Whisper Large v3 Turbo": "turbo", "Whisper Large v3": "large-v3", "Whisper Small": "small" };
function commandOf(m) {
  if (OLLAMA[m.n]) return `ollama run ${OLLAMA[m.n]}`;
  if (PULL[m.n]) return `ollama pull ${PULL[m.n]}`;
  if (WHISPER[m.n]) return `whisper audio.mp3 --model ${WHISPER[m.n]} --language pt`;
  if (m.auto && /gguf/i.test(m.id) && ["chat", "code", "vis"].includes(m.c)) return `ollama run hf.co/${m.id}`;
  return "";
}
function cmdHtml(m) {
  const cmd = commandOf(m);
  if (cmd) return `<div class="cmd"><code>${esc(cmd)}</code><button type="button" class="copy" data-copy="${esc(cmd)}" aria-label="Copiar comando">Copiar</button></div>`;
  const text = ["chat", "code", "vis"].includes(m.c);
  const url = text ? `https://ollama.com/search?q=${encodeURIComponent(m.n)}` : `https://huggingface.co/models?search=${encodeURIComponent(m.n)}`;
  return `<a class="find" href="${url}" target="_blank" rel="noopener">${text ? "Procurar no Ollama" : "Procurar no Hugging Face"} ↗</a>`;
}

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const LEVELS = ["Roda liso", "Usável", "Pesado", "Não roda"];
const levelOf = (m) => m.s >= 60 ? 0 : m.s >= 20 ? 1 : m.s > 0 ? 2 : 3;
const find = (n) => MODELS.find((m) => m.n === n);
const fitText = (m) => m.gb <= VRAM_GB ? "cabe na VRAM" : m.gb <= VRAM_GB + RAM_GB ? "usa RAM do sistema" : "não carrega";
const secs = (x) => x >= 60 ? `${Math.floor(x / 60)} min ${Math.round(x % 60)} s` : `${fmt(x, 1)} s`;

// Endereço curto de um modelo, usado no link para o comparativo (comparar.html#qwen-3-14b)
const slug = (n) => n.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const bySlug = (s) => MODELS.find((m) => slug(m.n) === s);
const testHref = (m) => `comparar.html#${slug(m.n)}`;

// Botões "Copiar" de qualquer página
async function copyText(btn) {
  const text = btn.dataset.copy;
  try { await navigator.clipboard.writeText(text); }
  catch { const t = document.createElement("textarea"); t.value = text; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); } catch {} t.remove(); }
  btn.textContent = "Copiado ✓"; setTimeout(() => (btn.textContent = "Copiar"), 1500);
}
document.addEventListener("click", (e) => { const c = e.target.closest("[data-copy]"); if (c) copyText(c); });

// Modelos novos encontrados pelo robô (scripts/update-models.mjs)
const norm = (s) => s.toLowerCase().replace(/gguf|instruct|\bit\b/g, "").replace(/[^a-z0-9]/g, "");
function loadAutoModels(done) {
  fetch("models-auto.json", { cache: "no-store" }).then((r) => r.ok ? r.json() : null).then((data) => {
    if (!data || !data.models?.length) return;
    const known = new Set(MODELS.map((m) => norm(m.n)));
    data.models.forEach((m) => { if (!known.has(norm(m.n))) MODELS.push({ ...m, auto: true }); });
    MODELS.sort((a, b) => b.s - a.s || b.tps - a.tps);
    done(data);
  }).catch(() => {});
}
