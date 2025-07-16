import React, { useState, useEffect } from 'react';
import { Search, MapPin, Mic, X, TrendingUp, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DeliveryLocationWidget from './DeliveryLocationWidget';

const ModernHeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const navigate = useNavigate();

  // Popular searches data
  const popularSearches = [
    'Biryani', 'Pizza', 'Burger', 'Chinese', 'South Indian', 'North Indian'
  ];

  const trendingDishes = [
    { name: 'Chicken Biryani', restaurant: 'Paradise', image: '🍛' },
    { name: 'Margherita Pizza', restaurant: 'Dominos', image: '🍕' },
    { name: 'Masala Dosa', restaurant: 'Saravana Bhavan', image: '🥞' },
    { name: 'Chicken Tikka', restaurant: 'Barbeque Nation', image: '🍖' }
  ];

  const popularRestaurants = [
    { name: 'KFC', cuisine: 'American', image: '🍗' },
    { name: 'McDonald\'s', cuisine: 'Burgers', image: '🍔' },
    { name: 'Subway', cuisine: 'Healthy', image: '🥪' },
    { name: 'Pizza Hut', cuisine: 'Pizza', image: '🍕' }
  ];

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const handleSearch = (query = searchQuery) => {
    if (query.trim()) {
      // Save to recent searches
      const updated = [query, ...recentSearches.filter(item => item !== query)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      
      // Navigate to search results
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchQuery('');
      setShowSuggestions(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(e.target.value.length > 0 || isSearchFocused);
  };

  const removeRecentSearch = (searchToRemove) => {
    const updated = recentSearches.filter(item => item !== searchToRemove);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  return (
    <div className="relative min-h-[60vh] bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Floating Food Elements */}
      <div className="absolute top-8 left-8 animate-bounce opacity-20">
        <span className="text-6xl">🍛</span>
      </div>
      <div className="absolute top-20 right-12 animate-float opacity-20">
        <span className="text-4xl">🍕</span>
      </div>
      <div className="absolute bottom-20 left-16 animate-pulse opacity-20">
        <span className="text-5xl">🍔</span>
      </div>
      <div className="absolute bottom-32 right-8 animate-float opacity-20">
        <span className="text-4xl">🥘</span>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Order food from your
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                favourite restaurants
              </span>
            </h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Get your favourite food delivered to your doorstep in minutes
            </p>
          </div>

          {/* Search Section */}
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Location & Search Row */}
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Location Selector */}
                <div className="md:w-1/3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Location
                  </label>
                  <DeliveryLocationWidget className="w-full" />
                </div>

                {/* Search Input */}
                <div className="md:w-2/3 relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search for restaurants or food
                  </label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchInputChange}
                      onFocus={() => {
                        setIsSearchFocused(true);
                        setShowSuggestions(true);
                      }}
                      onBlur={() => {
                        setTimeout(() => {
                          setIsSearchFocused(false);
                          setShowSuggestions(false);
                        }, 200);
                      }}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      placeholder="Search for 'Biryani', 'Pizza', restaurants..."
                      className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                    />
                    {searchQuery && (
                      <button
                        onClick={clearSearch}
                        className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                    <button
                      onClick={() => handleSearch()}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500"
                    >
                      <Mic className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div className="mt-6">
                <button
                  onClick={() => handleSearch()}
                  className="w-full md:w-auto bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-4 px-8 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Find Food
                </button>
              </div>
            </div>

            {/* Search Suggestions Dropdown */}
            {showSuggestions && (
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-4xl mx-auto overflow-hidden">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center mb-3">
                      <Clock className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Recent Searches</span>
                    </div>
                    <div className="space-y-2">
                      {recentSearches.map((search, index) => (
                        <div key={index} className="flex items-center justify-between group">
                          <button
                            onClick={() => handleSearch(search)}
                            className="text-gray-600 hover:text-orange-600 transition-colors text-left flex-1"
                          >
                            {search}
                          </button>
                          <button
                            onClick={() => removeRecentSearch(search)}
                            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Searches */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center mb-3">
                    <TrendingUp className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700">Popular Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search)}
                        className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-orange-100 hover:text-orange-700 transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Trending Dishes */}
                <div className="p-4 border-b border-gray-100">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Trending Dishes</h4>
                  <div className="space-y-2">
                    {trendingDishes.map((dish, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(dish.name)}
                        className="w-full flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors text-left"
                      >
                        <span className="text-2xl mr-3">{dish.image}</span>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{dish.name}</div>
                          <div className="text-xs text-gray-500">{dish.restaurant}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular Restaurants */}
                <div className="p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Popular Restaurants</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {popularRestaurants.map((restaurant, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(restaurant.name)}
                        className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors text-left"
                      >
                        <span className="text-xl mr-3">{restaurant.image}</span>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{restaurant.name}</div>
                          <div className="text-xs text-gray-500">{restaurant.cuisine}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { number: '2000+', label: 'Restaurants' },
              { number: '50,000+', label: 'Happy Customers' },
              { number: '25 min', label: 'Avg Delivery' },
              { number: '4.8★', label: 'Rating' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.number}</div>
                <div className="text-orange-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernHeroSection;
