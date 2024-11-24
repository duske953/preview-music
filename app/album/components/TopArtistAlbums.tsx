'use client';
import ErrorData from '@/app/components/ErrorData';
import MusicCard from '@/app/components/MusicCard';
import SkeletonCard from '@/app/components/skeletons/SkeletonCard';
import { useTopAlbums, useTopArtistAlbums } from '@/app/hooks/swr/useAlbums';
import { imgServer } from '@/app/utils/fetcher';

export default function TopArtistsAlbums({ artistId }: { artistId: string }) {
  const { artistAlbumsData, artistAlbumsLoding, artistAlbumsError } =
    useTopArtistAlbums(artistId, 15);
  const { albumsData } = useTopAlbums(15, 30);
  function selectAlbumsData() {
    if (artistAlbumsData.albums.length === 0) return albumsData;
    return artistAlbumsData;
  }
  if (artistAlbumsLoding) return <SkeletonCard length={5} />;
  if (artistAlbumsError) return <ErrorData />;
  // if (artistAlbumsData?.meta?.returnedCount === 0) return <DataNotFound />;
  return (
    <picture className="album-list-container">
      {selectAlbumsData()?.albums.map((album, i) => (
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
  );
}
