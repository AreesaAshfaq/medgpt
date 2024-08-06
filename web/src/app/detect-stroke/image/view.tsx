'use client'
import MRIImageUpload from '@/components/MRIImageUpload'
import PredictionResults from '@/components/PredictionResults'
import { useState } from 'react'

const ImageDetectResults = () => {
  const [showResults, setShowResults] = useState(false)

  const random = +Math.random().toFixed(2)
  const STROKE_THRESHOLD = 0.5

  const PREDICTION = {
    stroke: random > STROKE_THRESHOLD,
    strokeProbability: random,
  }

  const showResultsFn = () => {
    setShowResults(true)
  }

  return (
    <>
      {showResults ? (
        <PredictionResults prediction={PREDICTION} />
      ) : (
        <MRIImageUpload afterImagePrediction={showResultsFn} />
      )}
    </>
  )
}

export default ImageDetectResults
