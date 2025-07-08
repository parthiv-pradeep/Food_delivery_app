import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, Clock, Truck, Heart, ArrowLeft, Filter } from 'lucide-react';

const CategoryRestaurants = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(new Set());
  const [sortBy, setSortBy] = useState('rating');

  // Mock data - restaurants filtered by category
  const categoryData = {
    pizza: {
      name: "Pizza",
      emoji: "🍕",
      restaurants: [
        {
          id: 1,
          name: "Tony's Pizza Palace",
          image: "🍕",
          rating: 4.8,
          deliveryTime: "25-35 min",
          deliveryFee: "Free",
          cuisine: "Italian, Pizza",
          offer: "50% OFF up to $10",
          promoted: true,
          specialItems: ["Margherita Pizza", "Pepperoni Pizza", "Supreme Pizza"]
        },
        {
          id: 13,
          name: "Mama Mia Pizzeria",
          image: "🍕",
          rating: 4.7,
          deliveryTime: "30-40 min",
          deliveryFee: "$1.99",
          cuisine: "Italian, Pizza",
          offer: "Buy 2 Get 1 Free",
          promoted: false,
          specialItems: ["Quattro Stagioni", "Diavola Pizza", "Vegetarian Pizza"]
        },
        {
          id: 14,
          name: "New York Style Pizza",
          image: "🍕",
          rating: 4.6,
          deliveryTime: "20-30 min",
          deliveryFee: "Free",
          cuisine: "American, Pizza",
          offer: "30% OFF",
          promoted: false,
          specialItems: ["NY Style Cheese", "Pepperoni Slice", "Meat Lovers"]
        }
      ]
    },
    burgers: {
      name: "Burgers",
      emoji: "🍔",
      restaurants: [
        {
          id: 2,
          name: "Burger Kingdom",
          image: "🍔",
          rating: 4.6,
          deliveryTime: "20-30 min",
          deliveryFee: "$2.99",
          cuisine: "American, Burgers",
          offer: "Buy 1 Get 1 Free",
          promoted: false,
          specialItems: ["Classic Burger", "Cheeseburger", "Bacon Burger"]
        },
        {
          id: 15,
          name: "Gourmet Burger Co.",
          image: "🍔",
          rating: 4.9,
          deliveryTime: "25-35 min",
          deliveryFee: "Free",
          cuisine: "Gourmet, Burgers",
          offer: "40% OFF",
          promoted: true,
          specialItems: ["Truffle Burger", "Wagyu Burger", "Veggie Burger"]
        }
      ]
    },
    sushi: {
      name: "Sushi",
      emoji: "🍣",
      restaurants: [
        {
          id: 3,
          name: "Sakura Sushi",
          image: "🍣",
          rating: 4.9,
          deliveryTime: "30-40 min",
          deliveryFee: "Free",
          cuisine: "Japanese, Sushi",
          offer: "20% OFF",
          promoted: true,
          specialItems: ["Salmon Roll", "Tuna Sashimi", "California Roll"]
        },
        {
          id: 16,
          name: "Tokyo Sushi Bar",
          image: "🍣",
          rating: 4.8,
          deliveryTime: "35-45 min",
          deliveryFee: "$3.99",
          cuisine: "Japanese, Sushi",
          offer: "Free Miso Soup",
          promoted: false,
          specialItems: ["Dragon Roll", "Rainbow Roll", "Chirashi Bowl"]
        }
      ]
    },
    mexican: {
      name: "Mexican",
      emoji: "🌮",
      restaurants: [
        {
          id: 5,
          name: "Taco Fiesta",
          image: "🌮",
          rating: 4.5,
          deliveryTime: "15-25 min",
          deliveryFee: "Free",
          cuisine: "Mexican, Tacos",
          offer: "30% OFF",
          promoted: false,
          specialItems: ["Fish Tacos", "Beef Burritos", "Quesadillas"]
        }
      ]
    },
    indian: {
      name: "Indian",
      emoji: "🍛",
      restaurants: [
        {
          id: 4,
          name: "Spice Route",
          image: "🍛",
          rating: 4.7,
          deliveryTime: "35-45 min",
          deliveryFee: "$1.99",
          cuisine: "Indian, Curry",
          offer: "Free Delivery",
          promoted: false,
          specialItems: ["Butter Chicken", "Biryani", "Tikka Masala"]
        }
      ]
    },
    chinese: {
      name: "Chinese",
      emoji: "🥡",
      restaurants: [
        {
          id: 6,
          name: "Golden Dragon",
          image: "🥡",
          rating: 4.4,
          deliveryTime: "25-35 min",
          deliveryFee: "$2.49",
          cuisine: "Chinese, Noodles",
          offer: "Free Spring Rolls",
          promoted: false,
          specialItems: ["Kung Pao Chicken", "Lo Mein", "Fried Rice"]
        }
      ]
    }
  };

  const categoryInfo = categoryData[category] || categoryData.pizza;
  
  const sortedRestaurants = [...categoryInfo.restaurants].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'deliveryTime':
        return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const toggleFavorite = (restaurantId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(restaurantId)) {
      newFavorites.delete(restaurantId);
    } else {
      newFavorites.add(restaurantId);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </button>
              <div className="flex items-center space-x-3">
                <span className="text-4xl">{categoryInfo.emoji}</span>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{categoryInfo.name}</h1>
                  <p className="text-gray-600 dark:text-gray-300">{sortedRestaurants.length} restaurants available</p>
                </div>
              </div>
            </div>
            
            {/* Sort Options */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="rating">Sort by Rating</option>
                  <option value="deliveryTime">Sort by Delivery Time</option>
                  <option value="name">Sort by Name</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurants Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRestaurants.map((restaurant) => (
            <Link
              key={restaurant.id}
              to={`/restaurant/${restaurant.id}`}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
            >
              {/* Restaurant Image */}
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">{restaurant.image}</span>
                </div>
                
                {/* Promoted Badge */}
                {restaurant.promoted && (
                  <div className="absolute top-3 left-3 bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Promoted
                  </div>
                )}
                
                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(restaurant.id);
                  }}
                  className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:scale-110 transition-transform duration-200"
                >
                  <Heart 
                    className={`h-4 w-4 ${
                      favorites.has(restaurant.id) 
                        ? 'text-red-500 fill-current' 
                        : 'text-gray-400'
                    }`} 
                  />
                </button>

                {/* Offer Badge */}
                <div className="absolute bottom-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {restaurant.offer}
                </div>
              </div>

              {/* Restaurant Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors">
                  {restaurant.name}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  {restaurant.cuisine}
                </p>

                {/* Special Items */}
                <div className="mb-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Popular items:</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {restaurant.specialItems.join(', ')}
                  </p>
                </div>

                {/* Rating and Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {restaurant.rating}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Truck className="h-4 w-4" />
                      <span>{restaurant.deliveryFee}</span>
                    </div>
                  </div>
                </div>

                {/* Order Button */}
                <button className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-xl font-semibold transition-colors duration-200">
                  View Menu
                </button>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {sortedRestaurants.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No restaurants found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try a different category or check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryRestaurants;
