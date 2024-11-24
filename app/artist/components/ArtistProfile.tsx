'use client';
import fetcher from '@/app/utils/fetcher';
import useSWR from 'swr';
import { AboutArtist } from './AboutArtist';
import { ArtistTopTrack } from './ArtistTopTrack';
import { ArtistTopAlbums } from './ArtistTopAlbums';
import { ArtistBgCover } from './ArtistBgCover';
import ErrorData from '@/app/components/ErrorData';
import DataNotFound from '@/app/components/DataNotFound';

export default function ArtistProfile({ artistId }: { artistId: string }) {
  const {
    data: artistData,
    isLoading,
    error,
  } = useSWR(`/artists/${artistId}`, fetcher);

  const artistName = artistData?.artists?.[0]?.name;
  const description = artistData?.artists?.[0]?.bios?.[0].bio;

  if (error) return <ErrorData />;
  if (artistData?.meta?.returnedCount === 0) return <DataNotFound />;
  return (
    <>
      <ArtistBgCover artistId={artistId} artistName={artistName} />
      <ArtistTopTrack artistId={artistId} />
      <ArtistTopAlbums artistId={artistId} />
      {description && (
        <AboutArtist
          artistName={artistName}
          descrtiption={description}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
