import React, { useState } from 'react';
import { Search, MapPin, Mic, Filter, Clock, Star, Heart, Bookmark, ChevronDown, User, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { localRestaurants } from '../data/localRestaurants';

const ZomatoHomePage = () => {
  const [activeCategory, setActiveCategory] = useState('Explore');
  const [isVegMode, setIsVegMode] = useState(true);
  const navigate = useNavigate();

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const categories = [
    { 
      name: 'Explore', 
      image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=80&h=80&fit=crop&crop=center',
      discount: '50% OFF'
    },
    { 
      name: 'All', 
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&h=80&fit=crop&crop=center'
    },
    { 
      name: 'Biryani', 
      image: 'https://www.cubesnjuliennes.com/wp-content/uploads/2020/07/Chicken-Biryani-Recipe.jpg'
    },
    { 
      name: 'Pizza', 
      image: 'https://tse3.mm.bing.net/th/id/OIP.dIm0PRdetQzn8yoZM7tHqgHaHa?r=0&w=700&h=700&rs=1&pid=ImgDetMain&o=7&rm=3'
    },
    { 
      name: 'Chicken', 
      image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=80&h=80&fit=crop&crop=center'
    }
  ];
  
  const filterOptions = [
    { label: 'Filters', icon: Filter, type: 'modal' },
    { label: 'Under ₹200', type: 'price' },
    { label: 'Schedule', type: 'schedule', isNew: true },
    { label: 'Under 30 mins', type: 'time' }
  ];

  const exploreItems = [
    { icon: '🏷️', label: 'Offers', color: 'bg-blue-500' },
    { icon: '🏆', label: 'Top 10', color: 'bg-yellow-500' },
    { icon: '🚄', label: 'Food on train', color: 'bg-blue-600' },
    { icon: '🎉', label: 'Plan a party', color: 'bg-red-500' }
  ];

  const restaurants = localRestaurants.map(restaurant => ({
    id: restaurant.id,
    name: restaurant.name,
    image: restaurant.image,
    rating: restaurant.rating,
    time: restaurant.deliveryTime,
    distance: "1.8 km", // Default distance since it's not in data
    badge: `₹200 for one • ${restaurant.cuisine}`,
    offer: restaurant.offer || null
  }));

  // Filter restaurants based on active category
  const filteredRestaurants = restaurants.filter(restaurant => {
    if (activeCategory === 'All' || activeCategory === 'Explore') return true;
    // Add filtering logic based on category
    return restaurant.name.toLowerCase().includes(activeCategory.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-rose-50">
      {/* Header with Search */}
      <div className="bg-rose-400 sticky top-0 z-40 px-4 py-3">
        {/* Top Bar with Location and Icons */}
        <div className="flex items-center justify-between mb-3">
          {/* Location Section */}
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4 text-white" />
            <div className="flex items-center space-x-1">
              <span className="text-white text-sm font-semibold">Hilite Platino</span>
              <ChevronDown className="h-4 w-4 text-white" />
            </div>
          </div>
          
          {/* Right Side Icons and VEG Toggle */}
          <div className="flex items-center space-x-3">
            {/* Play Button */}
            <button className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Play className="h-4 w-4 text-white fill-white" />
            </button>
            
            {/* Refresh/Settings Icon */}
            <button className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white rounded-full"></div>
            </button>
            
            {/* Parking Icon */}
            <button className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">P</span>
            </button>
          </div>
        </div>

        {/* Address Line */}
        <div className="mb-3">
          <span className="text-white text-xs opacity-90">Maradu, Shankar Nagar, Jaya Nagar, Kochi</span>
        </div>

        {/* Search Bar and VEG Toggle */}
        <div className="flex items-center space-x-3">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <div className="flex items-center bg-white rounded-lg px-4 py-3">
              <Search className="h-4 w-4 text-gray-500 mr-3" />
              <input
                type="text"
                placeholder="Restaurant name or a dish..."
                className="flex-1 bg-transparent text-gray-800 placeholder-gray-500 outline-none text-sm font-normal"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(e.target.value);
                  }
                }}
              />
              <Mic className="h-4 w-4 text-red-600 ml-2" />
            </div>
          </div>
          
          {/* VEG Toggle */}
          <div className="flex flex-col items-center">
            <span className="text-white text-xs font-medium mb-1">VEG</span>
            <button 
              onClick={() => setIsVegMode(!isVegMode)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                isVegMode ? 'bg-green-500' : 'bg-white bg-opacity-30'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isVegMode ? 'translate-x-4' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-pink-100 via-rose-100 to-orange-100 mx-4 rounded-xl overflow-hidden mb-3">
        <div className="flex items-center justify-between p-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-lg font-bold text-gray-900">Get</span>
              <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                50% OFF
              </div>
            </div>
            <div className="text-lg font-bold text-gray-900 mb-1">& FREE delivery</div>
            <div className="text-sm text-gray-700 font-medium">on your first order</div>
          </div>
          <div className="w-20 h-20 flex-shrink-0">
            <img 
              src="https://static.vecteezy.com/system/resources/previews/002/001/999/original/food-delivery-service-vector.jpg" 
              alt="Food delivery" 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Category Tabs with Images */}
      <div className="px-4 mb-3">
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`flex flex-col items-center space-y-1.5 min-w-[65px] transition-all ${
                activeCategory === category.name
                  ? 'transform scale-105'
                  : ''
              }`}
            >
              {/* Food Image */}
              <div className="relative">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-transparent shadow-sm">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Discount Badge */}
                {category.discount && (
                  <div className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 py-0.5 rounded-full font-bold">
                    {category.discount}
                  </div>
                )}
              </div>
              {/* Category Name */}
              <span className={`text-xs font-medium leading-tight ${
                activeCategory === category.name
                  ? 'text-red-600'
                  : 'text-gray-800'
              }`}>
                {category.name}
              </span>
              {/* Active Indicator */}
              {activeCategory === category.name && (
                <div className="w-1 h-1 bg-red-600 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="px-4 mb-5">
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
          {filterOptions.map((filter, index) => (
            <button
              key={index}
              className="relative flex items-center space-x-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-800 whitespace-nowrap hover:bg-gray-50 transition-colors flex-shrink-0 shadow-sm"
            >
              {filter.icon && <filter.icon className="h-4 w-4" />}
              <span>{filter.label}</span>
              {filter.isNew && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded text-[10px] font-bold">
                  New
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Explore More Section */}
      <div className="px-4 mb-5">
        <h3 className="text-gray-600 text-sm font-semibold mb-3 uppercase tracking-wide">
          EXPLORE MORE
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {exploreItems.map((item, index) => (
            <button 
              key={index} 
              className="flex flex-col items-center space-y-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => {
                // Add navigation logic based on item type
                if (item.label === 'Offers') navigate('/offers');
                else if (item.label === 'Top 10') navigate('/top-restaurants');
                // Add more navigation as needed
              }}
            >
              <div className={`w-11 h-11 ${item.color} rounded-lg flex items-center justify-center text-white text-base shadow-sm`}>
                {item.icon}
              </div>
              <span className="text-xs text-gray-700 text-center font-medium leading-tight">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* All Restaurants Section */}
      <div className="px-4 mb-20">
        <h3 className="text-gray-600 text-sm font-semibold mb-4 uppercase tracking-wide">
          ALL RESTAURANTS
        </h3>
        
        <div className="space-y-4">
          {filteredRestaurants.map((restaurant) => (
            <div 
              key={restaurant.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all duration-200"
              onClick={() => navigate(`/restaurant/${restaurant.id}`)}
            >
              {/* Restaurant Image */}
              <div className="relative h-44">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Bookmark and Heart Badges */}
                <div className="absolute top-3 right-3 flex space-x-2">
                  <button className="w-8 h-8 bg-white bg-opacity-95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                    <Heart className="h-4 w-4 text-gray-600" />
                  </button>
                </div>

                {/* Offer Badge */}
                {restaurant.offer && (
                  <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-bold">
                    {restaurant.offer}
                  </div>
                )}

                {/* Bottom Badge */}
                {restaurant.badge && (
                  <div className="absolute bottom-3 left-3 bg-white bg-opacity-95 backdrop-blur-sm px-3 py-1.5 rounded-md text-xs font-medium text-gray-800 shadow-sm">
                    {restaurant.badge}
                  </div>
                )}
              </div>

              {/* Restaurant Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-lg font-semibold text-gray-900 flex-1 leading-tight">
                    {restaurant.name}
                  </h4>
                  <div className="flex items-center space-x-1 bg-green-600 text-white px-2 py-1 rounded-md text-xs font-semibold ml-2">
                    <Star className="h-3 w-3 fill-current" />
                    <span>{restaurant.rating}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">{restaurant.time}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="font-medium">{restaurant.distance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ZomatoHomePage;
