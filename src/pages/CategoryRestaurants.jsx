import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, Clock, Truck, Heart, ArrowLeft, Filter } from 'lucide-react';
import { localRestaurants } from '../data/localRestaurants';
import { localCategories } from '../data/localCategories';

const CategoryRestaurants = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(new Set());
  const [sortBy, setSortBy] = useState('rating');

  // Scroll to top when component mounts or category changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  // Get category information
  const categoryInfo = localCategories.find(cat => cat.id === category);
  
  // Filter restaurants based on category
  const getRestaurantsForCategory = () => {
    return localRestaurants.filter(restaurant => {
      // Match by cuisine type or menu categories
      const cuisineMatch = restaurant.cuisine.toLowerCase().includes(category.replace('-', ' '));
      const menuCategoryMatch = restaurant.menu.some(item => 
        item.category.toLowerCase().includes(category.replace('-', ' '))
      );
      
      // Specific category mappings
      switch(category) {
        case 'kerala-traditional':
          return restaurant.cuisine.includes('Kerala') || restaurant.cuisine.includes('Traditional');
        case 'biryani':
          return restaurant.cuisine.includes('Biryani') || restaurant.menu.some(item => 
            item.name.toLowerCase().includes('biryani')
          );
        case 'seafood':
          return restaurant.cuisine.includes('Seafood');
        case 'breakfast':
          return restaurant.menu.some(item => item.category === 'Breakfast');
        case 'street-food':
          return restaurant.cuisine.includes('Street Food');
        case 'beverages':
          return restaurant.cuisine.includes('Beverages') || restaurant.cuisine.includes('Juices');
        case 'desserts':
          return restaurant.cuisine.includes('Desserts') || restaurant.cuisine.includes('Ice Cream');
        case 'vegetarian':
          return restaurant.cuisine.includes('Vegetarian');
        case 'fast-food':
          return restaurant.cuisine.includes('Fast Food');
        case 'arabic':
          return restaurant.cuisine.includes('Arabic');
        case 'bakery':
          return restaurant.cuisine.includes('Bakery');
        case 'snacks':
          return restaurant.menu.some(item => item.category === 'Snacks');
        default:
          return cuisineMatch || menuCategoryMatch;
      }
    });
  };

  const filteredRestaurants = getRestaurantsForCategory();

  // Sort restaurants
  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'deliveryTime':
        return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </button>
              <div className="flex items-center space-x-3">
                <span className="text-4xl">{categoryInfo?.emoji || '🍽️'}</span>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {categoryInfo?.name || category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">{sortedRestaurants.length} restaurants available</p>
                </div>
              </div>
            </div>
            
            {/* Sort Options */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="rating">Sort by Rating</option>
                  <option value="deliveryTime">Sort by Delivery Time</option>
                  <option value="name">Sort by Name</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurants Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRestaurants.map((restaurant) => (
            <Link
              key={restaurant.id}
              to={`/restaurant/${restaurant.id}`}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
            >
              {/* Restaurant Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={restaurant.image} 
                  alt={restaurant.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Open Badge */}
                {restaurant.isOpen && (
                  <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Open
                  </div>
                )}
                
                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(restaurant.id);
                  }}
                  className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:scale-110 transition-transform duration-200"
                >
                  <Heart 
                    className={`h-4 w-4 ${
                      favorites.has(restaurant.id) 
                        ? 'text-red-500 fill-current' 
                        : 'text-gray-400'
                    }`} 
                  />
                </button>

                {/* Free Delivery Badge */}
                {restaurant.deliveryFee === "Free" && (
                  <div className="absolute bottom-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Free Delivery
                  </div>
                )}
              </div>

              {/* Restaurant Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors">
                  {restaurant.name}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  {restaurant.cuisine}
                </p>

                {/* Popular Items */}
                <div className="mb-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Popular items:</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {restaurant.menu.slice(0, 3).map(item => item.name).join(', ')}
                  </p>
                </div>

                {/* Rating and Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {restaurant.rating}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Truck className="h-4 w-4" />
                      <span>{restaurant.deliveryFee}</span>
                    </div>
                  </div>
                </div>

                {/* Order Button */}
                <button className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-xl font-semibold transition-colors duration-200">
                  View Menu
                </button>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {sortedRestaurants.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No restaurants found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try a different category or check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryRestaurants;
