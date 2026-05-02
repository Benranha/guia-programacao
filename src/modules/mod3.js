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
  tutorials: [
    { n: "T1", title: "Rodando seu primeiro script Python",
      intro: "Antes do conteúdo, garanta que o Python roda na sua máquina. Sem isso, o resto do módulo é teórico — e teoria sem prática não fixa.",
      lang: "passo a passo",
      code: `1. Verifique se o Python está instalado:
   - Abra o terminal (Ctrl+\` no VS Code).
   - Digite: python --version    (ou python3 --version)
   - Deve aparecer algo como "Python 3.11.5".

2. Se NÃO aparecer:
   - Baixe em python.org/downloads
   - Marque "Add Python to PATH" durante a instalação.

3. Crie o arquivo ola.py:
   print("Olá, mundo!")
   nome = input("Qual seu nome? ")
   print("Prazer,", nome)

4. Execute no terminal:
   python ola.py    (ou python3 ola.py)`,
      explain: "print() escreve no terminal. input() pede algo do usuário e guarda. # começa um comentário. Indentação não importa AQUI — mas vai importar muito a partir do T3.",
      errors: [
        { bad: "Esquecer o 'Add to PATH' no instalador do Windows", fix: "Reinstale marcando a opção, ou adicione manualmente o Python ao PATH.", why: "Sem isso, o terminal não encontra o comando python — dá 'comando não reconhecido'." },
        { bad: "Salvar o arquivo como ola.py.txt (Windows esconde extensões)", fix: "No Explorer: Exibir → marcar 'Extensões de nomes de arquivo'. Ou salve direto pelo VS Code.", why: "O Python só executa arquivos .py de verdade. .py.txt é arquivo de texto disfarçado." },
        { bad: "Rodar python ola.py mas estar em outra pasta", fix: "Use cd para entrar na pasta certa antes: cd Documentos/guia-programacao", why: "Python procura o arquivo na pasta atual do terminal — se você não está nela, dá 'arquivo não encontrado'." },
      ] },
    { n: "T2", title: "Variáveis e tipos básicos em Python",
      intro: "Em Python, você não declara o tipo — ele é inferido pelo valor. Mas saber distinguir os tipos é fundamental para evitar erros que rodam e dão resposta errada.",
      lang: "tipos.py",
      code: `# string (texto) — entre aspas
nome = "Ana"
sobrenome = 'Silva'   # aspas simples ou duplas, dá no mesmo

# int (número inteiro)
idade = 28

# float (número decimal — usa PONTO, não vírgula)
altura = 1.65

# bool (verdadeiro ou falso)
ativo = True
banido = False

# checar tipo
print(type(idade))   # <class 'int'>
print(type(altura))  # <class 'float'>

# converter entre tipos
idade_str = str(idade)         # "28"
idade_de_volta = int(idade_str) # 28
preco = float("19.90")          # 19.9`,
      explain: "input() SEMPRE retorna string, mesmo se a pessoa digitar um número. Por isso int(input(...)) é tão comum — para transformar texto em número antes de usar em conta. type() ajuda a depurar quando uma operação dá resultado estranho.",
      errors: [
        { bad: "altura = 1,65  (vírgula)", fix: "altura = 1.65 — Python usa ponto decimal, sempre.", why: "Vírgula em Python cria uma tupla (lista de 2 itens), não um número. A conta dá errado depois." },
        { bad: "idade = input('idade?') depois fazer idade + 1", fix: "idade = int(input('idade?')) — converta antes.", why: "input() retorna string. 'string' + 1 dá TypeError. Converter pra int resolve." },
        { bad: "Confundir = (atribuição) com == (comparação)", fix: "x = 5 GUARDA o valor. x == 5 PERGUNTA se é igual.", why: "Em condições (if), se você usar = em vez de ==, alguns Python dão erro de sintaxe. Outros casos passam silenciosos." },
        { bad: "Usar palavras reservadas como nome (list, str, type, def)", fix: "Use minha_lista, nome, tipo, funcao — evite os nomes de função do Python.", why: "Sobrescrever list = [1,2] quebra list() pelo resto do programa. Pequenos bugs estranhos." },
      ] },
    { n: "T3", title: "Condicionais e indentação em Python",
      intro: "Python usa INDENTAÇÃO para definir blocos — não chaves, não 'fim se'. Esse é o detalhe que mais derruba quem vem do pseudocódigo.",
      lang: "condicionais.py",
      code: `idade = int(input("Sua idade: "))

if idade >= 18:
    print("Maior de idade")
    print("Pode votar e dirigir")
elif idade >= 16:
    print("Pode votar, mas ainda não dirigir")
else:
    print("Menor de idade")

# operadores em Python:
#   ==  igual    !=  diferente
#   >   >=        <   <=
#   and (E)   or (OU)   not (NÃO)

# combinando:
nacionalidade = "BR"
if idade >= 18 and nacionalidade == "BR":
    print("Pode votar no Brasil")

# atalho útil — ternário
status = "adulto" if idade >= 18 else "menor"`,
      explain: "Os DOIS PONTOS (:) no fim do if/elif/else são obrigatórios. A INDENTAÇÃO de 4 espaços (ou 1 tab — escolha um e mantenha) define o bloco. Voltar à coluna 0 sai do bloco. Não existe 'end if'.",
      errors: [
        { bad: "Esquecer os dois pontos: if idade >= 18 (sem :)", fix: "if idade >= 18:", why: "Python para com SyntaxError. Erro mais fácil de identificar — mas é o mais frequente." },
        { bad: "Misturar tab e espaços na indentação", fix: "Configure o VS Code para 'Insert Spaces' (4 espaços). Use só um.", why: "Python distingue tab de espaço. Misturar dá IndentationError ou pior — bug silencioso." },
        { bad: "Indentar errado: print sem indent dentro do if", fix: "Conteúdo do if PRECISA estar indentado (4 espaços) em relação ao if.", why: "Sem indentação, print não está dentro do if — sempre executa, sem condição nenhuma." },
        { bad: "Usar && e || (de outras linguagens)", fix: "Python é and / or / not — palavras, não símbolos.", why: "Symbol-style operators não existem em Python. SyntaxError imediato." },
      ] },
    { n: "T4", title: "Loops — for, while e range",
      intro: "Python tem dois loops: for (quando você sabe quantas vezes) e while (quando depende de condição). O range() controla quantas iterações um for faz.",
      lang: "loops.py",
      code: `# for com range — números de 0 a 4
for i in range(5):
    print(i)
# saída: 0 1 2 3 4 (NÃO inclui o 5!)

# range com início e fim
for i in range(1, 6):
    print(i)
# saída: 1 2 3 4 5

# range com passo
for i in range(0, 20, 2):
    print(i)
# saída: 0 2 4 6 8 10 12 14 16 18

# for em uma lista
nomes = ["Ana", "Bia", "Caio"]
for nome in nomes:
    print("Olá,", nome)

# while
senha = ""
while senha != "1234":
    senha = input("Senha: ")
print("Acesso liberado")

# break sai do loop, continue pula pra próxima volta
for i in range(10):
    if i == 5:
        break       # para no 5
    if i % 2 == 0:
        continue    # pula pares
    print(i)
# saída: 1 3`,
      explain: "range(N) gera números de 0 até N-1 — NUNCA inclui N. Esse é o detalhe que pega 90% dos iniciantes. for nome in lista percorre cada item da lista — não precisa de índice na maioria dos casos.",
      errors: [
        { bad: "Esperar que range(5) gere 1,2,3,4,5", fix: "range(5) gera 0,1,2,3,4. Para 1 a 5: range(1, 6).", why: "Python conta a partir de 0. range(N) para ANTES de N. Memorize: 'até, mas não inclui'." },
        { bad: "Esquecer de mudar a variável dentro do while → loop infinito", fix: "Garanta que a condição se aproxima de FALSA a cada volta. Senha precisa de input() de novo.", why: "while True com nada que mude a condição trava o programa. Ctrl+C no terminal para sair." },
        { bad: "Usar índice quando podia iterar direto", fix: "for nome in nomes: em vez de for i in range(len(nomes)): nomes[i]", why: "Iterar direto é mais legível e menos propenso a erro de índice (IndexError)." },
        { bad: "Modificar a lista enquanto itera nela", fix: "Faça uma cópia: for x in lista[:]: ou colete em outra lista.", why: "Adicionar/remover itens durante iteração causa comportamento imprevisível em qualquer linguagem." },
      ] },
    { n: "T5", title: "Funções — def, parâmetros, return",
      intro: "Função empacota um pedaço de código com nome. Você define UMA vez e CHAMA quantas vezes precisar — sem copiar e colar.",
      lang: "funcoes.py",
      code: `# definição — só descreve, não executa
def saudar(nome):
    return "Olá, " + nome + "!"

# chamada — agora executa
mensagem = saudar("Ana")
print(mensagem)   # Olá, Ana!

# múltiplos parâmetros
def calcular_total(preco, quantidade):
    total = preco * quantidade
    return total

print(calcular_total(15, 3))   # 45

# parâmetro com valor padrão
def saudar_idioma(nome, idioma="pt"):
    if idioma == "en":
        return "Hello, " + nome
    return "Olá, " + nome

print(saudar_idioma("Ana"))         # Olá, Ana
print(saudar_idioma("Ana", "en"))   # Hello, Ana

# função sem return retorna None
def imprimir_x2(n):
    print(n * 2)

resultado = imprimir_x2(5)   # imprime 10
print(resultado)              # None`,
      explain: "def cria a função (NÃO executa nada). A função só roda quando você chama: nome(argumentos). return devolve um valor — depois disso a função para. Sem return, a função retorna None.",
      errors: [
        { bad: "Definir função e esquecer de chamar — nada acontece", fix: "Depois de def, escreva minha_funcao() para executar.", why: "def só ensina o Python a fazer algo. A execução é separada. Iniciantes esperam que rode automaticamente." },
        { bad: "Confundir print com return", fix: "print mostra na tela. return devolve um valor pra quem chamou usar.", why: "Função que só faz print não pode ser usada em x = funcao(). Para reaproveitar resultado, use return." },
        { bad: "Esquecer os parênteses ao chamar: saudar 'Ana'", fix: "saudar('Ana') — sempre parênteses, mesmo se sem argumentos: minha_funcao()", why: "Sem parênteses, você está se referindo À FUNÇÃO em si, não chamando ela. Bug silencioso." },
        { bad: "Modificar variável global dentro da função sem global", fix: "Passe como parâmetro e retorne o valor — evite global.", why: "Variáveis globais modificadas em funções deixam código difícil de seguir e debugar." },
      ] },
    { n: "T6", title: "Erros de Python que travam quem está começando",
      intro: "Sintomas e o que cada erro REALMENTE significa. A maioria dos bugs de Python iniciante cai em uma destas categorias.",
      lang: "erros mais comuns",
      code: `→ IndentationError: unexpected indent
   • Linha indentada onde não devia
   • Mistura de tab e espaços

→ NameError: name 'x' is not defined
   • Você usou variável antes de criar
   • Erro de digitação no nome (idade vs Idade)
   • Função foi definida em outro arquivo

→ TypeError: can only concatenate str to str
   • Tentou fazer "idade: " + 18 (texto + número)
   • Use str(18) ou f-string: f"idade: {18}"

→ TypeError: 'NoneType' object is not subscriptable
   • Tentou acessar [0] de algo que retornou None
   • Geralmente: função sem return + .pop() ou similar

→ IndexError: list index out of range
   • Acessou lista[5] mas a lista tem só 3 itens
   • Off-by-one em loop

→ KeyError: 'nome'
   • Acessou dicionario['nome'] mas a chave não existe
   • Use dicionario.get('nome') para retornar None se faltar

→ ValueError: invalid literal for int()
   • int("abc") — texto não-numérico
   • Trate com try/except ou valide antes`,
      explain: "Python sempre fala onde deu erro: 'File ola.py, line 7'. Vá direto na linha indicada. Leia a mensagem em inglês — ela é literal: 'name x is not defined' = 'a variável x não existe'. Copie a mensagem no Google se não souber: 90% das dúvidas têm resposta no Stack Overflow.",
      errors: [] },
  ],
  act: { type: "q", qs: [
    { q: "O que o código abaixo imprime?\n\nprint(2 + 3 * 4)", o: ["20", "14", "24", "Erro — não pode misturar + e *"], a: 1, ok: "Correto! Multiplicação antes de adição: 3 * 4 = 12, depois 2 + 12 = 14. Python segue as regras matemáticas.", no: "Python segue precedência: multiplicação antes de adição. Calcule 3 * 4 primeiro, depois some 2." },
    { q: "O que o código abaixo imprime?\n\nnome = 'Ana'\nprint('Olá, ' + nome + '!')", o: ["Olá, nome!", "Olá, Ana!", "Ana", "Erro"], a: 1, ok: "Exato! O + entre strings as concatena. 'Olá, ' + 'Ana' + '!' = 'Olá, Ana!'.", no: "O + entre strings as junta. Leia: junte 'Olá, ' com o valor de nome e depois com '!'." },
    { q: "O que o código abaixo imprime?\n\nfor i in range(4):\n    print(i)", o: ["1 2 3 4", "0 1 2 3", "4", "0 1 2 3 4"], a: 1, ok: "Correto! range(4) gera 0, 1, 2, 3 — começa em 0 e para antes do 4.", no: "range(4) começa em 0 e gera 4 números: 0, 1, 2, 3. Em Python, contagem começa em 0." },
    { q: "O que o código abaixo imprime?\n\ndef dobrar(n):\n    return n * 2\n\nprint(dobrar(5))", o: ["5", "dobrar(5)", "10", "Erro — falta ponto e vírgula"], a: 2, ok: "Perfeito! dobrar(5) → n=5 → retorna 5 * 2 → print() exibe 10.", no: "Siga o fluxo: dobrar(5) é chamado, n recebe 5, a função retorna 5 * 2, print() exibe o resultado." },
  ] },
};
