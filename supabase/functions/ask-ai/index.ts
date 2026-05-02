// Supabase Edge Function — proxy seguro para a API do Google Gemini.
// Mantém a chave fora do front e aplica system prompts focados por módulo.
//
// Deploy:
//   supabase functions deploy ask-ai
//   supabase secrets set GEMINI_API_KEY=AIza...

const MODEL = "gemini-2.5-flash";
const GEMINI_URL =
  `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const MAX_TOKENS = 1024;

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const BASE_RULES = `Você é um tutor de programação para iniciantes absolutos, em português brasileiro.

REGRAS GERAIS:
- Use linguagem simples, sem jargão. Quando precisar de termo técnico, explique.
- Sempre que mostrar código, use bloco markdown com tripla crase e a linguagem correta.
- Aponte erros comuns que o aprendiz pode estar cometendo se for relevante.
- Seja conciso: idealmente 2 a 5 parágrafos. Nunca despeje texto enorme.
- Tom acolhedor, direto, sem floreios.
- Se a pergunta estiver fora do escopo deste módulo, responda gentilmente:
  "Essa pergunta foge do escopo deste módulo. Quando você chegar no módulo correspondente, posso ajudar lá."
  E sugira em qual módulo do guia o tema é abordado, se souber.`;

const SCOPES: Record<string, string> = {
  mod0: `ESCOPO DESTE MÓDULO (Módulo 0 — "Você já programa"):
- Conceito de algoritmo no dia a dia.
- Diferença entre prompt, pseudocódigo e código.
- Por que aprender a programar mesmo na era da IA.
- NÃO responda sobre HTML, CSS, Python, banco de dados, UI/UX — esses estão em outros módulos.`,

  modExtra: `ESCOPO DESTE MÓDULO (Módulo Extra — "Configurando seu ambiente"):
- Instalação do VS Code (Windows, macOS, Linux).
- Extensões essenciais: Portuguese (Brazil), Prettier, Live Server, Python, Color Highlight.
- Como abrir uma pasta no VS Code, criar arquivos, abrir o terminal integrado.
- NÃO responda sobre HTML, CSS, Python, lógica — só ambiente e VS Code.`,

  mod1: `ESCOPO DESTE MÓDULO (Módulo 1 — "Raciocínio e lógica"):
- Sequência, condição (SE/SENÃO), repetição (PARA, ENQUANTO).
- Variáveis, operadores, booleanos.
- Pseudocódigo em português.
- NÃO responda sobre sintaxe específica de Python ou outras linguagens — fica para o Módulo 3.
- NÃO responda sobre HTML, CSS, banco de dados ou UI/UX.`,

  mod2: `ESCOPO DESTE MÓDULO (Módulo 2 — "HTML + CSS"):
- Estrutura de um arquivo HTML (DOCTYPE, html, head, body).
- Tags de conteúdo: h1-h6, p, a, img, ul/li, div, span.
- Atributos comuns: href, src, alt, class, id.
- CSS: como linkar, seletores (tag, classe, id), propriedades comuns (color, background, font, padding, margin, border, border-radius).
- Box model, flexbox/grid básico, unidades (px, rem, %, em).
- Live Server, DevTools, depuração visual.
- Erros comuns: tag não fechada, # vs ., caminho de arquivo, especificidade.

NÃO responda sobre Python, JavaScript, banco de dados, lógica de programação geral. Se perguntarem, redirecione para o módulo certo.`,

  mod3: `ESCOPO DESTE MÓDULO (Módulo 3 — "Python"):
- Sintaxe Python: variáveis, tipos (int, float, str, bool, list, dict).
- Condicionais (if/elif/else) e loops (for, while).
- Funções, parâmetros, return.
- print, input, indentação.
- Erros comuns: IndentationError, NameError, TypeError.
- NÃO responda sobre HTML, CSS, banco de dados, UI/UX — só Python.`,

  mod4: `ESCOPO DESTE MÓDULO (Módulo 4 — "UI e UX"):
