import React, { useState } from 'react';
import { MapPin, Navigation, ChevronDown, Loader } from 'lucide-react';

const LocationSelector = ({ currentLocation, onLocationChange, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedLocation, setDetectedLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  // Predefined locations for Meppayur area
  const predefinedLocations = [
    {
      id: 1,
      name: "Meppayur",
      area: "Meppayur, Kozhikode",
      coordinates: { lat: 11.3401, lng: 75.7489 },
      isDefault: true
    },
    {
      id: 2,
      name: "Kozhikode Beach",
      area: "Beach Road, Kozhikode",
      coordinates: { lat: 11.2588, lng: 75.7804 }
    },
    {
      id: 3,
      name: "Calicut University",
      area: "University Campus, Malappuram",
      coordinates: { lat: 11.1271, lng: 75.8781 }
    },
    {
      id: 4,
      name: "Thalassery",
      area: "Thalassery, Kannur",
      coordinates: { lat: 11.7480, lng: 75.4889 }
    },
    {
      id: 5,
      name: "Vadakara",
      area: "Vadakara, Kozhikode",
      coordinates: { lat: 11.6094, lng: 75.5963 }
    }
  ];

  // Get current location using Geolocation API
  const getCurrentLocation = () => {
    setIsDetecting(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser");
      setIsDetecting(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Reverse geocoding to get address (you'd typically use Google Maps API here)
          // For demo purposes, we'll simulate this
          const locationName = await reverseGeocode(latitude, longitude);
          
          const detectedLoc = {
            id: 'current',
            name: "Current Location",
            area: locationName.area || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            coordinates: { lat: latitude, lng: longitude },
            isCurrent: true,
            fullAddress: locationName.area
          };
          
          setDetectedLocation(detectedLoc);
          onLocationChange(detectedLoc);
          setIsOpen(false);
        } catch {
          setLocationError("Could not determine your location");
        } finally {
          setIsDetecting(false);
        }
      },
      (error) => {
        let errorMessage = "Unable to retrieve your location";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please enable location permissions.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }
        
        setLocationError(errorMessage);
        setIsDetecting(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  // Simulate reverse geocoding (in real app, use Google Maps Geocoding API)
  const reverseGeocode = async (lat, lng) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Define some known locations in Kerala with their coordinates
    const knownLocations = [
      {
        lat: 11.3401, lng: 75.7489,
        name: "Meppayur",
        area: "Meppayur, Kozhikode District, Kerala 673524"
      },
      {
        lat: 11.2588, lng: 75.7804,
        name: "Kozhikode Beach",
        area: "Beach Road, Kozhikode, Kerala 673032"
      },
      {
        lat: 11.1271, lng: 75.8781,
        name: "Calicut University",
        area: "University Campus, Thenhipalam, Kerala 673635"
      },
      {
        lat: 11.7480, lng: 75.4889,
        name: "Thalassery",
        area: "Thalassery, Kannur District, Kerala 670101"
      },
      {
        lat: 11.6094, lng: 75.5963,
        name: "Vadakara",
        area: "Vadakara, Kozhikode District, Kerala 673104"
      }
    ];
    
    // Find the closest known location
    let closestLocation = null;
    let minDistance = Infinity;
    
    knownLocations.forEach(location => {
      const distance = Math.sqrt(
        Math.pow(lat - location.lat, 2) + Math.pow(lng - location.lng, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        closestLocation = location;
      }
    });
    
    // If within ~5km of a known location, return that location
    if (minDistance < 0.05) {
      return {
        name: closestLocation.name,
        area: closestLocation.area
      };
    }
    
    // Otherwise, determine the general area based on coordinates
    if (lat >= 11.0 && lat <= 12.0 && lng >= 75.0 && lng <= 76.5) {
      // Within Kozhikode district area
      const areas = [
        "Kozhikode District, Kerala",
        "Near Meppayur, Kozhikode, Kerala",
        "Kozhikode Rural Area, Kerala",
        "Koyilandy Area, Kozhikode, Kerala"
      ];
      const randomArea = areas[Math.floor(Math.random() * areas.length)];
      
      return {
        name: `${lat.toFixed(3)}°N, ${lng.toFixed(3)}°E`,
        area: randomArea
      };
    } else if (lat >= 10.0 && lat <= 13.0 && lng >= 74.0 && lng <= 77.5) {
      // Within Kerala state
      return {
        name: `${lat.toFixed(3)}°N, ${lng.toFixed(3)}°E`,
        area: "Kerala, India"
      };
    } else {
      // Outside Kerala
      return {
        name: "Your Location",
        area: `${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E`
      };
    }
  };

  const handleLocationSelect = (location) => {
    onLocationChange(location);
    setIsOpen(false);
  };

  const displayLocation = detectedLocation || currentLocation || predefinedLocations[0];

  return (
    <div className={`relative ${className}`}>
      {/* Location Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-3 py-2.5 sm:py-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 w-full group"
      >
        <MapPin className="h-4 w-4 text-orange-500 flex-shrink-0" />
        <div className="flex-1 text-left min-w-0">
          <div className="text-xs text-gray-500">
            {displayLocation.isCurrent ? "Current Location" : "Deliver to"}
          </div>
          <div className="text-sm font-medium text-gray-900 truncate">
            {displayLocation.isCurrent ? displayLocation.area : displayLocation.name}
          </div>
        </div>
        <ChevronDown 
          className={`h-4 w-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-72 sm:max-h-80 overflow-y-auto">
          {/* Current Location Option */}
          <div className="p-2 border-b border-gray-100">
            <button
              onClick={getCurrentLocation}
              disabled={isDetecting}
              className="w-full flex items-center space-x-3 p-2.5 sm:p-3 rounded-lg hover:bg-orange-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isDetecting ? (
                <Loader className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500 animate-spin flex-shrink-0" />
              ) : (
                <Navigation className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500 flex-shrink-0" />
              )}
              <div className="flex-1 text-left min-w-0">
                <div className="text-sm font-medium text-gray-900">
                  {isDetecting ? "Detecting location..." : "Use current location"}
                </div>
                <div className="text-xs text-gray-500">
                  {isDetecting ? "Please wait..." : "Get precise delivery location"}
                </div>
              </div>
            </button>
            
            {locationError && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-600">
                {locationError}
              </div>
            )}
          </div>

          {/* Predefined Locations */}
          <div className="p-2">
            <div className="text-xs font-medium text-gray-500 px-2 sm:px-3 py-2 uppercase tracking-wide">
              Popular Locations
            </div>
            {predefinedLocations.map((location) => (
              <button
                key={location.id}
                onClick={() => handleLocationSelect(location)}
                className={`w-full flex items-center space-x-3 p-2.5 sm:p-3 rounded-lg transition-colors duration-200 group ${
                  currentLocation?.id === location.id 
                    ? 'bg-orange-50 border border-orange-200' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <MapPin className={`h-4 w-4 flex-shrink-0 ${
                  currentLocation?.id === location.id ? 'text-orange-500' : 'text-gray-400'
                }`} />
                <div className="flex-1 text-left min-w-0">
                  <div className={`text-sm font-medium ${
                    currentLocation?.id === location.id ? 'text-orange-900' : 'text-gray-900'
                  }`}>
                    {location.name}
                    {location.isDefault && (
                      <span className="ml-2 text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 truncate">{location.area}</div>
                </div>
                {currentLocation?.id === location.id && (
                  <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LocationSelector;
