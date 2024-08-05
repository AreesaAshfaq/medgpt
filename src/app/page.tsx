import Header from '@/components/Header'
import Intro from '@/components/landingPage/Intro'
import useAuth from '@/hooks/useAuth'
import Link from 'next/link'

export default async function Index() {
  const { getUser } = useAuth()
  const user = await getUser()

  return (
    <section className="  ">
      <Header/>
      <div>
      {/*LANDING*/}
      <Intro/>
      {!user ? (
        <Link
        href="/login"
        className="rounded-md bg-secondary px-4 py-2 no-underline hover:bg-secondary-foreground hover:text-secondary"
        >
          Log In
        </Link>
      ) : (
        <></>
      )}
      </div>
    </section>
  )
}
