// Geocoding utilities for location services
// This file contains functions for converting coordinates to addresses and vice versa

/**
 * Real reverse geocoding function using OpenStreetMap Nominatim API (free)
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {Promise<string>} - Formatted address
 */
export const reverseGeocode = async (lat, lng) => {
  try {
    // Use OpenStreetMap Nominatim API (free, no API key required)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'FoodFlow-App/1.0'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Geocoding API request failed');
    }
    
    const data = await response.json();
    
    if (data.display_name) {
      // Format the address nicely
      const address = data.address || {};
      const parts = [];
      
      // Build address from components
      if (address.house_number && address.road) {
        parts.push(`${address.house_number} ${address.road}`);
      } else if (address.road) {
        parts.push(address.road);
      }
      
      if (address.neighbourhood || address.suburb) {
        parts.push(address.neighbourhood || address.suburb);
      }
      
      if (address.city || address.town || address.village) {
        parts.push(address.city || address.town || address.village);
      }
      
      if (address.state) {
        parts.push(address.state);
      }
      
      if (address.postcode) {
        parts.push(address.postcode);
      }
      
      return parts.join(', ') || data.display_name;
    }
    
    throw new Error('Address not found');
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    // Fallback to mock data if API fails
    return `Location at ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  }
};

/**
 * Forward geocoding function (address to coordinates) using OpenStreetMap
 * @param {string} address - Address to geocode
 * @returns {Promise<{lat: number, lng: number}>} - Coordinates
 */
export const forwardGeocode = async (address) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
      {
        headers: {
          'User-Agent': 'FoodFlow-App/1.0'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Geocoding API request failed');
    }
    
    const data = await response.json();
    
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
      };
    }
    
    throw new Error('Address not found');
  } catch (error) {
    console.error('Forward geocoding error:', error);
    // Return approximate NYC coordinates as fallback
    return {
      lat: 40.7589 + (Math.random() - 0.5) * 0.1,
      lng: -73.9851 + (Math.random() - 0.5) * 0.1
    };
  }
};

/**
 * Get current user location
 * @returns {Promise<{lat: number, lng: number}>} - User coordinates
 */
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 60000
      }
    );
  });
};

/**
 * Calculate distance between two points in kilometers
 * @param {number} lat1 - First point latitude
 * @param {number} lng1 - First point longitude
 * @param {number} lat2 - Second point latitude
 * @param {number} lng2 - Second point longitude
 * @returns {number} - Distance in kilometers
 */
export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

// Example of how to integrate real geocoding services:

/*
// Google Maps Geocoding API example
export const reverseGeocodeGoogle = async (lat, lng) => {
  const API_KEY = process.env.VITE_GOOGLE_MAPS_API_KEY;
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
  );
  const data = await response.json();
  
  if (data.results && data.results.length > 0) {
    return data.results[0].formatted_address;
  }
  throw new Error('Address not found');
};

// OpenStreetMap Nominatim example (free, no API key required)
export const reverseGeocodeOSM = async (lat, lng) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
  );
  const data = await response.json();
  
  if (data.display_name) {
    return data.display_name;
  }
  throw new Error('Address not found');
};
*/
