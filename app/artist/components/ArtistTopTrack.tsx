import fetcher from '@/app/utils/fetcher';
import useSWR from 'swr';
import MusicItem from '@/app/components/MusicItem';
import useHandleActiveMusic from '@/app/hooks/useHandleActiveMusic';
import SkeletonMusicItem from '@/app/components/skeletons/SkeletonMusicItem';
import ErrorData from '@/app/components/ErrorData';
import { trackTypes } from '@/app/utils/musicTypes';
import DataNotFound from '@/app/components/DataNotFound';

export function ArtistTopTrack({ artistId }: { artistId: string }) {
  const {
    data: tracksData,
    isLoading,
    error,
  } = useSWR<{
    data: trackTypes[];
    total: number;
  }>(`/artist/${artistId}/top?limit=20`, fetcher);

  const { handleActiveMusic } = useHandleActiveMusic();

  if (isLoading)
    return (
      <div className="py-10">
        <SkeletonMusicItem length={8} />
      </div>
    );
  if (error) return <ErrorData />;
  if (tracksData?.total <= 0) return <DataNotFound />;

  return (
    <section>
      <h2 className="tertiary-heading pt-9">Top songs</h2>
      <div className="music-list-container">
        {tracksData?.data?.map((track, i) => (
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
    </section>
  );
}
