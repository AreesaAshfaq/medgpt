import AdvanceFeatureSection from '@/components/landingPage/AdvanceFeatureSection'
import Features from '@/components/landingPage/Features'
import HeroSection from '@/components/landingPage/HeroSection'
import Footer from '@/components/landingPage/Footer'
import Header from '@/components/Header'
import useAuth from '@/hooks/useAuth'

export default async function Index() {
  const { getUser } = useAuth()

  const user = await getUser()

  return (
    <section className="bg-background ">
      {user ? <></> : <Header />}
      <HeroSection id="home" />
      <Features id="features" />
      <AdvanceFeatureSection id="ai-imaging" />
      <Footer />
    </section>
  )
}
