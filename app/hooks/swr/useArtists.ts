import fetcher from '@/app/utils/fetcher';
import useSWR from 'swr';

interface artistsType {
  id: string;
  name: string;
}

export function useTopArtists(limit: number = 5, offset: number = 5) {
  const {
    data: artistsData,
    error: artistsError,
    isLoading: artistsLoading,
  } = useSWR<{
    artists: Array<artistsType>;
    meta: { returnedCount: number };
  }>(`/artists/top?limit=${limit}&offset=${offset}`, fetcher, {
    revalidateOnFocus: false,
  });

  return { artistsData, artistsError, artistsLoading };
}
