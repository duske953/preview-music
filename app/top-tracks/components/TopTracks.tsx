'use client';

import MusicItem from '@/app/components/MusicItem';
import { useInfinitePagination } from '@/app/hooks/useInfinitePagination';
import fetchImage from '@/app/utils/fetchImage';
import useHandleActiveMusic from '@/app/hooks/useHandleActiveMusic';
import ButtonLoadData from '@/app/components/ButtonLoadData';
import SkeletonMusicItem from '@/app/components/skeletons/SkeletonMusicItem';
import { trackTypes } from '@/app/utils/musicTypes';
import ErrorData from '@/app/components/ErrorData';
import DataNotFound from '@/app/components/DataNotFound';
export function topTracksKey(pageIndex, previousPageData) {
  if (previousPageData && previousPageData.tracks.length === 0) return null;
  return `/tracks/top?offset=${pageIndex * 10}&limit=10`;
}

export default function TopTracks() {
  const { data, isValidating, setSize, size, isLoading, error } =
    useInfinitePagination<{
      tracks: Array<trackTypes>;
      meta: { returnedCount: number };
    }>(topTracksKey);
  const { handleActiveMusic } = useHandleActiveMusic();

  if (isLoading) return <SkeletonMusicItem length={10} />;
  if (error) return <ErrorData />;
  if (data[0].meta.returnedCount === 0) return <DataNotFound />;

  return (
    <div>
      <div className="music-list-container">
        {data?.map((tracksData, i) => (
          <div className="music-list-container" key={i}>
            {tracksData?.tracks?.map((track, i) => (
              <MusicItem
                index={i}
                key={track.previewURL}
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
        ))}
      </div>

      {isValidating && (
        <div className="mt-7">
          <SkeletonMusicItem length={5} />
        </div>
      )}
      <ButtonLoadData
        disabled={isValidating || data.slice(-1)[0].meta.returnedCount < 5}
        setSize={setSize}
        size={size}
      />
    </div>
  );
}
