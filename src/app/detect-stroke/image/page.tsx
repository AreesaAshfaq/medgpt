import { ImageUploader } from '@/components/ImageUploader'

export default async function Index() {
  return (
    <section className="flex min-h-[90vh]  items-center justify-center px-2 py-6">
      {/* Image Upload Component */}
      <ImageUploader />
    </section>
  )
}
