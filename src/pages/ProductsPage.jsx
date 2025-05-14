import { useState, useEffect } from 'react';
import { FiFilter, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useTheme } from '../lib/ThemeContext';
import ProductCard from '../components/products/ProductCard';

// Mock data - In a real app, this would come from Supabase
const productData = [
  {
    id: 1,
    name: 'Smartphone Pro X',
    price: 899,
    image: '/smartphone.jpg',
    category: 'Smartphones',
    brand: 'TechX',
    rating: 4.8,
    features: ['5G', 'OLED Display', 'Triple Camera'],
    inStock: true,
  },
  {
    id: 2,
    name: 'Laptop Ultra Slim',
    price: 1299,
    image: '/laptop.jpg',
    category: 'Laptops',
    brand: 'CompuMax',
    rating: 4.7,
    features: ['16GB RAM', 'SSD Storage', 'Touchscreen'],
    inStock: true,
  },
  {
    id: 3,
    name: 'Smart Watch Series 5',
    price: 299,
    image: '/smartwatch.jpg',
    category: 'Wearables',
    brand: 'TechX',
    rating: 4.6,
    features: ['Heart Monitor', 'GPS', 'Waterproof'],
    inStock: true,
  },
  {
    id: 4,
    name: 'Wireless Earbuds Pro',
    price: 159,
    image: '/earbuds.jpg',
    category: 'Audio',
    brand: 'SoundWave',
    rating: 4.5,
    features: ['Noise Cancellation', 'Wireless Charging', 'Water Resistant'],
    inStock: true,
  },
  {
    id: 5,
    name: 'HD Smart TV 55"',
    price: 699,
    image: '/tv.jpg',
    category: 'TVs',
    brand: 'ViewClear',
    rating: 4.4,
    features: ['4K', 'Smart Apps', 'Voice Control'],
    inStock: true,
  },
  {
    id: 6,
    name: 'Gaming Console X',
    price: 499,
    image: '/console.jpg',
    category: 'Gaming',
    brand: 'GamePro',
    rating: 4.9,
    features: ['4K Gaming', 'High Performance', '1TB Storage'],
    inStock: false,
  },
  {
    id: 7,
    name: 'Bluetooth Speaker',
    price: 79,
    image: '/speaker.jpg',
    category: 'Audio',
    brand: 'SoundWave',
    rating: 4.3,
    features: ['Waterproof', 'Long Battery Life', 'Portable'],
    inStock: true,
  },
  {
    id: 8,
    name: 'Digital Camera Pro',
    price: 849,
    image: '/camera.jpg',
    category: 'Cameras',
    brand: 'PhotoMaster',
    rating: 4.7,
    features: ['20MP', 'Optical Zoom', '4K Video'],
    inStock: true,
  },
];

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    inStock: false,
    minRating: 0,
  });
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const { theme } = useTheme();

  // Categories and brands derived from product data
  const categories = [...new Set(productData.map(product => product.category))];
  const brands = [...new Set(productData.map(product => product.brand))];

  useEffect(() => {
    // Simulate fetching data from API
    const fetchProducts = async () => {
      setIsLoading(true);
      // In a real app, this would be a fetch call to Supabase
      setTimeout(() => {
        setProducts(productData);
        setIsLoading(false);
      }, 800);
    };

    fetchProducts();
  }, []);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Apply filters to products
  const filteredProducts = products.filter(product => {
    // Category filter
    if (filters.category && product.category !== filters.category) return false;
    
    // Brand filter
    if (filters.brand && product.brand !== filters.brand) return false;
    
    // Price range filter
    if (filters.minPrice && product.price < Number(filters.minPrice)) return false;
    if (filters.maxPrice && product.price > Number(filters.maxPrice)) return false;
    
    // In stock filter
    if (filters.inStock && !product.inStock) return false;
    
    // Rating filter
    if (product.rating < filters.minRating) return false;
    
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0; // featured or default
    }
  });

  // Update active filters for display
  useEffect(() => {
    const active = [];
    if (filters.category) active.push(`Category: ${filters.category}`);
    if (filters.brand) active.push(`Brand: ${filters.brand}`);
    if (filters.minPrice) active.push(`Min Price: $${filters.minPrice}`);
    if (filters.maxPrice) active.push(`Max Price: $${filters.maxPrice}`);
    if (filters.inStock) active.push('In Stock Only');
    if (filters.minRating > 0) active.push(`Min Rating: ${filters.minRating}`);
    
    setActiveFilters(active);
  }, [filters]);

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
      inStock: false,
      minRating: 0,
    });
  };

  // Remove a specific filter
  const removeFilter = (filter) => {
    const newFilters = { ...filters };
    
    if (filter.startsWith('Category')) newFilters.category = '';
    if (filter.startsWith('Brand')) newFilters.brand = '';
    if (filter.startsWith('Min Price')) newFilters.minPrice = '';
    if (filter.startsWith('Max Price')) newFilters.maxPrice = '';
    if (filter === 'In Stock Only') newFilters.inStock = false;
    if (filter.startsWith('Min Rating')) newFilters.minRating = 0;
    
    setFilters(newFilters);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Shop Products</h1>

      {/* Products Count and Mobile Filter Button */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-700 dark:text-gray-300">
          {isLoading ? 'Loading products...' : `${sortedProducts.length} products found`}
        </p>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="md:hidden flex items-center bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <FiFilter className="mr-2" /> Filters
        </button>
      </div>

      {/* Top Bar - Active Filters and Sort */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-4 md:mb-0">
              <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
              {activeFilters.map((filter, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-700 dark:text-gray-300"
                >
                  <span>{filter}</span>
                  <button
                    onClick={() => removeFilter(filter)}
                    className="ml-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ))}
              <button
                onClick={clearFilters}
                className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Sort Dropdown */}
          <div className="mb-4 md:mb-0">
            <label htmlFor="sortBy" className="text-sm text-gray-600 dark:text-gray-400 mr-2">
              Sort by:
            </label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-md py-2 px-3 text-sm"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {/* Main Content - Filter Sidebar and Products Grid */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter Sidebar - Mobile */}
          {isFilterOpen && (
            <div className="md:hidden bg-white dark:bg-gray-900 dark:border dark:border-gray-800 p-4 rounded-lg shadow-md mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium dark:text-white">Filters</h3>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  <FiX size={20} />
                </button>
              </div>
              
              {/* Mobile Filter Content */}
              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md py-2 px-3 text-sm"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Brand Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Brand
                  </label>
                  <select
                    name="brand"
                    value={filters.brand}
                    onChange={handleFilterChange}
                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md py-2 px-3 text-sm"
                  >
                    <option value="">All Brands</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price Range
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      name="minPrice"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                      className="w-1/2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md py-2 px-3 text-sm"
                    />
                    <span className="text-gray-500 dark:text-gray-400">-</span>
                    <input
                      type="number"
                      name="maxPrice"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                      className="w-1/2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md py-2 px-3 text-sm"
                    />
                  </div>
                </div>

                {/* In Stock Only */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="inStock-mobile"
                    name="inStock"
                    checked={filters.inStock}
                    onChange={handleFilterChange}
                    className="h-4 w-4 text-primary-600 dark:text-primary-500 rounded border-gray-300 dark:border-gray-700"
                  />
                  <label htmlFor="inStock-mobile" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    In Stock Only
                  </label>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Minimum Rating
                  </label>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setFilters({ ...filters, minRating: rating })}
                        className={`h-8 w-8 mr-1 flex items-center justify-center rounded-full ${
                          filters.minRating >= rating
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Apply Button */}
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {/* Filter Sidebar - Desktop */}
          <div className="hidden md:block w-full md:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-900 dark:border dark:border-gray-800 p-6 rounded-lg shadow-md sticky top-24">
              <h3 className="text-lg font-medium mb-6 dark:text-white">Filters</h3>
              
              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md py-2 px-3 text-sm"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Brand Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Brand
                  </label>
                  <select
                    name="brand"
                    value={filters.brand}
                    onChange={handleFilterChange}
                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md py-2 px-3 text-sm"
                  >
                    <option value="">All Brands</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price Range
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      name="minPrice"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                      className="w-1/2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md py-2 px-3 text-sm"
                    />
                    <span className="text-gray-500 dark:text-gray-400">-</span>
                    <input
                      type="number"
                      name="maxPrice"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                      className="w-1/2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md py-2 px-3 text-sm"
                    />
                  </div>
                </div>

                {/* In Stock Only */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="inStock"
                    name="inStock"
                    checked={filters.inStock}
                    onChange={handleFilterChange}
                    className="h-4 w-4 text-primary-600 dark:text-primary-500 rounded border-gray-300 dark:border-gray-700"
                  />
                  <label htmlFor="inStock" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    In Stock Only
                  </label>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Minimum Rating
                  </label>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setFilters({ ...filters, minRating: rating })}
                        className={`h-8 w-8 mr-1 flex items-center justify-center rounded-full ${
                          filters.minRating >= rating
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters Button */}
                <button
                  onClick={clearFilters}
                  className="w-full mt-4 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-grow">
            {isLoading ? (
              // Loading skeleton
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="animate-pulse bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
                    <div className="h-48 bg-gray-300 dark:bg-gray-800"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <p className="text-xl text-gray-600 dark:text-gray-400">No products found matching your filters.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage; 