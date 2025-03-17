
import React from 'react';
import { AlertCircle, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import FadeIn from '@/components/animations/FadeIn';

const DashboardHeader = () => {
  return (
    <>
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
    </>
  );
};

export default DashboardHeader;
