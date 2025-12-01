'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Truck, Headphones, Zap, Star, Check, Mail } from 'lucide-react'
import ProductCard from '@/components/ProductCard'

interface Product {
  _id: string
  name: string
  brand: string
  price: number
  originalPrice: number
  image: string
  rating: number
  reviews: number
  inStock: boolean
  featured: boolean
}

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch('/api/products?featured=true')
        const data = await res.json()
        if (data.success) {
          setFeaturedProducts(data.data.slice(0, 6))
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeatured()
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const features = [
    {
      icon: Shield,
      title: 'Quality Guarantee',
      description: '100% authentic products with official manufacturer warranty and authenticity verification',
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Free shipping on orders over $50 with express options and real-time tracking',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Expert customer service team available round the clock for all your needs',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      icon: Zap,
      title: 'Latest Tech',
      description: 'Always stocked with cutting-edge gadgets and newest technology releases',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Tech Enthusiast',
      comment: 'ElectroStore offers the best prices I\'ve found anywhere. The quality is unmatched!',
      rating: 5,
      avatar: '👩‍💼',
    },
    {
      name: 'Michael Chen',
      role: 'Business Owner',
      comment: 'Fast delivery and excellent customer service. I recommend them to all my friends.',
      rating: 5,
      avatar: '👨‍💼',
    },
    {
      name: 'Emma Davis',
      role: 'Student',
      comment: 'Great products at affordable prices. Best online electronics store!',
      rating: 5,
      avatar: '👩‍🎓',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
    },
  }

  return (
    <div className="min-h-screen dark:bg-gray-900 bg-white">
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 text-white overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-20">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-20 right-10 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"
          ></motion.div>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, delay: 2 }}
            className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl"
          ></motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 max-w-5xl mx-auto px-4 text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-6 inline-block"
          >
            <span className="bg-white/20 backdrop-blur-md text-sm font-semibold px-6 py-2 rounded-full border border-white/30">
              🚀 Welcome to the Future of Electronics
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Premium Electronics
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent"
            >
              At Best Prices
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto"
          >
            Discover the latest gadgets with unbeatable prices, fast delivery, and exceptional customer service
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Shop Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#about"
              className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-lg font-bold hover:bg-white/30 transition-all border border-white/30"
            >
              Learn More
            </Link>
          </motion.div>

          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="mt-20 flex justify-center gap-8 text-sm"
          >
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <Check className="w-5 h-5" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <Check className="w-5 h-5" />
              <span>30-Day Returns</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <Check className="w-5 h-5" />
              <span>Secure Payment</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section id="features" className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 dark:text-white">Why Choose ElectroStore?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Experience the difference with our premium services</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className={`${feature.bgColor} p-8 rounded-2xl transition-all hover:shadow-xl`}
                >
                  <div className="mb-4 inline-block p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <Icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {!loading && (
        <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold mb-4 dark:text-white">
                Featured Products
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Handpicked bestsellers just for you
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {featuredProducts.map((product) => (
                <motion.div key={product._id} variants={itemVariants}>
                  <ProductCard
                    id={product._id}
                    name={product.name}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    image={product.image}
                    rating={product.rating}
                    reviews={product.reviews}
                    inStock={product.inStock}
                  />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-16"
            >
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-lg font-bold hover:shadow-lg transition-all transform hover:scale-105"
              >
                View All Products
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 dark:text-white">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Trusted by thousands of happy customers</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
  {`"${testimonial.comment}"`}
</p>

                <div className="flex items-center gap-4">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div>
                    <p className="font-bold dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"
          ></motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-2xl mx-auto text-center"
        >
          <h2 className="text-5xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-blue-100 mb-8">
            Get the latest deals and new product launches delivered to your inbox
          </p>

          <motion.form
            onSubmit={handleSubscribe}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Subscribe
            </motion.button>
          </motion.form>

          {subscribed && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-green-200 font-semibold"
            >
              ✓ Thank you for subscribing!
            </motion.p>
          )}
        </motion.div>
      </section>
    </div>
  )
}
