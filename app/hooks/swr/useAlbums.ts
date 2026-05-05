import fetcher from '@/app/utils/fetcher';
import { albumTypes } from '@/app/utils/musicTypes';
import useSWR from 'swr';

export function useTopAlbums(limit: number = 5) {
  const {
    data,
    error: albumsError,
    isLoading: albumsLoading,
  } = useSWR<{ data: albumTypes[]; total: number }>(
    `/editorial/0/releases?limit=${limit}`,
    fetcher,
  );
  const albumsData = data?.data
    ? {
        albums: data.data.map((item) => ({
          id: item.id.toString(),
          name: item.title,
          artistName: item.artist.name,
          images: [
            { url: item.cover_xl || item.cover_big || item.cover_medium },
          ],
          contributingArtists: {
            primaryArtist: `${item.artist.id}`,
          },
        })),
        meta: { returnedCount: data.data.length },
      }
    : { albums: [], meta: { returnedCount: 0 } };

  return { albumsData, albumsError, albumsLoading };
}

export function useTopArtistAlbums(
  id: string,
  limit: number = 5,
  offset: number = 0,
) {
  const {
    data,
    error: artistAlbumsError,
    isLoading: artistAlbumsLoding,
  } = useSWR<{ data: albumTypes[]; total: number }>(
    `/artist/${id}/albums?limit=${limit}&index=${offset}`,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );

  const artistAlbumsData = data?.data
    ? {
        albums: data.data.map((item) => ({
          id: item.id.toString(),
          name: item.title,
          artistName: '', // Artist name is usually not in the album list for a specific artist
          images: [
            { url: item.cover_xl || item.cover_big || item.cover_medium },
          ],
          contributingArtists: {
            primaryArtist: `${id}`,
          },
        })),
        meta: { returnedCount: data.data.length },
      }
    : { albums: [], meta: { returnedCount: 0 } };

  return { artistAlbumsData, artistAlbumsError, artistAlbumsLoding };
}
