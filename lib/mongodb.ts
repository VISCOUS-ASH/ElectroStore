// lib/mongodb.ts
import mongoose from 'mongoose'

const getMongoDBUri = () => {
  // Use the environment variable
  let uri = process.env.MONGODB_URI || ''
  
  // If no database name specified, add one
  if (uri && !uri.includes('/?')) {
    // Check if database name is already there
    const match = uri.match(/mongodb\+srv:\/\/[^/]+\/([^?]+)/)
    if (!match) {
      // Add default database name
      uri = uri.replace(/\/\?/, '/electrostore?')
    }
  }
  
  return uri
}

const MONGODB_URI = getMongoDBUri()

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

interface Cached {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongoose: Cached
}

let cached: Cached = global.mongoose || { conn: null, promise: null }

if (!global.mongoose) {
  global.mongoose = cached
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }

    console.log('Connecting to MongoDB...')
    console.log('Environment:', process.env.NODE_ENV)
    console.log('Database URI preview:', MONGODB_URI.substring(0, 50) + '...')
    
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB connected successfully to:', mongoose.connection.db?.databaseName)
      return mongoose
    }).catch((error) => {
      console.error('❌ MongoDB connection error:', error.message)
      throw error
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}