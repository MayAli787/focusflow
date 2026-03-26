# Agente Banco de Dados — FocusFlow

> Responsável pelo schema do banco de dados, ORM Prisma, migrations, seeds e integridade dos dados.

---

## Escopo de Atuação

- **Schema Prisma** — definição de todos os modelos e relacionamentos
- **Migrations** — criação e evolução do schema
- **Seeds** — dados iniciais (missões de saúde e medalhas)
- **Queries otimizadas** — índices, performance de consultas agregadas
- **Integridade referencial** — constraints, enums, valores padrão

---

## Tecnologias Sob Responsabilidade

| Tecnologia | Uso |
|---|---|
| Prisma ORM | Modelagem, queries, migrations |
| PostgreSQL | Banco de dados relacional |
| Supabase | PostgreSQL gerenciado + Storage |
| Docker Compose | PostgreSQL + Redis local para desenvolvimento |

---

## Arquivos e Diretórios

```
prisma/
├── schema.prisma          # Schema principal
├── seed.ts                # Dados iniciais
└── migrations/            # Histórico de migrations

docker-compose.yml         # PostgreSQL 15 + Redis 7
.env.local.example         # Template de variáveis
```

---

## Modelo de Dados Completo

### users
```sql
id              UUID PRIMARY KEY
google_id       VARCHAR UNIQUE NOT NULL
name            VARCHAR NOT NULL
email           VARCHAR UNIQUE NOT NULL
avatar_url      VARCHAR
health_points   INTEGER DEFAULT 0
onboarding_done BOOLEAN DEFAULT FALSE
default_config  JSONB                    -- preferências: duração, nº sessões, som
created_at      TIMESTAMP DEFAULT NOW()
```

### study_sessions
```sql
id                    UUID PRIMARY KEY
user_id               UUID → users(id)
name                  VARCHAR              -- ex: "Matemática — Cálculo"
planned_duration_min  INTEGER NOT NULL
sessions_planned      INTEGER NOT NULL
sessions_completed    INTEGER DEFAULT 0
status                ENUM('active','completed','abandoned')
started_at            TIMESTAMP
ended_at              TIMESTAMP
```

### study_cycles
```sql
id                 UUID PRIMARY KEY
session_id         UUID → study_sessions(id)
cycle_number       INTEGER NOT NULL
duration_min       INTEGER NOT NULL
cognitive_state    ENUM('focused','tired','stressed')
mission_id         UUID → health_missions(id)
mission_completed  BOOLEAN DEFAULT FALSE
started_at         TIMESTAMP
ended_at           TIMESTAMP
```

### health_missions
```sql
id          UUID PRIMARY KEY
category    ENUM('hydration','eye_rest','stretch','breathing','movement')
title       VARCHAR NOT NULL
description TEXT NOT NULL
video_url   VARCHAR                  -- URL YouTube (opcional)
points      INTEGER DEFAULT 10
```

### video_watches
```sql
id           UUID PRIMARY KEY
user_id      UUID → users(id)
mission_id   UUID → health_missions(id)
session_id   UUID → study_sessions(id)
completed    BOOLEAN DEFAULT FALSE
points_given INTEGER DEFAULT 0
watched_at   TIMESTAMP DEFAULT NOW()
```

### badges
```sql
id               UUID PRIMARY KEY
name             VARCHAR NOT NULL
description      TEXT
icon             VARCHAR              -- emoji ou path do SVG
condition_type   VARCHAR NOT NULL      -- ex: 'stretch_count_weekly'
condition_value  INTEGER NOT NULL      -- ex: 10
```

### user_badges
```sql
id          UUID PRIMARY KEY
user_id     UUID → users(id)
badge_id    UUID → badges(id)
unlocked_at TIMESTAMP DEFAULT NOW()
UNIQUE(user_id, badge_id)
```

### weekly_reports
```sql
id                   UUID PRIMARY KEY
user_id              UUID → users(id)
week_start           DATE NOT NULL
week_end             DATE NOT NULL
total_hours          DECIMAL(5,2)
missions_completed   INTEGER
missions_skipped     INTEGER
report_data          JSONB            -- dados brutos agregados
insights             JSONB            -- array de strings narrativas
generated_at         TIMESTAMP DEFAULT NOW()
```

---

## Seed Obrigatório

### 12+ Missões de Saúde

| Categoria | Quantidade | Exemplos |
|---|---|---|
| `hydration` | 3 | "Beba um copo d'água", "Encha sua garrafinha" |
| `eye_rest` | 2 | "Regra 20-20-20", "Feche os olhos por 30s" |
| `stretch` | 3 (com vídeo) | "Alongamento de pescoço", "Pulsos e mãos", "Pernas" |
| `breathing` | 2 | "Respiração 4-7-8", "Box breathing" |
| `movement` | 2 | "Levante e caminhe", "10 agachamentos" |

### 7 Medalhas

| Nome | condition_type | condition_value |
|---|---|---|
| Iron Back | `stretch_count_weekly` | 10 |
| Hydration Hero | `hydration_perfect_week` | 1 |
| Eagle Eyes | `eye_rest_count` | 10 |
| Focus Streak | `consecutive_days` | 5 |
| Zen Student | `focused_checkins` | 30 |
| Iron Wrists | `wrist_videos_watched` | 5 |
| Marathon Runner | `total_study_hours` | 50 |

---

## Comandos

```bash
# Migrations
npx prisma migrate dev --name <nome>    # Criar migration
npx prisma migrate deploy               # Aplicar em produção
npx prisma db push                      # Sincronizar sem migration

# Seed
npx prisma db seed                      # Popular banco

# Ferramentas
npx prisma studio                       # Interface visual
npx prisma generate                     # Gerar Prisma Client

# Docker
docker-compose up -d                    # Subir PostgreSQL + Redis
docker-compose down                     # Parar serviços
```

---

## Regras e Convenções

1. **UUIDs como chave primária** em todas as tabelas
2. **Soft constraints:** usar enums do Prisma para `status`, `category`, `cognitive_state`
3. **JSONB** para dados flexíveis (`default_config`, `report_data`, `insights`)
4. **Unique constraint** em `user_badges(user_id, badge_id)` para evitar medalhas duplicadas
5. **Timestamps automáticos:** `created_at` com `DEFAULT NOW()` em todas as tabelas
6. **Índices recomendados:**
   - `study_sessions(user_id, status)`
   - `study_cycles(session_id)`
   - `user_badges(user_id)`
   - `weekly_reports(user_id, week_start)`
7. **Cascading deletes** ao excluir usuário (conformidade LGPD)

---

## Dependências de Outros Agentes

- **Backend:** Consome Prisma Client para queries
- **Frontend:** Usa tipos gerados pelo Prisma
