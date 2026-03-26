# Agente Frontend — FocusFlow

> Responsável por toda a interface do usuário, componentes visuais, design system e experiência do usuário.

---

## Escopo de Atuação

- Criação e manutenção de **páginas** (App Router do Next.js 14)
- Implementação do **Design System** (tokens de cor, tipografia, espaçamento)
- Desenvolvimento de **componentes UI** (atômicos e compostos)
- **Animações** com Framer Motion
- **Responsividade** mobile-first (320px, 768px, 1024px, 1440px)
- **Acessibilidade** WCAG 2.1 AA
- **Modo escuro**

---

## Tecnologias Sob Responsabilidade

| Tecnologia | Uso |
|---|---|
| Next.js 14 (App Router) | Estrutura de páginas e rotas |
| TypeScript | Tipagem estrita |
| Tailwind CSS | Estilização utilitária |
| Shadcn/UI | Componentes base (Dialog, Button, Input...) |
| CVA (Class Variance Authority) | Variantes de componentes |
| Framer Motion | Animações e transições |
| Recharts | Gráficos do relatório semanal |
| React Hook Form + Zod | Formulários com validação |
| TanStack Query | Cache e estado do servidor |
| Lucide React | Ícones |
| next/font | Fontes Poppins e Inter |

---

## Arquivos e Diretórios

```
apps/web/
├── app/
│   ├── (auth)/login/page.tsx        # Página de login
│   ├── app/dashboard/page.tsx       # Dashboard principal
│   ├── app/timer/[sessionId]/page.tsx # Tela do timer
│   ├── app/journal/page.tsx         # Diário cognitivo
│   ├── app/badges/page.tsx          # Galeria de medalhas
│   ├── app/report/page.tsx          # Relatório semanal
│   ├── app/profile/page.tsx         # Perfil do usuário
│   └── layout.tsx                   # Layout raiz
├── components/
│   ├── ui/                          # Button, Card, Badge, Input, Chip, Toast
│   ├── timer/                       # TimerRing, TimerControls, CycleProgressDots
│   ├── missions/                    # BreakMissionModal, YouTubePlayer
│   ├── cognitive/                   # CognitiveCheckIn
│   ├── gamification/                # HealthPointsCounter, BadgeUnlockToast, PointsPopup
│   ├── report/                      # WeeklyReportChart
│   └── layout/                      # AppLayout, Sidebar, BottomNav
├── hooks/
│   └── useTimer.ts                  # Hook do temporizador
└── public/
    └── badges/                      # SVGs das medalhas
```

---

## Paleta de Cores (referência rápida)

| Grupo | Claro | Médio | CTA/Escuro |
|---|---|---|---|
| Azul | #B8D9F0 | #5BA4CF | #2E7AB0 |
| Lilás | #EAD5F5 | #A96DD9 | #7C3DAF |
| Rosa | #FFD6E7 | #FF69B4 (CTA) | #C9356A |
| Neutro | #FAFAFA (fundo) | #6B6B80 (sec) | #1A1A2E (texto) |

---

## Componentes Críticos

### TimerRing
- Anel SVG circular com `stroke-dashoffset` animado
- Gradiente: azul bebê (100%) → lilás (50%) → rosa choque (10% restante)
- Poppins Bold 64–96px no centro

### BreakMissionModal
- Full-screen no mobile, dialog no desktop
- Chip de categoria, título, descrição, embed YouTube, timer de pausa
- CTA "Missão Concluída" em rosa choque (#FF69B4)

### CognitiveCheckIn
- 3 botões full-width com emoji + texto:
  - 🎯 Focado → azul bebê
  - 😴 Cansado → amarelo âmbar
  - 😰 Estressado → rosa claro
- Submit automático 500ms após seleção

### BadgeUnlockToast
- Backdrop blur, ícone pulsante, confete com cores da paleta
- Duração: 4 segundos
- Diferente do toast padrão — é celebratório

---

## Regras e Convenções

1. **Server Components por padrão** — usar `'use client'` apenas quando houver interatividade
2. **Aliases de importação:** `@/components`, `@/hooks`, `@/lib`
3. **CVA para variantes:** nunca usar condicionais de className manuais em componentes com múltiplas variantes
4. **Todos os textos da UI em pt-BR**
5. **Animações:** respeitar `prefers-reduced-motion` — oferecer fallback estático
6. **Contraste mínimo:** 4.5:1 para texto, 3:1 para UI
7. **Todos os elementos interativos:** acessíveis via teclado (Tab, Enter, Espaço)
8. **Grid de espaçamento:** base 8px (4/8/12/16/24/32/48/64px)
9. **Border radius:** sm=8px, md=12px, lg=20px, xl=32px
10. **Sombra padrão:** `0 2px 12px rgba(169, 109, 217, 0.12)`

---

## Dependências de Outros Agentes

- **Backend:** APIs para dados (sessões, missões, pontos, medalhas, relatórios)
- **Banco de Dados:** Tipos gerados pelo Prisma para tipagem
