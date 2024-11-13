const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Armazenando contatos em memória (poderia ser um banco de dados)
let contacts = [];

app.use(express.static('public'));

// Rota para listar os contatos
app.get('/contacts', (req, res) => {
    res.json(contacts);
});

// Rota para adicionar um novo contato
app.post('/contacts', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).send("Nome e email são obrigatórios.");
    }
    const newContact = { name, email };
    contacts.push(newContact);
    res.status(201).json(newContact);
});

// Rota para editar um contato existente
app.put('/contacts/:id', (req, res) => {
    const id = req.params.id;
    const { name, email } = req.body;
    const contact = contacts[id];
    if (!contact) {
        return res.status(404).send("Contato não encontrado.");
    }
    contact.name = name || contact.name;
    contact.email = email || contact.email;
    res.json(contact);
});

// Rota para excluir um contato
app.delete('/contacts/:id', (req, res) => {
    const id = req.params.id;
    const contact = contacts[id];
    if (!contact) {
        return res.status(404).send("Contato não encontrado.");
    }
    contacts.splice(id, 1);
    res.status(204).send();
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
