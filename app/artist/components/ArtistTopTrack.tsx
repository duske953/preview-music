import fetchImage from '@/app/utils/fetchImage';
import fetcher from '@/app/utils/fetcher';
import useSWR from 'swr';
import MusicItem from '@/app/components/MusicItem';
import useHandleActiveMusic from '@/app/hooks/useHandleActiveMusic';
import { trackTypes } from '@/app/utils/musicTypes';
import SkeletonMusicItem from '@/app/components/skeletons/SkeletonMusicItem';
import ErrorData from '@/app/components/ErrorData';

export function ArtistTopTrack({ artistId }: { artistId: string }) {
  const {
    data: tracksData,
    isLoading,
    error,
  } = useSWR<{
    tracks: Array<trackTypes>;
    meta: { returnedCount: number };
  }>(`/artists/${artistId}/tracks/top`, fetcher);

  const { handleActiveMusic } = useHandleActiveMusic();

  if (isLoading)
    return (
      <div className="py-10">
        <SkeletonMusicItem length={8} />
      </div>
    );
  if (error) return <ErrorData />;
  if (tracksData?.meta?.returnedCount === 0) return null;

  return (
    <section>
      <h2 className="tertiary-heading pt-9">Top songs</h2>
      <div className="music-list-container">
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
    </section>
  );
}
