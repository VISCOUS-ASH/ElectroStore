// app/api/debug/route.ts  (App Router) OR pages/api/debug.js (Pages Router)
export async function GET() {
  // Only do this temporarily — avoid logging secrets in production logs.
  return new Response(JSON.stringify({
    NODE_ENV: process.env.NODE_ENV,
    MY_VAR: !!process.env.MY_VAR,         // boolean: set or not
    API_URL: process.env.API_URL ? '<set>' : '<unset>'
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
