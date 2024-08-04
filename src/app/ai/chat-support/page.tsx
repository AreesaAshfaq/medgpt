import { ChatLayout } from '@/components/chat/ChatLayout'
import { CHAT_SUPPORT_PROMPT_MSGS } from '@/app/data'

export default async function Index() {
  return (
    <ChatLayout
      messages={CHAT_SUPPORT_PROMPT_MSGS.filter((m) => m.role !== 'system')}
    />
  )
}
