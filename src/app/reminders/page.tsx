import RemindersGroup from '@/components/reminders/RemindersGroup'
import useAuth from '@/hooks/useAuth'
import { createServerClient } from '@/utils/supabase'
import Head from 'next/head'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function Reminders() {
  const cookiesStore = cookies()
  const { getUser } = useAuth()
  const supabase = createServerClient(cookiesStore)
  const user = await getUser()
  const { data, error } = await supabase
    .from('reminders')
    .select('*')
    .filter('user_id', 'eq', user?.id)

  if (error) {
    console.error('Error fetching data:', error.message)
  } else {
    console.log(data)
    console.log(data.length)
  }

  return (
    <>
      <RemindersGroup reminders={data || []} />
      <Head>
        <title>Task</title>
      </Head>
    </>
  )
}
