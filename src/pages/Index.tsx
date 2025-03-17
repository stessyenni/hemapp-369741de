
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import TabNavigation from '@/components/dashboard/TabNavigation';
import DietSection from '@/components/dashboard/DietSection';
import AssistiveSection from '@/components/dashboard/AssistiveSection';
import FeaturesGrid from '@/components/dashboard/FeaturesGrid';
import SmartAssistant from '@/components/dashboard/SmartAssistant';
import LoadingSpinner from '@/components/dashboard/LoadingSpinner';

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
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <Header />
      
      <main className="pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <DashboardHeader />
          
          <div className="mb-8">
            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            
            {activeTab === 'dashboard' && <DietSection />}
            {activeTab === 'features' && <FeaturesGrid />}
            {activeTab === 'accessibility' && <AssistiveSection />}
          </div>
          
          {activeTab === 'dashboard' && <SmartAssistant />}
        </div>
      </main>
    </div>
  );
};

export default Index;
