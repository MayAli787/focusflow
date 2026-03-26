# PRD — FocusFlow: Temporizador de Foco com Checklist Biológico

> **Versão:** 1.0
> **Data:** Março de 2026
> **Status:** Rascunho Inicial
> **Responsável:** Product Team — FocusFlow
> **Paleta de Cores:** Azul Bebê · Lilás · Rosa Bebê · Rosa Choque

---

## Índice

1. [Visão Geral](#1-visão-geral)
2. [Sobre o Produto](#2-sobre-o-produto)
3. [Público-Alvo](#3-público-alvo)
4. [Objetivos](#4-objetivos)
5. [Requisitos Funcionais](#5-requisitos-funcionais)
6. [Requisitos Não Funcionais](#6-requisitos-não-funcionais)
7. [Arquitetura Técnica](#7-arquitetura-técnica)
8. [Design System](#8-design-system)
9. [User Stories](#9-user-stories)
10. [Lista de Tarefas em Sprints](#10-lista-de-tarefas-em-sprints)

---

## 1. Visão Geral

O **FocusFlow** é uma plataforma web de produtividade centrada na saúde integral do estudante. Diferente de um simples cronômetro Pomodoro, o FocusFlow **condiciona a produtividade à saúde**: o sistema garante que cada pausa seja uma oportunidade de recuperação física e mental — hidratação, descanso ocular, alongamento e autoconsciência cognitiva.

A premissa central é: **estudar bem só é possível quando o corpo e a mente estão equilibrados**. O FocusFlow atua como um parceiro de saúde silencioso, transformando hábitos prejudiciais (ficar sentado horas sem parar, esquecer de beber água, ignorar sinais de cansaço) em rituais de bem-estar gamificados e recompensadores.

A plataforma combina:
- Ciclos de estudo inteligentes (Pomodoro adaptado)
- Missões físicas rápidas e guiadas durante as pausas
- Diário de Carga Cognitiva para autoconhecimento
- Sugestões de vídeo de saúde baseadas no tempo sentado
- Sistema de pontos e medalhas por adesão aos hábitos
- Relatório Semanal de Sobrevivência com insights personalizados

---

## 2. Sobre o Produto

**Nome:** FocusFlow
**Tagline:** *Estude mais. Viva melhor.*
**Plataforma:** Web (responsivo — desktop e mobile)
**Autenticação:** Google OAuth 2.0
**Modelo de Negócio:** Freemium — funcionalidades essenciais gratuitas; relatórios avançados, medalhas exclusivas e temas visuais em plano Premium (Fase 2)

### 2.1 Proposta de Valor

| Problema do Estudante | Solução FocusFlow |
|---|---|
| Passa horas sentado sem se mexer | Missões físicas obrigatórias nas pausas |
| Esquece de beber água durante o estudo | Missão de hidratação aleatória com registro |
| Não percebe quando está cansado demais | Diário de Carga Cognitiva ao fim de cada ciclo |
| Nenhuma visão sobre hábitos ao longo da semana | Relatório de Sobrevivência com insights automáticos |
| LER e tensão cervical por uso prolongado de teclado/caneta | Vídeos de saúde sugeridos por tempo sentado |
| Falta de motivação para manter hábitos saudáveis | Pontos de saúde, medalhas e conquistas gamificadas |

### 2.2 Diferenciais Competitivos

- **Não é apenas Pomodoro:** a pausa tem conteúdo de saúde, não é tempo livre
- **Missões aleatórias:** evita o tedioso "agora descanse 5 minutos" — cada pausa é diferente
- **Inteligência temporal:** os vídeos sugeridos variam conforme o tempo acumulado sentado (30/60/90 min)
- **Relatório narrativo:** o sistema conta uma história dos hábitos da semana, não apenas números frios
- **Gamificação de saúde:** pontos e medalhas por comportamentos físicos, não apenas por horas estudadas

---

## 3. Público-Alvo

### 3.1 Segmentação

**Segmento Primário — Estudantes do Ensino Médio e Pré-Vestibular (15–19 anos)**
- Alta carga de estudo diária (6–10h)
- Altamente suscetíveis a sedentarismo, LER e ansiedade
- Familiarizados com apps de gamificação (Duolingo, Habitica)
- Sensíveis a recompensas visuais e notificações

**Segmento Secundário — Universitários (18–25 anos)**
- Sessões longas de estudo e trabalhos acadêmicos
- Necessidade de organização, foco sustentado e bem-estar mental
- Já conhecem a técnica Pomodoro, buscam algo mais completo

**Segmento Terciário — Profissionais em transição de carreira (25–35 anos)**
- Estudam em horários alternativos (manhã cedo / noite)
- Preocupados com saúde postural e mental
- Valorizam relatórios e dados sobre seus hábitos

### 3.2 Personas

---

**Persona 1 — Ana, 17 anos | Estudante de Cursinho Pré-Vestibular**

> *"Eu sei que deveria fazer pausas, mas quando olho para o relógio já são 4 horas que estou sentada."*

- **Dores:** dor no pescoço, esquece de beber água, se sente culpada quando para de estudar
- **Motivações:** passar no vestibular, se sentir mais saudável, ter controle da rotina
- **Comportamento digital:** usa TikTok, Notion, faz listas de tarefas, gosta de estética no setup
- **O que espera do FocusFlow:** que o app "cuide dela" enquanto ela foca em estudar

---

**Persona 2 — Rafael, 22 anos | Universitário de Engenharia de Software**

> *"Uso Pomodoro há 2 anos mas nunca realmente 'descanso' — fico no celular mesmo."*

- **Dores:** pausas improdutivas, dores nas mãos por digitação excessiva, procrastinação
- **Motivações:** alta performance, gamificação, rankings, dados sobre sua produtividade
- **Comportamento digital:** usa GitHub, Anki, Discord, gosta de dashboards e métricas
- **O que espera do FocusFlow:** missões que o obriguem a sair da tela + relatórios detalhados

---

**Persona 3 — Camila, 29 anos | Preparando-se para concurso público**

> *"Estudo 3h por dia depois do trabalho. Chego em casa já cansada e precisa ser eficiente."*

- **Dores:** cansaço crônico, dificuldade de manter foco, estresse acumulado
- **Motivações:** aprovação no concurso, equilíbrio saúde-estudo, reconhecimento do esforço
- **Comportamento digital:** usa apps de meditação, planilhas de estudo, YouTube para aprender
- **O que espera do FocusFlow:** insights que mostrem se ela está estudando de forma sustentável

---

## 4. Objetivos

### 4.1 Objetivos de Negócio

- Alcançar **10.000 usuários ativos mensais** nos primeiros 6 meses pós-lançamento
- Atingir taxa de retenção de **40% no D30** (usuários que retornam após 30 dias)
- Converter **15% dos usuários gratuitos** em assinantes Premium (Fase 2, mês 9)
- Estabelecer o FocusFlow como referência em **EdTech de bem-estar** no Brasil

### 4.2 Objetivos do Produto

- Garantir que **ao menos 1 missão de saúde** seja concluída por sessão de estudo
- Aumentar a adesão a pausas ativas para **≥70% dos ciclos** registrados por usuário
- Reduzir o relato de estado "Estressado" no Diário Cognitivo em **20% ao longo de 4 semanas** de uso contínuo
- Gerar **Relatório de Sobrevivência** para 100% dos usuários ativos toda segunda-feira

### 4.3 Objetivos do Usuário

- Estudar com mais foco e **sem culpa nas pausas**
- Ter **visibilidade real** sobre seus hábitos de saúde durante o estudo
- Ser **recompensado** por cuidar do próprio corpo
- Identificar **padrões de cansaço** e ajustar a rotina com base em dados

---

## 5. Requisitos Funcionais

### 5.1 — Autenticação e Gestão de Perfil

- [ ] **RF-01** — O sistema deve permitir criação de conta via Google (OAuth 2.0) com um único clique
- [ ] **RF-02** — O sistema deve permitir login e logout com conta Google
- [ ] **RF-03** — O sistema deve criar perfil automático com nome, foto e e-mail vindos da conta Google
- [ ] **RF-04** — O usuário deve poder editar preferências padrão de estudo (duração de ciclo, número de sessões, som de alarme)
- [ ] **RF-05** — O sistema deve exibir no perfil: pontos de saúde totais, medalhas desbloqueadas e histórico de sessões

### 5.2 — Configuração de Sessão de Estudo

- [ ] **RF-06** — O usuário deve poder definir a **duração de cada ciclo de foco** (opções: 25 / 45 / 60 / 90 minutos ou personalizado)
- [ ] **RF-07** — O usuário deve poder definir o **número de sessões** do ciclo diário (1 a 12 sessões)
- [ ] **RF-08** — O sistema deve calcular e exibir a **duração total estimada** do ciclo antes de iniciar
- [ ] **RF-09** — O usuário deve poder dar um **nome ou tema** à sessão (ex.: "Matemática — Cálculo Integral")
- [ ] **RF-10** — O sistema deve **lembrar as últimas configurações** usadas para pré-preencher o formulário

### 5.3 — Temporizador de Foco

- [ ] **RF-11** — O sistema deve oferecer os controles de **Iniciar, Pausar, Retomar e Encerrar** o temporizador
- [ ] **RF-12** — O sistema deve exibir um **anel de progresso circular animado** mostrando o tempo restante
- [ ] **RF-13** — O sistema deve exibir o **número do ciclo atual** (ex.: "Sessão 2 de 4")
- [ ] **RF-14** — O sistema deve emitir **notificação sonora e visual** ao fim de cada sessão de foco
- [ ] **RF-15** — O sistema deve enviar **notificação push do navegador** ao fim da sessão (com permissão prévia)
- [ ] **RF-16** — O temporizador deve **continuar funcionando em segundo plano** (aba minimizada ou tela bloqueada no mobile)
- [ ] **RF-17** — O sistema deve oferecer um **modo foco** (ocultar navegação para minimizar distrações)

### 5.4 — Missões de Saúde nas Pausas

- [ ] **RF-18** — Ao fim de cada sessão de foco, o sistema deve exibir automaticamente uma **missão de saúde aleatória**
- [ ] **RF-19** — As missões disponíveis devem cobrir as categorias: Hidratação, Descanso Ocular, Alongamento, Respiração e Movimento
- [ ] **RF-20** — O catálogo inicial de missões deve conter **ao menos 12 missões distintas** para evitar repetição
- [ ] **RF-21** — O sistema deve **evitar repetir a mesma missão** em ciclos consecutivos na mesma sessão
- [ ] **RF-22** — Missões de alongamento devem exibir um **vídeo de demonstração** incorporado (YouTube embed)
- [ ] **RF-23** — O usuário deve poder marcar a missão como **"Concluída"** para ganhar pontos de saúde
- [ ] **RF-24** — O sistema deve exibir um **timer da pausa** no modal da missão, mostrando quanto tempo resta
- [ ] **RF-25** — O sistema deve **registrar** quais missões foram concluídas ou puladas por sessão

### 5.5 — Vídeos de Saúde por Tempo Acumulado Sentado

- [ ] **RF-26** — O sistema deve rastrear o **tempo contínuo sentado** (tempo de estudo ativo sem pausa com missão concluída)
- [ ] **RF-27** — Ao atingir **30 minutos** acumulados sentado, o sistema deve sugerir o vídeo: *"Relaxamento de Pulso e Mãos"* (prevenção de LER)
- [ ] **RF-28** — Ao atingir **60 minutos** acumulados sentado, o sistema deve sugerir o vídeo: *"Alongamento de Pescoço"* (alívio cervical)
- [ ] **RF-29** — Ao atingir **90 minutos** acumulados sentado, o sistema deve sugerir o vídeo: *"Levante-se e Estique as Pernas"* (circulação sanguínea)
- [ ] **RF-30** — Cada threshold de tempo sentado deve **disparar apenas uma vez por sessão**
- [ ] **RF-31** — O sistema deve detectar se o vídeo foi **assistido até o fim** (via YouTube IFrame API) para conceder pontos extras
- [ ] **RF-32** — O usuário deve poder **dispensar a sugestão de vídeo** (sem perder pontos, mas sem ganhá-los)
- [ ] **RF-33** — O alerta de vídeo deve aparecer como **banner não-intrusivo** (não interrompe o temporizador)

### 5.6 — Diário de Carga Cognitiva

- [ ] **RF-34** — Ao fim de cada **ciclo completo** (todas as sessões concluídas), o sistema deve exibir o check-in emocional
- [ ] **RF-35** — O usuário deve selecionar seu estado atual entre: 🎯 **Focado** / 😴 **Cansado** / 😰 **Estressado**
- [ ] **RF-36** — O sistema deve registrar o estado com **data, horário e duração** da sessão correspondente
- [ ] **RF-37** — O sistema deve exibir um **histórico visual** dos estados cognitivos dos últimos 7 dias
- [ ] **RF-38** — O sistema deve **identificar padrões** (ex.: "Você costuma se sentir Cansado às quintas-feiras") para exibir no Relatório

### 5.7 — Sistema de Pontos de Saúde

- [ ] **RF-39** — O sistema deve conceder pontos conforme a tabela:
  - Missão de pausa concluída: **+10 pontos**
  - Vídeo de saúde assistido até o fim: **+20 pontos**
  - Ciclo completo sem pular nenhuma pausa: **+30 pontos (bônus)**
  - Check-in cognitivo realizado: **+5 pontos**
- [ ] **RF-40** — O saldo de pontos deve ser exibido de forma **destacada no perfil e no header** do app
- [ ] **RF-41** — O sistema deve exibir uma **animação de pontos flutuantes** ao ganhar pontos ("+ 10 pts")
- [ ] **RF-42** — Pontos não expiram e são **acumulados para sempre** no perfil do usuário

### 5.8 — Sistema de Medalhas e Conquistas

- [ ] **RF-43** — O sistema deve desbloquear medalhas automaticamente ao atingir as condições:

  | Medalha | Ícone | Condição |
  |---|---|---|
  | Iron Back | 🦴 | 10 alongamentos concluídos na semana |
  | Hydration Hero | 💧 | Missão de água concluída em 100% das pausas de uma semana |
  | Eagle Eyes | 👁️ | 10 descansos oculares concluídos |
  | Focus Streak | 🔥 | 5 dias consecutivos com ciclo completo |
  | Zen Student | 🧘 | 30 check-ins com estado "Focado" |
  | Iron Wrists | 🖐️ | 5 vídeos de pulso/mãos assistidos até o fim |
  | Marathon Runner | 🏃 | 50 horas de estudo registradas no total |

- [ ] **RF-44** — Ao desbloquear uma medalha, o sistema deve exibir uma **notificação comemorativa animada**
- [ ] **RF-45** — O sistema deve exibir uma **galeria de medalhas** no perfil (desbloqueadas em cor, bloqueadas em cinza com dica do que falta)
- [ ] **RF-46** — Medalhas bloqueadas devem mostrar **progresso atual** (ex.: "7/10 alongamentos — 3 para desbloquear Iron Back")

### 5.9 — Relatório de Sobrevivência Semanal

- [ ] **RF-47** — O sistema deve gerar o Relatório toda **segunda-feira ao abrir o app** (referente à semana anterior)
- [ ] **RF-48** — O relatório deve exibir:
  - Total de **horas estudadas** na semana
  - Número de **missões de saúde concluídas vs. puladas**
  - **Distribuição do estado cognitivo** por dia (gráfico: Focado/Cansado/Estressado)
  - **Dia mais produtivo** e **dia com mais cansaço** da semana
  - **Pontos de saúde** acumulados na semana
  - **Medalhas desbloqueadas** na semana
  - **Insights automáticos** em linguagem narrativa (mínimo 2 insights por relatório)
- [ ] **RF-49** — Exemplos de insights automáticos gerados pelo sistema:
  - *"Você estudou 10 horas, mas só concluiu missões de hidratação em 2 pausas. Lembre-se: seu cérebro funciona melhor hidratado."*
  - *"Sua produtividade caiu na quinta-feira. Você relatou estar Cansado em todos os ciclos daquele dia e não completou nenhum alongamento."*
  - *"Ótima semana! Você completou 100% das missões de pausa em 4 dos 7 dias."*
- [ ] **RF-50** — O relatório deve ser **exportável em PDF**
- [ ] **RF-51** — O sistema deve manter o **histórico dos últimos 4 relatórios** acessível no perfil

---

## 6. Requisitos Não Funcionais

### 6.1 — Desempenho

- [ ] **RNF-01** — O temporizador deve ter **precisão de ±1 segundo** independente da carga do sistema
- [ ] **RNF-02** — A interface deve carregar em **menos de 3 segundos** em conexões 4G (LCP < 2.5s)
- [ ] **RNF-03** — Notificações de fim de sessão devem disparar com **atraso máximo de 500ms**
- [ ] **RNF-04** — Animações devem rodar a **60 fps** em dispositivos com hardware médio

### 6.2 — Disponibilidade e Confiabilidade

- [ ] **RNF-05** — O sistema deve ter **uptime mínimo de 99,5%** mensal (SLA)
- [ ] **RNF-06** — O temporizador deve continuar funcionando em **modo offline básico** (service worker)
- [ ] **RNF-07** — Dados de sessão devem ser **sincronizados automaticamente** ao reconectar à internet
- [ ] **RNF-08** — O sistema deve **recuperar o estado do timer** em caso de refresh acidental da página

### 6.3 — Segurança

- [ ] **RNF-09** — Autenticação exclusivamente via **OAuth 2.0 com tokens JWT** de curta duração
- [ ] **RNF-10** — Toda comunicação deve ser criptografada via **HTTPS/TLS 1.3**
- [ ] **RNF-11** — O sistema deve estar em conformidade com a **LGPD** (Lei nº 13.709/2018)
- [ ] **RNF-12** — O sistema deve oferecer ao usuário a opção de **excluir todos os seus dados** a qualquer momento
- [ ] **RNF-13** — Política de privacidade clara, acessível e em linguagem simples

### 6.4 — Acessibilidade

- [ ] **RNF-14** — Interface compatível com **leitores de tela** (padrão WCAG 2.1, nível AA)
- [ ] **RNF-15** — Contraste mínimo de **4.5:1** para textos e **3:1** para elementos de interface
- [ ] **RNF-16** — Todos os elementos interativos devem ser **acessíveis via teclado** (Tab, Enter, Espaço)
- [ ] **RNF-17** — Suporte a **redução de movimento** (prefers-reduced-motion) para animações

### 6.5 — Escalabilidade

- [ ] **RNF-18** — Arquitetura deve suportar até **50.000 usuários simultâneos** sem degradação
- [ ] **RNF-19** — Banco de dados deve ser **horizontalmente escalável**
- [ ] **RNF-20** — Assets estáticos (vídeos, imagens) devem ser servidos via **CDN**

### 6.6 — Usabilidade e Experiência

- [ ] **RNF-21** — Interface **responsiva e mobile-first** (breakpoints: 320px, 768px, 1024px, 1440px)
- [ ] **RNF-22** — Suporte a **modo escuro** com paleta adaptada
- [ ] **RNF-23** — Todas as ações principais devem ser executáveis em **no máximo 3 cliques**
- [ ] **RNF-24** — O app deve funcionar nos navegadores: **Chrome, Firefox, Safari e Edge** (últimas 2 versões)

---

## 7. Arquitetura Técnica

### 7.1 Stack Tecnológica

```
┌─────────────────────────────────────────────────┐
│                   FRONTEND                      │
│  Next.js 14 (App Router) + TypeScript           │
│  Tailwind CSS + Shadcn/UI + CVA                 │
│  Framer Motion (animações)                      │
│  Recharts (gráficos do relatório)               │
│  TanStack Query (cache e estado servidor)       │
│  React Hook Form + Zod (formulários)            │
├─────────────────────────────────────────────────┤
│                   BACKEND                       │
│  Next.js API Routes (serverless functions)      │
│  Prisma ORM + PostgreSQL                        │
│  Redis (cache de sessões ativas e leaderboard)  │
│  NextAuth.js (autenticação Google OAuth 2.0)    │
├─────────────────────────────────────────────────┤
│                INFRAESTRUTURA                   │
│  Vercel (hosting frontend + API Routes)         │
│  Supabase (PostgreSQL gerenciado + Storage)     │
│  Upstash (Redis serverless)                     │
│  Vercel Cron Jobs (geração do relatório semanal)│
├─────────────────────────────────────────────────┤
│               MONITORAMENTO                     │
│  Sentry (tracking de erros)                     │
│  Vercel Analytics (métricas de uso)             │
│  PostHog (analytics de produto)                 │
└─────────────────────────────────────────────────┘
```

### 7.2 Diagrama de Fluxo do Sistema

```
Usuário
  │
  ▼
[Login Google] ──► NextAuth.js ──► Criar/buscar user no PostgreSQL
  │
  ▼
[Configurar Sessão] ──► POST /api/sessions ──► Criar study_session
  │
  ▼
[Timer Rodando]
  │  ──── tick a cada segundo (useTimer hook + localStorage)
  │  ──── ao completar ciclo ──► PATCH /api/sessions/:id/cycle
  │
  ▼
[Fim da Sessão de Foco]
  │
  ├──► GET /api/missions/random ──► Exibir MissionModal
  │         │
  │         ├── Missão com vídeo ──► YouTube IFrame API ──► detectar conclusão
  │         └── Usuário marca "Concluído" ──► POST /api/missions/complete
  │                   │
  │                   └──► +pontos no usuário ──► checkAndAwardBadges()
  │
  ▼
[Fim do Ciclo Completo]
  │
  └──► Exibir CognitiveCheckIn ──► POST /api/cycles/:id/state
             │
             └──► Salvar cognitive_state + timestamp

[Todo domingo 23:59 — Cron Job]
  └──► POST /api/cron/weekly-report ──► Agregar dados ──► Salvar weekly_report
```

### 7.3 Modelo de Dados

```sql
-- Usuários
users (
  id              UUID PRIMARY KEY,
  google_id       VARCHAR UNIQUE NOT NULL,
  name            VARCHAR NOT NULL,
  email           VARCHAR UNIQUE NOT NULL,
  avatar_url      VARCHAR,
  health_points   INTEGER DEFAULT 0,
  onboarding_done BOOLEAN DEFAULT FALSE,
  default_config  JSONB,
  created_at      TIMESTAMP DEFAULT NOW()
)

-- Sessões de Estudo
study_sessions (
  id                    UUID PRIMARY KEY,
  user_id               UUID REFERENCES users(id),
  name                  VARCHAR,
  planned_duration_min  INTEGER NOT NULL,
  sessions_planned      INTEGER NOT NULL,
  sessions_completed    INTEGER DEFAULT 0,
  status                ENUM('active','completed','abandoned'),
  started_at            TIMESTAMP,
  ended_at              TIMESTAMP
)

-- Ciclos individuais dentro de uma sessão
study_cycles (
  id                 UUID PRIMARY KEY,
  session_id         UUID REFERENCES study_sessions(id),
  cycle_number       INTEGER NOT NULL,
  duration_min       INTEGER NOT NULL,
  cognitive_state    ENUM('focused','tired','stressed'),
  mission_id         UUID REFERENCES health_missions(id),
  mission_completed  BOOLEAN DEFAULT FALSE,
  started_at         TIMESTAMP,
  ended_at           TIMESTAMP
)

-- Catálogo de Missões de Saúde
health_missions (
  id          UUID PRIMARY KEY,
  category    ENUM('hydration','eye_rest','stretch','breathing','movement'),
  title       VARCHAR NOT NULL,
  description TEXT NOT NULL,
  video_url   VARCHAR,
  points      INTEGER DEFAULT 10
)

-- Registro de vídeos assistidos
video_watches (
  id           UUID PRIMARY KEY,
  user_id      UUID REFERENCES users(id),
  mission_id   UUID REFERENCES health_missions(id),
  session_id   UUID REFERENCES study_sessions(id),
  completed    BOOLEAN DEFAULT FALSE,
  points_given INTEGER DEFAULT 0,
  watched_at   TIMESTAMP DEFAULT NOW()
)

-- Catálogo de Medalhas
badges (
  id               UUID PRIMARY KEY,
  name             VARCHAR NOT NULL,
  description      TEXT,
  icon             VARCHAR,
  condition_type   VARCHAR NOT NULL,
  condition_value  INTEGER NOT NULL
)

-- Medalhas conquistadas
user_badges (
  id          UUID PRIMARY KEY,
  user_id     UUID REFERENCES users(id),
  badge_id    UUID REFERENCES badges(id),
  unlocked_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
)

-- Relatórios Semanais
weekly_reports (
  id                   UUID PRIMARY KEY,
  user_id              UUID REFERENCES users(id),
  week_start           DATE NOT NULL,
  week_end             DATE NOT NULL,
  total_hours          DECIMAL(5,2),
  missions_completed   INTEGER,
  missions_skipped     INTEGER,
  report_data          JSONB,
  insights             JSONB,
  generated_at         TIMESTAMP DEFAULT NOW()
)
```

---

## 8. Design System

### 8.1 Paleta de Cores

| Token | Hex | Uso Principal |
|---|---|---|
| `--blue-100` | `#B8D9F0` | Azul bebê claro — fundos de card, áreas de descanso visual |
| `--blue-300` | `#7FBDE0` | Azul bebê médio — bordas, divisores suaves |
| `--blue-500` | `#5BA4CF` | Azul médio — botões secundários, links ativos |
| `--blue-700` | `#2E7AB0` | Azul profundo — textos sobre fundo claro |
| `--lilac-100` | `#EAD5F5` | Lilás claríssimo — fundo de seções especiais |
| `--lilac-300` | `#C99EE8` | Lilás suave — badges, tags de categoria |
| `--lilac-500` | `#A96DD9` | Lilás médio — botões de estado, destaques |
| `--lilac-700` | `#7C3DAF` | Lilás escuro — títulos de seção, ênfase |
| `--pink-100` | `#FFD6E7` | Rosa bebê — estados positivos, cards de sucesso |
| `--pink-300` | `#FF9DC5` | Rosa médio — hover states, elementos interativos |
| `--pink-500` | `#FF69B4` | Rosa choque — CTAs principais, notificações, medalhas |
| `--pink-700` | `#C9356A` | Rosa escuro — alertas, erros, urgência |
| `--neutral-50` | `#FAFAFA` | Fundo geral da aplicação |
| `--neutral-100` | `#F0F0F5` | Fundo de cards e painéis |
| `--neutral-500` | `#6B6B80` | Texto secundário, placeholders |
| `--neutral-900` | `#1A1A2E` | Texto principal |

### 8.2 Tipografia

| Aplicação | Família | Peso | Tamanho |
|---|---|---|---|
| Título da página | Poppins | 700 (Bold) | 36–48px |
| Título de seção | Poppins | 600 (SemiBold) | 24–32px |
| Subtítulo / Card title | Inter | 600 | 18–22px |
| Corpo de texto | Inter | 400 (Regular) | 16px |
| Labels e captions | Inter | 500 (Medium) | 13–14px |
| Micro texto | Inter | 400 | 11–12px |
| Timer (número central) | Poppins | 700 | 64–96px |

### 8.3 Componentes de UI Principais

**TimerRing**
Anel circular SVG com stroke-dashoffset animado. Gradiente: azul bebê (100%) → lilás (50%) → rosa choque (10% restante). Tempo exibido no centro em Poppins Bold.

**MissionCard**
Card com fundo lilás claro, ícone da categoria em destaque, descrição em Inter Regular, botão "Concluir Missão" em rosa choque, e embed de vídeo YouTube colapsável.

**CognitiveCheckIn**
Três botões grandes (full-width no mobile) com emoji + texto + cor associada:
- 🎯 Focado → verde menta
- 😴 Cansado → amarelo âmbar
- 😰 Estressado → vermelho coral

**BadgeUnlockToast**
Notificação especial ao desbloquear medalha: animação "pop" com partículas nas cores da paleta, nome e ícone da medalha, duração de 4 segundos. Diferente do toast padrão — mais celebratória.

**HealthPointsBadge**
Chip animado com ícone de coração + número de pontos. Ao ganhar pontos, exibe "+X pts" em fonte grande flutuando para cima com fade out.

**WeeklyReportChart**
Gráfico de barras empilhadas (Recharts) com cores: azul bebê (Focado), amarelo (Cansado), rosa choque (Estressado). Um grupo de barras por dia da semana.

**SitTimeAlert**
Banner não-intrusivo no rodapé da tela do timer. Aparece com slide-up suave. Tem ícone, título curto, botão "Ver Vídeo" (rosa choque) e "Agora não" (texto cinza).

### 8.4 Espaçamento e Bordas

- **Grid:** 8px base (4 / 8 / 12 / 16 / 24 / 32 / 48 / 64px)
- **Border radius:** sm=8px, md=12px, lg=20px, xl=32px (componentes arredondados para transmitir suavidade)
- **Sombras:** `0 2px 12px rgba(169, 109, 217, 0.12)` (sombra lilás suave para cards)

### 8.5 Iconografia

- **Biblioteca:** Lucide React (traço limpo, 2px stroke, consistente)
- **Estilo das ilustrações:** Flat design com proporções arredondadas, personagem estudante neutro nas cores da paleta
- **Ícones de medalha:** SVG customizado por medalha, sempre com gradiente azul bebê → rosa choque

---

## 9. User Stories

### Épico 1 — Autenticação e Onboarding

> **US-01** — Como estudante novo, quero criar uma conta com meu Google em menos de 30 segundos, para não perder tempo com formulários de cadastro antes de começar a estudar.

> **US-02** — Como usuário retornante, quero fazer login com meu Google e ver meu progresso (pontos, medalhas, sessões anteriores) exatamente onde parei.

> **US-03** — Como novo usuário, quero passar por um onboarding rápido (máximo 3 telas) que me explique as funcionalidades principais, para que eu saiba como aproveitar o app desde o primeiro uso.

---

### Épico 2 — Configuração e Timer

> **US-04** — Como estudante, quero definir quantas sessões vou fazer hoje e por quanto tempo cada uma dura, para ter controle total sobre meu plano de estudo do dia.

> **US-05** — Como estudante, quero ver um timer visual grande e imersivo com progresso circular, para me manter focado sem precisar olhar para o relógio.

> **US-06** — Como estudante, quero receber um aviso sonoro e uma notificação do navegador quando minha sessão terminar, para não precisar monitorar o app constantemente.

> **US-07** — Como estudante que usa o app em dispositivo móvel, quero que o timer continue rodando mesmo com a tela bloqueada, para não precisar deixar a tela sempre acesa.

---

### Épico 3 — Missões de Saúde

> **US-08** — Como estudante, quando o timer terminar, quero receber uma missão de saúde aleatória e diferente das anteriores, para que cada pausa seja uma nova experiência e não caia na rotina.

> **US-09** — Como estudante, quando receber uma missão de alongamento, quero ver um vídeo curto de demonstração, para garantir que estou fazendo o exercício da forma correta e sem me machucar.

> **US-10** — Como estudante, quero marcar a missão como concluída e ver os pontos aparecendo na tela, para sentir que sou recompensado toda vez que cuido de mim.

> **US-11** — Como estudante apressado, quero poder ver quanto tempo tenho de pausa no modal da missão, para saber exatamente quanto tempo me resta antes de voltar a estudar.

---

### Épico 4 — Vídeos por Tempo Sentado

> **US-12** — Como estudante que fica horas sentado, quero que o sistema me avise automaticamente quando devo fazer um alongamento específico com base em quanto tempo estou sentado, para prevenir dores e lesões de forma proativa.

> **US-13** — Como estudante, quero ganhar pontos extras ao assistir os vídeos de saúde sugeridos até o fim, para ter incentivo real de interromper o estudo e cuidar do meu corpo.

> **US-14** — Como estudante que não quer ser interrompido, quero poder dispensar a sugestão de vídeo sem ser penalizado, para ter autonomia sobre minha sessão.

---

### Épico 5 — Diário de Carga Cognitiva

> **US-15** — Como estudante, ao fim de cada ciclo completo, quero registrar como estou me sentindo em 1 clique, para ter autoconhecimento sobre minha fadiga sem perder tempo.

> **US-16** — Como estudante, quero ver um gráfico com meus estados cognitivos dos últimos 7 dias, para identificar em quais dias e horários me sinto mais cansado ou estressado.

---

### Épico 6 — Gamificação

> **US-17** — Como estudante competitivo, quero acumular pontos de saúde e ver meu saldo crescer, para sentir que meu esforço de cuidar de mim é tangível e recompensado.

> **US-18** — Como estudante motivado por metas, quero desbloquear medalhas por conquistas de saúde específicas, para ter objetivos concretos além das horas de estudo.

> **US-19** — Como estudante, ao desbloquear uma medalha, quero ver uma animação especial celebratória, para que o momento de conquista seja marcante e memorável.

> **US-20** — Como estudante, quero ver na galeria de medalhas bloqueadas o quanto falta para cada uma, para planejar quais hábitos priorizar essa semana.

---

### Épico 7 — Relatório de Sobrevivência

> **US-21** — Como estudante, quero receber toda segunda-feira um relatório semanal com insights narrativos sobre meus hábitos de saúde e produtividade, para poder ajustar minha rotina com base em dados reais.

> **US-22** — Como estudante, quero exportar o relatório semanal em PDF, para compartilhar com meus pais, orientadores ou guardar como registro pessoal.

> **US-23** — Como estudante analítico, quero ver no relatório o dia em que fui mais produtivo e o dia em que mais pulei missões, para entender meus padrões comportamentais.

---

## 10. Lista de Tarefas em Sprints

---

### 🏃 SPRINT 1 — Fundação, Infraestrutura e Autenticação
> **Duração:** 2 semanas | **Meta:** Usuário consegue criar conta, logar e visualizar a tela principal do app

---

#### 1.1 — Setup do Projeto e Infraestrutura

- [ ] **1.1.1** — Inicializar repositório GitHub com estrutura de pastas organizada
  - *Escopo:* Criar repositório público/privado, configurar branch protection em `main` e `develop`, definir `.gitignore` para Node/Next.js
  - *Implementação:* Estrutura `/apps/web` (Next.js), `/apps/api` (opcional se separado), `/packages/shared` (tipos TypeScript compartilhados)

- [ ] **1.1.2** — Configurar projeto Next.js 14 com TypeScript, Tailwind CSS e App Router
  - *Escopo:* Setup completo do frontend com fontes Poppins e Inter via `next/font`, configuração de aliases de importação (`@/components`, `@/lib`)
  - *Implementação:* `npx create-next-app@14 --typescript --tailwind --app`, configurar `tailwind.config.ts` com tokens do Design System, instalar Shadcn/UI

- [ ] **1.1.3** — Configurar banco de dados PostgreSQL com Docker para desenvolvimento local
  - *Escopo:* Container PostgreSQL + Redis para dev local, variáveis de ambiente documentadas
  - *Implementação:* `docker-compose.yml` com serviços `db` (postgres:15) e `cache` (redis:7), arquivo `.env.local.example`

- [ ] **1.1.4** — Configurar Prisma ORM com schema inicial e migrations
  - *Escopo:* Instalar Prisma, criar schema com todas as tabelas definidas na Arquitetura Técnica (seção 7.3)
  - *Implementação:* `npx prisma init`, definir todos os modelos, rodar `prisma migrate dev --name init`, gerar seed com missões e medalhas iniciais

- [ ] **1.1.5** — Configurar ferramentas de qualidade de código (ESLint, Prettier, Husky)
  - *Escopo:* Padronização de código, lint automático antes de commits via pre-commit hook
  - *Implementação:* Instalar e configurar `eslint`, `prettier`, `husky`, `lint-staged`; criar `.eslintrc.json` e `.prettierrc`

---

#### 1.2 — Design System — Tokens e Componentes Base

- [ ] **1.2.1** — Implementar tokens de cor, tipografia e espaçamento no Tailwind Config
  - *Escopo:* Todos os tokens de cor (--blue-100 até --pink-700, neutrals) como custom colors; configurar fontes Poppins e Inter como `fontFamily`
  - *Implementação:* Editar `tailwind.config.ts` com `theme.extend.colors`, `theme.extend.fontFamily`, `theme.extend.borderRadius`, `theme.extend.boxShadow`

- [ ] **1.2.2** — Criar componentes atômicos: Button, Input, Card, Badge, Chip
  - *Escopo:* Variantes para Button (primary/secondary/ghost/danger), tamanhos (sm/md/lg), estados (hover, active, disabled, loading)
  - *Implementação:* Usar CVA (Class Variance Authority) para variantes, Shadcn/UI como base estrutural, customizar com tokens do DS

- [ ] **1.2.3** — Criar componente Toast (notificações de sistema)
  - *Escopo:* Toast para: sucesso, erro, informação e o especial de medalha (BadgeUnlockToast)
  - *Implementação:* Usar `react-hot-toast` ou `sonner`, customizar estilos para usar cores da paleta

- [ ] **1.2.4** — Criar layout principal do App (AppLayout com sidebar + header)
  - *Escopo:* Sidebar com navegação no desktop; bottom navigation no mobile; header com pontos de saúde e avatar
  - *Implementação:* Componente `AppLayout` como Server Component, `Sidebar` e `BottomNav` como Client Components com estado de collapse

---

#### 1.3 — Autenticação com Google

- [ ] **1.3.1** — Configurar projeto no Google Cloud Console e obter credenciais OAuth 2.0
  - *Escopo:* Criar projeto GCP, ativar Google+ API, gerar Client ID e Client Secret, configurar redirect URIs (localhost + domínio de produção)
  - *Implementação:* Documentar passo a passo no `README.md` do projeto para facilitar onboarding de novos devs

- [ ] **1.3.2** — Integrar NextAuth.js com Google Provider e Prisma Adapter
  - *Escopo:* Configurar `auth.ts` (NextAuth v5), definir callbacks `session` e `jwt` para incluir `userId` do banco no token
  - *Implementação:* Instalar `next-auth@5`, `@auth/prisma-adapter`; criar `app/api/auth/[...nextauth]/route.ts`

- [ ] **1.3.3** — Criar página de Login (`/login`)
  - *Escopo:* Tela de boas-vindas com logo FocusFlow, tagline, botão "Entrar com Google" (com ícone Google), ilustração temática com cores da paleta
  - *Implementação:* Server Component com `signIn()` action; redirect para `/app/dashboard` após login bem-sucedido

- [ ] **1.3.4** — Implementar middleware de proteção de rotas
  - *Escopo:* Todas as rotas `/app/*` exigem sessão ativa; usuários não autenticados são redirecionados para `/login`
  - *Implementação:* `middleware.ts` na raiz com `auth` do NextAuth, definir `matcher: ['/app/:path*']`

- [ ] **1.3.5** — Criar página de Perfil do Usuário (`/app/profile`)
  - *Escopo:* Exibir foto, nome, e-mail, saldo de pontos de saúde, número de medalhas, botão de logout, link para exportar dados (LGPD)
  - *Implementação:* Server Component que busca dados via `auth()` + query Prisma, seção de Preferências com formulário React Hook Form

---

### 🏃 SPRINT 2 — Temporizador de Foco
> **Duração:** 2 semanas | **Meta:** Usuário consegue configurar e executar ciclos de estudo completos com timer visual

---

#### 2.1 — Configuração de Sessão

- [ ] **2.1.1** — Criar formulário de configuração de sessão
  - *Escopo:* Campos: nome da sessão (opcional), duração do ciclo (select com opções 25/45/60/90 min + campo livre), número de sessões (slider ou input 1–12), preview do tempo total calculado
  - *Implementação:* React Hook Form + Zod para validação, componente `SessionSetupForm`; ao submeter, redirecionar para `/app/timer/:sessionId`

- [ ] **2.1.2** — Criar API de criação de sessão (`POST /api/sessions`)
  - *Escopo:* Recebe configuração da sessão, cria registro `study_session` com status `active`, retorna ID da sessão
  - *Implementação:* Route handler Next.js, validação Zod, autenticação via `auth()`, resposta com session object

- [ ] **2.1.3** — Implementar persistência das últimas configurações usadas
  - *Escopo:* Ao criar uma sessão, salvar configuração como `default_config` no usuário para pré-preencher o formulário na próxima vez
  - *Implementação:* `PATCH /api/users/config` ao criar sessão, campo `default_config` JSONB na tabela `users`

---

#### 2.2 — Lógica do Timer

- [ ] **2.2.1** — Implementar custom hook `useTimer` com toda a lógica do temporizador
  - *Escopo:* Estado: `timeLeft`, `isRunning`, `currentCycle`, `totalCycles`, `phase` (focus/break), `continuousSitMinutes`
  - *Implementação:* `useReducer` para estado complexo, `setInterval` com 1s de precisão, persistência no `localStorage` para sobreviver refreshes de página

- [ ] **2.2.2** — Criar componente `TimerRing` (anel SVG animado)
  - *Escopo:* SVG circular com `stroke-dashoffset` animado via CSS transition; gradiente usando `linearGradient` SVG (azul bebê → lilás → rosa choque); tempo exibido no centro em Poppins 700
  - *Implementação:* Calcular `circumference = 2 * π * r`, atualizar `strokeDashoffset` baseado em `timeLeft / totalTime`

- [ ] **2.2.3** — Criar componente `TimerControls` (Play / Pause / Stop)
  - *Escopo:* Três botões com ícones Lucide, estados visuais claros (play → botão verde, pause → botão amarelo, stop → botão vermelho), animação de transição entre estados
  - *Implementação:* Componente client-side, recebe callbacks do `useTimer`, acessível via teclado (Space para play/pause, Escape para stop)

- [ ] **2.2.4** — Criar componente `CycleProgressDots`
  - *Escopo:* Indicador visual do ciclo atual: dots coloridos (concluído = rosa choque preenchido, atual = lilás pulsando, pendente = cinza claro)
  - *Implementação:* Array mapeado com `n` dots baseado em `totalCycles`, animação CSS `pulse` no dot atual

- [ ] **2.2.5** — Implementar notificações sonoras e do navegador ao fim de cada sessão
  - *Escopo:* Som suave ao fim do foco (tom agradável, não alarme), som diferente ao fim da pausa; notificação push do browser com texto "Sessão de foco concluída! Hora da sua missão."
  - *Implementação:* Web Audio API para sons (AudioContext + OscillatorNode), `Notification API` com fallback; solicitar permissão no onboarding

- [ ] **2.2.6** — Sincronizar ciclos concluídos com o banco de dados
  - *Escopo:* Ao completar cada ciclo de foco, criar registro `study_cycle` com timestamps; ao encerrar sessão, marcar `study_session.status = 'completed'`
  - *Implementação:* `PATCH /api/sessions/:id/cycles`, debounce de 2s para evitar spam de requests em caso de instabilidade

---

#### 2.3 — Tela do Timer

- [ ] **2.3.1** — Compor tela principal `/app/timer/[sessionId]`
  - *Escopo:* Layout: header com nome da sessão + botão voltar, `TimerRing` central (large), `CycleProgressDots` abaixo, `TimerControls` na base; responsivo mobile-first
  - *Implementação:* Server Component para buscar dados da sessão + Client Component `TimerView` para toda a lógica interativa

- [ ] **2.3.2** — Implementar modo foco (full-screen sem distrações)
  - *Escopo:* Botão "Entrar em modo foco" oculta sidebar, header e bottom nav, deixando apenas o timer + controls; botão para sair do modo foco
  - *Implementação:* Estado `isFocusMode` no componente, CSS transitions para hide/show, `document.documentElement.requestFullscreen()` opcional

---

### 🏃 SPRINT 3 — Missões de Saúde e Vídeos
> **Duração:** 2 semanas | **Meta:** Missões funcionando nas pausas com vídeos e sistema de pontos

---

#### 3.1 — Catálogo de Missões

- [ ] **3.1.1** — Criar seed com 12+ missões de saúde no banco de dados
  - *Escopo:* Missões por categoria: Hidratação (3), Descanso Ocular (2), Alongamento (3 com vídeo), Respiração (2), Movimento (2); cada uma com título, descrição detalhada, URL do vídeo YouTube e pontos
  - *Implementação:* Arquivo `prisma/seed.ts`, rodar `prisma db seed` no CI; vídeos apontam para URLs públicas no YouTube (canais de fisioterapia/yoga)

- [ ] **3.1.2** — Criar API de missão aleatória (`GET /api/missions/random`)
  - *Escopo:* Retorna missão aleatória evitando repetir a última missão realizada pelo usuário naquela sessão; suporte a filtro por categoria
  - *Implementação:* Query com `ORDER BY RANDOM()`, receber `lastMissionId` como query param para exclusão, retornar objeto completo da missão

---

#### 3.2 — Fluxo de Pausa com Missão

- [ ] **3.2.1** — Criar componente `BreakMissionModal`
  - *Escopo:* Modal full-screen no mobile / dialog centrado no desktop; conteúdo: categoria da missão (chip colorido), título grande, descrição, botão "Ver Vídeo" (se houver), timer da pausa em countdown, botão "Missão Concluída" (CTA em rosa choque)
  - *Implementação:* Usar `Dialog` do Shadcn/UI com `open` controlado pelo estado do timer, buscar missão via API ao montar, animação slide-up

- [ ] **3.2.2** — Implementar player de vídeo YouTube com detecção de conclusão
  - *Escopo:* Embed responsivo do YouTube via IFrame API; detectar evento `onStateChange` com state `0` (ended) para marcar vídeo como assistido e liberar pontos extras
  - *Implementação:* Componente `YouTubePlayer` carregando `https://www.youtube.com/iframe_api` via script dinâmico, callback `onVideoEnd` prop

- [ ] **3.2.3** — Criar API de conclusão de missão (`POST /api/missions/complete`)
  - *Escopo:* Recebe `cycleId` e `missionId`, marca missão como concluída no ciclo, adiciona pontos ao saldo do usuário, verifica medalhas
  - *Implementação:* Transaction Prisma: update `study_cycles`, update `users.health_points`, chamar `checkAndAwardBadges(userId)`, retornar novo saldo e medalhas desbloqueadas

- [ ] **3.2.4** — Criar animação de pontos ganhos (`PointsPopup`)
  - *Escopo:* Ao concluir missão, texto "+10 pts" (ou "+20 pts" para vídeo) flutua do botão para o saldo do header, com fade out suave
  - *Implementação:* Framer Motion: `initial={{ y: 0, opacity: 1 }}`, `animate={{ y: -60, opacity: 0 }}`, duração de 1.2s

- [ ] **3.2.5** — Implementar timer de pausa no modal com barra de progresso
  - *Escopo:* Barra horizontal lilás que vai de 100% a 0% durante o tempo de pausa; texto "X segundos restantes" atualizado a cada segundo
  - *Implementação:* Timer secundário no componente do modal, `width` da barra controlado por CSS transition suave

---

#### 3.3 — Alertas de Vídeo por Tempo Sentado

- [ ] **3.3.1** — Implementar rastreador de tempo contínuo sentado no `useTimer`
  - *Escopo:* Contador `continuousSitMinutes` que incrementa a cada minuto de estudo ativo; reseta ao concluir uma missão de pausa; thresholds em 30, 60 e 90 minutos
  - *Implementação:* Estado `continuousSitMinutes` no reducer, incrementar em cada tick de 60s durante fase de foco, array de thresholds verificado a cada atualização

- [ ] **3.3.2** — Criar componente `SitTimeAlert` (banner não-intrusivo)
  - *Escopo:* Banner que aparece no rodapé da tela do timer via slide-up; ícone temático, título curto, botão "Ver Vídeo" (rosa choque), botão "Agora não" (texto); não interrompe o timer
  - *Implementação:* Componente posicionado `fixed bottom-0`, Framer Motion para animação de entrada/saída, estado `isDismissed` por threshold

- [ ] **3.3.3** — Mapear vídeos específicos para cada threshold de tempo sentado
  - *Escopo:* 30 min → missão "Relaxamento de Pulso e Mãos" (ID específico); 60 min → "Alongamento de Pescoço"; 90 min → "Levante-se e Estique as Pernas"
  - *Implementação:* Objeto de mapeamento `SIT_TIME_MISSIONS` com `{ 30: missionId1, 60: missionId2, 90: missionId3 }`, buscar missão específica em vez de aleatória

---

### 🏃 SPRINT 4 — Diário Cognitivo e Gamificação
> **Duração:** 2 semanas | **Meta:** Check-in cognitivo e sistema completo de medalhas e pontos

---

#### 4.1 — Diário de Carga Cognitiva

- [ ] **4.1.1** — Criar componente `CognitiveCheckIn`
  - *Escopo:* Tela/modal que aparece ao completar o ciclo (todas as sessões); três botões grandes full-width: 🎯 Focado (fundo azul bebê), 😴 Cansado (fundo amarelo âmbar), 😰 Estressado (fundo rosa claro); submit automático 500ms após seleção
  - *Implementação:* Aparece após fechar o `BreakMissionModal` da última sessão, estado `selectedState`, feedback visual de seleção antes de submeter

- [ ] **4.1.2** — Criar API de registro do estado cognitivo (`PATCH /api/cycles/:id/state`)
  - *Escopo:* Atualiza `cognitive_state` do ciclo, retorna ciclo atualizado; não requer body além do estado
  - *Implementação:* Validação Zod para enum `focused | tired | stressed`, autenticação verificando que o ciclo pertence ao usuário autenticado

- [ ] **4.1.3** — Criar tela de Diário Cognitivo (`/app/journal`)
  - *Escopo:* Timeline visual dos últimos 7 dias: por dia, listar ciclos com hora + estado (dot colorido + emoji); linha do tempo vertical com separadores por data
  - *Implementação:* Server Component com query Prisma agrupando `study_cycles` dos últimos 7 dias, renderizar com `date-fns` para formatação de datas em pt-BR

---

#### 4.2 — Sistema de Pontos

- [ ] **4.2.1** — Criar componente `HealthPointsCounter` no header
  - *Escopo:* Chip com ícone de coração + saldo atual; ao ganhar pontos, animar o número incrementando (+1 por frame até chegar no novo valor)
  - *Implementação:* Usar TanStack Query para buscar saldo atualizado após cada ação, `useCountUp` hook para animação de contador

- [ ] **4.2.2** — Criar API de consulta do saldo de pontos (`GET /api/users/points`)
  - *Escopo:* Retorna saldo atual e histórico de últimas 10 transações de pontos
  - *Implementação:* Query simples em `users.health_points`, log de transações em tabela `point_transactions` (user_id, amount, reason, created_at)

---

#### 4.3 — Sistema de Medalhas

- [ ] **4.3.1** — Criar seed com todas as 7 medalhas no banco de dados
  - *Escopo:* Iron Back, Hydration Hero, Eagle Eyes, Focus Streak, Zen Student, Iron Wrists, Marathon Runner — cada uma com `condition_type` e `condition_value` para a engine de verificação
  - *Implementação:* Adicionar ao `prisma/seed.ts`, criar SVGs simples para cada medalha em `/public/badges/`

- [ ] **4.3.2** — Implementar engine de verificação de medalhas (`checkAndAwardBadges`)
  - *Escopo:* Função chamada após toda ação pontuável; verifica se alguma condição foi atingida e insere em `user_badges` caso sim; não repete medalhas já conquistadas
  - *Implementação:* Função `async function checkAndAwardBadges(userId: string)` com queries agregadas por tipo (ex.: `COUNT(*)` de ciclos com `mission_category = 'stretch'` nos últimos 7 dias), usar `upsert` com `skipDuplicates`

- [ ] **4.3.3** — Criar componente `BadgeUnlockToast` (animação celebratória)
  - *Escopo:* Toast especial diferente dos demais: aparece centralizado com backdrop blur, ícone grande pulsando, nome da medalha em Poppins Bold, descrição curta, confete animado com cores da paleta, duração de 4 segundos
  - *Implementação:* Framer Motion com `AnimatePresence`, `canvas-confetti` para o efeito de confete, trigado quando a API retorna `newBadges` com itens

- [ ] **4.3.4** — Criar tela de Galeria de Medalhas (`/app/badges`)
  - *Escopo:* Grid 2 colunas (mobile) / 3 colunas (desktop) de todas as medalhas; desbloqueadas: coloridas + data + "Conquistada em X"; bloqueadas: grayscale + barra de progresso + "X/Y para desbloquear"
  - *Implementação:* Server Component com LEFT JOIN de `badges` e `user_badges`, calcular progresso atual para cada badge bloqueada com queries específicas por `condition_type`

---

### 🏃 SPRINT 5 — Relatório de Sobrevivência e Polimento Final
> **Duração:** 2 semanas | **Meta:** Relatório semanal gerado e exportável; onboarding; UX polida; deploy em produção

---

#### 5.1 — Relatório de Sobrevivência Semanal

- [ ] **5.1.1** — Criar engine de geração de dados do relatório
  - *Escopo:* Função que agrega da semana: total de horas (SUM de `duration_min`), missões concluídas vs puladas, distribuição de estados cognitivos por dia (GROUP BY dia + cognitive_state), dia mais produtivo, pontos ganhos, medalhas desbloqueadas
  - *Implementação:* Função `generateWeeklyReportData(userId, weekStart, weekEnd)` com queries Prisma, retornar objeto tipado `WeeklyReportData`

- [ ] **5.1.2** — Criar engine de geração de insights narrativos
  - *Escopo:* 5 templates de insight com condições: (1) baixa hidratação <30%, (2) cansaço em dia específico, (3) boa semana >80% missões, (4) queda de produtividade detectada, (5) semana recorde de horas
  - *Implementação:* Função `generateInsights(data: WeeklyReportData): string[]` com condicionais e strings em português, retornar array de 2–4 insights relevantes

- [ ] **5.1.3** — Criar tela do Relatório Semanal (`/app/report`)
  - *Escopo:* Layout: card de resumo numérico (horas, missões, pontos), `WeeklyReportChart` (barras empilhadas por dia), seção de insights com ícone de lâmpada, grid de medalhas da semana, botão "Exportar PDF"
  - *Implementação:* Server Component + Client Components para Recharts, buscar último relatório via `GET /api/reports/latest`

- [ ] **5.1.4** — Implementar exportação do relatório em PDF
  - *Escopo:* Ao clicar "Exportar PDF", gerar PDF com: logo FocusFlow, nome do usuário, período da semana, todos os dados e gráficos, insights, rodapé com data de geração
  - *Implementação:* `@react-pdf/renderer` para gerar PDF client-side, estilizar com cores da paleta, botão com loading state durante geração

- [ ] **5.1.5** — Configurar cron job de geração automática semanal
  - *Escopo:* Todo domingo às 23:59 (horário de Brasília), gerar e salvar relatório para todos os usuários com sessões na semana
  - *Implementação:* Vercel Cron Job no `vercel.json`: `"crons": [{"path": "/api/cron/weekly-report", "schedule": "59 23 * * 0"}]`, endpoint autenticado por `CRON_SECRET`

---

#### 5.2 — Onboarding e UX

- [ ] **5.2.1** — Criar fluxo de onboarding para novos usuários (3 telas)
  - *Escopo:* Tela 1: "Bem-vindo ao FocusFlow" + ilustração; Tela 2: Configurar preferências padrão (duração e número de sessões); Tela 3: Tour rápido com tooltips nas funcionalidades principais
  - *Implementação:* Componente `OnboardingFlow` com stepper, verificar `onboarding_done` no login, salvar `true` ao concluir via `PATCH /api/users/onboarding`

- [ ] **5.2.2** — Implementar solicitação de permissão de notificações durante onboarding
  - *Escopo:* Na Tela 2 do onboarding, explicar o benefício das notificações e solicitar permissão; salvar estado no perfil
  - *Implementação:* `Notification.requestPermission()`, salvar `notifications_enabled: boolean` no usuário, não pedir novamente se já foi respondido

- [ ] **5.2.3** — Implementar modo escuro
  - *Escopo:* Toggle dark/light no header; no modo escuro: fundos escuros azul-marinho (`#0D1B2A`), acentos em lilás e rosa choque mantidos
  - *Implementação:* `next-themes` com `ThemeProvider`, variantes `dark:` no Tailwind para cada componente, preferência salva no `localStorage`

- [ ] **5.2.4** — Criar página de Dashboard (`/app/dashboard`)
  - *Escopo:* Tela inicial após login: saudação com nome, card de "Iniciar Nova Sessão" (CTA principal em rosa choque), resumo da semana (horas estudadas, pontos ganhos, missões concluídas), últimas 3 medalhas desbloqueadas, atalho para o Diário Cognitivo
  - *Implementação:* Server Component com queries paralelas (Promise.all) para dados do usuário, sessões da semana e medalhas recentes

- [ ] **5.2.5** — Auditoria de responsividade (320px, 768px, 1024px, 1440px)
  - *Escopo:* Verificar todos os componentes nos quatro breakpoints; ajustar layouts, fontes e espaçamentos para mobile
  - *Implementação:* Testes manuais em DevTools + dispositivos reais; corrigir breakpoints com Tailwind responsive prefixes (`sm:`, `md:`, `lg:`)

- [ ] **5.2.6** — Auditoria de acessibilidade (WCAG 2.1 AA)
  - *Escopo:* Checar: contraste de cores, foco visível em todos os elementos interativos, labels ARIA nos ícones sem texto, navegação por teclado no timer e modais
  - *Implementação:* Rodar Lighthouse + axe DevTools, corrigir todos os issues de impacto crítico e sério, adicionar `aria-label` onde faltam

---

#### 5.3 — Performance e Deploy

- [ ] **5.3.1** — Configurar ambiente de staging no Vercel
  - *Escopo:* Branch `develop` → deploy automático em `staging.focusflow.app`; branch `main` → produção `focusflow.app`; variáveis de ambiente separadas por ambiente
  - *Implementação:* Configurar no dashboard Vercel, adicionar `vercel.json` com rewrites necessários

- [ ] **5.3.2** — Implementar caching com TanStack Query
  - *Escopo:* Cache com `staleTime` configurado: dados de usuário (5 min), sessões recentes (30s), missões (1 hora), medalhas (5 min); invalidar cache após mutações
  - *Implementação:* Configurar `QueryClient` em `providers.tsx`, adicionar `queryKey` consistentes, usar `useMutation` com `onSuccess: () => queryClient.invalidateQueries([...])`

- [ ] **5.3.3** — Configurar Sentry para monitoramento de erros
  - *Escopo:* Capturar erros de frontend (componentes + API calls) e backend (API Routes), configurar alertas por e-mail para erros de nível `error` e `fatal`
  - *Implementação:* `npx @sentry/wizard@latest -i nextjs`, configurar `sentry.client.config.ts`, `sentry.server.config.ts`, adicionar `SENTRY_DSN` nas variáveis de ambiente

- [ ] **5.3.4** — Escrever testes E2E do fluxo crítico com Playwright
  - *Escopo:* Testar o fluxo completo: Login → Configurar sessão → Iniciar timer → Completar ciclo → Concluir missão → Check-in cognitivo → Ver pontos atualizados
  - *Implementação:* Criar `/e2e/main-flow.spec.ts`, configurar `playwright.config.ts`, rodar em CI via GitHub Actions em PRs para `main`

- [ ] **5.3.5** — Deploy em produção e checklist de lançamento
  - *Escopo:* Verificar todas as variáveis de ambiente em produção, testar fluxo completo no ambiente de produção, configurar domínio customizado, verificar SSL
  - *Implementação:* Checklist manual: [ ] env vars OK [ ] Google OAuth redirect URI atualizado [ ] Cron jobs ativos [ ] Sentry capturando [ ] Analytics configurado [ ] Política de privacidade publicada

---

## Apêndice

### Referências Técnicas

- [Técnica Pomodoro Original](https://francescocirillo.com/pages/pomodoro-technique)
- [Regra 20-20-20 para saúde ocular — American Academy of Ophthalmology](https://www.aao.org)
- [Prevenção de LER — Ministério da Saúde](https://www.saude.gov.br)
- [Diretrizes WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [LGPD — Lei nº 13.709/2018](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)
- [Next.js 14 Docs](https://nextjs.org/docs)
- [Prisma ORM Docs](https://www.prisma.io/docs)
- [NextAuth.js v5 Docs](https://authjs.dev)

### Glossário

| Termo | Definição |
|---|---|
| Ciclo | Conjunto de N sessões de foco + pausas configurado pelo usuário |
| Sessão | Um bloco individual de tempo de foco (ex.: 45 min) |
| Pausa | Intervalo entre sessões onde a missão de saúde é exibida |
| Missão de Saúde | Atividade física rápida (hidratação, alongamento, etc.) exibida nas pausas |
| Carga Cognitiva | Nível subjetivo de esforço mental, registrado via check-in ao fim do ciclo |
| Tempo Sentado | Tempo acumulado de estudo ativo sem pausa com missão concluída |
| Pontos de Saúde | Moeda de gamificação concedida por completar missões e assistir vídeos |
| Medalha | Conquista desbloqueada ao atingir metas de saúde acumuladas |

---

*FocusFlow — PRD v1.0 | Documento vivo. Atualizar ao final de cada Sprint Review.*
*Próxima revisão: após Sprint 1 (semana 2)*
