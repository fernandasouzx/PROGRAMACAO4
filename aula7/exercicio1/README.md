# API de Gerenciamento de Pessoas (CRUD NestJS)

Esta é uma API RESTful desenvolvida com o framework **NestJS**, utilizando **TypeORM** e **SQLite** para persistência de dados. Este projeto foi desenvolvido como parte de um exercício prático de Programação IV.

## Tecnologias Utilizadas

* **[NestJS](https://nestjs.com/)**: Framework Node.js para construção de aplicações backend eficientes e escaláveis.
* **[TypeORM](https://typeorm.io/)**: ORM (Object Relational Mapper) utilizado para mapear e interagir com o banco de dados.
* **[SQLite](https://www.sqlite.org/)**: Banco de dados relacional leve e embutido (salvo localmente no projeto).
* **TypeScript**: Linguagem base do projeto, garantindo tipagem estática e maior segurança no código.

## ⚙️ Pré-requisitos

Para rodar este projeto na sua máquina, você precisará ter instalado:
* [Node.js](https://nodejs.org/) (Versão 16 ou superior recomendada)
* NPM ou Yarn

## Como Executar o Projeto

**1. Instale as dependências:**
Na raiz do projeto, execute o comando:
```bash
npm install
``
**2. Inicie o servidor em modo de desenvolvimento:**

``Bash
npm run start:dev
```
**3. Acesse a API: **
O servidor estará rodando localmente na porta configurada (neste caso, a porta 3001).
A URL base será:
```bash
http://localhost:3001
```
## Estrutura da Entidade (Banco de Dados) 

A API gerencia uma entidade principal chamada **Pessoa**, contendo os seguintes campos:

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | number | Identificador único gerado automaticamente |
| `nome` | string | Nome completo da pessoa |
| `idade` | number | Idade da pessoa |

---

#  Rotas da API (Endpoints)

Para testar as requisições, podem ser utilizadas ferramentas como **Insomnia** ou **Postman**.

---

## 1. Criar Pessoa

**Método:** `POST`

**Endpoint:**

```
/pessoa
```

**Exemplo de corpo JSON:**

```json
{
  "nome": "Fernanda Lima",
  "idade": 21
}
```

---

## 2. Listar Todas as Pessoas

**Método:** `GET`

**Endpoint:**

```
/pessoa
```

**Retorno:**

Lista contendo todas as pessoas cadastradas no banco de dados.

---

## 3. Buscar Pessoa por ID

**Método:** `GET`

**Endpoint:**

```
/pessoa/:id
```

**Exemplo:**

```
/pessoa/1
```

**Retorno:**

Dados de uma pessoa específica conforme o identificador informado.

---

## 4. Atualizar Pessoa

**Método:** `PATCH`

**Endpoint:**

```
/pessoa/:id
```

**Exemplo:**

```
/pessoa/1
```

**Exemplo de corpo JSON:**

```json
{
  "idade": 22
}
```

> Envie somente os campos que deseja alterar.

---

## 5. Deletar Pessoa

**Método:** `DELETE`

**Endpoint:**

```
/pessoa/:id
```

**Exemplo:**

```
/pessoa/1
```

**Retorno:**

Confirmação da exclusão do registro.

---

# Estrutura do Projeto

Exemplo da organização dos principais arquivos:

```
src
│
├── pessoa
│   ├── pessoa.controller.ts
│   ├── pessoa.service.ts
│   ├── pessoa.entity.ts
│   ├── dto
│   │   ├── create-pessoa.dto.ts
│   │   └── update-pessoa.dto.ts
│   └── pessoa.module.ts
│
├── app.module.ts
└── main.ts
```

---

# Autor(a)

Desenvolvido por **Fernanda Lima**.
Você esgotou sua inteligência Instant por enquanto. As respostas podem ter qualidade inferior até amanhã 09:26.
Experimente o Plus gratuitamente
