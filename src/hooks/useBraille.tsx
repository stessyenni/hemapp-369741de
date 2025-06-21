
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

// Braille character mapping
const brailleMap: { [key: string]: string } = {
  'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛', 'h': '⠓', 
  'i': '⠊', 'j': '⠚', 'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕', 'p': '⠏',
  'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞', 'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭',
  'y': '⠽', 'z': '⠵', ' ': '⠀', '1': '⠼⠁', '2': '⠼⠃', '3': '⠼⠉', '4': '⠼⠙',
  '5': '⠼⠑', '6': '⠼⠋', '7': '⠼⠛', '8': '⠼⠓', '9': '⠼⠊', '0': '⠼⠚',
  '.': '⠲', ',': '⠂', '?': '⠦', '!': '⠖', ':': '⠒', ';': '⠆', '-': '⠤'
};

// Reverse mapping for Braille to text
const reverseBrailleMap: { [key: string]: string } = {};
Object.keys(brailleMap).forEach(key => {
  reverseBrailleMap[brailleMap[key]] = key;
});

export const useBraille = () => {
  const [brailleOutput, setBrailleOutput] = useState('');

  const textToBraille = useCallback((text: string): string => {
    return text.toLowerCase().split('').map(char => brailleMap[char] || char).join('');
  }, []);

  const brailleToText = useCallback((braille: string): string => {
    return braille.split('').map(char => reverseBrailleMap[char] || char).join('');
  }, []);

  const convertAndSet = useCallback((text: string) => {
    const converted = textToBraille(text);
    setBrailleOutput(converted);
    return converted;
  }, [textToBraille]);

  const announceForScreenReader = useCallback((text: string) => {
    // Create an aria-live region for screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    
    document.body.appendChild(announcement);
    announcement.textContent = text;
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, []);

  return {
    brailleOutput,
    textToBraille,
    brailleToText,
    convertAndSet,
    announceForScreenReader,
    setBrailleOutput
  };
};
