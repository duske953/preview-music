import ButtonLoadData from '@/app/components/ButtonLoadData';
import DataNotFound from '@/app/components/DataNotFound';
import ErrorData from '@/app/components/ErrorData';
import MusicItem from '@/app/components/MusicItem';
import SkeletonMusicItem from '@/app/components/skeletons/SkeletonMusicItem';
import useHandleActiveMusic from '@/app/hooks/useHandleActiveMusic';
import { useInfinitePagination } from '@/app/hooks/useInfinitePagination';
import { trackTypes } from '@/app/utils/musicTypes';

export function searchTracksKey(pageIndex, previousPageData, query: string) {
  return () => {
    if (previousPageData && previousPageData.data.length === 0) return null;
    return `/search/track?q=${query}&index=${pageIndex * 10}&limit=10`;
  };
}

export default function SearchTracksData({ query }: { query: string }) {
  const { handleActiveMusic } = useHandleActiveMusic();
  const { data, setSize, size, isValidating, isLoading, error } =
    useInfinitePagination<{ data: trackTypes[]; total: number }>(
      (pageIndex, previousPageData) =>
        searchTracksKey(pageIndex, previousPageData, query),
    );

  if (isLoading) return <SkeletonMusicItem length={5} />;
  if (error) return <ErrorData />;
  if (!data || data[0]?.total <= 0) return <DataNotFound />;
  return (
    <section className="flex flex-col gap-10 mobile-container">
      {data?.map((pageData, i) => (
        <div className="music-list-container" key={i}>
          {pageData?.data.map((track, i) => (
            <MusicItem
              index={i}
              key={track.id}
              imgSrc={track.album.cover_xl || track.album.cover_big}
              artistName={track.artist.name}
              songName={track.title}
              previewURL={track.preview}
              handleActiveMusic={(e) =>
                handleActiveMusic(e, {
                  songName: track.title,
                  artistName: track.artist.name,
                  imgSrc: track.album.cover_xl || track.album.cover_big,
                  previewURL: track.preview,
                })
              }
              id={track.title}
            />
          ))}
        </div>
      ))}

      {isValidating && <SkeletonMusicItem length={3} />}
      <ButtonLoadData
        disabled={isValidating || data.slice(-1)[0]?.data?.length < 10}
        setSize={setSize}
        size={size}
      />
    </section>
  );
}
