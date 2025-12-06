'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Trash2, Edit2, Plus, X } from 'lucide-react'

interface Product {
  _id: string
  name: string
  brand: string
  price: number
  originalPrice: number
  category: string
  image: string
  inStock: boolean
  featured: boolean
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    originalPrice: '',
    category: 'smartphones',
    image: '',
    inStock: true,
    featured: false,
    description: '',
    specs: '',
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      if (data.success) {
        setProducts(data.data)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      alert('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product)
      setFormData({
        name: product.name,
        brand: product.brand,
        price: product.price.toString(),
        originalPrice: product.originalPrice.toString(),
        category: product.category,
        image: product.image,
        inStock: product.inStock,
        featured: product.featured,
        description: '',
        specs: '',
      })
    } else {
      setEditingProduct(null)
      setFormData({
        name: '',
        brand: '',
        price: '',
        originalPrice: '',
        category: 'smartphones',
        image: '',
        inStock: true,
        featured: false,
        description: '',
        specs: '',
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingProduct(null)
  }

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formDataToSend = new FormData()
    formDataToSend.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataToSend,
      })

      const data = await res.json()

      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          image: data.data.secure_url,
        }))
        alert('Image uploaded successfully!')
      } else {
        alert('Failed to upload image')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Error uploading image')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const submitData = {
      name: formData.name,
      brand: formData.brand,
      price: parseFloat(formData.price),
      originalPrice: parseFloat(formData.originalPrice),
      category: formData.category,
      image: formData.image,
      inStock: formData.inStock,
      featured: formData.featured,
      description: formData.description,
      specs: formData.specs ? formData.specs.split(',').map((s) => s.trim()) : [],
    }

    try {
      const url = editingProduct
        ? `/api/products/${editingProduct._id}`
        : '/api/products'
      const method = editingProduct ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      })

      if (res.ok) {
        alert(`Product ${editingProduct ? 'updated' : 'created'} successfully`)
        fetchProducts()
        handleCloseModal()
      } else {
        alert('Failed to save product')
      }
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Error saving product')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })

      if (res.ok) {
        alert('Product deleted successfully')
        fetchProducts()
      } else {
        alert('Failed to delete product')
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Error deleting product')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Products</h1>
          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded font-semibold flex items-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <p className="text-gray-400">No products found</p>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Brand</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Stock</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Featured</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border-t border-gray-700 hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4 text-sm">{product.name}</td>
                      <td className="px-6 py-4 text-sm">{product.brand}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="bg-purple-700 px-3 py-1 rounded-full text-xs">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">₹{product.price}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          product.inStock ? 'bg-green-700' : 'bg-red-700'
                        }`}>
                          {product.inStock ? 'In Stock' : 'Out'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          product.featured ? 'bg-blue-700' : 'bg-gray-600'
                        }`}>
                          {product.featured ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleOpenModal(product)}
                            className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded flex items-center gap-1 transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded flex items-center gap-1 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-700 px-6 py-4 flex justify-between items-center border-b border-gray-600">
              <h2 className="text-2xl font-bold">
                {editingProduct ? 'Edit Product' : 'Add Product'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400"
                    placeholder="iPhone 15 Pro"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Brand *</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400"
                    placeholder="Apple"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                  >
                    <option value="smartphones">Smartphones</option>
                    <option value="laptops">Laptops</option>
                    <option value="tablets">Tablets</option>
                    <option value="audio">Audio</option>
                    <option value="accessories">Accessories</option>
                    <option value="wearables">Wearables</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Price (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400"
                    placeholder="99900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Original Price (₹) *</label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400"
                    placeholder="109900"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Product Image *</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      required
                      className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400"
                      placeholder="https://example.com/image.jpg or upload below"
                    />
                    <label className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-semibold cursor-pointer transition-colors whitespace-nowrap">
                      Upload Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {formData.image && (
                    <Image
                      src={formData.image}
                      alt="Preview"
                      width={128}
                      height={128}
                      className="object-cover rounded border border-gray-600"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400"
                  rows={3}
                  placeholder="Product description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Specs (comma-separated)</label>
                <textarea
                  name="specs"
                  value={formData.specs}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400"
                  rows={2}
                  placeholder="A17 Pro chip, 6.1-inch display, 48MP camera"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">In Stock</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Featured Product</span>
                </label>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-700">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold transition-colors"
                >
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 py-2 rounded font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
