
import React from 'react';
import { Bot, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassmorphicCard from '@/components/ui-elements/GlassmorphicCard';
import FadeIn from '@/components/animations/FadeIn';

const SmartAssistant: React.FC = () => {
  return (
    <div>
      <FadeIn delay={0.3}>
        <h2 className="text-xl font-semibold mb-5">Smart Assistant</h2>
      </FadeIn>
      
      <FadeIn delay={0.4}>
        <GlassmorphicCard className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-health-primary/10 flex items-center justify-center mr-3">
              <Bot className="h-5 w-5 text-health-primary" />
            </div>
            <div>
              <h3 className="font-medium">Health Assistant</h3>
              <p className="text-xs text-muted-foreground">Ask me anything about your health</p>
            </div>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-4 mb-4">
            <div className="flex">
              <div className="w-8 h-8 rounded-full bg-health-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                <Bot className="h-4 w-4 text-health-primary" />
              </div>
              <div>
                <p className="text-sm">
                  Hello! I'm your personal health assistant. I can help you track your diet, 
                  suggest recipes, and answer questions about your health goals. What would you like to know today?
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex">
            <input
              type="text"
              placeholder="Ask a question..."
              className="flex-1 rounded-l-lg border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-health-primary"
            />
            <Button className="rounded-l-none">
              <Mic className="h-4 w-4 mr-2" />
              Ask
            </Button>
          </div>
        </GlassmorphicCard>
      </FadeIn>
    </div>
  );
};

export default SmartAssistant;
