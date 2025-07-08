// Currency utility for Indian Rupees
export const formatCurrency = (amount) => {
  return `₹${amount}`;
};

export const formatPrice = (price) => {
  return `₹${price}`;
};

// Convert any price to INR format
export const toINR = (amount) => {
  return Math.round(amount);
};

// Calculate delivery charges for Kerala
export const calculateDeliveryFee = (distance = 1) => {
  if (distance <= 2) return 15;
  if (distance <= 5) return 25;
  return 35;
};

// Calculate GST (5% for food delivery in India)
export const calculateGST = (amount) => {
  return Math.round(amount * 0.05);
};

// Calculate total with delivery and GST
export const calculateTotal = (subtotal, deliveryFee = 25) => {
  const gst = calculateGST(subtotal);
  return subtotal + deliveryFee + gst;
};
