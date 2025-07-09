import React, { useState } from 'react';
import { Search, MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { localRestaurants } from '../data/localRestaurants';

const SwiggySearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Meppayur, Kozhikode');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  // Filter restaurants based on search query
  const filteredRestaurants = localRestaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.menu.some(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  ).slice(0, 5); // Show only top 5 suggestions

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results or restaurant
      const restaurant = localRestaurants.find(r => 
        r.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (restaurant) {
        navigate(`/restaurant/${restaurant.id}`);
      } else {
        // Navigate to search results page with query
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      }
    }
  };

  const handleRestaurantClick = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
    setShowSuggestions(false);
    setSearchQuery('');
  };

  return (
    <section className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Order food online in <span className="text-yellow-300">Meppayur</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-100 max-w-2xl mx-auto">
            Discover the best food & drinks in Meppayur, Kozhikode
          </p>
        </div>

        {/* Search Container */}
        <div className="max-w-4xl mx-auto">
          {/* Location and Search Bar */}
          <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Location Input */}
              <div className="lg:col-span-1 relative">
                <div className="flex items-center bg-gray-50 rounded-xl px-4 py-3 border-2 border-transparent focus-within:border-primary-500 transition-colors">
                  <MapPin className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter your location"
                    className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Search Input */}
              <div className="lg:col-span-2 relative">
                <form onSubmit={handleSearch} className="flex items-center bg-gray-50 rounded-xl px-4 py-3 border-2 border-transparent focus-within:border-primary-500 transition-colors">
                  <Search className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(e.target.value.length > 0);
                    }}
                    onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                    placeholder="Search for restaurant, cuisine or a dish"
                    className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500"
                  />
                  <button
                    type="submit"
                    className="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors ml-3"
                  >
                    Search
                  </button>
                </form>

                {/* Search Suggestions */}
                {showSuggestions && searchQuery && (
                  <div className="absolute top-full left-0 right-0 bg-white rounded-xl shadow-lg border mt-2 z-50 max-h-80 overflow-y-auto">
                    {filteredRestaurants.length > 0 ? (
                      <>
                        <div className="px-4 py-2 bg-gray-50 border-b">
                          <p className="text-sm text-gray-600 font-medium">Restaurants</p>
                        </div>
                        {filteredRestaurants.map((restaurant) => (
                          <div
                            key={restaurant.id}
                            onClick={() => handleRestaurantClick(restaurant.id)}
                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 flex items-center"
                          >
                            <img
                              src={restaurant.image}
                              alt={restaurant.name}
                              className="w-12 h-12 rounded-lg object-cover mr-3"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800">{restaurant.name}</h4>
                              <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
                              <div className="flex items-center text-xs text-gray-500 mt-1">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{restaurant.deliveryTime}</span>
                                <span className="mx-2">•</span>
                                <span>⭐ {restaurant.rating}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className="px-4 py-6 text-center text-gray-500">
                        <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                        <p>No restaurants found for "{searchQuery}"</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Popular Searches */}
          <div className="text-center">
            <p className="text-white mb-4 font-medium">Popular searches:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Biryani', 'Fish Curry', 'Appam', 'Parotta', 'Seafood', 'Ice Cream'].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchQuery(term);
                    setShowSuggestions(true);
                  }}
                  className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm hover:bg-white/30 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
          <div className="text-center text-white">
            <div className="text-2xl sm:text-3xl font-bold mb-1">{localRestaurants.length}+</div>
            <div className="text-sm sm:text-base text-gray-200">Restaurants</div>
          </div>
          <div className="text-center text-white">
            <div className="text-2xl sm:text-3xl font-bold mb-1">500+</div>
            <div className="text-sm sm:text-base text-gray-200">Dishes</div>
          </div>
          <div className="text-center text-white">
            <div className="text-2xl sm:text-3xl font-bold mb-1">15min</div>
            <div className="text-sm sm:text-base text-gray-200">Avg Delivery</div>
          </div>
          <div className="text-center text-white">
            <div className="text-2xl sm:text-3xl font-bold mb-1">4.5⭐</div>
            <div className="text-sm sm:text-base text-gray-200">Avg Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SwiggySearchSection;
