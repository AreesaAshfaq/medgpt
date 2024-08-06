import { z } from 'zod'

export const frequencyOptions = [
  { label: 'Once', value: 'once' },
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' },
]

export const createReminderSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  datetime: z.string().min(1, { message: 'Date and time is required' }),
  frequency: z.string().min(1, { message: 'Frequency is required' }),
})

export const editReminderSchema = createReminderSchema
