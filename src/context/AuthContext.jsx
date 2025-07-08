import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  const signInWithPhone = async (phoneNumber, name) => {
    try {
      setIsLoading(true);
      
      // Simulate API call for phone verification
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Create user data
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        phoneNumber: phoneNumber,
        name: name,
        email: null,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      setIsLoading(false);
      
      return { success: true, user: userData };
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: error.message };
    }
  };

  // Remove OTP functionality - not needed anymore

  const signOut = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('cart'); // Clear cart on logout
    localStorage.removeItem('orders'); // Clear orders on logout
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    return updatedUser;
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    signInWithPhone,
    signOut,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
