import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, Star, Clock } from 'lucide-react';
import { localRestaurants } from '../data/localRestaurants';
import { formatCurrency } from '../utils/currency';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);

  // Filter restaurants and dishes based on search query
  const searchResults = localRestaurants.reduce((results, restaurant) => {
    const restaurantMatches = restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
                             restaurant.cuisine.toLowerCase().includes(query.toLowerCase());
    
    const matchingDishes = restaurant.menu.filter(dish =>
      dish.name.toLowerCase().includes(query.toLowerCase()) ||
      dish.description.toLowerCase().includes(query.toLowerCase())
    );

    if (restaurantMatches || matchingDishes.length > 0) {
      results.push({
        ...restaurant,
        matchingDishes: matchingDishes.length > 0 ? matchingDishes : null,
        matchType: restaurantMatches ? 'restaurant' : 'dishes'
      });
    }

    return results;
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      window.location.reload(); // Simple way to refresh results
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with Search */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
            
            <form onSubmit={handleSearch} className="flex-1">
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-3">
                <Search className="h-5 w-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for restaurants and food"
                  className="flex-1 bg-transparent outline-none text-gray-800 dark:text-white placeholder-gray-500"
                  autoFocus
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {query && (
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Search results for "{query}"
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
            </p>
          </div>
        )}

        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((restaurant) => (
              <div
                key={restaurant.id}
                onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Restaurant Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        restaurant.isOpen 
                          ? 'bg-green-500 text-white' 
                          : 'bg-red-500 text-white'
                      }`}>
                        {restaurant.isOpen ? 'Open' : 'Closed'}
                      </span>
                      <span className="bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                        {restaurant.deliveryTime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Restaurant Info */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {restaurant.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                    {restaurant.cuisine}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {restaurant.rating}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                  </div>

                  {/* Matching Dishes */}
                  {restaurant.matchingDishes && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Matching dishes:</p>
                      <div className="space-y-1">
                        {restaurant.matchingDishes.slice(0, 2).map((dish) => (
                          <div key={dish.id} className="flex justify-between items-center">
                            <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                              {dish.name}
                            </span>
                            <span className="text-sm font-medium text-primary-600 dark:text-primary-400 ml-2">
                              {formatCurrency(dish.price)}
                            </span>
                          </div>
                        ))}
                        {restaurant.matchingDishes.length > 2 && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            +{restaurant.matchingDishes.length - 2} more dishes
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No results found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We couldn't find any restaurants or dishes matching "{query}"
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Start searching
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Enter a restaurant name, cuisine, or dish to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
