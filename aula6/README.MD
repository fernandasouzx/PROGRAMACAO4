# Projeto NestJS - Módulo Pessoa

## Descrição

Projeto desenvolvido utilizando o framework NestJS para a criação de um módulo de pessoa.

A atividade teve como objetivo:

- Gerar um projeto NestJS;
- Adicionar um módulo/resource chamado `pessoa`.

Não foi necessário implementar lógica de negócio ou rotas personalizadas.

---

## Tecnologias Utilizadas

- Node.js
- NestJS
- TypeScript
- npm

---

## Comandos Utilizados

### Criar o projeto

```bash
nest new project-name
```

### Para gerar o módulo/resourse pessoa
```bash
nest generate resource pessoa
```

## Estrutura Gerada
```bash
src/
├── pessoa/
│   ├── dto/
│   ├── entities/
│   ├── pessoa.controller.ts
│   ├── pessoa.module.ts
│   └── pessoa.service.ts
```

## Executando o Projeto
### Instalar dependências

```bash
npm install
```

### Rodar o projeto
```bash
npm run start
```


### Rodar em modo desenvolvimento
```bash
npm run start:dev
```

## Autor
Fernanda Lima
