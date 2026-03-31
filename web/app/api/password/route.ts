import { NextResponse } from 'next/server'

/**
 * PASSWORD GATE API — sets the access cookie on correct password.
 * To remove: delete this file, web/middleware.ts, and web/app/password/page.tsx.
 */

const PASSWORD = 'voodoo-kims-norks-were-epic'
const COOKIE_NAME = 'playbook-access'

export async function POST(request: Request) {
  const body = await request.json()

  if (body.password !== PASSWORD) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })

  response.cookies.set(COOKIE_NAME, PASSWORD, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    // Cookie lasts 30 days
    maxAge: 60 * 60 * 24 * 30,
  })

  return response
}
