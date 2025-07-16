import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Home, Building, MapPin, Edit3, Trash2, Navigation, MapPinCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from '../utils/locationService';

const ManageAddresses = () => {
  const navigate = useNavigate();
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    label: '',
    address: '',
    landmark: '',
    type: 'home',
    isDefault: false
  });

  const { 
    location: detectedLocation, 
    isLoading: isDetecting, 
    error: locationError, 
    coordinates,
    getPreciseLocation 
  } = useLocation();

  // Load saved addresses from localStorage
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

  const handleSaveAddress = () => {
    if (newAddress.label && newAddress.address) {
      let updatedAddresses;
      
      if (editingAddress) {
        // Update existing address
        updatedAddresses = savedAddresses.map(addr => 
          addr.id === editingAddress.id 
            ? { ...newAddress, id: editingAddress.id, updatedAt: new Date().toISOString() }
            : addr
        );
      } else {
        // Add new address
        const addressObj = {
          ...newAddress,
          id: Date.now(),
          createdAt: new Date().toISOString()
        };
        updatedAddresses = [...savedAddresses, addressObj];
      }

      // If this is set as default, remove default from others
      if (newAddress.isDefault) {
        updatedAddresses = updatedAddresses.map(addr => ({
          ...addr,
          isDefault: addr.id === (editingAddress?.id || updatedAddresses[updatedAddresses.length - 1].id)
        }));
      }

      saveAddressesToStorage(updatedAddresses);
      setIsAddingNew(false);
      setEditingAddress(null);
      setNewAddress({ label: '', address: '', landmark: '', type: 'home', isDefault: false });
    }
  };

  const handleEditAddress = (address) => {
    setNewAddress({
      label: address.label,
      address: address.address,
      landmark: address.landmark || '',
      type: address.type,
      isDefault: address.isDefault || false
    });
    setEditingAddress(address);
    setIsAddingNew(true);
  };

  const handleDeleteAddress = (addressId) => {
    if (confirm('Are you sure you want to delete this address?')) {
      const updatedAddresses = savedAddresses.filter(addr => addr.id !== addressId);
      saveAddressesToStorage(updatedAddresses);
    }
  };

  const handleSetDefault = (addressId) => {
    const updatedAddresses = savedAddresses.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    }));
    saveAddressesToStorage(updatedAddresses);
  };

  const handleUseCurrentLocation = async () => {
    getPreciseLocation();
    if (detectedLocation && coordinates) {
      setNewAddress({
        ...newAddress,
        address: detectedLocation,
        label: newAddress.label || 'Current Location'
      });
    }
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
      case 'home': return 'text-green-600 bg-green-50 border-green-200';
      case 'work': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="flex items-center px-4 py-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </button>
          <h1 className="ml-3 text-lg font-semibold text-gray-900">Manage Addresses</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        {/* Add New Address Button */}
        {!isAddingNew && (
          <button
            onClick={() => setIsAddingNew(true)}
            className="w-full flex items-center justify-center p-4 border-2 border-dashed border-orange-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors mb-4"
          >
            <Plus className="h-5 w-5 text-orange-500 mr-2" />
            <span className="font-medium text-orange-600">Add New Address</span>
          </button>
        )}

        {/* Add/Edit Address Form */}
        {isAddingNew && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingAddress ? 'Edit Address' : 'Add New Address'}
            </h3>
            
            <div className="space-y-4">
              {/* Address Label */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Label*
                </label>
                <input
                  type="text"
                  placeholder="e.g., Home, Office, Mom's House"
                  value={newAddress.label}
                  onChange={(e) => setNewAddress({...newAddress, label: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Complete Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Complete Address*
                </label>
                <textarea
                  placeholder="House/Flat number, Building name, Street name, Area"
                  value={newAddress.address}
                  onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  rows={3}
                />
                
                {/* Use Current Location Button */}
                <button
                  onClick={handleUseCurrentLocation}
                  disabled={isDetecting}
                  className="mt-2 flex items-center text-sm text-orange-600 hover:text-orange-700 disabled:opacity-50"
                >
                  <Navigation className="h-4 w-4 mr-1" />
                  {isDetecting ? 'Getting location...' : 'Use current location'}
                </button>
                
                {locationError && (
                  <p className="mt-1 text-xs text-red-600">{locationError}</p>
                )}
              </div>

              {/* Landmark */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Landmark (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Near ABC Mall, Opposite XYZ School"
                  value={newAddress.landmark}
                  onChange={(e) => setNewAddress({...newAddress, landmark: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Address Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address Type
                </label>
                <div className="flex space-x-3">
                  {['home', 'work', 'other'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setNewAddress({...newAddress, type})}
                      className={`flex-1 flex items-center justify-center py-2 px-3 rounded-md border-2 transition-colors ${
                        newAddress.type === type
                          ? getAddressTypeColor(type)
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {getAddressTypeIcon(type)}
                      <span className="ml-1 text-sm capitalize">{type}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Set as Default */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={newAddress.isDefault}
                  onChange={(e) => setNewAddress({...newAddress, isDefault: e.target.checked})}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="isDefault" className="ml-2 text-sm text-gray-700">
                  Set as default delivery address
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-2">
                <button
                  onClick={handleSaveAddress}
                  disabled={!newAddress.label.trim() || !newAddress.address.trim()}
                  className="flex-1 bg-orange-500 text-white py-3 px-4 rounded-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {editingAddress ? 'Update Address' : 'Save Address'}
                </button>
                <button
                  onClick={() => {
                    setIsAddingNew(false);
                    setEditingAddress(null);
                    setNewAddress({ label: '', address: '', landmark: '', type: 'home', isDefault: false });
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Saved Addresses List */}
        <div className="space-y-3">
          {savedAddresses.map((address) => (
            <div
              key={address.id}
              className={`bg-white rounded-lg shadow-sm border p-4 ${
                address.isDefault ? 'border-orange-200 bg-orange-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <div className={`p-1.5 rounded-full mr-2 ${getAddressTypeColor(address.type)}`}>
                      {getAddressTypeIcon(address.type)}
                    </div>
                    <h3 className="font-semibold text-gray-900">{address.label}</h3>
                    {address.isDefault && (
                      <div className="ml-2 flex items-center bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs">
                        <MapPinCheck className="h-3 w-3 mr-1" />
                        Default
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{address.address}</p>
                  {address.landmark && (
                    <p className="text-gray-500 text-xs">Near {address.landmark}</p>
                  )}
                </div>
                
                <div className="flex items-center space-x-1 ml-3">
                  {!address.isDefault && (
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-md transition-colors"
                      title="Set as default"
                    >
                      <MapPinCheck className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleEditAddress(address)}
                    className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
                    title="Edit address"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(address.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete address"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {savedAddresses.length === 0 && !isAddingNew && (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No saved addresses</h3>
            <p className="text-gray-600 mb-6">Add your first delivery address to get started</p>
            <button
              onClick={() => setIsAddingNew(true)}
              className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Address
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAddresses;
