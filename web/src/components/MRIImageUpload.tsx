'use client'
import { useState } from 'react'
import { ImageUploader } from '@/components/ImageUploader'
import { toast } from 'sonner'
// import { getImagePrediction } from '@/utils/api'

type Props = {
  afterImagePrediction: () => void
}

const MRIImageUpload:React.FC<Props> = ({ afterImagePrediction }) => {
  const [loading, setLoading] = useState(false)

  const onSubmit = async ({ image }: { image: File }) => {
    setLoading(true)
    // const { data, success } = await getImagePrediction(image)
    // if (success) {
    //   console.log(data)
    //   toast.success('Image uploaded successfully 🎉')
    // } else {
    //   console.error('Error')
    //   toast.error('Error uploading image')
    // }
    setTimeout(() => {
      toast.success('Image uploaded successfully 🎉')
      setLoading(false)
      afterImagePrediction()
    }, 2000)
  }
  return <ImageUploader loading={loading} onSubmit={onSubmit} />
}

export default MRIImageUpload
