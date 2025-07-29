import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, Settings, CheckCircle } from 'lucide-react';

const OrderDemo = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-blue-500 rounded-full p-2">
          <CheckCircle className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Order Management Features Added!
        </h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Order Management</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Complete checkout system with customer information collection and order processing
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <MessageCircle className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">WhatsApp Integration</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Customers can contact you directly with pre-filled order details
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Settings className="h-5 w-5 text-purple-500 mt-0.5" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Indian Rupee Support</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              All prices converted to INR with proper formatting and GST calculation
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>Next Step:</strong> Update your WhatsApp number in the config file. Customers will contact you directly for order confirmation and payment.
        </p>
      </div>
    </div>
  );
};

export default OrderDemo;