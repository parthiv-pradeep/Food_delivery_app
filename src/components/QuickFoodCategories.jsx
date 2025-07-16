import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickFoodCategories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: 'Biryani',
      emoji: '🍛',
      color: 'from-orange-400 to-red-500',
      popular: true,
      restaurants: 45
    },
    {
      id: 2,
      name: 'Pizza',
      emoji: '🍕',
      color: 'from-red-400 to-pink-500',
      popular: true,
      restaurants: 32
    },
    {
      id: 3,
      name: 'Burgers',
      emoji: '🍔',
      color: 'from-yellow-400 to-orange-500',
      popular: false,
      restaurants: 28
    },
    {
      id: 4,
      name: 'Chinese',
      emoji: '🍜',
      color: 'from-green-400 to-teal-500',
      popular: true,
      restaurants: 38
    },
    {
      id: 5,
      name: 'South Indian',
      emoji: '🥞',
      color: 'from-purple-400 to-indigo-500',
      popular: true,
      restaurants: 52
    },
    {
      id: 6,
      name: 'Desserts',
      emoji: '🍦',
      color: 'from-pink-400 to-rose-500',
      popular: false,
      restaurants: 21
    },
    {
      id: 7,
      name: 'North Indian',
      emoji: '🍛',
      color: 'from-indigo-400 to-purple-500',
      popular: true,
      restaurants: 41
    },
    {
      id: 8,
      name: 'Snacks',
      emoji: '🍿',
      color: 'from-teal-400 to-cyan-500',
      popular: false,
      restaurants: 35
    }
  ];

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.name.toLowerCase()}`);
  };

  const handleViewAll = () => {
    navigate('/categories');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">What's on your mind?</h2>
            <p className="text-gray-600 mt-1">Quick bites and favorites</p>
          </div>
          <button
            onClick={handleViewAll}
            className="flex items-center text-orange-600 hover:text-orange-700 font-medium"
          >
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className="group relative bg-white rounded-2xl p-4 hover:shadow-lg transition-all duration-200 border border-gray-100 text-center"
            >
              {/* Popular Badge */}
              {category.popular && (
                <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                  🔥
                </div>
              )}

              {/* Category Image/Emoji with Gradient Background */}
              <div className={`w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-200`}>
                {category.emoji}
              </div>

              {/* Category Name */}
              <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-orange-600 transition-colors">
                {category.name}
              </h3>

              {/* Restaurant Count */}
              <p className="text-xs text-gray-500">
                {category.restaurants} places
              </p>
            </button>
          ))}
        </div>

        {/* Browse All Categories CTA */}
        <div className="text-center mt-8">
          <button
            onClick={handleViewAll}
            className="bg-orange-500 text-white px-8 py-3 rounded-xl font-medium hover:bg-orange-600 transition-colors"
          >
            Browse All Categories
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickFoodCategories;
