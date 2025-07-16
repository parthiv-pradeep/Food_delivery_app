import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Clock, Percent } from 'lucide-react';
import DeliveryLocationSelector from './DeliveryLocationSelector';

const SwiggyStyleSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}&location=${currentLocation?.name || 'Meppayur'}`);
    }
  };

  const handleLocationChange = (location) => {
    setCurrentLocation(location);
  };

  return (
    <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
      
      {/* Floating Food Elements */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-8 animate-float opacity-20">
        <span className="text-2xl sm:text-4xl">🍛</span>
      </div>
      <div className="absolute top-8 sm:top-16 right-6 sm:right-12 animate-float-delayed opacity-20">
        <span className="text-xl sm:text-3xl">🥥</span>
      </div>
      <div className="absolute bottom-6 sm:bottom-12 left-8 sm:left-16 animate-bounce opacity-20">
        <span className="text-xl sm:text-3xl">🐟</span>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-2">
            Kerala's Favourite Food App
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-orange-100 mb-2 px-2">
            Discover the best food & drinks in Meppayur
          </p>
          <div className="flex items-center justify-center space-x-4 sm:space-x-6 text-xs sm:text-sm text-orange-200 flex-wrap gap-y-1">
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center space-x-1">
              <Percent className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Best Offers</span>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-3 sm:p-4 lg:p-6">
              {/* Location and Search Row */}
              <div className="flex flex-col gap-3 sm:gap-4">
                {/* Location Selector */}
                <div className="w-full sm:w-auto">
                  <DeliveryLocationSelector
                    currentLocation={currentLocation}
                    onLocationChange={handleLocationChange}
                    className="w-full"
                  />
                </div>

                {/* Search Bar */}
                <div className="w-full">
                  <form onSubmit={handleSearch} className="relative">
                    <div className="relative">
                      <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for restaurant, cuisine or a dish"
                        className="w-full pl-10 sm:pl-12 pr-16 sm:pr-20 py-2.5 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-500 text-sm sm:text-base"
                      />
                      <button
                        type="submit"
                        className="absolute right-1.5 sm:right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-md sm:rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium text-sm sm:text-base"
                      >
                        <span className="hidden sm:inline">Search</span>
                        <Search className="h-4 w-4 sm:hidden" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Popular Searches */}
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100">
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">Popular searches:</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {[
                    'Kerala Fish Curry',
                    'Biryani',
                    'Appam',
                    'Puttu',
                    'Seafood',
                    'Malabar Parotta',
                    'Coffee',
                    'Ice Cream'
                  ].map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchQuery(term);
                        navigate(`/search?q=${encodeURIComponent(term)}&location=${currentLocation?.name || 'Meppayur'}`);
                      }}
                      className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm hover:bg-orange-100 hover:text-orange-700 transition-colors duration-200 whitespace-nowrap"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6 sm:mt-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 text-white">
              <div className="text-lg sm:text-2xl font-bold">12+</div>
              <div className="text-xs sm:text-sm opacity-80">Restaurants</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 text-white">
              <div className="text-lg sm:text-2xl font-bold">150+</div>
              <div className="text-xs sm:text-sm opacity-80">Food Items</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 text-white">
              <div className="text-lg sm:text-2xl font-bold">25 min</div>
              <div className="text-xs sm:text-sm opacity-80">Avg Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwiggyStyleSearch;
