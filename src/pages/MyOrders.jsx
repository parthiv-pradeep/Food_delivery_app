import React from 'react';
import { Clock, MapPin, Phone, CheckCircle, Truck, ChefHat } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ScrollArea from '../components/ui/ScrollArea';

const MyOrders = () => {
  const { orders } = useCart();

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'preparing':
        return <ChefHat className="h-5 w-5 text-blue-500" />;
      case 'on_way':
        return <Truck className="h-5 w-5 text-orange-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Order Confirmed';
      case 'preparing':
        return 'Being Prepared';
      case 'on_way':
        return 'On the Way';
      case 'delivered':
        return 'Delivered';
      default:
        return 'Unknown';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 sm:py-8">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">My Orders</h1>
          
          <div className="text-center py-8 sm:py-12">
            <ChefHat className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No orders yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
              When you place your first order, it will appear here.
            </p>
            <a
              href="/"
              className="inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors text-sm sm:text-base"
            >
              Start Ordering
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
          My Orders ({orders.length})
        </h1>

        <ScrollArea className="h-[calc(100vh-150px)] sm:h-[calc(100vh-200px)]">
          <div className="space-y-4 sm:space-y-6 pr-2 sm:pr-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              {/* Order Header */}
              <div className="p-3 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    {getStatusIcon(order.status)}
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                        Order #{order.id.slice(-8)}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                      {getStatusText(order.status)}
                    </span>
                    <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mt-1">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Order Info */}
                <div className="grid grid-cols-1 gap-3 sm:gap-4 text-sm">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm">Delivery Address</p>
                      <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">{order.deliveryAddress}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm">Phone</p>
                      <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">{order.phoneNumber}</p>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Payment:</span>
                    <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                      {order.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Card'}
                    </span>
                  </div>
                  {order.estimatedDelivery && (
                    <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>
                        Est. delivery: {new Date(order.estimatedDelivery).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="p-3 sm:p-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3 sm:mb-4 text-sm sm:text-base">Order Items</h4>
                <div className="space-y-2 sm:space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-1 sm:py-2">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                          <span className="text-xs sm:text-sm">{item.emoji || '🍽️'}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">{item.name}</p>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            {item.restaurantName} • Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Order Total Breakdown */}
                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                      <span className="text-gray-900 dark:text-white">${order.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Delivery Fee</span>
                      <span className="text-gray-900 dark:text-white">${order.deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Tax</span>
                      <span className="text-gray-900 dark:text-white">${order.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-sm sm:text-lg pt-2 border-t border-gray-200 dark:border-gray-600">
                      <span className="text-gray-900 dark:text-white">Total</span>
                      <span className="text-primary-600 dark:text-primary-400">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Special Instructions */}
                {order.specialInstructions && (
                  <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white mb-1">
                      Special Instructions:
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      {order.specialInstructions}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default MyOrders;
