'use client';

import MusicItem from '@/app/components/MusicItem';
import { useInfinitePagination } from '@/app/hooks/useInfinitePagination';
import useHandleActiveMusic from '@/app/hooks/useHandleActiveMusic';
import ButtonLoadData from '@/app/components/ButtonLoadData';
import SkeletonMusicItem from '@/app/components/skeletons/SkeletonMusicItem';
import ErrorData from '@/app/components/ErrorData';
import DataNotFound from '@/app/components/DataNotFound';
import { trackTypes } from '@/app/utils/musicTypes';
export function topTracksKey(pageIndex, previousPageData) {
  if (previousPageData && previousPageData.data.length === 0) return null;
  return `/chart/0/tracks?index=${pageIndex * 10}&limit=10`;
}

export default function TopTracks() {
  const { data, isValidating, setSize, size, isLoading, error } =
    useInfinitePagination<{ data: trackTypes[]; total: number }>(topTracksKey);
  const { handleActiveMusic } = useHandleActiveMusic();

  if (isLoading) return <SkeletonMusicItem length={10} />;
  if (error) return <ErrorData />;
  if (!data || data[0]?.total <= 0) return <DataNotFound />;

  return (
    <div className="mobile-container">
      <div className="music-list-container ">
        {data?.map((pageData, i) => (
          <div className="music-list-container" key={i}>
            {pageData?.data?.map((track, i) => (
              <MusicItem
                index={i}
                key={track.id}
                imgSrc={track.album.cover_xl || track.album.cover_big}
                artistName={track.artist.name}
                songName={track.title}
                handleActiveMusic={(e) =>
                  handleActiveMusic(e, {
                    songName: track.title,
                    artistName: track.artist.name,
                    imgSrc: track.album.cover_xl || track.album.cover_big,
                    previewURL: track.preview,
                  })
                }
                id={track.title}
                previewURL={track.preview}
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
        disabled={isValidating || data.slice(-1)[0]?.data?.length < 10}
        setSize={setSize}
        size={size}
      />
    </div>
  );
}
