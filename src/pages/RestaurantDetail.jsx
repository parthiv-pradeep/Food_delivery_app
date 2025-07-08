import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, Truck, ArrowLeft, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
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

  // Mock restaurant data - in real app, this would come from API
  const restaurantData = {
    1: {
      name: "Tony's Pizza Palace",
      image: "🍕",
      rating: 4.8,
      deliveryTime: "25-35 min",
      deliveryFee: "Free",
      cuisine: "Italian, Pizza",
      description: "Authentic Italian pizzas made with fresh ingredients and traditional recipes.",
      address: "123 Pizza Street, Downtown",
      phone: "+1 (555) 123-4567",
      menu: [
        {
          category: "Popular",
          items: [
            { id: 1, name: "Margherita Pizza", price: 12.99, description: "Fresh mozzarella, tomato sauce, basil", image: "🍕", rating: 4.9 },
            { id: 2, name: "Pepperoni Pizza", price: 15.99, description: "Pepperoni, mozzarella, tomato sauce", image: "🍕", rating: 4.7 },
            { id: 3, name: "Supreme Pizza", price: 18.99, description: "Pepperoni, sausage, peppers, onions, mushrooms", image: "🍕", rating: 4.8 },
          ]
        },
        {
          category: "Appetizers",
          items: [
            { id: 4, name: "Garlic Bread", price: 6.99, description: "Fresh baked bread with garlic butter", image: "🍞", rating: 4.5 },
            { id: 5, name: "Caesar Salad", price: 8.99, description: "Romaine lettuce, parmesan, croutons, caesar dressing", image: "🥗", rating: 4.3 },
            { id: 6, name: "Mozzarella Sticks", price: 9.99, description: "Crispy mozzarella with marinara sauce", image: "🧀", rating: 4.6 },
          ]
        },
        {
          category: "Desserts",
          items: [
            { id: 7, name: "Tiramisu", price: 7.99, description: "Classic Italian dessert with coffee and mascarpone", image: "🍰", rating: 4.8 },
            { id: 8, name: "Gelato", price: 5.99, description: "Authentic Italian gelato - vanilla, chocolate, strawberry", image: "🍨", rating: 4.7 },
          ]
        }
      ]
    },
    2: {
      name: "Burger Kingdom",
      image: "🍔",
      rating: 4.6,
      deliveryTime: "20-30 min",
      deliveryFee: "$2.99",
      cuisine: "American, Burgers",
      description: "Juicy burgers made with premium beef and fresh ingredients.",
      address: "456 Burger Ave, Midtown",
      phone: "+1 (555) 234-5678",
      menu: [
        {
          category: "Burgers",
          items: [
            { id: 9, name: "Classic Burger", price: 10.99, description: "Beef patty, lettuce, tomato, onion, pickle", image: "🍔", rating: 4.6 },
            { id: 10, name: "Cheeseburger", price: 12.99, description: "Beef patty, cheese, lettuce, tomato, onion", image: "🍔", rating: 4.7 },
            { id: 11, name: "Bacon Burger", price: 14.99, description: "Beef patty, bacon, cheese, lettuce, tomato", image: "🍔", rating: 4.8 },
          ]
        }
      ]
    }
    // Add more restaurants as needed
  };

  const restaurant = restaurantData[id];

  const handleAddToCart = (item) => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }
    
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      emoji: item.image,
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
                <div className="text-4xl sm:text-6xl">{restaurant.image}</div>
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
                <p>📍 {restaurant.address}</p>
                <p>📞 {restaurant.phone}</p>
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
                      <span className="font-medium text-gray-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-primary-200 dark:border-primary-700 pt-3 sm:pt-4">
                  <div className="flex justify-between items-center text-base sm:text-lg font-semibold">
                    <span className="text-gray-900 dark:text-white">Total</span>
                    <span className="text-primary-600 dark:text-primary-400">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => setIsCartOpen(true)}
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
            {restaurant.menu.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-8 sm:mb-12">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">{category.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {category.items.map((item) => (
                <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-3 sm:p-6">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">{item.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3">{item.description}</p>
                        <div className="flex items-center space-x-2 mb-2 sm:mb-3">
                          <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
                          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{item.rating}</span>
                        </div>
                        <p className="text-lg sm:text-xl font-bold text-primary-500">${item.price}</p>
                      </div>
                      <div className="text-2xl sm:text-4xl ml-2 sm:ml-4">{item.image}</div>
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
            onClick={() => setIsCartOpen(true)}
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
