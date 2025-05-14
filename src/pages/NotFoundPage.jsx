import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useTheme } from '../lib/ThemeContext';

const NotFoundPage = () => {
  const { theme } = useTheme();
  
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
      <div className="mb-8">
        <h1 className="text-9xl font-bold text-primary-600 dark:text-primary-400">404</h1>
      </div>
      
      <h2 className="text-3xl font-bold mb-4 dark:text-white">Page Not Found</h2>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>
      
      <div className="space-x-4">
        <Link to="/">
          <Button variant="primary">
            Go to Homepage
          </Button>
        </Link>
        <Link to="/products">
          <Button variant="secondary">
            Browse Products
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage; 