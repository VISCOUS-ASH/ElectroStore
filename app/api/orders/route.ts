import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { sendOrderNotifications } from '@/lib/email'
import Order from '@/models/Order'

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()

    const orders = await Order.find().populate('items.productId').limit(100)

    return NextResponse.json({ success: true, data: orders })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    await connectToDatabase()

    const order = await Order.create(body)

    try {
      await sendOrderNotifications({
        orderNumber: order.orderNumber,
        items: body.items,
        customerInfo: body.customerInfo,
        subtotal: body.subtotal,
        tax: body.tax,
        shipping: body.shipping,
        totalPrice: body.totalPrice,
      })
    } catch (emailError) {
      console.error('Failed to send order notifications:', emailError)
    }

    return NextResponse.json(
      { success: true, data: order },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
