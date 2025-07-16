import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { localRestaurants } from '../data/localRestaurants';
import QuickBookingRestaurantCard from './QuickBookingRestaurantCard';

const RestaurantList = ({ showAllRestaurants = false }) => {
  const navigate = useNavigate();

  // Show all restaurants or limit to 8 for home page
  const restaurants = showAllRestaurants ? localRestaurants : localRestaurants.slice(0, 8);

  const toggleFavorite = (restaurantId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(restaurantId)) {
      newFavorites.delete(restaurantId);
    } else {
      newFavorites.add(restaurantId);
    }
    setFavorites(newFavorites);
  };

  return (
    <section id="restaurants" className="py-12 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Restaurants with online food delivery in Meppayur
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Discover {restaurants.length} restaurants serving authentic Kerala cuisine
          </p>

        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
            >
              {/* Restaurant Image */}
              <div className="relative h-32 sm:h-48 overflow-hidden">
                <img 
                  src={restaurant.image} 
                  alt={restaurant.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Promoted Badge */}
                {restaurant.isOpen && (
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-green-500 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-semibold">
                    Open
                  </div>
                )}
                
                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(restaurant.id)}
                  className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:scale-110 transition-transform duration-200"
                >
                  <Heart 
                    className={`h-3 w-3 sm:h-4 sm:w-4 ${
                      favorites.has(restaurant.id) 
                        ? 'text-red-500 fill-current' 
                        : 'text-gray-400'
                    }`} 
                  />
                </button>

                {/* Offer Badge */}
                {restaurant.deliveryFee === "Free" && (
                  <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-green-500 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-semibold">
                    Free Delivery
                  </div>
                )}
              </div>

              {/* Restaurant Info */}
              <div className="p-3 sm:p-6">
                <Link to={`/restaurant/${restaurant.id}`}>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:text-primary-500 transition-colors line-clamp-1">
                    {restaurant.name}
                  </h3>
                </Link>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 line-clamp-1">
                  {restaurant.cuisine}
                </p>

                {/* Rating and Info */}
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
                    <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                      {restaurant.rating}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline">{restaurant.deliveryTime}</span>
                      <span className="sm:hidden">{restaurant.deliveryTime.split('-')[0]}min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Truck className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{restaurant.deliveryFee}</span>
                    </div>
                  </div>
                </div>

                {/* Order Button */}
                <button 
                  onClick={() => {
                    // Clean navigation to restaurant page
                    navigate(`/restaurant/${restaurant.id}`);
                  }}
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-colors duration-200 text-sm sm:text-base"
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button - Only show on home page */}
        {!showAllRestaurants && (
          <div className="text-center mt-10">
            <Link 
              to="/restaurants"
              className="inline-block bg-white dark:bg-gray-800 border-2 border-primary-500 text-primary-500 px-8 py-3 rounded-xl font-semibold hover:bg-primary-500 hover:text-white transition-colors duration-200"
            >
              View More Restaurants
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default RestaurantList;
