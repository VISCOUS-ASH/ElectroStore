// app/api/check-db/route.ts
import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    
    // List all collections
    const collections = await db.listCollections().toArray()
    
    // Check each collection for documents
    const collectionStats = await Promise.all(
      collections.map(async (collection) => {
        const coll = db.collection(collection.name)
        const count = await coll.countDocuments()
        const sample = await coll.find({}).limit(2).toArray()
        
        return {
          name: collection.name,
          count,
          sample: sample.map(doc => ({
            _id: doc._id,
            name: doc.name || 'No name field',
            ...(doc.title && { title: doc.title }),
            ...(doc.price && { price: doc.price })
          }))
        }
      })
    )
    
    return NextResponse.json({
      success: true,
      database: db.databaseName,
      collections: collectionStats,
      totalCollections: collections.length
    })
    
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}