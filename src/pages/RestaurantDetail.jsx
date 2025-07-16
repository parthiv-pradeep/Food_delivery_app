import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, ArrowLeft, Plus, Minus, Share, Bookmark, MoreVertical, MapPin, Info, CheckCircle, Users, Package, ChevronDown, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { localRestaurants } from '../data/localRestaurants';

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems, updateQuantity } = useCart();
  const [activeFilter, setActiveFilter] = useState('Veg');
  const [showCartAnimation, setShowCartAnimation] = useState(false);
  const [showMiniCart, setShowMiniCart] = useState(false);

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

  // Sample menu items (you can expand this)
  const menuItems = [
    {
      id: 1,
      name: "Chicken Biryani",
      description: "Authentic Malabar chicken biryani with fragrant basmati rice",
      price: 200,
      image: "https://images.unsplash.com/photo-1563379091339-03246963d629?w=150&h=150&fit=crop",
      isVeg: false,
      customizable: true,
      badge: "Bestseller"
    },
    {
      id: 2,
      name: "Fish Curry",
      description: "Traditional Kerala fish curry with coconut milk and spices",
      price: 180,
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=150&h=150&fit=crop",
      isVeg: false,
      badge: "Highly reordered"
    },
    {
      id: 3,
      name: "Vegetable Biryani",
      description: "Mixed vegetables with aromatic basmati rice and spices",
      price: 140,
      image: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=150&h=150&fit=crop",
      isVeg: true,
      customizable: true
    },
    {
      id: 4,
      name: "Appam with Stew",
      description: "Soft fermented rice pancake with vegetable stew",
      price: 120,
      image: "https://images.unsplash.com/photo-1630851543638-b4f1e5c65a46?w=150&h=150&fit=crop",
      isVeg: true,
      badge: "Popular"
    },
    {
      id: 5,
      name: "Puttu & Kadala",
      description: "Steamed rice cake served with chickpea curry",
      price: 90,
      image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=150&h=150&fit=crop",
      isVeg: true
    },
    {
      id: 6,
      name: "Karimeen Curry",
      description: "Pearl spot fish cooked in traditional Kerala spices",
      price: 250,
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=150&h=150&fit=crop",
      isVeg: false,
      badge: "Chef's special"
    },
    {
      id: 7,
      name: "Chicken 65",
      description: "Spicy deep-fried chicken appetizer with curry leaves",
      price: 160,
      image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=150&h=150&fit=crop",
      isVeg: false
    },
    {
      id: 8,
      name: "Beef Ularthiyathu",
      description: "Dry roasted beef with coconut and Kerala spices",
      price: 200,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=150&h=150&fit=crop",
      isVeg: false,
      badge: "Local favorite"
    },
    {
      id: 9,
      name: "Sambar Rice",
      description: "Steamed rice served with traditional lentil curry",
      price: 100,
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=150&h=150&fit=crop",
      isVeg: true
    },
    {
      id: 10,
      name: "Payasam",
      description: "Traditional Kerala dessert made with rice and jaggery",
      price: 80,
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=150&h=150&fit=crop",
      isVeg: true
    },
    {
      id: 11,
      name: "Mutton Biryani",
      description: "Tender mutton pieces cooked with aromatic basmati rice",
      price: 280,
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=150&h=150&fit=crop",
      isVeg: false,
      customizable: true,
      badge: "Premium"
    },
    {
      id: 12,
      name: "Kappa & Fish Curry",
      description: "Boiled tapioca served with traditional fish curry",
      price: 150,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=150&h=150&fit=crop",
      isVeg: false
    }
  ];

  const getItemQuantity = (itemId) => {
    const cartItem = cartItems.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAddToCart = (item) => {
    addToCart({
      ...item,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name
    });
    
    // Show cart animation briefly
    setShowCartAnimation(true);
    setTimeout(() => setShowCartAnimation(false), 1000);
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      updateQuantity(itemId, 0);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  // Filter menu items based on active filter
  const filteredMenuItems = menuItems.filter(item => {
    if (activeFilter === 'Veg') return item.isVeg;
    if (activeFilter === 'Non-veg') return !item.isVeg;
    return true; // Show all items for other filters
  });

  // Helper functions for cart
  const getCartItems = () => {
    return cartItems.filter(item => item.restaurantId === restaurant.id);
  };

  const getCartTotal = () => {
    return getCartItems().reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return getCartItems().reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
          
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Users className="h-5 w-5 text-gray-700" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Bookmark className="h-5 w-5 text-gray-700" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Share className="h-5 w-5 text-gray-700" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <MoreVertical className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="bg-white px-4 py-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{restaurant.name}</h1>
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <Info className="h-4 w-4 mr-1" />
              <span>{restaurant.cuisine}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1 bg-green-600 text-white px-2 py-1 rounded-md text-sm font-semibold">
            <Star className="h-4 w-4 fill-current" />
            <span>{restaurant.rating}</span>
            <Star className="h-3 w-3 fill-current" />
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>2.1 km • Meppayur</span>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{restaurant.deliveryTime} • Schedule for later</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center space-x-1 text-sm text-green-600">
            <CheckCircle className="h-4 w-4" />
            <span>Frequently reordered</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-green-600">
            <CheckCircle className="h-4 w-4" />
            <span>Loved by delivery partners</span>
          </div>
        </div>

        {/* Closing Soon Alert */}
        <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 mb-4 flex items-center space-x-3">
          <div className="bg-yellow-400 rounded-full p-2">
            <Clock className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="bg-yellow-600 text-white text-xs px-2 py-1 rounded font-bold mr-2">
              CLOSING SOON
            </span>
            <span className="text-yellow-800 font-medium">
              Hurry up! Restaurant closes in 25 minutes
            </span>
          </div>
        </div>

        {/* Free Delivery */}
        <div className="flex items-center space-x-2 mb-4">
          <Package className="h-4 w-4 text-orange-600" />
          <span className="text-sm font-medium text-gray-700">Free Delivery</span>
          <span className="text-sm text-blue-600">6 offers</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white px-4 py-3 border-t border-gray-200">
        <div className="flex items-center space-x-3 overflow-x-auto">
          <button className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium whitespace-nowrap">
            <span>Filters</span>
          </button>
          
          <button 
            onClick={() => setActiveFilter('Veg')}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
              activeFilter === 'Veg' 
                ? 'bg-green-100 border border-green-500 text-green-700' 
                : 'border border-gray-300 text-gray-700'
            }`}
          >
            <div className="w-3 h-3 border border-green-500 rounded-sm bg-white flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-sm"></div>
            </div>
            <span>Veg</span>
          </button>

          <button className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium whitespace-nowrap">
            <div className="w-3 h-3 border border-orange-500 rounded-sm bg-white flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-sm"></div>
            </div>
            <span>Egg</span>
          </button>

          <button 
            onClick={() => setActiveFilter('Non-veg')}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
              activeFilter === 'Non-veg' 
                ? 'bg-red-100 border border-red-500 text-red-700' 
                : 'border border-gray-300 text-gray-700'
            }`}
          >
            <div className="w-3 h-3 border border-red-500 rounded-sm bg-white flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-sm"></div>
            </div>
            <span>Non-veg</span>
          </button>

          <button 
            onClick={() => setActiveFilter('Egg')}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
              activeFilter === 'Egg' 
                ? 'bg-orange-100 border border-orange-500 text-orange-700' 
                : 'border border-gray-300 text-gray-700'
            }`}
          >
            <div className="w-3 h-3 border border-orange-500 rounded-sm bg-white flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-sm"></div>
            </div>
            <span>Egg</span>
          </button>

          <button 
            onClick={() => setActiveFilter('All')}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
              activeFilter === 'All' 
                ? 'bg-blue-100 border border-blue-500 text-blue-700' 
                : 'border border-gray-300 text-gray-700'
            }`}
          >
            <span>Show All</span>
          </button>
        </div>
      </div>

      {/* Recommended Section */}
      <div className="bg-white mt-2">
        <div className="px-4 py-3 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recommended for you</h2>
        </div>

        {/* Menu Items */}
        <div className="divide-y divide-gray-200">
          {filteredMenuItems.map((item) => (
            <div key={item.id} className="p-4 flex space-x-4">
              {/* Food Type Indicator */}
              <div className="flex-shrink-0 mt-1">
                <div className={`w-4 h-4 border-2 ${item.isVeg ? 'border-green-500' : 'border-red-500'} rounded-sm flex items-center justify-center`}>
                  <div className={`w-2 h-2 ${item.isVeg ? 'bg-green-500' : 'bg-red-500'} rounded-sm`}></div>
                </div>
              </div>

              {/* Item Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                    {item.badge && (
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded font-medium">
                          {item.badge}
                        </span>
                      </div>
                    )}
                    <p className="text-lg font-semibold text-gray-900 mb-2">₹{item.price}</p>
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                  </div>

                  {/* Item Image and Add Button */}
                  <div className="flex-shrink-0 ml-4">
                    <div className="relative">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                        {getItemQuantity(item.id) > 0 ? (
                          <div className="flex items-center bg-red-600 text-white rounded-lg">
                            <button 
                              onClick={() => handleUpdateQuantity(item.id, getItemQuantity(item.id) - 1)}
                              className="p-2 hover:bg-red-700 rounded-l-lg"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-3 py-2 font-semibold">{getItemQuantity(item.id)}</span>
                            <button 
                              onClick={() => handleUpdateQuantity(item.id, getItemQuantity(item.id) + 1)}
                              className="p-2 hover:bg-red-700 rounded-r-lg"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => handleAddToCart(item)}
                            className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                          >
                            ADD
                          </button>
                        )}
                      </div>
                      {item.customizable && (
                        <div className="absolute top-2 right-2">
                          <span className="text-xs text-gray-500">Customisable</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Cart Button */}
      {getCartItemsCount() > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
          {/* Mini Cart Preview */}
          {showMiniCart && (
            <div className="px-4 py-3 border-b border-gray-200 max-h-48 overflow-y-auto">
              <div className="space-y-2">
                {getCartItems().map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 border-2 ${item.isVeg ? 'border-green-500' : 'border-red-500'} rounded-sm flex items-center justify-center`}>
                        <div className={`w-1.5 h-1.5 ${item.isVeg ? 'bg-green-500' : 'bg-red-500'} rounded-sm`}></div>
                      </div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-gray-500">x{item.quantity}</span>
                    </div>
                    <span className="font-semibold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-2 text-sm text-gray-600">
              <button 
                onClick={() => setShowMiniCart(!showMiniCart)}
                className="flex items-center space-x-1"
              >
                <span>{getCartItemsCount()} item{getCartItemsCount() > 1 ? 's' : ''} in cart</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showMiniCart ? 'rotate-180' : ''}`} />
              </button>
              <span className="font-medium">₹{getCartTotal()}</span>
            </div>
            <button 
              onClick={() => navigate('/cart')}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold flex items-center justify-between hover:bg-red-700 transition-colors shadow-sm"
            >
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5" />
                <span>View Cart</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>₹{getCartTotal()}</span>
                <span>→</span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Cart Animation Notification */}
      {showCartAnimation && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2">
          <CheckCircle className="h-5 w-5" />
          <span>Added to cart!</span>
        </div>
      )}

      {/* Bottom Padding */}
      <div className={`${getCartItemsCount() > 0 ? 'h-32' : 'h-20'}`}></div>
    </div>
  );
};
export default RestaurantDetail;
