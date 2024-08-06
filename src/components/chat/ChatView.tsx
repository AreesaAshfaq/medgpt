import { Message, UserData } from '@/app/data'
import ChatTopbar from './ChatTopbar'
import { ChatList } from './ChatList'
import { useState } from 'react'
import axios from 'axios'

interface ChatProps {
  messages?: Message[]
  selectedUser: UserData
  isMobile: boolean
}

export function Chat({ messages, selectedUser, isMobile }: ChatProps) {
  const [responseLoading, setResponseLoading] = useState(false)
  const [messagesState, setMessages] = useState<Message[]>(messages ?? [])

  const sendMessage = async (newMessage: Message) => {
    setResponseLoading(true)
    setMessages((prev) => [...prev, newMessage])

    const res1 = await axios.post(
      '/api/falcon',
      {
        chatHistory: messagesState.map((message) => ({
          role: message.role,
          content: message.message,
        })),
        newMessage: newMessage.message,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    setMessages((prev) => [
      ...prev,
      {
        id: messagesState.length + 1,
        avatar: '/ai.png',
        name: 'AI',
        role: 'assistant',
        message: res1.data.data[0].message.content.replace('\nUser:', ''),
      },
    ])

    setResponseLoading(false)
  }

  return (
    <div className="flex h-full w-full flex-col justify-between md:mx-auto md:w-3/4">
      <ChatTopbar selectedUser={selectedUser} />

      <ChatList
        messages={messagesState}
        selectedUser={selectedUser}
        sendMessage={sendMessage}
        isMobile={isMobile}
        responseLoading={responseLoading}
      />
    </div>
  )
}
