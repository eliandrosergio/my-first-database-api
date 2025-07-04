const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 3040;
const DB_FILE = path.join(__dirname, 'users.json');

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Função para carregar usuários do arquivo JSON
async function loadUsers() {
  try {
    const data = await fs.readFile(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      // Se o arquivo não existe, inicializa com um array vazio e contador
      return { users: [], counter: { name: 'userId', seq: 0 } };
    }
    throw err;
  }
}

// Função para salvar usuários no arquivo JSON
async function saveUsers(data) {
  try {
    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    throw err;
  }
}

// Função para obter o próximo ID
async function getNextId() {
  const data = await loadUsers();
  data.counter.seq += 1;
  await saveUsers(data);
  return data.counter.seq;
}

// Validações para a rota de criação
const userValidationRules = [
  body('nome').isString().notEmpty().withMessage('Nome é obrigatório'),
  body('idade').optional().isInt({ min: 0 }).withMessage('Idade deve ser um número não negativo'),
  body('dataAdesao').isISO8601().toDate().withMessage('Data de adesão inválida'),
  body('dataNascimento').isISO8601().toDate().withMessage('Data de nascimento inválida'),
  body('sexo').isIn(['M', 'F', 'Outro']).isString().notEmpty().withMessage('Sexo deve ser M, F ou Outro')
];

// Rota para criar usuário
app.post('/api/users', userValidationRules, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userData = req.body;
    userData.id = await getNextId(); // Gera o ID automaticamente

    const data = await loadUsers();
    data.users.push(userData);
    await saveUsers(data);

    res.status(201).json(userData);
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para buscar usuário por parâmetro
app.get('/api/get/:paramType/:paramValue', async (req, res) => {
  try {
    const { paramType, paramValue } = req.params;
    const data = await loadUsers();
    let user;

    switch (paramType.toLowerCase()) {
      case 'id':
        user = data.users.find(u => u.id === parseInt(paramValue));
        break;
      case 'nome':
        user = data.users.find(u => u.nome === paramValue);
        break;
      default:
        return res.status(400).json({ error: 'Tipo de parâmetro inválido. Use id ou nome' });
    }

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(user);
  } catch (err) {
    console.error('Erro ao buscar usuário:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Manipulador de erros
app.use((err, req, res, next) => {
  console.error('Erro:', err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Manipular encerramento do servidor
process.on('SIGTERM', () => {
  console.log('Encerrando servidor...');
  process.exit(0);
});

