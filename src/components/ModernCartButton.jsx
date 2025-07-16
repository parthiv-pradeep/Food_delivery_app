import React from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ModernCartButton = ({ onClick, className = '' }) => {
  const { getTotalItems, getTotalPrice, cart } = useCart();
  const itemCount = getTotalItems();
  const totalPrice = getTotalPrice();

  if (itemCount === 0) {
    return (
      <button
        onClick={onClick}
        className={`relative p-3 text-gray-600 hover:text-orange-600 transition-all duration-200 hover:bg-orange-50 rounded-xl ${className}`}
      >
        <ShoppingCart className="h-6 w-6" />
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`relative group bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${className}`}
    >
      <div className="flex items-center space-x-3">
        {/* Cart Icon with Animation */}
        <div className="relative">
          <ShoppingCart className="h-5 w-5" />
          
          {/* Animated Badge */}
          <div className="absolute -top-2 -right-2 bg-yellow-400 text-orange-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
            {itemCount > 99 ? '99+' : itemCount}
          </div>
        </div>

        {/* Cart Details - Desktop Only */}
        <div className="hidden md:block text-left">
          <div className="text-sm font-semibold">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </div>
          <div className="text-xs opacity-90">
            ₹{totalPrice.toFixed(0)}
          </div>
        </div>

        {/* Chevron Indicator */}
        <div className="hidden md:block">
          <div className="w-1 h-1 bg-white rounded-full opacity-75"></div>
          <div className="w-1 h-1 bg-white rounded-full opacity-75 mt-1"></div>
          <div className="w-1 h-1 bg-white rounded-full opacity-75 mt-1"></div>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-200"></div>

      {/* Mini Cart Preview - Shows on Hover */}
      <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Your Cart</h3>
            <span className="text-sm text-gray-500">{itemCount} items</span>
          </div>
          
          {/* Cart Items Preview */}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {Object.entries(cart).slice(0, 3).map(([itemId, item]) => (
              <div key={itemId} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex-1">
                  <div className="font-medium text-sm text-gray-900 truncate">
                    {item.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    ₹{item.price} × {item.quantity}
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-900">
                  ₹{(item.price * item.quantity).toFixed(0)}
                </div>
              </div>
            ))}
            
            {Object.keys(cart).length > 3 && (
              <div className="text-center py-2 text-sm text-gray-500">
                +{Object.keys(cart).length - 3} more items
              </div>
            )}
          </div>

          {/* Total and Action */}
          <div className="border-t border-gray-200 pt-3 mt-3">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="font-bold text-lg text-orange-600">₹{totalPrice.toFixed(0)}</span>
            </div>
            <button className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
              View Cart & Checkout
            </button>
          </div>
        </div>
      </div>
    </button>
  );
};

export default ModernCartButton;
