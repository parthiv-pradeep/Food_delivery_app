import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, Truck } from 'lucide-react';

const Hero = () => {
  // Kerala food carousel data
  const keralaFoods = [
    {
      emoji: '🍚',
      name: 'Kerala Biryani',
      description: 'Authentic Malabar style',
      rating: '4.8/5',
      color: 'from-yellow-100 to-orange-200'
    },
    {
      emoji: '🐟',
      name: 'Fish Curry',
      description: 'Traditional coconut curry',
      rating: '4.7/5',
      color: 'from-blue-100 to-cyan-200'
    },
    {
      emoji: '🥥',
      name: 'Puttu & Kadala',
      description: 'Classic breakfast combo',
      rating: '4.6/5',
      color: 'from-green-100 to-emerald-200'
    },
    {
      emoji: '🫓',
      name: 'Malabar Parotta',
      description: 'Layered flatbread',
      rating: '4.9/5',
      color: 'from-amber-100 to-yellow-200'
    },
    {
      emoji: '🌶️',
      name: 'Spicy Curry',
      description: 'Kerala style spices',
      rating: '4.5/5',
      color: 'from-red-100 to-pink-200'
    }
  ];

  const [currentFoodIndex, setCurrentFoodIndex] = useState(0);

  // Auto-rotate images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFoodIndex((prevIndex) => 
        (prevIndex + 1) % keralaFoods.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [keralaFoods.length]);

  const currentFood = keralaFoods[currentFoodIndex];

  const scrollToRestaurants = () => {
    const restaurantsSection = document.getElementById('restaurants');
    if (restaurantsSection) {
      restaurantsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 overflow-hidden min-h-screen sm:min-h-[80vh] animate-gradient">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
      
      {/* Kerala food animations with enhanced aesthetics */}
      <div className="absolute top-16 left-4 animate-float opacity-70 lg:hidden mobile-food-float">
        <div className="bg-yellow-400/20 backdrop-blur-sm rounded-full p-2 mobile-glass">
          <span className="text-2xl">🥥</span>
        </div>
      </div>
      <div className="absolute top-32 right-8 animate-float-delayed opacity-70 lg:hidden mobile-food-float">
        <div className="bg-red-400/20 backdrop-blur-sm rounded-full p-2 mobile-glass">
          <span className="text-2xl">🐟</span>
        </div>
      </div>
      <div className="absolute top-48 left-8 animate-bounce opacity-70 lg:hidden mobile-food-float">
        <div className="bg-green-400/20 backdrop-blur-sm rounded-full p-2 mobile-glass">
          <span className="text-xl">🍚</span>
        </div>
      </div>
      <div className="absolute top-64 right-4 animate-pulse-slow opacity-60 lg:hidden mobile-food-float">
        <div className="bg-purple-400/20 backdrop-blur-sm rounded-full p-2 mobile-glass">
          <span className="text-xl">🫓</span>
        </div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center min-h-[calc(100vh-140px)] sm:min-h-auto">
          {/* Enhanced Mobile Content */}
          <div className="text-white text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6 mobile-hero-text">
              <span className="block hero-gradient-text sm:bg-gradient-to-r sm:from-white sm:to-yellow-200 sm:bg-clip-text sm:text-transparent">
                Kerala's Authentic Flavors
              </span>
              <span className="block text-yellow-300 animate-pulse">Delivered to Meppayur</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-100 mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0">
              Experience the taste of traditional Kerala cuisine from the comfort of your home in Meppayur, Kozhikode.
            </p>
            
            {/* Enhanced Mobile CTA Buttons with touch feedback */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 px-4 sm:px-0">
              <button 
                onClick={scrollToRestaurants}
                className="bg-white text-primary-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg transform hover:scale-105 active:scale-95 touch-feedback mobile-card-hover"
              >
                🍛 Order Kerala Food
              </button>
              <Link to="/restaurant/1">
                <button className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-white hover:text-primary-600 transition-all duration-200 transform hover:scale-105 active:scale-95 w-full sm:w-auto touch-feedback mobile-card-hover">
                  🥥 View Malabar Menu
                </button>
              </Link>
            </div>

            {/* Enhanced Mobile Features Grid with glassmorphism */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 px-2 sm:px-0">
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-2 lg:p-0 lg:bg-transparent mobile-glass mobile-card-hover">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm sm:text-base">Fast Delivery</p>
                  <p className="text-xs sm:text-sm text-gray-200">Across Meppayur</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-2 lg:p-0 lg:bg-transparent mobile-glass mobile-card-hover">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Star className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm sm:text-base">Authentic Kerala</p>
                  <p className="text-xs sm:text-sm text-gray-200">Traditional recipes</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-2 lg:p-0 lg:bg-transparent mobile-glass mobile-card-hover">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Truck className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm sm:text-base">Free Delivery</p>
                  <p className="text-xs sm:text-sm text-gray-200">Orders over ₹200</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile-Optimized Hero Image with Automatic Carousel */}
          <div className="relative order-1 lg:order-2 mb-4 lg:mb-0">
            {/* Main Hero Image Container - Mobile Responsive with glassmorphism */}
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8 overflow-hidden mx-4 sm:mx-0 mobile-glass mobile-card-hover">
              {/* Background Pattern with animation */}
              <div className={`absolute inset-0 bg-gradient-to-br ${currentFood.color} rounded-2xl sm:rounded-3xl transition-all duration-1000 ease-in-out`}></div>
              
              {/* Main Food Image - Mobile Optimized with enhanced animations */}
              <div className={`relative aspect-square bg-gradient-to-br ${currentFood.color} rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-1000 ease-in-out`}>
                <div className="text-center transform hover:scale-105 transition-transform duration-300">
                  {/* Large Attractive Food Image - Responsive with enhanced animations */}
                  <div className="text-6xl sm:text-8xl md:text-9xl mb-2 sm:mb-4 animate-pulse-slow transition-all duration-1000 ease-in-out transform">
                    {currentFood.emoji}
                  </div>
                  
                  {/* Surrounding food items that change with main food */}
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4 text-2xl sm:text-4xl animate-bounce food-bounce-1 transition-all duration-500">
                    {keralaFoods[(currentFoodIndex + 1) % keralaFoods.length].emoji}
                  </div>
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 text-2xl sm:text-4xl animate-bounce food-bounce-2 transition-all duration-500">
                    {keralaFoods[(currentFoodIndex + 2) % keralaFoods.length].emoji}
                  </div>
                  <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-2xl sm:text-4xl animate-bounce food-bounce-3 transition-all duration-500">
                    {keralaFoods[(currentFoodIndex + 3) % keralaFoods.length].emoji}
                  </div>
                  <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 text-2xl sm:text-4xl animate-bounce food-bounce-4 transition-all duration-500">
                    {keralaFoods[(currentFoodIndex + 4) % keralaFoods.length].emoji}
                  </div>
                  
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-4 mx-2 sm:mx-4 mobile-glass transition-all duration-1000 ease-in-out">
                    <p className="text-sm sm:text-lg font-bold text-gray-800 mb-1 transition-all duration-500">
                      {currentFood.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 transition-all duration-500">
                      {currentFood.description}
                    </p>
                    <div className="flex items-center justify-center mt-1 sm:mt-2">
                      <div className="flex text-yellow-400 text-sm sm:text-base">
                        ⭐⭐⭐⭐⭐
                      </div>
                      <span className="ml-2 text-xs sm:text-sm font-semibold text-gray-700 transition-all duration-500">
                        {currentFood.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              

              
              {/* Decorative Elements - Mobile Responsive with enhanced glow */}
              <div className="absolute -top-1 sm:-top-2 left-1/2 transform -translate-x-1/2 bg-red-400 rounded-full p-2 sm:p-3 animate-bounce animate-pulse-glow">
                <span className="text-lg sm:text-2xl">🔥</span>
              </div>
            </div>
            
            {/* Mobile-Optimized Floating Food Elements with enhanced animations */}
            <div className="absolute -top-3 sm:-top-6 -right-3 sm:-right-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-3 sm:p-6 animate-bounce shadow-2xl mobile-food-float">
              <span className="text-xl sm:text-3xl">🥥</span>
            </div>
            <div className="absolute -bottom-3 sm:-bottom-6 -left-3 sm:-left-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-full p-3 sm:p-6 animate-pulse shadow-2xl mobile-food-float">
              <span className="text-xl sm:text-3xl">🐟</span>
            </div>
            <div className="absolute top-1/2 -right-4 sm:-right-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full p-2 sm:p-4 animate-bounce shadow-xl food-bounce-1 mobile-food-float">
              <span className="text-lg sm:text-2xl">🍮</span>
            </div>
            <div className="absolute bottom-1/4 -left-4 sm:-left-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full p-2 sm:p-4 animate-pulse shadow-xl food-bounce-2 mobile-food-float">
              <span className="text-lg sm:text-2xl">☕</span>
            </div>
            
            {/* Mobile-Friendly Delivery Truck Animation with enhanced movement */}
            <div className="absolute -bottom-2 sm:-bottom-4 left-1/4 bg-blue-500 rounded-lg p-2 sm:p-3 animate-bounce shadow-lg mobile-food-float">
              <span className="text-base sm:text-xl">🚚</span>
            </div>
            
            {/* Mobile-Optimized Special Offers Badge with shimmer effect */}
            <div className="absolute top-4 sm:top-8 left-0 bg-red-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-r-full font-bold text-xs sm:text-sm transform -rotate-3 shadow-lg animate-pulse-glow">
              🌶️ Kerala Special
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
