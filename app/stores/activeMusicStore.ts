import { create } from 'zustand';

interface activeMusicStore {
  active: boolean;
  id: null | string;
  bgPlay: boolean;
  paused: boolean;
  data: {
    imgSrc: string | null;
    songName: string | null;
    artistName: string | null;
    previewURL: string | null;
  };
}

export const useActiveMusicStore = create<{
  activeMusic: activeMusicStore;
  updateMusic: ({ active, id, bgPlay, paused, data }: activeMusicStore) => void;
}>((set) => ({
  activeMusic: {
    active: false,
    id: null,
    bgPlay: false,
    paused: true,
    data: { imgSrc: null, songName: null, artistName: null, previewURL: null },
  },
  updateMusic: ({ active, id, bgPlay, paused, data }: activeMusicStore) =>
    set((state) => ({
      activeMusic: { ...state.activeMusic, active, id, bgPlay, paused, data },
    })),
}));
