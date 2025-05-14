import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import Button from '../components/ui/Button';

const AccountPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [orderHistory, setOrderHistory] = useState([]);
  const [repairBookings, setRepairBookings] = useState([]);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      navigate('/login');
      return;
    }

    // Set initial profile data
    setProfileData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || ''
    });

    // Fetch mock order history
    setOrderHistory([
      {
        id: 'ORD123456',
        date: '2023-05-15',
        total: 899.99,
        status: 'Delivered',
        items: [
          { name: 'iPhone 13 Pro', quantity: 1, price: 899.99 }
        ]
      },
      {
        id: 'ORD789012',
        date: '2023-04-02',
        total: 156.95,
        status: 'Delivered',
        items: [
          { name: 'AirPods Pro', quantity: 1, price: 129.99 },
          { name: 'iPhone Case', quantity: 1, price: 26.96 }
        ]
      }
    ]);

    // Fetch mock repair bookings
    setRepairBookings([
      {
        id: 'RPR123456',
        date: '2023-06-10',
        service: 'Screen Replacement',
        device: 'iPhone 13 Pro',
        status: 'Completed',
        price: 199.99
      },
      {
        id: 'RPR789012',
        date: '2023-05-20',
        service: 'Battery Replacement',
        device: 'MacBook Pro 2021',
        status: 'In Progress',
        price: 129.99
      }
    ]);
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear any errors for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!profileData.name.trim()) errors.name = 'Name is required';
    if (!profileData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(profileData.email)) errors.email = 'Email is invalid';
    
    return errors;
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Here you would update the user profile through an API
    // For now, just toggle editing mode off
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              className={`px-6 py-4 text-lg font-medium ${
                activeTab === 'profile'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button
              className={`px-6 py-4 text-lg font-medium ${
                activeTab === 'orders'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('orders')}
            >
              Order History
            </button>
            <button
              className={`px-6 py-4 text-lg font-medium ${
                activeTab === 'repairs'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('repairs')}
            >
              Repair Bookings
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'profile' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Personal Information</h2>
                {!isEditing && (
                  <Button 
                    variant="secondary" 
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                )}
              </div>

              <form onSubmit={handleProfileSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={`w-full p-3 border rounded ${
                        formErrors.name ? 'border-red-500' : 'border-gray-300'
                      } ${!isEditing ? 'bg-gray-100' : ''}`}
                      value={profileData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                    {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`w-full p-3 border rounded ${
                        formErrors.email ? 'border-red-500' : 'border-gray-300'
                      } ${!isEditing ? 'bg-gray-100' : ''}`}
                      value={profileData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                    {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className={`w-full p-3 border rounded border-gray-300 ${!isEditing ? 'bg-gray-100' : ''}`}
                      value={profileData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="address">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className={`w-full p-3 border rounded border-gray-300 ${!isEditing ? 'bg-gray-100' : ''}`}
                      value={profileData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex space-x-4">
                    <Button 
                      type="submit" 
                      variant="primary"
                    >
                      Save Changes
                    </Button>
                    <Button 
                      type="button" 
                      variant="secondary"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </form>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h2 className="text-xl font-semibold mb-4">Account Actions</h2>
                <Button 
                  variant="danger" 
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Order History</h2>
              
              {orderHistory.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
                  <Button 
                    variant="primary"
                    onClick={() => navigate('/products')}
                  >
                    Browse Products
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {orderHistory.map(order => (
                    <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 p-4 flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Order #{order.id}</h3>
                          <p className="text-gray-600 text-sm">Placed on {order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${order.total.toFixed(2)}</p>
                          <span className="inline-block px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium mb-2">Items</h4>
                        <ul className="space-y-2">
                          {order.items.map((item, index) => (
                            <li key={index} className="flex justify-between">
                              <span>{item.name} (x{item.quantity})</span>
                              <span>${item.price.toFixed(2)}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <Button 
                            variant="secondary" 
                            className="w-full sm:w-auto"
                          >
                            View Order Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'repairs' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Repair Bookings</h2>
              
              {repairBookings.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">You haven't booked any repair services yet.</p>
                  <Button 
                    variant="primary"
                    onClick={() => navigate('/repairs')}
                  >
                    Book a Repair
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {repairBookings.map(booking => (
                    <div key={booking.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 p-4 flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Booking #{booking.id}</h3>
                          <p className="text-gray-600 text-sm">Booked for {booking.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${booking.price.toFixed(2)}</p>
                          <span className={`inline-block px-2 py-1 text-xs rounded ${
                            booking.status === 'Completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-gray-600 text-sm">Service</p>
                            <p className="font-medium">{booking.service}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 text-sm">Device</p>
                            <p className="font-medium">{booking.device}</p>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <Button 
                            variant="secondary" 
                            className="w-full sm:w-auto"
                          >
                            View Booking Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage; 