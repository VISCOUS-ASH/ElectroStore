import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { formatPrice, calculateDiscount } from '../utils/currency';
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react';

const ProductCard = ({ product, index = 0 }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link to={`/products/${product.id}`}>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Image Container */}
          <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-700">
            {!isImageLoaded && (
              <div className="absolute inset-0 shimmer rounded-t-xl" />
            )}
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-48 object-cover transition-all duration-500 group-hover:scale-110 ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setIsImageLoaded(true)}
            />
            
            {/* Overlay Actions */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleAddToCart}
                  className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                >
                  <ShoppingCart className="h-5 w-5 text-primary-500" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleLike}
                  className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-600 dark:text-gray-400'}`} />
                </motion.button>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <Eye className="h-5 w-5 text-blue-500" />
                </motion.div>
              </div>
            </div>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col space-y-1">
              {product.featured && (
                <span className="px-2 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">
                  Featured
                </span>
              )}
              {product.originalPrice > product.price && (
                <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                  {calculateDiscount(product.originalPrice, product.price)}% OFF
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="absolute top-3 right-3">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                product.inStock
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
              }`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Brand */}
            <p className="text-sm text-primary-500 font-medium mb-1">{product.brand}</p>
            
            {/* Name */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex space-x-1">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                ({product.reviews})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              
              {product.originalPrice > product.price && (
                <span className="text-sm font-medium text-red-500">
                  {calculateDiscount(product.originalPrice, product.price)}% OFF
                </span>
              )}
            </div>

            {/* Add to Cart Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full mt-4 py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                product.inStock
                  ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-md hover:shadow-lg'
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;