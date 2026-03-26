# Agente Backend — FocusFlow

> Responsável por toda a lógica de negócio, API Routes, autenticação e integrações do servidor.

---

## Escopo de Atuação

- **API Routes** do Next.js (serverless functions)
- **Autenticação** via NextAuth.js v5 + Google OAuth 2.0
- **Lógica de negócio**: pontuação, verificação de medalhas, geração de relatórios e insights
- **Middleware** de proteção de rotas
- **Cron jobs** para tarefas automatizadas
- **Validação** de dados com Zod

---

## Tecnologias Sob Responsabilidade

| Tecnologia | Uso |
|---|---|
| Next.js API Routes | Endpoints serverless |
| NextAuth.js v5 | Autenticação Google OAuth 2.0 |
| Prisma Client | Queries ao PostgreSQL |
| Zod | Validação de request bodies |
| Redis (Upstash) | Cache de sessões ativas |
| JWT | Tokens de autenticação |

---

## Arquivos e Diretórios

```
apps/web/
├── app/api/
│   ├── auth/[...nextauth]/route.ts  # NextAuth handler
│   ├── sessions/
│   │   ├── route.ts                 # POST: criar sessão
│   │   └── [id]/
│   │       ├── route.ts             # GET/PATCH: sessão por ID
│   │       └── cycles/route.ts      # PATCH: registrar ciclo
│   ├── missions/
│   │   ├── random/route.ts          # GET: missão aleatória
│   │   └── complete/route.ts        # POST: concluir missão
│   ├── cycles/
│   │   └── [id]/state/route.ts      # PATCH: estado cognitivo
│   ├── users/
│   │   ├── points/route.ts          # GET: saldo de pontos
│   │   ├── config/route.ts          # PATCH: preferências
│   │   └── onboarding/route.ts      # PATCH: marcar onboarding
│   ├── reports/
│   │   └── latest/route.ts          # GET: último relatório
│   └── cron/
│       └── weekly-report/route.ts   # POST: cron semanal
├── lib/
│   ├── auth.ts                      # Configuração NextAuth
│   ├── prisma.ts                    # Singleton do Prisma Client
│   ├── badges.ts                    # checkAndAwardBadges()
│   ├── insights.ts                  # generateInsights()
│   └── reports.ts                   # generateWeeklyReportData()
└── middleware.ts                     # Proteção de rotas /app/*
```

---

## Endpoints da API

### Autenticação
| Método | Rota | Descrição |
|---|---|---|
| GET/POST | `/api/auth/*` | NextAuth handlers (login, logout, callback) |

### Sessões de Estudo
| Método | Rota | Descrição |
|---|---|---|
| POST | `/api/sessions` | Criar nova sessão de estudo |
| GET | `/api/sessions/:id` | Buscar sessão por ID |
| PATCH | `/api/sessions/:id` | Atualizar status da sessão |
| PATCH | `/api/sessions/:id/cycles` | Registrar ciclo concluído |

### Missões de Saúde
| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/missions/random` | Missão aleatória (evita repetir a última) |
| POST | `/api/missions/complete` | Marcar missão como concluída → +pontos → verificar medalhas |

### Ciclos e Cognitivo
| Método | Rota | Descrição |
|---|---|---|
| PATCH | `/api/cycles/:id/state` | Registrar estado cognitivo (`focused/tired/stressed`) |

### Usuário
| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/users/points` | Saldo atual + últimas 10 transações |
| PATCH | `/api/users/config` | Salvar preferências padrão |
| PATCH | `/api/users/onboarding` | Marcar onboarding como concluído |

### Relatórios
| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/reports/latest` | Último relatório semanal |
| POST | `/api/cron/weekly-report` | Gerar relatório (autenticado por `CRON_SECRET`) |

---

## Lógica de Negócio Crítica

### Sistema de Pontos
```
Missão concluída     → +10 pontos
Vídeo assistido      → +20 pontos
Ciclo sem pular      → +30 pontos (bônus)
Check-in cognitivo   → +5 pontos
```
- Pontos nunca expiram
- Acumular via `UPDATE users SET health_points = health_points + X`

### checkAndAwardBadges(userId)
Chamada **após toda ação pontuável**. Verifica condições de cada medalha:
- Queries agregadas por tipo (COUNT, SUM)
- `upsert` com `skipDuplicates` para evitar duplicar medalhas
- Retorna array de novas medalhas desbloqueadas

### Geração de Relatório Semanal
- Executar todo domingo 23:59 (Brasília) via Vercel Cron
- `generateWeeklyReportData()`: agregar horas, missões, estados cognitivos
- `generateInsights()`: 5 templates com condições, retorna 2–4 insights em pt-BR
- Salvar em `weekly_reports` com `report_data` e `insights` como JSONB

---

## Regras e Convenções

1. **Toda API Route deve verificar autenticação** via `auth()` do NextAuth
2. **Validar inputs com Zod** — nunca confiar em dados do cliente
3. **Transactions Prisma** para operações compostas (ex: concluir missão + dar pontos + verificar medalhas)
4. **Retornar erros padronizados:** `{ error: string, status: number }`
5. **Cron jobs autenticados** via header `Authorization: Bearer ${CRON_SECRET}`
6. **Conformidade LGPD:** endpoint de exclusão de dados do usuário
7. **Missão aleatória:** receber `lastMissionId` como query param para evitar repetição

---

## Variáveis de Ambiente

```env
# Auth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Database
DATABASE_URL=

# Redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Cron
CRON_SECRET=

# Monitoring
SENTRY_DSN=
```

---

## Dependências de Outros Agentes

- **Banco de Dados:** Schema Prisma, migrations, seeds
- **Frontend:** Consome as APIs; tipos compartilhados em `packages/shared`
