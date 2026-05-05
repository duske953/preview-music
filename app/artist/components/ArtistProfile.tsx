'use client';
import fetcher from '@/app/utils/fetcher';
import useSWR from 'swr';
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
  } = useSWR(`/artist/${artistId}`, fetcher);

  const artistName = artistData?.name;
  const imgSrc = artistData?.picture_xl || artistData?.picture_big;

  if (error) return <ErrorData />;
  if (artistData?.error?.type === 'DataNotFound') return <DataNotFound />;
  return (
    <>
      <ArtistBgCover
        artistName={artistName}
        imgSrc={imgSrc}
        isLoading={isLoading}
      />
      <ArtistTopTrack artistId={artistId} />
      <ArtistTopAlbums artistId={artistId} />
    </>
  );
}
