
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MicIcon, VolumeIcon, SettingsIcon } from 'lucide-react';
import { useSpeechToText, useTextToSpeech } from '@/hooks/useSpeech';
import { useBraille } from '@/hooks/useBraille';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AccessibilityToolbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  
  const { isListening, transcript, startListening, stopListening, clearTranscript } = useSpeechToText();
  const { speaking, speak, stopSpeaking } = useTextToSpeech();
  const { brailleOutput, convertAndSet, announceForScreenReader } = useBraille();

  const languages = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'es-ES', name: 'Español' },
    { code: 'fr-FR', name: 'Français' },
    { code: 'de-DE', name: 'Deutsch' },
    { code: 'it-IT', name: 'Italiano' },
    { code: 'pt-PT', name: 'Português' },
    { code: 'zh-CN', name: '中文' },
    { code: 'ja-JP', name: '日本語' },
    { code: 'ko-KR', name: '한국어' },
    { code: 'ar-SA', name: 'العربية' }
  ];

  const handleSpeechToText = () => {
    if (isListening) {
      stopListening(undefined);
    } else {
      clearTranscript();
      startListening();
    }
  };

  const handleTextToSpeech = () => {
    if (speaking) {
      stopSpeaking();
    } else if (textInput.trim()) {
      speak(textInput, selectedLanguage);
    }
  };

  const handleBrailleConversion = () => {
    if (textInput.trim()) {
      const braille = convertAndSet(textInput);
      announceForScreenReader(`Converted to Braille: ${braille}`);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-12 h-12 bg-blue-600 hover:bg-blue-700"
          aria-label="Open accessibility toolbar"
        >
          <SettingsIcon className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 max-h-96 overflow-y-auto">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Accessibility Tools</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              aria-label="Close accessibility toolbar"
            >
              ×
            </Button>
          </div>

          <div className="space-y-4">
            {/* Language Selection */}
            <div>
              <Label htmlFor="language-select">Language</Label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Text Input */}
            <div>
              <Label htmlFor="text-input">Text Input</Label>
              <Input
                id="text-input"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Enter text for speech or Braille..."
              />
            </div>

            {/* Speech-to-Text */}
            <div className="flex items-center justify-between">
              <span className="text-sm">Speech-to-Text</span>
              <Button
                size="sm"
                variant={isListening ? "destructive" : "default"}
                onClick={handleSpeechToText}
                aria-label={isListening ? "Stop listening" : "Start listening"}
              >
                <MicIcon className="h-4 w-4 mr-1" />
                {isListening ? 'Stop' : 'Listen'}
              </Button>
            </div>

            {/* Display transcript */}
            {transcript && (
              <div className="text-sm bg-gray-100 p-2 rounded">
                <strong>Transcript:</strong> {transcript}
              </div>
            )}

            {/* Text-to-Speech */}
            <div className="flex items-center justify-between">
              <span className="text-sm">Text-to-Speech</span>
              <Button
                size="sm"
                variant={speaking ? "destructive" : "default"}
                onClick={handleTextToSpeech}
                disabled={!textInput.trim()}
                aria-label={speaking ? "Stop speaking" : "Start speaking"}
              >
                <VolumeIcon className="h-4 w-4 mr-1" />
                {speaking ? 'Stop' : 'Speak'}
              </Button>
            </div>

            {/* Braille Conversion */}
            <div className="flex items-center justify-between">
              <span className="text-sm">Braille</span>
              <Button
                size="sm"
                onClick={handleBrailleConversion}
                disabled={!textInput.trim()}
                aria-label="Convert to Braille"
              >
                ⠃ Convert
              </Button>
            </div>

            {/* Display Braille */}
            {brailleOutput && (
              <div className="text-sm bg-gray-100 p-2 rounded">
                <strong>Braille:</strong>
                <div className="font-mono text-lg mt-1" aria-label={`Braille output: ${brailleOutput}`}>
                  {brailleOutput}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessibilityToolbar;
