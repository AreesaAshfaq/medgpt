'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  closeModal,
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from '@/components/ui/animated-modal'
import { Edit2Icon } from 'lucide-react'
import { createBrowserClient } from '@/utils/supabase'
import { toast } from 'sonner'
import { Reminder } from './RemindersGroup'
import { MotionButton } from '../Header'
import LoadingCircle from '@/components/ui/loading'
import { editReminderSchema, frequencyOptions } from '@/utils/constants'

type ReminderFormValues = z.infer<typeof editReminderSchema>

type Props = {
  afterEdit: () => void
  reminder: Reminder
}

const EditReminder = ({ afterEdit, reminder }: Props) => {
  const [isUpdating, setIsUpdating] = useState(false)

  const form = useForm<ReminderFormValues>({
    resolver: zodResolver(editReminderSchema),
    mode: 'onBlur',
    defaultValues: {
      title: reminder.title,
      datetime: reminder.datetime,
      frequency: reminder.frequency,
    },
  })

  const { handleSubmit, register, formState } = form

  const onSubmit = async (values: ReminderFormValues) => {
    setIsUpdating(true)
    const supabase = createBrowserClient()

    const { error } = await supabase
      .from('reminders')
      .update({
        title: values.title,
        datetime: values.datetime,
        frequency: values.frequency,
      })
      .eq('id', reminder.id)
      .select()
      .single()

    if (error) return toast.error('Error updating reminder')
    toast.success('Reminder updated successfully')

    await afterEdit()
    setIsUpdating(false)
    closeModal()
  }

  return (
    <>
      <Modal>
        <ModalTrigger>
          <MotionButton
            className="flex gap-2 rounded-full bg-primary px-4 py-2 text-primary-foreground transition duration-300 hover:border-primary hover:bg-accent hover:text-primary hover:shadow-lg"
            whileTap={{ scale: 0.9 }}
          >
            <Edit2Icon className="h-5 w-5" />
            Edit
          </MotionButton>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            {isUpdating ? (
              <div className="flex h-[50vh] w-full scale-150 items-center justify-center">
                <LoadingCircle />
              </div>
            ) : (
              <>
                <h4 className="mb-8 text-center text-lg font-bold text-neutral-600 dark:text-neutral-100 md:text-2xl">
                  Update{' '}
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
                        defaultValue={'2024-08-06T12:00'}
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
                      Update Reminder
                    </button>
                  </form>
                </div>
              </>
            )}
          </ModalContent>
        </ModalBody>
      </Modal>
    </>
  )
}

export default EditReminder
