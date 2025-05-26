# CRUD de Usuários com Node.js, Express e ArangoDB

Este projeto é uma aplicação web simples que demonstra as operações CRUD (Criar, Ler, Atualizar, Deletar) para gerenciar usuários. O backend é construído com Node.js e Express, utilizando ArangoDB como banco de dados NoSQL multi-modelo. O frontend é uma página HTML básica com JavaScript para interagir com a API.

## Funcionalidades

*   **Criar (Create):**
    *   Adicionar novos usuários com nome e idade através de um formulário.
    *   Criar um conjunto de dados de exemplo.
*   **Ler (Read):**
    *   Listar todos os usuários cadastrados.
*   **Atualizar (Update):**
    *   Editar o nome e a idade de usuários existentes.
*   **Deletar (Delete):**
    *   Remover usuários do banco de dados.

## Tecnologias Utilizadas

*   **Backend:**
    *   Node.js
    *   Express.js
    *   ArangoDB (via driver `arangojs`)
*   **Frontend:**
    *   HTML
    *   CSS (inline)
    *   JavaScript (vanilla, com API Fetch)
*   **Banco de Dados:**
    *   ArangoDB

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado:

*   [Node.js](https://nodejs.org/) (que inclui o npm)
*   [ArangoDB](https://www.arangodb.com/download/) - Certifique-se de que o serviço ArangoDB esteja em execução.

## Configuração e Instalação

1.  **Clone o repositório (ou crie os arquivos manualmente):**
    Se este projeto estivesse em um repositório Git:
    ```bash
    git clone <url-do-repositorio>
    cd <nome-do-diretorio-do-projeto>
    ```
    Caso contrário, certifique-se de que os arquivos `index.js`, `index.html` e `package.json` (se houver) estejam no mesmo diretório.

2.  **Instale as dependências do Node.js:**
    Navegue até o diretório do projeto no terminal e execute:
    ```bash
    npm install express arangojs
    ```
    Isso criará uma pasta `node_modules` e um arquivo `package-lock.json`. Se você já tiver um `package.json` com essas dependências listadas, apenas `npm install` será suficiente.

3.  **Configure o ArangoDB:**
    *   Certifique-se de que o ArangoDB esteja instalado e em execução (geralmente em `http://localhost:8529`).
    *   Durante a instalação do ArangoDB, você provavelmente definiu uma senha para o usuário `root`.
    *   No arquivo `index.js`, atualize as credenciais do ArangoDB se necessário:
        ```javascript
        // filepath: index.js
        const db = new Database({
            url: 'http://localhost:8529', // URL padrão do ArangoDB
            databaseName: 'meuBanco',    // Nome do banco de dados que será usado/criado
            auth: {
                username: 'root',
                password: '' // << ATUALIZE ESTA SENHA se for diferente
            }
        });
        ```
    *   O banco de dados `meuBanco` e a coleção `usuarios` serão criados automaticamente pela aplicação na primeira vez que forem necessários.

## Como Executar a Aplicação

1.  **Inicie o servidor ArangoDB:**
    Certifique-se de que o seu servidor ArangoDB esteja rodando.

2.  **Inicie o servidor Node.js:**
    No terminal, navegue até o diretório raiz do projeto e execute:
    ```bash
    node index.js
    ```
    Você deverá ver mensagens no console indicando que o servidor está rodando, por exemplo:
    ```
    Servidor CRUD completo rodando em http://localhost:3000
    Acesse http://localhost:3000 no seu navegador.
    Certifique-se de que o ArangoDB está rodando localmente em http://localhost:8529!
    ```

3.  **Acesse a aplicação no navegador:**
    Abra seu navegador e vá para `http://localhost:3000`.

## Endpoints da API (Backend)

O backend expõe os seguintes endpoints:

*   `GET /`: Serve a página `index.html`.
*   `POST /criar-dados`: Cria um conjunto de dados de exemplo na coleção `usuarios`.
*   `POST /usuarios`: Cria um novo usuário.
    *   Corpo da requisição (JSON): `{ "nome": "string", "idade": number }`
*   `GET /usuarios`: Lista todos os usuários.
*   `PUT /usuarios/:key`: Atualiza um usuário existente identificado pela sua `_key`.
    *   Corpo da requisição (JSON): `{ "nome": "string", "idade": number }`
*   `DELETE /usuarios/:key`: Deleta um usuário existente identificado pela sua `_key`.

## Acessando o Banco de Dados Diretamente (ArangoDB Web UI)

Você pode visualizar e gerenciar os dados diretamente no ArangoDB usando sua interface web (Aardvark):

1.  Abra seu navegador e vá para `http://localhost:8529`.
2.  Faça login com suas credenciais do ArangoDB (usuário `root` e a senha configurada).
3.  No painel, selecione o banco de dados `meuBanco`.
4.  No menu lateral, vá para "Collections" e selecione a coleção `usuarios` para ver os documentos.

## Solução de Problemas Comuns

*   **Erro "not authorized to execute this request" ou falha ao conectar ao ArangoDB:**
    *   Verifique se o serviço ArangoDB está em execução.
    *   Confirme se a URL, nome de usuário e senha no arquivo `index.js` estão corretos e correspondem à sua configuração do ArangoDB.
*   **Aplicação web não carrega ou botões não funcionam:**
    *   Verifique o console do navegador (geralmente F12) para erros de JavaScript.
    *   Verifique o console do Node.js para erros no backend.
*   **Dados não aparecem na interface web do ArangoDB:**
    *   Certifique-se de ter selecionado o banco de dados `meuBanco` na interface web do ArangoDB antes de procurar a coleção `usuarios`.

---

Este README deve fornecer uma boa visão geral do seu projeto e como configurá-lo e executá-lo.
