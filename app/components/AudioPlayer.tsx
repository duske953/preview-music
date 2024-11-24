'use client';

import { RefObject, forwardRef } from 'react';
import { useActiveMusicStore } from '../stores/activeMusicStore';
import { toast } from 'react-toastify';
const AudioPlayer = forwardRef(function AudioPlayer(
  { previewUrl }: { previewUrl: string },
  ref: RefObject<HTMLAudioElement>
) {
  const activeMusic = useActiveMusicStore((state) => state.activeMusic);
  const updateActiveMusic = useActiveMusicStore((state) => state.updateMusic);

  return (
    activeMusic.active && (
      <audio
        onEnded={() => updateActiveMusic({ ...activeMusic, paused: true })}
        onError={() => {
          toast('Something went wrong', {
            toastId: 'audio-player',
            type: 'error',
          });
        }}
        key="audio"
        autoPlay
        ref={ref}
        src={previewUrl}
      />
    )
  );
});

export default AudioPlayer;
