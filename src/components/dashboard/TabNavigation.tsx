
import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from '@/components/animations/FadeIn';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabNavigation = ({ activeTab, setActiveTab }: TabNavigationProps) => {
  return (
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
  );
};

export default TabNavigation;
