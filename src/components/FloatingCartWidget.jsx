import React, { useState } from 'react';
import { ShoppingCart, ArrowRight, X, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const FloatingCartWidget = () => {
  const { cart, getTotalItems, getTotalPrice, updateQuantity, removeFromCart } = useCart();
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  
  const itemCount = getTotalItems();
  const totalPrice = getTotalPrice();

  if (itemCount === 0) return null;

  const cartItems = Object.entries(cart);

  return (
    <>
      {/* Backdrop */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Floating Cart Widget */}
      <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96">
        {/* Collapsed State */}
        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <ShoppingCart className="h-6 w-6" />
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-orange-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                </div>
                <div>
                  <div className="font-semibold">
                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                  </div>
                  <div className="text-sm opacity-90">
                    Tap to review
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <div className="font-bold text-lg">₹{totalPrice.toFixed(0)}</div>
                  <div className="text-xs opacity-90">Total</div>
                </div>
                <ArrowRight className="h-5 w-5" />
              </div>
            </div>
          </button>
        )}

        {/* Expanded State */}
        {isExpanded && (
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-96 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">Your Cart</h3>
                <p className="text-sm opacity-90">{itemCount} items</p>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="max-h-60 overflow-y-auto">
              {cartItems.map(([itemId, item]) => (
                <div key={itemId} className="p-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-3">
                      <h4 className="font-medium text-gray-900 mb-1">{item.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{item.restaurant}</p>
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold text-orange-600">₹{item.price}</span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2 bg-gray-100 rounded-lg">
                        <button
                          onClick={() => {
                            if (item.quantity > 1) {
                              updateQuantity(itemId, item.quantity - 1);
                            } else {
                              removeFromCart(itemId);
                            }
                          }}
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <Minus className="h-4 w-4 text-gray-600" />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(itemId, item.quantity + 1)}
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <Plus className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                      
                      {/* Item Total */}
                      <div className="font-semibold text-gray-900">
                        ₹{(item.price * item.quantity).toFixed(0)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-gray-900">Total Amount</span>
                <span className="font-bold text-xl text-orange-600">₹{totalPrice.toFixed(0)}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setIsExpanded(false);
                    navigate('/cart');
                  }}
                  className="bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  View Cart
                </button>
                <button
                  onClick={() => {
                    setIsExpanded(false);
                    navigate('/checkout');
                  }}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FloatingCartWidget;
