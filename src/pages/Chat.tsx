
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MicIcon, VolumeIcon } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI health assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        text: "Thank you for your question. Based on your health profile, I recommend consulting with a healthcare professional for personalized advice. In the meantime, maintaining a balanced diet and regular exercise can be beneficial.",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Health Assistant</h1>
          <p className="text-gray-600">Get personalized health recommendations and consultations</p>
        </div>

        <Card className="h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Health Chat</span>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <MicIcon className="h-4 w-4" />
                  <span className="ml-2">Voice</span>
                </Button>
                <Button size="sm" variant="outline">
                  <VolumeIcon className="h-4 w-4" />
                  <span className="ml-2">Listen</span>
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <form onSubmit={handleSendMessage} className="flex space-x-2 mt-4">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about your health, diet, or symptoms..."
                className="flex-1"
              />
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Send
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Quick Questions</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• "What should I eat for breakfast?"</li>
                <li>• "How many calories should I have?"</li>
                <li>• "Suggest exercises for me"</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Health Analysis</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Diet pattern analysis</li>
                <li>• Nutrition recommendations</li>
                <li>• Health facility suggestions</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Accessibility</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Voice commands supported</li>
                <li>• Text-to-speech available</li>
                <li>• Multiple languages</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;
