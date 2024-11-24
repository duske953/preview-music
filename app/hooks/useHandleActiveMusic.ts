import { MouseEvent, useContext } from 'react';
import { useActiveMusicStore } from '../stores/activeMusicStore';
import { AudioPlayerContext } from '../Providers';

export default function useHandleActiveMusic() {
  const activeMusic = useActiveMusicStore((state) => state.activeMusic);
  const updateActiveMusic = useActiveMusicStore((state) => state.updateMusic);
  const audioPlayerRef = useContext(AudioPlayerContext);
  function handleActiveMusic(e: MouseEvent<HTMLDivElement>, data) {
    //id === name of song
    const likeBtn = (e.target as HTMLElement).closest('.like-btn');
    if (likeBtn) return;
    const isMusicActive = data.songName === activeMusic.id;
    if (isMusicActive) audioPlayerRef.current.currentTime = 0;
    updateActiveMusic({
      active: true,
      id: data.songName,
      bgPlay: false,
      paused: isMusicActive ? activeMusic.paused : false,
      data,
    });
  }
  return { handleActiveMusic };
}
