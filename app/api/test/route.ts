// app/api/test/route.ts
import { NextResponse } from 'next/server'
import mongoose from 'mongoose'

export async function GET() {
  try {
    // Test 1: Check if MongoDB URI is available
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({
        success: false,
        error: 'MONGODB_URI is not defined',
        stage: 'env_check'
      }, { status: 500 })
    }

    // Test 2: Try to connect to MongoDB
    console.log('MongoDB URI exists, attempting connection...')
    
    // Create a fresh connection for testing
    const testUri = process.env.MONGODB_URI
    console.log('Connection URI:', testUri.substring(0, 50) + '...')
    
    const connection = await mongoose.connect(testUri)
    
    // Test 3: Check connection status
    const isConnected = mongoose.connection.readyState === 1
    console.log('Connection readyState:', mongoose.connection.readyState)
    
    // Test 4: Try to list collections
    const db = mongoose.connection.db
    const collections = await db.listCollections().toArray()
    
    // Test 5: Try a simple query
    const Product = mongoose.model('Product', new mongoose.Schema({
      name: String,
      price: Number
    }))
    
    const productCount = await Product.countDocuments()
    
    return NextResponse.json({
      success: true,
      message: 'Database test passed',
      data: {
        isConnected,
        readyState: mongoose.connection.readyState,
        collections: collections.map(c => c.name),
        productCount,
        dbName: mongoose.connection.name
      }
    })
    
  } catch (error: any) {
    console.error('Test endpoint error:', error)
    return NextResponse.json({
      success: false,
      error: error.message,
      stage: 'connection_test',
      stack: error.stack
    }, { status: 500 })
  }
}