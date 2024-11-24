import fetcher from '@/app/utils/fetcher';
import { trackTypes } from '@/app/utils/musicTypes';
import useSWR from 'swr';

export function useTopTracks(limit: number = 5, offset: number = 5) {
  const {
    data: tracksData,
    error: tracksError,
    isLoading: tracksLoading,
  } = useSWR<{
    tracks: Array<trackTypes>;
    meta: { returnedCount: number };
  }>(`/tracks/top?limit=${limit}&offset=${offset}&range=day`, fetcher, {
    revalidateOnFocus: false,
  });
  return { tracksData, tracksError, tracksLoading };
}
