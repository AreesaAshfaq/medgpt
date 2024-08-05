'use client'
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const Intro: React.FC = () => {
  const controls = useAnimation();
  const brainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (brainRef.current) {
        const { clientX, clientY } = e;
        const moveX = clientX / window.innerWidth - 0.5;
        const moveY = clientY / window.innerHeight - 0.5;
        brainRef.current.style.transform = `translate(${moveX * 40}px, ${moveY * 40}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [controls]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
        >
          MEDGPT: AI-Powered Stroke Detection
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ delay: 0.2 }}
        >
          An advanced AI tool for detecting strokes and providing ongoing support using Falcon AI technology.
        </motion.p>
        <motion.button
          className="px-8 py-4 bg-teal-500 text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-teal-400 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ delay: 0.4 }}
        >
          Get Started with MEDGPT
        </motion.button>
      </div>
      <motion.div
        ref={brainRef}
        className="absolute w-96 h-96 bg-contain bg-no-repeat bg-center opacity-10"
        style={{ backgroundImage: "url('/brain-icon.svg')" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
      />
    </section>
  );
};

export default Intro;
