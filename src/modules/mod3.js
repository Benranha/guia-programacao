export default {
  id: "mod3", badge: "Módulo 3", color: "#3B8BD4", time: "~2h",
  t1: "Python —", t2: "a linguagem principal.",
  subtitle: "Com a lógica do Módulo 1 como base, o Python vai parecer pseudocódigo que o computador realmente executa.",
  sections: [
    { num: "1", label: "Definição", sc: "#7F77DD", title: "O que é Python?",
      body: "Python é uma linguagem de alto nível criada em 1991. 'Alto nível' significa que é próxima da linguagem humana. Olha como Python se parece com pseudocódigo:",
      xs: [
        { t: "tb", h: ["Pseudocódigo (Módulo 1)", "Python (Módulo 3)"], r: [["SE idade >= 18 ENTÃO", "if idade >= 18:"], ["  ESCREVA 'ok'", "    print('ok')"], ["PARA i DE 1 ATÉ 5 FAÇA", "for i in range(1, 6):"], ["  ESCREVA i", "    print(i)"]] },
      ] },
    { num: "2", label: "Comparação", sc: "#1D9E75", title: "Python vs. outras linguagens",
      body: "Para quem começa com foco em IA, automação e dados, Python é a escolha certa. JavaScript será a segunda linguagem natural para interfaces web.",
      x: { t: "tb", h: ["", "Python", "JavaScript", "Java"], r: [["Curva inicial", "Baixa", "Média", "Alta"], ["Lê como inglês", "Muito", "Razoável", "Menos"], ["IA e dados", "Líder", "Parcial", "Pouco"]] } },
    { num: "3", label: "Circunstâncias", sc: "#D47F1A", title: "Python na prática",
      body: "Variáveis, condicionais, loops e funções em Python seguem a mesma lógica do Módulo 1 — só a sintaxe é diferente.",
      xs: [
        { t: "c", lang: "Variáveis e tipos", code: "nome  = 'Ana'    # string\nidade = 18       # int\naltura = 1.65    # float\nmaior = True     # bool\nprint(nome)      # Ana" },
        { t: "c", lang: "Condicionais e loops", code: "if idade >= 18:\n    print('Maior de idade')\nelse:\n    print('Menor de idade')\n\nhabilidades = ['design', 'Python', 'UX']\nfor h in habilidades:\n    print(h)" },
        { t: "c", lang: "Funções", code: "def saudar(nome):\n    return 'Olá, ' + nome + '!'\n\nprint(saudar('Ana'))   # Olá, Ana!" },
      ] },
    { num: "4", label: "Relação", sc: "#3B8BD4", title: "Python no guia",
      body: "Python é o eixo central do guia. Conecta a lógica (Módulo 1) com IA, dados e os módulos avançados.",
      x: { t: "c", lang: "Dependências", code: "Módulo 3\n  ├── Depende de:  Módulo 1 (mesmas estruturas, nova sintaxe)\n  ├── Leva a:      Módulo GitHub (versionar o código)\n  └── Conecta com: Módulo MySQL (Python + banco de dados)" } },
    { num: "5", label: "Testemunho", sc: "#D4537E", title: "A linguagem que Guido construiu para humanos",
      body: "Guido van Rossum nomeou Python em homenagem ao grupo de comédia Monty Python — não à cobra. A filosofia: código legível vale mais do que código otimizado que só você entende.",
      x: { t: "q", ac: "#3B8BD4", q: "Python é uma linguagem para adultos que tratam outros adultos como adultos. Eu a projetei para ser legível, não eficiente para o compilador.", a: "Guido van Rossum", r: "Criador do Python · 1991" } },
  ],
  act: { type: "q", qs: [
    { q: "O que o código abaixo imprime?\n\nprint(2 + 3 * 4)", o: ["20", "14", "24", "Erro — não pode misturar + e *"], a: 1, ok: "Correto! Multiplicação antes de adição: 3 * 4 = 12, depois 2 + 12 = 14. Python segue as regras matemáticas.", no: "Python segue precedência: multiplicação antes de adição. Calcule 3 * 4 primeiro, depois some 2." },
    { q: "O que o código abaixo imprime?\n\nnome = 'Ana'\nprint('Olá, ' + nome + '!')", o: ["Olá, nome!", "Olá, Ana!", "Ana", "Erro"], a: 1, ok: "Exato! O + entre strings as concatena. 'Olá, ' + 'Ana' + '!' = 'Olá, Ana!'.", no: "O + entre strings as junta. Leia: junte 'Olá, ' com o valor de nome e depois com '!'." },
    { q: "O que o código abaixo imprime?\n\nfor i in range(4):\n    print(i)", o: ["1 2 3 4", "0 1 2 3", "4", "0 1 2 3 4"], a: 1, ok: "Correto! range(4) gera 0, 1, 2, 3 — começa em 0 e para antes do 4.", no: "range(4) começa em 0 e gera 4 números: 0, 1, 2, 3. Em Python, contagem começa em 0." },
    { q: "O que o código abaixo imprime?\n\ndef dobrar(n):\n    return n * 2\n\nprint(dobrar(5))", o: ["5", "dobrar(5)", "10", "Erro — falta ponto e vírgula"], a: 2, ok: "Perfeito! dobrar(5) → n=5 → retorna 5 * 2 → print() exibe 10.", no: "Siga o fluxo: dobrar(5) é chamado, n recebe 5, a função retorna 5 * 2, print() exibe o resultado." },
  ] },
};
