import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  ShoppingBag,
  MessageCircle,
  Send,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { SHOP_CONFIG } from '../config/shopConfig';
import { formatPrice } from '../utils/currency';

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const subtotal = getTotalPrice();
  const shipping = subtotal > SHOP_CONFIG.order.freeShippingThreshold ? 0 : SHOP_CONFIG.order.defaultShipping;
  const tax = subtotal * SHOP_CONFIG.order.taxRate;
  const total = subtotal + shipping + tax;



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateOrderNumber = () => {
    return 'ORD-' + Date.now().toString().slice(-8);
  };

  const formatOrderDetails = (orderNum) => {
    const orderDetails = {
      orderNumber: orderNum,
      customer: customerInfo,
      items: items,
      pricing: {
        subtotal: subtotal,
        shipping: shipping,
        tax: tax,
        total: total
      },
      orderDate: new Date().toLocaleDateString()
    };

    return orderDetails;
  };



  const generateWhatsAppMessage = (orderDetails) => {
    const message = `🛒 *New Order Received*

📋 *Order Number:* ${orderDetails.orderNumber}
📅 *Date:* ${orderDetails.orderDate}

👤 *Customer Details:*
• Name: ${orderDetails.customer.name}
• Email: ${orderDetails.customer.email}
• Phone: ${orderDetails.customer.phone}
• Address: ${orderDetails.customer.address}, ${orderDetails.customer.city}, ${orderDetails.customer.postalCode}

🛍️ *Order Items:*
${orderDetails.items.map(item => 
  `• ${item.name} (${item.brand})
  Qty: ${item.quantity} × ${formatPrice(item.price)} = ${formatPrice(item.price * item.quantity)}`
).join('\n')}

💰 *Order Summary:*
• Subtotal: ${formatPrice(orderDetails.pricing.subtotal)}
• Shipping: ${orderDetails.pricing.shipping === 0 ? 'Free' : formatPrice(orderDetails.pricing.shipping)}
• GST (18%): ${formatPrice(orderDetails.pricing.tax)}
• *Total: ${formatPrice(orderDetails.pricing.total)}*

📝 *Notes:* ${orderDetails.customer.notes || 'No additional notes'}

Please confirm this order and provide payment instructions.`;

    console.log('Generated WhatsApp message:', message);
    return message; // Return raw message, don't encode here
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    // Basic validation with beautiful error messages
    const requiredFields = [
      { field: 'name', label: 'Full Name' },
      { field: 'email', label: 'Email Address' },
      { field: 'phone', label: 'Phone Number' },
      { field: 'address', label: 'Address' },
      { field: 'city', label: 'City' },
      { field: 'postalCode', label: 'Postal Code' }
    ];

    const missingFields = requiredFields.filter(({ field }) => !customerInfo[field].trim());
    
    if (missingFields.length > 0) {
      const missingFieldNames = missingFields.map(({ label }) => label).join(', ');
      setErrorMessage(`Please fill in the following required fields: ${missingFieldNames}`);
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 5000);
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Add a small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newOrderNumber = generateOrderNumber();
      setOrderNumber(newOrderNumber);
      
      const orderDetails = formatOrderDetails(newOrderNumber);

      // Generate WhatsApp message with order details
      const whatsappMessage = generateWhatsAppMessage(orderDetails);
      
      // Store order details in localStorage for the success page
      localStorage.setItem('lastOrder', JSON.stringify(orderDetails));
      localStorage.setItem('whatsappMessage', whatsappMessage);
      
      // Clear cart and show success
      clearCart();
      setOrderSubmitted(true);
      
    } catch (error) {
      console.error('Error submitting order:', error);
      setErrorMessage('There was an error submitting your order. Please try again or contact us directly.');
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="text-8xl mb-6">🛒</div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Your cart is empty
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Add some items to your cart before proceeding to checkout.
            </p>
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Start Shopping
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  if (orderSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-8xl mb-6"
            >
              🎉
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Order Placed Successfully!
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-8"
            >
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                Thank you for your order! 🛍️
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                <p className="text-blue-800 dark:text-blue-200 font-semibold">
                  Order Number: #{orderNumber}
                </p>
                <p className="text-blue-600 dark:text-blue-300 text-sm">
                  Please save this number for your reference
                </p>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Your order details have been prepared. Click the WhatsApp button below to send them directly to our store owner for confirmation and payment instructions.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 rounded-2xl p-8 mb-8 max-w-lg mx-auto shadow-lg"
            >
              <div className="text-center">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-2">
                  Send Order to {SHOP_CONFIG.owner.name}
                </h3>
                <p className="text-green-700 dark:text-green-300 mb-6 text-sm">
                  Click the button below to automatically send your complete order details to our WhatsApp for instant confirmation and payment instructions.
                </p>
                
                <motion.a
                  href={`https://wa.me/${SHOP_CONFIG.owner.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(localStorage.getItem('whatsappMessage') || '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(34, 197, 94, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg"
                  onClick={() => {
                    // Log for debugging
                    const phoneNumber = SHOP_CONFIG.owner.whatsapp.replace(/[^0-9]/g, '');
                    const message = localStorage.getItem('whatsappMessage');
                    const fullUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message || '')}`;
                    
                    console.log('=== WhatsApp Debug Info ===');
                    console.log('Original phone:', SHOP_CONFIG.owner.whatsapp);
                    console.log('Processed phone:', phoneNumber);
                    console.log('Message from localStorage:', message);
                    console.log('Full WhatsApp URL:', fullUrl);
                    console.log('========================');
                    
                    // Test if message exists
                    if (!message) {
                      alert('⚠️ Order message not found! Please try submitting the order again.');
                      return false;
                    }
                  }}
                >
                  <MessageCircle className="h-6 w-6" />
                  <span>Send Order via WhatsApp</span>
                </motion.a>
                
                <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-green-200 dark:border-green-700">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Contact Number:</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    +91 93351 38822
                  </p>
                </div>
                
                <p className="text-xs text-green-600 dark:text-green-400 mt-3">
                  ✅ Your order details are pre-filled and ready to send
                </p>
                
                {/* Debug buttons - remove in production */}
                <div className="mt-4 space-y-2">
                  <motion.button
                    onClick={() => {
                      const message = localStorage.getItem('whatsappMessage');
                      const phoneNumber = SHOP_CONFIG.owner.whatsapp.replace(/[^0-9]/g, '');
                      alert(`Debug Info:\nPhone: ${phoneNumber}\nMessage exists: ${!!message}\nMessage length: ${message?.length || 0}`);
                      if (message) {
                        console.log('WhatsApp Message Preview:', message);
                      }
                    }}
                    className="block text-xs text-blue-600 hover:text-blue-800 underline"
                  >
                    🔍 Debug WhatsApp Message
                  </motion.button>
                  
                  <motion.a
                    href={`https://wa.me/${SHOP_CONFIG.owner.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Test message from your website!')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs text-purple-600 hover:text-purple-800 underline"
                  >
                    🧪 Test WhatsApp Link (Simple Message)
                  </motion.a>
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
                >
                  Continue Shopping
                </motion.button>
              </Link>
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
                >
                  Go Home
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      {/* Error Toast */}
      {showErrorToast && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 right-4 z-50 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg max-w-md"
        >
          <div className="flex items-start space-x-3">
            <div className="text-2xl">⚠️</div>
            <div>
              <h4 className="font-semibold mb-1">Validation Error</h4>
              <p className="text-sm">{errorMessage}</p>
            </div>
          </div>
        </motion.div>
      )}
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/cart"
            className="inline-flex items-center space-x-2 text-primary-500 hover:text-primary-600 font-medium mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Cart</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Checkout
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Complete your order details below
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Information Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-primary-100 dark:bg-primary-900/20 p-2 rounded-lg">
                <User className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Customer Information
              </h2>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 hover:border-primary-300"
                      placeholder="Enter your full name"
                    />
                    <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter your email"
                    />
                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter your phone number"
                  />
                  <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Address *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter your address"
                  />
                  <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={customerInfo.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter your city"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={customerInfo.postalCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter postal code"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={customerInfo.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Any special instructions or notes..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02, boxShadow: isSubmitting ? "none" : "0 10px 25px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center space-x-3 transition-all duration-300 shadow-lg ${
                  isSubmitting
                    ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed text-white'
                    : 'bg-gradient-to-r from-primary-500 to-blue-600 hover:from-primary-600 hover:to-blue-700 text-white'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                    <span>Processing Your Order...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-6 w-6" />
                    <span>Place Order 🛍️</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-fit sticky top-24"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-lg">
                <ShoppingBag className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Order Summary
              </h2>
            </div>

            {/* Order Items */}
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Qty: {item.quantity} × {formatPrice(item.price)}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <hr className="border-gray-200 dark:border-gray-700 mb-4" />

            {/* Pricing Summary */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Shipping</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {shipping === 0 ? 'Free' : formatPrice(shipping)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">GST (18%)</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatPrice(tax)}
                </span>
              </div>

              <hr className="border-gray-200 dark:border-gray-700" />

              <div className="flex justify-between text-lg font-bold">
                <span className="text-gray-900 dark:text-white">Total</span>
                <span className="text-gray-900 dark:text-white">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                Need Help?
              </h3>
              <p className="text-xs text-blue-600 dark:text-blue-300 mb-3">
                Contact us directly for any questions about your order.
              </p>
              <motion.a
                href={`https://wa.me/${SHOP_CONFIG.owner.whatsapp.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;