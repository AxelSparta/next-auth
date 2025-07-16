import z from 'zod'

export const registerUserSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(50, 'Username must be at most 50 characters long'),
  email: z.email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  first_name: z.string().min(3, 'First name must be at least 3 characters long'),
  last_name: z.string().min(3, 'Last name must be at least 3 characters long')
})

export type RegisterUserSchema = z.infer<typeof registerUserSchema>
