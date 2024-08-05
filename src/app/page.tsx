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
      {/*<div>*/}
      <Header />
      {/*LANDING*/}
      <HeroSection id='home'/>
      <Features id='features' />
      <AdvanceFeatureSection id='ai-imaging'/>
      <Footer/>
      {/*</div>*/}
    </section>
  )
}
