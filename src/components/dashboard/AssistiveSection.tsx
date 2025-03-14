
import React from 'react';
import { Mic, VolumeX, VolumeX as Braille, Map, Eye } from 'lucide-react';
import GlassmorphicCard from '@/components/ui-elements/GlassmorphicCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import FadeIn from '@/components/animations/FadeIn';

interface AssistiveFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  isActive?: boolean;
  onClick?: () => void;
  delay?: number;
  iconBackground?: string;
}

const AssistiveFeatureCard = ({
  icon,
  title,
  description,
  buttonText,
  isActive = false,
  onClick,
  delay = 0,
  iconBackground = 'bg-health-primary/10',
}: AssistiveFeatureCardProps) => {
  return (
    <FadeIn delay={delay}>
      <GlassmorphicCard className="p-6 h-full">
        <div className="flex flex-col h-full">
          <div className="flex items-start">
            <div className={cn("p-3 rounded-lg mr-4", iconBackground)}>
              {icon}
            </div>
            <div>
              <h3 className="font-medium mb-1">{title}</h3>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
          </div>
          
          <div className="mt-auto pt-4">
            <Button 
              variant={isActive ? "default" : "outline"} 
              size="sm" 
              className="w-full"
              onClick={onClick}
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </GlassmorphicCard>
    </FadeIn>
  );
};

const AssistiveSection = () => {
  return (
    <div>
      <FadeIn>
        <h2 className="text-xl font-semibold mb-5">Accessibility Features</h2>
      </FadeIn>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <AssistiveFeatureCard
          icon={<Mic className="h-5 w-5 text-health-primary" />}
          title="Speech to Text"
          description="Convert spoken words to text for easier input and navigation."
          buttonText="Enable"
          delay={0.1}
          iconBackground="bg-health-primary/10"
        />
        
        <AssistiveFeatureCard
          icon={<VolumeX className="h-5 w-5 text-health-secondary" />}
          title="Text to Speech"
          description="Have content read aloud to aid comprehension and accessibility."
          buttonText="Enable"
          delay={0.2}
          iconBackground="bg-health-secondary/10"
        />
        
        <AssistiveFeatureCard
          icon={<Braille className="h-5 w-5 text-health-accent" />}
          title="Braille Support"
          description="Compatible with braille displays for tactile reading and navigation."
          buttonText="Configure"
          delay={0.3}
          iconBackground="bg-health-accent/10"
        />
        
        <AssistiveFeatureCard
          icon={<Eye className="h-5 w-5 text-blue-500" />}
          title="Screen Reader"
          description="Full compatibility with screen reading software for vision impairment."
          buttonText="Settings"
          delay={0.4}
          iconBackground="bg-blue-500/10"
        />
      </div>
      
      <div className="mt-6">
        <FadeIn delay={0.5}>
          <GlassmorphicCard className="p-6 overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Nearby Health Facilities</h3>
              <button className="text-xs text-health-primary hover:text-health-primary/80 transition-colors">
                View all
              </button>
            </div>
            
            <div className="relative h-60 rounded-lg overflow-hidden bg-muted/30">
              <div className="absolute inset-0 flex items-center justify-center">
                <Map className="h-12 w-12 text-muted-foreground/50" />
                <span className="absolute text-sm text-muted-foreground">Map view unavailable in preview</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/40 to-transparent">
                <div className="text-white text-sm font-medium">3 Health Facilities Nearby</div>
                <div className="text-white/80 text-xs">Use the mobile app to view and navigate</div>
              </div>
            </div>
          </GlassmorphicCard>
        </FadeIn>
      </div>
    </div>
  );
};

export default AssistiveSection;
