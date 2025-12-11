// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import Product from '@/models/Product'

export async function GET(request: NextRequest) {
  console.log('=== PRODUCTS API GET START ===')
  
  try {
    console.log('1. Starting database connection...')
    await connectToDatabase()
    console.log('2. Database connected successfully')

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured') === 'true'

    console.log('3. Query parameters:', { category, featured })

    let query: any = {}
    if (category) {
      query.category = category
      console.log('4. Added category filter:', category)
    }
    if (featured) {
      query.featured = true
      console.log('5. Added featured filter')
    }

    console.log('6. Final query:', JSON.stringify(query))

    // First, let's see what's in the database
    const allProducts = await Product.find({}).limit(5)
    console.log('7. Sample products in DB:', allProducts.length, 'found')
    
    if (allProducts.length > 0) {
      console.log('8. First product:', {
        id: allProducts[0]._id,
        name: allProducts[0].name,
        category: allProducts[0].category
      })
    }

    const products = await Product.find(query).limit(100)
    console.log('9. Query results:', products.length, 'products found')

    console.log('=== PRODUCTS API GET END ===')
    
    return NextResponse.json({ 
      success: true, 
      data: products,
      count: products.length 
    })
    
  } catch (error: any) {
    console.error('=== PRODUCTS API ERROR ===')
    console.error('Error:', error.message)
    console.error('Stack:', error.stack)
    console.error('Error name:', error.name)
    
    if (error.name === 'MongoServerSelectionError') {
      console.error('MongoDB Connection Error - Check:')
      console.error('1. MONGODB_URI in .env.local')
      console.error('2. Network connectivity')
      console.error('3. MongoDB Atlas IP whitelist')
      console.error('4. Database user permissions')
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch products',
        details: process.env.NODE_ENV === 'development' ? {
          message: error.message,
          code: error.code,
          name: error.name
        } : undefined
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Creating product:', body)

    await connectToDatabase()

    const product = await Product.create(body)

    return NextResponse.json(
      { success: true, data: product },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create product',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}