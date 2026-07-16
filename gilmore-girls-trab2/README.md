# Gilmore Girls - WIKI

Enciclopédia digital fan-made sobre a série **Gilmore Girls**, desenvolvida como trabalho prático de integração entre Front-end e Back-end. A seção de **Personagens** deixou de usar dados estáticos (mockados) e passou a ser servida dinamicamente por uma API própria, construída com NestJS, TypeORM, MySQL e autenticação JWT.

## Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Modelo de dados](#modelo-de-dados)
- [Como funciona](#como-funciona)
- [Instalação e configuração do ambiente](#instalação-e-configuração-do-ambiente)
- [Executando o projeto](#executando-o-projeto)
- [Executando os testes](#executando-os-testes)
- [Autenticação (JWT)](#autenticação-jwt)
- [Endpoints da API](#endpoints-da-api)
- [Front-end](#front-end)
- [Autora](#autora)

## Sobre o projeto

O trabalho consolida três conceitos principais:

1. **Back-end**: uma API REST em NestJS que gerencia o ciclo de vida completo de uma entidade de conteúdo (`Personagem`), reaproveitando a estrutura do trabalho anterior.
2. **Banco de dados**: persistência em MySQL via TypeORM, com autoincremento de IDs e ordenação configurável.
3. **Integração Front-end + Back-end**: o front-end (HTML/CSS/JS estáticos) consome a API dinamicamente via `fetch`, sem nenhum dado de personagem escrito diretamente no HTML.

## Tecnologias utilizadas

**Back-end**
- [NestJS](https://nestjs.com/) + TypeScript
- [TypeORM](https://typeorm.io/) para o ORM
- **MySQL** como banco de dados
- **Passport + JWT** (`@nestjs/passport`, `@nestjs/jwt`, `passport-jwt`) para autenticação
- **bcrypt** para hash de senhas
- **Jest** para testes unitários

**Front-end**
- HTML5 semântico
- CSS3 (Flexbox, gradientes, animações)
- JavaScript puro (`fetch` para consumo da API)

## Estrutura do projeto

```
gilmore-girls-trab2/
├── index.html            # Página principal da wiki
├── style.css             # Estilos do site
├── script.js             # Consumo da API (personagens) + curiosidades
├── imgs/                 # Imagens usadas no front-end (hospedadas também via GitHub raw)
├── README.md              # Este arquivo
│
└── api-wiki/              # Back-end (API)
    ├── src/
    │   ├── personagens/    # Entidade de conteúdo: CRUD completo
    │   │   ├── entities/personagem.entity.ts
    │   │   ├── dto/
    │   │   ├── personagens.controller.ts
    │   │   ├── personagens.service.ts
    │   │   └── personagens.module.ts
    │   ├── users/          # Entidade de usuário (usada pela autenticação)
    │   ├── auth/            # Login, registro e proteção de rotas via JWT
    │   │   ├── strategies/jwt.strategy.ts
    │   │   ├── guards/jwt-auth.guard.ts
    │   │   ├── auth.controller.ts
    │   │   └── auth.service.ts
    │   ├── curiosidades/    # Módulo extra: curiosidades da série via API
    │   ├── app.module.ts
    │   └── main.ts
    └── package.json
```

## Modelo de dados

### Personagem (entidade principal de conteúdo)

| Campo               | Tipo      | Descrição                                                        |
|---------------------|-----------|--------------------------------------------------------------------|
| `id`                 | number    | Identificador único, gerado automaticamente                       |
| `titulo`             | string    | Nome do personagem (identificador textual principal)              |
| `resumo`             | string    | Frase curta, sempre visível no card                                |
| `conteudo`           | text      | Descrição completa do personagem (corpo principal do conteúdo)    |
| `imagem`             | string    | URL da imagem do personagem                                        |
| `ordemApresentacao`  | number    | Define a ordem de exibição dos personagens na interface           |

### User (entidade de autenticação)

| Campo       | Tipo    | Descrição                                    |
|-------------|---------|------------------------------------------------|
| `id`         | number  | Identificador único                            |
| `email`      | string  | E-mail do usuário (único)                      |
| `password`   | string  | Senha armazenada como hash (bcrypt)            |

### Curiosidade (módulo extra, opcional)

| Campo   | Tipo   | Descrição                        |
|---------|--------|-------------------------------------|
| `id`     | number | Identificador único                 |
| `texto`  | text   | Texto da curiosidade sobre a série  |

## Como funciona

O fluxo de uma requisição, do navegador até o banco de dados, segue sempre o mesmo caminho:

```
Navegador (fetch)  →  Controller  →  Guard (se a rota exigir login)  →  Service  →  Repository (TypeORM)  →  MySQL
```

1. O front-end (`script.js`) faz um `fetch` para a API (ex.: `GET /personagens`).
2. O **Controller** correspondente (`PersonagensController`, `CuriosidadesController`, `AuthController`) recebe a requisição e decide para qual método do service ela vai.
3. Se a rota tiver o decorator `@UseGuards(JwtAuthGuard)`, o **Guard** intercepta a requisição antes do controller executar o método: ele confere o cabeçalho `Authorization: Bearer <token>`, valida o JWT e só deixa passar se o token for válido — caso contrário, responde `401 Unauthorized` automaticamente. Rotas de leitura (`GET`) não têm esse guard, por isso são públicas.
4. O **Service** (`PersonagensService`, `CuriosidadesService`, `AuthService`, `UsersService`) concentra as regras de negócio (ex.: lançar `NotFoundException` quando o id não existe, ordenar por `ordemApresentacao`, aplicar hash de senha com `bcrypt`).
5. O service usa o **Repository** do TypeORM (`@InjectRepository`) para ler/gravar no **MySQL**, com base nas entidades (`Personagem`, `User`, `Curiosidade`).

**Autenticação (resumo do fluxo):**
- No **login** (`POST /auth/login`), o `AuthService` confere o e-mail e a senha (comparando o hash com `bcrypt.compare`) e, se estiver correto, gera um token JWT assinado (`JwtService.sign`) contendo o id e o e-mail do usuário.
- Em cada requisição a uma rota protegida, o `JwtStrategy` decodifica e valida esse token (assinatura e expiração) — é essa validação que o `JwtAuthGuard` usa para liberar ou bloquear o acesso.

## Instalação e configuração do ambiente

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [MySQL Server](https://dev.mysql.com/downloads/) instalado e em execução

### 1. Clonar o repositório e instalar dependências

```bash
git clone <url-do-repositorio>
cd gilmore-girls-trab2/api-wiki
npm install
```

### 2. Criar o banco de dados e o usuário no MySQL

Entre no MySQL como root:

```bash
sudo mysql
```

E rode:

```sql
CREATE DATABASE gilmore_girls;
CREATE USER 'fernanda'@'localhost' IDENTIFIED BY 'Senha@123456';
GRANT ALL PRIVILEGES ON gilmore_girls.* TO 'fernanda'@'localhost';
FLUSH PRIVILEGES;
```

> Se preferir usar outro usuário/senha/banco, ajuste os mesmos valores no passo seguinte.

### 3. Configurar a conexão com o banco

As credenciais de conexão ficam em `src/app.module.ts`, no `TypeOrmModule.forRoot`:

```typescript
TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'fernanda',
  password: 'Senha@123456',
  database: 'gilmore_girls',
  autoLoadEntities: true,
  synchronize: true, // cria/atualiza as tabelas automaticamente (uso em desenvolvimento)
})
```

Ajuste `username`, `password` e `database` conforme o que você configurou no passo 2.

> `synchronize: true` faz o TypeORM criar e atualizar as tabelas automaticamente a partir das entidades — não é necessário rodar migrations manualmente neste projeto.

## Executando o projeto

Na pasta `api-wiki/`:

```bash
npm run start:dev
```

O servidor sobe em `http://localhost:3001` (a porta é definida em `src/main.ts`).

Para servir o front-end, abra o `index.html` a partir da raiz do projeto (`gilmore-girls-trab2/`) em um servidor local (ex.: extensão *Live Server* do VS Code, ou `npx serve .`), já que abrir o arquivo diretamente (`file://`) pode causar bloqueios de CORS em alguns navegadores.

> O endereço da API está definido em `script.js` (`fetch("http://localhost:3001/personagens")`). Se a API rodar em outra porta/host, ajuste esse valor.

## Executando os testes

O projeto usa **Jest** para testes unitários dos services e controllers.

Na pasta `api-wiki/`:

```bash
# Rodar todos os testes
npm run test

# Rodar com relatório de cobertura
npm run test:cov

# Rodar em modo watch (reexecuta ao salvar arquivos)
npm run test:watch
```

**Cobertura atual de testes unitários:**

| Arquivo                                   | O que é testado                                                        |
|--------------------------------------------|--------------------------------------------------------------------------|
| `app.controller.spec.ts`                    | Rota raiz padrão do Nest                                                |
| `personagens.service.spec.ts`              | Criação, listagem ordenada, busca por id, atualização e remoção (incluindo erros de "não encontrado") |
| `personagens.controller.spec.ts`           | Delegação correta das rotas para o service                              |
| `auth.service.spec.ts`                      | Validação de credenciais e geração do token JWT                        |
| `auth.controller.spec.ts`                   | Delegação correta de `register` e `login` para os services              |
| `users.service.spec.ts`                     | Criação de usuário com senha criptografada e busca por e-mail          |
| `users.controller.spec.ts`                  | Instanciação do controller (não expõe rotas próprias — registro/login ficam no `AuthController`) |

> O módulo `curiosidades` (service e controller) é um recurso extra, não exigido pela especificação, e por isso não tem testes unitários dedicados.

### Testes e2e

O projeto também tem um teste end-to-end padrão do NestJS:

```bash
npm run test:e2e
```

Hoje ele cobre apenas a rota raiz (`GET /` → `"Hello World!"`), gerada automaticamente pelo `nest new` — não exercita as rotas de negócio (`personagens`, `curiosidades`, `auth`). Como esse comando sobe o `AppModule` completo, é necessário ter o MySQL configurado e acessível (ver seção anterior) para rodá-lo.

## Autenticação (JWT)

O projeto possui um módulo de autenticação (`src/auth`) integrado a uma entidade de usuário (`src/users`). O fluxo funciona assim:

1. **Registro** (`POST /auth/register`): cria um novo usuário, com a senha armazenada como hash (bcrypt) — nunca em texto puro.
2. **Login** (`POST /auth/login`): valida e-mail e senha, e retorna um `access_token` (JWT) válido por 1 dia.
3. **Rotas protegidas**: as rotas de escrita (criação, edição e remoção) exigem o token no cabeçalho da requisição:
   ```
   Authorization: Bearer <access_token>
   ```
   Sem um token válido, a API responde `401 Unauthorized`.

As rotas de **leitura** (`GET`) foram mantidas públicas, já que a wiki é um conteúdo aberto ao público — apenas quem quer alterar os dados precisa estar autenticado.

### Testando a autenticação manualmente (via terminal)

Com o servidor rodando (`npm run start:dev`), é possível testar o fluxo completo de autenticação usando `curl`, sem precisar de Postman ou Insomnia.

**1. Criar uma conta**

```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@teste.com","password":"123456"}'
```

Resposta esperada:
```json
{"id":1,"email":"teste@teste.com"}
```

**2. Fazer login (obter o token)**

```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@teste.com","password":"123456"}'
```

Resposta esperada:
```json
{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoi..."}
```

Copie o valor completo de `access_token` (sem as aspas) para o próximo passo.

**3. Usar o token em uma rota protegida**

Substitua `SEU_TOKEN_AQUI` pelo token copiado no passo anterior:

```bash
curl -X POST http://localhost:3001/personagens \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{"titulo":"Teste","conteudo":"Texto de teste","ordemApresentacao":1}'
```

Resposta esperada: o personagem criado, com um `id` novo.

**4. Confirmar que a proteção funciona (requisição sem token)**

```bash
curl -i -X POST http://localhost:3001/personagens \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Sem token","conteudo":"Teste","ordemApresentacao":2}'
```

Resposta esperada: `HTTP/1.1 401 Unauthorized` — confirmando que a rota está corretamente protegida.

### Testando a autenticação com Insomnia

O mesmo fluxo acima pode ser testado visualmente no [Insomnia](https://insomnia.rest/):

**Passo 1 — Registrar um usuário**

1. Clique em *New Request* (ou no `+`), dê um nome tipo `Register` e escolha o método `POST`.
2. No campo de URL, cole:
   ```
   http://localhost:3001/auth/register
   ```
3. Abra a aba **Body** → escolha **JSON** no dropdown → cole:
   ```json
   {
     "email": "teste@teste.com",
     "password": "123456"
   }
   ```
4. Clique em **Send**. Você deve ver status `201` (ou `200`) e o usuário criado. Só precisa fazer isso uma vez.

**Passo 2 — Fazer login e pegar o token**

1. Crie outra request, nome `Login`, método `POST`, URL:
   ```
   http://localhost:3001/auth/login
   ```
2. Aba **Body** → JSON → o mesmo e-mail e senha do passo anterior.
3. **Send**. A resposta vem assim:
   ```json
   {
     "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
   }
   ```
4. Copie o valor do `access_token` (só o texto entre aspas, sem as aspas). 

**Passo 3 — Criar um personagem (rota protegida) usando o token**

1. Nova request, nome `Criar Personagem`, método `POST`, URL:
   ```
   http://localhost:3001/personagens
   ```
2. Abra a aba **Auth** → escolha **Bearer Token** no dropdown → no campo `TOKEN`, cole o `access_token` copiado no passo 2. O Insomnia monta o cabeçalho `Authorization: Bearer <token>` automaticamente — não precisa digitar isso na mão.
3. Aba **Body** → JSON → cole o personagem:
   ```json
   {
     "titulo": "Teste",
     "conteudo": "Texto de teste",
     "ordemApresentacao": 1
   }
   ```
4. **Send**. Deve retornar status `201` e o personagem com um `id` novo — isso prova que, com o token, a manipulação funciona.

**Passo 4 — Provar que sem token dá 401**

Pegue a mesma request `Criar Personagem`, vá na aba **Auth** e troque **Bearer Token** por **No Auth** (ou apague o token). Clique em **Send** de novo. Agora deve vir `401 Unauthorized` — mostrando que a rota de escrita está protegida.

**Passo 5 — Confirmar que o GET é público**

Nova request, método `GET`, URL `http://localhost:3001/personagens`, sem configurar nada na aba **Auth**. **Send**. Deve retornar a lista de personagens normalmente, provando que as rotas de leitura continuam abertas.

> **Dica:** o Insomnia tem *Environments*. Crie um ambiente (ícone no topo esquerdo) com:
> ```json
> {
>   "base_url": "http://localhost:3001",
>   "token": ""
> }
> ```
> Assim, nas URLs usa-se `{{ _.base_url }}/personagens`, e no campo do Bearer Token, `{{ _.token }}`. Depois do login, cole o token uma vez só dentro do ambiente, e todas as requests protegidas passam a funcionar sem precisar recolar em cada uma.

## Endpoints da API

### Autenticação

| Método | Rota             | Protegida? | Descrição                                  |
|--------|------------------|------------|----------------------------------------------|
| POST   | `/auth/register`  | Não        | Cria um novo usuário                         |
| POST   | `/auth/login`     | Não        | Autentica e retorna o `access_token` (JWT)   |

**Exemplo de requisição — registro:**
```json
POST /auth/register
{
  "email": "teste@teste.com",
  "password": "123456"
}
```

**Exemplo de requisição — login:**
```json
POST /auth/login
{
  "email": "teste@teste.com",
  "password": "123456"
}
```
**Resposta:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Personagens

| Método | Rota                | Protegida? | Descrição                              |
|--------|---------------------|------------|--------------------------------------------|
| GET    | `/personagens`       | Não        | Lista todos os personagens, ordenados por `ordemApresentacao` |
| GET    | `/personagens/:id`   | Não        | Busca um personagem específico              |
| POST   | `/personagens`       | Sim        | Cria um novo personagem                     |
| PATCH  | `/personagens/:id`   | Sim        | Atualiza um personagem existente            |
| DELETE | `/personagens/:id`   | Sim        | Remove um personagem                        |

**Exemplo de requisição — criação:**
```json
POST /personagens
Authorization: Bearer <access_token>

{
  "titulo": "Rory Gilmore (Alexis Bledel)",
  "resumo": "A filha de Lorelai, uma estudante brilhante e ambiciosa.",
  "conteudo": "Rory é uma jovem inteligente e dedicada que aspira a ter uma carreira acadêmica de sucesso...",
  "imagem": "https://raw.githubusercontent.com/usuario/repositorio/main/imgs/rory.png",
  "ordemApresentacao": 2
}
```

### Curiosidades (módulo extra)

| Método | Rota                  | Protegida? | Descrição                       |
|--------|-----------------------|------------|-------------------------------------|
| GET    | `/curiosidades`        | Não        | Lista todas as curiosidades         |
| POST   | `/curiosidades`        | Sim        | Cria uma nova curiosidade            |
| DELETE | `/curiosidades/:id`    | Sim        | Remove uma curiosidade               |

## Front-end

O `script.js`, na raiz do projeto, busca os personagens dinamicamente:

```javascript
const resposta = await fetch("http://localhost:3001/personagens");
const personagens = await resposta.json();
```

Cada personagem é renderizado em um card que exibe o `resumo` sempre visível, e a `descricao` (via campo `conteudo`) aparece ao clicar, reproduzindo o comportamento original do site estático, agora alimentado pela API.

## Autora

**Fernanda Lima de Souza**

Projeto acadêmico desenvolvido para a disciplina de Programação 4: integração entre Front-end e Back-end.

---

Este é um projeto fan-made e não possui afiliação com Warner Bros. Television, Netflix, Amy Sherman-Palladino ou qualquer entidade oficial relacionada a Gilmore Girls.