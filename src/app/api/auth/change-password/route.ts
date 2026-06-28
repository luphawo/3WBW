import { NextResponse } from 'next/server'
import { getPassword, setPassword } from '@/lib/auth-store'

export async function POST(request: Request) {
  const { currentPassword, newPassword } = await request.json()

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  if (currentPassword !== getPassword()) {
    return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 })
  }

  if (newPassword.length < 4) {
    return NextResponse.json({ error: 'New password must be at least 4 characters' }, { status: 400 })
  }

  if (newPassword === currentPassword) {
    return NextResponse.json({ error: 'New password must be different from current password' }, { status: 400 })
  }

  setPassword(newPassword)

  return NextResponse.json({ success: true })
}
