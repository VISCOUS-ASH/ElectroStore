// app/api/env-check/route.ts
export async function GET() {
  return Response.json({
    nodeEnv: process.env.NODE_ENV,
    mongoUri: process.env.MONGODB_URI ? '***SET***' : 'NOT SET',
    nextauthSecret: process.env.NEXTAUTH_SECRET ? '***SET***' : 'NOT SET',
    cloudinaryCloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'NOT SET',
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY ? '***SET***' : 'NOT SET',
    emailUser: process.env.EMAIL_USER ? '***SET***' : 'NOT SET',
  });
}