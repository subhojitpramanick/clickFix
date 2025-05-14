import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../lib/CartContext';
import Button from '../components/ui/Button';
import ProductImage from '../components/products/ProductImage';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculateTotal = () => {
      return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };
    
    setTotal(calculateTotal());
  }, [cart]);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Link to="/products">
            <Button variant="primary">Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left pb-4">Product</th>
                    <th className="text-center pb-4">Quantity</th>
                    <th className="text-right pb-4">Price</th>
                    <th className="text-right pb-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200">
                      <td className="py-4 pr-4">
                        <div className="flex items-center">
                          <div className="w-16 h-16 flex-shrink-0 mr-4">
                            <ProductImage 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            {item.color && <p className="text-sm text-gray-600">Color: {item.color}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-center">
                        <div className="flex items-center justify-center">
                          <button 
                            className="bg-gray-200 px-2 py-1 rounded-l"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            -
                          </button>
                          <span className="px-4">{item.quantity}</span>
                          <button 
                            className="bg-gray-200 px-2 py-1 rounded-r"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="py-4 text-right">
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-gray-50 p-6 flex justify-between">
              <button 
                onClick={clearCart}
                className="text-gray-600 hover:text-gray-800"
              >
                Clear Cart
              </button>
              <Link to="/products">
                <button className="text-primary-600 hover:text-primary-800">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="border-b border-gray-200 pb-4 mb-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>${(total * 0.08).toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between font-semibold text-lg mb-6">
              <span>Total</span>
              <span>${(total + (total * 0.08)).toFixed(2)}</span>
            </div>
            <Link to="/checkout">
              <Button variant="primary" className="w-full">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 