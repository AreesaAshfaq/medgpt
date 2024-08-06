'use client'
import React, { useState } from 'react'
import {
  closeModal,
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from '@/components/ui/animated-modal'
import { Trash } from 'lucide-react'
import { createBrowserClient } from '@/utils/supabase'
import { toast } from 'sonner'
import { Reminder } from './RemindersGroup'
import { MotionButton } from '../Header'
import { formatReminder } from '@/utils/helper'
import LoadingCircle from '@/components/ui/loading'

type Props = {
  afterDelete: () => void
  reminder: Reminder
}

const DeleteReminder = ({ afterDelete, reminder }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const onSubmit = async () => {
    setIsDeleting(true)
    const supabase = createBrowserClient()

    const { error } = await supabase
      .from('reminders')
      .delete()
      .eq('id', reminder.id)
      .select()
      .single()

    if (error) return toast.error('Error deleting reminder')
    toast.success('Reminder deleted successfully')

    await afterDelete()
    setIsDeleting(false)
    closeModal()
  }
  const [line1, line2] = formatReminder(reminder)

  return (
    <>
      <Modal>
        <ModalTrigger>
          <MotionButton
            className="flex gap-2 rounded-full bg-destructive/90 px-4 py-2 text-destructive-foreground transition duration-300 hover:border-primary hover:bg-destructive hover:shadow-lg"
            whileTap={{ scale: 0.9 }}
          >
            <Trash className="h-5 w-5" />
            Delete
          </MotionButton>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            {isDeleting ? (
              <div className="flex h-[50vh] w-full items-center justify-center ">
                <LoadingCircle />
              </div>
            ) : (
              <>
                <h4 className="mb-2 text-center text-lg font-bold text-neutral-600 dark:text-neutral-100 md:text-2xl">
                  Are you sure you want to delete this reminder?
                </h4>
                <div className="mx-auto flex h-full max-w-sm flex-wrap items-start justify-start gap-x-4 gap-y-6 py-10">
                  <div className="flex w-full flex-col gap-2 rounded-md border border-gray-300 p-4 hover:shadow-md">
                    <p className="text-lg">{reminder.title}</p>
                    <p className="text-lg">{line1}</p>
                    <p className="text-lg">{line2}</p>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-md border border-destructive bg-destructive px-4 py-2 text-sm text-destructive-foreground hover:bg-destructive/90"
                    onClick={onSubmit}
                  >
                    Delete Reminder
                  </button>
                </div>
              </>
            )}
          </ModalContent>
        </ModalBody>
      </Modal>
    </>
  )
}

export default DeleteReminder
