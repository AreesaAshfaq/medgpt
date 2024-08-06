'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Home, Settings, Menu, X, Moon, Sun, Brain } from 'lucide-react'
import { useTheme } from 'next-themes'
import { createBrowserClient } from '@/utils/supabase'
import { debounce } from '@/utils/helper'

export const MotionDiv = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.div),
  { ssr: false },
)
export const MotionButton = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.button),
  { ssr: false },
)

export const AuthHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState(null)
  const { theme, setTheme } = useTheme()
  const [logoutLoading, setLogoutLoading] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleMouseEnter = (index: any) => {
    setActiveSubmenu(index)
  }

  const closeSubMenu = (clicked = false) => {
    if (clicked) return setActiveSubmenu(null)

    const submenu = document.getElementById('submenu')

    if (!submenu?.contains(document.activeElement)) {
      setActiveSubmenu(null)
    }
  }

  const handleMouseLeave = () => {
    debounce(closeSubMenu, 200)
  }

  const navItems = [
    {
      name: 'Stroke Detection by Image',
      href: '/detect-stroke/image',
    },
    {
      name: 'Chat Bots',
      href: '/ai/diagnosis',
      submenu: [
        {
          name: 'Stroke Detection',
          href: '/ai/diagnosis',
        },
        {
          name: 'Caregiver',
          href: '/ai/caregiver',
        },
        {
          name: 'Rehabilitation',
          href: '/ai/rehabilitation',
        },
      ],
    },
    {
      name: 'Reminders',
      href: '/reminders',
    },
  ]

  const handleLogout = async () => {
    setLogoutLoading(true)
    const supabase = createBrowserClient()
    await supabase.auth.signOut()

    setLogoutLoading(false)
    window.location.href = '/login'
  }

  return (
    <header
      className={`z-50 w-full bg-gradient-to-b from-primary/20 to-primary/5 px-6 py-4 text-foreground backdrop-blur-md transition-all duration-300 dark:text-gray-200 ${
        isScrolled ? 'fixed top-0 shadow-md' : ''
      } toggle shadow-lg`}
    >
      <div className="container flex items-center justify-between mx-auto">
        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/">
            <span className="flex items-center text-3xl font-bold transition duration-300 text-primary hover:text-accent-foreground">
              MedGPT
            </span>
          </Link>
        </MotionDiv>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            {navItems.map((item, index) => (
              <li
                key={item.name}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                className="relative"
              >
                <Link href={item.href}>
                  <span className="relative flex items-center px-2 py-1 transition duration-300 rounded group dark:hover:text-accent-foreground">
                    <span className="ml-1 font-bold">{item.name}</span>
                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent-foreground transition-all duration-300 group-hover:w-full dark:bg-accent-foreground"></span>
                  </span>
                </Link>
                {item.submenu && activeSubmenu === index && (
                  <ul
                    id="submenu"
                    className="absolute left-0 z-10 w-48 p-2 mt-2 transition-all duration-300 bg-white border rounded shadow-lg dark:bg-gray-800"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => closeSubMenu(false)}
                  >
                    {item.submenu.map((subItem) => (
                      <li key={subItem.name} onClick={() => closeSubMenu(true)}>
                        <Link href={subItem.href}>
                          <span className="block px-4 py-2 transition-all duration-300 rounded text-md hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-accent-foreground">
                            {subItem.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center">
          <MotionButton
            onClick={toggleTheme}
            className="p-2 mr-4 transition duration-300 rounded-full bg-primary text-primary-foreground hover:border-primary hover:bg-accent hover:text-primary hover:shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </MotionButton>
          <MotionButton
            className="relative items-center hidden px-4 py-2 text-lg font-bold transition duration-300 ease-in-out transform rounded-full shadow-lg group bg-primary text-primary-foreground hover:-translate-y-1 hover:scale-105 hover:bg-accent hover:text-accent-foreground md:flex"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            disabled={logoutLoading}
          >
            Sign Out
          </MotionButton>
          <MotionButton
            onClick={toggleMenu}
            className="p-2 transition duration-300 rounded-full bg-primary text-primary-foreground hover:border-primary hover:bg-accent hover:text-primary hover:shadow-lg md:hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </MotionButton>
        </div>
      </div>
      {isMenuOpen && (
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="mt-4 md:hidden"
        >
          <ul className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href}>
                  <span className="relative flex items-center px-2 py-1 transition duration-300 rounded group dark:hover:text-accent-foreground">
                    <span className="ml-1 font-bold">{item.name}</span>
                  </span>
                </Link>
                {item.submenu && (
                  <ul className="pl-4 mt-2 space-y-2">
                    {item.submenu.map((subItem) => (
                      <li key={subItem.name}>
                        <Link href={subItem.href}>
                          <span className="block px-4 py-2 text-sm transition duration-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-accent-foreground">
                            {subItem.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li>
              <Link href="/login" passHref>
                <MotionButton
                  className="relative flex items-center justify-center w-full px-4 py-2 text-lg font-bold transition duration-300 ease-in-out transform rounded-full shadow-lg group bg-primary text-primary-foreground hover:-translate-y-1 hover:scale-105 hover:bg-accent hover:text-accent-foreground"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign Out
                </MotionButton>
              </Link>
            </li>
          </ul>
        </MotionDiv>
      )}
    </header>
  )
}

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { name: 'Home', icon: <Home size={18} />, href: '#home' },
    { name: 'Features', icon: <Settings size={18} />, href: '#features' },
    { name: 'AI-Imaging', icon: <Brain size={18} />, href: '#ai-imaging' },
  ]

  return (
    <header
      className={`z-50 w-full bg-gradient-to-b from-primary/20 to-primary/5 px-6 py-4 text-foreground backdrop-blur-md transition-all duration-300 dark:text-gray-200 ${
        isScrolled ? 'fixed top-0 shadow-md' : ''
      } toggle shadow-lg`}
    >
      <div className="container flex items-center justify-between mx-auto">
        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/">
            <span className="flex items-center text-3xl font-bold transition duration-300 text-primary hover:text-accent-foreground">
              MedGPT
            </span>
          </Link>
        </MotionDiv>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            {navItems.map((item, index) => (
              <MotionDiv
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={item.href}>
                  <span className="relative flex items-center px-2 py-1 transition duration-300 rounded group dark:hover:text-accent-foreground">
                    {item.icon}
                    <span className="ml-1 font-bold">{item.name}</span>
                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent-foreground transition-all duration-300 group-hover:w-full dark:bg-accent-foreground"></span>
                  </span>
                </Link>
              </MotionDiv>
            ))}
          </ul>
        </nav>
        <div className="flex items-center">
          <MotionButton
            onClick={toggleTheme}
            className="p-2 mr-4 transition duration-300 rounded-full bg-primary text-primary-foreground hover:border-primary hover:bg-accent hover:text-primary hover:shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </MotionButton>
          <Link href="/login">
            <MotionButton
              className="relative items-center hidden px-4 py-2 text-lg font-bold transition duration-300 ease-in-out transform rounded-full shadow-lg group bg-primary text-primary-foreground hover:-translate-y-1 hover:scale-105 hover:bg-accent hover:text-accent-foreground md:flex"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </MotionButton>
          </Link>
          <MotionButton
            onClick={toggleMenu}
            className="p-2 transition duration-300 rounded-full bg-primary text-primary-foreground hover:border-primary hover:bg-accent hover:text-primary hover:shadow-lg md:hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </MotionButton>
        </div>
      </div>
      {isMenuOpen && (
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="mt-4 md:hidden"
        >
          <ul className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href}>
                  <span className="relative flex items-center px-2 py-1 transition duration-300 rounded group dark:hover:text-accent-foreground">
                    {item.icon}
                    <span className="ml-1 font-bold">{item.name}</span>
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/login" passHref>
                <MotionButton
                  className="relative flex items-center justify-center w-full px-4 py-2 text-lg font-bold transition duration-300 ease-in-out transform rounded-full shadow-lg group bg-primary text-primary-foreground hover:-translate-y-1 hover:scale-105 hover:bg-accent hover:text-accent-foreground"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
                </MotionButton>
              </Link>
            </li>
          </ul>
        </MotionDiv>
      )}
    </header>
  )
}

export default Header
