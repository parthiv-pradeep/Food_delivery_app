import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Loader2, ChevronDown, MapPinCheck, RefreshCw } from 'lucide-react';
import { useLocation } from '../utils/locationService';

const PreciseLocationDisplay = ({ onLocationUpdate, className = "" }) => {
  const [detailedLocation, setDetailedLocation] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const { 
    location, 
    isLoading, 
    error, 
    coordinates,
    getPreciseLocation,
    refreshLocation 
  } = useLocation();

  // Get detailed location when coordinates are available
  useEffect(() => {
    if (coordinates && coordinates.latitude && coordinates.longitude) {
      getDetailedLocationInfo(coordinates.latitude, coordinates.longitude);
    }
  }, [coordinates]);

  const getDetailedLocationInfo = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1&extratags=1`
      );
      
      if (response.ok) {
        const data = await response.json();
        const address = data.address || {};
        
        const locationDetails = {
          houseNumber: address.house_number || '',
          road: address.road || address.street || '',
          suburb: address.suburb || address.neighbourhood || address.residential || '',
          village: address.village || '',
          town: address.town || '',
          city: address.city || address.municipality || '',
          district: address.state_district || address.county || address.district || '',
          state: address.state || address.province || '',
          country: address.country || '',
          postcode: address.postcode || '',
          
          // Swiggy-style display formats
          primaryArea: address.suburb || address.neighbourhood || address.village || address.town || '',
          mainCity: address.city || address.town || address.village || '',
          fullDistrict: address.state_district || address.county || address.district || '',
          fullAddress: data.display_name
        };
        
        setDetailedLocation(locationDetails);
        
        // Notify parent component
        if (onLocationUpdate) {
          onLocationUpdate(locationDetails);
        }
      }
    } catch (error) {
      console.error('Failed to get detailed location:', error);
    }
  };

  const handleGetPreciseLocation = () => {
    getPreciseLocation();
  };

  const formatSwiggyStyle = () => {
    if (!detailedLocation) return location;
    
    const { primaryArea, mainCity, fullDistrict, state } = detailedLocation;
    
    if (primaryArea && mainCity && fullDistrict) {
      return `${primaryArea}, ${mainCity}, ${fullDistrict}`;
    } else if (mainCity && fullDistrict) {
      return `${mainCity}, ${fullDistrict}`;
    } else if (mainCity && state) {
      return `${mainCity}, ${state}`;
    } else {
      return location;
    }
  };

  const getLocationAccuracy = () => {
    if (!coordinates || !detailedLocation) return null;
    
    const hasStreetLevel = detailedLocation.road || detailedLocation.houseNumber;
    const hasAreaLevel = detailedLocation.primaryArea;
    const hasCityLevel = detailedLocation.mainCity;
    
    if (hasStreetLevel) return 'Street-level accuracy';
    if (hasAreaLevel) return 'Area-level accuracy';
    if (hasCityLevel) return 'City-level accuracy';
    return 'Approximate location';
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
      {/* Main Location Display */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className="mt-1">
              {isLoading ? (
                <Loader2 className="h-5 w-5 text-orange-500 animate-spin" />
              ) : (
                <MapPin className="h-5 w-5 text-orange-500" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center mb-1">
                <h3 className="font-semibold text-gray-900 text-sm">
                  {isLoading ? 'Getting precise location...' : 'Current Location'}
                </h3>
                {detailedLocation && (
                  <div className="ml-2 flex items-center bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
                    <MapPinCheck className="h-3 w-3 mr-1" />
                    GPS
                  </div>
                )}
              </div>
              
              <p className="text-gray-700 text-sm leading-relaxed">
                {formatSwiggyStyle()}
              </p>
              
              {error && (
                <p className="text-red-600 text-xs mt-1">{error}</p>
              )}
              
              {detailedLocation && !isExpanded && (
                <p className="text-gray-500 text-xs mt-1">
                  {getLocationAccuracy()}
                </p>
              )}
            </div>
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ChevronDown 
              className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
            />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 mt-3">
          <button
            onClick={handleGetPreciseLocation}
            disabled={isLoading}
            className="flex items-center px-3 py-1.5 bg-orange-500 text-white text-xs rounded-full hover:bg-orange-600 disabled:opacity-50 transition-colors"
          >
            <Navigation className="h-3 w-3 mr-1" />
            {isLoading ? 'Locating...' : 'Get Precise Location'}
          </button>
          
          <button
            onClick={refreshLocation}
            disabled={isLoading}
            className="flex items-center px-3 py-1.5 border border-gray-300 text-gray-700 text-xs rounded-full hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Refresh
          </button>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && detailedLocation && (
        <div className="border-t border-gray-100 p-4 bg-gray-50">
          <h4 className="font-medium text-gray-900 text-sm mb-3">Detailed Address</h4>
          
          <div className="space-y-2 text-sm">
            {detailedLocation.houseNumber && detailedLocation.road && (
              <div className="flex">
                <span className="text-gray-600 w-20 flex-shrink-0">Street:</span>
                <span className="text-gray-900">
                  {detailedLocation.houseNumber} {detailedLocation.road}
                </span>
              </div>
            )}
            
            {detailedLocation.primaryArea && (
              <div className="flex">
                <span className="text-gray-600 w-20 flex-shrink-0">Area:</span>
                <span className="text-gray-900">{detailedLocation.primaryArea}</span>
              </div>
            )}
            
            {detailedLocation.mainCity && (
              <div className="flex">
                <span className="text-gray-600 w-20 flex-shrink-0">City:</span>
                <span className="text-gray-900">{detailedLocation.mainCity}</span>
              </div>
            )}
            
            {detailedLocation.fullDistrict && (
              <div className="flex">
                <span className="text-gray-600 w-20 flex-shrink-0">District:</span>
                <span className="text-gray-900 font-medium">{detailedLocation.fullDistrict}</span>
              </div>
            )}
            
            {detailedLocation.state && (
              <div className="flex">
                <span className="text-gray-600 w-20 flex-shrink-0">State:</span>
                <span className="text-gray-900">{detailedLocation.state}</span>
              </div>
            )}
            
            {detailedLocation.postcode && (
              <div className="flex">
                <span className="text-gray-600 w-20 flex-shrink-0">PIN:</span>
                <span className="text-gray-900">{detailedLocation.postcode}</span>
              </div>
            )}
          </div>
          
          {coordinates && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex text-xs text-gray-500">
                <span className="w-20 flex-shrink-0">GPS:</span>
                <span>
                  {coordinates.latitude.toFixed(6)}, {coordinates.longitude.toFixed(6)}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {getLocationAccuracy()} • Last updated: {new Date().toLocaleTimeString()}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PreciseLocationDisplay;
