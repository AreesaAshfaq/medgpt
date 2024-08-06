
import { createServerClient } from '@/utils/supabase'
import { cookies } from 'next/headers'

const useAuth = () => {
  const getUser = async () => {
    'use server'

    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    return user
  }

  const signOut = async () => {
    'use server'
    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)
    await supabase.auth.signOut()
  }

  return {
    getUser,
    signOut,
  }
}

export default useAuth
