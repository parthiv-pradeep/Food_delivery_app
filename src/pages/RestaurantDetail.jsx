import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, Truck, ArrowLeft, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { localRestaurants } from '../data/localRestaurants';
import { formatCurrency } from '../utils/currency';
import Cart from '../components/Cart';
import LoginModal from '../components/LoginModal';
import ScrollArea from '../components/ui/ScrollArea';

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems, updateQuantity } = useCart();
  const { isAuthenticated } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Get restaurant data from local restaurants
  const restaurant = localRestaurants.find(r => r.id === parseInt(id));
  
  // If restaurant not found, show error or redirect
  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Restaurant not found</h2>
          <button 
            onClick={() => navigate('/')}
            className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  // Group menu items by category
  const menuByCategory = restaurant.menu.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const handleAddToCart = (item) => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }
    
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      restaurantId: parseInt(id),
      restaurantName: restaurant.name
    };
    addToCart(cartItem);
  };

  const getCartQuantity = (itemId) => {
    const cartItem = cartItems.find(item => 
      item.id === itemId && item.restaurantId === parseInt(id)
    );
    return cartItem ? cartItem.quantity : 0;
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    updateQuantity(itemId, parseInt(id), newQuantity);
  };

  const getCartItems = () => {
    return cartItems.filter(item => item.restaurantId === parseInt(id));
  };

  const getTotalPrice = () => {
    return getCartItems().reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Restaurant not found
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="text-primary-500 hover:text-primary-600"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-1 sm:space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors p-1 sm:p-0"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base">Back</span>
          </button>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
            <div>
              <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white">{restaurant.name}</h1>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{restaurant.cuisine}</p>
                </div>
              </div>
              
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">{restaurant.description}</p>
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-6 mb-3 sm:mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 sm:h-5 sm:w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">{restaurant.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3 sm:h-5 sm:w-5 text-gray-500" />
                  <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{restaurant.deliveryTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Truck className="h-3 w-3 sm:h-5 sm:w-5 text-gray-500" />
                  <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{restaurant.deliveryFee}</span>
                </div>
              </div>

              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <p>📍 Meppayur, Kozhikode, Kerala</p>
                <p>📞 +91-9876543210</p>
              </div>
            </div>

            {/* Cart Summary */}
            {getCartItems().length > 0 && (
              <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-3 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">Your Order</h3>
                <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                  {getCartItems().map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm sm:text-base">
                      <span className="text-gray-700 dark:text-gray-300">{item.name} x{item.quantity}</span>
                      <span className="font-medium text-gray-900 dark:text-white">₹{(item.price * item.quantity).toFixed(0)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-primary-200 dark:border-primary-700 pt-3 sm:pt-4">
                  <div className="flex justify-between items-center text-base sm:text-lg font-semibold">
                    <span className="text-gray-900 dark:text-white">Total</span>
                    <span className="text-primary-600 dark:text-primary-400">₹{getTotalPrice().toFixed(0)}</span>
                  </div>
                  <button 
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2.5 sm:py-3 rounded-xl font-semibold mt-3 sm:mt-4 transition-colors text-sm sm:text-base"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        <ScrollArea className="h-[calc(100vh-300px)] sm:h-[calc(100vh-400px)]">
          <div className="pr-2 sm:pr-4">
            {Object.entries(menuByCategory).map(([category, items]) => (
              <div key={category} className="mb-8 sm:mb-12">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {items.map((item) => (
                <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-3 sm:p-6">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">{item.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3">{item.description}</p>
                        <p className="text-lg sm:text-xl font-bold text-primary-500">₹{item.price}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      {isAuthenticated && getCartQuantity(item.id) > 0 ? (
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, getCartQuantity(item.id) - 1)}
                            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 p-1.5 sm:p-2 rounded-lg transition-colors"
                          >
                            <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                          </button>
                          <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{getCartQuantity(item.id)}</span>
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="bg-primary-500 hover:bg-primary-600 text-white p-1.5 sm:p-2 rounded-lg transition-colors"
                          >
                            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="bg-primary-500 hover:bg-primary-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg font-semibold transition-colors flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base"
                        >
                          <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{isAuthenticated ? 'Add' : 'Sign In to Add'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
          </div>
        </ScrollArea>
      </div>

      {/* Fixed Cart Button */}
      {isAuthenticated && getCartItems().length > 0 && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6">
          <button 
            onClick={() => navigate('/cart')}
            className="bg-primary-500 hover:bg-primary-600 text-white p-3 sm:p-4 rounded-full shadow-lg transition-colors flex items-center space-x-1 sm:space-x-2"
          >
            <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="bg-white text-primary-500 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
              {getCartItems().length}
            </span>
          </button>
        </div>
      )}

      {/* Cart Modal */}
      {isAuthenticated && (
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
      )}

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};

export default RestaurantDetail;
