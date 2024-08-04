'use client'
import React from 'react'
import {
  GlowingStarsBackgroundCard,
  GlowingStarsTitle,
  GlowingStarsDescription,
} from '../ui/glowing-stars'
import { Reminder as IReminder } from './RemindersGroup'
import { format, parseISO } from 'date-fns'
import { Trash } from 'lucide-react'
import { toast } from 'sonner'
import { cookies } from 'next/headers'
import { createBrowserClient, createServerClient } from '@/utils/supabase'

type Props = {
  reminder: IReminder
  afterDelete: () => void
}

type Frequency = 'daily' | 'weekly' | 'monthly' | 'once' | 'yearly'

const formatReminder = (reminder: {
  datetime: string
  frequency: Frequency
}): [string, string] => {
  const { datetime, frequency } = reminder
  const parsedDate = parseISO(datetime)
  // const formattedDatetime = format(parsedDate, 'MMMM d, yyyy [at] h:mm a')
  const formattedDate = format(parsedDate, 'MMMM d, yyyy')
  const formattedTime = format(parsedDate, 'h:mm a')
  const formattedDatetime = `${formattedDate} at ${formattedTime}`
  const formattedFrequency =
    frequency.charAt(0).toUpperCase() + frequency.slice(1)

  let line1: string
  let line2: string

  switch (frequency) {
    case 'daily':
      line1 = formattedTime
      line2 = `Every day (${formattedFrequency})`
      break
    case 'weekly':
      line1 = `${formattedDatetime}`
      line2 = `Every week (${formattedFrequency})`
      break
    case 'monthly':
      line1 = `${formattedDatetime}`
      line2 = `Every month (${formattedFrequency})`
      break
    case 'yearly':
      line1 = `${formattedDatetime}`
      line2 = `Every year (${formattedFrequency})`
      break
    case 'once':
      line1 = `${formattedDatetime}`
      line2 = `One-time (${formattedFrequency})`
      break
    default:
      line1 = 'Invalid frequency'
      line2 = ''
      break
  }

  return [line1, line2]
}

const Reminder = ({ reminder, afterDelete }: Props) => {
  const [line1, line2] = formatReminder({
    datetime: reminder.datetime,
    frequency: reminder.frequency,
  })

  const deleteReminder = async () => {
    const supabase = createBrowserClient()
    const { error } = await supabase
      .from('reminders')
      .delete()
      .eq('id', reminder.id)
    if (error) {
      toast.error('Error deleting reminder')
      return
    }
    toast.success('Reminder deleted successfully')
    afterDelete()
  }

  return (
    <>
      <div className="flex items-center justify-center py-20 antialiased md:w-96">
        <GlowingStarsBackgroundCard>
          <GlowingStarsTitle>{reminder.title}</GlowingStarsTitle>
          <div className="flex items-end justify-between">
            <GlowingStarsDescription>
              {line1}
              <br />
              {line2}
            </GlowingStarsDescription>{' '}
            <button
              onClick={deleteReminder}
              className="ml-12 flex h-10 w-10 items-center justify-center rounded-full bg-destructive"
            >
              <Trash />
            </button>
          </div>
        </GlowingStarsBackgroundCard>
      </div>
    </>
  )
}

export default Reminder
