'use client';

import MusicItem from '@/app/components/MusicItem';
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
  } = useSWR<albumTypes>(`/album/${albumId}`, fetcher);
  if (error) return <ErrorData />;
  if (albumData?.error?.message === 'no data') return <DataNotFound />;
  return (
    <section className="grid grid-cols-2 gap-5 md:grid-cols-1">
      <AlbumDetailCover
        albumLoading={albumLoading}
        artistName={albumData?.artist?.name}
        imgSrc={albumData?.cover_xl || albumData?.cover_big}
      />
      {!albumLoading && albumData && (
        <AlbumTracks
          artistId={artistId}
          albumId={albumId}
          albumData={albumData}
        />
      )}
      {albumLoading && (
        <div className="py-4">
          <SkeletonMusicItem />
        </div>
      )}
    </section>
  );
}

function AlbumDetailCover({
  albumLoading,
  artistName,
  imgSrc,
}: {
  albumLoading: boolean;
  artistName: string;
  imgSrc?: string;
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
        src={imgError.error ? imgError.src : imgSrc || ''}
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
  albumData: albumTypes;
}) {
  const { handleActiveMusic } = useHandleActiveMusic();
  const {
    data,
    isLoading: trackLoading,
    error,
  } = useSWR<{
    data: trackTypes[];
    total: number;
  }>(`/album/${albumId}/tracks`, fetcher);

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
  if (data?.total <= 0) return <DataNotFound />;
  return (
    <div>
      <div className="flex flex-col gap-3 mb-4">
        {albumData?.explicit_lyrics && (
          <MdExplicit className="size-8 text-red-500 sm:self-center" />
        )}
        <h1 className="text-5xl">
          <Link href={`/artist/${artistId}`}>
            {truncText(albumData?.artist?.name, 25)}
          </Link>
        </h1>
        <p className="uppercase text-2xl text-blue-600 sm:text-lg">
          {albumData?.title}
        </p>
      </div>
      <div className="music-list-container gap-8 h-72 overflow-y-scroll disable-scrollbar">
        {data?.data?.map((track, i) => (
          <MusicItem
            index={i}
            key={track.title}
            artistName={track.artist.name}
            songName={track.title}
            imgSrc={albumData?.cover_xl || albumData?.cover_big}
            id={track.title}
            previewURL={track.preview}
            handleActiveMusic={(e) =>
              handleActiveMusic(e, {
                songName: track.title,
                artistName: track.artist.name,
                imgSrc: albumData?.cover_xl || albumData?.cover_big,
                previewURL: track.preview,
              })
            }
          />
        ))}
      </div>
    </div>
  );
}
