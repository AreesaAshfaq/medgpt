'use client'
import React from 'react'
import { Reminder as IReminder } from './RemindersGroup'
import { format, parseISO } from 'date-fns'
import { Edit2Icon, Trash } from 'lucide-react'
import { toast } from 'sonner'
import { cookies } from 'next/headers'
import { createBrowserClient, createServerClient } from '@/utils/supabase'
import { MotionDiv, MotionButton } from '../Header'

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
    <MotionDiv className="relative block w-full overflow-hidden rounded-lg border border-gray-300 p-4 shadow-sm sm:p-6 lg:p-8">
      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

      <div className="sm:flex sm:justify-between sm:gap-4">
        <div>
          <h3 className="text-lg font-bold text-primary sm:text-xl">
            {reminder.title}
          </h3>

          <div className="flex gap-2 py-2">
            <MotionButton
              className="flex gap-2 rounded-full bg-primary px-4 py-2 text-primary-foreground transition duration-300 hover:border-primary hover:bg-accent hover:text-primary hover:shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Edit2Icon className="h-5 w-5" />
              Edit
            </MotionButton>
            <MotionButton
              className="flex gap-2 rounded-full bg-primary px-4 py-2 text-primary-foreground transition duration-300 hover:border-primary hover:bg-accent hover:text-primary hover:shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Trash className="h-5 w-5" />
              Delete
            </MotionButton>
          </div>
        </div>
      </div>

      <dl className="mt-6 flex gap-4 sm:gap-6">
        <div className="flex flex-col">
          <dd className="text-xs text-primary">{line1}</dd>
          <dt className="text-sm font-medium text-primary">{line2}</dt>
        </div>
      </dl>
    </MotionDiv>
  )
}

export default Reminder
