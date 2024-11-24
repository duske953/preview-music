import ButtonLoadData from '@/app/components/ButtonLoadData';
import DataNotFound from '@/app/components/DataNotFound';
import ErrorData from '@/app/components/ErrorData';
import MusicItem from '@/app/components/MusicItem';
import SkeletonMusicItem from '@/app/components/skeletons/SkeletonMusicItem';
import useHandleActiveMusic from '@/app/hooks/useHandleActiveMusic';
import { useInfinitePagination } from '@/app/hooks/useInfinitePagination';
import fetchImage from '@/app/utils/fetchImage';
import { trackTypes } from '@/app/utils/musicTypes';

export function searchTracksKey(pageIndex, previousPageData, query: string) {
  return () => {
    if (previousPageData && previousPageData.search.data.tracks.length === 0)
      return null;
    return `/search?query=${query}&offset=${
      pageIndex * 10
    }&per_type_limit=10&type=track`;
  };
}

export default function SearchTracksData({ query }: { query: string }) {
  const { handleActiveMusic } = useHandleActiveMusic();
  const { data, setSize, size, isValidating, isLoading, error } =
    useInfinitePagination<{
      search: { data: { tracks: Array<trackTypes> } };
      meta: { returnedCount: number };
    }>((pageIndex, previousPageData) =>
      searchTracksKey(pageIndex, previousPageData, query)
    );

  if (isLoading) return <SkeletonMusicItem length={5} />;
  if (error) return <ErrorData />;
  if (data[0].meta.returnedCount === 0) return <DataNotFound />;
  return (
    <section className="flex flex-col gap-10 mobile-container">
      {data?.map((tracksData, i) => (
        <div className="music-list-container" key={i}>
          {tracksData?.search.data.tracks.map((track, i) => (
            <MusicItem
              index={i}
              key={track.previewURL}
              imgSrc={fetchImage('artists', '633x422', track.artistId)}
              artistName={track.artistName}
              songName={track.name}
              previewURL={track.previewURL}
              handleActiveMusic={(e) =>
                handleActiveMusic(e, {
                  songName: track.name,
                  artistName: track.artistName,
                  imgSrc: fetchImage('artists', '633x422', track.artistId),
                  previewURL: track.previewURL,
                })
              }
              id={track.name}
            />
          ))}
        </div>
      ))}

      {isValidating && <SkeletonMusicItem length={3} />}
      <ButtonLoadData
        disabled={isValidating || data.slice(-1)[0].meta.returnedCount < 5}
        setSize={setSize}
        size={size}
      />
    </section>
  );
}
