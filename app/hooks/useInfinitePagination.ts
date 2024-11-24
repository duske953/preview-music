import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';
import fetcher from '../utils/fetcher';

export function useInfinitePagination<T>(fetcherKey: SWRInfiniteKeyLoader) {
  const { data, size, setSize, isValidating, isLoading, error } =
    useSWRInfinite<T>(fetcherKey, fetcher, {
      revalidateOnFocus: false,
    });

  return { data, size, setSize, isValidating, isLoading, error };
}
