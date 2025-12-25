import { useState, useCallback } from 'react';

interface UseSpeechSynthesisReturn {
  speak: (text: string, lang: 'en' | 'ar') => void;
  stop: () => void;
  isSpeaking: boolean;
  isSupported: boolean;
}

/**
 * Custom hook for Text-to-Speech functionality
 * Uses the Web Speech API to speak text in Arabic or English
 */
export function useSpeechSynthesis(): UseSpeechSynthesisReturn {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Check if browser supports Speech Synthesis
  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const speak = useCallback((text: string, lang: 'en' | 'ar') => {
    if (!isSupported) return;

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'ar' ? 'ar-SA' : 'en-US';
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1.0; // Normal pitch
    utterance.volume = 1.0; // Full volume

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [isSupported]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [isSupported]);

  return { speak, stop, isSpeaking, isSupported };
}
