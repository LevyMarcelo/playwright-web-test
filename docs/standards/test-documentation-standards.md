# Padrão de Documentação de Casos de Teste

## 1. Identificação dos casos de teste

Os casos de teste utilizam identificadores no formato `CT-XXX`, com numeração sequencial entre as funcionalidades.

Os identificadores devem ser únicos e preservados durante revisões e evoluções da documentação.

Identificadores de casos de teste descontinuados não devem ser reutilizados.

## 2. Nomenclatura

Os títulos dos casos de teste devem:

- Começar com verbo no infinitivo.
- Descrever a ação ou o comportamento que será validado.
- Identificar o objeto ou contexto quando necessário.
- Ser objetivos e evitar descrições genéricas.

## 3. Classificação

Cada caso de teste deve possuir duas classificações:

| Classificação | Descrição |
|---|---|
| Funcionalidade (`@Authentication`, `@ProductCatalog` etc.) | Identifica a funcionalidade à qual o caso de teste pertence. |
| Tipo (`@Positive`, `@Negative`) | Identifica a natureza do comportamento avaliado. |

Cada caso de teste utiliza uma tag de funcionalidade e uma tag de tipo.

Na automação, essas classificações são representadas pela propriedade nativa `tag` do Playwright Test.

Outras classificações poderão ser incorporadas conforme as necessidades de organização e execução dos testes, sem substituir as classificações funcionais e de tipo.

## 4. Estrutura dos casos de teste

Cada caso de teste deve apresentar:

- **Identificação e título:** código e descrição do caso de teste.
- **Classificação:** funcionalidade e tipo.
- **Pré-condições:** estados específicos necessários para iniciar a execução, quando aplicáveis.
- **Dados:** informações utilizadas no caso de teste, quando aplicáveis.
- **Passos:** sequência de ações necessárias para executar o teste.
- **Resultado esperado:** comportamento que deve ser observado e validado.

O campo Objetivo não deve ser utilizado separadamente, pois a intenção do caso de teste deve estar representada pelo título.

## 5. Convenções de documentação

### Pré-condições

Documentar somente condições específicas necessárias para a execução do caso de teste.

Não repetir condições genéricas que já são garantidas pelo contexto padrão de execução.

Uma pré-condição representa um estado que deve existir antes do início dos passos e não deve ser confundida com uma ação executada durante o caso de teste.

### Dados de teste

Identificar os dados necessários para a execução do caso de teste, apresentando seus valores concretos sempre que aplicável.

Os dados devem ser descritos de forma clara e suficiente para permitir a execução manual ou automatizada do caso de teste.

Dados reutilizáveis podem ser centralizados em arquivos ou estruturas específicas para consumo pela automação, evitando duplicação na implementação.

Dados sintéticos devem ser identificados separadamente dos dados disponibilizados pela aplicação.

Informações sensíveis, como senhas reais, tokens e dados pessoais, não devem ser expostas na documentação.

### Passos

Descrever as ações funcionais necessárias para executar o caso de teste.

Os passos devem ser claros, objetivos e suficientemente detalhados para permitir a execução manual ou automatizada.

Não documentar detalhes internos da implementação da automação, como métodos de Page Objects, locators ou chamadas do Playwright.

### Resultado esperado

Descrever os comportamentos que devem ser observados após a execução dos passos.

Os resultados devem ser objetivos, verificáveis e relacionados à finalidade do caso de teste.

Quando aplicável, especificar mensagens, estados, redirecionamentos, elementos visíveis e alterações de dados.

## 6. Independência e rastreabilidade

Cada caso de teste deve possuir identificação própria e ser executável independentemente dos demais.

A execução de um caso de teste não deve depender da execução prévia de outro caso de teste.

Quando um caso de teste exigir determinado estado inicial, esse estado deve ser preparado por meio de suas próprias pré-condições ou dos passos definidos.

A documentação deve manter correspondência entre os identificadores dos casos de teste e os respectivos testes automatizados.
