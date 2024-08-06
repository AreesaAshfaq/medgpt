import React from 'react'
import Link from 'next/link'

type Props = {
  prediction: {
    stroke: boolean
    strokeProbability: number
  }
}

const resultsStatus = {
  VERY_LOW: 0.2,
  LOW: 0.35,
  MEDIUM: 0.5,
  HIGH: 0.75,
  DEFINITE: 0.9,
}

const getResultsStatus = (strokeProbability: number) => {
  if (strokeProbability < resultsStatus.VERY_LOW) {
    return 'Very Low'
  }
  if (strokeProbability < resultsStatus.LOW) {
    return 'Low'
  }
  if (strokeProbability < resultsStatus.MEDIUM) {
    return 'Medium'
  }
  if (strokeProbability < resultsStatus.HIGH) {
    return 'High'
  }
  return 'Definite'
}

const getStrokeRiskTextColor = (status: string) => {
  switch (status) {
    case 'Very Low':
    case 'Low':
      return 'text-green-500'
    case 'Medium':
      return 'text-yellow-500'
    case 'High':
    case 'Definite':
      return 'text-red-500'

    default:
      return 'text-red-500'
  }
}

const PredictionResults = ({ prediction }: Props) => {
  const { stroke, strokeProbability } = prediction
  const strokeStatus = getResultsStatus(strokeProbability)
  return (
    <div className="max-w-xl p-6 mx-auto mt-10 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="mb-4 text-2xl font-bold text-center text-primary">
        Brain MRI Image Prediction Results
      </h2>
      <div className="text-center">
        <p className="mb-2 text-lg">
          Based on the analysis of your MRI image, our AI model has made the
          following risk assessment:
        </p>
        <div className="p-4 bg-gray-100 rounded-lg dark:bg-gray-700">
          <p className="text-xl font-semibold">
            <span className={getStrokeRiskTextColor(strokeStatus)}>
              {strokeStatus}
            </span>{' '}
            Risk of Stroke
          </p>
          <p className="text-xl font-semibold">
            Stroke Probability:
            <span className={getStrokeRiskTextColor(strokeStatus) + ' ml-2'}>
              {Math.round(strokeProbability * 100)}%
            </span>
          </p>
        </div>

        <p className="mt-4 text-md">
          If you have any questions or need further assistance, please consult
          with a healthcare professional or visit our AI chatbot for more
          information.
        </p>
        <Link
          className="inline-block px-6 py-3 mt-6 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
          href={`/ai/caregiver?stroke=${stroke}&probability=${strokeProbability}&status=${strokeStatus}`}
        >
          Talk to Our Caregiver AI Chatbot
        </Link>
      </div>{' '}
      <div
        role="alert"
        className="p-4 my-4 border-red-500 rounded border-s-4 bg-red-50"
      >
        <strong className="block text-red-800">
          Our Deep Learning Model is not deployed yet, this is a demo prediction
          result.
        </strong>
      </div>
    </div>
  )
}

export default PredictionResults
