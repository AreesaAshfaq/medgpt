'use client'
import { Brain, Heart, Users } from 'lucide-react'
import { motion } from 'framer-motion';

const Features = ({id}: {id:string}) => {
  return (
    <section id={id} className="bg-background border-t-2 border-gray-500 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Brain className="w-12 h-12 text-primary" />}
            title="AI-Powered Diagnosis"
            description="Receive precise, AI-generated questions to evaluate symptoms and risk factors for various conditions, including stroke. Our advanced algorithms ensure accurate and timely assessments."
          />
          <FeatureCard
            icon={<Heart className="w-12 h-12 text-primary" />}
            title="Personalized Health Insights"
            description="Get comprehensive responses based on your inputs, with actionable advice and empathetic support. Our platform adapts to your unique health profile for tailored recommendations."
          />
          <FeatureCard
            icon={<Users className="w-12 h-12 text-primary" />}
            title="Specialized Chatbots"
            description="Access tailored chatbots for stroke detection, caregiver tips, and rehabilitation & mental health support. Our AI-driven conversational agents provide 24/7 assistance and guidance."
          />
        </div>
      </div>
    </section>
  );
}

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <motion.div
    className="bg-secondary text-card-foreground p-6 rounded-lg shadow-lg h-full flex flex-col"
    whileHover={{ scale: 1.03 }}
    transition={{ duration: 0.3 }}
  >
    <div className="mb-4 flex justify-center">{icon}</div>
    <h3 className="text-xl font-semibold mb-3 text-center">{title}</h3>
    <p className="text-sm text-center flex-grow">{description}</p>
  </motion.div>
);

export default Features;
