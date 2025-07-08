import React from 'react';
import { Facebook, Twitter, Instagram, Smartphone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-2">
            <h2 className="text-3xl font-bold text-primary-400 mb-4">FoodFlow</h2>
            <p className="text-gray-300 mb-6 max-w-md">
              Your favorite food delivery app. Fast, fresh, and delicious meals delivered right to your doorstep. Experience the convenience of ordering from the best restaurants in your city.
            </p>
            
            {/* Download App */}
            <div>
              <p className="text-lg font-semibold mb-4">Download our app</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center space-x-3 bg-black border border-gray-600 rounded-lg px-4 py-3 hover:bg-gray-800 transition-colors">
                  <Smartphone className="h-6 w-6" />
                  <div className="text-left">
                    <p className="text-xs text-gray-400">Download on the</p>
                    <p className="text-sm font-semibold">App Store</p>
                  </div>
                </button>
                <button className="flex items-center space-x-3 bg-black border border-gray-600 rounded-lg px-4 py-3 hover:bg-gray-800 transition-colors">
                  <Smartphone className="h-6 w-6" />
                  <div className="text-left">
                    <p className="text-xs text-gray-400">Get it on</p>
                    <p className="text-sm font-semibold">Google Play</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Partner with us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Help & Support</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">123 Food Street, NYC 10001</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">support@foodflow.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Smartphone className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <p className="text-lg font-semibold mb-4">Follow Us</p>
              <div className="flex space-x-4">
                <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-primary-500 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-primary-500 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-primary-500 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 FoodFlow. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
