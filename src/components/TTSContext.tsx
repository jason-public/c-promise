import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

type TTSContextType = {
  isSpeaking: boolean;
  currentTitle: string | null;
  toggleTTS: (title: string, text: string) => void;
  stopTTS: () => void;
};

const TTSContext = createContext<TTSContextType | undefined>(undefined);

export function TTSProvider({ children }: { children: ReactNode }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentTitle, setCurrentTitle] = useState<string | null>(null);

  const stopTTS = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setCurrentTitle(null);
  }, []);

  const toggleTTS = useCallback((title: string, text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('이 브라우저는 음성 낭독 기능을 지원하지 않습니다.');
      return;
    }

    if (isSpeaking && currentTitle === title) {
      stopTTS();
      return;
    }

    // Stop currently speaking
    window.speechSynthesis.cancel();

    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 1.1; // Slightly faster for reading
      
      utterance.onstart = () => {
        setIsSpeaking(true);
        setCurrentTitle(title);
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
        setCurrentTitle(null);
      };
      
      utterance.onerror = (e) => {
         if (e.error !== 'canceled' && e.error !== 'interrupted') {
             setIsSpeaking(false);
             setCurrentTitle(null);
         }
      };

      window.speechSynthesis.speak(utterance);
    }, 50);
  }, [isSpeaking, currentTitle, stopTTS]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <TTSContext.Provider value={{ isSpeaking, currentTitle, toggleTTS, stopTTS }}>
      {children}
    </TTSContext.Provider>
  );
}

export function useTTS() {
  const context = useContext(TTSContext);
  if (context === undefined) {
    throw new Error('useTTS must be used within a TTSProvider');
  }
  return context;
}
