
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MicIcon, VolumeIcon } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [speechToText, setSpeechToText] = useState(false);
  const [textToSpeech, setTextToSpeech] = useState(false);
  const [brailleSupport, setBrailleSupport] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [language, setLanguage] = useState("en");
  const [offlineMode, setOfflineMode] = useState(false);

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully!");
  };

  const testSpeechToText = () => {
    toast.info("Speech-to-text feature will be available soon!");
  };

  const testTextToSpeech = () => {
    toast.info("Text-to-speech feature will be available soon!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Customize your HemApp experience and accessibility features</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Accessibility Features</CardTitle>
              <CardDescription>
                Enable assistive technologies for better accessibility
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MicIcon className="h-5 w-5 text-blue-600" />
                  <div>
                    <Label htmlFor="speech-to-text" className="text-sm font-medium">
                      Speech-to-Text
                    </Label>
                    <p className="text-xs text-gray-600">Convert voice to text input</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="speech-to-text"
                    checked={speechToText}
                    onCheckedChange={setSpeechToText}
                  />
                  <Button size="sm" variant="outline" onClick={testSpeechToText}>
                    Test
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <VolumeIcon className="h-5 w-5 text-green-600" />
                  <div>
                    <Label htmlFor="text-to-speech" className="text-sm font-medium">
                      Text-to-Speech
                    </Label>
                    <p className="text-xs text-gray-600">Read text content aloud</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="text-to-speech"
                    checked={textToSpeech}
                    onCheckedChange={setTextToSpeech}
                  />
                  <Button size="sm" variant="outline" onClick={testTextToSpeech}>
                    Test
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">⠃</span>
                  <div>
                    <Label htmlFor="braille-support" className="text-sm font-medium">
                      Braille Support
                    </Label>
                    <p className="text-xs text-gray-600">Enable Braille display compatibility</p>
                  </div>
                </div>
                <Switch
                  id="braille-support"
                  checked={brailleSupport}
                  onCheckedChange={setBrailleSupport}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">👁</span>
                  <div>
                    <Label htmlFor="screen-reader" className="text-sm font-medium">
                      Screen Reader
                    </Label>
                    <p className="text-xs text-gray-600">Enhanced screen reader support</p>
                  </div>
                </div>
                <Switch
                  id="screen-reader"
                  checked={screenReader}
                  onCheckedChange={setScreenReader}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure language and app preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="language" className="text-sm font-medium">
                  Language
                </Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="zh">中文</SelectItem>
                    <SelectItem value="ar">العربية</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="offline-mode" className="text-sm font-medium">
                    Offline Mode
                  </Label>
                  <p className="text-xs text-gray-600 mt-1">
                    Cache data for offline access
                  </p>
                </div>
                <Switch
                  id="offline-mode"
                  checked={offlineMode}
                  onCheckedChange={setOfflineMode}
                />
              </div>

              <Button onClick={handleSaveSettings} className="w-full bg-green-600 hover:bg-green-700">
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Feature Status</CardTitle>
            <CardDescription>
              Current implementation status of HemApp features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Authentication</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Ready</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Diet Monitoring</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Ready</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Goals Tracking</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Ready</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">AI Chatbot</span>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Basic</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Google Maps</span>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Planned</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Speech-to-Text</span>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Planned</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Text-to-Speech</span>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Planned</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Offline Mode</span>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Planned</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
