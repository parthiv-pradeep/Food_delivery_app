import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';
import { ShoppingCart, User, Lock } from 'lucide-react';

const ProtectedRoute = ({ children, type = 'general' }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    const getIcon = () => {
      switch (type) {
        case 'cart':
          return <ShoppingCart className="h-12 w-12 text-primary-500" />;
        case 'orders':
          return <User className="h-12 w-12 text-primary-500" />;
        default:
          return <Lock className="h-12 w-12 text-primary-500" />;
      }
    };

    const getTitle = () => {
      switch (type) {
        case 'cart':
          return 'Sign in to view your cart';
        case 'orders':
          return 'Sign in to view your orders';
        default:
          return 'Sign in required';
      }
    };

    const getDescription = () => {
      switch (type) {
        case 'cart':
          return 'Please sign in to add items to your cart and place orders.';
        case 'orders':
          return 'Please sign in to view your order history and track deliveries.';
        default:
          return 'Please sign in to access this feature.';
      }
    };

    return (
      <>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex justify-center mb-6">
                {getIcon()}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {getTitle()}
              </h2>
              <p className="text-gray-600 mb-8">
                {getDescription()}
              </p>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <User className="h-5 w-5" />
                <span>Sign In</span>
              </button>
            </div>
          </div>
        </div>
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      </>
    );
  }

  return children;
};

export default ProtectedRoute;
