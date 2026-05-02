export default {
  id: "mod0", badge: "Módulo 0", color: "#B85438", time: "~50 min",
  t1: "Você já", t2: "programa.",
  subtitle: "Antes de qualquer linguagem, descubra que o raciocínio por trás já está em você.",
  sections: [
    { num: "1", label: "Definição", sc: "#7F77DD", title: "O que é programar?",
      body: "Programar é dar instruções tão claras que até alguém completamente literal consiga seguir sem errar. Um computador não interpreta, não adivinha e não preenche lacunas.",
      x: { t: "n", e: "💡", tx: "A parte mais importante da programação não é a linguagem — é o raciocínio. Toda sintaxe se aprende em dias. O raciocínio lógico é o que leva meses.", bg: "#EEEDFE", tc: "#3C3489" } },
    { num: "2", label: "Comparação", sc: "#1D9E75", title: "Prompt, pseudocódigo e código",
      body: "Um prompt bem escrito e um algoritmo têm estrutura idêntica: objetivo claro, parâmetros, restrições. A diferença não é a inteligência — é só a linguagem usada.",
      x: { t: "tb", h: ["", "Prompt", "Pseudocódigo", "Python"], r: [["Executa", "IA", "Ninguém", "Computador"], ["Linguagem", "Natural", "Estruturada", "Formal"], ["Você usa", "Sim", "Módulo 1", "Módulo 3"]] } },
    { num: "3", label: "Circunstâncias", sc: "#D47F1A", title: "Por que aprender se a IA já escreve código?",
      body: "A IA escreve código — mas quem dirige a IA precisa entender o resultado. Quem sabe ler código corrige a IA na hora. Quem não sabe fica preso em cada ajuste.",
      x: { t: "n", e: "🤖", tx: "O papel do programador está mudando de 'quem escreve código' para 'quem sabe o que o código deve fazer'.", bg: "#EEF4FB", tc: "#0C3460" } },
    { num: "4", label: "Relação", sc: "#3B8BD4", title: "Onde este módulo se encaixa",
      body: "Este módulo estabelece que o raciocínio algorítmico já existe antes de qualquer linguagem.",
      x: { t: "c", lang: "Mapa de conexões", code: "Módulo 0\n  ├── Alimenta:     Módulo 1 (lógica em pseudocódigo)\n  └── Prepara para: todos os outros módulos" } },
    { num: "5", label: "Testemunho", sc: "#D4537E", title: "Quem já esteve no mesmo lugar",
      body: "Sasha Laundy é designer e engenheira de software. Deu uma palestra na PyCon 2013 vinda do design, não da engenharia.",
      x: { t: "q", q: "A coisa que mais me surpreendeu ao aprender a programar foi perceber o quanto do raciocínio eu já fazia. Só não tinha nome para ele.", a: "Sasha Laundy", r: "Designer → Engenheira · PyCon 2013" } },
  ],
  tutorials: [
    { n: "T1", title: "Anatomia de um algoritmo do dia a dia",
      intro: "Algoritmo é só uma sequência de passos para alcançar um objetivo. Você usa centenas por dia sem perceber — esta receita comum tem todas as partes que um programa de computador também tem.",
      lang: "Receita: café passado",
      code: `OBJETIVO: 1 xícara de café passado

ENTRADAS:
  - 240ml de água
  - 10g de pó de café
  - 1 filtro de papel

PASSOS:
  1. Ferver a água até 92°C
  2. Colocar o filtro no suporte
  3. Adicionar o pó no filtro
  4. Despejar a água em movimentos circulares
  5. Esperar escoar

SAÍDA: 1 xícara de café`,
      explain: "Todo algoritmo tem: objetivo (o que quer alcançar), entradas (insumos), passos (em ordem), e saída (resultado). Em programação não é diferente — só muda a linguagem dos passos.",
      errors: [
        { bad: "Listar passos sem objetivo claro", fix: "Comece sempre pelo OBJETIVO: o que precisa estar pronto no fim?", why: "Sem objetivo, os passos viram tarefas soltas. Você não sabe quando parou." },
        { bad: "Pular ordem ('antes ferro a água, mas primeiro coloco o filtro')", fix: "Liste os passos na ordem em que serão executados, mesmo que pareça óbvio.", why: "Ordem implícita confunde — outra pessoa (ou um computador) não sabe o que vem antes." },
        { bad: "Misturar 'o quê' com 'como'", fix: "Primeiro liste o quê fazer. Otimização (como) vem depois.", why: "Tentar otimizar sem ter o esqueleto pronto leva a refazer várias vezes." },
      ] },
    { n: "T2", title: "Decomposição — quebrar o problema grande em pequenos",
      intro: "Programadores não resolvem problemas grandes — resolvem 10 problemas pequenos que somados são o grande. Esta é a habilidade mais importante deste módulo.",
      lang: "Pedido: organizar uma festa",
      code: `PROBLEMA GRANDE:
  "Organizar minha festa de aniversário"

DECOMPOSIÇÃO em problemas menores:
  ├── 1. Definir data e horário
  ├── 2. Lista de convidados (quem? quantos?)
  ├── 3. Local (casa? salão? parque?)
  ├── 4. Comida e bebida
  │   ├── 4.1 Cardápio
  │   ├── 4.2 Quantidade por convidado
  │   └── 4.3 Onde comprar
  ├── 5. Convites (digital? físico? quando enviar?)
  └── 6. Decoração

CADA UM destes vira sua própria sequência de passos.`,
      explain: "Em vez de pensar 'vou organizar a festa' (paralisa), você pensa em 'vou definir a data' (faz em 5 min). Cada subproblema é resolvido isolado e o todo emerge das partes. É exatamente o que você fará ao programar.",
      errors: [
        { bad: "Começar a executar antes de decompor", fix: "Sempre faça o mapa primeiro. Mesmo num papel rascunho.", why: "Executar sem mapa leva a esquecer pedaços e voltar pra trás várias vezes." },
        { bad: "Decompor em pedaços ainda gigantes ('comida e bebida' como 1 item)", fix: "Continue decompondo até cada item caber numa frase de ação clara.", why: "Item grande demais ainda é vago. Quebrar mais revela passos escondidos." },
        { bad: "Decompor demais — 30 sub-itens para uma festa simples", fix: "Pare quando o item for executável em 5–15 min. Mais granular vira fricção.", why: "Excesso de detalhe consome tempo de planejamento que poderia ser execução." },
      ] },
    { n: "T3", title: "Extraindo parâmetros de um pedido em texto",
      intro: "Toda instrução em linguagem natural tem parâmetros escondidos. Aprender a extraí-los é o passo zero pra escrever prompts e algoritmos.",
      lang: "Pedido: legenda de Instagram",
      code: `PEDIDO ORIGINAL (texto livre):
  "Faz uma legenda pro meu post de café da manhã,
   tom descontraído, máximo 3 linhas, com emoji
   no final, sem hashtags."

PARÂMETROS EXTRAÍDOS:
  tema       = "café da manhã"
  tom        = "descontraído"
  max_linhas = 3
  emoji      = "no final"
  hashtags   = "não usar"

ESQUELETO DA INSTRUÇÃO:
  legenda(tema, tom, max_linhas, emoji, hashtags)`,
      explain: "Um prompt bem escrito é uma chamada de função em linguagem natural. Quanto mais explícitos os parâmetros, mais previsível o resultado — vale para IA, para colega de trabalho e para você mesmo daqui 1 mês.",
      errors: [
        { bad: "Pedidos vagos: 'faz uma legenda boa pro meu post'", fix: "Adicione tema, tom, tamanho, restrições.", why: "Vago entrega resultado vago. A IA (ou pessoa) chuta valores e raramente acerta o que você queria." },
        { bad: "Detalhes demais: 5 parágrafos de instruções para uma legenda", fix: "Mantenha os parâmetros essenciais. Um prompt bom tem 3–6 parâmetros.", why: "Excesso confunde. Sinais conflitantes fazem o resultado piorar, não melhorar." },
        { bad: "Não dizer o que NÃO quer", fix: "Restrições são parâmetros tão importantes quanto o conteúdo: 'sem hashtags', 'sem ponto-e-vírgula'.", why: "Sem restrições, o gerador adiciona o que ele acha melhor. Geralmente não é o que você quer." },
      ] },
    { n: "T4", title: "Erros conceituais comuns",
      intro: "Antes do quiz, conheça as confusões mais clássicas de quem está começando — todas tratadas em alguma das alternativas.",
      lang: "ideia → realidade",
      code: `→ "Programar é para quem é bom em matemática"
   • Falso. Programar é raciocínio lógico estruturado.
   • Matemática avançada só importa em áreas específicas
     (gráficos 3D, IA, criptografia).

→ "A IA agora faz tudo, então não preciso aprender"
   • A IA escreve código, mas precisa de quem dirija.
   • Quem entende código pede mudanças certas.
   • Quem não entende fica preso em cada erro da IA.

→ "Tenho que decorar todas as funções e sintaxes"
   • Não. Sintaxe se consulta. Raciocínio se constrói.
   • Programadores experientes consultam docs o dia todo.

→ "Algoritmo é coisa de cientista da computação"
   • Algoritmo é sequência de passos. Você usa todo dia.
   • Receita, GPS, escolher roupa, organizar agenda — tudo é.`,
      explain: "Programar é uma habilidade de raciocínio. A linguagem (Python, JavaScript) é só o vocabulário. Quem entende o raciocínio aprende qualquer linguagem em semanas; quem decorou sintaxe sem entender lógica trava no primeiro problema novo.",
      errors: [] },
  ],
  act: { type: "q", qs: [
    { q: "Qual dessas sequências é um algoritmo válido?", o: ["Azul, cachorro, sete", "Acorde → escove os dentes → tome café → saia", "Feliz, janela, laranja", "Corra, pensar, bonito"], a: 1, ok: "Exato! Cada passo leva ao próximo em direção a um objetivo claro.", no: "Um algoritmo tem ordem e objetivo. Qual lista tem cada item levando ao próximo?" },
    { q: "\"Legenda pro Instagram, tom descontraído, máx 3 linhas, emoji no final, sem hashtags.\" Quantas instruções distintas?", o: ["2", "3", "5", "7"], a: 2, ok: "Isso! As 5: tema, tom, limite, emoji, sem hashtags. Você já especifica parâmetros.", no: "Conte cada especificação: tema, tom, tamanho, o que adicionar, o que remover." },
    { q: "Por que entender código é valioso mesmo que a IA escreva código para você?", o: ["Para impressionar", "A IA vai ser desativada", "Para dirigir a IA com precisão e corrigir erros", "Não é — a IA faz tudo melhor"], a: 2, ok: "Perfeito. Toda ferramenta funciona melhor nas mãos de quem entende o resultado.", no: "Quando a IA gera código errado, o que diferencia quem resolve de quem fica travado?" },
    { q: "No Canva, você define posição, tamanho e cor de cada elemento. Isso é:", o: ["Arte pura — sem lógica", "Dar instruções precisas a um sistema", "Matemática avançada", "IA gerando arte"], a: 1, ok: "Exatamente. Cada ajuste no Canva é uma instrução para um sistema.", no: "Definir posição, tamanho e cor é emitir instruções para um sistema." },
  ] },
};
