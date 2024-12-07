import fetcher, { imgServer } from '@/app/utils/fetcher';
import useSWR from 'swr';
import { albumTypes } from '@/app/utils/musicTypes';
import MusicCard from '@/app/components/MusicCard';
import SkeletonCard from '@/app/components/skeletons/SkeletonCard';
import ErrorData from '@/app/components/ErrorData';

export function ArtistTopAlbums({ artistId }: { artistId: string }) {
  const {
    data: albumData,
    isLoading,
    error,
  } = useSWR<{
    albums: Array<albumTypes>;
    meta: { returnedCount: number };
  }>(`/artists/${artistId}/albums/top?limit=20`, fetcher);

  if (isLoading)
    return (
      <div>
        <SkeletonCard length={8} />
      </div>
    );
  if (error) return <ErrorData />;
  if (albumData?.meta?.returnedCount === 0) return null;

  return (
    <section className="py-20">
      <h2 className="tertiary-heading">Top Albums</h2>
      <picture className="album-list-container">
        {albumData?.albums.map((album, i) => (
          <MusicCard
            index={i}
            className="flex-1"
            albumId={album.id}
            key={album.id}
            imgSrc={`${imgServer}/albums/${album.id}/images/500x500.jpg`}
            artistName={album.artistName}
            albumName={album.name}
            artistId={album.contributingArtists.primaryArtist.split('art.')[1]}
          />
        ))}
      </picture>
    </section>
  );
}
