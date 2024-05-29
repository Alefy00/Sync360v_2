import './App.css'; // Importa o arquivo de estilo CSS
import { useState } from 'react'; // Importa o hook useState do React
import UserForm from './components/UserForm'; // Importa o componente UserForm
import axios from 'axios'; // Importa a biblioteca axios para fazer requisições HTTP
import UserCard from './components/UserCard'; // Importa o componente UserCard
import ThemeToggle from './components/ThemeToggle'; // Importa o componente ThemeToggle

// Componente principal App
function App() {
  // Define os valores iniciais para o formulário
  const initialValues = {
    name: '',
    age: '',
    street: '',
    neighborhood: '',
    state: '',
    biography: '',
    profile_img: null,
  };

  // Define o estado para o modo escuro e uma função para atualizá-lo
  const [darkMode, setDarkMode] = useState(false);

  // Define o estado para os valores do formulário e uma função para atualizá-los
  const [formValues, setFormValues] = useState(initialValues);

  // Função para lidar com o envio do formulário
  const handleSubmit = async (formData) => {
    try {
      // Envia os dados do formulário para o servidor utilizando axios
      const response = await axios.post('http://localhost:5000/api/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Exibe a resposta do servidor no console
      console.log('Resposta do servidor:', response.data);

      // Limpa os valores do formulário após o envio bem-sucedido
      setFormValues(initialValues);
    } catch (error) {
      // Em caso de erro, exibe o erro no console
      console.error('Erro ao enviar formulário:', error);
    }
  };

  // Retorna a interface do usuário
  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}> {/* Define a classe App com base no modo escuro */}
      <div className="container mx-auto p-4">

        {/* Componente ThemeToggle para alternar entre os modos de tema */}
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode}/>

        {/* Componente UserCard para exibir os detalhes do usuário */}
        <UserCard darkMode={darkMode} />
        
        {/* Componente UserForm para adicionar ou editar os detalhes do usuário */}
        <UserForm onSubmit={handleSubmit} initialValues={formValues} darkMode={darkMode} />
      </div>
    </div>
  );
}

export default App; // Exporta o componente App
