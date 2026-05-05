import fetcher from '@/app/utils/fetcher';
import { trackTypes } from '@/app/utils/musicTypes';
import useSWR from 'swr';

export function useTopTracks(limit: number = 5, offset: number = 0) {
  const {
    data,
    error: tracksError,
    isLoading: tracksLoading,
  } = useSWR<{ data: trackTypes[]; total: number }>(
    `/chart/0/tracks?limit=${limit}&index=${offset}`,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );

  const tracksData = data?.data
    ? {
        tracks: data.data.map((item) => ({
          name: item.title,
          previewURL: item.preview,
          artistId: item.artist.id.toString(),
          artistName: item.artist.name,
          album: {
            images: [
              {
                url:
                  item.album.cover_xl ||
                  item.album.cover_big ||
                  item.album.cover_medium,
              },
            ],
          },
        })),
        meta: { returnedCount: data.data.length },
      }
    : { tracks: [], meta: { returnedCount: 0 } };

  return { tracksData, tracksError, tracksLoading };
}
