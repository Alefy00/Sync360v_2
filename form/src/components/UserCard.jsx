import  { useState, useEffect } from 'react';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const UserCard = ({darkMode}) => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsersData();
  }, []);

  const handlePreviousUser = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? users.length - 1 : prevIndex - 1));
  };

  const handleNextUser = () => {
    setCurrentIndex((prevIndex) => (prevIndex === users.length - 1 ? 0 : prevIndex + 1));
  };

  const handleDeleteUser = async () => {
    try {
      const userIdToDelete = users[currentIndex].id;
      await axios.delete(`http://localhost:5000/api/users/${userIdToDelete}`);
      const updatedUsers = users.filter((user, index) => index !== currentIndex);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return  (
    <div className={`p-4 rounded-lg mx-auto w-full md:w-2/3 lg:w-1/2  ${darkMode ? 'bg-zinc-800 ring-slate-900/5 shadow-xl text-white' : 'bg-white text-gray-900'} shadow-lg`}
    >
      <div className="p-4 grid grid-cols-2 gap-4">
        {users.length > 0 ? (
          <>
            <div className="col-span-1 py-1">
              <h2 className="text-lg font-semibold py-1 ">{users[currentIndex].name}</h2>
              <p className="text-sm py-1">Idade: {users[currentIndex].age}</p>
              <p className="text-sm ">Rua: {users[currentIndex].street}</p>
              <p className="text-sm py-1">Bairro: {users[currentIndex].neighborhood}</p>
              <p className="text-sm ">Estado: {users[currentIndex].state}</p>
              <p className="text-sm py-1">Biografia: {users[currentIndex].biography}</p>
            </div>
            <div className="col-span-1">
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
          <p>Carregando usuário...</p>
        )}
      </div>
      <div className="flex justify-center items-center gap-14 mt-4">
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

export default UserCard;
