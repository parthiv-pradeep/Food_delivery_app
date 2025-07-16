import React from 'react';
import { Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartTestButton = () => {
  const { addToCart } = useCart();

  const testItems = [
    {
      id: 'test-1',
      name: 'Delicious Burger',
      price: 299,
      restaurantId: 'test-restaurant',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop',
      description: 'Juicy beef burger with cheese'
    },
    {
      id: 'test-2', 
      name: 'Margherita Pizza',
      price: 399,
      restaurantId: 'test-restaurant',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=200&fit=crop',
      description: 'Classic margherita pizza'
    },
    {
      id: 'test-3',
      name: 'Chicken Biryani',
      price: 249,
      restaurantId: 'test-restaurant', 
      image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=200&h=200&fit=crop',
      description: 'Aromatic chicken biryani'
    }
  ];

  const addRandomItem = () => {
    const randomItem = testItems[Math.floor(Math.random() * testItems.length)];
    addToCart(randomItem);
  };

  return (
    <div className="fixed top-20 right-4 z-50 bg-white rounded-lg shadow-xl p-4 border-2 border-orange-200">
      <div className="text-center mb-3">
        <h3 className="text-sm font-bold text-gray-800">Test Cart Styling</h3>
        <p className="text-xs text-gray-600">Add items to see animations</p>
      </div>
      
      <button
        onClick={addRandomItem}
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
      >
        <Plus className="h-4 w-4" />
        <span className="text-sm font-medium">Add Test Item</span>
      </button>
      
      <div className="mt-2 text-center">
        <span className="text-xs text-gray-500">Watch the cart badge animate!</span>
      </div>
    </div>
  );
};

export default CartTestButton;
