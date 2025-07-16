import React, { useState } from 'react';
import { 
  Star, 
  Clock, 
  MapPin,
  Plus,
  Zap,
  Truck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickBookingRestaurantCard = ({ restaurant }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/restaurant/${restaurant.id}`);
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    // Quick add popular item to cart
    navigate(`/restaurant/${restaurant.id}?quickAdd=true`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group overflow-hidden border border-gray-100"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        {isImageLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <img
          src={restaurant.image || '/api/placeholder/400/200'}
          alt={restaurant.name}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            isImageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setIsImageLoading(false)}
          onError={() => setIsImageLoading(false)}
        />
        
        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {restaurant.isPromoted && (
            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              Promoted
            </span>
          )}
          {restaurant.isFastDelivery && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center">
              <Zap className="h-3 w-3 mr-1" />
              Fast
            </span>
          )}
          {restaurant.freeDelivery && (
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center">
              <Truck className="h-3 w-3 mr-1" />
              Free
            </span>
          )}
        </div>

        {/* Quick Add Button */}
        <button
          onClick={handleQuickAdd}
          className="absolute bottom-3 right-3 bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-orange-600 transition-colors opacity-0 group-hover:opacity-100"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Restaurant Name & Info */}
        <div>
          <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">
            {restaurant.name}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-1">
            {restaurant.cuisine}
          </p>
        </div>

        {/* Rating, Time, Distance - Single Line */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-3">
            {/* Rating */}
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg ${
              restaurant.rating >= 4.0 
                ? 'bg-green-100 text-green-700' 
                : restaurant.rating >= 3.5 
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-orange-100 text-orange-700'
            }`}>
              <Star className="h-4 w-4 fill-current" />
              <span className="font-medium">{restaurant.rating}</span>
            </div>

            {/* Delivery Time */}
            <div className="flex items-center space-x-1 text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{restaurant.deliveryTime}</span>
            </div>
          </div>

          {/* Distance & Cost */}
          <div className="text-right">
            <div className="text-gray-600 flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{restaurant.distance}</span>
            </div>
          </div>
        </div>

        {/* Cost for Two */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-gray-600 text-sm">
            ₹{restaurant.costForTwo} for two
          </span>
          
          {/* Popular Dish */}
          {restaurant.popularDish && (
            <span className="text-orange-600 text-sm font-medium">
              {restaurant.popularDish}
            </span>
          )}
        </div>

        {/* Quick Action CTA */}
        <button 
          onClick={handleCardClick}
          className="w-full bg-orange-50 hover:bg-orange-100 text-orange-700 font-medium py-2 px-4 rounded-lg transition-colors text-sm"
        >
          View Menu & Order
        </button>
      </div>
    </div>
  );
};

export default QuickBookingRestaurantCard;
