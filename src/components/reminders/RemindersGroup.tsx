import React from 'react'
import CreateReminder from './CreateReminder'

type Reminder = {
  id: string
  title: string
  created_at: string
  datetime: string
  frequency: string
  user_id: string
}

type Props = {
  reminders: Reminder[]
}

const RemindersGroup = ({ reminders }: Props) => {
  return (
    <>
      <div className="container mx-auto mt-8 max-w-[560px]">
        <div className="mb-4 flex items-center justify-between border-b border-dashed border-gray-900 pb-4">
          <h1 className="text-3xl font-semibold">Tasks</h1>
          <CreateReminder />
        </div>
        <ul></ul>
      </div>
    </>
  )
}

export default RemindersGroup
