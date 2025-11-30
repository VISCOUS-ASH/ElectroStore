'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search, ShoppingCart, Truck, Shield, MapPin, DollarSign, Lock } from 'lucide-react'

const FAQS_BY_CATEGORY = {
  general: {
    icon: ShoppingCart,
    title: 'General Questions',
    faqs: [
      {
        q: 'What is ElectroStore?',
        a: 'ElectroStore is a premium online electronics retailer offering authentic gadgets, devices, and accessories at competitive prices with fast delivery and exceptional customer support.',
      },
      {
        q: 'When was ElectroStore founded?',
        a: 'ElectroStore was founded in 2020 with a mission to make premium electronics accessible to everyone with guaranteed authenticity and quality.',
      },
      {
        q: 'Is ElectroStore trustworthy?',
        a: 'Yes! We have served over 50,000+ happy customers with a 99% satisfaction rate. All products are 100% authentic with official manufacturer warranties.',
      },
    ],
  },
  shipping: {
    icon: Truck,
    title: 'Shipping & Delivery',
    faqs: [
      {
        q: 'How long does delivery take?',
        a: 'Standard delivery takes 3-5 business days. Express delivery is available for 1-2 business days. Free shipping on orders over $50.',
      },
      {
        q: 'Do you offer international shipping?',
        a: 'Yes, we ship to 50+ countries worldwide. International orders typically take 7-14 business days depending on the destination.',
      },
      {
        q: 'How can I track my order?',
        a: 'Once your order ships, you will receive a tracking link via email. You can track your package in real-time on our tracking portal.',
      },
      {
        q: 'What are the shipping costs?',
        a: 'Shipping is FREE on orders over $50. For orders below $50, standard shipping costs $5.99. Express options available at additional cost.',
      },
    ],
  },
  returns: {
    icon: Shield,
    title: 'Returns & Refunds',
    faqs: [
      {
        q: 'What is your return policy?',
        a: 'We offer hassle-free returns within 30 days of purchase. Items must be in original condition with all packaging and accessories.',
      },
      {
        q: 'How do I initiate a return?',
        a: 'Log into your account, go to Orders, select the item, and click "Request Return". Follow the instructions to get a return shipping label.',
      },
      {
        q: 'How long do refunds take?',
        a: 'Once we receive and inspect your return, refunds are processed within 5-7 business days to your original payment method.',
      },
      {
        q: 'Can I exchange an item?',
        a: 'Yes! You can exchange items within 30 days. Simply initiate a return and place a new order, or contact our support team for assistance.',
      },
    ],
  },
  warranty: {
    icon: Lock,
    title: 'Warranty & Protection',
    faqs: [
      {
        q: 'Do you offer warranty?',
        a: 'Yes! All products come with manufacturer warranty (typically 1-2 years). We also offer extended warranty options at checkout.',
      },
      {
        q: 'Are all products authentic?',
        a: '100% guaranteed authentic! We source directly from authorized manufacturers and distributors. Every product is verified for authenticity.',
      },
      {
        q: 'What if I receive a defective product?',
        a: 'We offer immediate replacement or full refund for defective items. Contact our support team within 30 days with photos and we\'ll resolve it quickly.',
      },
    ],
  },
  payment: {
    icon: DollarSign,
    title: 'Payment & Pricing',
    faqs: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards, debit cards, PayPal, Apple Pay, Google Pay, and bank transfers. All payments are secured with 256-bit encryption.',
      },
      {
        q: 'Why are your prices so competitive?',
        a: 'We work directly with manufacturers to eliminate middlemen, allowing us to pass savings to our customers without compromising quality.',
      },
      {
        q: 'Do you offer price matching?',
        a: 'Yes! If you find a lower price for the same product at an authorized retailer, we\'ll match it or beat it by 5%.',
      },
      {
        q: 'Are there any hidden charges?',
        a: 'No hidden charges! The price you see at checkout is the final price. Tax (where applicable) and any shipping charges are displayed upfront.',
      },
    ],
  },
  support: {
    icon: MapPin,
    title: 'Customer Support',
    faqs: [
      {
        q: 'How can I contact customer support?',
        a: 'You can reach us via email (support@electrostore.com), phone (+1-555-123-4567), live chat on our website, or social media. We typically respond within 24 hours.',
      },
      {
        q: 'What are your support hours?',
        a: 'Email support: 24/7. Phone support: Monday-Friday, 9AM-6PM EST. Live chat: Monday-Friday, 10AM-5PM EST.',
      },
      {
        q: 'Is there a 24/7 support line?',
        a: 'Yes, you can submit support tickets 24/7 via email or our help center. Our team will respond within 24 hours on business days.',
      },
    ],
  },
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredFaqs = useMemo(() => {
    const query = searchQuery.toLowerCase()
    const result: Record<string, typeof FAQS_BY_CATEGORY.general> = {}

    Object.entries(FAQS_BY_CATEGORY).forEach(([key, category]) => {
      const filtered = category.faqs.filter(
        (faq) =>
          faq.q.toLowerCase().includes(query) ||
          faq.a.toLowerCase().includes(query)
      )
      if (filtered.length > 0) {
        result[key] = { ...category, faqs: filtered }
      }
    })

    return result
  }, [searchQuery])

  const categoriesToShow = activeCategory
    ? { [activeCategory]: FAQS_BY_CATEGORY[activeCategory as keyof typeof FAQS_BY_CATEGORY] }
    : searchQuery
      ? filteredFaqs
      : FAQS_BY_CATEGORY

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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <section className="relative py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden pt-32">
        <div className="absolute inset-0 opacity-20">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"
          ></motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-2xl text-blue-100">Find answers to your questions about shopping with ElectroStore</p>
        </motion.div>
      </section>

      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative mb-12"
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setActiveCategory(null)
              }}
              className="w-full pl-12 pr-6 py-4 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:border-blue-500 transition-all text-lg"
            />
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16"
          >
            {Object.entries(FAQS_BY_CATEGORY).map(([key, category]) => {
              const Icon = category.icon
              const isActive = activeCategory === key
              return (
                <motion.button
                  key={key}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setActiveCategory(isActive ? null : key)
                    setSearchQuery('')
                  }}
                  className={`p-6 rounded-xl transition-all text-left ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md hover:shadow-lg'
                  }`}
                >
                  <Icon className={`w-8 h-8 mb-3 ${isActive ? 'text-white' : 'text-blue-500'}`} />
                  <h3 className="font-bold text-lg">{category.title}</h3>
                  <p className={`text-sm mt-1 ${isActive ? 'text-white/80' : 'text-gray-600 dark:text-gray-400'}`}>
                    {category.faqs.length} questions
                  </p>
                </motion.button>
              )
            })}
          </motion.div>

          {Object.keys(categoriesToShow).length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                No results found for "{searchQuery}"
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setActiveCategory(null)
                }}
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                Clear search
              </button>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {Object.entries(categoriesToShow).map(([categoryKey, category]) => (
                <div key={categoryKey}>
                  <motion.h2
                    variants={itemVariants}
                    className="text-3xl font-bold mb-6 dark:text-white flex items-center gap-3"
                  >
                    {(() => {
                      const Icon = category.icon
                      return <Icon className="w-8 h-8 text-blue-600" />
                    })()}
                    {category.title}
                  </motion.h2>

                  <div className="space-y-4">
                    {category.faqs.map((faq, index) => {
                      const uniqueId = `${categoryKey}-${index}`
                      const isOpen = openIndex === uniqueId

                      return (
                        <motion.div
                          key={uniqueId}
                          variants={itemVariants}
                          className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all overflow-hidden"
                        >
                          <motion.button
                            onClick={() =>
                              setOpenIndex(isOpen ? null : uniqueId)
                            }
                            className="w-full p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <span className="text-lg font-semibold dark:text-white text-left">
                              {faq.q}
                            </span>
                            <motion.div
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown className="w-6 h-6 text-blue-600 flex-shrink-0" />
                            </motion.div>
                          </motion.button>

                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {faq.a}
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl font-bold mb-6">Still Have Questions?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Can&apos;t find the answer you&apos;re looking for? Our customer support team is here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-10 py-4 rounded-lg font-bold hover:bg-blue-50 transition-all shadow-lg"
            >
              Contact Us
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="mailto:support@electrostore.com"
              className="inline-flex items-center justify-center gap-2 bg-blue-500 text-white px-10 py-4 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-lg border border-blue-400"
            >
              Email Support
            </motion.a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
