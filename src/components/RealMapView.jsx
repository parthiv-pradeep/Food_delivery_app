import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Navigation, Crosshair } from 'lucide-react';
import { reverseGeocode, getCurrentLocation } from '../utils/geocoding';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom red marker icon
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to handle map clicks
function LocationSelector({ onLocationSelect }) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      try {
        // Get real address for clicked location
        const address = await reverseGeocode(lat, lng);
        onLocationSelect(lat, lng, address);
      } catch (error) {
        console.error('Error getting address for clicked location:', error);
        // Fallback to coordinates if geocoding fails
        onLocationSelect(lat, lng, `Location at ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
      }
    },
  });
  return null;
}

const RealMapView = ({ onLocationSelect, selectedLocation, currentLocation, showSelectedLocationDisplay = true }) => {
  const [map, setMap] = useState(null);
  const [isLocating, setIsLocating] = useState(false);

  // Default center (NYC)
  const defaultCenter = [40.7589, -73.9851];
  const mapCenter = currentLocation || defaultCenter;

  const handleCurrentLocation = async () => {
    setIsLocating(true);
    try {
      const position = await getCurrentLocation();
      const { lat, lng } = position;
      
      if (map) {
        map.flyTo([lat, lng], 16);
      }
      
      // Get real address and pass to parent
      const address = await reverseGeocode(lat, lng);
      onLocationSelect(lat, lng, address);
      setIsLocating(false);
    } catch (error) {
      console.error('Error getting location:', error);
      setIsLocating(false);
      
      let errorMessage = 'Unable to access location.';
      if (error.code === 1) {
        errorMessage = 'Location access denied. Please enable location services.';
      } else if (error.code === 2) {
        errorMessage = 'Location unavailable. Please check your connection.';
      } else if (error.code === 3) {
        errorMessage = 'Location request timed out. Please try again.';
      }
      
      alert(errorMessage);
    }
  };

  return (
    <div className="space-y-4">
      {/* Map Container */}
      <div className="relative">
        <MapContainer
          center={mapCenter}
          zoom={13}
          style={{ height: '400px', width: '100%' }}
          className="rounded-xl border-2 border-gray-200 shadow-md"
          whenCreated={setMap}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          <LocationSelector onLocationSelect={onLocationSelect} />
          
          {/* Selected location marker */}
          {selectedLocation && (
            <Marker 
              position={[selectedLocation.lat, selectedLocation.lng]} 
              icon={redIcon}
            />
          )}
        </MapContainer>

        {/* Map Controls Overlay */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 z-[1000]">
          <button
            onClick={handleCurrentLocation}
            disabled={isLocating}
            className="p-3 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors border disabled:opacity-50 group"
            title="Go to current location"
          >
            <Navigation className={`w-5 h-5 text-blue-600 ${isLocating ? 'animate-spin' : 'group-hover:scale-110'} transition-transform`} />
          </button>
        </div>

        {/* Instructions Overlay */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg text-sm text-gray-700 shadow-md border z-[1000]">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-red-500" />
            <span>Click anywhere on the map to select location</span>
          </div>
        </div>
      </div>

      {/* Selected Location Display */}
      {selectedLocation && showSelectedLocationDisplay && (
        <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <MapPin className="h-5 w-5 text-primary-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-primary-800">Selected Location</p>
              <p className="text-sm text-primary-600 mt-1">{selectedLocation.address}</p>
              <p className="text-xs text-primary-500 mt-1">
                📍 {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Location Suggestions */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">🏙️ Popular NYC Locations</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: 'Times Square', lat: 40.7580, lng: -73.9855, emoji: '🎭' },
            { name: 'Central Park', lat: 40.7829, lng: -73.9654, emoji: '🌳' },
            { name: 'Brooklyn Bridge', lat: 40.7061, lng: -73.9969, emoji: '🌉' },
            { name: 'Wall Street', lat: 40.7074, lng: -74.0113, emoji: '💼' },
            { name: 'Empire State', lat: 40.7484, lng: -73.9857, emoji: '🏢' },
            { name: 'Statue of Liberty', lat: 40.6892, lng: -74.0445, emoji: '🗽' }
          ].map((location) => (
            <button
              key={location.name}
              onClick={async () => {
                if (map) {
                  map.flyTo([location.lat, location.lng], 15);
                }
                try {
                  // Get real address for the selected landmark
                  const address = await reverseGeocode(location.lat, location.lng);
                  onLocationSelect(location.lat, location.lng, address);
                } catch (error) {
                  console.error('Error getting address for landmark:', error);
                  // Fallback to landmark name if geocoding fails
                  onLocationSelect(location.lat, location.lng, location.name);
                }
              }}
              className="p-3 text-left hover:bg-gray-50 rounded-lg transition-colors border border-gray-200 group"
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg group-hover:scale-110 transition-transform">{location.emoji}</span>
                <span className="text-sm text-gray-700 font-medium">{location.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Map Features Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <div className="text-blue-600 mt-0.5">
            <Crosshair className="w-4 h-4" />
          </div>
          <div className="text-sm text-blue-800">
            <p className="font-medium">Real Map Features:</p>
            <ul className="mt-1 space-y-1 text-blue-700">
              <li>• Live OpenStreetMap data</li>
              <li>• Accurate address detection</li>
              <li>• GPS location services</li>
              <li>• Zoom and pan controls</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealMapView;
