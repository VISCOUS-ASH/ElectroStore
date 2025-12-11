// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Clone the request headers
  const requestHeaders = new Headers(request.headers)
  
  // Add environment info to headers
  requestHeaders.set('x-vercel-env', process.env.VERCEL_ENV || 'development')
  requestHeaders.set('x-node-env', process.env.NODE_ENV || 'development')
  
  // For API routes, log environment info
  if (request.nextUrl.pathname.startsWith('/api')) {
    console.log(`[${process.env.NODE_ENV}] API Call:`, request.nextUrl.pathname)
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: '/api/:path*',
}