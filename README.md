# Guia de Programação

Guia interativo de programação (React 19 + Vite). Inclui sistema de login com Supabase para salvar o progresso do aprendiz entre sessões e dispositivos.

## Rodando localmente

```bash
npm install
cp .env.example .env.local   # preencha com suas credenciais do Supabase
npm run dev
```

O app funciona sem as variáveis de ambiente — só não persiste o progresso. Um banner avisa o usuário quando ele não está logado.

## Setup do Supabase (gratuito)

1. Crie um projeto em [supabase.com](https://supabase.com) (free tier: 50k MAU, sem cartão).
2. Em **Authentication → Providers**, garanta que **Email** está habilitado (já é o padrão).
3. Em **SQL Editor**, rode:

```sql
create table user_progress (
  user_id uuid references auth.users(id) on delete cascade,
  module_id text not null,
  completed_at timestamptz default now(),
  primary key (user_id, module_id)
);

alter table user_progress enable row level security;

create policy "users read own progress" on user_progress
  for select using (auth.uid() = user_id);

create policy "users insert own progress" on user_progress
  for insert with check (auth.uid() = user_id);

create policy "users delete own progress" on user_progress
  for delete using (auth.uid() = user_id);
```

4. Em **Settings → API**, copie a **Project URL** e a **anon public key** para `.env.local`:

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=...
```

## IA de dúvidas (opcional)

Cada módulo termina com um chat "Pergunte à IA" focado **só no conteúdo do módulo**. A integração usa Claude Haiku 4.5 via uma Edge Function do Supabase — a chave da Anthropic nunca fica exposta no front.

### Deploy da Edge Function

1. Instale a [Supabase CLI](https://supabase.com/docs/guides/cli/getting-started).
2. Faça login e linke o projeto:

```bash
supabase login
supabase link --project-ref your-project-ref
```

3. Configure a chave da Anthropic como secret (não vai pro repositório):

```bash
supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
```

4. Deploy:

```bash
supabase functions deploy ask-ai
```

A função fica em `supabase/functions/ask-ai/index.ts`. Ela aplica um system prompt diferente por módulo — perguntas fora do escopo são redirecionadas pela própria IA. Sem a Edge Function deployada, o chat mostra um aviso de erro, mas o resto do guia continua funcionando.

## Scripts

- `npm run dev` — servidor de desenvolvimento.
- `npm run build` — build de produção.
- `npm run lint` — checagem com ESLint.
- `npm run preview` — preview do build.
