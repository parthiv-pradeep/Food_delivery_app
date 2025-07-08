import React from 'react';
import { MapPin, Clock, Users, Award, Truck, Heart } from 'lucide-react';

const MeppayurHighlights = () => {
  const highlights = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Serving Meppayur",
      description: "Authentic local flavors from the heart of Kozhikode",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "500+ Happy Customers",
      description: "Trusted by families across Meppayur",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Kerala's Best",
      description: "Traditional recipes passed down generations",
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: "15-30 Min Delivery",
      description: "Fresh food delivered hot to your doorstep",
      color: "from-orange-500 to-red-500"
    }
  ];

  const localSpecials = [
    {
      name: "Kozhikode Biryani",
      image: "🍚",
      description: "Authentic Malabar style",
      badge: "Most Popular"
    },
    {
      name: "Kerala Fish Curry",
      image: "🐟",
      description: "Fresh from Malabar coast",
      badge: "Chef's Special"
    },
    {
      name: "Puttu & Kadala",
      image: "🥥",
      description: "Traditional breakfast",
      badge: "Local Favorite"
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Meppayur Welcome Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-green-600 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
              🏞️ Welcome to Meppayur
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-green-600 to-orange-600 bg-clip-text text-transparent">
              Taste of Kerala
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experience authentic Kerala cuisine delivered fresh to your home in Meppayur, Kozhikode
          </p>
        </div>

        {/* Local Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${highlight.color} text-white mb-4`}>
                {highlight.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {highlight.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>

        {/* Local Specialties Section */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              🌶️ Meppayur's Finest Dishes
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Discover the authentic flavors that make our local cuisine special
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {localSpecials.map((special, index) => (
              <div
                key={index}
                className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group"
              >
                {/* Badge */}
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {special.badge}
                </div>
                
                <div className="text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {special.image}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {special.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {special.description}
                  </p>
                  <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-green-600 hover:to-emerald-700 transition-colors duration-200">
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Local Information Bar */}
        <div className="mt-12 bg-gradient-to-r from-green-600 to-orange-600 rounded-2xl p-6 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">🚴‍♂️ Supporting Local Businesses</h3>
              <p className="text-green-100">
                We partner with authentic Kerala restaurants and local vendors in Meppayur
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold">12+</div>
                <div className="text-xs text-green-100">Local Partners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">₹25</div>
                <div className="text-xs text-green-100">Min Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.7★</div>
                <div className="text-xs text-green-100">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action for Local Pride */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-2 bg-white dark:bg-gray-800 px-6 py-3 rounded-full shadow-lg">
            <Heart className="h-5 w-5 text-red-500" />
            <span className="text-gray-800 dark:text-white font-medium">
              Made with love in Meppayur, Kerala
            </span>
            <span className="text-green-600">🌴</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeppayurHighlights;
