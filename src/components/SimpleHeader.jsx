import React, { useState } from 'react';
import { ShoppingCart, Menu, X, User, MapPin, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLocation as useCurrentLocation } from '../utils/locationService';
import DeliveryLocationWidget from './DeliveryLocationWidget';
import MobileNavigation from './MobileNavigation';
import ModernCartButton from './ModernCartButton';
import LoginModal from './LoginModal';
import UserMenu from './UserMenu';
import Cart from './Cart';

const SimpleHeader = () => {
  const { getTotalItems } = useCart();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const isHomePage = location.pathname === '/';

  return (
    <>
      <header className={`bg-white shadow-md sticky top-0 z-40 ${isHomePage ? 'shadow-none' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🍛</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                FoodFlow
              </span>
            </Link>

            {/* Delivery Location Widget - Desktop */}
            <div className="hidden md:block">
              <DeliveryLocationWidget className="max-w-xs" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-orange-600 transition-colors duration-200 font-medium"
              >
                Home
              </Link>
              <Link 
                to="/restaurants" 
                className="text-gray-700 hover:text-orange-600 transition-colors duration-200 font-medium"
              >
                Restaurants
              </Link>
              <Link 
                to="/categories" 
                className="text-gray-700 hover:text-orange-600 transition-colors duration-200 font-medium"
              >
                Categories
              </Link>
              <Link 
                to="/location-test" 
                className="flex items-center text-gray-700 hover:text-orange-600 transition-colors duration-200 font-medium"
              >
                <MapPin className="h-4 w-4 mr-1" />
                Location
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Modern Cart Button */}
              <ModernCartButton onClick={handleCartClick} />

              {/* User Menu */}
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:text-orange-600 transition-colors duration-200"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4 space-y-4">
              {/* Delivery Location - Mobile */}
              <div className="px-4 py-2 border-b border-gray-100">
                <DeliveryLocationWidget />
              </div>
              
              <Link 
                to="/" 
                className="block text-gray-700 hover:text-orange-600 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/restaurants" 
                className="block text-gray-700 hover:text-orange-600 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Restaurants
              </Link>
              <Link 
                to="/categories" 
                className="block text-gray-700 hover:text-orange-600 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                to="/manage-addresses" 
                className="flex items-center text-gray-700 hover:text-orange-600 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Manage Addresses
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Modals */}
      {isLoginModalOpen && (
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)} 
        />
      )}

      {/* Cart */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Mobile Navigation */}
      <MobileNavigation 
        isOpen={isMenuOpen} 
        setIsOpen={setIsMenuOpen}
        user={isAuthenticated ? { name: 'John Doe', phone: '+91 9876543210' } : null}
        cartCount={getTotalItems()}
      />
    </>
  );
};

export default SimpleHeader;
