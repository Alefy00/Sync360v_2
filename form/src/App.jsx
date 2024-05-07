import './App.css';
import { useState } from 'react';
import UserForm from './components/UserForm';
import axios from 'axios';
import UserCard from './components/UserCard';
import ThemeToggle from './components/ThemeToggle';




function App() {
  const initialValues = {
    name: '',
    age: '',
    street: '',
    neighborhood: '',
    state: '',
    biography: '',
    profile_img: null,
  };

  const [darkMode, setDarkMode] = useState(false);

  // Defina o estado para os valores do formulário e uma função para atualizá-los
  const [formValues, setFormValues] = useState(initialValues);


  const handleSubmit = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Resposta do servidor:', response.data);

      // Limpe os valores do formulário após o envio bem-sucedido
      setFormValues(initialValues);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    }
  };

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <div className="container mx-auto p-4">
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode}/>
      <UserCard  darkMode={darkMode} />
      <UserForm onSubmit={handleSubmit} formValues={formValues} setFormValues={setFormValues}  darkMode={darkMode}  />
    </div>
    </div>
  );
}

export default App;
