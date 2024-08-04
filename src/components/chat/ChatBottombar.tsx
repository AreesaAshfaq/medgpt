import { FileImage, Paperclip, SendHorizontal } from 'lucide-react'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { buttonVariants } from '../ui/button'
import { cn } from '@/utils/tailwind'
import { AnimatePresence, motion } from 'framer-motion'
import { Message, loggedInUserData } from '@/app/data'
import { Textarea } from '../ui/textarea'

interface ChatBottombarProps {
  sendMessage: (newMessage: Message) => void
  isMobile: boolean
}

export const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }]

export default function ChatBottombar({
  sendMessage,
  isMobile,
}: ChatBottombarProps) {
  const [message, setMessage] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value)
  }

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: message.length + 1,
        name: loggedInUserData.name,
        avatar: loggedInUserData.avatar,
        role: 'user',
        message: message.trim(),
      }
      sendMessage(newMessage)
      setMessage('')

      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSend()
    }

    if (event.key === 'Enter' && event.shiftKey) {
      event.preventDefault()
      setMessage((prev) => prev + '\n')
    }
  }

  return (
    <div className="flex w-full items-center justify-between gap-2 p-2">
      <AnimatePresence initial={false}>
        <motion.div
          key="input"
          className="relative w-full"
          layout
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.05 },
            layout: {
              type: 'spring',
              bounce: 0.15,
            },
          }}
        >
          <Textarea
            autoComplete="off"
            value={message}
            ref={inputRef}
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
            name="message"
            placeholder="Aa"
            className="flex w-full resize-none items-center overflow-hidden rounded-full border bg-background"
          ></Textarea>
        </motion.div>

        {message.trim() ? (
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'icon' }),
              'h-9 w-9',
              'shrink-0 dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
            )}
            onClick={handleSend}
          >
            <SendHorizontal size={20} className="text-muted-foreground" />
          </Link>
        ) : (
          <></>
        )}
      </AnimatePresence>
    </div>
  )
}
