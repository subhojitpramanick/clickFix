import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiShoppingCart, FiStar, FiCheck, FiTruck, FiShield } from 'react-icons/fi';
import { useCart } from '../lib/CartContext';
import { useTheme } from '../lib/ThemeContext';

// Mock data - In a real app, this would come from Supabase
const mockProducts = [
  {
    id: 1,
    name: 'Smartphone Pro X',
    price: 899,
    description: 'The latest flagship smartphone with cutting-edge features. Includes a stunning 6.5" OLED display, 5G connectivity, and an advanced triple camera system.',
    fullDescription: 'Experience the next generation of mobile technology with the Smartphone Pro X. This flagship device combines sleek design, powerful performance, and innovative features to deliver an exceptional user experience. The stunning 6.5" OLED display offers vibrant colors and deep blacks, while the triple camera system lets you capture professional-quality photos and videos in any lighting condition. With 5G connectivity, you can download content, stream media, and browse the web at lightning-fast speeds. The device also features an all-day battery life, wireless charging capabilities, and advanced security features including facial recognition and an in-display fingerprint sensor.',
    image: '/smartphone.jpg',
    images: ['/smartphone.jpg', '/smartphone-side.jpg', '/smartphone-back.jpg'],
    category: 'Smartphones',
    brand: 'TechX',
    rating: 4.8,
    reviews: 124,
    inStock: true,
    features: [
      '6.5" OLED Display',
      '5G Connectivity',
      'Triple Camera System (48MP + 12MP + 8MP)',
      '128GB Storage',
      '8GB RAM',
      'All-day Battery Life',
      'Wireless Charging',
      'Water and Dust Resistant (IP68)'
    ],
    specifications: {
      display: '6.5" OLED, 2400 x 1080 resolution',
      processor: 'OctaCore 2.8GHz',
      memory: '8GB RAM, 128GB Storage',
      camera: 'Triple Camera (48MP + 12MP + 8MP), 16MP Front Camera',
      battery: '4500mAh, Fast Charging, Wireless Charging',
      dimensions: '148.9 x 71.8 x 8.4 mm',
      weight: '189g',
      colors: ['Midnight Black', 'Ocean Blue', 'Silver'],
      os: 'Android 13'
    },
    relatedProducts: [2, 3, 7]
  },
  {
    id: 2,
    name: 'Laptop Ultra Slim',
    price: 1299,
    description: 'Powerful and portable laptop with a stunning display, long battery life, and premium build quality.',
    fullDescription: "The Laptop Ultra Slim combines exceptional performance with incredible portability. Featuring a premium aluminum chassis that's just 14mm thin and weighing only 1.3kg, this laptop is designed for professionals on the go. The stunning 14\" display offers crisp visuals with vibrant colors, while the powerful processor and dedicated graphics card ensure smooth performance for demanding tasks. With up to 12 hours of battery life, you can work all day without worrying about finding a power outlet. The backlit keyboard provides comfortable typing in any lighting condition, and the precision touchpad offers smooth, responsive navigation.",
    image: '/laptop.jpg',
    images: ['/laptop.jpg', '/laptop-open.jpg', '/laptop-side.jpg'],
    category: 'Laptops',
    brand: 'CompuMax',
    rating: 4.7,
    reviews: 89,
    inStock: true,
    features: [
      '14" Full HD Display',
      'Intel Core i7 Processor',
      '16GB RAM',
      '512GB SSD Storage',
      'Dedicated Graphics Card',
      'Backlit Keyboard',
      'Up to 12 Hours Battery Life',
      'Fingerprint Sensor'
    ],
    specifications: {
      display: '14" Full HD IPS, 1920 x 1080',
      processor: 'Intel Core i7-1165G7',
      memory: '16GB DDR4, 512GB NVMe SSD',
      graphics: 'NVIDIA GeForce MX450 2GB',
      battery: '56Wh, Up to 12 Hours',
      dimensions: '323 x 218 x 14 mm',
      weight: '1.3kg',
      colors: ['Silver', 'Space Gray'],
      os: 'Windows 11 Pro'
    },
    relatedProducts: [1, 3, 8]
  },
  {
    id: 3,
    name: 'Smart Watch Series 5',
    price: 299,
    description: 'Advanced smartwatch with health monitoring features, GPS, and a beautiful always-on display.',
    fullDescription: "The Smart Watch Series 5 is the perfect companion for your active lifestyle. With advanced health monitoring features, including heart rate tracking, sleep analysis, and blood oxygen level measurements, this watch helps you stay on top of your wellbeing. The built-in GPS accurately tracks your outdoor activities, while the waterproof design means you can wear it swimming or in the shower. The beautiful always-on retina display is easy to read in any lighting condition, and the customizable watch faces let you personalize your experience. With up to 18 hours of battery life, it will last throughout your day, and the quick charging feature means less downtime.",
    image: '/smartwatch.jpg',
    images: ['/smartwatch.jpg', '/smartwatch-side.jpg', '/smartwatch-band.jpg'],
    category: 'Wearables',
    brand: 'TechX',
    rating: 4.6,
    reviews: 76,
    inStock: true,
    features: [
      'Always-On Retina Display',
      'Heart Rate Monitoring',
      'Blood Oxygen Sensor',
      'ECG App',
      'Built-in GPS',
      'Water Resistant (50m)',
      'Up to 18 Hours Battery Life',
      'Quick Charging'
    ],
    specifications: {
      display: '1.78" OLED Always-On Retina Display',
      processor: 'S5 SiP with 64-bit dual-core processor',
      memory: '32GB Storage',
      sensors: 'Heart Rate, Blood Oxygen, ECG, Accelerometer, Gyroscope, Ambient Light',
      battery: 'Up to 18 Hours, Quick Charging',
      dimensions: '44 x 38 x 10.7 mm',
      weight: '36g',
      colors: ['Black', 'Silver', 'Gold'],
      connectivity: 'Bluetooth 5.0, Wi-Fi, NFC'
    },
    relatedProducts: [1, 4, 7]
  },
  {
    id: 4,
    name: 'Wireless Earbuds Pro',
    price: 159,
    description: 'Premium wireless earbuds with active noise cancellation, crystal-clear sound, and comfortable fit.',
    image: '/earbuds.jpg',
    category: 'Audio',
    brand: 'SoundWave',
    rating: 4.5,
    reviews: 112,
    inStock: true
  }
];

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  const { addItem } = useCart();
  const { theme } = useTheme();

  useEffect(() => {
    // Simulate fetching product data
    const fetchProduct = async () => {
      setIsLoading(true);
      window.scrollTo(0, 0);
      
      // In a real app, this would be a fetch call to Supabase
      setTimeout(() => {
        const foundProduct = mockProducts.find(p => p.id === parseInt(id));
        setProduct(foundProduct || null);
        
        // Get related products
        if (foundProduct && foundProduct.relatedProducts) {
          const related = foundProduct.relatedProducts
            .map(relId => mockProducts.find(p => p.id === relId))
            .filter(Boolean);
          setRelatedProducts(related);
        }
        
        setIsLoading(false);
      }, 800);
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 10) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addItem({
        ...product,
        quantity
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mt-8"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product Not Found</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
        >
          <FiArrowLeft className="mr-2" /> Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-black">
      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-gray-900 py-4">
        <div className="container mx-auto px-4">
          <nav className="text-sm">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Home</Link>
              </li>
              <li className="text-gray-400 dark:text-gray-600">/</li>
              <li>
                <Link to="/products" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Products</Link>
              </li>
              <li className="text-gray-400 dark:text-gray-600">/</li>
              <li>
                <Link to={`/products?category=${product.category}`} className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                  {product.category}
                </Link>
              </li>
              <li className="text-gray-400 dark:text-gray-600">/</li>
              <li className="text-gray-700 dark:text-gray-300 font-medium">{product.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product images */}
          <div>
            <div className="mb-4 border dark:border-gray-800 rounded-lg overflow-hidden h-80 sm:h-96">
              <img
                src={product.images?.[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-full object-contain bg-white dark:bg-gray-900"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/600x400?text=${product.name}`;
                }}
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`border dark:border-gray-800 rounded overflow-hidden h-20 ${
                      selectedImage === index ? 'ring-2 ring-primary-500' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/100x100?text=${index + 1}`;
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product details */}
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h1>
              
              {/* Brand and Rating */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-gray-600 dark:text-gray-400">{product.brand}</div>
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>
              
              {/* Price */}
              <div className="mb-4">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
                {product.inStock ? (
                  <span className="ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300">
                    <FiCheck className="mr-1" /> In Stock
                  </span>
                ) : (
                  <span className="ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300">
                    Out of Stock
                  </span>
                )}
              </div>
              
              {/* Short Description */}
              <p className="text-gray-600 dark:text-gray-300 mb-6">{product.description}</p>
              
              {/* Purchase Actions */}
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-20">
                  <label htmlFor="quantity" className="sr-only">
                    Quantity
                  </label>
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    max="10"
                    className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md py-2 px-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 flex items-center justify-center px-6 py-3 rounded-md font-medium ${
                    product.inStock
                      ? 'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600'
                      : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <FiShoppingCart className="mr-2" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
              
              {/* Shipping and Returns */}
              <div className="border-t border-b border-gray-200 dark:border-gray-800 py-4 space-y-3">
                <div className="flex items-start">
                  <FiTruck className="text-primary-600 dark:text-primary-400 h-5 w-5 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Free Shipping</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Free standard shipping on orders over $50</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FiShield className="text-primary-600 dark:text-primary-400 h-5 w-5 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">1 Year Warranty</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">All products include a 1 year manufacturer warranty</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product information tabs */}
        <div className="mt-12">
          <div className="border-b border-gray-200 dark:border-gray-800">
            <nav className="flex space-x-8">
              <button
                onClick={() => setTab('description')}
                className={`py-4 px-1 ${
                  tab === 'description'
                    ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400 font-medium'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                Description
              </button>
              {product.features && (
                <button
                  onClick={() => setTab('features')}
                  className={`py-4 px-1 ${
                    tab === 'features'
                      ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400 font-medium'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700'
                  }`}
                >
                  Features
                </button>
              )}
              {product.specifications && (
                <button
                  onClick={() => setTab('specifications')}
                  className={`py-4 px-1 ${
                    tab === 'specifications'
                      ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400 font-medium'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700'
                  }`}
                >
                  Specifications
                </button>
              )}
            </nav>
          </div>

          <div className="py-6">
            {tab === 'description' && (
              <div className="prose max-w-none dark:prose-invert dark:text-gray-300">
                <p>{product.fullDescription || product.description}</p>
              </div>
            )}

            {tab === 'features' && product.features && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <FiCheck className="text-primary-600 dark:text-primary-400 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            {tab === 'specifications' && product.specifications && (
              <div className="border rounded-md dark:border-gray-800 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900 w-1/4 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </td>
                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-600 dark:text-gray-300 dark:bg-gray-800">
                          {Array.isArray(value) ? value.join(', ') : value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden group dark:border dark:border-gray-800">
                  <Link to={`/products/${relatedProduct.id}`}>
                    <div className="h-48 overflow-hidden">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/300x200?text=${relatedProduct.name}`;
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{relatedProduct.category}</div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex justify-between items-center">
                        <span className="text-primary-600 dark:text-primary-400 font-bold">
                          ${relatedProduct.price.toFixed(2)}
                        </span>
                        <div className="flex items-center">
                          <FiStar className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-gray-600 dark:text-gray-400 ml-1">{relatedProduct.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage; 