# Aplicação Simples com ArangoDB

Este é um exemplo simples de uma aplicação Node.js que utiliza o ArangoDB como banco de dados.

## Pré-requisitos

1. Node.js instalado
2. ArangoDB instalado e rodando localmente
   - Por padrão, o ArangoDB roda em http://localhost:8529
   - Usuário padrão: root
   - Senha padrão: (vazia)

## Instalação

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor:
```bash
npm start
```

## Endpoints disponíveis

1. Criar dados de exemplo:
```bash
POST http://localhost:3000/criar-dados
```

2. Listar todos os usuários:
```bash
GET http://localhost:3000/usuarios
```

## Testando a aplicação

Você pode usar o Postman, cURL ou qualquer outro cliente HTTP para testar os endpoints.

Exemplo com cURL:

```bash
# Criar dados
curl -X POST http://localhost:3000/criar-dados

# Listar usuários
curl http://localhost:3000/usuarios
``` 