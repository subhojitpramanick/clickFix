import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight, FiClock, FiTool, FiCheckCircle, FiDollarSign } from 'react-icons/fi';

// Mock data for repair services
const serviceData = [
  {
    id: 1,
    name: 'Screen Repair',
    description: 'Professional screen replacement for smartphones, tablets, and laptops. Fix cracked or non-responsive screens.',
    fullDescription: 'Our professional screen replacement service repairs cracked, shattered, or non-responsive screens on smartphones, tablets, and laptops. We use only high-quality replacement parts that match or exceed the specifications of your original screen. Our certified technicians perform the repair with precision, ensuring your device looks and functions like new. The service includes a thorough testing process to verify touch response, display quality, and overall functionality.',
    image: '/screen-repair.jpg',
    images: ['/screen-repair.jpg', '/screen-repair-2.jpg', '/screen-repair-3.jpg'],
    basePrice: 49,
    category: 'Smartphone',
    estimatedTime: '1-2 hours',
    warranty: '90 days',
    devices: [
      { name: 'iPhone (All Models)', price: 89 },
      { name: 'Samsung Galaxy', price: 79 },
      { name: 'Google Pixel', price: 89 },
      { name: 'iPad', price: 119 },
      { name: 'Other Smartphones', price: 69 },
      { name: 'Tablets', price: 99 },
      { name: 'Laptops', price: 149 }
    ],
    process: [
      'Diagnostic assessment of device damage',
      'Disassembly of device by certified technician',
      'Removal of damaged screen',
      'Installation of new screen',
      'Reassembly and testing',
      'Final quality inspection'
    ],
    faq: [
      {
        question: 'How long does the screen repair take?',
        answer: 'Most smartphone and tablet screen repairs can be completed in 1-2 hours. Laptop screen replacements may take 3-4 hours depending on the model.'
      },
      {
        question: 'Do you use original parts?',
        answer: 'We offer both original manufacturer parts and high-quality aftermarket alternatives. Original parts may cost more but provide identical performance to your original screen.'
      },
      {
        question: 'Is my data safe during repair?',
        answer: 'Yes, your data remains untouched during screen replacement. We recommend backing up your device before any repair as a precaution, but screen repairs don\'t typically affect stored data.'
      },
      {
        question: 'What does the warranty cover?',
        answer: 'Our 90-day warranty covers defects in the replacement screen and issues related to the installation. It does not cover subsequent damage from drops, impacts, or water exposure.'
      }
    ]
  },
  {
    id: 2,
    name: 'Battery Replacement',
    description: 'Replace your device\'s aging battery to restore full performance and battery life. Same-day service available.',
    fullDescription: 'Restore your device to peak performance with our professional battery replacement service. If your device is experiencing reduced battery life, unexpected shutdowns, or slow performance, a battery replacement can resolve these issues. We use high-quality batteries that meet or exceed the specifications of your original battery. Our certified technicians perform the replacement with precision, ensuring your device powers on correctly and charges properly.',
    image: '/battery-repair.jpg',
    basePrice: 39,
    category: 'All Devices',
    estimatedTime: '30-60 minutes',
    warranty: '6 months',
    devices: [
      { name: 'iPhone (All Models)', price: 59 },
      { name: 'Samsung Galaxy', price: 49 },
      { name: 'Google Pixel', price: 49 },
      { name: 'iPad', price: 69 },
      { name: 'Other Smartphones', price: 45 },
      { name: 'Tablets', price: 59 },
      { name: 'Laptops', price: 89 }
    ],
    process: [
      'Diagnostic assessment of battery health',
      'Disassembly of device by certified technician',
      'Removal of old battery',
      'Installation of new battery',
      'Reassembly and testing',
      'Initial charging and calibration'
    ],
    faq: [
      {
        question: 'How do I know if my battery needs replacement?',
        answer: 'Signs include: rapid battery drain, device shutting down unexpectedly, battery percentage jumping, device getting unusually hot, or battery swelling/bulging.'
      },
      {
        question: 'How long does a battery replacement take?',
        answer: 'Most smartphone and tablet battery replacements can be completed in 30-60 minutes. Laptop battery replacements may take 1-2 hours depending on the model.'
      },
      {
        question: 'What\'s the lifespan of the new battery?',
        answer: 'With normal use, replacement batteries typically last 2-3 years before noticeable capacity degradation. Heavy usage and charging habits can affect battery lifespan.'
      }
    ]
  },
  {
    id: 3,
    name: 'Water Damage Repair',
    description: 'Professional diagnosis and repair for water-damaged devices. Quick service to prevent further damage.',
    image: '/water-damage.jpg',
    basePrice: 79,
    category: 'All Devices',
    estimatedTime: '1-3 days',
    warranty: '30 days'
  }
];

