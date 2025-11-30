import mongoose, { Schema, Document } from 'mongoose'

export interface IProduct extends Document {
  name: string
  brand: string
  price: number
  originalPrice: number
  category: string
  description: string
  specs: string[]
  image: string
  cloudinaryId?: string
  rating: number
  reviews: number
  inStock: boolean
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    brand: {
      type: String,
      required: [true, 'Please provide a brand'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: [0, 'Price cannot be negative'],
    },
    originalPrice: {
      type: Number,
      required: [true, 'Please provide an original price'],
      min: [0, 'Original price cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: ['smartphones', 'laptops', 'tablets', 'accessories', 'audio', 'wearables'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    specs: [
      {
        type: String,
        trim: true,
      },
    ],
    image: {
      type: String,
      required: [true, 'Please provide an image URL'],
    },
    cloudinaryId: {
      type: String,
    },
    rating: {
      type: Number,
      min: [0, 'Rating cannot be less than 0'],
      max: [5, 'Rating cannot be more than 5'],
      default: 0,
    },
    reviews: {
      type: Number,
      default: 0,
      min: [0, 'Reviews count cannot be negative'],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

export default mongoose.models.Product ||
  mongoose.model<IProduct>('Product', ProductSchema)
