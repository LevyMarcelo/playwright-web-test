# Automação de Testes Web E2E da SauceDemo

## 1. Visão geral do projeto

Este repositório apresenta um projeto prático de Engenharia de Qualidade de Software, utilizando a aplicação SauceDemo como objeto de estudo para demonstrar estratégia de testes, arquitetura de automação, automação de testes, integração contínua e IA aplicada à qualidade.

Mais do que implementar testes automatizados, o projeto busca demonstrar como transformar o entendimento de um produto em uma estratégia de testes e em uma solução de automação confiável e sustentável.

A abordagem contempla diferentes dimensões da Engenharia de Qualidade:

- **Discovery e exploração:** compreender a aplicação, identificar regras de negócio, comportamentos, riscos e ambiguidades.
- **Estratégia e planejamento:** definir escopo, prioridades e cenários de teste.
- **Arquitetura de automação:** estabelecer padrões, organização e decisões técnicas que favoreçam a confiabilidade e a manutenibilidade.
- **Automação e validação:** implementar e validar testes utilizando Playwright e TypeScript.
- **Integração contínua:** integrar a execução dos testes ao pipeline de CI/CD, com relatórios e evidências.
- **IA aplicada à qualidade:** explorar agentes especializados para apoiar a análise de requisitos, identificação de riscos, elaboração e revisão de cenários, avaliação da arquitetura, implementação e revisão da automação, além da investigação de falhas, sempre com revisão e validação humana.

## 2. Objetivos

Construir uma solução de automação de testes web E2E, priorizando:

- Cobertura orientada a riscos.
- Estratégia de testes baseada no entendimento do produto.
- Arquitetura simples, confiável e de fácil manutenção.
- Isolamento entre testes.
- Evidências e rastreabilidade dos resultados.
- Integração contínua.
- Aplicação de IA como apoio às atividades de Engenharia de Qualidade.

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

A estratégia de testes é orientada pelo entendimento da aplicação, pela identificação de regras de negócio e pela avaliação de riscos.

O processo contempla:

- Exploração funcional da aplicação e identificação de comportamentos.
- Análise de regras de negócio e requisitos.
- Identificação de riscos e priorização de cenários de teste.
- Definição de cenários positivos, negativos e de exceção.
- Avaliação da viabilidade de automação.

Na implementação, são adotadas práticas que favorecem a confiabilidade e a manutenibilidade:

- Utilização de `data-test` como locator preferencial.
- Encapsulamento de locators e interações nos Page Objects.
- Assertions nos próprios arquivos de teste.
- Utilização de fixtures nativas do Playwright Test.
- Contextos de navegador independentes para cada teste.

## 6. Escopo de testes

O escopo funcional contempla os seguintes domínios:

| Domínio              | Situação                            |
| -------------------- | ----------------------------------- |
| Autenticação         | 11 testes implementados e aprovados |
| Catálogo de Produtos | Em Discovery                        |
| Carrinho             | Previsto                            |
| Checkout             | Previsto                            |

A automação de autenticação contempla login, validações de credenciais, usuário bloqueado, logout e tentativas de acesso ao catálogo sem autenticação.

Os demais domínios serão incorporados progressivamente, conforme a evolução da estratégia e a aprovação dos respectivos cenários de teste.

## 7. Cenários de teste

Os cenários de teste de autenticação estão documentados em [Cenários de Teste - Autenticação](docs/authentication/test-scenarios-authentication.md).

A documentação apresenta os objetivos, pré-condições, dados, passos e resultados esperados de cada cenário.

Novos documentos serão incorporados conforme a evolução dos domínios funcionais.

## 8. Arquitetura do projeto

A automação utiliza **Page Object Model (POM)**, com os Page Objects `LoginPage` e `InventoryPage`.

O Playwright Test fornece fixtures nativas para gerenciar os recursos de execução. Cada teste utiliza um contexto de navegador independente, favorecendo o isolamento entre execuções.

As verificações dos resultados permanecem nos arquivos de teste, enquanto os Page Objects encapsulam os locators e as interações com a aplicação.

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

## 11. Integração Contínua (CI)

O projeto utiliza GitHub Actions para executar automaticamente a validação de tipos e os testes automatizados em pushes para a branch `main` e em Pull Requests direcionados a essa branch.

O workflow executa em ambiente Ubuntu com Node.js 26 LTS e contempla:

- Instalação reproduzível das dependências com `npm ci`.
- Instalação do Chromium e suas dependências.
- Verificação de tipos com `npm run typecheck`.
- Execução dos testes automatizados com `npm test`.

O pipeline é considerado aprovado quando a verificação de tipos e todos os testes automatizados são concluídos com sucesso.

O Playwright HTML Report (`report/`) e os resultados e evidências (`test-results/`) são disponibilizados como artefatos da execução, com retenção de 7 dias, inclusive quando ocorrem falhas nas etapas de validação.

## 12. IA aplicada à qualidade de software

A Inteligência Artificial é utilizada como apoio às atividades de Engenharia de Qualidade, de forma transversal às etapas de Discovery, estratégia, automação e análise dos resultados.

### Ambiente e organização

O **ChatGPT Desktop** é utilizado como ambiente principal de trabalho com IA. Por meio de **Projetos**, organizo o contexto, as instruções e os materiais de referência, estruturando as atividades de acordo com suas responsabilidades.

Nesse ambiente, são utilizados dois agentes especializados, com responsabilidades distintas e complementares:

- **QA Analyst:** agente especializado em análise e estratégia de testes.
- **QA Automation:** agente especializado em automação de Testes.

Os detalhes das responsabilidades estão documentados em:

- [QA Analyst](agents/qa-analyst.md)
- [QA Automation](agents/qa-automation.md)

### Implementação técnica

O **Codex** complementa esse ecossistema como parceiro de implementação técnica, auxiliando na criação e manutenção de código, configuração do projeto, execução de testes e investigação de falhas.

### Colaboração e governança

Os agentes e as ferramentas de IA atuam como apoio à Engenharia de Qualidade, com responsabilidades definidas e atuação complementar.

As recomendações e implementações passam por revisão humana. As decisões técnicas e a validação final das evidências permanecem sob responsabilidade humana.

A utilização desses recursos evolui conforme as necessidades e os aprendizados obtidos durante o desenvolvimento do projeto.
