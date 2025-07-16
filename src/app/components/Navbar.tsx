import Link from 'next/link'
import ThemeSwitch from '@/app/components/ThemeSwitch'

export function Navbar () {
  return (
    <nav className='container mx-auto flex justify-between py-5'>
      <Link href='/'>
        <h1>NextAuth App</h1>
      </Link>
      <ul className='flex gap-5 items-center'>
        <li>
          <Link href='/auth/login'>Login</Link>
        </li>
        <li>
          <Link href='/auth/register'>Register</Link>
        </li>
        <li>
          <ThemeSwitch />
        </li>
      </ul>
    </nav>
  )
}
