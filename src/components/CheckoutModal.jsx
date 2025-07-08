import React, { useState } from 'react';
import { X, CreditCard, Banknote, CheckCircle, MapPin, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CheckoutModal = ({ isOpen, onClose, onSuccess }) => {
  const { cartItems, getTotalPrice, createOrder } = useCart();
  const [selectedPayment, setSelectedPayment] = useState('cash');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  if (!isOpen) return null;

  const paymentMethods = [
    {
      id: 'cash',
      name: 'Cash on Delivery',
      icon: Banknote,
      description: 'Pay when your order arrives'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Pay securely with your card'
    }
  ];

  const deliveryFee = 2.99;
  const tax = getTotalPrice() * 0.08; // 8% tax
  const totalAmount = getTotalPrice() + deliveryFee + tax;

  const handlePlaceOrder = async () => {
    if (!deliveryAddress.trim() || !phoneNumber.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      const orderData = {
        paymentMethod: selectedPayment,
        deliveryAddress: deliveryAddress.trim(),
        phoneNumber: phoneNumber.trim(),
        specialInstructions: specialInstructions.trim(),
        subtotal: getTotalPrice(),
        deliveryFee,
        tax,
        total: totalAmount,
        estimatedDelivery: new Date(Date.now() + 30 * 60000).toISOString() // 30 minutes from now
      };

      createOrder(orderData);
      setIsProcessing(false);
      setOrderSuccess(true);

      // Auto close after success
      setTimeout(() => {
        setOrderSuccess(false);
        onSuccess();
      }, 3000);
    }, 2000);
  };

  if (orderSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Your delicious food is on its way. You can track your order in the "My Orders" section.
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>Estimated delivery: 25-35 minutes</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full max-h-[95vh] sm:max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            Checkout
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-3 sm:p-4 space-y-4 sm:space-y-6">
          {/* Order Summary */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Order Summary
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 space-y-2">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.restaurantId}`} className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="border-t border-gray-200 dark:border-gray-600 pt-2 mt-2 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                  <span className="text-gray-900 dark:text-white">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Delivery Fee</span>
                  <span className="text-gray-900 dark:text-white">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Tax</span>
                  <span className="text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t border-gray-200 dark:border-gray-600 pt-1">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-primary-600 dark:text-primary-400">${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Delivery Information
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Delivery Address *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <textarea
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Enter your complete address..."
                    className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    rows="2"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Special Instructions (Optional)
                </label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Any special instructions for delivery..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows="2"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Payment Method
            </h3>
            <div className="space-y-3">
              {paymentMethods.map((method) => {
                const IconComponent = method.icon;
                return (
                  <div
                    key={method.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPayment === method.id
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                    onClick={() => setSelectedPayment(method.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        selectedPayment === method.id
                          ? 'bg-primary-100 dark:bg-primary-800'
                          : 'bg-gray-100 dark:bg-gray-700'
                      }`}>
                        <IconComponent className={`h-5 w-5 ${
                          selectedPayment === method.id
                            ? 'text-primary-600 dark:text-primary-400'
                            : 'text-gray-600 dark:text-gray-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {method.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {method.description}
                        </p>
                      </div>
                      <div className={`w-4 h-4 border-2 rounded-full ${
                        selectedPayment === method.id
                          ? 'border-primary-500 bg-primary-500'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}>
                        {selectedPayment === method.id && (
                          <div className="w-full h-full bg-white rounded-full scale-50"></div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Place Order Button */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                `Place Order - $${totalAmount.toFixed(2)}`
              )}
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
              Estimated delivery time: 25-35 minutes
            </p>
          </div>

          {/* Additional Information */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Order Information
            </h4>
            <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <p>• Your order will be prepared fresh</p>
              <p>• Delivery tracking will be sent via SMS</p>
              <p>• Contact support for any issues</p>
              <p>• Refunds processed within 3-5 business days</p>
            </div>
          </div>

          {/* Contact Support */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Need Help?
            </h4>
            <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <p>📞 Customer Support: (555) 123-4567</p>
              <p>📧 Email: support@foodflow.com</p>
              <p>💬 Live Chat available 24/7</p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
