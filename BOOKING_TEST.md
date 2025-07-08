# FoodFlow Booking System Test

## Test the complete booking flow:

### 1. Home Page
- [ ] Visit http://localhost:5175
- [ ] Check if restaurants are displayed
- [ ] Check if "Order Now" buttons work

### 2. Restaurant Detail Page
- [ ] Click on a restaurant (e.g., Tony's Pizza Palace)
- [ ] Should navigate to /restaurant/1
- [ ] Check if menu items are displayed
- [ ] Check if "Add" buttons work

### 3. Add Items to Cart
- [ ] Click "Add" on Margherita Pizza
- [ ] Check if quantity controls (+/-) appear
- [ ] Check if cart summary appears on the right
- [ ] Check if header cart icon shows count

### 4. Cart Modal
- [ ] Click cart icon in header or "Proceed to Checkout" button
- [ ] Check if cart modal opens
- [ ] Check if items are listed correctly
- [ ] Check if quantity controls work
- [ ] Check if total price is calculated correctly

### 5. Checkout Modal
- [ ] Click "Proceed to Checkout" in cart modal
- [ ] Check if checkout modal opens
- [ ] Check if order summary is correct
- [ ] Fill in delivery address (required)
- [ ] Fill in phone number (required)
- [ ] Select payment method (cash/card)
- [ ] Add special instructions (optional)

### 6. Place Order
- [ ] Click "Place Order" button
- [ ] Check if processing animation shows
- [ ] Check if success message appears
- [ ] Check if cart is cleared after order

### 7. My Orders Page
- [ ] Navigate to /orders or click "My Orders" in header
- [ ] Check if the placed order appears
- [ ] Check if order details are correct
- [ ] Check if order status is shown

### 8. Persistent Cart
- [ ] Add items to cart
- [ ] Refresh page
- [ ] Check if cart items persist

### 9. Cross-Restaurant Cart Handling
- [ ] Add items from one restaurant
- [ ] Go to another restaurant
- [ ] Add items from second restaurant
- [ ] Check if both restaurants' items are in cart

## Common Issues to Check:
- Console errors in browser dev tools
- Network errors in dev tools
- Responsive design on mobile
- Dark mode toggle works
- Loading states work correctly
- Form validation works
