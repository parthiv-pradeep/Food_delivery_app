import React, { useState } from 'react';
import { Search, MapPin, Clock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DeliveryLocationWidget from './DeliveryLocationWidget';

const FoodFocusedHero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Quick search suggestions focused on food
  const quickSearches = [
    { name: 'Biryani', icon: '🍛', popular: true },
    { name: 'Pizza', icon: '🍕', popular: true },
    { name: 'Burger', icon: '🍔', popular: false },
    { name: 'Dosa', icon: '🥞', popular: true },
    { name: 'Chinese', icon: '🍜', popular: false },
    { name: 'Ice Cream', icon: '🍦', popular: false }
  ];

  const handleSearch = (query = searchQuery) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchQuery('');
    }
  };

  const handleQuickSearch = (foodName) => {
    navigate(`/search?q=${encodeURIComponent(foodName)}`);
  };

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Search Section */}
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              What are you craving today?
            </h1>
            <p className="text-gray-600 text-lg">
              Discover restaurants and dishes near you
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
              <div className="flex flex-col md:flex-row gap-3">
                {/* Location */}
                <div className="md:w-2/5">
                  <DeliveryLocationWidget className="w-full" />
                </div>

                {/* Search Input */}
                <div className="md:w-3/5 relative">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      placeholder="Search for food or restaurants..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleSearch()}
                className="w-full mt-4 bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Find Food
              </button>
            </div>
          </div>        {/* Quick Food Searches */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular right now</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {quickSearches.map((food, index) => (
              <button
                key={index}
                onClick={() => handleQuickSearch(food.name)}
                className="group relative bg-white rounded-xl p-4 border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all duration-200 text-center"
              >
                <div className="text-3xl mb-2">{food.icon}</div>
                <div className="text-sm font-medium text-gray-900 group-hover:text-orange-600">
                  {food.name}
                </div>
                {food.popular && (
                  <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                    🔥
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-md mx-auto pt-6 border-t border-gray-100">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-orange-600 mb-1">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-bold">4.8</span>
              </div>
              <div className="text-xs text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-green-600 mb-1">
                <Clock className="h-4 w-4" />
                <span className="font-bold">25min</span>
              </div>
              <div className="text-xs text-gray-600">Avg Delivery</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-blue-600 mb-1">
                <MapPin className="h-4 w-4" />
                <span className="font-bold">2000+</span>
              </div>
              <div className="text-xs text-gray-600">Restaurants</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodFocusedHero;
