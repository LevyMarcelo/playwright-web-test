# Automação de Testes Web E2E da SauceDemo

## 1. Visão geral do projeto

Este repositório apresenta um projeto prático de Engenharia de Qualidade, desenvolvido para demonstrar estratégias, arquitetura e automação de testes web com Playwright e TypeScript na aplicação SauceDemo.

## 2. Objetivos

Construir uma solução de automação de testes web, com foco na validação de fluxos E2E, priorizando cobertura orientada a riscos, confiabilidade, isolamento entre testes e facilidade de manutenção.

## 3. Aplicação sob teste

[SauceDemo](https://www.saucedemo.com/), aplicação de demonstração de comércio eletrônico.

## 4. Tecnologias utilizadas

- **Node.js:** ambiente de execução.
- **TypeScript:** linguagem utilizada no desenvolvimento.
- **Playwright:** recursos de automação e interação com o navegador.
- **Playwright Test:** runner, fixtures, execução e gerenciamento dos testes.
- **Chromium:** navegador utilizado na execução.
- **Playwright HTML Report:** geração de relatórios.

## 5. Estratégia de testes

A estratégia prioriza cenários funcionais, isolamento entre testes, utilização de `data-test` como locator preferencial e assertions nos próprios arquivos de teste.

Os Page Objects encapsulam os locators e as interações com a aplicação, enquanto as verificações dos resultados permanecem nos arquivos de teste.

## 6. Escopo de testes

O escopo automatizado atual contempla a funcionalidade de autenticação, com 11 testes implementados, abrangendo login, validações, usuário bloqueado, logout e acesso ao catálogo sem autenticação.

As funcionalidades Catálogo de Produtos, Carrinho e Checkout estão previstas para as próximas etapas do projeto.

## 7. Cenários de teste

Os cenários de teste de autenticação estão documentados em [Cenários de Teste - Autenticação](docs/authentication/test-scenarios-authentication.md).

A documentação apresenta os objetivos, pré-condições, dados, passos e resultados esperados de cada cenário.

## 8. Arquitetura do projeto

A automação utiliza Page Object Model com os Page Objects `LoginPage` e `InventoryPage`.

O Playwright Test fornece fixtures nativas para gerenciar os recursos de execução. Cada teste utiliza um contexto de navegador independente, favorecendo o isolamento entre execuções.

```text
playwright-web-test/
│
├── agents/
│   ├── qa-analyst.md
│   └── qa-automation.md
│
├── docs/
│   └── authentication/
│       └── test-scenarios-authentication.md
│
├── pages/
│   ├── login-page.ts
│   └── inventory-page.ts
│
├── tests/
│   └── authentication/
│       ├── login.spec.ts
│       └── session.spec.ts
│
├── .gitignore
├── AGENTS.md
├── README.md
├── package.json
├── package-lock.json
├── playwright.config.ts
└── tsconfig.json
```

## 9. Instalação e configuração

**Pré-requisitos:**

- Node.js 26 LTS
- npm
- Git

**Instalação:**

```bash
# Instalar as dependências
npm ci

# Instalar o navegador Chromium
npx playwright install chromium
```

## 10. Execução

Os testes podem ser executados por meio da CLI do Playwright.

**Execução dos testes**

```bash
# Executar todos os testes
npx playwright test

# Executar com navegador visível
npx playwright test --headed

# Executar somente os testes de Authentication
npx playwright test --grep "@Authentication"

# Executar somente os testes positivos
npx playwright test --grep "@Positive"

# Executar somente os testes negativos
npx playwright test --grep "@Negative"

# Executar em modo de depuração
npx playwright test --debug
```

**Relatório de execução**

```bash
# Abrir o relatório HTML
npx playwright show-report report
```

**Verificação estática**

```bash
# Verificar os tipos TypeScript
npm run typecheck
```

## 11. IA aplicada à qualidade de software

A Inteligência Artificial é utilizada como apoio às atividades de Engenharia de Qualidade, desde a análise de requisitos até a implementação e revisão da automação.

### Ambiente e organização

O **ChatGPT Desktop** é utilizado como ambiente principal de trabalho com IA. Por meio de **Projetos**, organizo o contexto, as instruções e os materiais de referência, estruturando as atividades de acordo com suas responsabilidades.

Nesse ambiente, são utilizados dois agentes especializados, com responsabilidades distintas e complementares:

- **QA Analyst:** agente especializado em análise e estratégia de testes.
- **QA Automation:** agente especializado em Automação de Testes.

Os detalhes das responsabilidades estão documentados em:

- [QA Analyst](agents/qa-analyst.md)
- [QA Automation](agents/qa-automation.md)

### Implementação técnica

O **Codex** complementa esse ecossistema como parceiro de implementação técnica, auxiliando na criação e manutenção de código, configuração do projeto, execução de testes e investigação de falhas.

### Colaboração e governança

Os agentes e as ferramentas de IA atuam como apoio à Engenharia de Qualidade, com responsabilidades definidas e atuação complementar.

As recomendações e implementações passam por revisão humana. As decisões técnicas e a validação final das evidências permanecem sob responsabilidade humana.

A utilização desses recursos evolui conforme as necessidades e os aprendizados obtidos durante o desenvolvimento do projeto.