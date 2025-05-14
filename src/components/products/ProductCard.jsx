import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../../lib/CartContext';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <div className="card group">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/300x200?text=${product.name}`;
            }}
          />
          <button
            onClick={handleAddToCart}
            className="absolute bottom-2 right-2 bg-primary-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary-700"
            aria-label="Add to cart"
          >
            <FiShoppingCart className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4">
          <div className="text-sm text-gray-500 mb-1">{product.category}</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          <div className="flex justify-between items-center">
            <span className="text-primary-600 font-bold">${product.price.toFixed(2)}</span>
            <div className="flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="text-gray-600 ml-1">{product.rating}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard; 