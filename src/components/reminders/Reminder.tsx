'use client'
import React from 'react'
import { Reminder as IReminder } from './RemindersGroup'
import { MotionDiv } from '../Header'
import EditReminder from './EditReminder'
import DeleteReminder from './DeleteReminder'
import { formatReminder } from '@/utils/helper'

type Props = {
  reminder: IReminder
  afterDelete: () => void
  afterEdit: () => void
}

const Reminder = ({ reminder, afterDelete, afterEdit }: Props) => {
  const [line1, line2] = formatReminder({
    datetime: reminder.datetime,
    frequency: reminder.frequency,
  })

  return (
    <MotionDiv className="relative block w-full overflow-hidden rounded-lg border border-gray-300 p-4 shadow-sm sm:p-6 lg:p-8">
      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

      <div className="sm:flex sm:justify-between sm:gap-4">
        <div>
          <h3 className="text-lg font-bold text-primary sm:text-xl">
            {reminder.title}
          </h3>

          <div className="flex gap-2 py-2">
            <EditReminder reminder={reminder} afterEdit={afterEdit} />
            <DeleteReminder afterDelete={afterDelete} reminder={reminder} />
          </div>
        </div>
      </div>

      <dl className="mt-6 flex gap-4 sm:gap-6">
        <div className="flex flex-col">
          <dd className="text-md text-primary">{line1}</dd>
          <dt className="text-md font-medium text-primary">{line2}</dt>
        </div>
      </dl>
    </MotionDiv>
  )
}

export default Reminder
