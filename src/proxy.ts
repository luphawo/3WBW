import { NextResponse } from 'next/server'

export function proxy(request: Request) {
  const { pathname } = new URL(request.url)

  const isAdminRoute = pathname.startsWith('/admin')
  const isLoginPage = pathname === '/admin/login'
  const isStaticAsset = pathname.startsWith('/_next/') || pathname.startsWith('/favicon')

  if (!isAdminRoute || isLoginPage || isStaticAsset) {
    return
  }

  const cookie = request.headers.get('cookie') || ''
  if (!cookie.includes('admin_session=true')) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
}
