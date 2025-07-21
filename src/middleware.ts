export { default } from 'next-auth/middleware'

// rutas protegidas
export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/:path*'
  ]
}