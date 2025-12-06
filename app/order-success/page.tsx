// app/order-success/page.jsx
'use client'                                    // MUST be the very first line
export const dynamic = 'force-dynamic'         // prevent static prerendering

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function OrderSuccess() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams?.get('orderNumber')

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4 dark:text-white">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Thank you for your purchase. Your order has been successfully placed.
        </p>

        {orderNumber && (
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Order Number
            </p>
            <p className="text-lg font-mono font-bold dark:text-white">
              {orderNumber}
            </p>
          </div>
        )}

        <p className="text-gray-600 dark:text-gray-400 mb-8">
          You will receive a confirmation email shortly with tracking details.
        </p>

        <div className="space-y-3">
          <Link
            href="/"
            className="block bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/products"
            className="block bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  )
}
