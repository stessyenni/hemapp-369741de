
import React from 'react';
import { cn } from '@/lib/utils';

interface MacroCircleProps {
  value: number;
  max: number;
  label: string;
  color: string;
  className?: string;
}

const MacroCircle = ({ value, max, label, color, className }: MacroCircleProps) => {
  const percentage = (value / max) * 100;
  
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted/30"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={`${percentage * 2.51} 251`}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
          {value}g
        </div>
      </div>
      <span className="mt-2 text-xs text-muted-foreground">{label}</span>
    </div>
  );
};

export default MacroCircle;
