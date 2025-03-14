
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassmorphicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  borderEffect?: boolean;
  intensity?: 'light' | 'medium' | 'heavy';
}

const GlassmorphicCard = ({
  children,
  className,
  hoverEffect = true,
  borderEffect = true,
  intensity = 'medium',
  ...props
}: GlassmorphicCardProps) => {
  const getIntensityClasses = () => {
    switch (intensity) {
      case 'light':
        return 'bg-white/40 dark:bg-gray-900/30 backdrop-blur-sm';
      case 'medium':
        return 'bg-white/50 dark:bg-gray-900/40 backdrop-blur-md';
      case 'heavy':
        return 'bg-white/70 dark:bg-gray-900/60 backdrop-blur-lg';
      default:
        return 'bg-white/50 dark:bg-gray-900/40 backdrop-blur-md';
    }
  };

  return (
    <div
      className={cn(
        'rounded-xl shadow-sm',
        getIntensityClasses(),
        borderEffect && 'border border-white/20 dark:border-gray-800/30',
        hoverEffect && 'transition duration-300 hover:shadow-md hover:translate-y-[-2px]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassmorphicCard;
