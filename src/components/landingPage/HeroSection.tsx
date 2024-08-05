'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const HeroSection = ({id}: {id: string}) => {
  const { resolvedTheme } = useTheme()
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    setImageUrl(resolvedTheme === 'dark'
      ? "https://media.licdn.com/dms/image/D4E12AQGEPkq_E5TA3Q/article-cover_image-shrink_720_1280/0/1686125376692?e=1728518400&v=beta&t=D_iWFRBSKpwQwg8FjkdkYk3o6W7RmK1db7Fym2wZA0A"
      : "https://launchbase.uk/wp-content/uploads/2019/09/artificial-intelligence-in-medicine-ai-in-medicine.jpg")
  }, [resolvedTheme])

  return (
    <div id={id} className="min-h-screen bg-background text-foreground relative">
      <Image
        src="/brain-illustration-1-svgrepo-com.svg"
        alt="Brain Icon"
        fill
        className="opacity-5 object-cover"
      />

      <div className="container mx-auto py-20 relative z-10 flex flex-col lg:flex-row items-center">
        <HeroContent />
        <HeroImage imageUrl={imageUrl} />
      </div>
      <MobileHeroImage imageUrl={imageUrl} />
    </div>
  )
}

const HeroContent = () => (
  <section className="lg:w-1/2 text-left lg:pr-10 ">
    <motion.h1
      className="text-4xl lg:text-6xl font-bold mb-6 text-primary"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Revolutionize Your Health with MedGPT
    </motion.h1>
    <motion.p
      className="text-xl lg:text-2xl mb-10 text-foreground"
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
          className="px-8 py-3 md:text-md lg:px-10 lg:py-4 hover:bg-accent hover:text-accent-foreground rounded-full text-md lg:text-xl font-bold bg-primary text-primary-foreground transition duration-300 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Your Health Journey <ArrowRight className="inline-block ml-2" />
        </motion.button>
      </Link>
    </motion.div>
  </section>
)

const HeroImage = ({ imageUrl }: { imageUrl: string }) => (
  <div className="lg:w-1/2 mt-10 lg:mt-0 hidden sm:block">
    {imageUrl && (
      <Image
        src={imageUrl}
        alt="MedGPT Hero Image"
        width={900}
        height={900}
        className="rounded-lg shadow-xl "
      />
    )}
  </div>
)

const MobileHeroImage = ({ imageUrl }: { imageUrl: string }) => (
  <div className="absolute inset-0 z-0 sm:hidden">
    {imageUrl && (
      <Image
        src={imageUrl}
        alt="MedGPT Hero Image"
        layout="fill"
        objectFit="cover"
        className=" bg-opacity-0 blur-md"
      />
    )}
  </div>
)
export default HeroSection
