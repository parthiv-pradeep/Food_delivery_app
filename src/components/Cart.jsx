import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CheckoutModal from './CheckoutModal';
import ScrollArea from './ui/ScrollArea';

const Cart = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      setShowCheckout(true);
    }
  };

  return (
    <>
      {/* Cart Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
          {/* Cart Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-primary-500" />
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                Cart ({getTotalItems()})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
            </button>
          </div>

          {/* Cart Content */}
          <ScrollArea className="flex-1 max-h-96">
            <div className="p-3 sm:p-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-6 sm:py-8">
                  <ShoppingCart className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">Your cart is empty</p>
                  <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 mt-2">
                    Add some delicious food to get started!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.restaurantId}`} className="flex items-center space-x-2 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      {/* Item Image */}
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                        <span className="text-sm sm:text-lg">{item.emoji || '🍽️'}</span>
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {item.restaurantName}
                        </p>
                        <p className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                          ${item.price}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.restaurantId, item.quantity - 1)}
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                        >
                          <Minus className="h-3 w-3 text-gray-600 dark:text-gray-300" />
                        </button>
                        <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white min-w-[16px] sm:min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.restaurantId, item.quantity + 1)}
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                        >
                          <Plus className="h-3 w-3 text-gray-600 dark:text-gray-300" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id, item.restaurantId)}
                        className="p-1 sm:p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Cart Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-700 p-3 sm:p-4">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                  Total: ${getTotalPrice().toFixed(2)}
                </span>
                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-2.5 sm:py-3 px-4 rounded-lg transition-colors text-sm sm:text-base"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        onSuccess={() => {
          setShowCheckout(false);
          onClose();
        }}
      />
    </>
  );
};

export default Cart;
