import React, { useEffect } from 'react';
import { 
  Menu, 
  X, 
  Home, 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  MapPin, 
  Phone, 
  Gift,
  Clock,
  Star,
  Truck,
  CreditCard,
  HelpCircle,
  Settings,
  LogOut,
  Bell,
  Percent
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const MobileNavigation = ({ isOpen, setIsOpen, user, cartCount = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Bottom tab navigation items
  const bottomNavItems = [
    { 
      icon: Home, 
      label: 'Home', 
      path: '/',
      color: 'text-orange-500'
    },
    { 
      icon: Search, 
      label: 'Search', 
      path: '/search',
      color: 'text-blue-500'
    },
    { 
      icon: ShoppingBag, 
      label: 'Cart', 
      path: '/cart',
      color: 'text-green-500',
      badge: cartCount
    },
    { 
      icon: Clock, 
      label: 'Orders', 
      path: '/orders',
      color: 'text-purple-500'
    }
  ];

  // Side menu items
  const menuItems = [
    {
      section: 'Quick Actions',
      items: [
        { icon: Home, label: 'Home', path: '/' },
        { icon: Search, label: 'Search Food', path: '/search' },
        { icon: MapPin, label: 'Restaurants', path: '/restaurants' },
        { icon: Clock, label: 'My Orders', path: '/orders' }
      ]
    },
    {
      section: 'Your Account',
      items: [
        { icon: ShoppingBag, label: 'Cart', path: '/cart' },
        { icon: Clock, label: 'Order History', path: '/orders' },
        { icon: MapPin, label: 'Addresses', path: '/manage-addresses' }
      ]
    },
    {
      section: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help & Support', path: '/help' },
        { icon: Phone, label: 'Contact Us', path: '/contact' }
      ]
    },
    {
      section: 'More',
      items: [
        { icon: Settings, label: 'Settings', path: '/settings' }
      ]
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.mobile-menu')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <>
      {/* Side Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
          <div className="mobile-menu fixed left-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {user ? (
                    <>
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-orange-100 text-sm">{user.phone}</div>
                      </div>
                    </>
                  ) : (
                    <div>
                      <div className="font-semibold">Welcome!</div>
                      <div className="text-orange-100 text-sm">Sign in for better experience</div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-orange-200 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-4">
              {menuItems.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-6">
                  <div className="px-6 mb-3">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      {section.section}
                    </h3>
                  </div>
                  <div className="space-y-1">
                    {section.items.map((item, itemIndex) => (
                      <button
                        key={itemIndex}
                        onClick={() => handleNavigation(item.path)}
                        className={`w-full flex items-center justify-between px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                          isActiveRoute(item.path) ? 'bg-orange-50 border-r-4 border-orange-500' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon className={`h-5 w-5 ${
                            isActiveRoute(item.path) ? 'text-orange-500' : 'text-gray-600'
                          }`} />
                          <span className={`font-medium ${
                            isActiveRoute(item.path) ? 'text-orange-700' : 'text-gray-900'
                          }`}>
                            {item.label}
                          </span>
                        </div>
                        {item.badge && (
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            typeof item.badge === 'number' 
                              ? 'bg-red-100 text-red-600'
                              : 'bg-green-100 text-green-600'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Logout Button */}
              {user && (
                <div className="px-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      // Handle logout
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-0 py-3 text-red-600 hover:text-red-700 transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 md:hidden">
        <div className="flex items-center justify-around py-2">
          {bottomNavItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(item.path)}
              className={`relative flex flex-col items-center justify-center p-3 transition-all duration-200 ${
                isActiveRoute(item.path) 
                  ? 'transform -translate-y-1' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="relative">
                <item.icon 
                  className={`h-6 w-6 transition-colors ${
                    isActiveRoute(item.path) 
                      ? item.color 
                      : 'text-gray-400'
                  }`} 
                />
                {item.badge && item.badge > 0 && (
                  <>
                    {/* Modern gradient badge with enhanced styling - only show when count > 0 */}
                    <span className="absolute -top-3 -right-3 min-w-[22px] h-[22px] bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg border-2 border-white transform scale-100 hover:scale-110 transition-transform duration-200 cart-badge-bounce cart-badge-glow">
                      {item.badge > 99 ? '99+' : item.badge}
                    </span>
                    {/* Enhanced pulse animation for cart - only when items exist */}
                    {item.label === 'Cart' && (
                      <>
                        <span className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r from-orange-400 to-red-400 rounded-full cart-pulse-ring opacity-30"></span>
                        <span className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-r from-orange-300 to-red-300 rounded-full cart-pulse-ring opacity-20 animation-delay-150"></span>
                      </>
                    )}
                  </>
                )}
              </div>
              <span className={`text-xs mt-1 transition-colors ${
                isActiveRoute(item.path) 
                  ? item.color.replace('text-', 'text-').split('-')[1] 
                    ? `text-${item.color.split('-')[1]}-600`
                    : 'text-gray-900'
                  : 'text-gray-400'
              }`}>
                {item.label}
              </span>
              {isActiveRoute(item.path) && (
                <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
                  item.color.replace('text-', 'bg-')
                }`} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Floating Action Button - Enhanced Cart */}
      <div className="fixed bottom-20 right-4 z-40 md:hidden">
        <button
          onClick={() => navigate('/cart')}
          className={`relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 ${
            cartCount > 0 ? 'animate-pulse' : ''
          }`}
        >
          <ShoppingBag className="h-6 w-6" />
          {cartCount > 0 && (
            <>
              {/* Enhanced Main Badge with modern design - only show when count > 0 */}
              <span className="absolute -top-3 -right-3 min-w-[24px] h-[24px] bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-xl border-2 border-white transform hover:scale-110 transition-all duration-200 cart-badge-bounce cart-badge-glow">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
              {/* Multiple pulse rings for enhanced effect - only when items exist */}
              <span className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full cart-pulse-ring opacity-40"></span>
              <span className="absolute -top-1 -right-1 w-10 h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-full cart-pulse-ring opacity-20 animation-delay-150"></span>
              <span className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-r from-red-400 to-pink-400 rounded-full cart-pulse-ring opacity-10 animation-delay-300"></span>
            </>
          )}
        </button>
      </div>

      {/* Quick Order Button */}
      <div className="fixed bottom-32 right-4 z-40 md:hidden">
        <button
          onClick={() => navigate('/quick-order')}
          className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          <Truck className="h-5 w-5" />
        </button>
      </div>
    </>
  );
};

export default MobileNavigation;
