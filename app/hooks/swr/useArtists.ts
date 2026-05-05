import fetcher from '@/app/utils/fetcher';
import { artistsType } from '@/app/utils/musicTypes';
import useSWR from 'swr';

export function useTopArtists(limit: number = 5, offset: number = 0) {
  const {
    data,
    error: artistsError,
    isLoading: artistsLoading,
  } = useSWR<{ data: artistsType[]; total: number }>(
    `/chart/0/artists?limit=${limit}&index=${offset}`,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );

  const artistsData = data?.data
    ? {
        artists: data.data.map((item) => ({
          id: item.id.toString(),
          name: item.name,
          images: [
            { url: item.picture_xl || item.picture_big || item.picture_medium },
          ],
        })),
        meta: { returnedCount: data.data.length },
      }
    : { artists: [], meta: { returnedCount: 0 } };

  return { artistsData, artistsError, artistsLoading };
}
