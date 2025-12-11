// app/api/test-connection/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'API is working',
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_ENV: process.env.VERCEL_ENV,
      hasMongoDBUri: !!process.env.MONGODB_URI,
      mongoUriLength: process.env.MONGODB_URI?.length || 0,
      nextauthUrl: process.env.NEXTAUTH_URL,
      timestamp: new Date().toISOString()
    },
    endpoints: {
      checkDb: '/api/check-db',
      testConnection: '/api/test-connection', 
      products: '/api/products',
      seedProducts: '/api/seed-products (POST)'
    }
  })
}