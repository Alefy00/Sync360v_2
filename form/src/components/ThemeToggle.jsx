// eslint-disable-next-line react/prop-types
function ThemeToggle({ darkMode, setDarkMode }) {
  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full mt-8 mb-10 ${darkMode ? 'bg-white' : 'bg-black'} 
                  ${darkMode ? 'text-black' : 'text-white'} shadow-md focus:outline-none`}
    >
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}

export default ThemeToggle;
