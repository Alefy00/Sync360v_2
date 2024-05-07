const sqlite3 = require('sqlite3').verbose();

// Caminho para o arquivo do banco de dados
const dbPath = 'database.db';

// Abre o banco de dados
const db = new sqlite3.Database(dbPath);

// Query para criar a tabela de usuários, se ela não existir
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        age INTEGER,
        street TEXT,
        neighborhood TEXT,
        state TEXT,
        biography TEXT,
        profile_img TEXT
    )
`;

// Executa a query de criação da tabela
db.run(createTableQuery, (err) => {
    if (err) {
        console.error('Erro ao criar tabela:', err.message);
    } else {
        console.log('Tabela de usuários criada com sucesso.');

        // Consulta para selecionar todos os usuários
        const query = 'SELECT * FROM users';

        // Executa a consulta
        db.all(query, (err, rows) => {
            if (err) {
                console.error(err.message);
                return;
            }
            // Exibe os resultados da consulta
            rows.forEach(row => {
                console.log(row);
            });
        });
    }
});

// Fecha o banco de dados após as operações
db.close();
