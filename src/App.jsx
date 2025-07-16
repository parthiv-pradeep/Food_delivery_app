import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Restaurants from './pages/Restaurants';
import CategoriesPage from './pages/CategoriesPage';
import RestaurantDetail from './pages/RestaurantDetail';
import CategoryRestaurants from './pages/CategoryRestaurants';
import SearchResults from './pages/SearchResults';
import MyOrders from './pages/MyOrders';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LocationTest from './components/LocationTest';
import ManageAddresses from './pages/ManageAddresses';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen bg-white">
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/restaurants" element={<Restaurants />} />
                  <Route path="/categories" element={<CategoriesPage />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/location-test" element={<LocationTest />} />
                  <Route path="/manage-addresses" element={<ManageAddresses />} />
                  <Route path="/restaurant/:id" element={<RestaurantDetail />} />
                  <Route path="/category/:category" element={<CategoryRestaurants />} />
                  <Route 
                    path="/cart" 
                    element={
                      <ProtectedRoute type="cart">
                        <CartPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/checkout" 
                    element={
                      <ProtectedRoute type="checkout">
                        <CheckoutPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/orders" 
                    element={
                      <ProtectedRoute type="orders">
                        <MyOrders />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </main>
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
