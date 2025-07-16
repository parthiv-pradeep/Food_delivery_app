import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, ChevronDown, Loader, X, Edit3, Plus, Home, Building, MapPinCheck } from 'lucide-react';
import { useLocation } from '../utils/locationService';

const DeliveryLocationSelector = ({ currentLocation, onLocationChange, className = "", showFullInterface = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('current'); // 'current', 'saved', 'manual'
  const [manualAddress, setManualAddress] = useState('');
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: '',
    address: '',
    landmark: '',
    type: 'home' // 'home', 'work', 'other'
  });

  const { 
    location: detectedLocation, 
    isLoading: isDetecting, 
    error: locationError, 
    coordinates,
    refreshLocation, 
    getPreciseLocation 
  } = useLocation();

  // Load saved addresses from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('savedAddresses');
    if (saved) {
      setSavedAddresses(JSON.parse(saved));
    }
  }, []);

  // Save addresses to localStorage
  const saveAddressesToStorage = (addresses) => {
    localStorage.setItem('savedAddresses', JSON.stringify(addresses));
    setSavedAddresses(addresses);
  };

  // Predefined locations for quick access
  const quickLocations = [
    {
      id: 1,
      name: "Meppayur",
      area: "Meppayur, Kozhikode District, Kerala",
      coordinates: { lat: 11.3401, lng: 75.7489 },
      isDefault: true
    },
    {
      id: 2,
      name: "Kozhikode Beach",
      area: "Beach Road, Kozhikode, Kerala",
      coordinates: { lat: 11.2588, lng: 75.7804 }
    },
    {
      id: 3,
      name: "Calicut University",
      area: "University Campus, Thenhipalam, Kerala",
      coordinates: { lat: 11.1271, lng: 75.8781 }
    }
  ];

  const handleCurrentLocationClick = () => {
    getPreciseLocation();
    if (detectedLocation && detectedLocation !== "Detecting location..." && detectedLocation !== "Set location manually") {
      const locationObj = {
        id: 'current',
        name: "Current Location",
        area: detectedLocation,
        coordinates: coordinates,
        isCurrent: true
      };
      onLocationChange(locationObj);
      setIsOpen(false);
    }
  };

  const handleQuickLocationSelect = (location) => {
    onLocationChange(location);
    setIsOpen(false);
  };

  const handleManualAddressSubmit = () => {
    if (manualAddress.trim()) {
      const locationObj = {
        id: 'manual',
        name: "Manual Address",
        area: manualAddress.trim(),
        coordinates: null,
        isManual: true
      };
      onLocationChange(locationObj);
      setIsOpen(false);
      setManualAddress('');
    }
  };

  const handleSaveNewAddress = () => {
    if (newAddress.label && newAddress.address) {
      const addressObj = {
        id: Date.now(),
        label: newAddress.label,
        address: newAddress.address,
        landmark: newAddress.landmark,
        type: newAddress.type,
        createdAt: new Date().toISOString()
      };
      
      const updatedAddresses = [...savedAddresses, addressObj];
      saveAddressesToStorage(updatedAddresses);
      
      // Select this new address
      onLocationChange({
        id: addressObj.id,
        name: addressObj.label,
        area: addressObj.address,
        landmark: addressObj.landmark,
        type: addressObj.type
      });
      
      setIsOpen(false);
      setIsAddingNew(false);
      setNewAddress({ label: '', address: '', landmark: '', type: 'home' });
    }
  };

  const handleSavedAddressSelect = (address) => {
    onLocationChange({
      id: address.id,
      name: address.label,
      area: address.address,
      landmark: address.landmark,
      type: address.type
    });
    setIsOpen(false);
  };

  const deleteSavedAddress = (addressId) => {
    const updatedAddresses = savedAddresses.filter(addr => addr.id !== addressId);
    saveAddressesToStorage(updatedAddresses);
  };

  const getAddressTypeIcon = (type) => {
    switch (type) {
      case 'home': return <Home className="h-4 w-4" />;
      case 'work': return <Building className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const getAddressTypeColor = (type) => {
    switch (type) {
      case 'home': return 'text-green-600 bg-green-50';
      case 'work': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Location Display Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200 hover:shadow-md transition-shadow w-full text-left"
      >
        <MapPin className="h-4 w-4 text-orange-500 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center">
            <span className="font-medium text-gray-900 text-sm mr-1">
              {currentLocation?.name || "Select Delivery Location"}
            </span>
            <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </div>
          {currentLocation?.area && (
            <p className="text-xs text-gray-600 truncate">
              {currentLocation.area}
            </p>
          )}
        </div>
      </button>

      {/* Location Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-96 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Choose Delivery Location
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('current')}
                className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 ${
                  activeTab === 'current'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500'
                }`}
              >
                Current
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 ${
                  activeTab === 'saved'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500'
                }`}
              >
                Saved ({savedAddresses.length})
              </button>
              <button
                onClick={() => setActiveTab('manual')}
                className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 ${
                  activeTab === 'manual'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500'
                }`}
              >
                Manual
              </button>
            </div>

            {/* Content */}
            <div className="p-4 max-h-80 overflow-y-auto">
              {/* Current Location Tab */}
              {activeTab === 'current' && (
                <div className="space-y-3">
                  {/* GPS Location */}
                  <button
                    onClick={handleCurrentLocationClick}
                    disabled={isDetecting}
                    className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  >
                    {isDetecting ? (
                      <Loader className="h-5 w-5 text-orange-500 animate-spin mr-3" />
                    ) : (
                      <Navigation className="h-5 w-5 text-orange-500 mr-3" />
                    )}
                    <div className="flex-1 text-left">
                      <div className="font-medium text-gray-900">
                        {isDetecting ? "Detecting..." : "Use Current Location"}
                      </div>
                      <div className="text-sm text-gray-600">
                        {detectedLocation === "Detecting location..." ? "Getting your location..." : detectedLocation}
                      </div>
                    </div>
                  </button>

                  {locationError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-700">{locationError}</p>
                    </div>
                  )}

                  {/* Quick Locations */}
                  <div className="border-t pt-3">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Quick Locations</h4>
                    {quickLocations.map((location) => (
                      <button
                        key={location.id}
                        onClick={() => handleQuickLocationSelect(location)}
                        className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 mb-2"
                      >
                        <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                        <div className="flex-1 text-left">
                          <div className="font-medium text-gray-900">{location.name}</div>
                          <div className="text-sm text-gray-600">{location.area}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Saved Addresses Tab */}
              {activeTab === 'saved' && (
                <div className="space-y-3">
                  {/* Add New Address Button */}
                  <button
                    onClick={() => setIsAddingNew(true)}
                    className="w-full flex items-center p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors"
                  >
                    <Plus className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="font-medium text-gray-600">Add New Address</span>
                  </button>

                  {/* Add New Address Form */}
                  {isAddingNew && (
                    <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                      <input
                        type="text"
                        placeholder="Address Label (e.g., Home, Office)"
                        value={newAddress.label}
                        onChange={(e) => setNewAddress({...newAddress, label: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      <textarea
                        placeholder="Complete Address"
                        value={newAddress.address}
                        onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                        rows={3}
                      />
                      <input
                        type="text"
                        placeholder="Landmark (optional)"
                        value={newAddress.landmark}
                        onChange={(e) => setNewAddress({...newAddress, landmark: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      <select
                        value={newAddress.type}
                        onChange={(e) => setNewAddress({...newAddress, type: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="home">Home</option>
                        <option value="work">Work</option>
                        <option value="other">Other</option>
                      </select>
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSaveNewAddress}
                          className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
                        >
                          Save Address
                        </button>
                        <button
                          onClick={() => setIsAddingNew(false)}
                          className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Saved Addresses List */}
                  {savedAddresses.map((address) => (
                    <div
                      key={address.id}
                      className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div className={`p-2 rounded-full mr-3 ${getAddressTypeColor(address.type)}`}>
                        {getAddressTypeIcon(address.type)}
                      </div>
                      <div className="flex-1" onClick={() => handleSavedAddressSelect(address)}>
                        <div className="font-medium text-gray-900">{address.label}</div>
                        <div className="text-sm text-gray-600">{address.address}</div>
                        {address.landmark && (
                          <div className="text-xs text-gray-500">Near {address.landmark}</div>
                        )}
                      </div>
                      <button
                        onClick={() => deleteSavedAddress(address.id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}

                  {savedAddresses.length === 0 && !isAddingNew && (
                    <div className="text-center py-8 text-gray-500">
                      <MapPin className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p>No saved addresses yet</p>
                      <p className="text-sm">Add an address to get started</p>
                    </div>
                  )}
                </div>
              )}

              {/* Manual Address Tab */}
              {activeTab === 'manual' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter Complete Address
                    </label>
                    <textarea
                      value={manualAddress}
                      onChange={(e) => setManualAddress(e.target.value)}
                      placeholder="Enter your complete delivery address..."
                      className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                      rows={4}
                    />
                  </div>
                  <button
                    onClick={handleManualAddressSubmit}
                    disabled={!manualAddress.trim()}
                    className="w-full bg-orange-500 text-white py-3 px-4 rounded-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Use This Address
                  </button>
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-2">Or</div>
                    <button
                      onClick={() => setActiveTab('current')}
                      className="text-orange-500 text-sm font-medium hover:text-orange-600"
                    >
                      Get Current Location
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryLocationSelector;
