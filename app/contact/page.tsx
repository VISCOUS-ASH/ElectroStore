'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('All fields are required')
      setTimeout(() => setError(''), 3000)
      return
    }
    setSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 4000)
  }

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      details: 'support@electrostore.com',
      description: 'We typically respond within 24 hours',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '+1 (555) 123-4567',
      description: 'Call us Monday to Friday, 9AM-6PM EST',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: MapPin,
      title: 'Office',
      details: '123 Electronics Ave, Tech City, TC 12345',
      description: 'Visit us at our headquarters',
      color: 'from-purple-500 to-purple-600',
    },
  ]

  const socialLinks = [
    { icon: Facebook, name: 'Facebook', url: '#' },
    { icon: Twitter, name: 'Twitter', url: '#' },
    { icon: Linkedin, name: 'LinkedIn', url: '#' },
    { icon: Instagram, name: 'Instagram', url: '#' },
  ]

  const faqItems = [
    {
      q: 'What is your response time?',
      a: 'We aim to respond to all inquiries within 24 hours during business days.',
    },
    {
      q: 'Do you offer phone support?',
      a: 'Yes, our team is available Monday-Friday, 9AM-6PM EST.',
    },
    {
      q: 'How can I track my order?',
      a: 'You will receive a tracking link via email once your order ships.',
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
          <h1 className="text-6xl md:text-7xl font-bold mb-6">Get In Touch</h1>
          <p className="text-2xl text-blue-100">We&apos;re here to help and answer any questions you might have</p>
        </motion.div>
      </section>

      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          >
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className={`bg-gradient-to-br ${method.color} p-8 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all`}
                >
                  <Icon className="w-12 h-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{method.title}</h3>
                  <p className="text-white/90 mb-2 font-semibold">{method.details}</p>
                  <p className="text-white/70">{method.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 dark:text-white">Send Us a Message</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Fill out the form below and we&apos;ll get back to you as soon as possible</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-lg"
          >
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                <p className="text-red-600 dark:text-red-400 font-semibold">{error}</p>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                <label className="block text-sm font-semibold dark:text-white mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-6 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="John Doe"
                />
              </motion.div>

              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <label className="block text-sm font-semibold dark:text-white mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-6 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="john@example.com"
                />
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <label className="block text-sm font-semibold dark:text-white mb-2">
                Subject *
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-6 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all mb-6"
                placeholder="How can we help?"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <label className="block text-sm font-semibold dark:text-white mb-2">
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-6 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none mb-8"
                placeholder="Tell us more about your inquiry..."
              ></textarea>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Send Message
            </motion.button>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-3"
              >
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                <div>
                  <p className="font-bold text-green-600 dark:text-green-400">Message sent successfully!</p>
                  <p className="text-green-600 dark:text-green-400 text-sm">We&apos;ll get back to you within 24 hours.</p>
                </div>
              </motion.div>
            )}
          </motion.form>
        </div>
      </section>

      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 dark:text-white">Connect With Us</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Follow us on social media for updates and announcements</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center gap-8"
          >
            {socialLinks.map((link, index) => {
              const Icon = link.icon
              return (
                <motion.a
                  key={index}
                  variants={itemVariants}
                  href={link.url}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all"
                  title={link.name}
                >
                  <Icon className="w-8 h-8" />
                </motion.a>
              )
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 dark:text-white">Quick Answers</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Find answers to common questions</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <h3 className="font-bold text-lg dark:text-white mb-2">{item.q}</h3>
                <p className="text-gray-700 dark:text-gray-400">{item.a}</p>
              </motion.div>
            ))}
          </motion.div>
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
            Don&apos;t hesitate to reach out. Our team is always happy to help!
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="#"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-10 py-4 rounded-lg font-bold hover:bg-blue-50 transition-all shadow-lg"
          >
            <Mail className="w-5 h-5" />
            Email Us
          </motion.a>
        </motion.div>
      </section>
    </div>
  )
}
