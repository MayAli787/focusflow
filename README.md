# FocusFlow — Estude mais. Viva melhor. ⏱️💪

Plataforma web de produtividade centrada na saúde integral do estudante. Combina ciclos de estudo Pomodoro adaptados com missões de saúde gamificadas.

## Stack

- **Frontend:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + Shadcn/UI
- **Backend:** Next.js API Routes + Prisma ORM + PostgreSQL
- **Auth:** NextAuth.js v5 (Google OAuth 2.0)
- **Cache:** Redis (Upstash)
- **Deploy:** Vercel + Supabase

## Setup Local

### Pré-requisitos

- Node.js 18+
- Docker & Docker Compose (para banco local)
- Conta Google Cloud (para OAuth)

### 1. Clonar e instalar

```bash
git clone <repo-url>
cd tcc_maysa
npm install
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.local.example .env.local
```

Edite `.env.local` com suas credenciais.

### 3. Configurar Google OAuth 2.0

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto (ou selecione um existente)
3. Vá em **APIs & Services > Credentials**
4. Clique em **Create Credentials > OAuth client ID**
5. Selecione **Web application**
6. Em **Authorized redirect URIs**, adicione:
   - `http://localhost:3000/api/auth/callback/google` (desenvolvimento)
   - `https://seudominio.com/api/auth/callback/google` (produção)
7. Copie o **Client ID** e **Client Secret** para o `.env.local`:
   ```
   GOOGLE_CLIENT_ID=seu-client-id
   GOOGLE_CLIENT_SECRET=seu-client-secret
   ```
8. Gere um secret para NextAuth:
   ```bash
   openssl rand -base64 32
   ```
   Cole o resultado em `NEXTAUTH_SECRET`

### 4. Subir banco de dados

```bash
docker-compose up -d
```

### 5. Rodar migrations e seed

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### 6. Iniciar o servidor

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## Comandos Úteis

```bash
npm run dev          # Dev server
npm run build        # Build de produção
npm run lint         # Verificar código
npm run format       # Formatar código
npx prisma studio    # Interface visual do banco
```

## Documentação

- [PRD Completo](./PRD_FocusFlow.md)
- [Referência para IAs](./CLAUDE.md)
- [Agentes](./agentes/)
