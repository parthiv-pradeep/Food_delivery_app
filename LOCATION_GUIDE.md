# Location Detection in FoodFlow

This app includes robust location detection functionality to automatically detect the user's current location and display it as a readable place name.

## How Location Detection Works

### 1. **IP-Based Location (Default)**
- Automatically detects location using the user's IP address
- No permissions required
- Fast and works immediately
- Less accurate (city-level precision)
- Uses the free ipapi.co service

### 2. **GPS Location (Precise)**
- Uses browser's Geolocation API
- Requires user permission
- More accurate (street-level precision)
- Uses OpenStreetMap's Nominatim service for reverse geocoding

## Implementation

### Using the Location Hook

```jsx
import { useLocation } from '../utils/locationService';

const MyComponent = () => {
  const { 
    location,           // Current location string
    isLoading,          // Loading state
    error,              // Error message if any
    coordinates,        // Lat/lng coordinates
    refreshLocation,    // Refresh with IP-based location
    getPreciseLocation  // Get GPS-based precise location
  } = useLocation();

  return (
    <div>
      <p>Current Location: {location}</p>
      {isLoading && <p>Detecting location...</p>}
      {error && <p>Error: {error}</p>}
      
      <button onClick={refreshLocation}>
        Refresh Location
      </button>
      
      <button onClick={getPreciseLocation}>
        Get Precise Location
      </button>
    </div>
  );
};
```

### Using the Location Service Directly

```jsx
import { LocationService } from '../utils/locationService';

// Get IP-based location
const ipLocation = await LocationService.getLocationByIP();
console.log(ipLocation.formatted); // "New York, New York, United States"

// Get GPS location
const gpsPosition = await LocationService.getCurrentPosition();
const geoData = await LocationService.reverseGeocode(
  gpsPosition.latitude, 
  gpsPosition.longitude
);
console.log(geoData.formatted); // "Brooklyn, New York, United States"

// Get formatted location with fallbacks
const result = await LocationService.getFormattedLocation();
console.log(result.location);
console.log(result.method); // 'ip' or 'gps'
```

## Location Detection Flow

1. **App Starts**: Automatically detects location using IP (no permissions)
2. **User Interaction**: When user clicks location button, requests precise GPS location
3. **Fallbacks**: If any method fails, falls back to next available option
4. **Error Handling**: Graceful error handling with user-friendly messages

## Features

- ✅ **No API Keys Required**: Uses free services
- ✅ **Permission-Free Start**: Begins with IP-based detection
- ✅ **Precise Location Option**: GPS location when user allows
- ✅ **Automatic Fallbacks**: Multiple detection methods
- ✅ **Error Handling**: User-friendly error messages
- ✅ **Caching**: Reduces API calls with smart caching
- ✅ **Mobile Optimized**: Works great on mobile devices

## Services Used

- **ipapi.co**: Free IP-based geolocation (no API key needed)
- **OpenStreetMap Nominatim**: Free reverse geocoding service
- **Browser Geolocation API**: Native GPS location access

## Location Display Examples

- IP-based: "Los Angeles, California, United States"
- GPS-based: "Santa Monica, California, United States"
- Fallback: "Set location manually"

The location is automatically updated in the header and can be used throughout the app for location-based features like nearby restaurants, delivery estimates, and local offers.
