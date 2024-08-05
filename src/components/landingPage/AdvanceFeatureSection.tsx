'use client'
import { Image } from "lucide-react"

const AdvanceFeatureSection = () => {
  //{/* Advanced Image Recognition Section */}
  return (
<section className="container mx-auto py-20 flex flex-col md:flex-row items-center">
<div className="md:w-1/2 mb-10 md:mb-0">
  <Image className="w-full h-auto" />
</div>
<div className="md:w-1/2 md:pl-10">
  <h2 className="text-3xl font-bold mb-6">Advanced Image Recognition</h2>
  <p className="text-lg mb-6">
    Utilize our MRI-based stroke detection model to accurately identify stroke indicators, enhancing diagnostic precision and supporting timely medical intervention.
  </p>
  <button className="px-6 py-3 bg-accent text-accent-foreground rounded-full text-lg font-semibold hover:bg-primary hover:text-primary-foreground transition duration-300">
    Learn More
  </button>
</div>
</section>
)
}

export default AdvanceFeatureSection;
