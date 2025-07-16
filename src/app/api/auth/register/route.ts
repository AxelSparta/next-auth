import prisma from '@/lib/prisma'
import { registerUserSchema } from '@/lib/schemas'
import { NextResponse } from 'next/server'

export async function POST (request: Request) {
  const body = await request.json()

  const parsedBody = registerUserSchema.safeParse(body)
  if (!parsedBody.success) {
    return NextResponse.json(
      {
        error: parsedBody.error.issues
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
          error: 'User already exists'
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
          error: 'User already exists'
        },
        {
          status: 400
        }
      )
    }
    const newUser = await prisma.user.create({
      data: {
        first_name: parsedBody.data.first_name,
        last_name: parsedBody.data.last_name,
        username: parsedBody.data.username,
        email: parsedBody.data.email,
        password: parsedBody.data.password
      }
    })
    console.log(newUser)
    return NextResponse.json(
      {
        message: 'User created successfully',
        user: newUser
      },
      {
        status: 201
      }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        error: 'Something went wrong'
      },
      {
        status: 500
      }
    )
  }
}

export async function GET () {
  return NextResponse.json({ message: 'Hello' })
}