const RepairDetailPage = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    // Simulate fetching service data
    const fetchService = async () => {
      setIsLoading(true);
      window.scrollTo(0, 0);
      
      // In a real app, this would be a fetch call to Supabase
      setTimeout(() => {
        const foundService = serviceData.find(s => s.id === parseInt(id));
        setService(foundService || null);
        
        // Set first device as selected by default
        if (foundService && foundService.devices && foundService.devices.length > 0) {
          setSelectedDevice(foundService.devices[0]);
        }
        
        setIsLoading(false);
      }, 800);
    };

    fetchService();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-300 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-300 rounded w-3/4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/4"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-10 bg-gray-300 rounded w-1/2 mt-8"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h2>
        <p className="text-gray-600 mb-8">
          The repair service you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/repairs"
          className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700"
        >
          <FiArrowLeft className="mr-2" /> Back to Repair Services
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="text-sm">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/" className="text-gray-500 hover:text-primary-600">Home</Link>
              </li>
              <li className="text-gray-400">/</li>
              <li>
                <Link to="/repairs" className="text-gray-500 hover:text-primary-600">Repairs</Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-700 font-medium">{service.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Service Hero Section */}
      <div className="bg-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{service.name}</h1>
              <p className="text-xl mb-6 text-primary-100">{service.description}</p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center">
                  <FiClock className="mr-2" />
                  <span>{service.estimatedTime} Estimated Time</span>
                </div>
                <div className="flex items-center">
                  <FiCheckCircle className="mr-2" />
                  <span>{service.warranty} Warranty</span>
                </div>
                <div className="flex items-center">
                  <FiDollarSign className="mr-2" />
                  <span>Starting at ${service.basePrice}</span>
                </div>
              </div>
              <Link
                to="/repairs/book"
                className="inline-flex items-center bg-white text-primary-700 px-6 py-3 rounded-md hover:bg-gray-100 font-medium"
              >
                Book This Repair <FiArrowRight className="ml-2" />
              </Link>
            </div>
            <div className="flex justify-center">
              <img
                src={service.image}
                alt={service.name}
                className="rounded-lg shadow-xl max-h-80 object-cover"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/600x400?text=${service.name}`;
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-b-2 border-primary-600 text-primary-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            {service.devices && (
              <button
                onClick={() => setActiveTab('pricing')}
                className={`py-4 px-1 whitespace-nowrap ${
                  activeTab === 'pricing'
                    ? 'border-b-2 border-primary-600 text-primary-600 font-medium'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Pricing
              </button>
            )}
            {service.process && (
              <button
                onClick={() => setActiveTab('process')}
                className={`py-4 px-1 whitespace-nowrap ${
                  activeTab === 'process'
                    ? 'border-b-2 border-primary-600 text-primary-600 font-medium'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Repair Process
              </button>
            )}
            {service.faq && (
              <button
                onClick={() => setActiveTab('faq')}
                className={`py-4 px-1 whitespace-nowrap ${
                  activeTab === 'faq'
                    ? 'border-b-2 border-primary-600 text-primary-600 font-medium'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                FAQ
              </button>
            )}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Overview</h2>
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6 text-lg">
                {service.fullDescription || service.description}
              </p>
            </div>
            
            {service.images && service.images.length > 1 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {service.images.map((image, index) => (
                    <div key={index} className="rounded-lg overflow-hidden h-48">
                      <img
                        src={image}
                        alt={`${service.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/400x300?text=${service.name} ${index + 1}`;
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-10">
              <Link
                to="/repairs/book"
                className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 font-medium"
              >
                Book Repair Appointment <FiArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        )}

        {/* Pricing Tab */}
        {activeTab === 'pricing' && service.devices && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pricing by Device</h2>
            <p className="text-gray-600 mb-6">
              Select your device type to see the exact pricing for your repair. All prices include parts and labor.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.devices.map((device, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedDevice(device)}
                      className={`p-4 border rounded-lg text-left hover:border-primary-500 transition-colors ${
                        selectedDevice && selectedDevice.name === device.name
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200'
                      }`}
                    >
                      <h3 className="font-medium text-gray-900">{device.name}</h3>
                      <p className="text-primary-600 font-bold mt-1">${device.price}</p>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="col-span-1">
                {selectedDevice && (
                  <div className="bg-primary-50 p-6 rounded-lg border border-primary-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Your Selection</h3>
                    <div className="mb-4">
                      <span className="text-gray-600">Service:</span>
                      <p className="font-medium text-gray-900">{service.name}</p>
                    </div>
                    <div className="mb-4">
                      <span className="text-gray-600">Device:</span>
                      <p className="font-medium text-gray-900">{selectedDevice.name}</p>
                    </div>
                    <div className="mb-6">
                      <span className="text-gray-600">Price:</span>
                      <p className="text-2xl font-bold text-primary-600">${selectedDevice.price}</p>
                    </div>
                    <Link
                      to="/repairs/book"
                      className="block w-full text-center bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 font-medium"
                    >
                      Book Now
                    </Link>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-8 bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Information</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• All prices include parts, labor, and diagnostic testing</li>
                <li>• Additional charges may apply for devices with extensive damage</li>
                <li>• All repairs include a {service.warranty} warranty</li>
                <li>• We offer both manufacturer and high-quality third-party parts</li>
              </ul>
            </div>
          </div>
        )}

        {/* Repair Process Tab */}
        {activeTab === 'process' && service.process && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Repair Process</h2>
            <p className="text-gray-600 mb-8">
              We follow a thorough, professional process to ensure your device is repaired correctly and safely.
            </p>
            
            <div className="space-y-8">
              {service.process.map((step, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-primary-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                      {index + 1}
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900">{step}</p>
                    {index < service.process.length - 1 && (
                      <div className="ml-5 mt-2 mb-8 border-l-2 border-gray-200 h-8"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 bg-primary-50 p-6 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <FiTool className="h-8 w-8 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Technicians</h3>
                  <p className="text-gray-600">
                    All repairs are performed by certified, experienced technicians who specialize in {service.category} repairs.
                    We use professional-grade tools and follow industry best practices to ensure quality results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && service.faq && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {service.faq.map((item, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-10 bg-gray-50 p-6 rounded-lg text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Still have questions?</h3>
              <p className="text-gray-600 mb-6">
                Our experts are ready to help you with any questions about your device repair.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-primary-600 text-primary-600 rounded-md hover:bg-primary-50"
                >
                  Contact Support
                </Link>
                <Link
                  to="/repairs/book"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  Book a Repair
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Fix Your Device?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Schedule a repair appointment today and get your device fixed by our expert technicians.
          </p>
          <Link
            to="/repairs/book"
            className="inline-flex items-center bg-primary-600 text-white px-8 py-3 rounded-md hover:bg-primary-700 font-medium"
          >
            Book an Appointment <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RepairDetailPage; 