import Link from 'next/link'
import { headers, cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerClient } from '@/utils/supabase'

export default function Login({
  searchParams,
}: {
  searchParams: {
    message?: string
    code?: string
  }
}) {
  const signIn = async (formData: FormData) => {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/detect-stroke/image')
  }

  const signUp = async (formData: FormData) => {
    'use server'

    const origin = headers().get('origin')
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/login?message=Check email to continue sign in process')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <Link
        href="/"
        className="absolute flex items-center px-4 py-2 text-sm transition-all rounded-full shadow-md left-8 top-8 bg-primary text-primary-foreground "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{' '}
        Back
      </Link>

      <div className="w-full max-w-md p-8 rounded-lg shadow-2xl bg-primary">
        <h2 className="mb-6 text-3xl font-bold text-center text-primary-foreground">
          Welcome
        </h2>
        <form className="space-y-6" action={signIn}>
          <div>
            <label
              className="block text-sm font-medium text-primary-foreground"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm bg-primary text-primary-foreground focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-primary-foreground"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm bg-primary text-primary-foreground focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
          </div>
          <div>
            <button className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Sign In
            </button>
          </div>
          <div>
            <button
              formAction={signUp}
              className="w-full px-4 py-2 text-indigo-600 bg-gray-200 border border-transparent rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Sign Up
            </button>
          </div>
        </form>

        {searchParams?.code && (
          <p className="p-4 mt-4 text-sm text-center rounded-md bg-emerald-100 text-emerald-700">
            We have verified your email. Please sign in.
          </p>
        )}
        {searchParams?.message && (
          <p className="p-4 mt-4 text-sm text-center text-red-700 bg-red-100 rounded-md">
            {searchParams.message}
          </p>
        )}
      </div>
    </div>
  )
}
