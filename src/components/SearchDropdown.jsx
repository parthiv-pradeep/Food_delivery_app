import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Utensils, Search } from 'lucide-react';
import { localRestaurants } from '../data/localRestaurants';
import { localCategories } from '../data/localCategories';

const SearchDropdown = ({ query, onResultClick }) => {
  if (!query) {
    return null;
  }

  const lowerCaseQuery = query.toLowerCase();

  const filteredRestaurants = (localRestaurants || []).filter(r => {
    if (!r || !r.name) return false;
    const nameMatch = r.name.toLowerCase().includes(lowerCaseQuery);
    const cuisineMatch = r.cuisine && r.cuisine.toLowerCase().includes(lowerCaseQuery);
    const menuMatch = Array.isArray(r.menu) && r.menu.some(item => item && item.name && item.name.toLowerCase().includes(lowerCaseQuery));
    return nameMatch || cuisineMatch || menuMatch;
  }).slice(0, 5);

  const filteredCategories = (localCategories || []).filter(c => 
    c && c.name && c.name.toLowerCase().includes(lowerCaseQuery)
  ).slice(0, 3);

  const hasResults = filteredRestaurants.length > 0 || filteredCategories.length > 0;

  return (
    <div className="absolute top-full mt-2 w-full max-w-lg bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
      <div className="max-h-[60vh] overflow-y-auto">
        {hasResults ? (
          <>
            {filteredCategories.length > 0 && (
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">Categories</h3>
                <ul className="space-y-2">
                  {filteredCategories.map(category => (
                    <li key={category.id}>
                      <Link
                        to={`/category/${category.id}`}
                        onClick={onResultClick}
                        className="flex items-center justify-between p-3 -m-3 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{category.emoji}</span>
                          <div>
                            <p className="font-semibold text-gray-800">{category.name}</p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {filteredRestaurants.length > 0 && (
              <div className="p-4 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">Restaurants</h3>
                <ul className="space-y-2">
                  {filteredRestaurants.map(restaurant => (
                    <li key={restaurant.id}>
                      <Link
                        to={`/restaurant/${restaurant.id}`}
                        onClick={onResultClick}
                        className="flex items-center justify-between p-3 -m-3 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                            <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{restaurant.name}</p>
                            <p className="text-sm text-gray-500 flex items-center">
                              <Utensils className="w-3 h-3 mr-1" />
                              {restaurant.cuisine}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          <div className="p-6 text-center">
            <Search className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No results found</h3>
            <p className="mt-1 text-sm text-gray-500">Try searching for something else.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDropdown;
