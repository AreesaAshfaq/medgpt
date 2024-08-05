'use client'
import {Brain, Heart, Users} from 'lucide-react'
import { motion } from 'framer-motion';

const Features = () => {
  return (
    <section className="bg-secondary py-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <FeatureCard
          icon={<Brain className="w-12 h-12 text-primary" />}
          title="AI-Powered Diagnosis"
          description="Receive precise, AI-generated questions to evaluate symptoms and risk factors for various conditions, including stroke."
        />
        <FeatureCard
          icon={<Heart className="w-12 h-12 text-primary" />}
          title="Personalized Health Insights"
          description="Get comprehensive responses based on your inputs, with actionable advice and empathetic support."
        />
        <FeatureCard
          icon={<Users className="w-12 h-12 text-primary" />}
          title="Specialized Chatbots"
          description="Access tailored chatbots for stroke detection, caregiver tips, and rehabilitation & mental health support."
        />
      </div>
    </section>
  );
}

const FeatureCard = ({ icon, title, description }: any) => (
  <motion.div
    className="bg-card text-card-foreground p-6 rounded-lg shadow-lg"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p>{description}</p>
  </motion.div>
);

export default Features;
