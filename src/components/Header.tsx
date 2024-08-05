'use client';
import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Home, Info, Settings, Phone, ArrowRight } from 'lucide-react';

const MotionDiv = dynamic(() => import('framer-motion').then((mod) => mod.motion.div), { ssr: false });
const MotionButton = dynamic(() => import('framer-motion').then((mod) => mod.motion.button), { ssr: false });

const Header: React.FC = () => {
  const navItems = [
    { name: 'Home', icon: <Home size={18} />, href: '/' },
    { name: 'About', icon: <Info size={18} />, href: '/about' },
    { name: 'Services', icon: <Settings size={18} />, href: '/services' },
    { name: 'Contact', icon: <Phone size={18} />, href: '/contact' },
  ];

  return (
    <header className="bg-background text-foreground py-4 px-6 fixed w-full z-50">
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
        <nav>
          <ul className="flex space-x-6">
            {navItems.map((item, index) => (
              <MotionDiv
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={item.href}>


                  <span className="hover:text-accent-foreground transition duration-300 flex items-center px-2 py-1 rounded relative group">
                    {item.icon}
                    <span className="ml-1">{item.name}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-foreground transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              </MotionDiv>
            ))}
          </ul>
        </nav>
        <MotionButton

          className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg shadow-lg hover:bg-accent hover:text-accent-foreground transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 flex items-center relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
          <ArrowRight className="ml-2" size={18} />
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-foreground transition-all duration-300 group-hover:w-full"></span>
        </MotionButton>
      </div>
    </header>
  );
};

export default Header;
