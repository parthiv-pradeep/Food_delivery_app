import React from 'react';

// Location service utilities
export const LocationService = {
  // Get current location using browser geolocation API
  getCurrentPosition: () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  },

  // Get location using IP-based service (no permissions needed)
  getLocationByIP: async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      if (!response.ok) {
        throw new Error('Failed to get IP location');
      }
      const data = await response.json();
      return {
        city: data.city,
        region: data.region,
        country: data.country_name,
        latitude: data.latitude,
        longitude: data.longitude,
        formatted: `${data.city}, ${data.region}, ${data.country_name}`
      };
    } catch (error) {
      console.error('IP location error:', error);
      throw error;
    }
  },

  // Reverse geocoding using Nominatim (OpenStreetMap) - Free service with detailed address
  reverseGeocode: async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1&extratags=1`
      );
      
      if (!response.ok) {
        throw new Error('Failed to reverse geocode');
      }
      
      const data = await response.json();
      const address = data.address || {};
      
      // Extract detailed address components
      const houseNumber = address.house_number || '';
      const road = address.road || address.street || '';
      const suburb = address.suburb || address.neighbourhood || address.residential || '';
      const village = address.village || '';
      const town = address.town || '';
      const city = address.city || address.municipality || '';
      const district = address.state_district || address.county || address.district || '';
      const state = address.state || address.province || '';
      const country = address.country || '';
      const postcode = address.postcode || '';
      
      // Build formatted address like Swiggy
      const streetAddress = [houseNumber, road].filter(Boolean).join(' ');
      const locality = suburb || village || town;
      const mainCity = city || town || village;
      const fullDistrict = district;
      
      // Create Swiggy-style address format
      const swiggyFormat = [
        streetAddress,
        locality,
        mainCity,
        fullDistrict,
        state
      ].filter(Boolean).join(', ');
      
      // Short format for display
      const shortFormat = [mainCity, fullDistrict, state].filter(Boolean).join(', ');
      
      return {
        // Detailed components
        houseNumber,
        road,
        locality,
        city: mainCity,
        district: fullDistrict,
        state,
        country,
        postcode,
        
        // Formatted strings
        formatted: swiggyFormat,
        shortFormat: shortFormat,
        fullAddress: data.display_name,
        
        // Swiggy-style components
        area: locality || mainCity,
        cityDistrict: `${mainCity}${fullDistrict ? `, ${fullDistrict}` : ''}`,
        stateCountry: `${state}${country ? `, ${country}` : ''}`,
        
        // Complete address object for detailed display
        addressComponents: {
          street: streetAddress,
          area: locality,
          city: mainCity,
          district: fullDistrict,
          state: state,
          country: country,
          pincode: postcode
        }
      };
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      throw error;
    }
  },

  // Get formatted location string with fallbacks
  getFormattedLocation: async () => {
    try {
      // First try IP-based location (fastest, no permissions)
      const ipLocation = await LocationService.getLocationByIP();
      return {
        location: ipLocation.formatted,
        method: 'ip',
        coordinates: {
          latitude: ipLocation.latitude,
          longitude: ipLocation.longitude
        }
      };
    } catch (error) {
      try {
        // Fallback to GPS location
        const position = await LocationService.getCurrentPosition();
        const geoData = await LocationService.reverseGeocode(
          position.latitude, 
          position.longitude
        );
        
        return {
          location: geoData.formatted,
          method: 'gps',
          coordinates: {
            latitude: position.latitude,
            longitude: position.longitude
          }
        };
      } catch (gpsError) {
        // Final fallback
        return {
          location: 'Location not available',
          method: 'fallback',
          error: gpsError.message
        };
      }
    }
  },

  // Get precise GPS location (requires user permission)
  getPreciseLocation: async () => {
    try {
      const position = await LocationService.getCurrentPosition();
      const geoData = await LocationService.reverseGeocode(
        position.latitude, 
        position.longitude
      );
      
      return {
        location: geoData.formatted,
        fullAddress: geoData.fullAddress,
        coordinates: {
          latitude: position.latitude,
          longitude: position.longitude
        },
        accuracy: position.accuracy
      };
    } catch (error) {
      throw new Error(`GPS location failed: ${error.message}`);
    }
  }
};

// Location hook for React components
export const useLocation = () => {
  const [location, setLocation] = React.useState("Detecting location...");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [coordinates, setCoordinates] = React.useState(null);

  const updateLocation = async (usePreciseLocation = false) => {
    setIsLoading(true);
    setError(null);

    try {
      let result;
      if (usePreciseLocation) {
        result = await LocationService.getPreciseLocation();
      } else {
        result = await LocationService.getFormattedLocation();
      }

      setLocation(result.location);
      setCoordinates(result.coordinates);
    } catch (err) {
      setError(err.message);
      setLocation('Set location manually');
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    updateLocation();
  }, []);

  return {
    location,
    isLoading,
    error,
    coordinates,
    updateLocation,
    refreshLocation: () => updateLocation(false),
    getPreciseLocation: () => updateLocation(true)
  };
};
