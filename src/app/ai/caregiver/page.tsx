import { ChatLayout } from '@/components/chat/ChatLayout'
import { CARE_GIVER_PROMPT_MSGS } from '@/app/data'

export default async function Index() {
  return (
    <ChatLayout
      messages={CARE_GIVER_PROMPT_MSGS.filter((m) => m.role !== 'system')}
    />
  )
}
