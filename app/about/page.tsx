'use client'

import { motion } from 'framer-motion'
import { Users, Target, Zap, Award, Heart, Globe, TrendingUp, Shield, ArrowRight } from 'lucide-react'

export default function About() {
  const stats = [
    { number: '50K+', label: 'Happy Customers', icon: Users },
    { number: '2M+', label: 'Products Sold', icon: TrendingUp },
    { number: '99%', label: 'Customer Satisfaction', icon: Heart },
    { number: '5 Years', label: 'Industry Experience', icon: Award },
  ]

  const values = [
    {
      icon: Award,
      title: 'Quality First',
      description: 'We guarantee 100% authentic products with official warranties and quality checks.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'Your data and transactions are protected with enterprise-grade security.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Always ahead with the latest tech and continuous platform improvements.',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Serving customers worldwide with fast and reliable international shipping.',
      color: 'from-purple-500 to-purple-600',
    },
  ]

  const teamMembers = [
    { name: 'John Smith', role: 'Founder & CEO', emoji: '👨‍💼' },
    { name: 'Sarah Williams', role: 'CTO', emoji: '👩‍💻' },
    { name: 'Michael Brown', role: 'Operations Lead', emoji: '👨‍💼' },
    { name: 'Emma Johnson', role: 'Customer Success', emoji: '👩‍💼' },
  ]

  const milestones = [
    { year: '2020', event: 'ElectroStore Founded' },
    { year: '2021', event: 'Reached 10K+ Customers' },
    { year: '2022', event: 'Expanded to International Markets' },
    { year: '2023', event: 'Hit 1M+ Products Sold' },
    { year: '2024', event: 'Launched Premium Membership' },
    { year: '2025', event: 'Expanding to 50+ Countries' },
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
          <h1 className="text-6xl md:text-7xl font-bold mb-6">About ElectroStore</h1>
          <p className="text-2xl text-blue-100">Building the future of electronics retail</p>
        </motion.div>
      </section>

      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-6">
              <h2 className="text-5xl font-bold dark:text-white mb-6">Our Story</h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                Founded in 2020, ElectroStore was born from a simple vision: to make premium electronics accessible to everyone, everywhere. We started as a small team passionate about technology and customer service.
              </p>
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                Today, we&apos;ve grown into a trusted platform serving over 50,000 happy customers globally, with a commitment to authenticity, quality, and exceptional service that sets us apart.
              </p>
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                Every product we sell is carefully curated and verified. Our team works 24/7 to ensure you get the best experience from shopping to delivery.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
                <h3 className="text-3xl font-bold mb-6">Why We Started</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✨</span>
                    <span>To eliminate counterfeit electronics from the market</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">⚡</span>
                    <span>To provide unbeatable prices without compromising quality</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🚀</span>
                    <span>To revolutionize the online shopping experience</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">❤️</span>
                    <span>To build a community of tech enthusiasts</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 dark:text-white">Our Impact</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Growing every day with our amazing community</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all text-center"
                >
                  <Icon className="w-12 h-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-semibold">
                    {stat.label}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 dark:text-white">Our Core Values</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Guiding principles that drive everything we do</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className={`bg-gradient-to-br ${value.color} p-8 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all`}
                >
                  <Icon className="w-12 h-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                  <p className="text-white/90 leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 dark:text-white">Our Team</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Dedicated professionals passionate about excellence</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all text-center"
              >
                <div className="text-6xl mb-4">{member.emoji}</div>
                <h3 className="text-xl font-bold dark:text-white mb-1">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section> */}

      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 dark:text-white">Our Journey</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Milestones that define our growth</p>
          </motion.div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-center gap-8 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
              >
                <div className="flex-1">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-2xl text-white shadow-lg">
                    <h3 className="text-2xl font-bold mb-2">{milestone.year}</h3>
                    <p className="text-lg text-white/90">{milestone.event}</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                </div>
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl text-blue-100 mb-8">
            Be part of the electronics revolution. Shop with confidence, save more, and experience excellence.
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="/products"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-10 py-4 rounded-lg font-bold hover:bg-blue-50 transition-all shadow-lg"
          >
            Start Shopping Now
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </section>
    </div>
  )
}
