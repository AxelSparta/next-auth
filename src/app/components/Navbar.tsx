import Link from 'next/link'
import ThemeSwitch from './ThemeSwitch'

export function Navbar () {
  return (
    <nav>
      <ul className='flex gap-4'>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/about'>About</Link>
        </li>
        <li>
          <ThemeSwitch />
        </li>
      </ul>
    </nav>
  )
}
