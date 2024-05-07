import  { useState, useEffect } from 'react';
import axios from 'axios';

// Componente funcional UserCard
// Recebe uma propriedade darkMode para alternar entre temas escuros e claros
// eslint-disable-next-line react/prop-types
const UserCard = ({darkMode}) => {
  // State para armazenar os usuários e o índice do usuário atual
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Efeito que é executado após a montagem do componente
  useEffect(() => {
    // Função assíncrona para buscar dados dos usuários
    const fetchUsersData = async () => {
      try {
        // Requisição HTTP GET para obter os usuários
        const response = await axios.get('http://localhost:5000/api/users');
        // Atualiza o estado com os dados dos usuários obtidos na resposta
        setUsers(response.data);
      } catch (error) {
        // Em caso de erro, imprime o erro no console
        console.error('Error fetching users:', error);
      }
    };

    // Chama a função para buscar os dados dos usuários
    fetchUsersData();
  }, []); // Dependência vazia, para garantir que o efeito seja executado apenas uma vez após a montagem

  // Função para lidar com a ação de exibir o usuário anterior
  const handlePreviousUser = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? users.length - 1 : prevIndex - 1));
  };

  // Função para lidar com a ação de exibir o próximo usuário
  const handleNextUser = () => {
    setCurrentIndex((prevIndex) => (prevIndex === users.length - 1 ? 0 : prevIndex + 1));
  };

  // Função para lidar com a ação de excluir um usuário
  const handleDeleteUser = async () => {
    try {
      // Obtém o ID do usuário a ser excluído com base no índice atual
      const userIdToDelete = users[currentIndex].id;
      // Requisição HTTP DELETE para excluir o usuário com o ID obtido
      await axios.delete(`http://localhost:5000/api/users/${userIdToDelete}`);
      // Atualiza a lista de usuários excluindo o usuário removido
      const updatedUsers = users.filter((user, index) => index !== currentIndex);
      setUsers(updatedUsers);
    } catch (error) {
      // Em caso de erro, imprime o erro no console
      console.error('Error deleting user:', error);
    }
  };

  // Retorna a interface do usuário
  return  (
    <div className={`p-4 rounded-lg mx-auto w-full md:w-2/3 lg:w-1/2  ${darkMode ? 'bg-zinc-800 ring-slate-900/5 shadow-xl text-white' : 'bg-white text-gray-900'} shadow-lg`}
    >
      <div className="p-4 grid grid-cols-2 gap-4">
        {users.length > 0 ? ( // Verifica se há usuários disponíveis
          <> {/* Fragmento vazio para agrupar elementos filhos */}
            <div className="col-span-1 py-1">
              {/* Exibe informações do usuário atual */}
              <h2 className="text-lg font-semibold py-1 ">{users[currentIndex].name}</h2>
              <p className="text-sm py-1">Idade: {users[currentIndex].age}</p>
              <p className="text-sm ">Rua: {users[currentIndex].street}</p>
              <p className="text-sm py-1">Bairro: {users[currentIndex].neighborhood}</p>
              <p className="text-sm ">Estado: {users[currentIndex].state}</p>
              <p className="text-sm py-1">Biografia: {users[currentIndex].biography}</p>
            </div>
            <div className="col-span-1">
              {/* Exibe a imagem de perfil do usuário, se disponível */}
              {users[currentIndex].profile_img ? (
                <img
                  src={`http://localhost:5000/uploads/${users[currentIndex].profile_img}`}
                  alt="Foto de Perfil"
                  className="mt-4 rounded-md object-cover h-40 w-full md:h-auto md:w-auto max-w-full max-h-40"
                />
              ) : (
                <p className="mt-4 text-red-500">Imagem de perfil não disponível.</p>
              )}
            </div>
          </>
        ) : (
          <p>Carregando usuário...</p> // Exibido enquanto os dados estão sendo carregados
        )}
      </div>
      <div className="flex justify-center items-center gap-14 mt-4">
        {/* Botões para exibir o usuário anterior, excluir o usuário atual e exibir o próximo usuário */}
        <button onClick={handlePreviousUser} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 md:mb-0 md:me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Anterior
        </button>
        <button onClick={handleDeleteUser} className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 md:mb-0 md:me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
          Excluir
        </button>
        <button onClick={handleNextUser} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 md:mb-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Próximo
        </button>
      </div>
    </div>
  );
};

export default UserCard; // Exporta o componente UserCard
