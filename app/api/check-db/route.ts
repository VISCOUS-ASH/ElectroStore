// app/api/check-db/route.ts
import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

export async function GET() {
  const uri = process.env.MONGODB_URI
  
  if (!uri) {
    return NextResponse.json({
      success: false,
      error: 'MONGODB_URI environment variable is not set',
      suggestion: 'Check your Vercel environment variables'
    }, { status: 500 })
  }

  try {
    console.log('Connecting to MongoDB...')
    
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
    })

    await client.connect()
    
    const db = client.db()
    const databaseName = db.databaseName
    
    // List all collections
    const collections = await db.listCollections().toArray()
    
    // Get counts for each collection
    const collectionStats = await Promise.all(
      collections.map(async (collection) => {
        const coll = db.collection(collection.name)
        const count = await coll.countDocuments()
        
        // Get sample documents (max 2)
        let sample = []
        if (count > 0) {
          sample = await coll.find({}).limit(2).toArray()
        }
        
        return {
          name: collection.name,
          count,
          sample: sample.map(doc => {
            // Create a safe version without MongoDB ObjectId
            const safeDoc: any = { id: doc._id.toString() }
            
            // Add common fields
            if (doc.name) safeDoc.name = doc.name
            if (doc.title) safeDoc.title = doc.title
            if (doc.price) safeDoc.price = doc.price
            if (doc.email) safeDoc.email = doc.email
            if (doc.username) safeDoc.username = doc.username
            
            // Add first 3 other fields
            const otherFields = Object.keys(doc).filter(key => 
              !['_id', 'name', 'title', 'price', 'email', 'username'].includes(key)
            ).slice(0, 3)
            
            otherFields.forEach(key => {
              if (typeof doc[key] === 'string' || typeof doc[key] === 'number' || typeof doc[key] === 'boolean') {
                safeDoc[key] = doc[key]
              } else if (doc[key] instanceof Date) {
                safeDoc[key] = doc[key].toISOString()
              }
            })
            
            return safeDoc
          })
        }
      })
    )
    
    await client.close()

    return NextResponse.json({
      success: true,
      database: {
        name: databaseName,
        uriPreview: uri.substring(0, 50) + '...'
      },
      collections: collectionStats,
      totalCollections: collections.length,
      totalDocuments: collectionStats.reduce((sum, coll) => sum + coll.count, 0),
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL_ENV: process.env.VERCEL_ENV,
        VERCEL: !!process.env.VERCEL,
        timestamp: new Date().toISOString()
      }
    })

  } catch (error: any) {
    console.error('Database check error:', error)
    
    return NextResponse.json({
      success: false,
      error: error.message,
      errorType: error.name,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      troubleshooting: [
        '1. Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0',
        '2. Check MONGODB_URI in Vercel environment variables',
        '3. Ensure MongoDB user has correct permissions',
        '4. Verify cluster is running in MongoDB Atlas'
      ]
    }, { status: 500 })
  }
}