import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter, FiMail, FiPhone, FiMapPin, FiArrowRight, FiSend } from 'react-icons/fi';
import { useTheme } from '../../lib/ThemeContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();

  return (
    <footer className={`${theme === 'dark' ? 'bg-black border-t border-gray-800' : 'bg-gradient-to-r from-secondary-900 to-secondary-800'} text-white pt-16 pb-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter */}
        <div className={`relative mb-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-r from-primary-600 to-primary-500'} rounded-xl py-8 px-6 md:px-10 shadow-lg -mt-24`}>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold text-white mb-2">Subscribe to our newsletter</h3>
              <p className="text-white text-opacity-90">Stay updated with our latest products and promotions</p>
            </div>
            <form className="w-full md:w-auto flex-1 max-w-md">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 rounded-full text-gray-800 dark:text-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className={`absolute right-1 top-1 bottom-1 ${theme === 'dark' ? 'bg-primary-600 hover:bg-primary-500' : 'bg-primary-700 hover:bg-primary-800'} text-white rounded-full w-10 flex items-center justify-center transition-colors`}
                >
                  <FiSend />
                </button>
              </div>
            </form>
          </div>
          <div className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-12 h-12 ${theme === 'dark' ? 'bg-black' : 'bg-secondary-900'} rotate-45`}></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 flex items-center justify-center mr-3">
                <FiPhone className="h-5 w-5 text-white transform rotate-45" />
              </div>
              <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">ClickFix</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Your one-stop shop for premium electronic devices and professional repair services. We're committed to delivering the best tech experience.
            </p>
            <div className="flex space-x-5">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white bg-gray-700 hover:bg-primary-600 p-2 rounded-full transition-colors duration-300">
                <FiFacebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white bg-gray-700 hover:bg-primary-600 p-2 rounded-full transition-colors duration-300">
                <FiInstagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white bg-gray-700 hover:bg-primary-600 p-2 rounded-full transition-colors duration-300">
                <FiTwitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-gray-300 hover:text-primary-400 flex items-center transition-colors">
                  <FiArrowRight className="mr-2 h-4 w-4 text-primary-500" /> Shop Products
                </Link>
              </li>
              <li>
                <Link to="/repairs" className="text-gray-300 hover:text-primary-400 flex items-center transition-colors">
                  <FiArrowRight className="mr-2 h-4 w-4 text-primary-500" /> Repair Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary-400 flex items-center transition-colors">
                  <FiArrowRight className="mr-2 h-4 w-4 text-primary-500" /> About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary-400 flex items-center transition-colors">
                  <FiArrowRight className="mr-2 h-4 w-4 text-primary-500" /> Contact Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-primary-400 flex items-center transition-colors">
                  <FiArrowRight className="mr-2 h-4 w-4 text-primary-500" /> Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              Customer Service
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-primary-400 flex items-center transition-colors">
                  <FiArrowRight className="mr-2 h-4 w-4 text-primary-500" /> FAQs
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-primary-400 flex items-center transition-colors">
                  <FiArrowRight className="mr-2 h-4 w-4 text-primary-500" /> Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-primary-400 flex items-center transition-colors">
                  <FiArrowRight className="mr-2 h-4 w-4 text-primary-500" /> Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-primary-400 flex items-center transition-colors">
                  <FiArrowRight className="mr-2 h-4 w-4 text-primary-500" /> Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-primary-400 flex items-center transition-colors">
                  <FiArrowRight className="mr-2 h-4 w-4 text-primary-500" /> Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary-500 rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FiMapPin className="h-5 w-5 mr-3 text-primary-500 mt-1" />
                <span className="text-gray-300">123 Tech Street, Digital City, CA 94043</span>
              </li>
              <li className="flex items-center">
                <FiPhone className="h-5 w-5 mr-3 text-primary-500" />
                <a href="tel:+1234567890" className="text-gray-300 hover:text-primary-400 transition-colors">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <FiMail className="h-5 w-5 mr-3 text-primary-500" />
                <a href="mailto:info@clickfix.com" className="text-gray-300 hover:text-primary-400 transition-colors">
                  info@clickfix.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={`border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-700'} mt-12 pt-8 flex flex-col md:flex-row justify-between items-center`}>
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} ClickFix. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <img
              src="/images/visa.svg"
              alt="Visa"
              className="h-8 dark:bg-white dark:rounded dark:p-1"
              onError={(e) => {
                e.target.src = '/images/product-placeholder.jpg';
                e.target.style.opacity = '0.5';
              }}
            />
            <img
              src="/images/mastercard.svg"
              alt="Mastercard"
              className="h-8 dark:bg-white dark:rounded dark:p-1"
              onError={(e) => {
                e.target.src = '/images/product-placeholder.jpg';
                e.target.style.opacity = '0.5';
              }}
            />
            <img
              src="/images/amex.svg"
              alt="American Express"
              className="h-8 dark:bg-white dark:rounded dark:p-1"
              onError={(e) => {
                e.target.src = '/images/product-placeholder.jpg';
                e.target.style.opacity = '0.5';
              }}
            />
            <img
              src="/images/paypal.svg"
              alt="PayPal"
              className="h-8 dark:bg-white dark:rounded dark:p-1"
              onError={(e) => {
                e.target.src = '/images/product-placeholder.jpg';
                e.target.style.opacity = '0.5';
              }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 