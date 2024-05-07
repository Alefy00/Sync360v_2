import  { useState } from 'react';

// eslint-disable-next-line react/prop-types
const UserForm = ({ onSubmit, initialValues, darkMode }) => {
  // Use useState para rastrear os valores do formulário
  const [values, setValues] = useState(initialValues || {});

  // Defina a função para limpar os campos do formulário
  const clearForm = () => {
    setValues(initialValues || {});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setValues((prevValues) => ({
      ...prevValues,
      profile_img: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    onSubmit(formData);

    // Limpe os campos do formulário após o envio bem-sucedido
    clearForm();
  };

  return (
    <form onSubmit={handleSubmit} className={`p-10 mt-20 mx-auto w-full md:w-2/3 lg:w-1/2 rounded-lg   ${darkMode ? 'bg-zinc-800 ring-slate-900/5 shadow-xl text-white' : 'bg-white text-gray-900'} shadow-lg`}>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="name">
          Nome:
        </label>
        <input
          className="shadow-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          name="name"
          value={values.name || ''}
          onChange={handleChange}
          
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="age">
          Idade:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="age"
          type="number"
          name="age"
          value={values.age || ''}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="street">
          Rua:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="street"
          type="text"
          name="street"
          value={values.street || ''}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="neighborhood">
          Bairro:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="neighborhood"
          type="text"
          name="neighborhood"
          value={values.neighborhood || ''}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="state">
          Estado:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="state"
          type="text"
          name="state"
          value={values.state || ''}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="biography">
          Biografia:
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="biography"
          name="biography"
          value={values.biography || ''}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="profile_img">
          Foto de Perfil:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
          id="profile_img"
          type="file"
          accept="image/*"
          name="profile_img"
          onChange={handleFileChange}
        />
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 container mx-auto mt-5"
      >
        Enviar
      </button>
    </form>
  );
};

export default UserForm;
