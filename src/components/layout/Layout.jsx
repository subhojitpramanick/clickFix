import { useState, useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { FiArrowUp } from 'react-icons/fi';
import { useTheme } from '../../lib/ThemeContext';

const Layout = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Handle scroll-to-top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Apply the theme class to the HTML element
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black transition-colors duration-200">
      <Navbar />
      <main className="flex-grow w-full max-w-full text-gray-900 dark:text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
          <Outlet />
        </div>
      </main>
      <Footer />

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-primary-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 z-50 ${
          showScrollTop ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <FiArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Layout; 