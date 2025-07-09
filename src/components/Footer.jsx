import React from 'react';
import { Facebook, Twitter, Instagram, Smartphone, Mail, MapPin, Heart, Star, Clock, Award } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl">�</div>
        <div className="absolute top-20 right-20 text-4xl">🐟</div>
        <div className="absolute bottom-10 left-20 text-5xl">🥥</div>
        <div className="absolute bottom-20 right-10 text-3xl">🫖</div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-7xl opacity-5">🍽️</div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="text-3xl font-bold text-primary-400 mb-1">500+</div>
            <div className="text-sm text-gray-300">Happy Customers</div>
          </div>
          <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="text-3xl font-bold text-primary-400 mb-1">12+</div>
            <div className="text-sm text-gray-300">Restaurant Partners</div>
          </div>
          <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="text-3xl font-bold text-primary-400 mb-1">25min</div>
            <div className="text-sm text-gray-300">Average Delivery</div>
          </div>
          <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="text-3xl font-bold text-primary-400 mb-1">4.9★</div>
            <div className="text-sm text-gray-300">Customer Rating</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-yellow-400 bg-clip-text text-transparent">
                FoodFlow
              </h2>
              <div className="text-2xl">🍽️</div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Bringing authentic Kerala flavors to your doorstep in Meppayur, Kozhikode. Fresh, traditional, and delicious meals from local restaurants delivered with love and care!
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-primary-400" />
                <span className="text-sm text-gray-300">25min delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-primary-400" />
                <span className="text-sm text-gray-300">Premium quality</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-primary-400" />
                <span className="text-sm text-gray-300">Trusted partner</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-primary-400" />
                <span className="text-sm text-gray-300">Made with love</span>
              </div>
            </div>
            
            {/* Download App */}
            <div>
              <p className="text-lg font-semibold mb-4 text-primary-400">📱 Download our app</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex items-center space-x-3 bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 rounded-xl px-5 py-3 hover:from-gray-700 hover:to-gray-600 transition-all duration-300 transform hover:scale-105 group">
                  <div className="text-2xl group-hover:scale-110 transition-transform">📱</div>
                  <div className="text-left">
                    <p className="text-xs text-gray-400">Download on the</p>
                    <p className="text-sm font-semibold">App Store</p>
                  </div>
                </button>
                <button className="flex items-center space-x-3 bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 rounded-xl px-5 py-3 hover:from-gray-700 hover:to-gray-600 transition-all duration-300 transform hover:scale-105 group">
                  <div className="text-2xl group-hover:scale-110 transition-transform">🤖</div>
                  <div className="text-left">
                    <p className="text-xs text-gray-400">Get it on</p>
                    <p className="text-sm font-semibold">Google Play</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-6 text-primary-400 flex items-center">
              <span className="mr-2">🔗</span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                <span className="mr-2 group-hover:scale-110 transition-transform">📖</span>
                About Us
              </a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                <span className="mr-2 group-hover:scale-110 transition-transform">💼</span>
                Careers
              </a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                <span className="mr-2 group-hover:scale-110 transition-transform">🤝</span>
                Partner with us
              </a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                <span className="mr-2 group-hover:scale-110 transition-transform">❓</span>
                Help & Support
              </a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                <span className="mr-2 group-hover:scale-110 transition-transform">📋</span>
                Terms & Conditions
              </a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                <span className="mr-2 group-hover:scale-110 transition-transform">🔒</span>
                Privacy Policy
              </a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-6 text-primary-400 flex items-center">
              <span className="mr-2">📞</span>
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <MapPin className="h-5 w-5 text-primary-400 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  123 Food Street,<br />NYC 10001
                </span>
              </div>
              <div className="flex items-center space-x-3 group">
                <Mail className="h-5 w-5 text-primary-400 group-hover:scale-110 transition-transform" />
                <span className="text-gray-300 group-hover:text-white transition-colors">support@foodflow.com</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <Smartphone className="h-5 w-5 text-primary-400 group-hover:scale-110 transition-transform" />
                <span className="text-gray-300 group-hover:text-white transition-colors">+1 (555) 123-4567</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <p className="text-lg font-semibold mb-4 text-primary-400 flex items-center">
                <span className="mr-2">🌟</span>
                Follow Us
              </p>
              <div className="flex space-x-3">
                <a href="#" className="p-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl hover:from-blue-500 hover:to-blue-400 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-blue-500/25">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="p-3 bg-gradient-to-r from-sky-500 to-sky-400 rounded-xl hover:from-sky-400 hover:to-sky-300 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-sky-500/25">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="p-3 bg-gradient-to-r from-pink-600 to-purple-500 rounded-xl hover:from-pink-500 hover:to-purple-400 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-pink-500/25">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm flex items-center">
              © 2025 FoodFlow. Made with 
              <Heart className="h-4 w-4 text-red-500 mx-1 animate-pulse" />
              for food lovers everywhere.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-300">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-300">Terms</a>
              <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
