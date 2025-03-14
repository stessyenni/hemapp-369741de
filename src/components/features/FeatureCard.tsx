
import React from 'react';
import { cn } from '@/lib/utils';
import GlassmorphicCard from '@/components/ui-elements/GlassmorphicCard';
import FadeIn from '@/components/animations/FadeIn';

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
  className?: string;
}

const FeatureCard = ({
  title,
  description,
  icon,
  delay = 0,
  className,
  ...props
}: FeatureCardProps) => {
  return (
    <FadeIn delay={delay} className="h-full" direction="up">
      <GlassmorphicCard 
        className={cn('feature-card p-6 h-full flex flex-col', className)} 
        {...props}
      >
        <div className="mb-4 text-health-primary">
          <div className="feature-icon w-10 h-10 flex items-center justify-center">
            {icon}
          </div>
        </div>
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mt-auto">{description}</p>
      </GlassmorphicCard>
    </FadeIn>
  );
};

export default FeatureCard;
