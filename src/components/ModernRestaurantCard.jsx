import React, { useState } from 'react';
import { Star, Clock, Truck, Heart, Tag, MapPin, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ModernRestaurantCard = ({ restaurant, onFavoriteToggle, isFavorite = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onFavoriteToggle(restaurant.id);
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.0) return 'bg-green-600';
    if (rating >= 3.5) return 'bg-yellow-600';
    if (rating >= 3.0) return 'bg-orange-600';
    return 'bg-red-600';
  };

  const getDeliveryTimeColor = (time) => {
    const minutes = parseInt(time);
    if (minutes <= 25) return 'text-green-600';
    if (minutes <= 35) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Link to={`/restaurant/${restaurant.id}`} className="block group">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          {/* Loading Skeleton */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          
          {/* Restaurant Image */}
          {!imageError ? (
            <img
              src={restaurant.image || `/api/placeholder/400/200?text=${restaurant.name}`}
              alt={restaurant.name}
              className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
              <span className="text-white text-4xl font-bold">
                {restaurant.name.charAt(0)}
              </span>
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          
          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
              isFavorite 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          
          {/* Offer Badge */}
          {restaurant.offer && (
            <div className="absolute bottom-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
              <Tag className="h-3 w-3 mr-1" />
              {restaurant.offer}
            </div>
          )}
          
          {/* Premium Badge */}
          {restaurant.isPremium && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              GOLD
            </div>
          )}
          
          {/* Promoted Badge */}
          {restaurant.isPromoted && (
            <div className="absolute top-10 left-3 bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
              PROMOTED
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Restaurant Name & Rating */}
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-orange-600 transition-colors">
                {restaurant.name}
              </h3>
              <p className="text-sm text-gray-600 truncate">{restaurant.cuisine}</p>
            </div>
            
            <div className={`flex items-center px-2 py-1 rounded-lg text-white text-xs font-semibold ml-2 ${getRatingColor(restaurant.rating)}`}>
              <Star className="h-3 w-3 mr-1 fill-current" />
              {restaurant.rating}
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="truncate">{restaurant.area || restaurant.location}</span>
          </div>

          {/* Delivery Info */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center font-medium ${getDeliveryTimeColor(restaurant.time)}`}>
                <Clock className="h-4 w-4 mr-1" />
                {restaurant.time}
              </div>
              <div className="flex items-center text-gray-600">
                <Truck className="h-4 w-4 mr-1" />
                {restaurant.distance}
              </div>
            </div>
            <div className="text-gray-900 font-semibold">
              {restaurant.price}
            </div>
          </div>

          {/* Cuisine Tags */}
          {restaurant.cuisineTypes && (
            <div className="flex flex-wrap gap-1">
              {restaurant.cuisineTypes.slice(0, 3).map((cuisine, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {cuisine}
                </span>
              ))}
              {restaurant.cuisineTypes.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{restaurant.cuisineTypes.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Action Section */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-medium">{restaurant.reviewCount || '100+'} reviews</span>
            </div>
            
            <div className="flex items-center text-orange-600 text-sm font-medium group-hover:text-orange-700">
              <span>View Menu</span>
              <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Quick Action Bar (appears on hover) */}
        <div className="absolute inset-x-0 bottom-0 bg-white border-t border-gray-100 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button className="text-xs text-gray-600 hover:text-orange-600 transition-colors">
                Info
              </button>
              <button className="text-xs text-gray-600 hover:text-orange-600 transition-colors">
                Reviews
              </button>
              <button className="text-xs text-gray-600 hover:text-orange-600 transition-colors">
                Photos
              </button>
            </div>
            
            <button className="bg-orange-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
              Order Now
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ModernRestaurantCard;
