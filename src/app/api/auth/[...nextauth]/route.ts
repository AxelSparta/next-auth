import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { credentialsSchema } from '@/lib/schemas'

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'email@example.com'
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '********'
        }
      },
      async authorize (credentials) {
        console.log(credentials)
        const parsedBody = credentialsSchema.safeParse(credentials)
        if (!parsedBody.success) {
          throw new Error(
            parsedBody.error.issues.map(issue => issue.message).join(', ')
          )
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email
          }
        })
        if (
          user &&
          (await bcrypt.compare(credentials?.password || '', user.password))
        ) {
          return {
            id: user.id,
            email: user.email
          }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/auth/signin'
  }
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
