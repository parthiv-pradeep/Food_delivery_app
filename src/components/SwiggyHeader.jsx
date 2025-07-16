import React from 'react';
import { Search, MapPin, User, ShoppingCart, ChevronDown, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocation } from '../utils/locationService';

const SwiggyHeader = () => {
  const { 
    location, 
    isLoading: isLoadingLocation, 
    error: locationError, 
    refreshLocation, 
    getPreciseLocation 
  } = useLocation();

  const handleLocationClick = () => {
    // When user clicks on location, try to get precise GPS location
    getPreciseLocation();
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="px-4 py-3">
          {/* Top Row - Location & Profile */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center flex-1 min-w-0">
              <MapPin className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center">
                  <button 
                    onClick={handleLocationClick}
                    className="flex items-center group"
                    disabled={isLoadingLocation}
                  >
                    <span className="text-lg font-semibold text-gray-900 mr-1 group-hover:text-orange-500 transition-colors">
                      {isLoadingLocation ? "Detecting..." : "Current Location"}
                    </span>
                    {isLoadingLocation ? (
                      <Loader2 className="h-4 w-4 text-gray-600 animate-spin" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-600 group-hover:text-orange-500 transition-colors" />
                    )}
                  </button>
                </div>
                <p className="text-sm text-gray-600 truncate" title={location}>
                  {location}
                </p>
                {locationError && (
                  <p className="text-xs text-red-500 mt-1">{locationError}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-3 flex-shrink-0">
              <Link to="/cart" className="relative p-2">
                <ShoppingCart className="h-6 w-6 text-gray-700" />
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Link>
              <Link to="/profile" className="p-2">
                <User className="h-6 w-6 text-gray-700" />
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for restaurants and food"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden lg:block bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="text-2xl font-bold text-orange-500 mr-8">FoodFlow</div>
            </Link>

            {/* Location */}
            <div className="flex items-center flex-1 max-w-md">
              <MapPin className="h-5 w-5 text-orange-500 mr-2" />
              <div className="flex-1">
                <button 
                  onClick={handleLocationClick}
                  className="flex items-center group"
                  disabled={isLoadingLocation}
                >
                  <span className="font-semibold text-gray-900 mr-1 group-hover:text-orange-500 transition-colors">
                    {isLoadingLocation ? "Detecting..." : "Deliver to"}
                  </span>
                  {isLoadingLocation ? (
                    <Loader2 className="h-4 w-4 text-gray-600 animate-spin" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-600 group-hover:text-orange-500 transition-colors" />
                  )}
                </button>
                <p className="text-sm text-gray-600 truncate" title={location}>
                  {location}
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for restaurants and food"
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Navigation & Actions */}
            <div className="flex items-center space-x-6">
              <Link to="/cart" className="relative p-2">
                <ShoppingCart className="h-6 w-6 text-gray-700" />
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Link>
              <Link to="/profile" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-orange-500 transition-colors">
                <User className="h-5 w-5" />
                <span className="font-medium">Sign In</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default SwiggyHeader;
