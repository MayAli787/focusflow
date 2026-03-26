# CLAUDE.md — FocusFlow

> Documento de referência para agentes de IA trabalhando neste repositório.

---

## Visão Geral do Projeto

**FocusFlow** é uma plataforma web de produtividade centrada na saúde integral do estudante. Combina ciclos de estudo Pomodoro adaptados com missões de saúde gamificadas (hidratação, alongamento, descanso ocular), diário de carga cognitiva e relatórios semanais de bem-estar.

**Tagline:** *Estude mais. Viva melhor.*
**Paleta de Cores:** Azul Bebê · Lilás · Rosa Bebê · Rosa Choque

---

## Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| **Frontend** | Next.js 14 (App Router) + TypeScript |
| **Estilização** | Tailwind CSS + Shadcn/UI + CVA |
| **Animações** | Framer Motion |
| **Gráficos** | Recharts |
| **Estado/Cache** | TanStack Query |
| **Formulários** | React Hook Form + Zod |
| **Backend** | Next.js API Routes (serverless) |
| **ORM** | Prisma |
| **Banco de Dados** | PostgreSQL (Supabase) |
| **Cache** | Redis (Upstash serverless) |
| **Autenticação** | NextAuth.js v5 (Google OAuth 2.0) |
| **Hosting** | Vercel |
| **Monitoramento** | Sentry + Vercel Analytics + PostHog |
| **Ícones** | Lucide React |
| **Fontes** | Poppins (títulos/timer) + Inter (corpo) |

---

## Estrutura de Diretórios (esperada)

```
/
├── apps/web/                    # Next.js 14 App
│   ├── app/
│   │   ├── (auth)/login/        # Página de login
│   │   ├── app/                 # Rotas protegidas
│   │   │   ├── dashboard/       # Dashboard principal
│   │   │   ├── timer/[sessionId]/ # Tela do timer
│   │   │   ├── journal/         # Diário cognitivo
│   │   │   ├── badges/          # Galeria de medalhas
│   │   │   ├── report/          # Relatório semanal
│   │   │   └── profile/         # Perfil do usuário
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/ # NextAuth routes
│   │   │   ├── sessions/        # CRUD sessões de estudo
│   │   │   ├── missions/        # Missões de saúde
│   │   │   ├── cycles/          # Ciclos de estudo
│   │   │   ├── users/           # Perfil e pontos
│   │   │   ├── reports/         # Relatórios semanais
│   │   │   └── cron/            # Cron jobs (relatório)
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/                  # Componentes atômicos (Button, Card, Badge...)
│   │   ├── timer/               # TimerRing, TimerControls, CycleProgressDots
│   │   ├── missions/            # BreakMissionModal, YouTubePlayer
│   │   ├── cognitive/           # CognitiveCheckIn
│   │   ├── gamification/        # HealthPointsCounter, BadgeUnlockToast, PointsPopup
│   │   ├── report/              # WeeklyReportChart, insights
│   │   └── layout/              # AppLayout, Sidebar, BottomNav
│   ├── hooks/
│   │   └── useTimer.ts          # Hook principal do temporizador
│   ├── lib/
│   │   ├── auth.ts              # Config NextAuth
│   │   ├── prisma.ts            # Cliente Prisma
│   │   ├── badges.ts            # checkAndAwardBadges()
│   │   ├── insights.ts          # generateInsights()
│   │   └── reports.ts           # generateWeeklyReportData()
│   └── public/
│       └── badges/              # SVGs das medalhas
├── packages/shared/             # Tipos TypeScript compartilhados
├── prisma/
│   ├── schema.prisma            # Schema do banco
│   └── seed.ts                  # Seed: missões + medalhas
├── e2e/                         # Testes Playwright
├── docker-compose.yml           # PostgreSQL + Redis local
└── vercel.json                  # Config de deploy + cron jobs
```

---

## Modelo de Dados (Tabelas Principais)

| Tabela | Descrição |
|---|---|
| `users` | Perfil do usuário (Google OAuth), `health_points`, `default_config` (JSONB) |
| `study_sessions` | Sessão de estudo: duração, nº de sessões, status (`active/completed/abandoned`) |
| `study_cycles` | Ciclo individual: duração, `cognitive_state`, missão vinculada |
| `health_missions` | Catálogo de missões (categorias: `hydration/eye_rest/stretch/breathing/movement`) |
| `video_watches` | Registro de vídeos assistidos |
| `badges` | Catálogo de medalhas (7 medalhas com condições) |
| `user_badges` | Medalhas conquistadas por usuário |
| `weekly_reports` | Relatórios semanais com `report_data` e `insights` (JSONB) |

---

## Design System

### Paleta de Cores (tokens)

