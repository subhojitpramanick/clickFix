import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';
import { useCart } from '../../lib/CartContext';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch, FiTool, FiHome, FiPhone } from 'react-icons/fi';
import ThemeToggle from '../ui/ThemeToggle';

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const { itemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality
    console.log('Searching for:', searchQuery);
    // Redirect to search results page
  };

  // Check if a link is active
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Get active link class
  const getNavLinkClass = (path) => {
    const baseClasses = "px-3 py-2 font-medium transition-all duration-200 rounded-md";
    return isActive(path)
      ? `${baseClasses} text-white bg-primary-600 dark:bg-primary-500 dark:text-black shadow-sm`
      : `${baseClasses} text-gray-700 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800`;
  };

  return (
    <nav className={`${scrolled ? 'py-2 shadow-lg bg-white dark:bg-black' : 'py-3 md:py-4 bg-white dark:bg-black shadow-md'} sticky top-0 z-50 transition-all duration-300`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 flex items-center justify-center shadow-md">
                <FiPhone className="h-5 w-5 text-white transform rotate-45" />
              </div>
              <span className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700 dark:from-primary-400 dark:to-primary-600">ClickFix</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-3">
            {/* Navigation Links */}
            <Link
              to="/"
              className={getNavLinkClass('/')}
            >
              <div className="flex items-center">
                <FiHome className="mr-1.5" /> Home
              </div>
            </Link>
            <Link
              to="/products"
              className={getNavLinkClass('/products')}
            >
              <div className="flex items-center">
                Products
              </div>
            </Link>
            <Link
              to="/repairs"
              className={getNavLinkClass('/repairs')}
            >
              <div className="flex items-center">
                <FiTool className="mr-1.5" /> Repairs
              </div>
            </Link>

            {/* Search Bar */}
            <div className="relative ml-4">
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 w-44 focus:w-64 dark:bg-gray-900 dark:text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400 dark:text-gray-300" />
                </div>
              </form>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle className="ml-2" />

            {/* Auth Links */}
            {isAuthenticated ? (
              <Link
                to="/account"
                className={getNavLinkClass('/account')}
              >
                <div className="flex items-center">
                  <FiUser className="mr-1.5" /> Account
                </div>
              </Link>
            ) : (
              <Link
                to="/login"
                className={getNavLinkClass('/login')}
              >
                <div className="flex items-center">
                  <FiUser className="mr-1.5" /> Sign In
                </div>
              </Link>
            )}

            {/* Cart Icon */}
            <Link
              to="/cart"
              className={getNavLinkClass('/cart')}
            >
              <div className="flex items-center">
                <FiShoppingCart className="mr-1.5" /> Cart
                {itemCount > 0 && (
                  <span className="ml-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {itemCount}
                  </span>
                )}
              </div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            {/* Theme Toggle */}
            <ThemeToggle className="mr-2" />
            
            <Link
              to="/cart"
              className={`mr-4 relative ${isActive('/cart') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-white hover:text-primary-600 dark:hover:text-primary-400'}`}
            >
              <FiShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-black"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 mt-2 shadow-lg transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-3 space-y-2">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-900 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400 dark:text-gray-300" />
              </div>
              <button
                type="submit"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <span className="text-primary-600 dark:text-primary-400 font-medium">Search</span>
              </button>
            </div>
          </form>

          <Link
            to="/"
            className={`block rounded-lg ${isActive('/') 
              ? 'bg-primary-50 dark:bg-gray-900 text-primary-700 dark:text-primary-400 font-semibold' 
              : 'text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900'} px-4 py-3 text-base flex items-center`}
          >
            <FiHome className="mr-3" /> Home
          </Link>
          
          <Link
            to="/products"
            className={`block rounded-lg ${isActive('/products') 
              ? 'bg-primary-50 dark:bg-gray-900 text-primary-700 dark:text-primary-400 font-semibold' 
              : 'text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900'} px-4 py-3 text-base flex items-center`}
          >
            <span className="mr-3">🛒</span> Products
          </Link>
          
          <Link
            to="/repairs"
            className={`block rounded-lg ${isActive('/repairs') 
              ? 'bg-primary-50 dark:bg-gray-900 text-primary-700 dark:text-primary-400 font-semibold' 
              : 'text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900'} px-4 py-3 text-base flex items-center`}
          >
            <FiTool className="mr-3" /> Repair Services
          </Link>
          
          {isAuthenticated ? (
            <Link
              to="/account"
              className={`block rounded-lg ${isActive('/account') 
                ? 'bg-primary-50 dark:bg-gray-900 text-primary-700 dark:text-primary-400 font-semibold' 
                : 'text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900'} px-4 py-3 text-base flex items-center`}
            >
              <FiUser className="mr-3" /> My Account
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className={`block rounded-lg ${isActive('/login') 
                  ? 'bg-primary-50 dark:bg-gray-900 text-primary-700 dark:text-primary-400 font-semibold' 
                  : 'text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900'} px-4 py-3 text-base flex items-center`}
              >
                <FiUser className="mr-3" /> Sign In
              </Link>
              <Link
                to="/register"
                className="block rounded-lg bg-primary-600 dark:bg-primary-500 text-white dark:text-black px-4 py-3 text-base font-medium flex items-center justify-center mt-2"
              >
                Create Account
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 