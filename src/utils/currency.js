import { SHOP_CONFIG } from '../config/shopConfig';

/**
 * Format price in Indian Rupees with proper formatting
 * @param {number} price - Price in rupees
 * @returns {string} Formatted price string
 */
export const formatPrice = (price) => {
  if (typeof price !== 'number') return `${SHOP_CONFIG.currency.symbol}0`;
  
  // Format number with Indian numbering system (lakhs, crores)
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: SHOP_CONFIG.currency.code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  return formatter.format(price);
};

/**
 * Format price without currency symbol
 * @param {number} price - Price in rupees
 * @returns {string} Formatted price string without symbol
 */
export const formatPriceNumber = (price) => {
  if (typeof price !== 'number') return '0';
  
  return new Intl.NumberFormat('en-IN').format(price);
};

/**
 * Calculate discount percentage
 * @param {number} originalPrice - Original price
 * @param {number} currentPrice - Current price
 * @returns {number} Discount percentage
 */
export const calculateDiscount = (originalPrice, currentPrice) => {
  if (!originalPrice || !currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};