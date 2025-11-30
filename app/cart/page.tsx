'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Truck, Check } from 'lucide-react'
import { useCart } from '@/store/cartStore'
import { useToast } from '@/components/ToastProvider'

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart()
  const { addToast } = useToast()

  const handleQuantityChange = (itemId: string | number, quantity: number) => {
    if (quantity > 0) {
      updateQuantity(itemId, quantity)
    }
  }

  const handleRemove = (itemId: string | number, itemName: string) => {
    removeFromCart(itemId)
    addToast(`${itemName} removed from cart`, 'info')
  }

  const handleClearCart = () => {
    clearCart()
    addToast('Cart cleared', 'info')
  }

  const subtotal = getTotalPrice()
  const tax = subtotal * 0.18
  const shipping = subtotal > 500 ? 0 : 50
  const total = subtotal + tax + shipping

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-block mb-6"
            >
              <ShoppingBag className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto" />
            </motion.div>

            <h1 className="text-4xl font-bold mb-4 dark:text-white">
              Your Cart is Empty
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Looks like you haven&apos;t added any products yet. Start shopping to fill your cart!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-4 rounded-lg font-bold hover:shadow-lg transition-all transform hover:scale-105"
              >
                <ShoppingBag className="w-5 h-5" />
                Continue Shopping
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-10 py-4 rounded-lg font-bold hover:shadow-lg transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/products" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-2 dark:text-white"
        >
          Shopping Cart
        </motion.h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <AnimatePresence mode="popLayout">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex gap-6">
                      {item.image && (
                        <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={120}
                            height={120}
                            className="object-cover rounded-lg w-24 h-24"
                          />
                        </motion.div>
                      )}

                      <div className="flex-1">
                        <Link href={`/products/${item.id}`}>
                          <h3 className="font-bold text-lg dark:text-white hover:text-blue-600 transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 text-lg font-semibold mt-2">
                          ₹{item.price.toLocaleString()}
                        </p>

                        <div className="flex items-center gap-4 mt-4">
                          <div className="flex items-center border-2 border-gray-200 dark:border-gray-600 rounded-lg">
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              <Minus className="w-5 h-5" />
                            </motion.button>
                            <input
                              type="number"
                              min="1"
                              max="10"
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(item.id, parseInt(e.target.value) || 1)
                              }
                              className="w-12 text-center font-bold dark:bg-gray-800 dark:text-white border-none focus:outline-none"
                            />
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              <Plus className="w-5 h-5" />
                            </motion.button>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        <div className="text-right">
                          <p className="text-2xl font-bold dark:text-white">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {item.quantity} × ₹{item.price.toLocaleString()}
                          </p>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRemove(item.id, item.name)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 p-3 rounded-lg transition-all"
                          title="Remove from cart"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-fit sticky top-24"
          >
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-6 dark:text-white">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Subtotal:</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span className="flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    Shipping:
                  </span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600 dark:text-green-400">Free</span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Tax (18%):</span>
                  <span className="font-semibold">₹{tax.toLocaleString()}</span>
                </div>
              </div>

              {shipping > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-3 rounded-lg mb-6"
                >
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    <span className="font-bold">Free shipping</span> on orders over ₹500
                  </p>
                </motion.div>
              )}

              <div className="border-t-2 border-gray-200 dark:border-gray-700 pt-6 mb-8">
                <div className="flex justify-between items-baseline">
                  <span className="text-gray-700 dark:text-gray-300">Total:</span>
                  <span className="text-4xl font-bold dark:text-white">
                    ₹{total.toLocaleString()}
                  </span>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/checkout"
                  className="w-full block bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-4 rounded-lg font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 mb-3"
                >
                  <Check className="w-5 h-5" />
                  Proceed to Checkout
                </Link>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClearCart}
                className="w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                Clear Cart
              </motion.button>

              <div className="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>100% Authentic Products</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>30-Day Easy Returns</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
