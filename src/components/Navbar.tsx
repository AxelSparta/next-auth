'use client'
import Link from 'next/link'
import ThemeSwitch from '@/components/ThemeSwitch'
import { useSession, signOut } from 'next-auth/react'

export function Navbar () {
  const { data: session } = useSession()
  return (
    <nav className='container mx-auto flex justify-between py-5'>
      <Link href='/'>
        <h1>NextAuth App</h1>
      </Link>
      <ul className='flex gap-5 items-center'>
        {session ? (
          <>
            <li>
              <Link href='/dashboard'>Dashboard</Link>
            </li>
            <li>
              <button className='cursor-pointer' onClick={() => signOut()}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href='/auth/login'>Login</Link>
            </li>
            <li>
              <Link href='/auth/register'>Register</Link>
            </li>
          </>
        )}
        <li>
          <ThemeSwitch />
        </li>
      </ul>
    </nav>
  )
}
