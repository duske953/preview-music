import Artist from '@/app/components/Artist';
import DataNotFound from '@/app/components/DataNotFound';
import ErrorData from '@/app/components/ErrorData';
import SkeletonArtist from '@/app/components/skeletons/SkeletonArtists';
import fetcher from '@/app/utils/fetcher';
import useSWR from 'swr';

export default function SearchArtistsData({ query }: { query: string }) {
  const {
    data: searchArtistsData,
    isLoading,
    error,
  } = useSWR(`/search?query=${query}&type=artist`, fetcher);

  if (isLoading)
    return (
      <div className="grid grid-cols-5 gap-x-3 gap-y-10 md:grid-cols-2 xs:grid-cols-1">
        <SkeletonArtist size="size-40 lg:size-36 md:size-44" length={10} />
      </div>
    );

  if (error) return <ErrorData />;
  if (searchArtistsData.meta.returnedCount === 0) return <DataNotFound />;

  return (
    <section>
      <picture className="grid grid-cols-5 gap-y-10 gap-x-5 md:grid-cols-2 xs:grid-cols-1">
        {searchArtistsData?.search.data.artists.map((artist, i) => (
          <Artist
            index={i}
            key={artist.id}
            id={artist.id}
            name={artist.name}
            size="size-40"
          />
        ))}
      </picture>
    </section>
  );
}
