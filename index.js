const { Database } = require('arangojs');
const express = require('express');
const path = require('path');
const app = express();

// Configuração do ArangoDB
const db = new Database({
    url: 'http://localhost:8529',
    databaseName: 'meuBanco',
    auth: {
        username: 'root',
        password: 'Lourenco2002' // Certifique-se que esta é a senha correta
    }
});

// Middleware para JSON
app.use(express.json());

// Servir o arquivo HTML principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Função auxiliar para garantir que a coleção exista
async function garantirColecaoUsuarios() {
    const collection = db.collection('usuarios');
    const collectionExists = await collection.exists();
    if (!collectionExists) {
        try {
            await collection.create();
            console.log("Coleção 'usuarios' criada.");
        } catch (err) {
            // Lidar com corrida de condição se outra requisição criar ao mesmo tempo
            if (err.isArangoError && err.errorNum === 1207) { // ERROR_ARANGO_DUPLICATE_NAME
                console.log("Coleção 'usuarios' já existe (detectado após verificação).");
            } else {
                throw err; // Relançar outros erros
            }
        }
    }
    return collection;
}


// Rota para CRIAR DADOS DE EXEMPLO (mantida para o botão específico)
app.post('/criar-dados', async (req, res) => {
    try {
        const collection = await garantirColecaoUsuarios();
        const dadosExemplo = [
            { nome: 'João Silva', idade: 25 },
            { nome: 'Maria Oliveira', idade: 30 },
            { nome: 'Pedro Santos', idade: 28 }
        ];
        // Para evitar duplicatas por _key, podemos usar insert com overwrite ou verificar antes.
        // Por simplicidade, saveAll pode criar novas entradas se _key não for fornecido.
        // Se quiser que essa rota seja idempotente (não crie duplicatas dos mesmos nomes),
        // seria necessário buscar por nome/idade antes de inserir.
        const resultado = await collection.saveAll(dadosExemplo);
        res.json({ mensagem: 'Dados de exemplo criados com sucesso!', resultado });
    } catch (error) {
        console.error("Erro em /criar-dados:", error);
        res.status(500).json({ erro: error.message });
    }
});

// Rota para CRIAR UM NOVO USUÁRIO (a partir do formulário)
app.post('/usuarios', async (req, res) => {
    try {
        const { nome, idade } = req.body;
        if (!nome || idade === undefined) {
            return res.status(400).json({ erro: 'Nome e idade são obrigatórios.' });
        }
        if (typeof idade !== 'number' || idade < 0) {
            return res.status(400).json({ erro: 'Idade deve ser um número positivo.' });
        }

        const collection = await garantirColecaoUsuarios();
        const novoUsuario = { nome, idade };
        const resultado = await collection.save(novoUsuario); // Salva um único documento
        res.status(201).json({ mensagem: 'Usuário adicionado com sucesso!', usuario: resultado });
    } catch (error) {
        console.error("Erro em POST /usuarios:", error);
        res.status(500).json({ erro: error.message });
    }
});


// Rota para LISTAR todos os usuários (READ)
app.get('/usuarios', async (req, res) => {
    try {
        const collection = await garantirColecaoUsuarios();
        const cursor = await collection.all();
        const usuarios = await cursor.all();
        res.json(usuarios);
    } catch (error) {
        console.error("Erro em GET /usuarios:", error);
        // Se a coleção não existir após a tentativa de garantir, pode ser um erro diferente
        if (error.message.includes("collection") && error.message.includes("not found")) {
             return res.status(404).json({ erro: "Coleção 'usuarios' não encontrada. Tente criar dados primeiro." });
        }
        res.status(500).json({ erro: error.message });
    }
});

// Rota para DELETAR um usuário (DELETE)
app.delete('/usuarios/:key', async (req, res) => {
    try {
        const { key } = req.params;
        if (!key) {
            return res.status(400).json({ erro: 'A chave do usuário é obrigatória para remoção.' });
        }
        const collection = await garantirColecaoUsuarios();
        
        // Opcional: verificar se o documento existe antes de tentar remover
        const docExists = await collection.documentExists(key);
        if (!docExists) {
            return res.status(404).json({ erro: `Usuário com chave '${key}' não encontrado.` });
        }

        await collection.remove(key);
        res.json({ mensagem: `Usuário com chave '${key}' removido com sucesso.` });
    } catch (error) {
        console.error(`Erro em DELETE /usuarios/${req.params.key}:`, error);
        // Tratar erro específico de documento não encontrado se a verificação acima não for usada
        if (error.isArangoError && error.errorNum === 1202) { // ERROR_ARANGO_DOCUMENT_NOT_FOUND
             return res.status(404).json({ erro: `Usuário com chave '${req.params.key}' não encontrado.` });
        }
        res.status(500).json({ erro: error.message });
    }
});


// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log('Acesse http://localhost:3000 no seu navegador.');
    console.log('Certifique-se de que o ArangoDB está rodando localmente em http://localhost:8529!');
});