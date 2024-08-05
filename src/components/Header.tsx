'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Home, Info, Settings, Phone, Menu, X, Moon, Sun, Brain } from 'lucide-react';

const MotionDiv = dynamic(() => import('framer-motion').then((mod) => mod.motion.div), { ssr: false });
const MotionButton = dynamic(() => import('framer-motion').then((mod) => mod.motion.button), { ssr: false });

const Header: React.FC = ({user}: any) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState('light');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Home', icon: <Home size={18} />, href: '#home' },
    { name: 'Features', icon: <Settings size={18} />, href: '#features' },
    { name: 'AI-Imaging', icon: <Brain size={18} />, href: '#ai-imaging' },
    //{ name: 'Contact', icon: <Phone size={18} />, href: '/contact' },
  ];

  return (
    <header className={`bg-gradient-to-b from-primary/20  to-primary/5 backdrop-blur-md text-foreground dark:text-gray-200 py-4 px-6 w-full z-50 transition-all duration-300 ${isScrolled ? 'fixed top-0 shadow-md' : ''} shadow-lg`}>
      <div className="container mx-auto flex justify-between items-center">
        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/">
            <span className="text-3xl font-bold text-primary hover:text-accent-foreground transition duration-300 flex items-center">
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
                  <span className="dark:hover:text-accent-foreground transition duration-300 flex items-center px-2 py-1 rounded relative group">
                    {item.icon}
                    <span className="ml-1 font-bold">{item.name}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-foreground dark:bg-accent-foreground transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              </MotionDiv>
            ))}
          </ul>
        </nav>
        <div className="flex items-center">
          <MotionButton
            onClick={toggleTheme}
            className="mr-4 p-2 bg-primary rounded-full text-primary-foreground hover:text-primary hover:border-primary hover:shadow-lg transition duration-300 hover:bg-accent"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </MotionButton>
          <MotionButton
            className="hidden md:flex px-4 py-2 bg-primary text-primary-foreground font-bold text-lg rounded-full shadow-lg hover:bg-accent hover:text-accent-foreground transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 items-center relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {!user ? 'Sign Up' : 'Sign In'}
          </MotionButton>
          <MotionButton
            onClick={toggleMenu}
            className="md:hidden p-2 bg-primary rounded-full text-primary-foreground hover:text-primary hover:border-primary hover:shadow-lg transition duration-300 hover:bg-accent"
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
          className="md:hidden mt-4"
        >
          <ul className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href}>
                  <span className="dark:hover:text-accent-foreground transition duration-300 flex items-center px-2 py-1 rounded relative group">
                    {item.icon}
                    <span className="ml-1 font-bold">{item.name}</span>
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <MotionButton
                className="w-full px-4 py-2 bg-primary text-primary-foreground font-bold text-lg rounded-full shadow-lg hover:bg-accent hover:text-accent-foreground transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {!user ? 'Sign Up' : 'Sign In'}
              </MotionButton>
            </li>
          </ul>
        </MotionDiv>
      )}
    </header>
  );
};

export default Header;
