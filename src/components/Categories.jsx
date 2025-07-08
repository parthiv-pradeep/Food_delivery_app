import React from 'react';
import { Link } from 'react-router-dom';
import ScrollArea from './ui/ScrollArea';
import { localCategories } from '../data/localCategories';

const Categories = () => {
  const categories = localCategories;

  return (
    <section className="py-6 sm:py-12 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
            What's on your mind?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
            Choose from a variety of cuisines
          </p>
        </div>

        {/* Categories Grid */}
        <ScrollArea orientation="horizontal" className="w-full">
          <div className="flex lg:grid lg:grid-cols-8 gap-3 sm:gap-4 lg:gap-6 min-w-max lg:min-w-0 pb-2 sm:pb-4 px-1">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className={`${category.color} p-3 sm:p-6 rounded-xl sm:rounded-2xl hover:scale-105 transition-all duration-200 group hover:shadow-lg flex-shrink-0 w-20 sm:w-32 lg:w-auto`}
              >
              <div className="text-center">
                <div className="text-2xl sm:text-4xl mb-1 sm:mb-3 group-hover:scale-110 transition-transform duration-200">
                  {category.emoji}
                </div>
                <p className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {category.name}
                </p>
              </div>
            </Link>
          ))}
          </div>
        </ScrollArea>

        {/* View All Button */}
        <div className="text-center mt-8">
          <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200">
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default Categories;
