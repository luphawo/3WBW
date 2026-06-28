import { NextResponse } from 'next/server'
import { getPassword } from '@/lib/auth-store'

export async function POST(request: Request) {
  const { password } = await request.json()

  if (password !== getPassword()) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })

  response.cookies.set('admin_session', 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
    path: '/',
  })

  return response
}
