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
import { Clock } from 'lucide-react'
import { createBrowserClient } from '@/utils/supabase'
import { toast } from 'sonner'
import { createReminderSchema, frequencyOptions } from '@/utils/constants'
import LoadingCircle from '../ui/loading'

type ReminderFormValues = z.infer<typeof createReminderSchema>

type Props = {
  afterCreate: () => void
}

const CreateReminder = ({ afterCreate }: Props) => {
  const [isCreating, setIsCreating] = useState(false)
  const form = useForm<ReminderFormValues>({
    resolver: zodResolver(createReminderSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      datetime: '',
      frequency: frequencyOptions[0].value,
    },
  })

  const { handleSubmit, register, formState } = form

  const onSubmit = async (values: ReminderFormValues) => {
    setIsCreating(true)
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

    if (error) return toast.error('Error creating reminder')

    toast.success('Reminder created successfully')
    await afterCreate()
    setIsCreating(false)
    closeModal()
  }

  return (
    <>
      <Modal>
        <ModalTrigger className="flex justify-center group/modal-btn bg-primary text-primary">
          <span className="text-center transition duration-500 text-primary-foreground group-hover/modal-btn:translate-x-40">
            Create Reminder
          </span>
          <div className="absolute inset-0 z-20 flex items-center justify-center transition duration-500 -translate-x-40 text-primary-foreground group-hover/modal-btn:translate-x-0">
            <Clock className="w-6 h-6" />
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            {isCreating ? (
              <div className="flex h-[50vh] w-full scale-150 items-center justify-center">
                <LoadingCircle />
              </div>
            ) : (
              <>
                <h4 className="mb-8 text-lg font-bold text-center text-neutral-600 dark:text-neutral-100 md:text-2xl">
                  Create a{' '}
                  <span className="rounded-md border border-gray-200 bg-gray-100 px-1 py-0.5 dark:border-neutral-700 dark:bg-neutral-800">
                    Reminder
                  </span>
                </h4>
                <div className="flex flex-wrap items-start justify-start max-w-sm py-10 mx-auto gap-x-4 gap-y-6">
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
                        className="block w-full p-2 bg-transparent border-gray-300 rounded-md shadow-sm text-primary focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
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
                        className="block w-full bg-transparent border-gray-300 rounded-md shadow-sm text-primary focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
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
                      className="w-full px-4 py-2 text-sm text-white bg-black border border-black rounded-md dark:bg-white dark:text-black"
                      disabled={formState.isSubmitting}
                    >
                      Create Reminder
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

export default CreateReminder
