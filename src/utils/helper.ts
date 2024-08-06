import { format, parseISO } from 'date-fns'

export type Frequency = 'daily' | 'weekly' | 'monthly' | 'once' | 'yearly'

export const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout | null = null

  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

export const formatReminder = (reminder: {
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
