'use client'

import { motion } from 'framer-motion'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const HeroSection = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Image
        src="/brain-illustration-1-svgrepo-com.svg"
        alt="Brain Icon"
        layout="fill"
        objectFit="cover"

        className="opacity-5"
      />

      <section className="container mx-auto py-20 text-center relative z-10">
        <motion.h1

          className="text-6xl font-bold mb-6 text-primary"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Revolutionize Your Health with MedGPT
        </motion.h1>
        <motion.p

          className="text-2xl mb-10 max-w-3xl mx-auto text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Harness the power of AI for stroke detection and ongoing health support. Your personal health companion, powered by advanced Falcon AI technology.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link href="/get-started" passHref>
            <motion.button

              className="px-10 py-4 bg-accent text-accent-foreground rounded-full text-xl font-bold hover:bg-primary hover:text-primary-foreground transition duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Health Journey <ArrowRight className="inline-block ml-2" />
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}

export default HeroSection
