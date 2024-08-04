'use client'
import React from 'react'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from '@/components/ui/animated-modal'
import { Clock } from 'lucide-react'
type Props = {}

const CreateReminder = (props: Props) => {
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
            <div className="flex items-center justify-center"></div>
            <div className="mx-auto flex max-w-sm flex-wrap items-start justify-start gap-x-4 gap-y-6 py-10">
              {/* FORM CONTENT GOES HERE */}
            </div>
          </ModalContent>
          <ModalFooter className="gap-4">
            <button className="w-28 rounded-md border border-gray-300 bg-gray-200 px-2 py-1 text-sm text-black dark:border-black dark:bg-black dark:text-white">
              Cancel
            </button>
            <button className="w-28 rounded-md border border-black bg-black px-2 py-1 text-sm text-white dark:bg-white dark:text-black">
              Book Now
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </>
  )
}

export default CreateReminder
