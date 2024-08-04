import useAuth from '@/hooks/useAuth'
import Link from 'next/link'

export default async function Index() {
  const { getUser } = useAuth()
  const user = await getUser()

  return (
    <section className="flex min-h-[90vh] flex-col items-center justify-center gap-12 px-2 py-6">
      LANDING
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
    </section>
  )
}
