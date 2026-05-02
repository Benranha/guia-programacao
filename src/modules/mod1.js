export default {
  id: "mod1", badge: "Módulo 1", color: "#1D9E75", time: "~3h",
  t1: "Raciocínio", t2: "e lógica.",
  subtitle: "As três estruturas que formam qualquer algoritmo — em qualquer linguagem, em qualquer época.",
  sections: [
    { num: "1", label: "Definição", sc: "#7F77DD", title: "O que é lógica de programação?",
      body: "Lógica de programação é estruturar instruções para um computador seguir. É anterior a qualquer linguagem. Todo programa já existido usa apenas três estruturas: sequência, condição e repetição.",
      x: { t: "n", e: "💡", tx: "Sequência: passos em ordem. Condição: executar se algo for verdadeiro. Repetição: executar várias vezes. Isso é tudo.", bg: "#E1F5EE", tc: "#085041" } },
    { num: "2", label: "Comparação", sc: "#1D9E75", title: "As três estruturas na prática",
      body: "Qualquer algoritmo é uma combinação dessas três estruturas — nem mais, nem menos.",
      x: { t: "c", lang: "Sequência → Condição → Repetição", code: "# Sequência\nLEIA nome\nESCREVA 'Olá, ' + nome\n\n# Condição\nSE idade >= 18 ENTÃO\n  ESCREVA 'Pode dirigir'\nSENÃO\n  ESCREVA 'Ainda não'\nFIM SE\n\n# Repetição\nPARA i DE 1 ATÉ 5 FAÇA\n  ESCREVA i\nFIM PARA" } },
    { num: "3", label: "Circunstâncias", sc: "#D47F1A", title: "Variáveis e operadores",
      body: "Variável é um espaço com nome que armazena um valor. O valor pode mudar; o nome permanece — como uma caixinha com etiqueta.",
      x: { t: "c", lang: "Variáveis e operadores", code: "nome  = 'Ana'      ← texto (string)\nidade = 18         ← número inteiro\nmaior = VERDADEIRO ← booleano\n\nidade >= 18        → verdadeiro se 18 ou mais\nidade >= 18 E nome = 'Ana' → ambos verdadeiros" } },
    { num: "4", label: "Relação", sc: "#3B8BD4", title: "Da lógica ao Python",
      body: "As estruturas aqui em pseudocódigo são exatamente o que você escreve em Python. Só a sintaxe muda.",
      x: { t: "c", lang: "Pseudocódigo → Python", code: "SE idade >= 18 ENTÃO  →  if idade >= 18:\n  ESCREVA 'ok'        →      print('ok')\nFIM SE               →  (indentação = bloco)" } },
    { num: "5", label: "Testemunho", sc: "#D4537E", title: "A base que não muda",
      body: "Dijkstra desenvolveu algoritmos usados em GPS e redes até hoje. A lógica que ele defendia — sequência, condição, repetição — é a mesma que você aprende agora.",
      x: { t: "q", ac: "#1D9E75", q: "Ciência da computação não é sobre computadores, assim como astronomia não é sobre telescópios. É sobre estruturas, algoritmos e a arte de resolver problemas.", a: "Edsger Dijkstra", r: "Cientista da computação · Prêmio Turing 1972" } },
  ],
  tutorials: [
    { n: "T1", title: "Sequência — a base de tudo",
      intro: "A estrutura mais simples e mais ignorada. Sequência é executar passos UMA VEZ, em ordem. A maioria dos bugs reais nasce de sequência errada — passo executado antes da hora.",
      lang: "pseudocódigo",
      code: `INÍCIO
  LEIA preco_produto
  LEIA quantidade
  total = preco_produto * quantidade
  ESCREVA "Total a pagar: " + total
FIM`,
      explain: "Cada linha executa exatamente uma vez, na ordem em que aparece. 'total' só pode ser calculado DEPOIS que preco_produto e quantidade foram lidos. Inverter a ordem quebra a lógica — o computador tentaria multiplicar valores que ainda não existem.",
      errors: [
        { bad: "Calcular total ANTES de ler os valores", fix: "Sempre LEIA / DEFINA antes de USAR uma variável.", why: "Variável usada antes de ter valor é como pegar refrigerante de uma geladeira vazia — não tem o que pegar." },
        { bad: "Misturar passos do problema com passos da solução", fix: "Liste o que o programa precisa FAZER antes de pensar em COMO fazer.", why: "Pular para o como cedo demais leva a soluções complicadas para problemas que você ainda não entendeu." },
        { bad: "Achar que ordem 'mais ou menos' funciona", fix: "Cada linha conta. ESCREVA antes do cálculo imprime lixo, ESCREVA depois imprime o resultado.", why: "Computador é literal: faz exatamente o que você escreveu, na ordem que escreveu." },
      ] },
    { n: "T2", title: "Variáveis — caixinhas com etiqueta",
      intro: "Variável guarda um valor sob um nome. O nome é seu — invente algo descritivo. O valor pode mudar ao longo do programa; o nome permanece.",
      lang: "pseudocódigo",
      code: `# atribuição — guarda o valor
nome = "Ana"
idade = 18
altura = 1.65
maior_de_idade = VERDADEIRO

# uso — recupera o valor pelo nome
ESCREVA nome              # imprime: Ana
ESCREVA idade + 1         # imprime: 19 (idade não muda)

# reatribuição — substitui o valor antigo
idade = 19
ESCREVA idade             # imprime: 19`,
      explain: "Tipos básicos: string (texto entre aspas), int (número inteiro), float (decimal com ponto), bool (VERDADEIRO/FALSO). O nome da variável NUNCA leva aspas — só o conteúdo de string leva.",
      errors: [
        { bad: "Variável com nome curto demais (a, x, n, i)", fix: "Use nomes descritivos: idade_usuario, total_carrinho. Exceção: i, j em loops é tradição.", why: "Daqui a 2 semanas, você não vai lembrar o que 'x' significava. 'idade_usuario' lembra sozinho." },
        { bad: "Confundir nome com valor: ESCREVA \"idade\" em vez de ESCREVA idade", fix: "ESCREVA idade (sem aspas) imprime o valor. ESCREVA \"idade\" imprime a palavra literal.", why: "Aspas dizem 'isto é texto literal'. Sem aspas, é nome de variável a ser resolvido." },
        { bad: "Começar nome com número (1nome) ou usar acento (idadé)", fix: "Comece com letra ou underscore, sem acento, sem espaço: nome, idade_usuario.", why: "Quase toda linguagem rejeita esses nomes. Acostume-se com a regra desde o pseudocódigo." },
        { bad: "Esquecer que reatribuir SUBSTITUI o valor", fix: "idade = 19 apaga o valor antigo. Para preservar, guarde em outra variável: idade_anterior = idade.", why: "Não existe 'desfazer' uma atribuição. O valor antigo se foi." },
      ] },
    { n: "T3", title: "Condicional SE/SENÃO — caminhos diferentes",
      intro: "Quando o programa precisa decidir entre dois (ou mais) caminhos, usa SE. A condição entre o SE e o ENTÃO é uma comparação que dá VERDADEIRO ou FALSO.",
      lang: "pseudocódigo",
      code: `LEIA idade

SE idade >= 18 ENTÃO
  ESCREVA "Pode dirigir"
SENÃO SE idade >= 16 ENTÃO
  ESCREVA "Pode votar mas não dirigir"
SENÃO
  ESCREVA "Ainda não tem direitos civis plenos"
FIM SE

# operadores de comparação:
#   ==  igual a
#   !=  diferente de
#   >   maior que       >=  maior ou igual
#   <   menor que       <=  menor ou igual

# combinando condições:
SE idade >= 18 E nacionalidade == "BR" ENTÃO
  ESCREVA "Pode votar no Brasil"
FIM SE`,
      explain: "Apenas UM dos blocos vai executar. O computador testa as condições de cima para baixo — a primeira VERDADEIRA é a que roda, e o resto é ignorado. Por isso a ordem importa: condição mais específica vem antes da mais geral.",
      errors: [
        { bad: "Usar = em vez de == para comparar", fix: "= atribui (idade = 18). == compara (idade == 18).", why: "Misturar os dois é o erro mais comum. = numa condição vira atribuição, sempre dá verdadeiro, e o programa entra no caminho errado." },
        { bad: "Inverter a ordem das condições — geral antes de específica", fix: "Mais restritivas primeiro. SE idade >= 18 antes de SE idade >= 16.", why: "Se idade >= 16 vem antes, alguém de 20 anos cai no ramo de 16+ e nunca chega no de 18+." },
        { bad: "Esquecer o SENÃO e fazer dois SE separados", fix: "Use SENÃO/SENÃO SE quando os caminhos são EXCLUSIVOS.", why: "Dois SE testam tudo — pode entrar em dois ramos. SENÃO SE testa só se o anterior falhou." },
        { bad: "Comparar string e número: SE idade >= \"18\"", fix: "Sem aspas em números: SE idade >= 18.", why: "Comparar tipos diferentes dá resultado imprevisível ou erro dependendo da linguagem." },
      ] },
    { n: "T4", title: "Loop PARA — repetição contada",
      intro: "Use PARA quando você sabe ANTES quantas vezes precisa repetir. A variável de controle (i, contador) muda automaticamente a cada volta.",
      lang: "pseudocódigo",
      code: `# imprimir números de 1 a 5
PARA i DE 1 ATÉ 5 FAÇA
  ESCREVA i
FIM PARA
# saída: 1 2 3 4 5

# somar números de 1 a 100
soma = 0
PARA i DE 1 ATÉ 100 FAÇA
  soma = soma + i
FIM PARA
ESCREVA soma   # 5050

# percorrer uma lista
PARA cada nome EM ["Ana", "Bia", "Caio"] FAÇA
  ESCREVA "Olá, " + nome
FIM PARA`,
      explain: "A variável i começa no valor inicial e incrementa de 1 em 1 até alcançar o final (inclusive). 'soma = soma + i' é o padrão acumulador: pega o valor atual, soma o novo, guarda de volta.",
      errors: [
        { bad: "Esquecer de inicializar o acumulador (soma = 0 antes do loop)", fix: "Sempre defina o valor inicial ANTES do PARA: soma = 0, total = 0.", why: "Sem inicialização, soma não existe na primeira iteração — erro 'variável não definida' ou lixo de memória." },
        { bad: "Modificar a variável de controle dentro do loop (i = i + 5)", fix: "Não toque em i dentro do PARA. Quem controla i é o próprio loop.", why: "Mudar i no meio bagunça a contagem. Se precisar pular, use ENQUANTO." },
        { bad: "Confundir 1 ATÉ 5 (5 voltas: 1,2,3,4,5) com 0 ATÉ 5 (6 voltas: 0,1,2,3,4,5)", fix: "Conte mentalmente quantos números entram no intervalo.", why: "Erro 'off-by-one' clássico. Sempre verifique se você quer 5 voltas ou se quer ir até o índice 5." },
        { bad: "Fazer um PARA quando seria mais fácil somar direto", fix: "PARA i DE 1 ATÉ 100 somando i pode ser substituído pela fórmula 100*101/2 = 5050.", why: "Loop é ferramenta — se existe atalho matemático, use. Mas pseudocódigo serve pra treinar o raciocínio do loop." },
      ] },
    { n: "T5", title: "Loop ENQUANTO — repetição condicional",
      intro: "Use ENQUANTO quando você NÃO sabe quantas voltas vai dar — depende de uma condição. Risco maior: loop infinito se a condição nunca virar falsa.",
      lang: "pseudocódigo",
      code: `# pedir senha até acertar
senha = ""
ENQUANTO senha != "1234" FAÇA
  LEIA senha
  SE senha != "1234" ENTÃO
    ESCREVA "Errada, tente de novo."
  FIM SE
FIM ENQUANTO
ESCREVA "Acesso liberado!"

# contar quantos números pares cabem antes de passar de 50
n = 0
contador = 0
ENQUANTO n < 50 FAÇA
  n = n + 2
  contador = contador + 1
FIM ENQUANTO
ESCREVA contador  # 25`,
      explain: "ENQUANTO testa a condição ANTES de cada volta. Se já começa falsa, o bloco nem executa. A condição PRECISA mudar dentro do loop — caso contrário, o loop não termina nunca (loop infinito).",
      errors: [
        { bad: "Criar uma condição que nunca muda dentro do loop", fix: "Toda iteração precisa fazer algo que se aproxima da condição de saída.", why: "Loop infinito trava o programa. Se for caso real, é Ctrl+C no terminal pra matar." },
        { bad: "Usar ENQUANTO quando o número de iterações é fixo", fix: "Se o número é conhecido, PARA é mais claro e mais seguro.", why: "PARA é à prova de loop infinito — chega no fim e para sozinho. ENQUANTO depende da sua disciplina." },
        { bad: "Esquecer de inicializar a variável testada na condição", fix: "Defina senha = \"\" ou n = 0 ANTES do ENQUANTO.", why: "Variável testada sem valor inicial é caso de erro 'não definida' ou comportamento aleatório." },
        { bad: "Inverter a condição: ENQUANTO senha == \"1234\" em vez de !=", fix: "Pense: 'continue ENQUANTO ainda NÃO acertou'. A condição é a permissão pra rodar mais uma vez.", why: "ENQUANTO continua quando VERDADEIRO. Se você escreve a condição de saída, o loop nem começa." },
      ] },
    { n: "T6", title: "Erros lógicos comuns",
      intro: "Sintaxe é fácil de corrigir — o computador aponta. Erros lógicos rodam sem reclamar e dão resposta errada. Estes são os clássicos:",
      lang: "sintomas → causas",
      code: `→ "O programa rodou mas o resultado está errado"
   • Ordem dos passos invertida (T1)
   • Comparação com = em vez de == (T3)
   • Acumulador não inicializado (T4)
   • Off-by-one: foi de 1 a 5 quando devia 1 a 4

→ "O programa entra em loop e não para"
   • Condição do ENQUANTO nunca vira falsa (T5)
   • Modificou variável errada dentro do loop
   • Esqueceu de incrementar o contador

→ "Cai sempre no mesmo SE, mesmo com idade diferente"
   • Usou = em vez de == (atribuição vira sempre verdadeiro)
   • Comparou string com número
   • Ordem das condições errada — específica depois de geral

→ "Variável tem valor inesperado"
   • Reatribuição acidental sobrescrevendo valor anterior
   • Erro de digitação criando variável nova (idade vs Idade)
   • Operação errada (+ em vez de *, etc.)`,
      explain: "Quando o resultado vier errado: 1) leia o pseudocódigo em voz alta como se você fosse o computador, 2) anote o valor de cada variável a cada passo num papel, 3) compare com o que esperava. Esse processo se chama 'mesa de teste' e resolve 90% dos bugs lógicos.",
      errors: [] },
  ],
  act: { type: "q", qs: [
    { q: "Você precisa verificar se uma pessoa pode votar (mínimo 16 anos). Qual estrutura lógica é essencial?", o: ["Sequência simples", "Condição (SE/SENÃO) — verificar se idade >= 16", "Repetição — verificar várias vezes", "Nenhuma — o computador descobre"], a: 1, ok: "Exato! Verificar 'SE idade >= 16' é o núcleo. Condição é a estrutura certa quando o resultado depende de uma verificação.", no: "O resultado depende de uma verificação? Quando algo precisa ser verdadeiro para uma ação acontecer, qual estrutura entra em cena?" },
    { q: "Qual pseudocódigo resolve 'exibir os números de 1 a 5 automaticamente'?", o: ["ESCREVA 1 / ESCREVA 2 / ESCREVA 3 / ESCREVA 4 / ESCREVA 5", "PARA i DE 1 ATÉ 5 FAÇA / ESCREVA i / FIM PARA", "SE i = 5 ENTÃO / ESCREVA i", "variavel = 5 / ESCREVA variavel"], a: 1, ok: "Correto! O loop PARA é ideal quando você sabe quantas repetições precisa. Resolve em qualquer escala.", no: "Quando repetir algo um número conhecido de vezes, qual estrutura existe para isso?" },
    { q: "O que é uma variável em lógica de programação?", o: ["Um valor fixo que nunca muda", "Um espaço com nome que armazena um valor que pode ser acessado depois", "Um tipo especial de loop", "Uma condição SE/SENÃO"], a: 1, ok: "Exatamente. Uma variável é como uma caixinha com etiqueta: você guarda algo, dá um nome, e usa o nome para acessar o valor depois.", no: "Uma variável não é fixa (isso seria constante). O que define uma variável é armazenar um valor identificado por um nome." },
    { q: "Qual a diferença entre PARA (for) e ENQUANTO (while)?", o: ["São a mesma estrutura", "PARA repete número definido de vezes; ENQUANTO repete enquanto condição for verdadeira", "ENQUANTO é mais rápido", "PARA é Python; ENQUANTO é JavaScript"], a: 1, ok: "Perfeito. PARA quando você sabe quantas vezes: 'repita 10 vezes'. ENQUANTO quando não sabe: 'repita até a senha estar correta'.", no: "A diferença está na previsibilidade: quando você sabe o número exato, usa uma; quando depende de condição, usa outra." },
  ] },
};
