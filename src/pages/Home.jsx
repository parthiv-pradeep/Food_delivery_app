import React from 'react';
import SwiggyStyleSearch from '../components/SwiggyStyleSearch';
import Categories from '../components/Categories';
import RestaurantList from '../components/RestaurantList';
import MeppayurHighlights from '../components/MeppayurHighlights';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Swiggy-like Search Section with Location */}
      <SwiggyStyleSearch />
      
      {/* Main Content */}
      <div className="space-y-4 sm:space-y-6 lg:space-y-12 pb-6 sm:pb-8 lg:pb-16">
        <Categories />
        <RestaurantList />
        <MeppayurHighlights />
      </div>
    </div>
  );
};

export default Home;
