import { withClerkMiddleware, getAuth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export default withClerkMiddleware((req) => {
  const { sessionId, userId, claims, getToken, orgId } = getAuth(req)
  if (!userId) {
    const signInUrl = new URL('/sign-in', req.url)
    signInUrl.searchParams.set('redirect_url', req.url)
    return NextResponse.redirect(signInUrl)
  }
  // Do anything you need in your middleware.

  return NextResponse.next()
})

// Stop Middleware running on static files like images
export const config = { matcher: '/((?!.*\\.).*)' }
