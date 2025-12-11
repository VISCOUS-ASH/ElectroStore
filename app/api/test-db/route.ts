// app/api/test-db/route.ts
import { connectToDatabase } from '@/lib/mongodb'

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const collections = await db.listCollections().toArray()
    
    return Response.json({
      success: true,
      collections: collections.map(c => c.name),
      message: 'Database connected successfully'
    })
  } catch (error: any) {
    return Response.json({
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 })
  }
}