import React, { useState, useEffect } from 'react';
import { MapPin, X, Navigation, Edit3, Check, Map } from 'lucide-react';
import RealMapView from './RealMapView';
import { reverseGeocode, getCurrentLocation } from '../utils/geocoding';

const LocationModal = ({ isOpen, onClose, onLocationChange }) => {
  const [activeTab, setActiveTab] = useState('map');
  const [manualAddress, setManualAddress] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [isGeocodingLocation, setIsGeocodingLocation] = useState(false);
  const [detectedLocation, setDetectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 40.7589, lng: -73.9851 }); // NYC coordinates
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Initialize map center on component mount
  useEffect(() => {
    if (isOpen && activeTab === 'map') {
      // Try to get user's current location for better map centering
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setMapCenter({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          },
          () => {
            // Fallback to NYC if geolocation fails
            console.log('Using default NYC location');
          }
        );
      }
    }
  }, [isOpen, activeTab]);

  const handleCurrentLocation = async () => {
    setIsLocating(true);
    try {
      // Use the real getCurrentLocation function
      const position = await getCurrentLocation();
      const { lat, lng } = position;
      
      // Update map center
      setMapCenter({ lat, lng });
      
      // Get real address using reverse geocoding
      const address = await reverseGeocode(lat, lng);
      setDetectedLocation(address);
      setSelectedLocation({ lat, lng, address });
      setIsLocating(false);
    } catch (error) {
      console.error('Error getting location:', error);
      setIsLocating(false);
      
      let errorMessage = 'Unable to access location.';
      if (error.code === 1) {
        errorMessage = 'Location access denied. Please enable location services and try again.';
      } else if (error.code === 2) {
        errorMessage = 'Location unavailable. Please check your connection and try again.';
      } else if (error.code === 3) {
        errorMessage = 'Location request timed out. Please try again.';
      }
      
      alert(errorMessage);
    }
  };

  const handleMapLocationSelect = async (lat, lng, address = null) => {
    if (address) {
      // Address already provided (from reverse geocoding in RealMapView)
      setSelectedLocation({ lat, lng, address });
    } else {
      // Fallback: get address if not provided
      setIsGeocodingLocation(true);
      try {
        const resolvedAddress = await reverseGeocode(lat, lng);
        setSelectedLocation({ lat, lng, address: resolvedAddress });
      } catch (error) {
        console.error('Error getting address:', error);
        setSelectedLocation({ 
          lat, 
          lng, 
          address: `Location at ${lat.toFixed(4)}, ${lng.toFixed(4)}` 
        });
      } finally {
        setIsGeocodingLocation(false);
      }
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

  const MapView = () => {
    return (
      <div className="space-y-4">
        <RealMapView
          onLocationSelect={handleMapLocationSelect}
          selectedLocation={selectedLocation}
          currentLocation={mapCenter ? [mapCenter.lat, mapCenter.lng] : null}
          showSelectedLocationDisplay={false}
        />
        
        {/* Use Selected Location Button */}
        {isGeocodingLocation && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <span className="text-blue-700">Getting address information...</span>
            </div>
          </div>
        )}
        
        {selectedLocation && !isGeocodingLocation && (
          <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <MapPin className="h-5 w-5 text-primary-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-primary-800">Ready to Deliver</p>
                <p className="text-sm text-primary-600 mt-1">{selectedLocation.address}</p>
                <button
                  onClick={() => {
                    onLocationChange(selectedLocation.address);
                    onClose();
                  }}
                  className="mt-3 flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <Check className="h-4 w-4" />
                  <span>Use This Location</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
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
      <div className="bg-white rounded-2xl max-w-lg w-full mx-4 max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            🌍 Choose Delivery Location
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('map')}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'map'
                ? 'border-primary-500 text-primary-500'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Map className="h-4 w-4" />
              <span>Map</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('current')}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'current'
                ? 'border-primary-500 text-primary-500'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Navigation className="h-4 w-4" />
              <span>Current</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('manual')}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'manual'
                ? 'border-primary-500 text-primary-500'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Edit3 className="h-4 w-4" />
              <span>Manual</span>
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'map' && <MapView />}
          
          {activeTab === 'current' && (
            <div className="space-y-4">
              {/* Current Location Button */}
              <button
                onClick={handleCurrentLocation}
                disabled={isLocating}
                className="w-full flex items-center space-x-3 p-4 border-2 border-dashed border-primary-300 rounded-xl hover:border-primary-500 transition-colors disabled:opacity-50"
              >
                <div className={`p-2 bg-primary-100 rounded-lg ${isLocating ? 'animate-pulse' : ''}`}>
                  <Navigation className={`h-5 w-5 text-primary-500 ${isLocating ? 'animate-spin' : ''}`} />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">
                    {isLocating ? 'Detecting location...' : 'Use Current Location'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {isLocating ? 'Please wait' : 'Allow location access for accurate delivery'}
                  </p>
                </div>
              </button>

              {/* Detected Location */}
              {detectedLocation && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <MapPin className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-green-800">Location Detected</p>
                      <p className="text-sm text-green-600 mt-1">{detectedLocation}</p>
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
                <h3 className="font-medium text-gray-900 mb-3">Popular Areas</h3>
                <div className="space-y-2">
                  {popularLocations.map((location, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        onLocationChange(location);
                        onClose();
                      }}
                      className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
                    >
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">{location}</span>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter your delivery address
                </label>
                <textarea
                  value={manualAddress}
                  onChange={(e) => setManualAddress(e.target.value)}
                  placeholder="Enter complete address including street, area, city, pincode..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
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
                <h3 className="font-medium text-gray-900 mb-3">Recent Addresses</h3>
                <div className="space-y-2">
                  {['123 Broadway, NYC 10001', '456 Park Ave, NYC 10022'].map((address, index) => (
                    <button
                      key={index}
                      onClick={() => setManualAddress(address)}
                      className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
                    >
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">{address}</span>
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
