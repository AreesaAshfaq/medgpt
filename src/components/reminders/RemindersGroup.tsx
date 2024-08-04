'use client'
import React, { useEffect } from 'react'
import CreateReminder from './CreateReminder'
import Reminder from './Reminder'
import { cookies } from 'next/headers'
import { createBrowserClient, createServerClient } from '@/utils/supabase'
import useAuth from '@/hooks/useAuth'

export type Reminder = {
  id: string
  title: string
  created_at: string
  datetime: string
  frequency: 'once' | 'daily' | 'weekly' | 'monthly' | 'yearly'
  user_id: string
}

type Props = {}

const RemindersGroup = (props: Props) => {
  const [reminders, setReminders] = React.useState<Reminder[]>([])

  const fetchReminders = async () => {
    const supabase = createBrowserClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    const { data, error } = await supabase
      .from('reminders')
      .select('*')
      .filter('user_id', 'eq', user?.id)

    if (error) {
      console.error('Error fetching data:', error.message)
      setReminders([])
    } else {
      setReminders(() => data as Reminder[])
    }
  }

  useEffect(() => {
    fetchReminders()
  }, [])

  return (
    <>
      <div className="container mx-auto mt-8 ">
        <div className="mb-4 flex items-center justify-between border-b border-dashed border-gray-900 pb-4">
          <h1 className="text-3xl font-semibold">Reminders</h1>
          <CreateReminder afterCreate={fetchReminders} />
        </div>

        <div className="flex flex-wrap gap-12">
          {reminders.map((reminder) => (
            <Reminder
              key={reminder.id}
              reminder={reminder}
              afterDelete={fetchReminders}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default RemindersGroup
