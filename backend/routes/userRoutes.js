const express = require('express');
const router = express.Router();
const multer = require('multer'); 
const path = require('path');
const fs = require('fs');

// Certifique-se de que o diretório de destino para salvar as imagens existe
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configuração do multer para salvar as imagens de perfil no diretório 'uploads'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
});
  
const upload = multer({ storage: storage });

// Crie o construtor do roteador
function UserRoutes(db) {


//Rota para obter informações do usuário
router.get('/:id', (req, res) => {
    const {id} = req.params;
    db.get('SELECT * FROM users WHERE id  = ?', [id], (err, row) =>{
        if (err){
            console.error('Erro ao buscar usuário: ', err.message);
            res.status(500).json({error: 'Erro ao buscar usuário'});
            return;
        }
        if (!row){
            res.status(404).json({error: 'Usuário não encontrado'});
            return;
        }
        res.json(row);
    });
});

//Rota para atualizar informações do usuário
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, age, street, neighborhood, state, biography, profile_img } = req.body;
    db.run('UPDATE users SET name = ?, age = ?, street = ?, neighborhood = ?, state = ?, biography = ?, profile_img = ? WHERE id = ?', [name, age, street, neighborhood, state, biography,profile_img, id], function(err) {
        if (err) {
            console.error('Erro ao atualizar usuário:', err.message);
            res.status(500).json({ error: 'Erro ao atualizar usuário' });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }
        res.json({ message: 'Informações do usuário atualizadas com sucesso' });
    });
});

//Rota para adicionar novo usuário
router.post('/', upload.single('profile_img'), (req, res) =>{
    console.log(req.file)
    const { name, age, street, neighborhood, state, biography} = req.body;
    const { filename } = req.file; // Nome do arquivo de imagem salvo
    if (!filename) {
      res.status(400).json({ error: 'Imagem de perfil não fornecida' });
      return;
    }
    const values = [name, age, street, neighborhood, state, biography, filename];
    const placeholders = values.map(() => '?').join(',');
    const insertQuery = `INSERT INTO users (name, age, street, neighborhood, state, biography, profile_img) VALUES (${placeholders})`;
    db.run(insertQuery, values, function(err){
      if (err){
        console.error('Erro ao adicionar usuário: ', err.message);
        res.status(500).json({error: 'Erro ao adicionar usuário'});
        return;
      }
      res.json({message: 'Usuário adicionado com sucesso', userId: this.lastID });
    });
  });
  


//Rota para excluir usuário
router.delete('/:id', (req, res) =>{
    const { id } = req.params;
    db.run('DELETE FROM users WHERE id = ?', [id], function(err){
        if(err){
            console.error('Erro ao excluir usuário: ', err.message)
            res.status(500).json({error: 'Error ao excluir usuário'});
            return;
        }
        if(this.changes === 0){
            res.status(404).json({error: 'Usuário não encontrado'});
            return;
        }
        res.json({message: 'Usuário excluído com sucesso'});
    });
});


//rota para buscar todos os usuários
router.get('/', (req, res) => {
    db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
            console.error('Erro ao buscar usuários:', err.message);
            res.status(500).json({ error: 'Erro ao buscar usuários' });
            return;
        }
        res.json(rows);
    });
});
return router;
}

module.exports = UserRoutes;
