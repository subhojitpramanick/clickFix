import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../lib/CartContext';
import Button from '../components/ui/Button';

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    // Basic validation
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.address.trim()) errors.address = 'Address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.state.trim()) errors.state = 'State is required';
    if (!formData.zipCode.trim()) errors.zipCode = 'Zip code is required';
    
    // Payment info validation (only if credit card payment selected)
    if (paymentMethod === 'credit') {
      if (!formData.cardName.trim()) errors.cardName = 'Name on card is required';
      if (!formData.cardNumber.trim()) errors.cardNumber = 'Card number is required';
      else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) 
        errors.cardNumber = 'Invalid card number';
      if (!formData.expDate.trim()) errors.expDate = 'Expiration date is required';
      if (!formData.cvv.trim()) errors.cvv = 'CVV is required';
      else if (!/^\d{3,4}$/.test(formData.cvv)) errors.cvv = 'Invalid CVV';
    }
    
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate order submission
    setTimeout(() => {
      // Order successful
      clearCart();
      navigate('/order-confirmation', { 
        state: { 
          orderId: `ORD-${Math.floor(Math.random() * 1000000)}`,
          total 
        }
      });
      setIsSubmitting(false);
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">You can't proceed to checkout with an empty cart.</p>
          <Link to="/products">
            <Button variant="primary">Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formErrors.firstName && <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>}
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded ${formErrors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formErrors.lastName && <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded ${formErrors.address ? 'border-red-500' : 'border-gray-300'}`}
              />
              {formErrors.address && <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded ${formErrors.city ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formErrors.city && <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>}
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded ${formErrors.state ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formErrors.state && <p className="text-red-500 text-sm mt-1">{formErrors.state}</p>}
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="zipCode">Zip Code</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded ${formErrors.zipCode ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formErrors.zipCode && <p className="text-red-500 text-sm mt-1">{formErrors.zipCode}</p>}
              </div>
            </div>
            
            <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
            
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  id="creditCard"
                  name="paymentMethod"
                  checked={paymentMethod === 'credit'}
                  onChange={() => setPaymentMethod('credit')}
                  className="mr-2"
                />
                <label htmlFor="creditCard">Credit Card</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  checked={paymentMethod === 'paypal'}
                  onChange={() => setPaymentMethod('paypal')}
                  className="mr-2"
                />
                <label htmlFor="paypal">PayPal</label>
              </div>
            </div>
            
            {paymentMethod === 'credit' && (
              <div className="mb-6">
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="cardName">Name on Card</label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded ${formErrors.cardName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {formErrors.cardName && <p className="text-red-500 text-sm mt-1">{formErrors.cardName}</p>}
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="XXXX XXXX XXXX XXXX"
                    className={`w-full p-3 border rounded ${formErrors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {formErrors.cardNumber && <p className="text-red-500 text-sm mt-1">{formErrors.cardNumber}</p>}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="expDate">Expiration Date</label>
                    <input
                      type="text"
                      id="expDate"
                      name="expDate"
                      value={formData.expDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className={`w-full p-3 border rounded ${formErrors.expDate ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {formErrors.expDate && <p className="text-red-500 text-sm mt-1">{formErrors.expDate}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="cvv">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded ${formErrors.cvv ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {formErrors.cvv && <p className="text-red-500 text-sm mt-1">{formErrors.cvv}</p>}
                  </div>
                </div>
              </div>
            )}
            
            {paymentMethod === 'paypal' && (
              <div className="mb-6 p-4 bg-gray-100 rounded text-center">
                <p>You'll be redirected to PayPal to complete your payment after review.</p>
              </div>
            )}
            
            <div className="mt-8">
              <Button 
                type="submit" 
                variant="primary" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </Button>
            </div>
          </form>
        </div>
        
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="border-b border-gray-200 pb-4 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between mb-2">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-b border-gray-200 pb-4 mb-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 