
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className }) => {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div 
        className={cn(
          "rounded-full bg-gradient-to-r from-health-primary to-health-secondary flex items-center justify-center", 
          sizeClasses[size]
        )}
      >
        <span className="text-white font-semibold">W</span>
      </div>
      <span className={cn(
        "font-medium",
        size === 'sm' && "text-sm",
        size === 'md' && "text-lg",
        size === 'lg' && "text-xl"
      )}>
        Wellnest
      </span>
    </div>
  );
};

export default Logo;
