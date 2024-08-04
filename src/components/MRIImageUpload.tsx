'use client'
import { useState } from 'react'
import { ImageUploader } from '@/components/ImageUploader'
import { getImagePrediction } from '@/utils/image-detect-api'
import { toast } from 'sonner'

const MRIImageUpload = () => {
  const [loading, setLoading] = useState(false)

  const onSubmit = async ({ image }: { image: File }) => {
    setLoading(true)
    const { data, success } = await getImagePrediction(image)

    if (success) {
      console.log(data)
      toast.success('Image uploaded successfully 🎉')
    } else {
      console.error('Error')
      toast.error('Error uploading image')
    }

    setLoading(false)
  }
  return <ImageUploader loading={loading} onSubmit={onSubmit} />
}

export default MRIImageUpload
