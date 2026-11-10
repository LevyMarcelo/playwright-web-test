# Cenários de Teste - Autenticação

## 1. Objetivo

Documentar os cenários de teste da funcionalidade de autenticação da aplicação SauceDemo, definindo as condições de execução, os dados utilizados, os passos e os resultados esperados.

O documento orienta a execução manual e automatizada dos testes e mantém a identificação dos cenários para rastreabilidade.

## 2. Escopo

A funcionalidade de autenticação contempla:

- Autenticação com credenciais válidas e inválidas.
- Validação de campos obrigatórios.
- Restrição de acesso para usuário bloqueado.
- Encerramento da sessão (logout).
- Controle de acesso ao Catálogo de Produtos sem autenticação.
- Controle de acesso ao Catálogo de Produtos após logout.

São contemplados 11 cenários executáveis, identificados sequencialmente de CT-001 a CT-011.

## 3. Convenções

### Identificação

Os cenários utilizam identificadores globais no formato `CT-XXX`.

Autenticação ocupa os identificadores CT-001 a CT-011 nesta versão do projeto.

### Classificação

Os cenários são classificados por funcionalidade e tipo:

| Classificação     | Descrição                         |
| ----------------- | --------------------------------- |
| `@Authentication` | Identifica a funcionalidade       |
| `@Positive`       | Cenário de comportamento positivo |
| `@Negative`       | Cenário de comportamento negativo |

Na automação, as classificações são declaradas pela propriedade nativa `tag` do Playwright Test.

Cada cenário utiliza duas tags: `@Authentication` e uma classificação de tipo.

### Estrutura dos cenários

Cada cenário apresenta:

- **Objetivo:** finalidade do teste.
- **Pré-condição:** estado necessário para iniciar a execução.
- **Dados:** informações utilizadas no cenário.
- **Passos:** sequência de ações para executar o teste.
- **Resultado esperado:** comportamento que deve ser observado.

## 4. Dados de teste

### Usuários

| Usuário           | Utilização                                     |
| ----------------- | ---------------------------------------------- |
| `standard_user`   | Cenários positivos e validações de credenciais |
| `locked_out_user` | Validação de usuário bloqueado                 |

Senha dos usuários válidos: `secret_sauce`.

### Dados sintéticos

| Dado               | Utilização                       |
| ------------------ | -------------------------------- |
| `invalid_user`     | Simulação de usuário inexistente |
| `invalid_password` | Simulação de senha incorreta     |

`invalid_user` e `invalid_password` são dados sintéticos definidos para os testes negativos.

### Campos vazios

| Condição                         | Cenário |
| -------------------------------- | ------- |
| Usuário e senha vazios           | CT-004  |
| Usuário vazio e senha preenchida | CT-005  |
| Usuário preenchido e senha vazia | CT-006  |

### Perfis fora do escopo de autenticação

Os seguintes perfis especiais do SauceDemo não fazem parte da cobertura de autenticação nessa versão do projeto:

- `problem_user`
- `performance_glitch_user`
- `error_user`
- `visual_user`

Esses usuários poderão ser considerados na exploração e nos testes das demais funcionalidades, conforme os comportamentos específicos observados.

## 5. Cenários de teste

### CT-001 — Realizar login com sucesso

**Classificação:** `@Authentication`, `@Positive`

**Objetivo:** comprovar a autenticação com credenciais válidas e o acesso ao Catálogo de Produtos.

**Pré-condição:** contexto novo, sem sessão autenticada; aplicação disponível.

**Dados:**

- Usuário: `standard_user`
- Senha: `secret_sauce`

**Passos:**

1. Acessar a página de login.
2. Preencher o campo de usuário.
3. Preencher o campo de senha.
4. Acionar o botão de login.

**Resultado esperado:**

- O usuário é autenticado com sucesso.
- A aplicação redireciona para `/inventory.html`.
- O elemento `data-test="inventory-container"` fica visível.

