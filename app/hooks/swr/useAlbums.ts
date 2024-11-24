import fetcher from '@/app/utils/fetcher';
import { albumTypes } from '@/app/utils/musicTypes';
import useSWR from 'swr';

export function useTopAlbums(limit: number = 5, offset: number = 5) {
  const {
    data: albumsData,
    error: albumsError,
    isLoading: albumsLoading,
  } = useSWR<{
    albums: Array<albumTypes>;
    meta: { returnedCount: number };
  }>(`/albums/top?limit=${limit}&offset=${offset}&range=day`, fetcher);
  return { albumsData, albumsError, albumsLoading };
}

export function useTopArtistAlbums(
  id: string,
  limit: number = 5,
  offset: number = 5
) {
  const {
    data: artistAlbumsData,
    error: artistAlbumsError,
    isLoading: artistAlbumsLoding,
  } = useSWR<{
    albums: Array<albumTypes>;
    meta: { returnedCount: number };
  }>(`/artists/${id}/albums/top?limit=${limit}&offset=${offset}`, fetcher, {
    revalidateOnFocus: false,
  });
  return { artistAlbumsData, artistAlbumsError, artistAlbumsLoding };
}
