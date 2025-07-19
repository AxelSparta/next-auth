'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { SunIcon } from '@/components/icons/SunIcon'
import { MoonIcon } from '@/components/icons/MoonIcon'

export default function ThemeSwitch () {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    console.log('click')
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  if (!mounted) {
    return (
      <div
        className='w-9 h-9 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700'
        title='Loading Theme Toggle'
        aria-label='Loading theme toggle'
      />
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={handleClick}
      aria-label={`Activate ${isDark ? 'light' : 'dark'} mode`}
      title={`Activate ${isDark ? 'light' : 'dark'} mode`}
      className='w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-800'
    >
      {isDark ? (
        <SunIcon className='w-5 h-5 text-yellow-500' />
      ) : (
        <MoonIcon className='w-5 h-5 text-gray-800 dark:text-white' />
      )}
    </button>
  )
}
