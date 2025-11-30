'use client'

import Link from 'next/link'

export default function AdminProducts() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Products</h1>
          <Link
            href="/admin/products/new"
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded font-semibold"
          >
            Add Product
          </Link>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <p className="text-gray-400">Product management interface coming soon.</p>
          <p className="text-gray-400 mt-2">You can manage products via API or integrate an admin panel UI here.</p>
        </div>
      </div>
    </div>
  )
}
