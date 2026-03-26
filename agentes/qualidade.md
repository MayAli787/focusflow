# Agente Qualidade e Testes — FocusFlow

> Responsável por testes automatizados, acessibilidade, performance e padrões de código.

---

## Escopo de Atuação

- **Testes E2E** com Playwright
- **Linting e formatação** (ESLint + Prettier)
- **Auditoria de acessibilidade** (WCAG 2.1 AA)
- **Auditoria de performance** (Core Web Vitals)
- **Auditoria de responsividade** (4 breakpoints)
- **Pre-commit hooks** com Husky + lint-staged

---

## Tecnologias Sob Responsabilidade

| Tecnologia | Uso |
|---|---|
| Playwright | Testes E2E |
| ESLint | Análise estática de código |
| Prettier | Formatação de código |
| Husky | Git hooks (pre-commit) |
| lint-staged | Lint apenas nos arquivos modificados |
| Lighthouse | Auditoria de performance |
| axe DevTools | Auditoria de acessibilidade |

---

## Arquivos e Diretórios

```
e2e/
├── main-flow.spec.ts          # Fluxo crítico completo
├── auth.spec.ts               # Login/logout
├── timer.spec.ts              # Timer + pausas
└── fixtures/                  # Dados de teste

playwright.config.ts           # Configuração do Playwright
.eslintrc.json                 # Regras ESLint
.prettierrc                    # Regras Prettier
.husky/
└── pre-commit                 # Hook pre-commit
```

---

## Teste E2E do Fluxo Crítico

O teste principal (`main-flow.spec.ts`) deve cobrir o fluxo completo:

```
1. Login com Google
2. Configurar sessão (duração + nº de sessões)
3. Iniciar timer
4. Completar ciclo de foco
5. Receber missão de saúde
6. Concluir missão → verificar pontos atualizados
7. Check-in cognitivo
8. Verificar pontos no header
```

---

## Checklists de Auditoria

### Acessibilidade (WCAG 2.1 AA)

- [ ] Contraste mínimo 4.5:1 para textos
- [ ] Contraste mínimo 3:1 para elementos de UI
- [ ] Foco visível em todos os elementos interativos
- [ ] Navegação completa via teclado (Tab, Enter, Espaço, Escape)
- [ ] `aria-label` em ícones sem texto
- [ ] `aria-live` para atualizações dinâmicas (pontos, timer)
- [ ] Suporte a `prefers-reduced-motion`
- [ ] Leitores de tela conseguem navegar todas as páginas
- [ ] Modais prendem o foco (focus trap)
- [ ] Skip links para conteúdo principal

### Performance (Core Web Vitals)

- [ ] LCP < 2.5s em 4G
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] Animações a 60fps em hardware médio
- [ ] Timer com precisão ±1 segundo
- [ ] Notificações com atraso máximo de 500ms

### Responsividade

| Breakpoint | Dispositivo | Verificação |
|---|---|---|
| 320px | Mobile pequeno | Layout não quebra, texto legível |
| 768px | Tablet | Transição sidebar → bottom nav |
| 1024px | Desktop pequeno | Layout desktop aparece |
| 1440px | Desktop grande | Conteúdo centralizado, sem esticar |

### Navegadores

- [ ] Chrome (últimas 2 versões)
- [ ] Firefox (últimas 2 versões)
- [ ] Safari (últimas 2 versões)
- [ ] Edge (últimas 2 versões)

---

## Padrões de Código

### ESLint
- Extend: `next/core-web-vitals`, `typescript-eslint/recommended`
- Sem `any` implícito
- Imports ordenados automaticamente
- Sem variáveis não utilizadas

### Prettier
```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "printWidth": 100
}
```

### Pre-commit Hook
```bash
# Executar antes de cada commit:
lint-staged → ESLint --fix + Prettier --write nos arquivos staged
```

---

## Comandos

```bash
# Testes
npx playwright test                    # Rodar todos os testes E2E
npx playwright test --ui               # Modo visual do Playwright
npx playwright test e2e/main-flow      # Apenas o fluxo crítico

# Qualidade de código
npm run lint                           # ESLint
npm run lint -- --fix                  # Auto-fix
npm run format                         # Prettier

# Auditorias
npx lighthouse <url> --view            # Performance
# axe DevTools: extensão Chrome/Firefox
```

---

## CI/CD (GitHub Actions)

Executar em PRs para `main`:
1. `npm run lint` — falha se tem erros
2. `npx playwright test` — testes E2E
3. Report de resultados no PR

---

## Dependências de Outros Agentes

- **Frontend:** Componentes e páginas a testar
- **Backend:** APIs que os testes E2E consomem
- **Banco de Dados:** Seed necessário para environment de teste
