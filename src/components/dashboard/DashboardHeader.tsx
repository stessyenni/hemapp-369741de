
import React from 'react';
import { AlertCircle, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import FadeIn from '@/components/animations/FadeIn';

const DashboardHeader: React.FC = () => {
  return (
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
  );
};

export default DashboardHeader;
