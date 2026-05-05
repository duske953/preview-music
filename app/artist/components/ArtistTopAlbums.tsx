import { useTopArtistAlbums } from '@/app/hooks/swr/useAlbums';
import MusicCard from '@/app/components/MusicCard';
import SkeletonCard from '@/app/components/skeletons/SkeletonCard';
import ErrorData from '@/app/components/ErrorData';

export function ArtistTopAlbums({ artistId }: { artistId: string }) {
  const { artistAlbumsData, artistAlbumsLoding, artistAlbumsError } = 
    useTopArtistAlbums(artistId, 20);

  if (artistAlbumsLoding)
    return (
      <div>
        <SkeletonCard length={8} />
      </div>
    );
  if (artistAlbumsError) return <ErrorData />;
  if (artistAlbumsData?.meta?.returnedCount === 0) return null;

  return (
    <section className="py-20">
      <h2 className="tertiary-heading">Top Albums</h2>
      <picture className="album-list-container">
        {artistAlbumsData?.albums.map((album, i) => (
          <MusicCard
            index={i}
            className="flex-1"
            albumId={album.id}
            key={album.id}
            imgSrc={album.images?.[0]?.url || ''}
            artistName={album.artistName}
            albumName={album.name}
            artistId={album.contributingArtists.primaryArtist}
          />
        ))}
      </picture>
    </section>
  );
}
