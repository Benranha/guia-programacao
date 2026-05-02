export default {
  id: "modProj", badge: "Projeto", color: "#D85A30", time: "~3h",
  t1: "Projeto", t2: "integrador.",
  subtitle: "Tudo que você aprendeu, aplicado em uma página real que você vai querer mostrar para as pessoas.",
  pillars: [{ l: "Lógica", c: "#1D9E75" }, { l: "HTML+CSS", c: "#D47F1A" }, { l: "Python", c: "#3B8BD4" }, { l: "UI/UX", c: "#D4537E" }, { l: "VS Code", c: "#7F77DD" }],
  sections: [
    { num: "B", label: "Briefing", sc: "#D85A30", title: "O que você vai construir",
      body: "Crie uma página de portfólio pessoal que reúna seus projetos, sua identidade visual e um script Python funcional relacionado ao tema. Não existe um resultado certo — existe o seu resultado.",
      xs: [
        { t: "n", e: "🎨", tx: "Módulo 1 e 2: estrutura lógica das seções, fluxo de conteúdo, hierarquia da informação.", bg: "#FAF0EB", tc: "#7A2E1A" },
        { t: "n", e: "💻", tx: "Módulo 2: HTML para estrutura, CSS para visual — paleta, tipografia, espaçamento.", bg: "#FAEEDA", tc: "#633806" },
        { t: "n", e: "🐍", tx: "Módulo 3: um script Python — lista de obras, calculadora de preços de freela, ou gerador de paletas.", bg: "#E6F1FB", tc: "#042C53" },
        { t: "n", e: "✨", tx: "Módulo 4: as 10 heurísticas de Nielsen como checklist de revisão antes de entregar.", bg: "#FBEAF0", tc: "#4B1528" },
      ] },
    { num: "E", label: "Estrutura", sc: "#3B8BD4", title: "Mínimo sugerido",
      body: "A página precisa de pelo menos 4 seções e um script Python funcional.",
      xs: [
        { t: "c", lang: "index.html", code: "<header>\n  <!-- Seu nome + navegação -->\n</header>\n<section id='sobre'>\n  <!-- Quem você é, o que você faz -->\n</section>\n<section id='trabalhos'>\n  <!-- Galeria de projetos ou artes -->\n</section>\n<section id='contato'>\n  <!-- Email, redes sociais -->\n</section>" },
        { t: "c", lang: "exemplo_python.py", code: "obras = [\n    {'titulo': 'Logo para café', 'valor': 350},\n    {'titulo': 'Banner Instagram', 'valor': 150},\n]\ntotal = 0\nfor obra in obras:\n    print(obra['titulo'], '→ R$', obra['valor'])\n    total += obra['valor']\nprint('Total: R$', total)" },
      ] },
  ],
  tutorials: [
    { n: "T1", title: "Definindo o tema e o escopo mínimo",
      intro: "Antes de qualquer linha de código, decida O QUÊ você vai construir. Escopo grande demais derruba o projeto na metade — escopo claro e pequeno entrega.",
      lang: "perguntas que se respondem em 10 minutos",
      code: `1. TEMA (escolha UM):
   ☐ Portfólio de artes/design
   ☐ Página pessoal (sobre você + redes)
   ☐ Apresentação de um projeto único
   ☐ Página de uma marca/produto fictício
   ☐ Currículo online

2. PARA QUEM é a página?
   - Recrutador? Cliente potencial? Amigos?
   → Define o tom (formal, descontraído, técnico)

3. UMA AÇÃO principal — o que o visitante deve fazer?
   - Mandar mensagem? Ver trabalhos? Baixar CV?
   → Essa ação ganha destaque máximo

4. ESCOPO MÍNIMO (entregue PRIMEIRO):
   ☐ Cabeçalho com seu nome
   ☐ 1 parágrafo "sobre você"
   ☐ 3 trabalhos / projetos / posts
   ☐ Forma de contato

5. FUTURO (NÃO faça agora):
   - Animações, formulário funcionando, mais 5 seções...
   - Anote, mas só depois do mínimo viável.`,
      explain: "Mínimo viável primeiro. Página feia mas COMPLETA é melhor que página linda pela metade. Depois de funcionar de ponta a ponta, você refina. Sem este passo, 80% dos projetos morrem na metade.",
      errors: [
        { bad: "Querer fazer 'um portfólio com tudo' de primeira", fix: "Escolha 1 ação principal. Tudo o resto é apoio.", why: "Tudo é destaque = nada é destaque. E você não termina porque o escopo cresce sem fim." },
        { bad: "Começar pelo design (cores, fontes) antes de ter o conteúdo", fix: "Escreva primeiro O QUE vai estar na página. Depois pensa em como mostrar.", why: "Design sem conteúdo é decoração. E quando o conteúdo chega, o design não acomoda." },
        { bad: "Copiar a estrutura de outro portfólio sem adaptar", fix: "Use referências, mas ajuste ao SEU conteúdo e SEU usuário.", why: "Estrutura de portfólio de fotógrafo não serve pra dev. E vice-versa." },
      ] },
    { n: "T2", title: "Wireframe no papel — antes de codar",
      intro: "10 minutos no papel economizam 2 horas de código. Desenhe a estrutura da página com caixas e textos antes de abrir o VS Code.",
      lang: "wireframe simples",
      code: `┌──────────────────────────────────────┐
│  SEU NOME              [sobre] [obras] [contato]
├──────────────────────────────────────┤
│                                        │
│         OLÁ, EU SOU [NOME]            │
│         [breve frase de impacto]      │
│                                        │
│         [BOTÃO PRIMÁRIO]              │
│                                        │
├──────────────────────────────────────┤
│  SOBRE                                 │
│  ┌─────────┐  Texto sobre você       │
│  │  foto   │  em 2-3 parágrafos       │
│  └─────────┘                          │
├──────────────────────────────────────┤
│  TRABALHOS                            │
│  ┌──────┐ ┌──────┐ ┌──────┐         │
│  │ obra │ │ obra │ │ obra │         │
│  └──────┘ └──────┘ └──────┘         │
├──────────────────────────────────────┤
│  CONTATO                              │
│  email@ex.com  ·  @insta  ·  ...     │
└──────────────────────────────────────┘`,
      explain: "Você não precisa desenhar bonito. Caixas com rótulos são suficientes. O objetivo é decidir ESTRUTURA e ORDEM — design vem depois. Cada caixa do desenho vira uma <section> no HTML.",
      errors: [
        { bad: "Pular o wireframe e ir direto pro código", fix: "Faça mesmo que pareça bobo. 10 minutos de papel.", why: "Decisões estruturais no código são caras de mudar. No papel são gratuitas." },
        { bad: "Wireframe detalhado demais (cores, fontes, sombras)", fix: "Só caixas e textos. Detalhes visuais pertencem ao CSS depois.", why: "Detalhe cedo trava você na primeira ideia. Caixas permitem reorganizar livremente." },
        { bad: "Wireframe lindo no Figma, mas no código fica diferente", fix: "Wireframe é só rascunho. Não invista tempo em refinamento.", why: "Tempo no Figma é tempo que sai do código. Faça simples e parta para implementar." },
      ] },
    { n: "T3", title: "Definindo paleta e tipografia (antes do CSS)",
      intro: "Defina as cores e fontes UMA VEZ, no início. Sem isso, você fica trocando a cada nova seção e a página vira colcha de retalhos.",
      lang: "decisões antes de codar",
      code: `PALETA (escolha 3 papéis):
  primária   — sua cor principal/de destaque
  neutro     — fundo, bordas (branco/creme/cinza claro)
  texto      — escuro pra contraste em texto
  acento*    — opcional, pra detalhes

EXEMPLO:
  --primary:  #B85438   (terracota)
  --bg:       #F8F6F0   (creme)
  --text:     #1C1B18   (quase preto)
  --muted:    #7A7570   (cinza)

TIPOGRAFIA (escolha 2 fontes no máximo):
  fonte_titulos: serif (mais formal)  — ex: Georgia, Playfair
  fonte_corpo:   sans-serif (mais limpa) — ex: Inter, system-ui

ESCALA DE TAMANHOS (siga uma proporção):
  h1:  48px (3rem)
  h2:  32px (2rem)
  h3:  24px (1.5rem)
  body: 16px (1rem)
  small: 14px (0.875rem)

ONDE COLOCAR (no topo do CSS):
  :root {
    --primary: #B85438;
    --bg: #F8F6F0;
    --text: #1C1B18;
  }
  body { background: var(--bg); color: var(--text); }`,
      explain: "Variáveis CSS (--nome) deixam você mudar a paleta inteira em um lugar só. Se o cliente diz 'troca o vermelho por azul', você muda 1 linha. Sem variáveis, você caça hex pelo código todo.",
      errors: [
        { bad: "5 cores principais 'pra ficar variado'", fix: "Máximo 3 cores principais + 1 acento opcional.", why: "Paleta grande dá ruído visual e dificulta hierarquia. Menos é mais." },
        { bad: "Usar 4 fontes diferentes", fix: "Máximo 2: uma de título, uma de corpo.", why: "Cada fonte adicional aumenta tempo de carregamento e ruído visual." },
        { bad: "Escolher cor pelo gosto sem testar contraste", fix: "Passe TODOS os pares texto/fundo no WebAIM Contrast Checker.", why: "Cor bonita que não passa em AA é cor que exclui usuários. Veja T2 do mod4." },
        { bad: "Definir cor inline no CSS toda vez", fix: "Use :root { --nome: valor } e var(--nome).", why: "Quando precisar mudar, é 1 linha em vez de 50." },
      ] },
    { n: "T4", title: "Escrevendo o script Python integrado",
      intro: "O script Python não precisa rodar dentro da página (isso seria back-end). Ele roda no terminal e gera dados, listas ou cálculos relacionados ao seu tema.",
      lang: "calculadora de freela.py",
      code: `# Exemplo: portfólio de design — calculadora de freela
servicos = {
    "Logo simples": 350,
    "Identidade visual": 1200,
    "Banner Instagram": 150,
    "Site one-page": 800,
}

print("=" * 40)
print("CALCULADORA DE FREELA")
print("=" * 40)

total = 0
for servico, preco in servicos.items():
    print(f"  {servico:.<28} R$ {preco:,.2f}")
    total += preco

print("=" * 40)
print(f"  TOTAL: R$ {total:,.2f}")

# desconto se total > 2000
if total > 2000:
    desconto = total * 0.10
    print(f"  Desconto (10%): R$ {desconto:,.2f}")
    print(f"  TOTAL FINAL: R$ {total - desconto:,.2f}")`,
      explain: "Use estruturas que você aprendeu no mod3: lista/dicionário, for, if, formatação de string. O script deve ter uma SAÍDA clara (printar algo útil). Tema livre — calculadora de preços, gerador de paletas, contador de palavras, lista filtrada.",
      errors: [
        { bad: "Fazer um script gigante 'pra impressionar'", fix: "Script simples e funcional > script complexo e bugado.", why: "Avaliação é 'funciona?' antes de 'é sofisticado?'. Simples e funcional é entrega." },
        { bad: "Script desconectado do tema do portfólio", fix: "Se o portfólio é de fotografia, o script é sobre fotos. Se é de design, sobre design.", why: "Coerência entre as partes é o que torna o projeto INTEGRADOR. Senão são duas coisas separadas." },
        { bad: "Esquecer de testar o script antes de entregar", fix: "Rode no terminal pelo menos 3 vezes com inputs diferentes.", why: "Erro só aparece em execução. Bug que escapa do teste vai aparecer pro avaliador." },
        { bad: "Hardcodar valores sem explicar", fix: "Comente as constantes principais ou use variáveis com nome claro.", why: "Quem lê (você daqui 1 mês ou outra pessoa) precisa entender de onde vêm os números." },
      ] },
    { n: "T5", title: "Revisão final com heurísticas + teste com pessoa",
      intro: "Sua página está 'pronta' pra você — porque você projetou ela. Agora veja com olhos novos. Esta etapa pega 80% dos problemas.",
      lang: "checklist de entrega",
      code: `1. AUTOAVALIAÇÃO — passe pelas 10 heurísticas (mod4):
   ☐ A ação principal tem destaque?
   ☐ Linguagem é simples (sem jargão)?
   ☐ Existe forma de voltar/desfazer?
   ☐ Botões consistentes (mesma cor, formato)?
   ☐ Mensagens de erro humanas?
   ☐ Visual minimalista (sem excesso)?
   ☐ Imagens têm alt?
   ☐ Contraste passa AA?

2. TESTE EM 3 NAVEGADORES e 2 RESOLUÇÕES:
   - Chrome desktop
   - Firefox desktop
   - Mobile (DevTools → toggle device → iPhone/Pixel)
   - Veja se quebra em algum

3. TESTE COM PESSOA REAL:
   - Mostre a página para alguém que não conhece
   - Não explique nada. Só mostre.
   - Pergunte:
     a) Em 5 segundos: o que essa página é sobre?
     b) Onde você clicaria para [ação principal]?
     c) Tem algo confuso?
   - ANOTE as respostas — não defenda a página

4. AJUSTES baseados no feedback (priorize):
   - Se 2+ pessoas confundiram a mesma coisa = bug certo
   - Resolva primeiro o que afeta a ação principal

5. CHECAGEM TÉCNICA FINAL:
   ☐ Console do DevTools sem erros (F12)
   ☐ Todas as imagens carregam
   ☐ Todos os links funcionam
   ☐ Script Python roda sem erro`,
      explain: "Esta etapa é a diferença entre 'projeto que existe' e 'projeto que funciona'. Faça mesmo que pareça que está 'tão bom'. O usuário vê coisas que você não vê porque está dentro do projeto.",
      errors: [
        { bad: "Pular o teste com pessoa real ('eu sei que está bom')", fix: "Mostre para 3 pessoas. Mesmo quem não entende de design.", why: "Você não consegue ver com olhos novos. Outra pessoa consegue, e o feedback dela é ouro." },
        { bad: "Explicar a página antes da pessoa interagir", fix: "Mostre. Fique calado. Anote.", why: "Se a pessoa precisa que você explique pra entender, é um bug — porque o usuário final vai estar sozinho." },
        { bad: "Tentar consertar TUDO que aparece no feedback", fix: "Priorize: itens que 2+ pessoas mencionaram + itens que afetam ação principal.", why: "Algumas observações são gosto pessoal. Padrões repetidos são problemas reais." },
        { bad: "Não checar console do DevTools", fix: "F12 → Console. Não pode ter mensagens vermelhas.", why: "Erros no console são sinais de coisas quebradas que talvez funcionem 'por acidente'. Vai quebrar depois." },
      ] },
  ],
  act: { type: "c", title: "Lista de entrega", sub: "Cada passo já foi detalhado nos tutoriais T1 a T5 — volte se precisar.", msg: "Parabéns! Você criou um portfólio web real com HTML, CSS, Python e boas práticas de UI/UX. Este é o ponto de partida — não o fim. GitHub e MySQL chegam em breve.",
    steps: [
      { id: "p1", l: "Escolha o tema e defina a ação principal da página (T1)" },
      { id: "p2", l: "Faça o wireframe no papel — caixas e textos (T2)" },
      { id: "p3", l: "Defina paleta (3 cores) e tipografia (2 fontes) antes de codar (T3)" },
      { id: "p4", l: "Crie index.html e style.css no VS Code com :root para variáveis CSS (T3)" },
      { id: "p5", l: "Implemente o HTML com pelo menos 4 seções distintas" },
      { id: "p6", l: "Garanta hierarquia visual: h1 > h2 > parágrafo (mod4 T1)" },
      { id: "p7", l: "Confira contraste de TODOS os pares texto/fundo (mod4 T2)" },
      { id: "p8", l: "Escreva um script Python relacionado ao tema (T4)" },
      { id: "p9", l: "Teste em Chrome, Firefox e mobile (DevTools) (T5)" },
      { id: "p10", l: "Aplique o checklist das 10 heurísticas de Nielsen (T5)" },
      { id: "p11", l: "Mostre para 3 pessoas e anote os pontos de confusão (T5)" },
      { id: "p12", l: "Console do DevTools (F12) sem mensagens vermelhas (T5)" },
    ] },
};
