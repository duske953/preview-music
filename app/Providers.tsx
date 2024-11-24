'use client';
import { createContext, useRef } from 'react';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import AudioPlayer from './components/AudioPlayer';
import { useActiveMusicStore } from './stores/activeMusicStore';
export const AudioPlayerContext = createContext(null);
export default function Provider({ children }: { children: React.ReactNode }) {
  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const activeMusic = useActiveMusicStore((state) => state.activeMusic);

  return (
    <AudioPlayerContext.Provider value={audioPlayerRef}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
        forcedTheme="dark"
      >
        {children}
      </NextThemesProvider>
      <AudioPlayer
        ref={audioPlayerRef}
        previewUrl={activeMusic.data.previewURL}
      />
    </AudioPlayerContext.Provider>
  );
}
