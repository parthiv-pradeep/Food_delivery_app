import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Clock, Truck, Heart } from 'lucide-react';
import ScrollArea from './ui/ScrollArea';
import { localRestaurants } from '../data/localRestaurants';
import { formatCurrency } from '../utils/currency';

const RestaurantList = () => {
  const [favorites, setFavorites] = useState(new Set());
  const navigate = useNavigate();

  const restaurants = localRestaurants;

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
    <section id="restaurants" className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Restaurants near you
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Discover amazing food from local restaurants
            </p>
          </div>
          
          {/* Filter Buttons */}
          <div className="hidden md:flex space-x-4">
            <button className="px-4 py-2 bg-primary-500 text-white rounded-lg font-medium">
              All
            </button>
            <button className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-600">
              Fast Delivery
            </button>
            <button className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-600">
              Top Rated
            </button>
          </div>
        </div>

        {/* Restaurant Grid */}
        <ScrollArea className="h-[600px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 pr-2 sm:pr-4">
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
        </ScrollArea>

        {/* Load More Button */}
        <div className="text-center mt-10">
          <button className="bg-white dark:bg-gray-800 border-2 border-primary-500 text-primary-500 px-8 py-3 rounded-xl font-semibold hover:bg-primary-500 hover:text-white transition-colors duration-200">
            View More Restaurants
          </button>
        </div>
      </div>
    </section>
  );
};

export default RestaurantList;
