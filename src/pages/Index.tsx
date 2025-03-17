
import React, { useState, useEffect } from 'react';
import { 
  AlertCircle, 
  Apple, 
  BookOpen, 
  Target, 
  Globe, 
  CloudOff, 
  MapPin, 
  Bot, 
  Mic, 
  Braces, 
  Map as MapIcon, 
  Eye,
  Server
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import FeatureCard from '@/components/features/FeatureCard';
import DietSection from '@/components/dashboard/DietSection';
import AssistiveSection from '@/components/dashboard/AssistiveSection';
import GlassmorphicCard from '@/components/ui-elements/GlassmorphicCard';
import FadeIn from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';

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

const assistiveFeatures = [
  {
    icon: <Mic className="h-6 w-6" />,
    title: 'Speech-to-Text',
    description: 'Convert spoken words to text for easier interaction.',
  },
  {
    icon: <Braces className="h-6 w-6" />,
    title: 'Braille Support',
    description: 'Full compatibility with braille reading devices.',
  },
  {
    icon: <MapIcon className="h-6 w-6" />,
    title: 'Maps Integration',
    description: 'Navigate to health facilities with accessible directions.',
  },
  {
    icon: <Eye className="h-6 w-6" />,
    title: 'Screen Reader',
    description: 'Compatible with screen reading technologies.',
  },
];

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/30">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-health-primary/30 border-t-health-primary animate-spin"></div>
          <h2 className="text-xl font-medium text-foreground/80">Loading Dashboard</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <Header />
      
      <main className="pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex flex-wrap items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold">Health Dashboard</h1>
                <p className="text-muted-foreground mt-1">Monitor your health goals and manage your diet</p>
              </div>
              
              <div className="flex space-x-3 mt-4 sm:mt-0">
                <Button variant="outline" size="sm">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Help
                </Button>
                <Button size="sm">Get Mobile App</Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/api-setup-guide">
                    <Server className="h-4 w-4 mr-2" />
                    Django Setup
                  </Link>
                </Button>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.1} className="mb-8">
            <div className="bg-health-primary/5 border border-health-primary/10 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-health-primary mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-sm">Welcome to your health dashboard!</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    This is a preview of your personalized health management dashboard. 
                    Download the mobile app to access all features and track your health on the go.
                    Click on "Django Setup" to see how to connect this frontend to a Python/Django backend.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
          
          <div className="mb-8">
            <FadeIn delay={0.2}>
              <div className="flex border-b mb-8">
                <button
                  className={cn(
                    "pb-2 px-4 font-medium text-sm transition-colors relative",
                    activeTab === 'dashboard'
                      ? "text-health-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setActiveTab('dashboard')}
                >
                  Dashboard
                  {activeTab === 'dashboard' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-health-primary" />
                  )}
                </button>
                <button
                  className={cn(
                    "pb-2 px-4 font-medium text-sm transition-colors relative",
                    activeTab === 'features'
                      ? "text-health-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setActiveTab('features')}
                >
                  Features
                  {activeTab === 'features' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-health-primary" />
                  )}
                </button>
                <button
                  className={cn(
                    "pb-2 px-4 font-medium text-sm transition-colors relative",
                    activeTab === 'accessibility'
                      ? "text-health-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setActiveTab('accessibility')}
                >
                  Accessibility
                  {activeTab === 'accessibility' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-health-primary" />
                  )}
                </button>
              </div>
            </FadeIn>
            
            {activeTab === 'dashboard' && (
              <DietSection />
            )}
            
            {activeTab === 'features' && (
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
            )}
            
            {activeTab === 'accessibility' && (
              <AssistiveSection />
            )}
          </div>
          
          {activeTab === 'dashboard' && (
            <div>
              <FadeIn delay={0.3}>
                <h2 className="text-xl font-semibold mb-5">Smart Assistant</h2>
              </FadeIn>
              
              <FadeIn delay={0.4}>
                <GlassmorphicCard className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-health-primary/10 flex items-center justify-center mr-3">
                      <Bot className="h-5 w-5 text-health-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Health Assistant</h3>
                      <p className="text-xs text-muted-foreground">Ask me anything about your health</p>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 rounded-lg p-4 mb-4">
                    <div className="flex">
                      <div className="w-8 h-8 rounded-full bg-health-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                        <Bot className="h-4 w-4 text-health-primary" />
                      </div>
                      <div>
                        <p className="text-sm">
                          Hello! I'm your personal health assistant. I can help you track your diet, 
                          suggest recipes, and answer questions about your health goals. What would you like to know today?
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Ask a question..."
                      className="flex-1 rounded-l-lg border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-health-primary"
                    />
                    <Button className="rounded-l-none">
                      <Mic className="h-4 w-4 mr-2" />
                      Ask
                    </Button>
                  </div>
                </GlassmorphicCard>
              </FadeIn>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
