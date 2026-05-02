export default {
  id: "modExtra", badge: "Módulo Extra", color: "#7F77DD", time: "~45 min", hasInstall: true,
  t1: "Configurando", t2: "seu ambiente.",
  subtitle: "O VS Code é onde todo o código deste guia vai ser escrito. Instale uma vez, use para sempre.",
  sections: [
    { num: "1", label: "Definição", sc: "#7F77DD", title: "O que é um editor de código?",
      body: "Um editor de código é o espaço onde você escreve e organiza seu código — como o Canva para design. Qualquer editor de texto serviria, mas sem realce de sintaxe e autocomplete seria como montar um layout no Word.",
      x: { t: "n", e: "💡", tx: "Realce de sintaxe colore palavras de acordo com o que fazem no código. Reduz erros e acelera a leitura.", bg: "#EEEDFE", tc: "#3C3489" } },
    { num: "2", label: "Comparação", sc: "#1D9E75", title: "VS Code vs. outras opções",
      body: "O VS Code é gratuito, extensível e usado por 73% dos profissionais globalmente — iniciantes e seniores na mesma ferramenta.",
      x: { t: "tb", ac: "#7F77DD", h: ["", "VS Code", "Bloco de notas", "Replit"], r: [["Extensões", "Milhares", "Nenhuma", "Nenhuma"], ["Sem internet", "Sim", "Sim", "Não"], ["IA integrada", "Sim (Copilot)", "Não", "Parcial"]] } },
    { num: "3", label: "Circunstâncias", sc: "#D47F1A", title: "Extensões essenciais",
      body: "Instale as 5 extensões abaixo com Ctrl+Shift+X (Windows/Linux) ou Cmd+Shift+X (Mac).",
      x: { t: "c", lang: "Extensões", code: "1. Portuguese (Brazil)  → interface em português\n2. Prettier             → formata o código ao salvar\n3. Live Server          → HTML no navegador em tempo real\n4. Python (Microsoft)   → execução e debug de Python\n5. Color Highlight      → mostra cores CSS no editor" } },
    { num: "4", label: "Relação", sc: "#3B8BD4", title: "Onde o VS Code se encaixa",
      body: "Este módulo é infraestrutura pura — sem conteúdo técnico novo. Garante que o ambiente esteja pronto antes de precisar.",
      x: { t: "c", lang: "Necessário para", code: "├── Módulo 2 (HTML + CSS com Live Server)\n├── Módulo 3 (Python com execução local)\n└── Módulos GitHub e MySQL" } },
    { num: "5", label: "Testemunho", sc: "#D4537E", title: "Por que o mundo usa o mesmo editor",
      body: "Stack Overflow Developer Survey 2023 com 90.000+ devs: VS Code é o editor preferido por 73,3% dos profissionais.",
      x: { t: "q", ac: "#7F77DD", q: "O mais surpreendente não é que iniciantes usam o VS Code. É que engenheiros com 15 anos de experiência usam o mesmo. Não existe 'graduar' para uma ferramenta melhor.", a: "Stack Overflow Developer Survey 2023", r: "90.000+ desenvolvedores" } },
  ],
  tutorials: [
    { n: "T1", title: "Instalando uma extensão no VS Code",
      intro: "Toda configuração avançada do VS Code passa por extensões. Aprender a instalar UMA destrava todas as outras — o processo é idêntico.",
      lang: "passo a passo",
      code: `1. Abra o VS Code.
2. Pressione Ctrl+Shift+X (Windows/Linux) ou Cmd+Shift+X (Mac).
   → abre o painel "Extensions" no lado esquerdo.
3. Na barra de busca, digite: Portuguese (Brazil)
4. Clique no resultado da Microsoft (verifique o autor).
5. Clique no botão azul "Install".
6. Reinicie o VS Code se ele pedir.`,
      explain: "O atalho Ctrl+Shift+X é universal — funciona em qualquer projeto. O painel mostra extensões instaladas e a busca tem milhares de opções. Sempre confira o autor e o número de downloads antes de instalar.",
      errors: [
        { bad: "Instalar a primeira extensão que aparece sem ver o autor", fix: "Verifique se o autor é a Microsoft, oficial da linguagem (Python: Microsoft, Prettier: Prettier), ou tem milhões de downloads.", why: "Existem extensões maliciosas com nome parecido. Autor + downloads são o filtro." },
        { bad: "Reiniciar o VS Code fechando pelo X e abrindo de novo", fix: "Use Ctrl+Shift+P → digite 'Reload Window' → Enter.", why: "É mais rápido e mantém os arquivos abertos exatamente onde estavam." },
        { bad: "Achar que a extensão não funcionou porque nada mudou na hora", fix: "Algumas extensões só ativam ao abrir o tipo de arquivo que elas suportam (HTML, Python).", why: "O Python só carrega quando você abre um .py, por exemplo. Não é bug — é otimização." },
      ] },
    { n: "T2", title: "Configurando o Prettier para formatar ao salvar",
      intro: "O Prettier corrige indentação, aspas, quebras de linha automaticamente. Mas só com a extensão instalada ele não faz nada — você precisa avisar o VS Code para usar ele ao salvar.",
      lang: "settings.json",
      code: `1. Ctrl+Shift+P (Cmd+Shift+P no Mac).
2. Digite: Preferences: Open User Settings (JSON)
3. Cole as 3 linhas dentro das chaves { ... }:

{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "files.autoSave": "afterDelay"
}`,
      explain: "formatOnSave ativa o formatador quando você salva. defaultFormatter diz QUAL formatador usar (Prettier). autoSave salva sozinho depois de um instante — sem isso, formatação só roda quando você lembra de Ctrl+S.",
      errors: [
        { bad: "Editar 'Settings UI' (a tela bonita) em vez do JSON", fix: "Abra o Settings (JSON), não o Settings UI. O JSON é mais rápido e portável entre máquinas.", why: "Algumas configs só existem no JSON. Acostume-se com ele desde já." },
        { bad: "Esquecer a vírgula entre as linhas", fix: "JSON exige vírgula entre cada par chave:valor — exceto no último.", why: "Falta de vírgula quebra o arquivo inteiro. O VS Code mostra um erro vermelho — leia o que ele diz." },
        { bad: "Configurar mas o Prettier não roda", fix: "Verifique se a extensão Prettier (esbenp.prettier-vscode) está instalada E habilitada.", why: "defaultFormatter aponta para uma extensão — sem ela instalada, o VS Code ignora a config." },
      ] },
    { n: "T3", title: "Usando o Live Server na prática",
      intro: "O Live Server roda um servidor web local e atualiza o navegador automaticamente sempre que você salva o HTML. É indispensável para o Módulo 2.",
      lang: "passo a passo",
      code: `1. Abra a pasta do projeto no VS Code (File → Open Folder).
2. Crie ou abra um arquivo .html (ex: index.html).
3. Clique com o botão direito no arquivo na barra lateral.
4. Escolha "Open with Live Server".
   → Abre o navegador em http://127.0.0.1:5500
5. Edite o HTML, salve (Ctrl+S) e veja a página atualizar sozinha.`,
      explain: "127.0.0.1 é o seu próprio computador. 5500 é a porta padrão do Live Server. Enquanto o Live Server estiver rodando, o ícone 'Port: 5500' aparece no canto inferior direito do VS Code — clique nele para parar.",
      errors: [
        { bad: "Abrir o HTML clicando duas vezes no Explorador de Arquivos", fix: "Use Live Server. Abrir direto carrega o arquivo via file:// e quebra muitas coisas.", why: "Imagens com caminho absoluto, módulos JS e fetch só funcionam servindo via http:// — Live Server faz isso." },
        { bad: "'Open with Live Server' não aparece no menu de direito", fix: "A extensão não está instalada ou ativa. Volte ao T1.", why: "O item de menu só aparece se a extensão estiver carregada. Reinicie o VS Code se acabou de instalar." },
        { bad: "Página não atualiza ao salvar", fix: "1) Confirme que salvou (Ctrl+S). 2) Faça Ctrl+Shift+R no navegador. 3) Pare e reinicie o Live Server.", why: "Cache do navegador às vezes segura a versão antiga. O atalho força recarregar ignorando cache." },
        { bad: "Outra porta já está em uso (erro 'EADDRINUSE')", fix: "Feche outros projetos com Live Server rodando, ou mude a porta nas configurações da extensão.", why: "Cada Live Server precisa de uma porta livre. Não dá pra rodar dois na mesma porta ao mesmo tempo." },
      ] },
    { n: "T4", title: "Estrutura de pastas e atalhos essenciais",
      intro: "Organização desde o início economiza horas depois. Estes atalhos são os que você vai usar 50+ vezes por dia — vale memorizar.",
      lang: "estrutura sugerida",
      code: `Documentos/
└── guia-programacao/
    ├── modulo-2-html-css/
    │   ├── index.html
    │   └── style.css
    ├── modulo-3-python/
    │   └── primeiro-script.py
    └── projeto-final/
        ├── index.html
        ├── style.css
        └── script.py

# atalhos do VS Code (Win/Linux | Mac)
Ctrl+S      | Cmd+S       → Salvar
Ctrl+P      | Cmd+P       → Buscar arquivo pelo nome
Ctrl+Shift+P| Cmd+Shift+P → Paleta de comandos (TUDO está aqui)
Ctrl+\`     | Cmd+\`      → Abrir/fechar terminal integrado
Ctrl+/      | Cmd+/       → Comentar/descomentar linha
Alt+↑ / Alt+↓             → Mover linha pra cima/baixo`,
      explain: "Sempre abra a PASTA do projeto, não arquivos soltos — assim o VS Code lembra do estado, indexa busca e habilita extensões corretamente. A paleta de comandos (Ctrl+Shift+P) acessa qualquer função do editor pelo nome.",
      errors: [
        { bad: "Espaços e acentos no nome de pastas (Meu Projeto, Café)", fix: "Use letras minúsculas, números e hífens: meu-projeto, cafe.", why: "Espaço e acento quebram caminhos em terminais, servidores e URLs. Vai te dar dor de cabeça mais tarde." },
        { bad: "Tudo na Área de Trabalho", fix: "Crie ~/Documentos/guia-programacao/ e organize por módulo.", why: "Área de Trabalho fica lenta com muitos arquivos. Documentos é o lugar padrão e é incluído em backups." },
        { bad: "Decorar atalhos um por um", fix: "Memorize SÓ Ctrl+Shift+P. Tudo o resto está acessível por ele com nome em português.", why: "A paleta tem 100% das funções. Você aprende os atalhos só dos comandos que repete várias vezes ao dia." },
      ] },
    { n: "T5", title: "Erros comuns na configuração do ambiente",
      intro: "Antes de seguir para a checklist, conheça os tropeços mais frequentes — quando travar, volte aqui.",
      lang: "sintomas → causas",
      code: `→ "Instalei o VS Code mas nada funciona / não abre"
   • Versão errada do instalador (System vs User Installer no Windows)
   • Antivírus bloqueando — adicione exceção
   • Falta espaço em disco (precisa de pelo menos 500MB)

→ "Instalei a extensão mas o VS Code não vê"
   • Reinicie o editor (Ctrl+Shift+P → Reload Window)
   • Você instalou em outra conta / outro perfil do VS Code
   • Erro de digitação no ID da extensão

→ "Live Server abre mas página fica em branco"
   • Arquivo HTML está vazio — precisa ter pelo menos <html><body>...</body></html>
   • Caminho do arquivo tem espaço ou acento
   • A extensão abriu o arquivo errado — feche, reabra o index.html

→ "Comandos do terminal integrado dão 'comando não encontrado'"
   • python, node etc. não estão no PATH do sistema
   • Reinstale marcando "Add to PATH" durante a instalação`,
      explain: "Quando algo der errado: 1) feche e reabra o VS Code, 2) reinicie o computador (resolve 30% dos problemas), 3) leia a mensagem de erro EXATA — copiar e colar no Google quase sempre traz a resposta.",
      errors: [] },
  ],
  act: { type: "c", title: "Colocando o ambiente no ar", sub: "Cada item já foi explicado em detalhe nos tutoriais T1 a T5 — volte se precisar.", msg: "VS Code instalado, extensões no lugar, primeiro arquivo criado. Pronto para o Módulo 1.",
    steps: [
      { id: "i1", l: "VS Code instalado e aberto" },
      { id: "i2", l: "Extensão Portuguese (Brazil) instalada (T1)" },
      { id: "i3", l: "Extensão Prettier instalada e configurada para formatar ao salvar (T1, T2)" },
      { id: "i4", l: "Extensão Live Server instalada (T1)" },
      { id: "i5", l: "Extensão Python instalada (T1)" },
      { id: "i6", l: "Extensão Color Highlight instalada (T1)" },
      { id: "i7", l: "Pasta 'guia-programacao' criada em Documentos (T4)" },
      { id: "i8", l: "Arquivo 'ola.html' criado dentro da pasta" },
      { id: "i9", l: "Live Server aberto — arquivo aparece no navegador (T3)" },
      { id: "i10", l: "Atalho Ctrl+Shift+P testado pelo menos uma vez (T4)" },
    ] },
};
