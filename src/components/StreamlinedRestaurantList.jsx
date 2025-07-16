import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { localRestaurants } from '../data/localRestaurants';
import QuickBookingRestaurantCard from './QuickBookingRestaurantCard';

const StreamlinedRestaurantList = ({ showAllRestaurants = false }) => {
  // Show all restaurants or limit to 8 for home page
  const restaurants = showAllRestaurants ? localRestaurants : localRestaurants.slice(0, 8);

  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Restaurants delivering to you
            </h2>
            <p className="text-gray-600">
              {restaurants.length} places ready to deliver
            </p>
          </div>
          {!showAllRestaurants && (
            <Link 
              to="/restaurants"
              className="flex items-center text-orange-600 hover:text-orange-700 font-medium"
            >
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          )}
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {restaurants.map((restaurant) => (
            <QuickBookingRestaurantCard 
              key={restaurant.id} 
              restaurant={restaurant} 
            />
          ))}
        </div>

        {/* CTA Section for Home Page */}
        {!showAllRestaurants && (
          <div className="text-center mt-10 bg-white rounded-2xl p-8 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Hungry for more options?
            </h3>
            <p className="text-gray-600 mb-4">
              Explore hundreds of restaurants in your area
            </p>
            <Link 
              to="/restaurants"
              className="inline-block bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors"
            >
              Browse All Restaurants
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default StreamlinedRestaurantList;
