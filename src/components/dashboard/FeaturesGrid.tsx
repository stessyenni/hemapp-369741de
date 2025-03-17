
import React from 'react';
import { 
  Apple, 
  BookOpen, 
  Target, 
  Globe, 
  CloudOff, 
  MapPin, 
  Bot, 
  Mic 
} from 'lucide-react';
import FeatureCard from '@/components/features/FeatureCard';

const mobileFeatures = [
  {
    icon: <Apple className="h-6 w-6" />,
    title: 'Diet Monitoring',
    description: 'Track your daily nutrition and calorie intake with ease.',
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: 'Recipe Suggestions',
    description: 'Get personalized recipe recommendations based on your goals.',
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: 'Goal Management',
    description: 'Set and track your health and fitness goals.',
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: 'Language Options',
    description: 'Use the app in multiple languages for global accessibility.',
  },
  {
    icon: <CloudOff className="h-6 w-6" />,
    title: 'Offline Mode',
    description: 'Access key features even without an internet connection.',
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: 'Facility Finder',
    description: 'Locate health facilities and services near you.',
  },
  {
    icon: <Bot className="h-6 w-6" />,
    title: 'Smart Chatbot',
    description: 'Get instant answers to your health and nutrition questions.',
  },
  {
    icon: <Mic className="h-6 w-6" />,
    title: 'Voice Control',
    description: 'Control the app using voice commands for hands-free operation.',
  },
];

const FeaturesGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {mobileFeatures.map((feature, index) => (
        <FeatureCard
          key={feature.title}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          delay={0.05 * index}
        />
      ))}
    </div>
  );
};

export default FeaturesGrid;
