import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { useTheme } from '../lib/ThemeContext';
import Button from '../components/ui/Button';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Simulating login api call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, hardcoded check
      if (email === 'user@example.com' && password === 'password') {
        await login({ email, name: 'Demo User' });
        navigate('/account');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <div className="bg-white dark:bg-gray-900 dark:border dark:border-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">Login</h1>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4" role="alert">
            <p>{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-6">
            <Button 
              type="submit" 
              variant="primary" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </Button>
          </div>
        </form>
        
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300">
              Register here
            </Link>
          </p>
          
          <Link to="/forgot-password" className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300">
            Forgot your password?
          </Link>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-600 dark:text-gray-400 mb-4">Demo credentials:</p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm dark:text-gray-300">
            <p>Email: user@example.com</p>
            <p>Password: password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 