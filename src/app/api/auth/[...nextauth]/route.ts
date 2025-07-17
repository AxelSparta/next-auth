import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize (credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email
          }
        })
        if (user && (await bcrypt.compare(credentials?.password || '', user.password))) {
          return user
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/login'
  }
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
