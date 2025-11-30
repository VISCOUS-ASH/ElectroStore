import nodemailer from 'nodemailer'

interface OrderItem {
  name: string
  price: number
  quantity: number
}

interface CustomerInfo {
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

interface OrderDetails {
  orderNumber: string
  items: OrderItem[]
  customerInfo: CustomerInfo
  subtotal: number
  tax: number
  shipping: number
  totalPrice: number
}

const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  })
}

const generateOrderHTML = (orderDetails: OrderDetails, isOwner: boolean): string => {
  const itemsHTML = orderDetails.items
    .map(
      (item) =>
        `
    <tr style="border-bottom: 1px solid #ddd;">
      <td style="padding: 12px; text-align: left;">${item.name}</td>
      <td style="padding: 12px; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; text-align: right;">₹${item.price.toFixed(2)}</td>
      <td style="padding: 12px; text-align: right;">₹${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `
    )
    .join('')

  const customerName = `${orderDetails.customerInfo.firstName} ${orderDetails.customerInfo.lastName}`

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #3b82f6; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
        .content { background-color: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
        .section { margin-bottom: 20px; }
        .section-title { font-size: 16px; font-weight: bold; color: #1f2937; margin-bottom: 10px; border-bottom: 2px solid #3b82f6; padding-bottom: 5px; }
        table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        th { background-color: #e5e7eb; padding: 10px; text-align: left; font-weight: bold; }
        .total-section { background-color: #ffffff; padding: 15px; border: 1px solid #e5e7eb; border-radius: 5px; }
        .total-row { display: flex; justify-content: space-between; padding: 8px 0; }
        .total-row.final { font-size: 18px; font-weight: bold; color: #3b82f6; border-top: 2px solid #3b82f6; padding-top: 15px; margin-top: 10px; }
        .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Order Confirmation</h1>
          <p>Order #${orderDetails.orderNumber}</p>
        </div>
        
        <div class="content">
          ${isOwner ? `<div class="section"><div class="section-title">New Order Received</div></div>` : ''}
          
          <div class="section">
            <div class="section-title">Order Details</div>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHTML}
              </tbody>
            </table>
          </div>

          <div class="section">
            <div class="section-title">Customer Information</div>
            <p><strong>Name:</strong> ${customerName}</p>
            <p><strong>Email:</strong> ${orderDetails.customerInfo.email}</p>
            <p><strong>Phone:</strong> ${orderDetails.customerInfo.phone}</p>
            <p><strong>Address:</strong> ${orderDetails.customerInfo.address}, ${orderDetails.customerInfo.city}, ${orderDetails.customerInfo.state} ${orderDetails.customerInfo.zipCode}, ${orderDetails.customerInfo.country}</p>
          </div>

          <div class="section">
            <div class="total-section">
              <div class="total-row">
                <span>Subtotal:</span>
                <span>₹${orderDetails.subtotal.toFixed(2)}</span>
              </div>
              <div class="total-row">
                <span>Tax (18%):</span>
                <span>₹${orderDetails.tax.toFixed(2)}</span>
              </div>
              <div class="total-row">
                <span>Shipping:</span>
                <span>₹${orderDetails.shipping.toFixed(2)}</span>
              </div>
              <div class="total-row final">
                <span>Total Amount:</span>
                <span>₹${orderDetails.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Order Status</div>
            <p><strong>Status:</strong> Pending - Awaiting payment verification</p>
          </div>

          ${!isOwner ? '<div class="section"><p>We appreciate your order! We will get back to you shortly with a confirmation.</p></div>' : ''}
        </div>

        <div class="footer">
          <p>ElectroStore | Thank you for your business</p>
          <p>© 2025 ElectroStore. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

export const sendOrderNotifications = async (orderDetails: OrderDetails): Promise<void> => {
  try {
    const ownerEmail = process.env.OWNER_EMAIL
    const emailUser = process.env.EMAIL_USER

    if (!ownerEmail || !emailUser) {
      console.error('OWNER_EMAIL or EMAIL_USER environment variable not set')
      return
    }

    const transporter = createTransporter()

    const customerMailOptions = {
      from: emailUser,
      to: orderDetails.customerInfo.email,
      subject: `Order Confirmation - Order #${orderDetails.orderNumber}`,
      html: generateOrderHTML(orderDetails, false),
    }

    const ownerMailOptions = {
      from: emailUser,
      to: ownerEmail,
      subject: `New Order Received - Order #${orderDetails.orderNumber}`,
      html: generateOrderHTML(orderDetails, true),
    }

    await transporter.sendMail(customerMailOptions)
    await transporter.sendMail(ownerMailOptions)

    console.log('Order notifications sent successfully')
  } catch (error) {
    console.error('Error sending order notifications:', error)
    throw error
  }
}
