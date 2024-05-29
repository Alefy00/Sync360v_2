# Sync360v_2


## Visão Geral

O Sync360v_2 é uma aplicação web desenvolvida para gerenciar informações de usuários, permitindo o cadastro, visualização, atualização e exclusão de registros. O projeto foi desenvolvido utilizando uma arquitetura cliente-servidor, onde o frontend é construído em React.js, o backend em Node.js com o framework Express.js e o banco de dados utilizado é o SQLite.

## Funcionalidades

1. **Cadastro de Usuários**: Os usuários podem ser cadastrados através de um formulário no frontend, fornecendo informações como nome, idade, endereço, biografia e uma imagem de perfil opcional.
2. **Visualização de Usuários**: Os usuários cadastrados podem ser visualizados em um formato de cartão, onde são exibidas informações como nome, idade, endereço, biografia e imagem de perfil. Os usuários podem navegar entre os registros utilizando os botões "Anterior" e "Próximo".
3. **Atualização de Usuários**: As informações de um usuário podem ser atualizadas através de um formulário no frontend.
4. **Exclusão de Usuários**: Os usuários cadastrados podem ser excluídos individualmente.

## Arquitetura

### Frontend (Cliente)
- **Tecnologia**: React.js
- **Estilização**: Tailwind CSS
- **Funcionamento**: O frontend é responsável por exibir a interface de usuário e interagir com o usuário. Ele consome a API fornecida pelo backend para enviar e receber dados do servidor.

### Backend (Servidor)
- **Tecnologia**: Node.js, Express.js
- **Banco de Dados**: SQLite
- **Funcionamento**: O backend fornece uma API RESTful para interação com o banco de dados. Ele recebe requisições HTTP do frontend, processa as informações e realiza operações no banco de dados conforme necessário.

## Endpoints da API

1. **GET /api/users**: Retorna todos os usuários cadastrados.
2. **POST /api/users**: Cria um novo usuário com as informações fornecidas.
3. **GET /api/users/:id**: Retorna as informações de um usuário específico com base no ID fornecido.
4. **PUT /api/users/:id**: Atualiza as informações de um usuário específico com base no ID fornecido.
5. **DELETE /api/users/:id**: Exclui um usuário específico com base no ID fornecido.

{

    "name": "Novo Nome",
    "age": 30,
    "street": "Nova Rua",
    "neighborhood": "Novo Bairro",
    "state": "Novo Estado",
    "biography": "Nova Biografia"
}

## Instalação e Execução

### Pré-requisitos
- Node.js
- npm (gerenciador de pacotes do Node.js)

### Instalação
1. Clone o repositório do projeto: `git clone https://github.com/Alefy00/Sync360v_2.git`
2. Navegue até o diretório do projeto: `cd sync360v_2`
3. Instale as dependências do frontend e do backend:
   - Frontend: `cd form && npm install`
   - Backend: `cd backend && npm install`

### Configuração do Banco de Dados
1. Certifique-se de que o SQLite esteja instalado no seu sistema.
2. Crie um arquivo de banco de dados SQLite (por exemplo, database.db) no diretório backend.
3. Execute o script de criação do banco de dados: `node database/db-init.js`

### Execução
1. Inicie o backend: `cd backend && node index.js`
2. Inicie o frontend: `cd form && npm run dev`
3. Acesse a aplicação em um navegador: http://localhost:5173/

## Contribuição

Contribuições para o projeto são bem-vindas. Sinta-se à vontade para abrir problemas (issues) para relatar bugs ou sugerir novas funcionalidades. Você também pode enviar pull requests com correções ou melhorias.

## Autor

Alefy Xavier

