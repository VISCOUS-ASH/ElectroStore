import mongoose, { Schema, Document } from 'mongoose'

interface OrderItem {
  productId: mongoose.Types.ObjectId
  name: string
  price: number
  quantity: number
}

export interface IOrder extends Document {
  orderNumber: string
  items: OrderItem[]
  totalPrice: number
  subtotal: number
  tax: number
  shipping: number
  customerInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  paymentInfo: {
    method: string
    status: 'pending' | 'completed' | 'failed'
    transactionId?: string
  }
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      unique: true,
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        name: String,
        price: Number,
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    tax: {
      type: Number,
      required: true,
      min: 0,
    },
    shipping: {
      type: Number,
      required: true,
      min: 0,
    },
    customerInfo: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentInfo: {
      method: { type: String, required: true },
      status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
      },
      transactionId: String,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    notes: String,
  },
  { timestamps: true }
)

OrderSchema.pre('save', async function (next) {
  try {
    if (this.isNew && !this.orderNumber) {
      const count = await mongoose.model('Order').countDocuments()
      this.orderNumber = `ORD-${Date.now()}-${count + 1}`
    }
    next()
  } catch (error) {
    next(error as Error)
  }
})

export default mongoose.models.Order ||
  mongoose.model<IOrder>('Order', OrderSchema)
