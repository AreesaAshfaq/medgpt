'use client'

import { Message, userData } from '@/app/data'
import React, { useEffect, useState } from 'react'
import { Chat } from './ChatView'
import { useSearchParams } from 'next/navigation'

export function ChatLayout({ messages }: { messages: Message[] }) {
  const [selectedUser, setSelectedUser] = React.useState(userData[0])
  const [isMobile, setIsMobile] = useState(false)

  const searchParams = useSearchParams()

  const stroke = searchParams.get('stroke')
  const probability = parseFloat(searchParams.get('probability') || '0')
  const status = searchParams.get('status')

  const hasImagePredictionResults = stroke && probability && status

  let messagesArr = [...messages]

  if (hasImagePredictionResults) {
    const message: Message = {
      id: 4,
      avatar: '/ai.png',
      name: 'AI',
      role: 'assistant',
      message: `From Image Analysis of the person's brain MRI:\n\nThe stroke severity is ${status} adn the stroke probability is ${
        probability * 100
      }%.`,
    }

    messagesArr = [message, ...messagesArr]
  }

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    // Initial check
    checkScreenWidth()

    // Event listener for screen width changes
    window.addEventListener('resize', checkScreenWidth)

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkScreenWidth)
    }
  }, [])

  return (
    <Chat
      messages={messagesArr}
      selectedUser={selectedUser}
      isMobile={isMobile}
    />
  )
}
