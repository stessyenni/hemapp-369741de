
import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from '@/components/animations/FadeIn';
import { LucideIcon } from 'lucide-react';

interface MealItemProps {
  id: number;
  name: string;
  calories: number;
  icon: React.ReactNode;
  time: string;
  color: string;
  index: number;
}

const MealItem = ({ id, name, calories, icon, time, color, index }: MealItemProps) => {
  return (
    <FadeIn key={id} delay={0.1 * (index + 1)}>
      <div className={cn("p-4 rounded-lg transition-all duration-300 hover:translate-y-[-2px]", color)}>
        <div className="flex justify-between items-start">
          <div>
            <div className="text-xs text-muted-foreground mb-1">{time}</div>
            <div className="font-medium">{name}</div>
            <div className="text-xs text-muted-foreground mt-1">{calories} calories</div>
          </div>
          <div className="text-health-primary">{icon}</div>
        </div>
      </div>
    </FadeIn>
  );
};

export default MealItem;
