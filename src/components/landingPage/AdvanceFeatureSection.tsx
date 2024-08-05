import Image from "next/image"
import { ArrowRight } from "lucide-react"

const AdvanceFeatureSection = ({id}: {id: string}) => {
  return (
    <section id={id} className="container mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        <div className="w-full lg:w-1/2 relative aspect-video">
          <Image
            src="/ai_imaging.webp"
            alt="Advanced Image Recognition"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="rounded-lg shadow-xl object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            Advanced Image Recognition for Stroke Detection
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our state-of-the-art MRI-based stroke detection model leverages cutting-edge AI technology to accurately identify stroke indicators. This advanced system enhances diagnostic precision, supporting timely medical intervention and improving patient outcomes.
          </p>
          <ul className="space-y-3">
            {['Rapid analysis', 'High accuracy', 'Early detection'].map((feature, index) => (
              <li key={index} className="flex items-center text-gray-700">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
          <button className="inline-flex items-center px-6 py-3 bg-accent text-accent-foreground rounded-full text-lg font-semibold hover:bg-primary hover:text-primary-foreground transition duration-300">
            Learn More
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default AdvanceFeatureSection;
