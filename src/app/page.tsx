import Header from '@/components/Header'
import AdvanceFeatureSection from '@/components/landingPage/AdvanceFeatureSection'
import Features from '@/components/landingPage/Features'
import HeroSection from '@/components/landingPage/HeroSection'
import Footer from '@/components/landingPage/Footer'
//import useAuth from '@/hooks/useAuth'
import Link from 'next/link'

export default function Index() {
  return (
    <section className="bg-background  ">
      <Header />
      <div>
      {/*LANDING*/}
      <HeroSection id='home'/>
      <Features id='features' />
      <AdvanceFeatureSection id='ai-imaging'/>
      <Footer/>
      {/*{!user ? (
        <Link
        href="/login"
        className="rounded-md bg-secondary px-4 py-2 no-underline hover:bg-secondary-foreground hover:text-secondary"
        >
          Log In
        </Link>
      ) : (
        <></>
      )}*/}
      </div>
    </section>
  )
}
