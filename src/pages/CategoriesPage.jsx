import React from 'react';
import Categories from '../components/Categories';

const CategoriesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Page Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Food Categories
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore different types of cuisine available in Meppayur. From traditional Kerala dishes to 
              international favorites, discover restaurants by food category.
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="py-8 sm:py-12">
        <Categories showAllCategories={true} />
      </div>
    </div>
  );
};

export default CategoriesPage;
