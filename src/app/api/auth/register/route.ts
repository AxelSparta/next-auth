import prisma from '@/lib/prisma'
import { registerUserSchema } from '@/lib/schemas'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function POST (request: Request) {
  const body = await request.json()

  const parsedBody = registerUserSchema.safeParse(body)
  if (!parsedBody.success) {
    return NextResponse.json(
      {
        error: parsedBody.error.issues.map(issue => issue.message)
      },
      {
        status: 400
      }
    )
  }

  try {
    const userByUsername = await prisma.user.findUnique({
      where: {
        username: parsedBody.data.username
      }
    })
    if (userByUsername) {
      return NextResponse.json(
        {
          error: ['Username already exists']
        },
        {
          status: 400
        }
      )
    }

    const userByEmail = await prisma.user.findUnique({
      where: {
        email: parsedBody.data.email
      }
    })
    if (userByEmail) {
      return NextResponse.json(
        {
          error: ['Email already exists']
        },
        {
          status: 400
        }
      )
    }

    const hashedPassword = await bcrypt.hash(parsedBody.data.password, 10)
    await prisma.user.create({
      data: {
        first_name: parsedBody.data.first_name,
        last_name: parsedBody.data.last_name,
        username: parsedBody.data.username,
        email: parsedBody.data.email,
        password: hashedPassword
      }
    })
    return NextResponse.json(
      {
        message: 'User created successfully'
      },
      {
        status: 201
      }
    )
  } catch (error) {
    return NextResponse.json(
      {
        error: ['Something went wrong']
      },
      {
        status: 500
      }
    )
  }
}