- Diferença entre UI e UX.
- 10 heurísticas de Nielsen.
- Princípios visuais: hierarquia, contraste, consistência, acessibilidade.
- Como aplicar UI/UX em interfaces web.
- NÃO responda sobre código (HTML, CSS, Python) em detalhe — foque no design e no raciocínio.`,

  modProj: `ESCOPO DESTE MÓDULO (Projeto integrador — portfólio pessoal):
- Decisões de estrutura para o portfólio.
- Como combinar HTML, CSS, Python e princípios de UI/UX.
- Dicas de revisão e testes.
- Pode responder sobre qualquer um dos módulos anteriores se for diretamente relacionado ao projeto integrador.`,
};

function systemFor(moduleId: string, moduleTitle: string): string {
  const scope = SCOPES[moduleId] ||
    `ESCOPO DESTE MÓDULO (${moduleTitle}): responda apenas sobre o conteúdo do módulo atual.`;
  return `${BASE_RULES}\n\n${scope}`;
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

// @ts-ignore — Deno global está disponível em runtime
Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return jsonResponse({ error: "Use POST." }, 405);
  }

  // @ts-ignore — Deno global
  const apiKey = Deno.env.get("GEMINI_API_KEY");
  if (!apiKey) {
    return jsonResponse(
      { error: "GEMINI_API_KEY não configurada na Edge Function." },
      500,
    );
  }

  let payload: { messages?: unknown; moduleId?: string; moduleTitle?: string };
  try {
    payload = await req.json();
  } catch {
    return jsonResponse({ error: "JSON inválido." }, 400);
  }

  const { messages, moduleId = "", moduleTitle = "" } = payload;
  if (!Array.isArray(messages) || messages.length === 0) {
    return jsonResponse({ error: "messages é obrigatório (array não vazio)." }, 400);
  }
  // sanitização simples — só user/assistant + content string
  const cleanMessages = messages
    .filter(
      (m: unknown): m is { role: string; content: string } =>
        typeof m === "object" && m !== null &&
        "role" in m && "content" in m &&
        ((m as Record<string, unknown>).role === "user" ||
          (m as Record<string, unknown>).role === "assistant") &&
        typeof (m as Record<string, unknown>).content === "string",
    )
    .slice(-20); // últimas 20 mensagens

  if (cleanMessages.length === 0) {
    return jsonResponse({ error: "Nenhuma mensagem válida." }, 400);
  }

  const system = systemFor(moduleId, moduleTitle);

  // Gemini usa "model" no lugar de "assistant" e estrutura de partes.
  const contents = cleanMessages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  // Retry em 503 (UNAVAILABLE) e 429 (rate limit) — picos no Gemini são transientes.
  const RETRY_DELAYS_MS = [1000, 2500];
  const requestBody = JSON.stringify({
    system_instruction: { parts: [{ text: system }] },
    contents,
    generationConfig: { maxOutputTokens: MAX_TOKENS },
  });

  let geminiResp: Response | null = null;
  for (let attempt = 0; attempt <= RETRY_DELAYS_MS.length; attempt++) {
    try {
      geminiResp = await fetch(GEMINI_URL, {
        method: "POST",
        headers: {
          "x-goog-api-key": apiKey,
          "content-type": "application/json",
        },
        body: requestBody,
      });
    } catch (e) {
      return jsonResponse({ error: `Falha ao contatar o Gemini: ${String(e)}` }, 502);
    }
    const transient = geminiResp.status === 503 || geminiResp.status === 429;
    if (!transient || attempt === RETRY_DELAYS_MS.length) break;
    await new Promise((r) => setTimeout(r, RETRY_DELAYS_MS[attempt]));
  }
  if (!geminiResp) {
    return jsonResponse({ error: "Falha inesperada ao chamar o Gemini." }, 502);
  }

  if (!geminiResp.ok) {
    const errBody = await geminiResp.text();
    return jsonResponse(
      { error: `Gemini respondeu ${geminiResp.status}: ${errBody}` },
      geminiResp.status,
    );
  }

  const data = await geminiResp.json();
  const parts = data?.candidates?.[0]?.content?.parts;
  const text: string = Array.isArray(parts)
    ? parts
      .filter((p: { text?: string }) => typeof p.text === "string")
      .map((p: { text: string }) => p.text)
      .join("\n")
    : "";

  return jsonResponse({ text, usage: data?.usageMetadata });
});
