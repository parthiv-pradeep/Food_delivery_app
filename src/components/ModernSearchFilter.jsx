import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Star, 
  Clock, 
  DollarSign, 
  Zap,
  X,
  Check,
  MapPin,
  Truck,
  Heart,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const ModernSearchFilter = ({ 
  onSearchChange, 
  onFiltersChange, 
  searchQuery = '', 
  activeFilters = {},
  restaurantCount = 0 
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [filters, setFilters] = useState({
    sortBy: 'relevance',
    rating: '',
    deliveryTime: '',
    priceRange: '',
    cuisine: [],
    features: [],
    offers: false,
    ...activeFilters
  });

  // Search suggestions based on popular queries
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchSuggestions = [
    'Biryani near me',
    'Pizza delivery',
    'Chinese food',
    'South Indian breakfast',
    'Fast food',
    'Healthy options',
    'Desserts',
    'North Indian curry'
  ];

  // Filter options
  const sortOptions = [
    { value: 'relevance', label: 'Relevance', icon: Star },
    { value: 'rating', label: 'Rating', icon: Star },
    { value: 'deliveryTime', label: 'Delivery Time', icon: Clock },
    { value: 'priceLowToHigh', label: 'Price: Low to High', icon: DollarSign },
    { value: 'priceHighToLow', label: 'Price: High to Low', icon: DollarSign }
  ];

  const ratingFilters = [
    { value: '4.5+', label: '4.5+ Rated', color: 'text-green-600' },
    { value: '4.0+', label: '4.0+ Rated', color: 'text-yellow-600' },
    { value: '3.5+', label: '3.5+ Rated', color: 'text-orange-600' }
  ];

  const deliveryTimeFilters = [
    { value: '30', label: 'Under 30 mins', icon: Zap },
    { value: '45', label: 'Under 45 mins', icon: Clock },
    { value: '60', label: 'Under 1 hour', icon: Clock }
  ];

  const priceRangeFilters = [
    { value: 'budget', label: '₹ (Under ₹200)', range: 'Under ₹200' },
    { value: 'mid', label: '₹₹ (₹200-₹500)', range: '₹200-₹500' },
    { value: 'premium', label: '₹₹₹ (Above ₹500)', range: 'Above ₹500' }
  ];

  const cuisineOptions = [
    'North Indian', 'South Indian', 'Chinese', 'Italian', 'Continental',
    'Mexican', 'Thai', 'Japanese', 'American', 'Lebanese', 'Desserts', 'Beverages'
  ];

  const featureOptions = [
    { value: 'fastDelivery', label: 'Fast Delivery', icon: Zap },
    { value: 'freeDelivery', label: 'Free Delivery', icon: Truck },
    { value: 'topRated', label: 'Top Rated', icon: Star },
    { value: 'pureVeg', label: 'Pure Veg', icon: Heart },
    { value: 'liveTracking', label: 'Live Tracking', icon: MapPin }
  ];

  // Handle search input change
  const handleSearchChange = (value) => {
    setLocalSearchQuery(value);
    onSearchChange?.(value);
  };

  // Handle filter changes
  const handleFilterChange = (category, value) => {
    const newFilters = { ...filters };
    
    if (category === 'cuisine') {
      const currentCuisines = newFilters.cuisine || [];
      if (currentCuisines.includes(value)) {
        newFilters.cuisine = currentCuisines.filter(c => c !== value);
      } else {
        newFilters.cuisine = [...currentCuisines, value];
      }
    } else if (category === 'features') {
      const currentFeatures = newFilters.features || [];
      if (currentFeatures.includes(value)) {
        newFilters.features = currentFeatures.filter(f => f !== value);
      } else {
        newFilters.features = [...currentFeatures, value];
      }
    } else {
      newFilters[category] = newFilters[category] === value ? '' : value;
    }
    
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  // Clear all filters
  const clearAllFilters = () => {
    const clearedFilters = {
      sortBy: 'relevance',
      rating: '',
      deliveryTime: '',
      priceRange: '',
      cuisine: [],
      features: [],
      offers: false
    };
    setFilters(clearedFilters);
    onFiltersChange?.(clearedFilters);
  };

  // Count active filters
  const activeFilterCount = Object.values(filters).filter(value => {
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'boolean') return value;
    return value && value !== 'relevance';
  }).length;

  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
      {/* Search Bar */}
      <div className="px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={localSearchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Search for restaurants or dishes..."
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          {localSearchQuery && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Search Suggestions */}
        {showSuggestions && (
          <div className="absolute left-4 right-4 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto z-50">
            {searchSuggestions
              .filter(suggestion => 
                suggestion.toLowerCase().includes(localSearchQuery.toLowerCase())
              )
              .map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    handleSearchChange(suggestion);
                    setShowSuggestions(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center">
                    <Search className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-gray-700">{suggestion}</span>
                  </div>
                </button>
              ))}
          </div>
        )}
      </div>

      {/* Filter Controls */}
      <div className="px-4 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                isFilterOpen || activeFilterCount > 0
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <Filter className="h-4 w-4" />
              <span className="font-medium">Filters</span>
              {activeFilterCount > 0 && (
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                  {activeFilterCount}
                </span>
              )}
              {isFilterOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>

            {/* Quick Sort Buttons */}
            <div className="hidden md:flex space-x-2">
              {sortOptions.slice(0, 3).map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFilterChange('sortBy', option.value)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm transition-colors ${
                    filters.sortBy === option.value
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <option.icon className="h-4 w-4" />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="text-sm text-gray-600">
            {restaurantCount} restaurants found
          </div>
        </div>

        {/* Active Filters Display */}
        {activeFilterCount > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {filters.rating && (
              <span className="flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                {filters.rating} Rating
                <button
                  onClick={() => handleFilterChange('rating', '')}
                  className="ml-2 hover:text-orange-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filters.deliveryTime && (
              <span className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Under {filters.deliveryTime} mins
                <button
                  onClick={() => handleFilterChange('deliveryTime', '')}
                  className="ml-2 hover:text-blue-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filters.priceRange && (
              <span className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                {priceRangeFilters.find(p => p.value === filters.priceRange)?.range}
                <button
                  onClick={() => handleFilterChange('priceRange', '')}
                  className="ml-2 hover:text-green-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filters.cuisine.map((cuisine) => (
              <span key={cuisine} className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                {cuisine}
                <button
                  onClick={() => handleFilterChange('cuisine', cuisine)}
                  className="ml-2 hover:text-purple-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            <button
              onClick={clearAllFilters}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="max-h-96 overflow-y-auto">
            <div className="p-4 space-y-6">
              {/* Sort By */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Sort By
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleFilterChange('sortBy', option.value)}
                      className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors ${
                        filters.sortBy === option.value
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <option.icon className="h-4 w-4" />
                      <span className="text-sm">{option.label}</span>
                      {filters.sortBy === option.value && (
                        <Check className="h-4 w-4 ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Rating</h3>
                <div className="flex flex-wrap gap-2">
                  {ratingFilters.map((rating) => (
                    <button
                      key={rating.value}
                      onClick={() => handleFilterChange('rating', rating.value)}
                      className={`flex items-center space-x-1 px-4 py-2 rounded-lg border transition-colors ${
                        filters.rating === rating.value
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <Star className={`h-4 w-4 ${rating.color}`} />
                      <span className="text-sm">{rating.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery Time */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Delivery Time</h3>
                <div className="flex flex-wrap gap-2">
                  {deliveryTimeFilters.map((time) => (
                    <button
                      key={time.value}
                      onClick={() => handleFilterChange('deliveryTime', time.value)}
                      className={`flex items-center space-x-1 px-4 py-2 rounded-lg border transition-colors ${
                        filters.deliveryTime === time.value
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <time.icon className="h-4 w-4" />
                      <span className="text-sm">{time.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-2">
                  {priceRangeFilters.map((price) => (
                    <button
                      key={price.value}
                      onClick={() => handleFilterChange('priceRange', price.value)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                        filters.priceRange === price.value
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <span className="text-sm">{price.label}</span>
                      {filters.priceRange === price.value && (
                        <Check className="h-4 w-4" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cuisine */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Cuisine</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {cuisineOptions.map((cuisine) => (
                    <button
                      key={cuisine}
                      onClick={() => handleFilterChange('cuisine', cuisine)}
                      className={`p-3 rounded-lg border text-sm transition-colors ${
                        filters.cuisine.includes(cuisine)
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      {cuisine}
                      {filters.cuisine.includes(cuisine) && (
                        <Check className="h-3 w-3 ml-1 inline" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {featureOptions.map((feature) => (
                    <button
                      key={feature.value}
                      onClick={() => handleFilterChange('features', feature.value)}
                      className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors ${
                        filters.features.includes(feature.value)
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <feature.icon className="h-4 w-4" />
                      <span className="text-sm">{feature.label}</span>
                      {filters.features.includes(feature.value) && (
                        <Check className="h-4 w-4 ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex space-x-3">
              <button
                onClick={clearAllFilters}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernSearchFilter;
