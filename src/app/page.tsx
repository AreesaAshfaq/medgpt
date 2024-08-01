import Card from '@/components/Card'
import Link from 'next/link'

export default async function Index() {
  return (
    <section className="flex min-h-[90vh] items-center justify-center px-2 py-6">
      <div className="mt-8 flex items-center justify-center">
        <Link href="/detect-stroke/image">
          <Card text="Detect Stroke using MRI Brain Image Scan" />
        </Link>

        <p className="mx-4 text-2xl">OR</p>

        <Link href="/detect-stroke/questionnaire">
          <Card text="Detect Stroke using Health Questionnaire" />
        </Link>
      </div>
    </section>
  )
}
