const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com o cofre (PostgreSQL)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Teste para ver se o gerente está acordado
app.get('/', (req, res) => {
  res.send('O Gerente do MyPlans está online na VPS!');
});

// Exemplo: Buscar tarefas do cofre real
app.get('/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao acessar o cofre' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Gerente rodando na porta ${PORT}`);
});
