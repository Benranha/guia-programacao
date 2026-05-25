export default {
  id: "vercel",
  badge: "🚀 Publicar",
  color: "#C4622D",
  time: "~20 min",
  t1: "Do seu computador",
  t2: "para o mundo.",
  subtitle:
    "Você aprendeu a construir. Agora vem a parte que mais impressiona: colocar o que você fez na internet, com um link real, que qualquer pessoa acessa de qualquer lugar — em menos de 5 minutos.",

  sections: [
    {
      num: "V1",
      label: "Definição",
      sc: "#7F77DD",
      title: "O que é o Vercel?",
      body: "Vercel é uma plataforma de hospedagem feita especificamente para projetos React e Vite. Você conecta seu projeto uma vez e, a partir daí, toda vez que você salvar uma alteração no GitHub, o Vercel detecta, reconstrói e publica automaticamente — sem você precisar fazer mais nada.",
      xs: [
        {
          t: "n",
          e: "💡",
          tx: "Pensa assim: o GitHub guarda o código. O Vercel pega esse código, constrói o site e entrega o link. Os dois trabalham juntos.",
        },
      ],
    },
    {
      num: "V2",
      label: "Comparação",
      sc: "#4A90D9",
      title: "Local vs. publicado",
      body: "",
      xs: [
        {
          t: "tb",
          h: ["Situação", "O que acontece", "Quem vê"],
          r: [
            ["npm run dev (local)", "Roda só no seu computador", "Só você"],
            ["Push para o GitHub", "Código fica salvo na nuvem", "Quem tiver acesso ao repo"],
            ["Deploy no Vercel", "Gera um link público real", "Qualquer pessoa, qualquer lugar"],
          ],
        },
      ],
    },
    {
      num: "V3",
      label: "Relação",
      sc: "#2D7A4F",
      title: "Como funciona o fluxo",
      body: "",
      xs: [
        {
          t: "flow",
          steps: [
            { icon: "💻", label: "Você edita o código" },
            { icon: "📦", label: "git add + commit + push" },
            { icon: "🐙", label: "GitHub recebe o código" },
            { icon: "⚡", label: "Vercel detecta em segundos" },
            { icon: "🌐", label: "Site atualizado no link" },
          ],
        },
        {
          t: "n",
          e: "🔁",
          tx: "Depois de configurar uma vez, você nunca mais precisa mexer no Vercel. O ciclo vira: edita → push → publicado.",
        },
      ],
    },
    {
      num: "V4",
      label: "Passo a passo",
      sc: "#C4622D",
      title: "Fazendo do zero",
      body: "",
      xs: [
        {
          t: "step",
          number: "1",
          title: "Criar conta no Vercel",
          text: "Acesse vercel.com e clique em Sign Up. Use a opção Continue with GitHub — isso conecta os dois serviços de uma vez e você não precisa configurar nada manualmente depois.",
        },
        {
          t: "step",
          number: "2",
          title: "Colocar o projeto no GitHub",
          text: "Se ainda não fez, abra o terminal dentro da pasta do projeto e rode os comandos abaixo. Depois, no github.com, crie um repositório novo e copie os dois comandos que ele mostrar.",
        },
        {
          t: "c",
          lang: "bash",
          code: "git init\ngit add .\ngit commit -m \"primeiro commit\"\ngit remote add origin https://github.com/seu-usuario/nome-do-projeto.git\ngit push -u origin main",
        },
        {
          t: "step",
          number: "3",
          title: "Importar no Vercel",
          text: "No Vercel, clique em Add New Project. Seu repositório vai aparecer na lista. Clique nele e depois em Deploy. O Vercel detecta o Vite automaticamente — não precisa mudar nenhuma configuração.",
        },
        {
          t: "n",
          e: "✅",
          tx: "Em menos de 1 minuto aparece a tela de sucesso com o seu link — algo como nome-do-projeto.vercel.app. Esse link funciona em qualquer dispositivo, sem precisar abrir o computador.",
        },
      ],
    },
    {
      num: "V5",
      label: "Atualização",
      sc: "#888830",
      title: "Atualizando o projeto",
      body: "A partir daqui, sempre que você fizer uma alteração no projeto e quiser publicar, é só rodar:",
      xs: [
        {
          t: "c",
          lang: "bash",
          code: 'git add .\ngit commit -m "descreve o que mudou"\ngit push',
        },
        {
          t: "n",
          e: "⚡",
          tx: "O Vercel detecta o push e publica a versão nova automaticamente em cerca de 30 segundos. Você não precisa entrar no Vercel nunca mais — só quando quiser ver as métricas ou o histórico de deploys.",
        },
      ],
    },
    {
      num: "V6",
      label: "Testemunho",
      sc: "#8B4A8B",
      title: "Por que isso importa",
      body: "Antes, para publicar um site você precisava contratar hospedagem, configurar servidor, fazer upload manual por FTP e torcer para nada quebrar. Era caro, lento e técnico demais para quem estava começando. O Vercel eliminou toda essa complexidade. Hoje, o fluxo inteiro — do código ao link público — cabe em três comandos de terminal. Isso mudou quem pode publicar na internet: não precisa mais ser só developer sênior. Qualquer pessoa que aprenda o básico de React e Git consegue ter um projeto no ar.",
      xs: [
        {
          t: "n",
          e: "🎨",
          tx: "Para uma designer, isso significa que o protótipo que você construiu não fica parado no seu computador. Ele vira um link que você manda para o cliente, para o portfólio, para a entrevista de emprego.",
        },
      ],
    },
  ],

  act: {
    type: "q",
    qs: [
      {
        q: "O que o Vercel faz automaticamente quando você dá push no GitHub?",
        o: [
          "Abre o projeto no seu computador",
          "Detecta a alteração e publica a nova versão do site",
          "Envia um e-mail pedindo aprovação do deploy",
          "Cria um novo repositório no GitHub",
        ],
        a: 1,
        ok: "Correto! O Vercel fica 'ouvindo' o GitHub — qualquer push novo ele detecta e publica automaticamente.",
        no: "Releia 'Como funciona o fluxo'. O Vercel fica ouvindo o GitHub e age automaticamente a cada push.",
      },
      {
        q: "Qual é a diferença entre rodar 'npm run dev' e publicar no Vercel?",
        o: [
          "Nenhuma, os dois criam o mesmo link",
          "npm run dev é mais rápido que o Vercel",
          "npm run dev só funciona no seu computador; o Vercel cria um link acessível por qualquer pessoa",
          "O Vercel só funciona com projetos pagos",
        ],
        a: 2,
        ok: "Correto! A diferença está em quem consegue acessar: só você, ou o mundo.",
        no: "Releia 'Local vs. publicado'. A diferença está em quem consegue acessar: só você, ou qualquer pessoa.",
      },
      {
        q: "Depois de configurar o projeto no Vercel pela primeira vez, o que você precisa fazer para publicar uma atualização?",
        o: [
          "Entrar no Vercel e clicar em Deploy novamente",
          "Baixar o projeto e fazer upload manual",
          "Rodar git add, commit e push — o Vercel cuida do resto",
          "Recriar o projeto do zero",
        ],
        a: 2,
        ok: "Correto! Depois de configurar, o ciclo é só: edita → push → publicado.",
        no: "Releia 'Atualizando o projeto'. Depois de configurar, apenas git add, commit e push — o Vercel cuida do resto.",
      },
      {
        q: "Para criar uma conta no Vercel conectada ao GitHub, qual opção você deve escolher no cadastro?",
        o: [
          "Sign Up com e-mail e senha",
          "Continue with GitHub",
          "Continue with Google",
          "Download Vercel CLI",
        ],
        a: 1,
        ok: "Correto! Usar o GitHub no cadastro conecta os dois serviços de uma vez, sem configuração manual.",
        no: "Releia o Passo 1. Usar o GitHub no cadastro conecta os dois serviços automaticamente.",
      },
    ],
  },
};
