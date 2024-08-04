'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  closeModal,
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
  useModal,
} from '@/components/ui/animated-modal'
import { Clock } from 'lucide-react'
import { createBrowserClient } from '@/utils/supabase'
import { toast } from 'sonner'

// Define the schema using zod
const reminderSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  datetime: z.string().min(1, { message: 'Date and time is required' }),
  frequency: z.string().min(1, { message: 'Frequency is required' }),
})

const frequencyOptions = [
  { label: 'Once', value: 'once' },
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' },
]

type ReminderFormValues = z.infer<typeof reminderSchema>

type Props = {
  afterCreate: () => void
}

const CreateReminder = ({ afterCreate }: Props) => {
  const form = useForm<ReminderFormValues>({
    resolver: zodResolver(reminderSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      datetime: '',
      frequency: frequencyOptions[0].value,
    },
  })

  const { handleSubmit, register, formState } = form

  const onSubmit = async (values: ReminderFormValues) => {
    const supabase = createBrowserClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { error } = await supabase
      .from('reminders')
      .insert({
        title: values.title,
        datetime: values.datetime,
        frequency: values.frequency,
        user_id: user?.id,
      })
      .select()
      .single()
    if (error) {
      toast.error('Error creating reminder')
      return
    }
    toast.success('Reminder created successfully')

    afterCreate()
    closeModal()
  }

  return (
    <>
      <Modal>
        <ModalTrigger className="group/modal-btn flex justify-center bg-primary text-primary">
          <span className="text-center text-primary-foreground transition duration-500 group-hover/modal-btn:translate-x-40">
            Create Reminder
          </span>
          <div className="absolute inset-0 z-20 flex -translate-x-40 items-center justify-center text-primary-foreground transition duration-500 group-hover/modal-btn:translate-x-0">
            <Clock className="h-6 w-6" />
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className="mb-8 text-center text-lg font-bold text-neutral-600 dark:text-neutral-100 md:text-2xl">
              Create a{' '}
              <span className="rounded-md border border-gray-200 bg-gray-100 px-1 py-0.5 dark:border-neutral-700 dark:bg-neutral-800">
                Reminder
              </span>
            </h4>
            <div className="mx-auto flex max-w-sm flex-wrap items-start justify-start gap-x-4 gap-y-6 py-10">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full space-y-4"
              >
                <div className="space-y-2">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-primary"
                  >
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    {...register('title')}
                    className="block w-full rounded-md border-gray-300 bg-transparent p-2 text-primary shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                  />
                  {formState.errors.title && (
                    <p className="text-sm text-red-500">
                      {formState.errors.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="datetime"
                    className="block text-sm font-medium text-primary"
                  >
                    Date and Time
                  </label>
                  <input
                    id="datetime"
                    type="datetime-local"
                    {...register('datetime')}
                    className="block w-full rounded-md border-gray-300 bg-transparent text-primary shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                  />
                  {formState.errors.datetime && (
                    <p className="text-sm text-red-500">
                      {formState.errors.datetime.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="frequency"
                    className="block text-sm font-medium text-primary"
                  >
                    Frequency
                  </label>

                  <select
                    id="frequency"
                    {...register('frequency')}
                    defaultValue={frequencyOptions[0].value}
                    className="mt-1.5 w-full rounded-lg border-gray-300 bg-transparent text-primary sm:text-lg"
                  >
                    {frequencyOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-primary-foreground text-primary"
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>

                  {formState.errors.frequency && (
                    <p className="text-sm text-red-500">
                      {formState.errors.frequency.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full rounded-md border border-black bg-black px-4 py-2 text-sm text-white dark:bg-white dark:text-black"
                  disabled={formState.isSubmitting}
                >
                  Create Reminder
                </button>
              </form>
            </div>
          </ModalContent>
        </ModalBody>
      </Modal>
    </>
  )
}

export default CreateReminder
