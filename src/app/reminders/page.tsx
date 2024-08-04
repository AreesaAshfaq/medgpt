import RemindersGroup from '@/components/reminders/RemindersGroup'

import Head from 'next/head'

export default async function Reminders() {
  return (
    <>
      <RemindersGroup />
      <Head>
        <title>Task</title>
      </Head>
    </>
  )
}
