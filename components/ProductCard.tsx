'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingCart, Star, Plus, Minus, Trash2 } from 'lucide-react'
import { useCart } from '@/store/cartStore'
import { useToast } from './ToastProvider'

interface ProductCardProps {
  id: string | number
  name: string
  price: number
  originalPrice: number
  image: string
  rating: number
  reviews: number
  inStock: boolean
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  rating,
  reviews,
  inStock,
}: ProductCardProps) {
  const { addToCart, items, updateQuantity, removeFromCart } = useCart()
  const { addToast } = useToast()
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100)

  const cartItem = useMemo(() => {
    return items.find((item) => item.id === id)
  }, [items, id])

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      id,
      name,
      price,
      image,
      quantity: 1,
    })
    addToast(`${name} added to cart!`, 'success')
  }

  const handleQuantityChange = (e: React.MouseEvent, newQuantity: number) => {
    e.preventDefault()
    e.stopPropagation()
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity)
    }
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    removeFromCart(id)
    addToast(`${name} removed from cart`, 'info')
  }

  return (
    <Link href={`/products/${id}`} className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -4 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col"
      >
        <div className="relative h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover hover:scale-110 transition-transform duration-300"
            priority={false}
          />
          {discount > 0 && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              -{discount}%
            </div>
          )}
          {!inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-semibold text-lg dark:text-white hover:text-blue-500 transition-colors line-clamp-2 mb-2">
            {name}
          </h3>

          <div className="flex items-center gap-2 my-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold dark:text-white">
              {rating}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({reviews})
            </span>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold dark:text-white">₹{price.toLocaleString()}</span>
            {originalPrice > price && (
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                ₹{originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {cartItem ? (
            <div className="space-y-2 mt-auto">
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                <motion.button
                  onClick={(e) => handleQuantityChange(e, cartItem.quantity - 1)}
                  whileTap={{ scale: 0.95 }}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Minus className="w-4 h-4 dark:text-white" />
                </motion.button>
                <span className="flex-1 text-center font-semibold dark:text-white text-sm">
                  {cartItem.quantity}
                </span>
                <motion.button
                  onClick={(e) => handleQuantityChange(e, cartItem.quantity + 1)}
                  whileTap={{ scale: 0.95 }}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Plus className="w-4 h-4 dark:text-white" />
                </motion.button>
              </div>
              <motion.button
                onClick={handleRemove}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-all flex items-center justify-center gap-2 font-semibold"
              >
                <Trash2 className="w-4 h-4" />
                Remove
              </motion.button>
            </div>
          ) : (
            <motion.button
              onClick={handleAddToCart}
              disabled={!inStock}
              whileHover={{ scale: inStock ? 1.02 : 1 }}
              whileTap={{ scale: inStock ? 0.98 : 1 }}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-lg hover:shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-semibold mt-auto"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </motion.button>
          )}
        </div>
      </motion.div>
    </Link>
  )
}
