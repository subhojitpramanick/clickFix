import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiTool, FiShield, FiTruck, FiCreditCard } from 'react-icons/fi';
import { useTheme } from '../lib/ThemeContext';

// Mock data for featured products and services
// In a real application, this would come from Supabase
const featuredProducts = [
  {
    id: 1,
    name: 'Smartphone Pro X',
    price: 899,
    image: '/smartphone.jpg',
    category: 'Smartphones',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Laptop Ultra Slim',
    price: 1299,
    image: '/laptop.jpg',
    category: 'Laptops',
    rating: 4.7,
  },
  {
    id: 3,
    name: 'Smart Watch Series 5',
    price: 299,
    image: '/smartwatch.jpg',
    category: 'Wearables',
    rating: 4.6,
  },
  {
    id: 4,
    name: 'Wireless Earbuds Pro',
    price: 159,
    image: '/earbuds.jpg',
    category: 'Audio',
    rating: 4.5,
  },
];

const repairServices = [
  {
    id: 1,
    name: 'Screen Repair',
    description: 'Screen replacement for smartphones, tablets, and laptops',
    image: '/screen-repair.jpg',
    basePrice: 49,
  },
  {
    id: 2,
    name: 'Battery Replacement',
    description: 'Battery replacement for all devices with same-day service',
    image: '/battery-repair.jpg',
    basePrice: 39,
  },
  {
    id: 3,
    name: 'Water Damage Repair',
    description: 'Professional water damage assessment and repair',
    image: '/water-damage.jpg',
    basePrice: 79,
  },
];

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className={`${theme === 'dark' ? 'bg-gradient-to-r from-gray-900 to-black border-b border-gray-800' : 'bg-gradient-to-r from-primary-700 to-primary-500'} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Tech Solutions for Modern Life
              </h1>
              <p className="text-xl mb-8">
                Shop the latest electronics and get expert repair services for all your devices.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className={`${theme === 'dark' ? 'bg-primary-600 text-white hover:bg-primary-500' : 'bg-white text-primary-700 hover:bg-gray-100'} px-6 py-3 rounded-md font-medium flex items-center`}
                >
                  Shop Now <FiArrowRight className="ml-2" />
                </Link>
                <Link
                  to="/repairs"
                  className={`${theme === 'dark' ? 'bg-transparent border-2 border-gray-700 hover:bg-gray-800' : 'bg-transparent border-2 border-white hover:bg-white hover:text-primary-700'} text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center`}
                >
                  Repair Services <FiTool className="ml-2" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="/hero-image.jpg"
                alt="Electronics showcase"
                className="rounded-lg shadow-xl"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400?text=Electronics+Showcase';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50 dark:bg-black dark:border-t dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <FiTruck className="h-12 w-12 text-primary-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Free Shipping</h3>
              <p className="text-gray-600 dark:text-gray-300">On all orders over $50</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <FiShield className="h-12 w-12 text-primary-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">1 Year Warranty</h3>
              <p className="text-gray-600 dark:text-gray-300">On all products and repairs</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <FiCreditCard className="h-12 w-12 text-primary-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Secure Payment</h3>
              <p className="text-gray-600 dark:text-gray-300">100% secure payment</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <FiTool className="h-12 w-12 text-primary-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Expert Support</h3>
              <p className="text-gray-600 dark:text-gray-300">24/7 customer support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Featured Products</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover our selection of the latest and greatest electronic devices and appliances.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="animate-pulse bg-white dark:bg-gray-900 rounded-lg shadow-md p-4">
                  <div className="bg-gray-300 dark:bg-gray-700 h-48 rounded-md mb-4"></div>
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <Link to={`/products/${product.id}`} key={product.id} className="group">
                  <div className="bg-white dark:bg-gray-900 dark:border dark:border-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/300x200?text=${product.name}`;
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{product.category}</div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{product.name}</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-primary-600 dark:text-primary-400 font-bold">${product.price}</span>
                        <div className="flex items-center">
                          <span className="text-yellow-400">★</span>
                          <span className="text-gray-600 dark:text-gray-300 ml-1">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium hover:text-primary-800 dark:hover:text-primary-300"
            >
              View All Products <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Repair Services Section */}
      <section className="py-16 bg-gray-50 dark:bg-black dark:border-t dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Repair Services</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Professional repair services for all your electronic devices. Fast, reliable, and affordable.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="animate-pulse bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
                  <div className="bg-gray-300 dark:bg-gray-700 h-40 rounded-md mb-4"></div>
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {repairServices.map((service) => (
                <Link to={`/repairs/${service.id}`} key={service.id}>
                  <div className="bg-white dark:bg-gray-900 dark:border dark:border-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full">
                    <div className="h-40 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/400x250?text=${service.name}`;
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">{service.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
                      <div className="text-primary-600 dark:text-primary-400 font-bold">Starting at ${service.basePrice}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/repairs"
              className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium hover:text-primary-800 dark:hover:text-primary-300"
            >
              View All Repair Services <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={`${theme === 'dark' ? 'bg-gray-900 border-t border-gray-800' : 'bg-primary-600'} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Fix Your Device?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Schedule a repair appointment today and get your device fixed by our expert technicians.
          </p>
          <Link
            to="/repairs/book"
            className={`${theme === 'dark' ? 'bg-primary-600 text-white hover:bg-primary-500' : 'bg-white text-primary-700 hover:bg-gray-100'} px-8 py-3 rounded-md font-medium inline-flex items-center`}
          >
            Book an Appointment <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 