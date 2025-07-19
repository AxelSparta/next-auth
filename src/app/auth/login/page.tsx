'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { showToast } from 'nextjs-toast-notify'
import { useRouter } from 'next/navigation'

const loginFormSchema = z.object({
  email: z.email(),
  password: z.string().min(6)
})

export default function Login () {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  function onSubmit (values: z.infer<typeof loginFormSchema>) {
    setLoading(true)
    setError(null)
    signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    })
      .then(response => {
        console.log(response)
        if (response?.error) {
          setError(response.error)
        } else {
          showToast.success('Login successful', {
            duration: 3000,
            progress: false,
            position: "bottom-center",
            transition: "popUp",
            icon: '',
            sound: false,
          });
          router.push('/dashboard')
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className='p-4 max-w-md mx-auto'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='email@example.com' {...field} type='email' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='********' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className='bg-transparent text-slate-900 border-slate-900 rounded-md border hover:bg-slate-900 hover:text-slate-50 dark:text-slate-50 dark:border-slate-50 dark:hover:bg-slate-50 dark:hover:text-slate-900'
            disabled={loading}
            type='submit'
          >
            {loading ? 'Loading...' : 'Login'}
          </Button>
          {error && <p className='text-red-500 text-sm'>{error}</p>}
        </form>
      </Form>
    </div>
  )
}
