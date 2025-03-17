
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import FadeIn from '@/components/animations/FadeIn';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import WelcomeBanner from '@/components/dashboard/WelcomeBanner';
import TabNavigation from '@/components/dashboard/TabNavigation';
import DietSection from '@/components/dashboard/DietSection';
import FeaturesSection from '@/components/dashboard/FeaturesSection';
import AssistiveSection from '@/components/dashboard/AssistiveSection';
import SmartAssistant from '@/components/dashboard/SmartAssistant';

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
          <DashboardHeader />
          <WelcomeBanner />
          
          <div className="mb-8">
            <FadeIn delay={0.2}>
              <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            </FadeIn>
            
            {activeTab === 'dashboard' && (
              <DietSection />
            )}
            
            {activeTab === 'features' && (
              <FeaturesSection />
            )}
            
            {activeTab === 'accessibility' && (
              <AssistiveSection />
            )}
          </div>
          
          {activeTab === 'dashboard' && (
            <SmartAssistant />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