- **Azul:** `--blue-100` (#B8D9F0) → `--blue-700` (#2E7AB0)
- **Lilás:** `--lilac-100` (#EAD5F5) → `--lilac-700` (#7C3DAF)
- **Rosa:** `--pink-100` (#FFD6E7) → `--pink-700` (#C9356A)
- **Rosa Choque (CTA):** `--pink-500` (#FF69B4)
- **Neutros:** `--neutral-50` (#FAFAFA) → `--neutral-900` (#1A1A2E)

### Tipografia

- **Títulos + Timer:** Poppins (Bold 700 / SemiBold 600)
- **Corpo:** Inter (Regular 400 / Medium 500 / SemiBold 600)
- **Timer central:** Poppins 700, 64–96px

### Componentes-Chave

- **TimerRing** — Anel SVG com gradiente azul→lilás→rosa, `stroke-dashoffset` animado
- **MissionCard** — Card lilás claro, botão CTA rosa choque, embed YouTube colapsável
- **CognitiveCheckIn** — 3 botões: 🎯 Focado (azul), 😴 Cansado (âmbar), 😰 Estressado (coral)
- **BadgeUnlockToast** — Animação celebratória com confete, 4 segundos
- **HealthPointsBadge** — Chip animado com "+X pts" flutuante
- **SitTimeAlert** — Banner não-intrusivo no rodapé com slide-up

### Espaçamento

- Grid base: 8px (4/8/12/16/24/32/48/64px)
- Border radius: sm=8px, md=12px, lg=20px, xl=32px
- Sombra padrão: `0 2px 12px rgba(169, 109, 217, 0.12)` (lilás suave)

---

## Sistema de Gamificação

### Pontos de Saúde

| Ação | Pontos |
|---|---|
| Missão de pausa concluída | +10 |
| Vídeo de saúde assistido até o fim | +20 |
| Ciclo completo sem pular pausas (bônus) | +30 |
| Check-in cognitivo realizado | +5 |

### Medalhas (7 no total)

| Medalha | Ícone | Condição |
|---|---|---|
| Iron Back | 🦴 | 10 alongamentos/semana |
| Hydration Hero | 💧 | 100% missões de água na semana |
| Eagle Eyes | 👁️ | 10 descansos oculares |
| Focus Streak | 🔥 | 5 dias consecutivos com ciclo completo |
| Zen Student | 🧘 | 30 check-ins "Focado" |
| Iron Wrists | 🖐️ | 5 vídeos de pulso assistidos |
| Marathon Runner | 🏃 | 50h de estudo no total |

---

## Fluxo Principal do Sistema

```
Login Google → NextAuth.js → Criar/buscar user
    ↓
Configurar Sessão → POST /api/sessions → study_session criada
    ↓
Timer Rodando (useTimer hook + localStorage)
    ↓ (ao completar ciclo de foco)
Missão de Saúde Aleatória → GET /api/missions/random
    ├── Vídeo YouTube (IFrame API → detectar conclusão)
    └── "Concluída" → POST /api/missions/complete → +pontos → checkAndAwardBadges()
    ↓ (ao completar TODAS as sessões)
Check-in Cognitivo → POST /api/cycles/:id/state
    ↓
[Cron domingo 23:59] → Gerar Relatório Semanal
```

### Alertas por Tempo Sentado

- **30 min** → Vídeo "Relaxamento de Pulso e Mãos" (prevenção LER)
- **60 min** → Vídeo "Alongamento de Pescoço" (alívio cervical)
- **90 min** → Vídeo "Levante-se e Estique as Pernas" (circulação)

---

## Requisitos Não Funcionais Importantes

- **Precisão do timer:** ±1 segundo
- **LCP:** < 2.5s em conexões 4G
- **Animações:** 60 fps
- **Uptime:** 99,5% SLA
- **Offline básico:** Service worker para o timer
- **Acessibilidade:** WCAG 2.1 AA (contraste 4.5:1, navegação por teclado, `prefers-reduced-motion`)
- **Responsivo:** Mobile-first (320px, 768px, 1024px, 1440px)
- **Modo escuro:** Fundos azul-marinho (#0D1B2E), acentos lilás/rosa mantidos
- **Segurança:** OAuth 2.0 + JWT, HTTPS/TLS 1.3, conformidade LGPD
- **Navegadores:** Chrome, Firefox, Safari, Edge (últimas 2 versões)

---

## Comandos Úteis

```bash
# Desenvolvimento
npm run dev                          # Iniciar servidor local
npx prisma migrate dev               # Rodar migrations
npx prisma db seed                   # Popular banco com missões e medalhas
npx prisma studio                    # Interface visual do banco

# Docker (banco local)
docker-compose up -d                 # Subir PostgreSQL + Redis

# Qualidade
npm run lint                         # ESLint
npm run format                       # Prettier
npx playwright test                  # Testes E2E

# Deploy
vercel --prod                        # Deploy em produção
```

---

## Convenções de Código

- **Linguagem do código:** TypeScript (strict mode)
- **Linguagem do produto:** Português brasileiro (pt-BR)
- **Imports:** Usar aliases `@/components`, `@/lib`, `@/hooks`
- **Componentes:** Server Components por padrão; Client Components (`'use client'`) apenas quando necessário
- **Validação:** Zod para schemas de API + formulários
- **Estilização:** Classes Tailwind via CVA para variantes de componentes
- **Estado do servidor:** TanStack Query (usar `queryKey` consistentes, invalidar cache após mutações)
- **Datas:** `date-fns` com locale pt-BR
- **Autenticação em API Routes:** Sempre verificar sessão via `auth()` do NextAuth

---

## Organização por Sprints

| Sprint | Foco | Duração |
|---|---|---|
| **1** | Fundação, Design System, Autenticação | 2 semanas |
| **2** | Temporizador de Foco completo | 2 semanas |
| **3** | Missões de Saúde + Vídeos + Pontos | 2 semanas |
| **4** | Diário Cognitivo + Medalhas | 2 semanas |
| **5** | Relatório Semanal + Onboarding + Deploy | 2 semanas |

---

## Referência

- PRD completo: [`PRD_FocusFlow.md`](./PRD_FocusFlow.md)
