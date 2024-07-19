# Happmobi Code Challenge

Bem-vindo ao repositório do Happmobi Code Challenge! Este projeto é uma aplicação Node.js desenvolvida como parte de um desafio técnico.

## Descrição

Este repositório contém uma aplicação web desenvolvida com Node.js, TypeScript, MongoDB e Jest. A aplicação está configurada para usar Docker e Docker Compose para simplificar o ambiente de desenvolvimento e teste.

## Tecnologias

- **Node.js**
- **TypeScript**
- **MongoDB**
- **Swagger**
- **Jest**
- **Docker**
- **Docker Compose**

## Configuração do Ambiente de Desenvolvimento

### Pré-requisitos

- Node.js
- Docker
- Docker Compose

### Clonando o Repositório

```bash
git clone git@github.com:lucasvtf/happmobi_code_challenge.git
cd happmobi_code_challenge
```

### Instalando as dependências

```bash
npm install
```

### Rodando o projeto com Docker

```bash
docker-compose up --build
```

- **O backend estará disponível em http://localhost:3000**
- **A documentação estará disponível em http://localhost:3000/api-docs/**

### Para rodar os testes.

```bash
docker exec -it happmobi_code_challenge-app-1 bash
npm run test
```
