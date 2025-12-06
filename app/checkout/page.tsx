'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/store/cartStore'
import { useToast } from '@/components/ToastProvider'
import { motion } from 'framer-motion'

export default function Checkout() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCart()
  const { addToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const totalPrice = getTotalPrice() * 1.18
      const orderData = {
        items: items.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        customerInfo: formData,
        subtotal: getTotalPrice(),
        tax: getTotalPrice() * 0.18,
        shipping: 0,
        totalPrice: totalPrice,
        paymentInfo: {
          method: 'card',
          status: 'pending',
        },
        status: 'pending',
      }

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })

      if (res.ok) {
        const data = await res.json()
        clearCart()
        addToast(`Order placed successfully! Order #${data.data.orderNumber}`, 'success', 4000)
        setTimeout(() => {
          router.push(`/order-success?orderNumber=${data.data.orderNumber}`)
        }, 500)
      } else {
        addToast('Failed to place order. Please try again.', 'error')
      }
    } catch (error) {
      console.error('Error placing order:', error)
      addToast('Error placing order. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 py-12 text-center">
        <p className="dark:text-white text-lg">No items in cart. Redirecting...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 dark:text-white">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl font-semibold mb-4 dark:text-white">
                Shipping Information
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'firstName', label: 'First Name' },
                  { name: 'lastName', label: 'Last Name' },
                  { name: 'email', label: 'Email' },
                  { name: 'phone', label: 'Phone' },
                  { name: 'address', label: 'Address', full: true },
                  { name: 'city', label: 'City' },
                  { name: 'state', label: 'State' },
                  { name: 'zipCode', label: 'ZIP Code' },
                  { name: 'country', label: 'Country' },
                ].map((field: any) => (
                  <div
                    key={field.name}
                    className={field.full ? 'col-span-2' : ''}
                  >
                    <label className="block text-sm font-medium dark:text-white mb-1">
                      {field.label}
                    </label>
                    <input
                      type={field.name === 'email' ? 'email' : 'text'}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg h-fit"
          >
            <h2 className="text-xl font-semibold mb-4 dark:text-white">
              Order Summary
            </h2>

            <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between dark:text-white text-sm"
                >
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-300 dark:border-gray-700 pt-4 space-y-2">
              <div className="flex justify-between dark:text-white">
                <span>Subtotal:</span>
                <span>₹{getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between dark:text-white">
                <span>Tax (18%):</span>
                <span>₹{(getTotalPrice() * 0.18).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold dark:text-white text-lg mt-4 pt-4 border-t border-gray-300 dark:border-gray-700">
                <span>Total:</span>
                <span>₹{(getTotalPrice() * 1.18).toFixed(2)}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
