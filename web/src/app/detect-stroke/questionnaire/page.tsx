import { ChatLayout } from '@/components/chat/ChatLayout'
import { DETECT_PROMPT_MSGS } from '@/app/data'

export default async function Index() {
  return <ChatLayout messages={DETECT_PROMPT_MSGS} />
}
