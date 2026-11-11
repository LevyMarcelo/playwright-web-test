# Casos de Teste - Autenticação

## 1. Contexto

Cobertura dos comportamentos de autenticação da aplicação SauceDemo, incluindo validação de credenciais, campos obrigatórios, restrição de acesso e encerramento de sessão.

## 2. Casos de teste

### CT-001 — Realizar login com sucesso

**Classificação:** `@Authentication`, `@Positive`

**Dados:**
- Usuário: `standard_user`
- Senha: `secret_sauce`

**Passos:**
1. Acessar a página de login.
2. Informar o usuário e a senha correspondente.
3. Acionar o botão de login.

**Resultado esperado:**
- O usuário é autenticado com sucesso.
- A aplicação redireciona para `/inventory.html`.
- O catálogo de produtos é exibido.

### CT-002 — Realizar login com senha incorreta

**Classificação:** `@Authentication`, `@Negative`

**Dados:**
- Usuário: `standard_user`
- Senha: `invalid_password` (dado sintético)

**Passos:**
1. Acessar a página de login.
2. Informar o usuário válido e a senha incorreta.
3. Acionar o botão de login.

**Resultado esperado:**
- A autenticação não é realizada.
- A aplicação apresenta a mensagem: `Epic sadface: Username and password do not match any user in this service`.

### CT-003 — Realizar login com usuário inexistente

**Classificação:** `@Authentication`, `@Negative`

**Dados:**
- Usuário: `invalid_user` (dado sintético)
- Senha: `secret_sauce`

**Passos:**
1. Acessar a página de login.
2. Informar o usuário inexistente e uma senha válida.
3. Acionar o botão de login.

**Resultado esperado:**
- A autenticação não é realizada.
- A aplicação apresenta a mensagem: `Epic sadface: Username and password do not match any user in this service`.

### CT-004 — Realizar login com usuário e senha vazios

**Classificação:** `@Authentication`, `@Negative`

**Dados:**
- Usuário: vazio.
- Senha: vazia.

**Passos:**
1. Acessar a página de login.
2. Manter os campos de usuário e senha vazios.
3. Acionar o botão de login.

**Resultado esperado:**
- A autenticação não é realizada.
- A aplicação apresenta a mensagem: `Epic sadface: Username is required`.

### CT-005 — Realizar login com usuário vazio

**Classificação:** `@Authentication`, `@Negative`

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
- A aplicação apresenta a mensagem: `Epic sadface: Username is required`.

### CT-006 — Realizar login com senha vazia

**Classificação:** `@Authentication`, `@Negative`

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
- A aplicação apresenta a mensagem: `Epic sadface: Password is required`.

### CT-007 — Realizar login com usuário bloqueado

**Classificação:** `@Authentication`, `@Negative`

**Dados:**
- Usuário: `locked_out_user`
- Senha: `secret_sauce`

**Passos:**
1. Acessar a página de login.
2. Informar o usuário bloqueado e sua senha correspondente.
3. Acionar o botão de login.

**Resultado esperado:**
- A autenticação não é realizada.
- A aplicação apresenta a mensagem: `Epic sadface: Sorry, this user has been locked out.`

### CT-008 — Realizar logout com sucesso

**Classificação:** `@Authentication`, `@Positive`

**Dados:**
- Usuário: `standard_user`
- Senha: `secret_sauce`

**Passos:**
1. Acessar a página de login.
2. Realizar login com credenciais válidas.
3. Confirmar o acesso ao catálogo de produtos.
4. Abrir o menu lateral.
5. Acionar a opção de logout.

**Resultado esperado:**
- A aplicação encerra a sessão e retorna à página inicial.
- A URL corresponde à raiz `https://www.saucedemo.com/`.
- A página de login é exibida.

### CT-009 — Acessar catálogo de produtos sem estar autenticado

**Classificação:** `@Authentication`, `@Negative`

**Dados:**
- URL: `https://www.saucedemo.com/inventory.html`

**Passos:**
1. Navegar diretamente para a URL do catálogo de produtos sem realizar login.

**Resultado esperado:**
- O acesso ao catálogo de produtos é bloqueado.
- A aplicação redireciona para a página inicial.
- A aplicação apresenta um alerta com a mensagem: `Epic sadface: You can only access '/inventory.html' when you are logged in.`

### CT-010 — Acessar catálogo de produtos após logout pelo botão Voltar do navegador

**Classificação:** `@Authentication`, `@Negative`

**Dados:**
- Usuário: `standard_user`
- Senha: `secret_sauce`

**Passos:**
1. Acessar a página de login.
2. Realizar login com credenciais válidas.
3. Confirmar o acesso ao catálogo de produtos.
4. Realizar logout pelo menu lateral.
5. Acionar o botão Voltar do navegador.

**Resultado esperado:**
- O acesso ao catálogo de produtos é bloqueado.
- A aplicação apresenta um alerta com a mensagem: `Epic sadface: You can only access '/inventory.html' when you are logged in.`

### CT-011 — Acessar catálogo de produtos após logout por URL direta

**Classificação:** `@Authentication`, `@Negative`

**Dados:**
- Usuário: `standard_user`
- Senha: `secret_sauce`
- URL: `https://www.saucedemo.com/inventory.html`

**Passos:**
1. Acessar a página de login.
2. Realizar login com credenciais válidas.
3. Confirmar o acesso ao catálogo de produtos.
4. Realizar logout pelo menu lateral.
5. Navegar diretamente para a URL do catálogo de produtos.

**Resultado esperado:**
- O acesso ao catálogo de produtos é bloqueado.
- A aplicação apresenta um alerta com a mensagem: `Epic sadface: You can only access '/inventory.html' when you are logged in.`
