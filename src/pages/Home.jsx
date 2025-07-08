import React from 'react';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import RestaurantList from '../components/RestaurantList';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Hero />
      {/* Mobile-optimized spacing and layout */}
      <div className="space-y-6 sm:space-y-12 pb-8 sm:pb-16">
        <Categories />
        <RestaurantList />
      </div>
    </div>
  );
};

export default Home;
