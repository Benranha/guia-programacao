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
2. Em **Authentication → Providers**, habilite:
   - **Email** (já habilitado por padrão).
   - **Google** — cole Client ID/Secret do [Google Cloud Console](https://console.cloud.google.com). Guia: [supabase.com/docs/guides/auth/social-login/auth-google](https://supabase.com/docs/guides/auth/social-login/auth-google).
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

## Scripts

- `npm run dev` — servidor de desenvolvimento.
- `npm run build` — build de produção.
- `npm run lint` — checagem com ESLint.
- `npm run preview` — preview do build.
