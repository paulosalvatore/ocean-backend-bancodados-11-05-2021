const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

(async () => {

const url = 'mongodb://localhost:27017';

const dbName = 'ocean_bancodados_11_05_2021';

console.info('Conectando ao banco de dados...');

const client = await MongoClient.connect(url, { useUnifiedTopology: true });

console.info('MongoDB conectado com sucesso!!');

const db = client.db(dbName);

const app = express();

app.use(express.json());

app.get('/hello', function (req, res) {
  res.send('Hello World');
});

const mensagens = ['Essa é a primeira mensagem!', 'Essa é a segunda mensagem!'];

const mensagensCollection = db.collection('mensagens');

// CRUD (Create, Read, Update, Delete)

// GET: READ ALL (exibir todos os registros)
app.get('/mensagens', async (req, res) => {
  const listaMensagens = await mensagensCollection.find().toArray();

  res.send(listaMensagens);
});

// GET: READ SINGLE (exibir apenas um registro)
app.get('/mensagens/:id', (req, res) => {
  const id = req.params.id - 1;

  const mensagem = mensagens[id];

  if (!mensagem) {
    res.send('Mensagem não encontrada.');
  }

  res.send(mensagem);
});

// POST: CREATE (criar um registro)
app.post('/mensagens', (req, res) => {
  const mensagem = req.body.mensagem;

  mensagens.push(mensagem);

  const id = mensagens.length;

  res.send(`Mensagem '${id}' criada com sucesso.`);
});

// PUT: UPDATE (editar um registro)
app.put('/mensagens/:id', (req, res) => {
  const id = req.params.id - 1;

  const mensagem = req.body.mensagem;

  mensagens[id] = mensagem;

  res.send('Mensagem atualizada com sucesso.');
});

// DELETE: DELETE (remover um registro)
app.delete('/mensagens/:id', (req, res) => {
  const id = req.params.id - 1;

  delete mensagens[id];

  res.send('Mensagem removida com sucesso.');
});

app.listen(3000);

})();
