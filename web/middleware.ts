import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * PASSWORD GATE — temporary protection while the domain is configured.
 * To remove: delete this file and web/app/password/page.tsx, then redeploy.
 */

const PASSWORD = 'voodoo-kims-norks-were-epic'
const COOKIE_NAME = 'playbook-access'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow the password page itself, static assets, and API routes through
  if (
    pathname === '/password' ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/api') ||
    pathname.endsWith('.svg') ||
    pathname.endsWith('.ico') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.jpg')
  ) {
    return NextResponse.next()
  }

  // Check for valid access cookie
  const accessCookie = request.cookies.get(COOKIE_NAME)
  if (accessCookie?.value === PASSWORD) {
    return NextResponse.next()
  }

  // Redirect to password page
  const url = request.nextUrl.clone()
  url.pathname = '/password'
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
