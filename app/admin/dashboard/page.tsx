'use client'

import Link from 'next/link'
import { BarChart3, Package, ShoppingCart, Users } from 'lucide-react'

export default function AdminDashboard() {
  const stats = [
    { icon: Package, label: 'Products', value: '145' },
    { icon: ShoppingCart, label: 'Orders', value: '328' },
    { icon: Users, label: 'Customers', value: '1,256' },
    { icon: BarChart3, label: 'Revenue', value: '$24,560' },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div key={i} className="bg-gray-800 p-6 rounded-lg">
                <Icon className="w-8 h-8 text-blue-500 mb-4" />
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/admin/products"
            className="bg-blue-500 hover:bg-blue-600 p-6 rounded-lg text-center font-semibold transition-colors"
          >
            Manage Products
          </Link>
          <Link
            href="/admin/orders"
            className="bg-green-500 hover:bg-green-600 p-6 rounded-lg text-center font-semibold transition-colors"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  )
}
