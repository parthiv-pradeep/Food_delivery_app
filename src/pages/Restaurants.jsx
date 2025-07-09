import React from 'react';
import RestaurantList from '../components/RestaurantList';

const Restaurants = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Page Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Restaurants in Meppayur
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover the best restaurants in Meppayur, Kozhikode. From traditional Kerala cuisine to modern delights, 
              find your favorite food delivered fresh to your doorstep.
            </p>
          </div>
        </div>
      </div>

      {/* Restaurants List */}
      <div className="py-8 sm:py-12">
        <RestaurantList showAllRestaurants={true} />
      </div>
    </div>
  );
};

export default Restaurants;
