import { withClerkMiddleware, getAuth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const publicPaths = ['/sign-in', '/sign-up', '/sign-out', '/api/auth']
const isPublic = (path: string) => {
  return publicPaths.find((x) =>
    path.match(new RegExp(`^${x}`.replace('*s', '($|/)')))
  )
}

export default withClerkMiddleware((req) => {
  if (isPublic(req.nextUrl.pathname)) {
    return NextResponse.next()
  }

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
// text
export const config = { matcher: '/((?!.*\\.).*)' }
