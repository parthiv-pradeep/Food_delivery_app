import React, { useState } from 'react';
import { MapPin, X, Navigation, Edit3, Check } from 'lucide-react';

const LocationModal = ({ isOpen, onClose, onLocationChange }) => {
  const [activeTab, setActiveTab] = useState('current');
  const [manualAddress, setManualAddress] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [detectedLocation, setDetectedLocation] = useState(null);

  const handleCurrentLocation = async () => {
    setIsLocating(true);
    try {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude: _latitude, longitude: _longitude } = position.coords;
            
            // Simulate reverse geocoding (in real app, use Google Maps API)
            const mockAddress = `${Math.floor(Math.random() * 999) + 1} Main Street, Downtown, NYC 10001`;
            setDetectedLocation(mockAddress);
            setIsLocating(false);
          },
          (error) => {
            console.error('Error getting location:', error);
            setIsLocating(false);
            alert('Unable to access location. Please enable location services.');
          }
        );
      } else {
        alert('Geolocation is not supported by this browser.');
        setIsLocating(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setIsLocating(false);
    }
  };

  const handleUseDetectedLocation = () => {
    onLocationChange(detectedLocation);
    onClose();
  };

  const handleManualSubmit = () => {
    if (manualAddress.trim()) {
      onLocationChange(manualAddress);
      onClose();
    }
  };

  const popularLocations = [
    'Downtown, NYC',
    'Times Square, NYC', 
    'Brooklyn Heights, NYC',
    'Central Park, NYC',
    'Financial District, NYC',
    'Upper East Side, NYC'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Choose Delivery Location
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('current')}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'current'
                ? 'border-primary-500 text-primary-500'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Navigation className="h-4 w-4" />
              <span>Current Location</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('manual')}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'manual'
                ? 'border-primary-500 text-primary-500'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Edit3 className="h-4 w-4" />
              <span>Enter Address</span>
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'current' && (
            <div className="space-y-4">
              {/* Current Location Button */}
              <button
                onClick={handleCurrentLocation}
                disabled={isLocating}
                className="w-full flex items-center space-x-3 p-4 border-2 border-dashed border-primary-300 dark:border-primary-600 rounded-xl hover:border-primary-500 transition-colors disabled:opacity-50"
              >
                <div className={`p-2 bg-primary-100 dark:bg-primary-900 rounded-lg ${isLocating ? 'animate-pulse' : ''}`}>
                  <Navigation className={`h-5 w-5 text-primary-500 ${isLocating ? 'animate-spin' : ''}`} />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {isLocating ? 'Detecting location...' : 'Use Current Location'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {isLocating ? 'Please wait' : 'Allow location access for accurate delivery'}
                  </p>
                </div>
              </button>

              {/* Detected Location */}
              {detectedLocation && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
                      <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-green-800 dark:text-green-200">Location Detected</p>
                      <p className="text-sm text-green-600 dark:text-green-300 mt-1">{detectedLocation}</p>
                      <button
                        onClick={handleUseDetectedLocation}
                        className="mt-3 flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        <Check className="h-4 w-4" />
                        <span>Use This Location</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Popular Locations */}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Popular Areas</h3>
                <div className="space-y-2">
                  {popularLocations.map((location, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        onLocationChange(location);
                        onClose();
                      }}
                      className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300">{location}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'manual' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Enter your delivery address
                </label>
                <textarea
                  value={manualAddress}
                  onChange={(e) => setManualAddress(e.target.value)}
                  placeholder="Enter complete address including street, area, city, pincode..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
              </div>
              
              <button
                onClick={handleManualSubmit}
                disabled={!manualAddress.trim()}
                className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors"
              >
                Confirm Address
              </button>

              {/* Address Suggestions */}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Recent Addresses</h3>
                <div className="space-y-2">
                  {['123 Broadway, NYC 10001', '456 Park Ave, NYC 10022'].map((address, index) => (
                    <button
                      key={index}
                      onClick={() => setManualAddress(address)}
                      className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300">{address}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
