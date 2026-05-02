export default {
  id: "mod2", badge: "Módulo 2", color: "#D47F1A", time: "~3h",
  t1: "HTML + CSS —", t2: "o Canva do código.",
  subtitle: "Toda página web do mundo é feita com HTML e CSS. Você vai criar a sua antes do fim deste módulo.",
  sections: [
    { num: "1", label: "Definição", sc: "#7F77DD", title: "HTML e CSS: estrutura e estilo",
      body: "Se uma página web fosse uma casa: HTML é a construção — paredes, janelas, porta. CSS é a decoração — cor das paredes, estilo dos móveis, iluminação. Você não pode decorar sem paredes.",
      x: { t: "tb", h: ["", "HTML", "CSS"], r: [["Significa", "HyperText Markup Language", "Cascading Style Sheets"], ["Para quê", "Definir o que existe na página", "Como cada coisa aparece"], ["Analogia", "Esqueleto e estrutura", "Pele, roupa, visual"], ["Arquivo", "index.html", "style.css"]] } },
    { num: "2", label: "Comparação", sc: "#1D9E75", title: "HTML + CSS vs. Canva vs. Word",
      body: "O Canva é mais rápido para criar artes — mas o que você cria só existe dentro do Canva. Com HTML + CSS, o que você cria existe na internet, em qualquer navegador.",
      x: { t: "tb", h: ["", "HTML + CSS", "Canva", "Word"], r: [["Publica na web", "Sim, qualquer servidor", "Na plataforma Canva", "Limitado"], ["Controle", "Total", "Parcial", "Baixo"], ["Aprende lógica", "Sim", "Não", "Não"]] } },
    { num: "3", label: "Circunstâncias", sc: "#D47F1A", title: "Tags e propriedades essenciais",
      body: "HTML funciona com tags — palavras entre colchetes angulares. CSS aplica visual através de propriedades.",
      xs: [
        { t: "c", lang: "Tags HTML mais usadas", code: "<h1>Título principal</h1>     ← h1 a h6\n<p>Um parágrafo.</p>           ← parágrafos\n<a href='url'>Link</a>         ← link\n<img src='foto.jpg' alt='x'>   ← imagem\n<ul><li>Item</li></ul>         ← lista\n<div>Container</div>           ← caixa" },
        { t: "c", lang: "Propriedades CSS mais usadas", code: "body {\n  background-color: #F8F6F0;\n  font-family: Georgia, serif;\n  font-size: 16px;\n  padding: 2rem;\n}\nh1 { color: #B85438; font-size: 2rem; }\n.cartao { border-radius: 12px; padding: 1.5rem; }" },
      ] },
    { num: "4", label: "Relação", sc: "#3B8BD4", title: "HTML + CSS no guia",
      body: "HTML e CSS são a base visual do guia. Tudo que você aprende em UI/UX (Módulo 4) será aplicado aqui.",
      x: { t: "c", lang: "Dependências", code: "Módulo 2\n  ├── Depende de:  Módulo Extra (VS Code + Live Server)\n  ├── Leva a:      Módulo 4 (UI/UX aplicado via CSS)\n  └── Conecta com: Módulo 3 (Python pode gerar HTML)" } },
    { num: "5", label: "Testemunho", sc: "#D4537E", title: "A linguagem que construiu a internet",
      body: "Tim Berners-Lee criou o HTML em 1989 para compartilhar documentos entre pesquisadores. Não fazia ideia de que criaria a base de toda a internet moderna.",
      x: { t: "q", ac: "#D47F1A", q: "A web é mais uma invenção social do que técnica. Eu a projetei para ter um efeito social — para ajudar as pessoas a trabalharem juntas.", a: "Tim Berners-Lee", r: "Inventor do HTML e da World Wide Web · 1989" } },
  ],
  tutorials: [
    { n: "T1", title: "Anatomia de um arquivo HTML",
      intro: "Todo arquivo HTML começa com a mesma estrutura. Sem ela, o navegador entra em modo de compatibilidade antiga e o CSS começa a quebrar de maneiras estranhas.",
      lang: "index.html",
      code: `<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <title>Minha página</title>
  </head>
  <body>
    <!-- conteúdo visível vai aqui -->
  </body>
</html>`,
      explain: "Quatro partes obrigatórias: DOCTYPE diz ao navegador o tipo do documento; <html> envolve TUDO; <head> guarda configurações que não aparecem na tela (título da aba, charset, link do CSS); <body> é o que o usuário enxerga.",
      errors: [
        { bad: "Começar direto com <html> sem o <!DOCTYPE html>", fix: "Sempre coloque <!DOCTYPE html> na primeira linha — sem aspas, sem nada antes.", why: "Sem isso, o navegador entra em 'quirks mode' e regras de CSS funcionam de forma imprevisível." },
        { bad: "Escrever texto direto dentro do <head>", fix: "Texto que aparece na página vai SEMPRE no <body>. <head> é só para meta tags, título e links.", why: "Conteúdo no <head> é ignorado pelo navegador na hora de renderizar — fica invisível." },
        { bad: "Esquecer de fechar </body> ou </html>", fix: "Toda tag aberta precisa fechar. Conte mentalmente: para cada <tag>, uma </tag>.", why: "Tags não fechadas fazem o navegador adivinhar onde elas terminam — e ele adivinha errado." },
        { bad: "Usar <meta charset='utf-8'> com aspas simples e em minúsculo", fix: "Funciona, mas o padrão é <meta charset=\"UTF-8\"> com aspas duplas.", why: "Mistura de aspas confunde quando você copia/cola código de fontes diferentes." },
      ] },
    { n: "T2", title: "Tags de conteúdo essenciais",
      intro: "Cada tag tem um propósito específico. Usar a tag certa não é frescura: afeta acessibilidade (leitores de tela), SEO (Google) e reaproveitamento futuro.",
      lang: "dentro do <body>",
      code: `<h1>Título principal (só um por página)</h1>
<h2>Subtítulo de seção</h2>

<p>Um parágrafo de texto. Pode ter
   várias linhas — o navegador junta tudo.</p>

<a href="https://exemplo.com">Um link</a>

<img src="foto.jpg" alt="Descrição da foto">

<ul>
  <li>Item de lista</li>
  <li>Outro item</li>
</ul>

<div class="cartao">Caixa genérica para agrupar coisas</div>`,
      explain: "<h1>–<h6> são títulos em ordem de importância. <p> = parágrafo. <a> = link (precisa do href). <img> = imagem (precisa de src e alt). <ul>+<li> = lista. <div> = caixa neutra para organizar visualmente.",
      errors: [
        { bad: "Vários <h1> na mesma página", fix: "Um <h1> só, geralmente o nome da página ou seu nome. Depois <h2>, <h3>...", why: "A hierarquia de títulos é como um índice — leitores de tela e o Google usam isso para entender a estrutura." },
        { bad: "<img src='foto.jpg'> sem o atributo alt", fix: "<img src='foto.jpg' alt='Foto do meu cachorro Rex'>", why: "Sem alt, pessoas que usam leitor de tela não sabem o que tem na imagem. Também aparece se a imagem falhar ao carregar." },
        { bad: "<a>clique aqui</a> sem href", fix: "<a href='outra-pagina.html'>clique aqui</a>", why: "Link sem destino não é link — é texto azul que não faz nada quando clicado." },
        { bad: "Quebrar parágrafos com várias <br>", fix: "Use <p> separados. <br> é só para quebra dentro de um mesmo parágrafo (endereço, poesia).", why: "<br> em série bagunça espaçamento e dificulta estilizar com CSS depois." },
      ] },
    { n: "T3", title: "Linkando o arquivo CSS no HTML",
      intro: "HTML e CSS ficam em arquivos separados. Você precisa avisar o HTML que existe um CSS para usar — caso contrário, o navegador nem olha pro arquivo.",
      lang: "dentro do <head>",
      code: `<head>
  <meta charset="UTF-8">
  <title>Minha página</title>
  <link rel="stylesheet" href="style.css">
</head>`,
      explain: "A tag <link> dentro do <head> faz a ponte. 'rel=\"stylesheet\"' avisa que é folha de estilo. 'href=\"style.css\"' é o caminho do arquivo. Se os dois estão na mesma pasta, basta o nome do arquivo.",
      errors: [
        { bad: "<link href=\"style.css\"> sem o rel", fix: "<link rel=\"stylesheet\" href=\"style.css\">", why: "Sem o rel, o navegador não sabe que é CSS — ele simplesmente ignora o arquivo." },
        { bad: "Colocar a tag <link> dentro do <body>", fix: "Sempre dentro do <head>.", why: "Funciona até carregar — mas a página pisca sem estilo antes de aplicar o CSS. É erro de validação." },
        { bad: "href=\"/style.css\" quando o arquivo está na mesma pasta", fix: "href=\"style.css\" (sem a barra inicial).", why: "A barra significa 'raiz do servidor' — em projeto local pelo Live Server isso quebra o caminho." },
        { bad: "Salvar o CSS com nome 'Style.css' e linkar como 'style.css'", fix: "Mantenha tudo minúsculo e sem acento nos nomes de arquivo.", why: "No seu computador pode até funcionar, mas em servidor Linux (publicação) é case-sensitive — vai quebrar." },
      ] },
    { n: "T4", title: "Seletores CSS — tag, classe e id",
      intro: "Para aplicar estilo, o CSS precisa saber QUAL elemento receber o estilo. Existem três formas — a confusão entre elas é o erro #1 de quem está começando.",
      lang: "style.css",
      code: `/* por TAG — afeta TODOS os <p> da página */
p {
  color: #333333;
  line-height: 1.6;
}

/* por CLASSE — começa com . — pode repetir em vários elementos */
.destaque {
  background: #FFF3B0;
  padding: 8px;
}

/* por ID — começa com # — só UM elemento na página inteira */
#cabecalho {
  font-size: 48px;
}`,
      explain: "TAG = todos os elementos daquele tipo. CLASSE (ponto) = todos os elementos com aquela class. ID (cerquilha) = só o único elemento com aquele id. No HTML você usa class=\"destaque\" e id=\"cabecalho\" para conectar.",
      errors: [
        { bad: "Usar # quando devia ser . — ou vice-versa", fix: "Decore: PONTO é classe, CERQUILHA é único. Se você quer reaproveitar o estilo, use classe.", why: "Esse é o erro mais comum de iniciante: o CSS é válido, mas simplesmente não bate com nada — nada acontece, sem erro." },
        { bad: "Dois elementos com o mesmo id", fix: "Use class quando precisar repetir.", why: "id deve ser único. Repetir hoje funciona, mas depois quando você usar JavaScript vai pegar só o primeiro e te deixar maluco." },
        { bad: ".meu botao { color: red; }", fix: ".meu-botao { color: red; } — sem espaço, com hífen.", why: "O espaço significa 'descendente'. .meu .botao busca um .botao DENTRO de .meu — coisa totalmente diferente." },
        { bad: "Esquecer o ; no fim de cada linha", fix: "color: red; background: blue; — ponto-e-vírgula em TODA linha.", why: "Sem ponto-e-vírgula, a próxima regra é colada na anterior e o CSS quebra silenciosamente daquele ponto em diante." },
      ] },
    { n: "T5", title: "Box model — espaço dentro e fora",
      intro: "Cada elemento HTML é uma caixa retangular. Você controla o espaço dentro da caixa (padding), a borda da caixa (border) e o espaço fora (margin). Entender isso é metade do CSS.",
      lang: "style.css",
      code: `.cartao {
  margin: 20px;       /* espaço FORA da caixa */
  border: 2px solid #B85438;
  padding: 16px;      /* espaço DENTRO da caixa, entre borda e conteúdo */
  background: white;
  border-radius: 12px;
}

/* atalho universal — recomendado */
* { box-sizing: border-box; }`,
      explain: "Pense numa moldura: padding é o espaço entre a foto e o vidro (interno). border é o vidro. margin é o espaço entre a moldura e a parede (externo). Os três se SOMAM no tamanho final — a menos que você use box-sizing: border-box.",
      errors: [
        { bad: "Usar margin para afastar texto da borda do próprio elemento", fix: "Use padding. Margin afasta de OUTROS elementos — padding cria espaço DENTRO.", why: "Margin empurra a caixa inteira. Quem precisa respirar é o conteúdo dentro dela — isso é padding." },
        { bad: "padding: 10 20 (sem unidade)", fix: "padding: 10px 20px — sempre com unidade.", why: "CSS exige unidade em quase todo valor de tamanho. Sem unidade, a regra é ignorada e nada acontece." },
        { bad: "Achar que width: 200px sempre dá 200px no total", fix: "Adicione * { box-sizing: border-box; } no topo do CSS.", why: "Por padrão, width só conta o conteúdo. Padding e border somam por fora — uma caixa de 200px com padding 20px tem 240px de largura real." },
        { bad: "margin: 20 px (com espaço entre número e unidade)", fix: "margin: 20px — sem espaço, colado.", why: "Espaço quebra o valor. CSS é literal — '20 px' não é entendido como '20 pixels'." },
      ] },
    { n: "T6", title: "Erros que travam quem está começando",
      intro: "Antes de seguir para a atividade, conheça os sintomas mais comuns. Quando travar — e você vai travar — volte aqui.",
      lang: "sintomas → causas",
      code: `→ "Mudei o CSS e nada acontece"
   • Esqueceu de salvar o arquivo (Ctrl+S / Cmd+S)
   • Live Server em cache → recarregue forçado (Ctrl+Shift+R)
   • CSS linkado errado → revise T3
   • Erro de digitação no seletor (.cartao vs .Cartao)

→ "Imagem não aparece — só um quadradinho"
   • Caminho errado em src
   • Arquivo fora da pasta correta
   • Letra maiúscula trocada (Foto.jpg ≠ foto.jpg)
   • Esqueceu a extensão (.jpg, .png)

→ "Tudo ficou em uma linha só"
   • Esqueceu de fechar uma tag anterior
   • Usou <span> onde precisava de <div>
   • CSS com display: inline em algo que devia ser block

→ "A regra CSS está sendo ignorada"
   • Outra regra mais específica está sobrescrevendo
   • Falta ponto-e-vírgula na linha de cima
   • Faltou unidade (px, rem, %)
   • Usou # quando era . (ou vice-versa)`,
      explain: "Quando algo não funciona: 1) salve o arquivo (Ctrl+S), 2) atualize forçado (Ctrl+Shift+R), 3) abra o DevTools (F12) e veja o console e a aba Elements — o navegador mostra o que está acontecendo de verdade.",
      errors: [] },
  ],
  act: { type: "c", title: "Construa sua primeira página", sub: "Siga os passos em ordem. Cada passo já foi explicado em detalhe nos tutoriais T1 a T6 — volte se precisar.", msg: "Você criou uma página web real do zero com HTML e CSS. Ela roda no navegador e pode ser publicada na internet.",
    steps: [
      { id: "h1", l: "Crie o arquivo index.html na pasta guia-programacao (T1)" },
      { id: "h2", l: "Adicione a estrutura básica: DOCTYPE, html, head, body (T1)" },
      { id: "h3", l: "Adicione um <h1> com seu nome dentro do body (T2)" },
      { id: "h4", l: "Adicione um <p> com um parágrafo sobre você (T2)" },
      { id: "h5", l: "Adicione uma <ul> com 3 <li> de habilidades suas (T2)" },
      { id: "h6", l: "Crie o arquivo style.css na mesma pasta (T3)" },
      { id: "h7", l: "Linke o CSS dentro do <head> com a tag <link> (T3)" },
      { id: "h8", l: "No CSS, mude a cor de fundo do body (T4)" },
      { id: "h9", l: "Defina font-family e font-size para o body (T4)" },
      { id: "h10", l: "Adicione padding ao body para o conteúdo respirar (T5)" },
      { id: "h11", l: "Crie uma classe .destaque e aplique a um elemento (T4)" },
      { id: "h12", l: "Abra com o Live Server e veja no navegador (T6)" },
    ] },
};
