'use client';
import Artist from '@/app/components/Artist';
import DataNotFound from '@/app/components/DataNotFound';
import ErrorData from '@/app/components/ErrorData';
import SkeletonArtist from '@/app/components/skeletons/SkeletonArtists';
import { useTopArtists } from '@/app/hooks/swr/useArtists';

export default function PreviewTopArtists() {
  const { artistsData, artistsLoading, artistsError } = useTopArtists(9);
  if (artistsLoading)
    return (
      <div className="grid grid-cols-3 xs:grid-cols-1 gap-4">
        <SkeletonArtist length={9} size="xs:size-60" />
      </div>
    );
  if (artistsError) return <ErrorData />;
  if (!artistsData.meta || artistsData?.meta?.returnedCount === 0)
    return <DataNotFound />;
  return (
    <div>
      <h2 className="text-3xl mb-9 ">Trending Artists</h2>
      <picture className="grid grid-cols-3 gap-y-10 xs:grid-cols-1 xs:gap-y-16">
        {artistsData?.artists.map((artist, i) => (
          <Artist
            index={i}
            key={artist.name}
            id={artist.id}
            name={artist.name}
            size="size-20 xs:size-52"
          />
        ))}
      </picture>
    </div>
  );
}
