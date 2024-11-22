const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'template')));

// Conectar ao banco de dados MySQL
const db = mysql.createConnection({
    host: '3.92.244.186',
    user: 'peixe',
    password: '123',
    database: 'crud_db2'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados!');
});

// Endpoint para inserir dados
app.post('/api/contatos', (req, res) => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ error: 'Nome e email são obrigatórios!' });
    }

    const sql = 'INSERT INTO contato (nome, email) VALUES (?, ?)';
    db.query(sql, [nome, email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao cadastrar contato' });
        }
        res.json({ message: 'Contato cadastrado com sucesso!', id: result.insertId });
    });
});

// Endpoint para listar dados
app.get('/api/contatos', (req, res) => {
    const sql = 'SELECT * FROM contato';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao listar contatos' });
        }
        res.json(results);
    });
});

// Endpoint para editar dados
app.put('/api/contatos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ error: 'Nome e email são obrigatórios!' });
    }

    const sql = 'UPDATE contato SET nome = ?, email = ? WHERE id = ?';
    db.query(sql, [nome, email, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao atualizar contato' });
        }
        res.json({ message: 'Contato atualizado com sucesso!' });
    });
});

// Endpoint para excluir dados
app.delete('/api/contatos/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM contato WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao excluir contato' });
        }
        res.json({ message: 'Contato excluído com sucesso!' });
    });
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
