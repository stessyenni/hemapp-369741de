
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, Send, Mic } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import GlassmorphicCard from '@/components/ui-elements/GlassmorphicCard';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Here you would typically send the message to your backend
    console.log('Message sent:', message);
    setMessage('');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <Header />
      
      <main className="pt-28 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 rounded-full bg-health-primary/10 flex items-center justify-center mr-3">
                <Bot className="h-5 w-5 text-health-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Health Assistant</h1>
                <p className="text-muted-foreground">Ask me anything about your health and wellness</p>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <GlassmorphicCard className="p-6 mb-6">
              <div className="space-y-4 mb-6">
                <div className="flex">
                  <div className="w-8 h-8 rounded-full bg-health-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                    <Bot className="h-4 w-4 text-health-primary" />
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4 max-w-[80%]">
                    <p className="text-sm">
                      Hello! I'm your personal health assistant. I can help you track your diet, 
                      suggest recipes, and answer questions about your health goals. What would you like to know today?
                    </p>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="button" variant="outline" size="icon">
                  <Mic className="h-4 w-4" />
                </Button>
                <Button type="submit">
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </form>
            </GlassmorphicCard>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div className="bg-card rounded-lg border p-4">
              <h3 className="font-medium mb-2">Suggested Questions</h3>
              <div className="grid gap-2">
                <Button variant="outline" size="sm" className="justify-start">What foods are good for boosting immunity?</Button>
                <Button variant="outline" size="sm" className="justify-start">How can I improve my sleep quality?</Button>
                <Button variant="outline" size="sm" className="justify-start">Recommend a workout routine for beginners</Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </main>
    </div>
  );
};

export default Chatbot;
