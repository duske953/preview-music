'use client';
import DataNotFound from '@/app/components/DataNotFound';
import ErrorData from '@/app/components/ErrorData';
import MusicItem from '@/app/components/MusicItem';
import SkeletonMusicItem from '@/app/components/skeletons/SkeletonMusicItem';
import { useTopTracks } from '@/app/hooks/swr/useTracks';
import useHandleActiveMusic from '@/app/hooks/useHandleActiveMusic';
import fetchImage from '@/app/utils/fetchImage';
import Link from 'next/link';

export default function PreviewTopTracks() {
  const { tracksData, tracksLoading, tracksError } = useTopTracks();
  const { handleActiveMusic } = useHandleActiveMusic();
  if (tracksLoading) return <SkeletonMusicItem />;
  if (tracksError) return <ErrorData />;
  if (!tracksData.meta || tracksData?.meta?.returnedCount === 0)
    return <DataNotFound />;
  return (
    <div className="">
      <div className="mb-9 flex items-center justify-between">
        <h2 className="secodary-heading">Trending Songs</h2>
        <Link className="text-blue-600" href="/top-tracks">
          See all
        </Link>
      </div>

      <div>
        <div className="flex flex-col gap-5">
          {tracksData?.tracks.map((track, i) => (
            <MusicItem
              index={i}
              key={track.name}
              imgSrc={fetchImage('artists', '633x422', track.artistId)}
              artistName={track.artistName}
              songName={track.name}
              handleActiveMusic={(e) =>
                handleActiveMusic(e, {
                  songName: track.name,
                  artistName: track.artistName,
                  imgSrc: fetchImage('artists', '633x422', track.artistId),
                  previewURL: track.previewURL,
                })
              }
              id={track.name}
              previewURL={track.previewURL}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
