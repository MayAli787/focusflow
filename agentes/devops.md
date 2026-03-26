# Agente DevOps e Infraestrutura — FocusFlow

> Responsável por deploy, infraestrutura, monitoramento, CI/CD e ambiente de desenvolvimento.

---

## Escopo de Atuação

- **Deploy** na Vercel (staging + produção)
- **Banco de dados gerenciado** no Supabase
- **Cache** no Upstash (Redis serverless)
- **Docker Compose** para desenvolvimento local
- **CI/CD** com GitHub Actions
- **Monitoramento** com Sentry + Vercel Analytics + PostHog
- **Cron jobs** no Vercel
- **Segurança** — certificados, variáveis de ambiente, LGPD

---

## Tecnologias Sob Responsabilidade

| Tecnologia | Uso |
|---|---|
| Vercel | Hosting frontend + API Routes |
| Supabase | PostgreSQL gerenciado + Storage |
| Upstash | Redis serverless (cache de sessões) |
| Docker Compose | Dev local (PostgreSQL 15 + Redis 7) |
| GitHub Actions | CI/CD pipeline |
| Sentry | Tracking de erros |
| Vercel Analytics | Métricas de uso |
| PostHog | Analytics de produto |
| Vercel Cron Jobs | Relatório semanal automático |

---

## Arquivos e Diretórios

```
/
├── docker-compose.yml              # PostgreSQL + Redis local
├── vercel.json                     # Deploy config + cron jobs
├── .env.local.example              # Template de variáveis
├── .github/
│   └── workflows/
│       ├── ci.yml                  # Lint + testes em PRs
│       └── deploy.yml              # Deploy automático
├── sentry.client.config.ts         # Sentry frontend
└── sentry.server.config.ts         # Sentry backend
```

---

## Ambientes

| Ambiente | Branch | URL | Banco |
|---|---|---|---|
| **Local** | qualquer | `localhost:3000` | Docker PostgreSQL + Redis |
| **Staging** | `develop` | `staging.focusflow.app` | Supabase staging |
| **Produção** | `main` | `focusflow.app` | Supabase produção |

---

## Docker Compose (desenvolvimento)

```yaml
services:
  db:
    image: postgres:15
    ports: ["5432:5432"]
    environment:
      POSTGRES_DB: focusflow
      POSTGRES_USER: focusflow
      POSTGRES_PASSWORD: focusflow
    volumes:
      - pgdata:/var/lib/postgresql/data

  cache:
    image: redis:7
    ports: ["6379:6379"]

volumes:
  pgdata:
```

---

## Variáveis de Ambiente

```env
# === Auth ===
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=            # openssl rand -base64 32
NEXTAUTH_URL=               # http://localhost:3000 (local)

# === Database ===
DATABASE_URL=               # postgresql://focusflow:focusflow@localhost:5432/focusflow

# === Redis ===
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# === Cron ===
CRON_SECRET=                # Token de autenticação dos cron jobs

# === Monitoring ===
SENTRY_DSN=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
```

---

## Vercel Config

```json
{
  "crons": [
    {
      "path": "/api/cron/weekly-report",
      "schedule": "59 23 * * 0"
    }
  ]
}
```

---

## CI/CD Pipeline (GitHub Actions)

### Em Pull Requests para `main`:
1. Instalar dependências (`npm ci`)
2. Lint (`npm run lint`)
3. Type check (`npx tsc --noEmit`)
4. Testes E2E (`npx playwright test`)
5. Build de verificação (`npm run build`)

### Em merge para `main`:
1. Deploy automático via Vercel

### Em merge para `develop`:
1. Deploy automático para staging

---

## Checklist de Deploy em Produção

- [ ] Todas as variáveis de ambiente configuradas na Vercel
- [ ] Google OAuth redirect URI atualizado para domínio de produção
- [ ] Cron jobs ativos (`vercel.json`)
- [ ] Sentry capturando erros (verificar dashboard)
- [ ] Vercel Analytics habilitado
- [ ] PostHog configurado
- [ ] SSL/TLS ativo (automático na Vercel)
- [ ] Migrations aplicadas (`npx prisma migrate deploy`)
- [ ] Seed executado (missões + medalhas)
- [ ] Política de privacidade publicada (LGPD)
- [ ] Endpoint de exclusão de dados funcionando

---

## Monitoramento

| Ferramenta | O que monitora |
|---|---|
| **Sentry** | Erros frontend + backend (alertas por email para `error` e `fatal`) |
| **Vercel Analytics** | Core Web Vitals, tempo de resposta, uso de funções |
| **PostHog** | Eventos de produto (sessões criadas, missões concluídas, medalhas) |

---

## Regras e Convenções

1. **Nunca commitar `.env`** — usar `.env.local` (já no `.gitignore`)
2. **Branch protection:** `main` e `develop` exigem PR com review
3. **Semantic commits:** `feat:`, `fix:`, `chore:`, `docs:`
4. **Backup do banco:** Supabase faz backups automáticos diários
5. **Uptime SLA:** 99,5% — Vercel + Supabase
6. **Escalabilidade:** até 50.000 usuários simultâneos

---

## Dependências de Outros Agentes

- **Backend:** APIs que serão hospedadas e monitoradas
- **Banco de Dados:** Schema e migrations para aplicar em cada ambiente
- **Qualidade:** Pipeline de CI executa testes e lint
