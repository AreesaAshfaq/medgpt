import { ChatLayout } from '@/components/chat/ChatLayout'
import { DETECT_PROMPT_MSGS } from '@/app/data'

export default async function Index() {
  return (
    <section className="flex h-[90vh] w-full flex-col ">
      <ChatLayout
        messages={DETECT_PROMPT_MSGS.filter((m) => m.role !== 'system')}
      />
    </section>
  )
}
