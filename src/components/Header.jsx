import React, { useState } from 'react';
import { MapPin, User, ShoppingCart, Menu, X, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import LocationModal from './LocationModal';
import LoginModal from './LoginModal';
import UserMenu from './UserMenu';
import Cart from './Cart';
import ProtectedRoute from './ProtectedRoute';
import ScrollArea from './ui/ScrollArea';
// import SearchDropdown from './SearchDropdown';

const Header = () => {
  const { getTotalItems } = useCart();
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Downtown, NYC');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleLocationUpdate = (address) => {
    setCurrentLocation(address);
    setIsLocationModalOpen(false);
  };

  const handleCartClick = () => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }
    setIsCartOpen(true);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl sm:text-2xl font-bold text-primary-500">FoodFlow</h1>
            </div>
          </div>

          {/* Location Picker - Compact for mobile */}
          <div className="flex md:hidden items-center text-gray-600">
            <button 
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center space-x-1 text-xs bg-gray-100 px-2 py-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              <MapPin className="h-3 w-3" />
              <span className="max-w-16 truncate">{currentLocation.split(',')[0]}</span>
            </button>
          </div>

          {/* Location Picker - Desktop */}
          <div className="hidden md:flex items-center space-x-2 text-gray-600">
            <MapPin className="h-5 w-5" />
            <span className="text-sm">Deliver to: </span>
            <button 
              onClick={() => setIsLocationModalOpen(true)}
              className="text-sm font-medium text-gray-900 hover:text-primary-500 transition-colors"
            >
              {currentLocation}
            </button>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Search for restaurants, cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-1 sm:space-x-4">
            {/* Cart */}
            <button 
              onClick={handleCartClick}
              className="relative p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
              {isAuthenticated && getTotalItems() > 0 && (
                <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-primary-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-medium">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-4 w-4 text-gray-600" />
              ) : (
                <Menu className="h-4 w-4 text-gray-600" />
              )}
            </button>

            {/* User Menu - Desktop only */}
            <div className="hidden md:block">
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-sm text-gray-700">Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-200 bg-gray-50">
            {/* Mobile Search */}
            <div className="mb-3 px-1">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Search for restaurants, cuisines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Mobile Location */}
            <div className="mb-3 px-1">
              <button 
                onClick={() => setIsLocationModalOpen(true)}
                className="flex items-center space-x-2 w-full p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <MapPin className="h-4 w-4 text-gray-500" />
                <div className="text-left">
                  <div className="text-xs text-gray-500">Deliver to</div>
                  <div className="text-sm font-medium text-gray-900">{currentLocation}</div>
                </div>
              </button>
            </div>

            {/* Mobile User Menu */}
            <div className="space-y-1 px-1">
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/orders"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-white transition-colors"
                  >
                    <User className="h-5 w-5 text-primary-500" />
                    <span className="text-sm font-medium text-gray-700">My Orders</span>
                  </Link>
                  
                  <button 
                    onClick={() => {
                      handleCartClick();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-white transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <ShoppingCart className="h-5 w-5 text-primary-500" />
                      <span className="text-sm font-medium text-gray-700">Cart</span>
                    </div>
                    {getTotalItems() > 0 && (
                      <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        {getTotalItems()}
                      </span>
                    )}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setIsLoginModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-white transition-colors"
                >
                  <User className="h-5 w-5 text-primary-500" />
                  <span className="text-sm font-medium text-gray-700">Sign In</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Location Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentLocation={currentLocation}
        onLocationChange={handleLocationUpdate}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      {/* Cart Modal */}
      {isAuthenticated && (
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
