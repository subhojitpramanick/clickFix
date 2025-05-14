import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiSearch, FiTool } from 'react-icons/fi';
import ServiceCard from '../components/repairs/ServiceCard';

// Mock data for repair services
const serviceData = [
  {
    id: 1,
    name: 'Screen Repair',
    description: 'Professional screen replacement for smartphones, tablets, and laptops. Fix cracked or non-responsive screens.',
    image: '/screen-repair.jpg',
    basePrice: 49,
    category: 'Smartphone',
    estimatedTime: '1-2 hours',
    warranty: '90 days',
  },
  {
    id: 2,
    name: 'Battery Replacement',
    description: 'Replace your device\'s aging battery to restore full performance and battery life. Same-day service available.',
    image: '/battery-repair.jpg',
    basePrice: 39,
    category: 'All Devices',
    estimatedTime: '30-60 minutes',
    warranty: '6 months',
  },
  {
    id: 3,
    name: 'Water Damage Repair',
    description: 'Professional diagnosis and repair for water-damaged devices. Quick service to prevent further damage.',
    image: '/water-damage.jpg',
    basePrice: 79,
    category: 'All Devices',
    estimatedTime: '1-3 days',
    warranty: '30 days',
  },
  {
    id: 4,
    name: 'Charging Port Repair',
    description: 'Fix charging issues with a new charging port. Stop struggling with loose connections or failed charging.',
    image: '/charging-port.jpg',
    basePrice: 45,
    category: 'Smartphone',
    estimatedTime: '1 hour',
    warranty: '90 days',
  },
  {
    id: 5,
    name: 'Speaker/Microphone Repair',
    description: 'Resolve audio problems with professional speaker and microphone repairs. Restore clear sound and voice quality.',
    image: '/speaker-repair.jpg',
    basePrice: 40,
    category: 'Smartphone',
    estimatedTime: '1 hour',
    warranty: '90 days',
  },
  {
    id: 6,
    name: 'Data Recovery',
    description: 'Recover important data from damaged or non-functioning devices. Professional and confidential service.',
    image: '/data-recovery.jpg',
    basePrice: 99,
    category: 'All Devices',
    estimatedTime: '1-5 days',
    warranty: 'N/A',
  },
  {
    id: 7,
    name: 'Laptop Keyboard Replacement',
    description: 'Replace damaged laptop keyboards with genuine or high-quality compatible parts. Restore smooth typing experience.',
    image: '/keyboard-repair.jpg',
    basePrice: 69,
    category: 'Laptop',
    estimatedTime: '1-2 hours',
    warranty: '6 months',
  },
  {
    id: 8,
    name: 'Virus Removal & System Optimization',
    description: 'Remove viruses, malware, and optimize your device performance. Make your device run like new again.',
    image: '/virus-removal.jpg',
    basePrice: 59,
    category: 'Computer',
    estimatedTime: '2-4 hours',
    warranty: '30 days',
  },
  {
    id: 9,
    name: 'Game Console Repair',
    description: 'Fix common game console issues including overheating, disc reading problems, and controller connectivity.',
    image: '/console-repair.jpg',
    basePrice: 69,
    category: 'Gaming',
    estimatedTime: '1-3 days',
    warranty: '90 days',
  },
];

// Device categories for filtering
const deviceCategories = [
  'All Devices',
  'Smartphone',
  'Tablet',
  'Laptop',
  'Computer',
  'Gaming',
  'Audio',
];

const RepairsPage = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    // Simulate loading data from API
    const fetchServices = async () => {
      setIsLoading(true);
      // In a real app, this would be a fetch call to Supabase
      setTimeout(() => {
        setServices(serviceData);
        setIsLoading(false);
      }, 800);
    };

    fetchServices();
  }, []);

  // Filter services based on search query and category
  const filteredServices = services.filter(service => {
    const matchesSearch = 
      searchQuery === '' || 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory =
      selectedCategory === '' || 
      service.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // The filtering is handled by the filteredServices derived state
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Professional Repair Services</h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Expert repair services for all your electronic devices. Fast, reliable, and affordable.
            </p>
            
            {/* Search Form */}
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search for a repair service..."
                    className="w-full pl-10 pr-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="text-gray-500" />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-500 text-white py-3 px-6 rounded-md font-medium flex-shrink-0"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filters */}
        <div className="mb-12">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Filter by Device Type</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('')}
              className={`py-2 px-4 rounded-md ${
                selectedCategory === ''
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              All Services
            </button>
            {deviceCategories.filter(cat => cat !== 'All Devices').map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`py-2 px-4 rounded-md ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse bg-white rounded-lg shadow-md p-6">
                <div className="bg-gray-300 h-40 rounded-md mb-4"></div>
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-4"></div>
                <div className="h-8 bg-gray-300 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FiTool className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any repair services matching your search.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('');
              }}
              className="text-primary-600 hover:text-primary-800 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Book a Custom Repair */}
        <div className="mt-16 bg-primary-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Don't see what you need?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We offer many more repair services than listed here. Contact us for a custom repair quote
            or book a diagnostic appointment.
          </p>
          <Link
            to="/repairs/book"
            className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-md font-medium hover:bg-primary-700"
          >
            Book a Custom Repair <FiArrowRight className="ml-2" />
          </Link>
        </div>

        {/* Repair Process */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Our Repair Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 text-primary-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Book an Appointment</h3>
              <p className="text-gray-600">
                Schedule a repair service online or walk in to our store. We'll quickly assess your device's issues.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 text-primary-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Diagnosis & Repair</h3>
              <p className="text-gray-600">
                Our technicians will diagnose the problem and complete the repair, keeping you updated throughout the process.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 text-primary-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Pick Up & Warranty</h3>
              <p className="text-gray-600">
                Pick up your repaired device with a satisfaction guarantee and warranty on all our repair services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepairsPage; 