### CT-002 — Realizar login com senha incorreta

**Classificação:** `@Authentication`, `@Negative`

**Objetivo:** verificar o comportamento da aplicação diante de uma tentativa de autenticação com senha inválida.

**Pré-condição:** contexto novo, sem sessão autenticada; aplicação disponível.

**Dados:**

- Usuário: `standard_user`
- Senha: `invalid_password`

**Passos:**

1. Acessar a página de login.
2. Preencher o campo de usuário.
3. Preencher o campo de senha com um valor incorreto.
4. Acionar o botão de login.

**Resultado esperado:**

- A autenticação não é realizada.
- A aplicação apresenta a mensagem: `Epic sadface: Username and password do not match any user in this service`

### CT-003 — Realizar login com usuário inexistente

**Classificação:** `@Authentication`, `@Negative`

**Objetivo:** verificar o comportamento da aplicação diante de uma tentativa de autenticação com usuário inexistente.

**Pré-condição:** contexto novo, sem sessão autenticada; aplicação disponível.

**Dados:**

- Usuário: `invalid_user`
- Senha: `secret_sauce`

**Passos:**

1. Acessar a página de login.
2. Preencher o campo de usuário com um identificador inexistente.
3. Preencher o campo de senha.
4. Acionar o botão de login.

**Resultado esperado:**

- A autenticação não é realizada.
- A aplicação apresenta a mensagem: `Epic sadface: Username and password do not match any user in this service`

### CT-004 — Realizar login com usuário e senha vazios

**Classificação:** `@Authentication`, `@Negative`

**Objetivo:** verificar a validação dos campos obrigatórios quando ambos estão vazios.

**Pré-condição:** contexto novo, sem sessão autenticada; aplicação disponível.

**Dados:**

- Usuário: vazio.
- Senha: vazia.

**Passos:**

1. Acessar a página de login.
2. Manter o campo de usuário vazio.
3. Manter o campo de senha vazio.
4. Acionar o botão de login.

**Resultado esperado:**

- A autenticação não é realizada.
- A aplicação apresenta a mensagem: `Epic sadface: Username is required`

### CT-005 — Realizar login com usuário vazio

**Classificação:** `@Authentication`, `@Negative`

**Objetivo:** verificar a validação do campo de usuário quando está vazio e a senha está preenchida.

**Pré-condição:** contexto novo, sem sessão autenticada; aplicação disponível.

**Dados:**

- Usuário: vazio.
- Senha: `secret_sauce`

**Passos:**

1. Acessar a página de login.
2. Manter o campo de usuário vazio.
3. Preencher o campo de senha.
4. Acionar o botão de login.

**Resultado esperado:**

- A autenticação não é realizada.
- A aplicação apresenta a mensagem: `Epic sadface: Username is required`

### CT-006 — Realizar login com senha vazia

**Classificação:** `@Authentication`, `@Negative`

**Objetivo:** verificar a validação do campo de senha quando está vazio e o usuário está preenchido.

**Pré-condição:** contexto novo, sem sessão autenticada; aplicação disponível.

**Dados:**

- Usuário: `standard_user`
- Senha: vazia.

**Passos:**

1. Acessar a página de login.
2. Preencher o campo de usuário.
3. Manter o campo de senha vazio.
4. Acionar o botão de login.

**Resultado esperado:**

- A autenticação não é realizada.
- A aplicação apresenta a mensagem: `Epic sadface: Password is required`

### CT-007 — Realizar login com usuário bloqueado

**Classificação:** `@Authentication`, `@Negative`

**Objetivo:** verificar se a aplicação impede a autenticação de um usuário bloqueado.

**Pré-condição:** contexto novo, sem sessão autenticada; aplicação disponível.

**Dados:**

- Usuário: `locked_out_user`
- Senha: `secret_sauce`

**Passos:**

