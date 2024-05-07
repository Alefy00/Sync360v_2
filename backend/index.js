const express = require('express'); // Importa o framework Express
const sqlite3 = require('sqlite3').verbose(); // Importa o SQLite3
const UserRoutes = require('./routes/userRoutes'); // Importa o construtor do roteador UserRoutes
const cors = require('cors'); // Importa o módulo CORS para lidar com solicitações de diferentes origens

const app = express();  // Cria uma instância do aplicativo Express

const PORT = process.env.PORT || 5000; // Define a porta do servidor

// Permitir solicitações CORS de qualquer origem
app.use(cors());


// Caminho para o arquivo do banco de dados
const dbPath = '../database.db';

// Abre o banco de dados
const db = new sqlite3.Database(dbPath);

// Configuração para servir arquivos estáticos
app.use('/uploads', express.static('uploads'));


// Middleware para lidar com o corpo da requisições JSON
app.use(express.json());

// Crie uma instância do roteador, passando o objeto db
const userRoutes = new UserRoutes(db);

// Rotas dos usuários
app.use('/api/users', userRoutes);

// Rota padrão para verificar se o servidor está rodando
app.get('/', (req, res) => {
  res.send('Servidor está rodando!');
});

// Inicia o servidor
const server = app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});

// Manipulador de eventos para fechar a conexão com o banco de dados quando o servidor for encerrado
process.on('SIGINT', () => {
  console.log('Servidor está sendo encerrado. Fechando conexão com o banco de dados...');
  db.close((err) => {
    if (err) {
      console.error('Erro ao fechar conexão com o banco de dados:', err.message);
    } else {
      console.log('Conexão com o banco de dados fechada com sucesso.');
    }
    // Encerra o servidor após fechar a conexão com o banco de dados
    server.close(() => {
      console.log('Servidor encerrado.');
    });
  });
});
