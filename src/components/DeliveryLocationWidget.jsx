import React, { useState, useEffect } from 'react';
import { MapPin, ChevronDown, Navigation, Loader2, MapPinCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocation } from '../utils/locationService';

const DeliveryLocationWidget = ({ className = "" }) => {
  const [currentDeliveryAddress, setCurrentDeliveryAddress] = useState(null);
  const [showQuickSelector, setShowQuickSelector] = useState(false);
  const [detailedLocation, setDetailedLocation] = useState(null);
  
  const { 
    location: detectedLocation, 
    isLoading: isDetecting, 
    coordinates,
    getPreciseLocation 
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
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      
      if (response.ok) {
        const data = await response.json();
        const address = data.address || {};
        
        const locationDetails = {
          area: address.suburb || address.neighbourhood || address.village || address.town || '',
          city: address.city || address.town || address.village || '',
          district: address.state_district || address.county || address.district || '',
          state: address.state || address.province || '',
          isGPS: true
        };
        
        setDetailedLocation(locationDetails);
        
        // Update current delivery address with detailed info
        const formattedAddress = formatSwiggyStyleAddress(locationDetails);
        setCurrentDeliveryAddress({
          name: "Current Location",
          area: formattedAddress,
          type: "gps",
          isGPS: true
        });
      }
    } catch (error) {
      console.error('Failed to get detailed location:', error);
    }
  };

  const formatSwiggyStyleAddress = (locationDetails) => {
    const { area, city, district } = locationDetails;
    
    if (area && city && district) {
      return `${area}, ${city}, ${district}`;
    } else if (city && district) {
      return `${city}, ${district}`;
    } else if (city) {
      return city;
    } else {
      return detectedLocation;
    }
  };

  // Load default delivery address from localStorage
  useEffect(() => {
    const savedAddresses = localStorage.getItem('savedAddresses');
    if (savedAddresses) {
      const addresses = JSON.parse(savedAddresses);
      const defaultAddress = addresses.find(addr => addr.isDefault);
      if (defaultAddress) {
        setCurrentDeliveryAddress({
          name: defaultAddress.label,
          area: defaultAddress.address,
          type: defaultAddress.type
        });
        return;
      }
    }

    // If no saved address and no GPS location, use basic detected location
    if (!detailedLocation && detectedLocation && detectedLocation !== "Detecting location..." && detectedLocation !== "Set location manually") {
      setCurrentDeliveryAddress({
        name: "Current Location",
        area: detectedLocation,
        type: "ip"
      });
    }
  }, [detectedLocation, detailedLocation]);

  const handleGetPreciseLocation = () => {
    getPreciseLocation();
    setShowQuickSelector(false);
  };

  const displayText = currentDeliveryAddress 
    ? {
        main: currentDeliveryAddress.name,
        sub: currentDeliveryAddress.area.length > 35 
          ? `${currentDeliveryAddress.area.substring(0, 35)}...` 
          : currentDeliveryAddress.area
      }
    : {
        main: isDetecting ? "Getting location..." : "Set Location",
        sub: isDetecting ? "Please wait..." : "Choose delivery address"
      };

  return (
    <div className={`relative ${className}`}>
      {/* Main Location Button */}
      <button
        onClick={() => setShowQuickSelector(!showQuickSelector)}
        className="flex items-center space-x-2 text-left hover:bg-gray-50 rounded-lg p-2 transition-colors w-full"
      >
        <div className="flex items-center">
          {isDetecting ? (
            <Loader2 className="h-4 w-4 text-orange-500 animate-spin flex-shrink-0" />
          ) : (
            <MapPin className="h-4 w-4 text-orange-500 flex-shrink-0" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center">
            <span className="font-medium text-gray-900 text-sm mr-1">
              {displayText.main}
            </span>
            {currentDeliveryAddress?.isGPS && (
              <div className="flex items-center bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full text-xs mr-1">
                <MapPinCheck className="h-2.5 w-2.5 mr-0.5" />
                GPS
              </div>
            )}
            <ChevronDown className={`h-3 w-3 text-gray-500 transition-transform ${showQuickSelector ? 'rotate-180' : ''}`} />
          </div>
          <p className="text-xs text-gray-600 truncate">
            {displayText.sub}
          </p>
        </div>
      </button>

      {/* Quick Selector Dropdown */}
      {showQuickSelector && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-72">
          <div className="p-2">
            {/* Get Precise Location */}
            <button
              onClick={handleGetPreciseLocation}
              disabled={isDetecting}
              className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-md transition-colors disabled:opacity-50"
            >
              {isDetecting ? (
                <Loader2 className="h-5 w-5 text-orange-500 animate-spin mr-3" />
              ) : (
                <Navigation className="h-5 w-5 text-orange-500 mr-3" />
              )}
              <div className="flex-1">
                <div className="font-medium text-gray-900 text-sm">
                  {isDetecting ? "Getting your location..." : "Use Current Location"}
                </div>
                <div className="text-xs text-gray-600">
                  {detailedLocation 
                    ? `${detailedLocation.area || detailedLocation.city}, ${detailedLocation.district}`
                    : "Get precise GPS location with district info"
                  }
                </div>
              </div>
              {detailedLocation && (
                <div className="flex items-center bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                  <MapPinCheck className="h-3 w-3 mr-1" />
                  GPS
                </div>
              )}
            </button>

            <div className="border-t border-gray-100 my-2"></div>

            {/* Saved Addresses Preview */}
            <div className="space-y-1">
              {(() => {
                const savedAddresses = JSON.parse(localStorage.getItem('savedAddresses') || '[]');
                return savedAddresses.slice(0, 2).map((address) => (
                  <button
                    key={address.id}
                    onClick={() => {
                      setCurrentDeliveryAddress({
                        name: address.label,
                        area: address.address,
                        type: address.type
                      });
                      setShowQuickSelector(false);
                    }}
                    className="w-full flex items-center p-2 text-left hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <MapPin className="h-4 w-4 text-gray-400 mr-3" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm truncate">
                        {address.label}
                      </div>
                      <div className="text-xs text-gray-600 truncate">
                        {address.address}
                      </div>
                    </div>
                  </button>
                ));
              })()}
            </div>

            <div className="border-t border-gray-100 my-2"></div>

            {/* Manage Addresses Link */}
            <Link
              to="/manage-addresses"
              onClick={() => setShowQuickSelector(false)}
              className="w-full flex items-center p-2 text-left hover:bg-blue-50 rounded-md transition-colors"
            >
              <MapPin className="h-4 w-4 text-blue-500 mr-3" />
              <div>
                <div className="font-medium text-blue-900 text-sm">
                  Manage All Addresses
                </div>
                <div className="text-xs text-blue-600">
                  Add, edit or delete saved addresses
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {showQuickSelector && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowQuickSelector(false)}
        />
      )}
    </div>
  );
};

export default DeliveryLocationWidget;
