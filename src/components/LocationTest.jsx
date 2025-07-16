import React, { useState } from 'react';
import { MapPin, RefreshCw, Navigation, Globe, Target } from 'lucide-react';
import { useLocation } from '../utils/locationService';
import PreciseLocationDisplay from './PreciseLocationDisplay';

const LocationTest = () => {
  const [detailedLocationInfo, setDetailedLocationInfo] = useState(null);
  const { 
    location, 
    isLoading, 
    error, 
    coordinates, 
    refreshLocation, 
    getPreciseLocation 
  } = useLocation();

  const handleLocationUpdate = (locationDetails) => {
    setDetailedLocationInfo(locationDetails);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center">
          <Target className="h-8 w-8 text-orange-500 mr-3" />
          Swiggy-Style Location Detection
        </h1>
        <p className="text-gray-600">Get your exact location with district-level precision</p>
      </div>

      {/* Precise Location Display */}
      <PreciseLocationDisplay 
        onLocationUpdate={handleLocationUpdate}
        className="w-full"
      />

      {/* Basic Location Info */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <MapPin className="h-6 w-6 text-orange-500 mr-2" />
          Basic Location Info
        </h2>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-600">Current Location:</span>
            <span className="font-medium text-gray-900">{location}</span>
          </div>
          
          {coordinates && (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Coordinates:</span>
              <span className="font-mono text-sm text-gray-900">
                {coordinates.latitude.toFixed(6)}, {coordinates.longitude.toFixed(6)}
              </span>
            </div>
          )}
          
          {isLoading && (
            <div className="flex items-center justify-center p-4 text-blue-600">
              <RefreshCw className="h-5 w-5 animate-spin mr-2" />
              Detecting location...
            </div>
          )}
          
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">Error: {error}</p>
            </div>
          )}
        </div>
      </div>

      {/* Detailed Location Breakdown */}
      {detailedLocationInfo && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Globe className="h-6 w-6 text-blue-500 mr-2" />
            Address Components
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Street', value: detailedLocationInfo.road || 'Not available' },
              { label: 'Area/Suburb', value: detailedLocationInfo.primaryArea || 'Not available' },
              { label: 'City/Town', value: detailedLocationInfo.mainCity || 'Not available' },
              { label: 'District', value: detailedLocationInfo.fullDistrict || 'Not available', highlight: true },
              { label: 'State', value: detailedLocationInfo.state || 'Not available' },
              { label: 'PIN Code', value: detailedLocationInfo.postcode || 'Not available' }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg border ${
                  item.highlight 
                    ? 'bg-orange-50 border-orange-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="text-sm text-gray-600 mb-1">{item.label}</div>
                <div className={`font-medium ${
                  item.highlight ? 'text-orange-900' : 'text-gray-900'
                }`}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Actions</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={refreshLocation}
            disabled={isLoading}
            className="flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Refresh Location (IP-based)
          </button>
          
          <button
            onClick={getPreciseLocation}
            disabled={isLoading}
            className="flex items-center justify-center px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Navigation className="h-5 w-5 mr-2" />
            Get GPS Location
          </button>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-3">How Swiggy-style Location Works:</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li className="flex items-start">
            <span className="font-semibold mr-2">1.</span>
            <span><strong>IP Detection:</strong> Quick city-level location without permissions</span>
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">2.</span>
            <span><strong>GPS Precision:</strong> Exact street-level location with user permission</span>
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">3.</span>
            <span><strong>Address Parsing:</strong> Detailed breakdown including district and area</span>
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">4.</span>
            <span><strong>Smart Formatting:</strong> Display format optimized for food delivery</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LocationTest;
