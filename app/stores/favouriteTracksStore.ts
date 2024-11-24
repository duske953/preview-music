import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface favouriteTracksTypes {
  artistName: string | null;
  songName: string | null;
  previewURL: string | null;
  imgSrc: string | null;
}

interface favouriteTracksStoreTypes {
  favouriteTracks: Array<favouriteTracksTypes>;
  storeFavouriteTrack: ({
    artistName,
    songName,
    previewURL,
  }: favouriteTracksTypes) => void;

  deleteFavouriteTrack: ({
    artistName,
    songName,
  }: Omit<favouriteTracksTypes, 'previewURL' | 'imgSrc'>) => void;
}

export const favouriteTracksStore = create<favouriteTracksStoreTypes>()(
  persist(
    (set, get) => ({
      favouriteTracks: [],
      storeFavouriteTrack: ({ artistName, songName, previewURL, imgSrc }) =>
        set({
          favouriteTracks: [
            ...get().favouriteTracks,
            { artistName, songName, previewURL, imgSrc },
          ],
        }),
      deleteFavouriteTrack: ({ artistName, songName }) =>
        set({
          favouriteTracks: [
            ...get().favouriteTracks.filter((details) => {
              return (
                details.artistName !== artistName ||
                details.songName !== songName
              );
            }),
          ],
        }),
    }),
    {
      name: 'favourite-tracks',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
