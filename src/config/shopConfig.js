// Shop Configuration
// Update these values with your actual shop details

export const SHOP_CONFIG = {
  // Shop Owner Contact Information
  owner: {
    name: 'Kalua Electronics',
    whatsapp: '919335138822', // Replace with your actual WhatsApp number (include country code)
    phone: '919335138822', // Replace with your actual phone number
  },

  // Business Information
  business: {
    name: 'Kalua Electronics',
    address: 'Your Business Address',
    city: 'Your City',
    state: 'Your State',
    country: 'India',
    website: 'https://yourwebsite.com'
  },

  // Currency Settings
  currency: {
    symbol: '₹',
    code: 'INR',
    name: 'Indian Rupee'
  },

  // Order Settings (in INR)
  order: {
    freeShippingThreshold: 2000, // Free shipping for orders above ₹2000
    taxRate: 0.18, // 18% GST
    defaultShipping: 150 // Default shipping cost ₹150
  }
};

// WhatsApp Message Template
// The system will automatically generate WhatsApp messages with order details
// including customer information, items, and pricing in Indian Rupees