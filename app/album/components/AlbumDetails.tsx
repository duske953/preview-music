'use client';

import MusicItem from '@/app/components/MusicItem';
import fetchImage from '@/app/utils/fetchImage';
import fetcher from '@/app/utils/fetcher';
import Image from 'next/image';
import useSWR from 'swr';
import useHandleActiveMusic from '@/app/hooks/useHandleActiveMusic';
import { MdExplicit } from 'react-icons/md';
import { Skeleton } from '@/app/components/ui/skeleton';
import SkeletonMusicItem from '@/app/components/skeletons/SkeletonMusicItem';
import { albumTypes, trackTypes } from '@/app/utils/musicTypes';
import useErrorImg from '@/app/hooks/useErrorImg';
import truncText from '@/app/utils/truncText';
import ErrorData from '@/app/components/ErrorData';
import DataNotFound from '@/app/components/DataNotFound';
import Link from 'next/link';
export default function AlbumDetails({
  albumId,
  artistId,
}: {
  albumId: string;
  artistId: string;
}) {
  const {
    data: albumData,
    isLoading: albumLoading,
    error,
  } = useSWR<{
    albums: Array<albumTypes>;
    meta: { returnedCount: number };
    code: string;
  }>(`/albums/${albumId}`, fetcher);
  if (error) return <ErrorData />;
  if (
    albumData?.meta?.returnedCount === 0 ||
    albumData?.code === 'InvalidContent'
  )
    return <DataNotFound />;
  return (
    <section className="grid grid-cols-2 gap-5 md:grid-cols-1">
      <AlbumDetailCover
        albumId={albumId}
        albumLoading={albumLoading}
        artistName={albumData?.albums?.[0].artistName}
      />
      <AlbumTracks
        artistId={artistId}
        albumId={albumId}
        albumData={albumData}
      />
    </section>
  );
}

function AlbumDetailCover({
  albumId,
  albumLoading,
  artistName,
}: {
  albumId: string;
  albumLoading: boolean;
  artistName: string;
}) {
  const { handleErrorImg, imgError } = useErrorImg();
  if (albumLoading)
    return (
      <div className="flex justify-center">
        <Skeleton className="size-full md:size-[19rem] px-5" />
      </div>
    );
  return (
    <div className="flex justify-center">
      <Image
        className="rounded-xl w-full md:object-cover"
        width={1000}
        height={1000}
        src={
          imgError.error
            ? imgError.src
            : fetchImage('albums', '500x500', albumId)
        }
        onError={handleErrorImg}
        alt={`Artist-${artistName}`}
      />
    </div>
  );
}

function AlbumTracks({
  albumId,
  albumData,
  artistId,
}: {
  albumId: string;
  artistId: string;
  albumData: { albums: Array<albumTypes> };
}) {
  const { handleActiveMusic } = useHandleActiveMusic();
  const {
    data,
    isLoading: trackLoading,
    error,
  } = useSWR<{
    tracks: Array<trackTypes>;
    meta: { returnedCount: number };
  }>(`/albums/${albumId}/tracks`, fetcher);
  if (trackLoading)
    return (
      <section>
        <div className="flex flex-col gap-3">
          <Skeleton className="size-8" />
          <Skeleton className="w-44 h-4" />
          <Skeleton className="w-10 h-4" />
        </div>

        <div className="py-4">
          <SkeletonMusicItem />
        </div>
      </section>
    );
  if (error) return <ErrorData />;
  if (data?.meta?.returnedCount === 0) return <DataNotFound />;
  return (
    <div>
      <div className="flex flex-col gap-3 mb-4">
        {!albumData?.albums[0].isExplicit && (
          <MdExplicit className="size-8 text-red-500 sm:self-center" />
        )}
        <h1 className="text-5xl">
          <Link href={`/artist/${artistId}`}>
            {truncText(albumData?.albums[0]?.artistName, 25)}
          </Link>
        </h1>
        <p className="uppercase text-2xl text-blue-600 sm:text-lg">
          {albumData?.albums[0].name}
        </p>
      </div>
      <div className="music-list-container gap-8 h-72 overflow-y-scroll disable-scrollbar">
        {data.tracks.map((track, i) => (
          <MusicItem
            index={i}
            key={track.name}
            artistName={track.artistName}
            songName={track.name}
            imgSrc={fetchImage('artists', '633x422', track.artistId)}
            id={track.name}
            previewURL={track.previewURL}
            handleActiveMusic={(e) =>
              handleActiveMusic(e, {
                songName: track.name,
                artistName: track.artistName,
                imgSrc: fetchImage('artists', '633x422', track.artistId),
                previewURL: track.previewURL,
              })
            }
          />
        ))}
      </div>
    </div>
  );
}
