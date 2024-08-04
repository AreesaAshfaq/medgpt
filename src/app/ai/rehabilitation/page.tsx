import { ChatLayout } from '@/components/chat/ChatLayout'
import { REHAB_PROMPT_MSGS } from '@/app/data'

export default async function Index() {
  return (
    <ChatLayout
      messages={REHAB_PROMPT_MSGS.filter((m) => m.role !== 'system')}
    />
  )
}
