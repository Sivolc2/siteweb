import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { checkRateLimit, defaultRateLimitConfig } from './lib/rate-limiting'

export async function middleware(request: NextRequest) {
  // Get IP address from request
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  
  // Check rate limit
  const { isAllowed, remaining } = await checkRateLimit(ip, defaultRateLimitConfig)
  
  // Create response
  const response = isAllowed
    ? NextResponse.next()
    : new NextResponse(JSON.stringify({ error: 'Rate limit exceeded' }), {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
        },
      })
  
  // Add rate limit headers
  response.headers.set('X-RateLimit-Remaining', remaining.toString())
  
  return response
}

export const config = {
  matcher: '/api/:path*',
} 