
import React from 'react';
import { AlertCircle } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

const WelcomeBanner: React.FC = () => {
  return (
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
  );
};

export default WelcomeBanner;
