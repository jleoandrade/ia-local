# Roda na minha GPU?

Catálogo de modelos de IA local com simulador de velocidade, montado para o meu PC (RTX 3060 12 GB). Todo dia um robô procura modelos novos no Hugging Face e adiciona ao site com a velocidade estimada para este hardware.

## Arquivos

| Arquivo | Para que serve |
|---|---|
| `index.html` | Aba Catálogo (home): melhores para o meu PC e catálogo com filtros |
| `comparar.html` | Aba Comparativo: testar um modelo sozinho ou dois ou três lado a lado |
| `como-calculamos.html` | Aba Como calculamos: guia ilustrado |
| `site.js` | Lista de modelos e funções usadas pelas páginas (edite aqui para mudar o catálogo) |
| `models-auto.json` | Modelos novos encontrados pelo robô (começa vazio) |
| `scripts/update-models.mjs` | O robô: busca no Hugging Face e calcula a velocidade |
| `.github/workflows/update-models.yml` | Agenda o robô para rodar todo dia |

## Publicar: passo a passo

### 1. Criar o repositório no GitHub

1. Entre em <https://github.com/new>.
2. Nome: `roda-na-minha-gpu`. Deixe **sem** README, .gitignore e licença (já estão aqui).
3. Clique em **Create repository**.

### 2. Enviar os arquivos

Na pasta descompactada, rode:

```bash
cd roda-na-minha-gpu
git init
git add .
git commit -m "Primeira versão"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/roda-na-minha-gpu.git
git push -u origin main
```

Troque `SEU_USUARIO` pelo seu usuário do GitHub. Se o Git pedir senha, use um **token** (GitHub → Settings → Developer settings → Personal access tokens), porque a senha da conta não funciona aqui.

### 3. Publicar no Vercel

1. Entre em <https://vercel.com/new> e conecte sua conta do GitHub.
2. Escolha o repositório `roda-na-minha-gpu` e clique em **Import**.
3. Em **Framework Preset**, escolha **Other**. Não precisa de comando de build.
4. Clique em **Deploy**. Em menos de um minuto o site está no ar, num endereço `*.vercel.app`.

A partir daí, **todo push no GitHub publica o site de novo sozinho**.

### 4. Ligar o robô de modelos novos

1. No GitHub, abra o repositório → **Settings → Actions → General**.
2. Em **Workflow permissions**, marque **Read and write permissions** e salve.
3. Vá na aba **Actions**, escolha **Atualizar modelos** e clique em **Run workflow** para a primeira rodada.

Depois disso ele roda sozinho todo dia às 06:17 (horário de Brasília). Quando acha modelos novos, grava no `models-auto.json` e faz um commit, e o Vercel republica o site.

## Como o robô decide

- **Onde procura:** modelos GGUF publicados por `unsloth`, `ggml-org` e `lmstudio-community` (texto e visão) e por `city96` e `QuantStack` (imagem e vídeo). Para fala → texto, texto → fala e embeddings, olha os modelos em alta de cada tarefa no Hugging Face.
- **O que entra:** modelos com pelo menos 1.000 downloads (para pular testes e lixo) e com contagem de parâmetros publicada (sem ela não dá para estimar o tamanho).
- **Categoria:** Código (nome com coder, code, devstral), Visão (modelos que leem imagens), Chat (os demais de texto), Imagem, Vídeo, Fala → texto, Texto → fala e Embeddings (pela tarefa declarada no Hugging Face). **Raciocínio** é uma etiqueta extra ("raciocina") para modelos com R1, think, reason, QwQ ou Magistral no nome. "Leves" e "Novos" são filtros do site e valem para eles automaticamente.
- **Tamanho:** GGUF = parâmetros × 0,6 GB por bilhão (Q4_K_M); áudio e embeddings = parâmetros × 2 GB por bilhão (FP16).
- **Velocidade (texto e visão):** quanto do modelo precisa ser lido a cada token, dividido pela banda da GPU (360 GB/s) ou, na parte que não cabe nos 12 GB, pela banda da RAM. Em modelos MoE (nome com `A3B`, `A10B`…) conta só a parte ativa. Se o modelo ocupa mais de 85% da VRAM, a velocidade leva −30%, porque sobra pouco espaço para o contexto. A conta completa, com exemplos, está na seção **Como calculamos** do site.
- **Classificação:**

  | Rótulo | Texto e visão | Imagem e vídeo | Áudio e embeddings |
  |---|---|---|---|
  | Roda liso | a partir de ~32 tok/s | — | cabe nos 12 GB |
  | Usável | ~8 a 31 tok/s | cabe nos 12 GB | — |
  | Pesado | ~1 a 7 tok/s | passa dos 12 GB, mas carrega com a RAM | passa dos 12 GB |
  | Não roda | não cabe em VRAM + RAM | não cabe em VRAM + RAM | não cabe em VRAM + RAM |

- **Descrição:** montada com a ficha do modelo no Hugging Face: quem criou, tamanho, se é MoE, tamanho do contexto, se suporta português e o que a licença permite (uso comercial ou não). Não usa IA, então é sempre factual, mas sem explicar "para que o modelo é bom".
- **Limite:** até 200 modelos novos, inclusive os que não rodam neste PC, para você ter uma visão do mercado.
- **Duplicados:** se o modelo já está no catálogo principal, o site mostra só a versão do catálogo.

No site, esses modelos aparecem com o aviso **"Novo · adicionado automaticamente"** e têm o filtro **Novos**. Os números são estimativas: para medir de verdade, rode o modelo com `llama-bench`.

## Trocou alguma peça?

Edite as constantes no topo de `scripts/update-models.mjs` (VRAM, banda da GPU, RAM) e faça push. Na próxima rodada as estimativas já saem com o hardware novo.

## Testar no seu PC antes de publicar

```bash
node scripts/update-models.mjs     # precisa de Node 20+
python3 -m http.server 8000        # abra http://localhost:8000
```

Abrir o `index.html` direto (clicando duas vezes) também funciona, mas assim os modelos novos não carregam. Para eles aparecerem, use o servidor acima.
