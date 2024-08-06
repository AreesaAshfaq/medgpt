import Image from "next/image"
import { ArrowRight } from "lucide-react"
import Link from "next/link";

const AdvanceFeatureSection = ({id}: {id: string}) => {
  return (
    <section id={id} className="container px-4 py-12 mx-auto sm:py-16 md:py-20 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-12 lg:flex-row lg:gap-16">
        <div className="relative w-full lg:w-1/2 aspect-video">
          <Image
            src="https://cdn.clinicallab.com/assets/articleNo/26822/aImg/50361/near-infrared-spectroscopy-for-noninvasive-intracranial-pressure-monitoring-x.webp?t=1722848415836"
            alt="Advanced Image Recognition"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover rounded-lg shadow-xl"
          />
        </div>
        <div className="w-full space-y-6 lg:w-1/2">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl dark:text-gray-50">
            Advanced Image Recognition for Stroke Detection
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-200">
            Our state-of-the-art MRI-based stroke detection model leverages cutting-edge AI technology to accurately identify stroke indicators. This advanced system enhances diagnostic precision, supporting timely medical intervention and improving patient outcomes.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row align-center sm:justify-between ">

          <ul className="space-y-3">
            {['Rapid analysis', 'High accuracy', 'Early detection'].map((feature, index) => (
              <li key={index} className="flex items-center text-gray-700 dark:text-gray-200">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
          <Link href="/login" passHref>
          <button
         className="flex px-8 py-3 font-bold transition duration-300 rounded-full shadow-lg md:text-md lg:px-10 lg:py-4 hover:bg-accent hover:text-accent-foreground text-md bg-primary text-primary-foreground">
            Sign Up
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
          </Link>
        </div>
          </div>
      </div>
    </section>
  )
}

export default AdvanceFeatureSection;