1. Acessar a página de login.
2. Preencher o campo de usuário.
3. Preencher o campo de senha.
4. Acionar o botão de login.

**Resultado esperado:**

- A autenticação não é realizada.
- A aplicação apresenta a mensagem: `Epic sadface: Sorry, this user has been locked out.`

### CT-008 — Realizar logout com sucesso

**Classificação:** `@Authentication`, `@Positive`

**Objetivo:** verificar o fluxo de logout e o retorno à página de login.

**Pré-condição:** contexto novo, sem sessão autenticada; aplicação disponível.

**Dados:**

- Usuário: `standard_user`
- Senha: `secret_sauce`

**Passos:**

1. Acessar a página de login.
2. Realizar login com credenciais válidas.
3. Confirmar o acesso ao Catálogo de Produtos.
4. Abrir o menu lateral.
5. Acionar a opção de logout.

**Resultado esperado:**

- A aplicação retorna à página inicial de login.
- A URL corresponde à raiz `https://www.saucedemo.com/`.
- O elemento `data-test="login-container"` fica visível.

Este cenário verifica o retorno imediato à tela de login. As tentativas de acesso após logout são verificadas separadamente nos CT-010 e CT-011.

### CT-009 — Acessar catálogo de produtos sem estar autenticado

**Classificação:** `@Authentication`, `@Negative`

**Objetivo:** verificar se a aplicação impede o acesso direto ao Catálogo de Produtos quando não existe sessão autenticada.

**Pré-condição:** contexto novo, sem autenticação anterior.

**Dados:**

- URL: `https://www.saucedemo.com/inventory.html`

**Passos:**

1. Navegar diretamente para a URL do Catálogo de Produtos.

**Resultado esperado:**

- O acesso ao Catálogo de Produtos é bloqueado.
- A aplicação redireciona para a página inicial.
- A aplicação apresenta um alerta com a mensagem: `Epic sadface: You can only access '/inventory.html' when you are logged in.`

### CT-010 — Acessar catálogo de produtos após logout pelo botão Voltar do navegador

**Classificação:** `@Authentication`, `@Negative`

**Objetivo:** verificar se a aplicação impede a recuperação do acesso ao Catálogo de Produtos pelo histórico de navegação após logout.

**Pré-condição:** contexto novo, sem sessão autenticada; aplicação disponível.

**Dados:**

- Usuário: `standard_user`
- Senha: `secret_sauce`

**Passos:**

1. Acessar a página de login.
2. Realizar login com credenciais válidas.
3. Confirmar o acesso ao Catálogo de Produtos.
4. Realizar logout pelo menu lateral.
5. Acionar o botão Voltar do navegador.

**Resultado esperado:**

- O acesso ao Catálogo de Produtos é bloqueado.
- A aplicação apresenta um alerta com a mensagem: `Epic sadface: You can only access '/inventory.html' when you are logged in.`

### CT-011 — Acessar catálogo de produtos após logout por URL direta

**Classificação:** `@Authentication`, `@Negative`

**Objetivo:** verificar se a aplicação impede o acesso direto ao Catálogo de Produtos por URL após o encerramento da sessão.

**Pré-condição:** contexto novo, sem sessão autenticada; aplicação disponível.

**Dados:**

- Usuário: `standard_user`
- Senha: `secret_sauce`
- URL: `https://www.saucedemo.com/inventory.html`

**Passos:**

1. Acessar a página de login.
2. Realizar login com credenciais válidas.
3. Confirmar o acesso ao Catálogo de Produtos.
4. Realizar logout pelo menu lateral.
5. Navegar diretamente para a URL do Catálogo de Produtos.

**Resultado esperado:**

- O acesso ao Catálogo de Produtos é bloqueado.
- A aplicação apresenta um alerta com a mensagem: `Epic sadface: You can only access '/inventory.html' when you are logged in.`

Diferentemente do CT-009, este cenário verifica o comportamento após uma sessão previamente autenticada e encerrada por logout.
