import React, { useState } from 'react';
import { 
  Gift, 
  Percent, 
  Clock, 
  Star, 
  Copy, 
  Check, 
  ArrowRight,
  Tag,
  Zap,
  Heart,
  Crown,
  Sparkles
} from 'lucide-react';

const OffersDealsSection = ({ className = '' }) => {
  const [copiedCode, setCopiedCode] = useState('');
  const [favoriteOffers, setFavoriteOffers] = useState(new Set());

  // Offers data
  const bannerOffers = [
    {
      id: 1,
      title: 'MEGA MONDAY',
      subtitle: 'Flat 60% OFF + Free Delivery',
      description: 'On orders above ₹299',
      code: 'MEGA60',
      gradient: 'from-purple-600 to-pink-600',
      icon: Crown,
      validUntil: '2024-01-15',
      isLimited: true
    },
    {
      id: 2,
      title: 'FIRST ORDER',
      subtitle: 'Get 50% OFF up to ₹100',
      description: 'For new customers',
      code: 'WELCOME50',
      gradient: 'from-green-500 to-teal-600',
      icon: Gift,
      validUntil: '2024-01-31',
      isNew: true
    }
  ];

  const offers = [
    {
      id: 3,
      type: 'Restaurant Offer',
      title: '20% OFF up to ₹100',
      restaurant: 'Pizza Palace',
      description: 'Valid on all items',
      code: 'PIZZA20',
      minOrder: 299,
      maxDiscount: 100,
      validUntil: '2024-01-20',
      image: '🍕',
      gradient: 'from-orange-100 to-red-100',
      borderColor: 'border-orange-200'
    },
    {
      id: 4,
      type: 'Payment Offer',
      title: 'Extra 10% Cashback',
      restaurant: 'Paytm',
      description: 'Pay with Paytm wallet',
      code: 'PAYTM10',
      minOrder: 199,
      maxDiscount: 50,
      validUntil: '2024-01-25',
      image: '💳',
      gradient: 'from-blue-100 to-indigo-100',
      borderColor: 'border-blue-200'
    },
    {
      id: 5,
      type: 'Free Delivery',
      title: 'FREE Delivery',
      restaurant: 'All Restaurants',
      description: 'No delivery charges',
      code: 'FREEDEL',
      minOrder: 149,
      maxDiscount: 0,
      validUntil: '2024-01-18',
      image: '🚚',
      gradient: 'from-green-100 to-emerald-100',
      borderColor: 'border-green-200'
    },
    {
      id: 6,
      type: 'Bundle Offer',
      title: 'Buy 2 Get 1 FREE',
      restaurant: 'Burger King',
      description: 'On selected combos',
      code: 'BUY2GET1',
      minOrder: 399,
      maxDiscount: 200,
      validUntil: '2024-01-22',
      image: '🍔',
      gradient: 'from-yellow-100 to-orange-100',
      borderColor: 'border-yellow-200'
    }
  ];

  const exclusiveOffers = [
    {
      id: 7,
      title: 'PREMIUM MEMBER',
      subtitle: 'Exclusive 25% OFF',
      description: 'Available only for premium members',
      code: 'PREMIUM25',
      gradient: 'from-purple-500 to-indigo-600',
      icon: Crown,
      isPremium: true
    },
    {
      id: 8,
      title: 'FLASH SALE',
      subtitle: '40% OFF for 1 hour',
      description: 'Limited time offer',
      code: 'FLASH40',
      gradient: 'from-red-500 to-pink-600',
      icon: Zap,
      timeLeft: '45 mins',
      isFlash: true
    }
  ];

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const toggleFavorite = (offerId) => {
    const newFavorites = new Set(favoriteOffers);
    if (newFavorites.has(offerId)) {
      newFavorites.delete(offerId);
    } else {
      newFavorites.add(offerId);
    }
    setFavoriteOffers(newFavorites);
  };

  const formatTimeLeft = (validUntil) => {
    const now = new Date();
    const endDate = new Date(validUntil);
    const diff = endDate - now;
    
    if (diff <= 0) return 'Expired';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days} days left`;
    if (hours > 0) return `${hours} hours left`;
    return 'Expires soon';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
            <Gift className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Offers & Deals</h2>
            <p className="text-gray-600">Save more on every order</p>
          </div>
        </div>
        <button className="text-orange-600 hover:text-orange-700 font-medium flex items-center">
          View All <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      {/* Banner Offers */}
      <div className="grid md:grid-cols-2 gap-4">
        {bannerOffers.map((offer) => (
          <div
            key={offer.id}
            className={`relative bg-gradient-to-r ${offer.gradient} rounded-2xl p-6 text-white overflow-hidden`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4">
                <offer.icon className="h-16 w-16" />
              </div>
              <div className="absolute bottom-4 left-4">
                <Sparkles className="h-8 w-8" />
              </div>
            </div>
            
            {/* Labels */}
            <div className="absolute top-4 left-4 flex space-x-2">
              {offer.isLimited && (
                <span className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold">
                  LIMITED
                </span>
              )}
              {offer.isNew && (
                <span className="px-2 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-semibold">
                  NEW
                </span>
              )}
            </div>

            <div className="relative z-10 space-y-3">
              <div>
                <h3 className="text-2xl font-bold">{offer.title}</h3>
                <p className="text-lg font-semibold text-white text-opacity-90">{offer.subtitle}</p>
                <p className="text-white text-opacity-80">{offer.description}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-white bg-opacity-20 px-3 py-2 rounded-lg">
                    <span className="font-mono font-bold">{offer.code}</span>
                  </div>
                  <button
                    onClick={() => copyCode(offer.code)}
                    className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-1"
                  >
                    {copiedCode === offer.code ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span>{copiedCode === offer.code ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-white text-opacity-80">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {formatTimeLeft(offer.validUntil)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Exclusive Offers */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Crown className="h-5 w-5 text-purple-600 mr-2" />
          Exclusive Offers
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {exclusiveOffers.map((offer) => (
            <div
              key={offer.id}
              className={`bg-gradient-to-r ${offer.gradient} rounded-xl p-4 text-white relative overflow-hidden`}
            >
              <div className="absolute top-2 right-2">
                <offer.icon className="h-8 w-8 opacity-20" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold">{offer.title}</h4>
                  {offer.isPremium && (
                    <span className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold">
                      PREMIUM
                    </span>
                  )}
                  {offer.isFlash && (
                    <span className="px-2 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-semibold animate-pulse">
                      FLASH
                    </span>
                  )}
                </div>
                <p className="font-semibold text-white text-opacity-90">{offer.subtitle}</p>
                <p className="text-sm text-white text-opacity-80">{offer.description}</p>
                
                <div className="flex items-center justify-between pt-2">
                  <span className="font-mono font-bold bg-white bg-opacity-20 px-2 py-1 rounded">
                    {offer.code}
                  </span>
                  {offer.timeLeft && (
                    <span className="text-sm font-semibold">
                      ⏰ {offer.timeLeft}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regular Offers */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Tag className="h-5 w-5 text-orange-600 mr-2" />
          All Offers
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`bg-gradient-to-r ${offer.gradient} border-2 ${offer.borderColor} rounded-xl p-4 hover:shadow-lg transition-all duration-200`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{offer.image}</span>
                  <div>
                    <span className="inline-block px-2 py-1 bg-white bg-opacity-80 rounded-full text-xs font-semibold text-gray-700 mb-1">
                      {offer.type}
                    </span>
                    <h4 className="font-bold text-gray-900">{offer.title}</h4>
                    <p className="text-sm text-gray-600">{offer.restaurant}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleFavorite(offer.id)}
                  className={`p-2 rounded-full transition-colors ${
                    favoriteOffers.has(offer.id)
                      ? 'bg-red-100 text-red-600'
                      : 'bg-gray-100 text-gray-400 hover:text-red-500'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${favoriteOffers.has(offer.id) ? 'fill-current' : ''}`} />
                </button>
              </div>

              <p className="text-gray-700 mb-3">{offer.description}</p>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Min ₹{offer.minOrder}</span>
                    {offer.maxDiscount > 0 && <span>Max ₹{offer.maxDiscount}</span>}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {formatTimeLeft(offer.validUntil)}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-gray-900 bg-gray-200 px-2 py-1 rounded">
                      {offer.code}
                    </span>
                  </div>
                  <button
                    onClick={() => copyCode(offer.code)}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center space-x-1"
                  >
                    {copiedCode === offer.code ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span>{copiedCode === offer.code ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Referral Program */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Refer & Earn</h3>
            <p className="text-purple-100">Earn ₹100 for every friend you refer</p>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Your referral code:</span>
              <span className="font-mono font-bold bg-white bg-opacity-20 px-2 py-1 rounded">REF2024</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">₹500</div>
            <div className="text-purple-200 text-sm">Earned this month</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersDealsSection;
