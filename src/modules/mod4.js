export default {
  id: "mod4", badge: "Módulo 4", color: "#D4537E", time: "~2h",
  t1: "UI e UX —", t2: "design com propósito.",
  subtitle: "Você já tem intuição estética. Aqui você aprende a nomear, analisar e replicar o que faz uma interface boa.",
  sections: [
    { num: "1", label: "Definição", sc: "#7F77DD", title: "UI vs. UX",
      body: "UI (User Interface) é o que o usuário vê e toca — botões, cores, tipografia, layout. UX (User Experience) é o que o usuário experiencia ao usar — facilidade, clareza, satisfação.",
      x: { t: "n", e: "🚗", tx: "Analogia: UI é o design do carro — cor, formato, interior. UX é a experiência de dirigir — como o volante responde, se a visibilidade é boa. Um carro pode ser lindo (UI) e desconfortável de dirigir (UX ruim).", bg: "#FAF0EB", tc: "#7A2E1A" } },
    { num: "2", label: "Comparação", sc: "#1D9E75", title: "As 10 Heurísticas de Nielsen",
      body: "Jakob Nielsen publicou em 1994 dez princípios de usabilidade que ainda são o padrão da indústria.",
      x: { t: "tb", h: ["#", "Heurística", "Em palavras simples"], r: [["1", "Visibilidade do status", "Sempre diga o que está acontecendo"], ["2", "Correspondência com o mundo real", "Use palavras que o usuário conhece"], ["3", "Controle e liberdade", "Permita desfazer ações"], ["4", "Consistência e padrões", "Mesma coisa = mesmo visual"], ["5", "Prevenção de erros", "Previna antes de corrigir"], ["6", "Reconhecimento > Recordação", "Mostre opções, não force memorização"], ["7", "Flexibilidade", "Atalhos para experientes"], ["8", "Design minimalista", "Menos é mais"], ["9", "Recuperação de erros", "Mensagens úteis e humanas"], ["10", "Ajuda e documentação", "Fácil de encontrar quando necessária"]] } },
    { num: "3", label: "Circunstâncias", sc: "#D47F1A", title: "Princípios de UI: hierarquia e consistência",
      body: "Enquanto as heurísticas são sobre UX, estes princípios são sobre o visual da interface.",
      x: { t: "tb", h: ["Princípio", "O que é", "Exemplo"], r: [["Hierarquia visual", "Importantes têm mais destaque", "Título grande, subtítulo médio, corpo pequeno"], ["Contraste", "Texto e fundo com diferença legível", "Texto escuro em fundo claro"], ["Consistência", "Mesma função = mesma aparência", "Todos os botões principais em azul"], ["Acessibilidade", "Funciona para todos", "Contraste WCAG, textos alternativos"]] } },
    { num: "4", label: "Relação", sc: "#3B8BD4", title: "UI/UX no guia",
      body: "UI/UX conecta tudo que foi aprendido até aqui com o usuário final. Todo código serve alguém.",
      x: { t: "c", lang: "Dependências", code: "Módulo 4\n  ├── Depende de:  Módulo 2 (HTML+CSS é onde UI/UX vira código)\n  ├── Leva a:      Projeto integrador (aplicar tudo junto)\n  └── Conecta com: todos os módulos — toda interface tem UX" } },
    { num: "5", label: "Testemunho", sc: "#D4537E", title: "O livro que mudou o design de produtos",
      body: "Don Norman cunhou o termo 'user experience' na Apple nos anos 90. O livro dele analisa por que produtos cotidianos são difíceis de usar e como o design poderia evitar isso.",
      x: { t: "q", ac: "#D4537E", q: "Quando as coisas funcionam bem, não notamos. É só quando funcionam mal que nos damos conta de que design existia o tempo todo.", a: "Don Norman", r: "Psicólogo cognitivo · autor de 'The Design of Everyday Things' · 1988" } },
  ],
  tutorials: [
    { n: "T1", title: "Hierarquia visual — guiando o olhar do usuário",
      intro: "Numa interface, NEM TUDO pode ter o mesmo destaque — senão NADA tem destaque. Hierarquia visual é decidir explicitamente o que o olho vê primeiro, segundo, terceiro.",
      lang: "três níveis básicos",
      code: `NÍVEL 1 — primário (a ação principal)
  - Tamanho maior, cor que contrasta
  - Ex: botão "Comprar", título da página
  - Tamanho típico: 32–48px (título), botão grande

NÍVEL 2 — secundário (apoio)
  - Tamanho médio, cor menos vibrante
  - Ex: subtítulos, botões de "ver mais"
  - Tamanho típico: 18–24px

NÍVEL 3 — terciário (detalhes)
  - Texto corrido, infos auxiliares
  - Cor mais discreta, tamanho padrão
  - Tamanho típico: 14–16px

Em CSS:
  h1 { font-size: 2.5rem; font-weight: 700; }
  h2 { font-size: 1.5rem; font-weight: 600; }
  p  { font-size: 1rem;   font-weight: 400; }`,
      explain: "Olhe qualquer interface boa que você usa (Spotify, Netflix, Apple). Sempre tem 3 níveis claros. Aplique a regra: o usuário precisa entender 'o que faço aqui?' nos primeiros 3 segundos só pelo visual.",
      errors: [
        { bad: "Tudo no mesmo tamanho — visual 'plano'", fix: "Diferencie pelo menos 3 níveis (título, subtítulo, corpo).", why: "Sem hierarquia, o olho não sabe onde pousar. Usuário escaneia, não acha o que importa, e sai." },
        { bad: "5+ tamanhos diferentes na mesma tela", fix: "Limite a 3 ou 4 tamanhos. Crie uma escala consistente.", why: "Variedade demais é o oposto de hierarquia: vira ruído." },
        { bad: "Usar cor para hierarquia (sem mudar tamanho)", fix: "Combine tamanho + peso + cor. Cor sozinha falha em pessoas com daltonismo.", why: "Cerca de 8% dos homens têm daltonismo. Hierarquia 100% baseada em cor exclui essas pessoas." },
      ] },
    { n: "T2", title: "Contraste e acessibilidade — todos precisam conseguir ler",
      intro: "Texto cinza-claro em fundo branco fica 'estiloso' — e ilegível. Acessibilidade não é restrição, é base: se 1 em cada 4 usuários não consegue ler, sua interface está quebrada.",
      lang: "WCAG — padrão internacional",
      code: `RAZÃO MÍNIMA DE CONTRASTE (texto vs fundo):
  - Texto normal:    4.5:1 (AA) — recomendado
  - Texto grande:    3:1 (AA)
  - Texto AAA:       7:1 — para públicos com dificuldade visual

EXEMPLOS:
  ✓ Preto (#000) em branco (#FFF)   → 21:1   ótimo
  ✓ #1C1B18 em #F8F6F0              → 16:1   ótimo
  ✗ #999 em #FFF                    → 2.85:1 falha
  ✗ Cinza-claro em branco           → falha sempre

OUTRAS REGRAS DE ACESSIBILIDADE:
  - Toda imagem com alt descritivo
  - Botões com label (não só ícone)
  - Foco visível ao navegar com teclado
  - Áreas clicáveis ≥ 44×44px (mobile)
  - Não use só cor para indicar erro/sucesso`,
      explain: "Use o site WebAIM Contrast Checker (webaim.org/resources/contrastchecker) — cole as cores e ele diz se passa. Faça isso ANTES de aplicar a paleta na interface inteira.",
      errors: [
        { bad: "Cinza claro (#CCC, #999) em branco para corpo de texto", fix: "Use no mínimo #595959 ou mais escuro em fundo branco.", why: "Falha o WCAG AA. Pessoas com baixa visão simplesmente não leem." },
        { bad: "Botão com cor de fundo igual ou parecida com o resto da página", fix: "Cor de destaque com contraste claro contra o fundo.", why: "Botão sem destaque é um botão que ninguém aperta. Você perde a ação principal." },
        { bad: "Mensagem de erro só com cor vermelha (sem ícone ou texto)", fix: "Combine cor + ícone + texto: '✗ Senha incorreta'.", why: "Daltônicos não distinguem vermelho/verde. Cor sozinha exclui." },
        { bad: "Botão de 30×30px no mobile", fix: "Mínimo 44×44px para áreas de toque.", why: "Dedo médio cobre ~44px. Menor que isso aumenta cliques errados em 4x." },
      ] },
    { n: "T3", title: "Aplicando heurísticas de Nielsen na prática",
      intro: "As 10 heurísticas viram abstratas se você só lê. Veja CADA UMA aplicada num app real do dia a dia.",
      lang: "exemplos do mundo real",
      code: `1. VISIBILIDADE DO STATUS
   ✓ WhatsApp: ✓ enviado, ✓✓ entregue, azul = lido
   ✗ App que processa pagamento sem dizer "carregando..."

2. LINGUAGEM DO MUNDO REAL
   ✓ "Esvaziar lixeira" (vocabulário humano)
   ✗ "Purge cache" (jargão técnico em produto consumer)

3. CONTROLE E LIBERDADE
   ✓ Gmail: 'Desfazer envio' por 30 segundos
   ✗ App que apaga sem confirmação e sem como recuperar

4. CONSISTÊNCIA E PADRÕES
   ✓ X (fechar) sempre no canto superior direito
   ✗ Mesmo botão em cor diferente em telas diferentes

5. PREVENÇÃO DE ERROS
   ✓ "Tem certeza que quer apagar a conta?" antes de apagar
   ✗ Botão "Apagar tudo" do lado de "Salvar"

6. RECONHECIMENTO > MEMORIZAÇÃO
   ✓ Autocomplete em buscas mostrando sugestões
   ✗ Lembrar comando exato sem dica visual

7. FLEXIBILIDADE
   ✓ Atalho de teclado para usuário avançado
   ✗ Forçar todos a usar o caminho longo do menu

8. DESIGN MINIMALISTA
   ✓ Google home: caixa de busca + 2 botões
   ✗ Tela inicial com 30 ícones

9. RECUPERAR-SE DE ERROS
   ✓ "Email inválido — verifique se tem @"
   ✗ "Erro 47B" sem contexto

10. AJUDA E DOCUMENTAÇÃO
    ✓ Tooltip ao passar o mouse no campo
    ✗ Manual de 80 páginas que ninguém abre`,
      explain: "Antes de entregar qualquer interface, passe pelas 10 e marque uma a uma: 'minha tela respeita?'. Erros mais comuns ficam no #1 (não mostrar status), #5 (não prevenir erros) e #9 (mensagens de erro inúteis).",
      errors: [
        { bad: "Aplicar as 10 cegamente sem priorizar", fix: "Concentre primeiro em #1, #4, #5, #9 — os de maior impacto.", why: "Tentar fazer tudo perfeito de primeira paralisa. Vá pelos críticos primeiro." },
        { bad: "Achar que heurística é regra rígida", fix: "É princípio. Existem casos legítimos para violar — mas precisa ser decisão consciente.", why: "Design minimalista não significa interface vazia. Status visível não significa poluir com avisos." },
        { bad: "Não testar com pessoa real", fix: "Mostre para 3 pessoas. Anote onde elas hesitam ou erram. Aí você encontra as violações.", why: "Você projetou a interface — você sabe onde está cada coisa. O usuário novo não sabe." },
      ] },
    { n: "T4", title: "Auditando uma tela — checklist prático",
      intro: "Aplique este roteiro em qualquer tela (sua ou de um app que você usa) e você terá um diagnóstico em 10 minutos.",
      lang: "roteiro de auditoria",
      code: `1. TIRE UM PRINT da tela

2. PRIMEIRA VISTA (1 segundo):
   - Qual a primeira coisa que você notou?
   - Era pra ser essa?

3. INTENÇÃO DA TELA:
   - Qual ação principal o usuário deve fazer?
   - Ela tem destaque proporcional?

4. CONTRASTE:
   - Texto principal lê fácil?
   - Botões destacam do fundo?
   - Use ContrastChecker em pelo menos 3 pares cor/fundo

5. CONSISTÊNCIA:
   - Quantos tamanhos de fonte? (ideal: 3–4)
   - Quantas cores principais? (ideal: 2–3 + neutros)
   - Botões de mesma função têm mesma aparência?

6. ESPAÇO E RESPIRO:
   - Os elementos respiram ou estão amontoados?
   - Padding ≥ 16px em containers principais?

7. ERROS E ESTADOS:
   - O que acontece se faltar dado?
   - O que acontece em loading?
   - Mensagens de erro são humanas?

8. ACESSIBILIDADE:
   - Texto ≥ 14px no corpo?
   - Áreas clicáveis ≥ 44px no mobile?
   - Imagens têm alt?

ANOTE 3 violações maiores e 3 melhorias rápidas.`,
      explain: "Faça este audit no seu projeto integrador antes de entregar. Faça também em apps que você acha bons E nos que você acha ruins — você vai ver padrões claros. Treina o olho.",
      errors: [
        { bad: "Pular o item 2 (primeira vista)", fix: "Esse é o mais importante. Se a primeira vista é confusa, o resto não importa.", why: "Usuário decide em 1–3 segundos se vai ficar. Se não pega a intenção rápido, sai." },
        { bad: "Auditar só a tela inicial", fix: "Audite os 3 caminhos críticos: home, ação principal, erro/exceção.", why: "Tela inicial costuma ser a mais polida. Os bugs de UX moram nas telas secundárias." },
        { bad: "Anotar 30 problemas sem priorizar", fix: "Limite a 3+3. Resolva os críticos antes de pegar nos pequenos.", why: "Listas longas viram backlog que ninguém ataca. Curtas geram ação." },
      ] },
  ],
  act: { type: "q", qs: [
    { q: "Você abre um app de delivery. O botão de confirmar pedido está no canto superior esquerdo, em fonte pequena e cor cinza. Qual problema de UX isso representa?", o: ["Nenhum — o usuário encontra eventualmente", "Viola a visibilidade — a ação principal não tem destaque compatível com sua importância", "O problema é de UI, não de UX", "O app precisa de mais cores"], a: 1, ok: "Exato! O botão mais importante precisa de destaque proporcional — tamanho, cor e posição claros. É a heurística de visibilidade do status.", no: "Quando a ação mais importante não tem destaque, o usuário precisa procurar por ela. Qual heurística de Nielsen trata isso?" },
    { q: "Qual a diferença entre UI e UX?", o: ["São a mesma coisa", "UI é o que o usuário vê (botões, cores, layout); UX é o que o usuário experiencia (fluidez, clareza, satisfação)", "UI é para web; UX é para mobile", "UX é mais avançado — profissionais migram de UI para UX"], a: 1, ok: "Perfeito! UI = visual. UX = a jornada completa. Uma tela pode ser linda (UI) e frustrante de usar (UX ruim).", no: "Releia a Seção 1. A distinção: UI é o que você vê, UX é o que você sente ao usar. Porta bonita (UI) e difícil de abrir (UX ruim)." },
    { q: "Um formulário com 20 campos não indica quais estão errados quando o usuário tenta enviar. Qual heurística é violada?", o: ["Design minimalista", "Ajuda para reconhecer e recuperar erros", "Flexibilidade de uso", "Consistência"], a: 1, ok: "Correto! O sistema deve ajudar o usuário a entender e corrigir erros — não apenas rejeitar o formulário sem explicação.", no: "Quando um sistema não explica o que deu errado nem como corrigir, qual heurística de Nielsen está sendo violada?" },
    { q: "Você usa 7 fontes diferentes, 5 paletas de cores e 4 tamanhos de botão numa mesma página. Qual princípio de UI isso viola?", o: ["Nenhum — variedade é criativa", "Consistência — mesma função deve ter mesma aparência; variação sem propósito cria ruído", "Acessibilidade", "Responsividade"], a: 1, ok: "Exato! Consistência: mesma função, mesma aparência. Variação excessiva cria ruído visual e dificulta o aprendizado do padrão.", no: "Se cada botão parece diferente, o usuário não sabe qual padrão seguir. Qual princípio trata isso?" },
  ] },
};
