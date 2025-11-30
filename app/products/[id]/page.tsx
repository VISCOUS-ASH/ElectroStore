'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Star, Truck, Shield, Check, Share2, ChevronUp, ChevronDown, ShoppingCart } from 'lucide-react'
import { useCart } from '@/store/cartStore'
import { useToast } from '@/components/ToastProvider'

interface Product {
  _id: string
  name: string
  brand: string
  price: number
  originalPrice: number
  image: string
  rating: number
  reviews: number
  description: string
  specs: string[]
  inStock: boolean
  featured?: boolean
}

export default function ProductDetail() {
  const params = useParams()
  const id = params?.id as string
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { addToast } = useToast()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`)
        const data = await res.json()
        if (data.success) {
          setProduct(data.data)
          const relatedRes = await fetch(`/api/products?featured=true&limit=4`)
          const relatedData = await relatedRes.json()
          if (relatedData.success) {
            setRelatedProducts(relatedData.data.filter((p: Product) => p._id !== id))
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error)
        addToast('Failed to load product', 'error')
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchProduct()
  }, [id, addToast])

  const handleAddToCart = () => {
    if (!product) return
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    })
    addToast(`${product.name} added to cart!`, 'success')
    setQuantity(1)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 pt-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-12 h-12 border-4 border-blue-500 border-t-blue-600 rounded-full"></div>
        </motion.div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 pt-20">
        <div className="text-center">
          <p className="text-xl font-semibold dark:text-white mb-4">Product not found</p>
          <Link href="/products" className="text-blue-600 hover:underline">
            Back to products
          </Link>
        </div>
      </div>
    )
  }

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  )

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/products" className="text-blue-600 hover:underline text-sm font-semibold">
            ← Back to Products
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl overflow-hidden h-96 md:h-[500px]">
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {discount > 0 && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full font-bold shadow-lg"
              >
                -{discount}%
              </motion.div>
            )}

            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl">
                <span className="text-white font-bold text-2xl">Out of Stock</span>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="mb-4">
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                {product.brand}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold dark:text-white mt-2 leading-tight">
                {product.name}
              </h1>
            </div>

            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-lg dark:text-gray-300">
                <span className="font-bold dark:text-white">{product.rating}</span> ({product.reviews} reviews)
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-bold dark:text-white">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-2xl text-gray-400 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                {discount > 0 && (
                  <span className="text-lg font-bold text-green-600 dark:text-green-400">
                    Save {discount}%
                  </span>
                )}
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 mb-8 border border-green-200 dark:border-green-800">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="dark:text-white">100% Authentic - Direct from manufacturer</span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="dark:text-white">Free delivery on orders above ₹500</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="dark:text-white">1 Year Manufacturer Warranty</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <span className="font-semibold dark:text-white">Quantity:</span>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.button>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center font-semibold dark:bg-gray-800 dark:text-white border-none focus:outline-none"
                  />
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <ChevronUp className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: product.inStock ? 1.02 : 1 }}
                whileTap={{ scale: product.inStock ? 0.98 : 1 }}
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-6 h-6" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 rounded-lg font-semibold border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:border-blue-500 transition-all flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Share
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {product.specs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-8 md:p-12 rounded-2xl mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 dark:text-white">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.specs.map((spec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <Check className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{spec}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 dark:text-white">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <Link key={relatedProduct._id} href={`/products/${relatedProduct._id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8 }}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
                  >
                    <div className="relative h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {relatedProduct.featured && (
                        <div className="absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                          Featured
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg dark:text-white line-clamp-2 mb-2">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold dark:text-white">
                          {relatedProduct.rating}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold dark:text-white">
                          ₹{relatedProduct.price}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ₹{relatedProduct.originalPrice}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
