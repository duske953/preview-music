import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface playlistTypes {
  playlist: Array<{ playlist: string; tracks: [] }>;
}

export const playlistStore = create<playlistTypes>()(
  persist(
    () => ({
      playlist: [],
    }),
    {
      name: 'playlists',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
