'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { registerUserSchema } from '@/lib/schemas'
import { useState } from 'react'
import { showToast } from 'nextjs-toast-notify'
import { useRouter } from 'next/navigation'

export const formSchema = registerUserSchema

export default function Register () {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    }
  })

  const [error, setError] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  function onSubmit (values: z.infer<typeof formSchema>) {
    setLoading(true)
    setError([])
    fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        if (data.error) {
          setError(data.error)
        } else {
          showToast.success(data.message, {
            duration: 3000,
            progress: false,
            position: "bottom-center",
            transition: "popUp",
            icon: '',
            sound: false,
          });
          router.push('/auth/login')
        }
      })
      .catch((error: Error) => {
        setError([error.message])
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
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Enter your username...'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='first_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Enter your first name...'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='last_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Enter your last name...'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='Enter your email...'
                    {...field}
                  />
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
                  <Input
                    type='password'
                    placeholder='Enter your password...'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='bg-transparent text-slate-900 border-slate-900 rounded-md border hover:bg-slate-900 hover:text-slate-50 dark:text-slate-50 dark:border-slate-50 dark:hover:bg-slate-50 dark:hover:text-slate-900' disabled={loading} type='submit'>
            {loading ? 'Loading...' : 'Register'}
          </Button>
          {error.length > 0 && (
            <p className='text-red-500 text-sm'>
              {error.join(', ')}
            </p>
          )}
        </form>
      </Form>
    </div>
  )
}
