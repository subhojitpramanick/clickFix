import { useTheme } from '../../lib/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className={`relative p-2 overflow-hidden rounded-full transition-all duration-300 ${
        theme === 'dark' 
          ? 'bg-gray-900 text-yellow-400 hover:bg-gray-800 hover:text-yellow-300 border border-gray-700' 
          : 'bg-gray-100 text-blue-600 hover:bg-gray-200 hover:text-blue-700'
      } ${className}`}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative z-10 transform transition-transform duration-500 rotate-0">
        {theme === 'dark' ? (
          <FiSun className="h-5 w-5" />
        ) : (
          <FiMoon className="h-5 w-5" />
        )}
      </div>
      <div className={`absolute inset-0 rounded-full transform scale-0 transition-transform duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
      }`}></div>
    </button>
  );
};

export default ThemeToggle; 