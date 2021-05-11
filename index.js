const express = require('express');

const app = express();

app.use(express.json());

app.get('/hello', function (req, res) {
  res.send('Hello World');
});

const mensagens = ['Essa é a primeira mensagem!', 'Essa é a segunda mensagem!'];

// CRUD (Create, Read, Update, Delete)

// GET: READ ALL (exibir todos os registros)
app.get('/mensagens', (req, res) => {
  res.send(mensagens.filter(Boolean));
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
