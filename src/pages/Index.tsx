
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { TargetIcon, MessageSquareIcon, MapIcon, MicIcon, VolumeIcon } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Diet Monitoring",
      description: "Track your daily nutrition and upload diet photos for AI analysis",
      icon: <TargetIcon className="h-8 w-8 text-green-600" />,
      action: () => navigate("/diet"),
    },
    {
      title: "AI Health Chat",
      description: "Get personalized health consultations and recommendations",
      icon: <MessageSquareIcon className="h-8 w-8 text-blue-600" />,
      action: () => navigate("/chat"),
    },
    {
      title: "Health Facilities",
      description: "Find nearby hospitals and clinics on interactive maps",
      icon: <MapIcon className="h-8 w-8 text-red-600" />,
      action: () => navigate("/maps"),
    },
    {
      title: "Voice Assistant",
      description: "Speech-to-text and text-to-speech for accessibility",
      icon: <MicIcon className="h-8 w-8 text-purple-600" />,
      action: () => navigate("/settings"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to HemApp
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Your comprehensive health and diet monitoring companion
          </p>
          <Button 
            onClick={() => navigate("/auth")} 
            size="lg"
            className="bg-green-600 hover:bg-green-700"
          >
            Get Started
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={feature.action}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  {feature.icon}
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Accessibility Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center space-y-2">
                <MicIcon className="h-6 w-6 text-blue-600" />
                <span className="font-medium">Speech-to-Text</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <VolumeIcon className="h-6 w-6 text-green-600" />
                <span className="font-medium">Text-to-Speech</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <span className="text-2xl">⠃</span>
                <span className="font-medium">Braille Support</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
