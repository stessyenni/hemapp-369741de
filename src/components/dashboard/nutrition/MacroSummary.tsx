
import React from 'react';
import GlassmorphicCard from '@/components/ui-elements/GlassmorphicCard';
import FadeIn from '@/components/animations/FadeIn';
import MacroCircle from './MacroCircle';

const MacroSummary = () => {
  return (
    <FadeIn delay={0.2}>
      <GlassmorphicCard className="p-6 h-full">
        <h3 className="font-medium mb-4">Today's Macros</h3>
        <div className="mt-2 mb-6">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <div className="text-3xl font-bold">1,864</div>
            <div className="text-sm text-muted-foreground">calories</div>
          </div>
          <div className="w-full bg-muted/30 h-2 rounded-full overflow-hidden">
            <div className="h-full bg-health-primary rounded-full" style={{ width: '75%' }}></div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>0</span>
            <span>Goal: 2,400</span>
          </div>
        </div>
        
        <div className="flex justify-around mt-8">
          <MacroCircle 
            value={118} 
            max={150} 
            label="Protein" 
            color="hsl(var(--health-secondary))" 
          />
          <MacroCircle 
            value={162} 
            max={240} 
            label="Carbs" 
            color="hsl(221, 83%, 70%)" 
          />
          <MacroCircle 
            value={54} 
            max={80} 
            label="Fat" 
            color="hsl(36, 100%, 65%)" 
          />
        </div>
      </GlassmorphicCard>
    </FadeIn>
  );
};

export default MacroSummary;
