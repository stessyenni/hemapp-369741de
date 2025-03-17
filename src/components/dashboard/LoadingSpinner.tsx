
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/30">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-health-primary/30 border-t-health-primary animate-spin"></div>
        <h2 className="text-xl font-medium text-foreground/80">Loading Dashboard</h2>
      </div>
    </div>
  );
};

export default LoadingSpinner;
