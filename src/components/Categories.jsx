import React from 'react';
import { Link } from 'react-router-dom';
import { localCategories } from '../data/localCategories';

const Categories = ({ showAllCategories = false }) => {
  // Show all categories or limit to 8 for home page
  const categories = showAllCategories ? localCategories : localCategories.slice(0, 8);

  // Function to get mobile-friendly category name
  const getMobileName = (name) => {
    const shortNames = {
      'Kerala Traditional': 'Kerala',
      'Street Food': 'Street',
      'Fast Food': 'Fast',
      'Rice Dishes': 'Rice',
      'Beverages': 'Drinks'
    };
    return shortNames[name] || name;
  };

  return (
    <section className="py-4 sm:py-6 lg:py-12 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="text-center mb-4 sm:mb-6 lg:mb-10">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
            What's on your mind?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base lg:text-lg">
            Choose from a variety of cuisines
          </p>
        </div>

        {/* Categories Grid */}
        <div className="categories-container w-full">
          <div className="categories-scroll categories-grid flex sm:grid sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3 lg:gap-6 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-4 px-1 scrollbar-none">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className={`${category.color} p-2 sm:p-3 lg:p-6 rounded-lg sm:rounded-xl lg:rounded-2xl hover:scale-105 transition-all duration-200 group hover:shadow-lg flex-shrink-0 w-20 sm:w-28 lg:w-auto min-h-[85px] sm:min-h-[110px] lg:min-h-[130px]`}
              >
              <div className="text-center flex flex-col justify-center h-full">
                <div className="text-lg sm:text-2xl lg:text-4xl mb-1 sm:mb-2 lg:mb-3 group-hover:scale-110 transition-transform duration-200">
                  {category.emoji}
                </div>
                <p className="text-[9px] sm:text-[11px] lg:text-sm font-semibold text-gray-800 dark:text-gray-200 category-text px-0.5 text-center">
                  <span className="sm:hidden">{getMobileName(category.name)}</span>
                  <span className="hidden sm:inline">{category.name}</span>
                </p>
              </div>
            </Link>
          ))}
          </div>
        </div>

        {/* View All Button - Only show on home page */}
        {!showAllCategories && (
          <div className="text-center mt-6 sm:mt-8">
            <Link 
              to="/categories"
              className="inline-block bg-primary-500 hover:bg-primary-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-colors duration-200 text-sm sm:text-base"
            >
              View All Categories
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;
