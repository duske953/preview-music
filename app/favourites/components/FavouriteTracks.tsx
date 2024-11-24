'use client';

import MusicItem from '@/app/components/MusicItem';
import { favouriteTracksStore } from '@/app/stores/favouriteTracksStore';
import useHandleActiveMusic from '@/app/hooks/useHandleActiveMusic';
import DataNotFound from '@/app/components/DataNotFound';
export default function FavouriteTracks() {
  const FavouriteTracks = favouriteTracksStore(
    (state) => state.favouriteTracks
  );

  const { handleActiveMusic } = useHandleActiveMusic();

  if (FavouriteTracks.length <= 0)
    return <DataNotFound msg="You don’t have any favorite songs yet" />;
  return (
    <div className="music-list-container">
      {FavouriteTracks.toReversed().map((track, i) => (
        <MusicItem
          index={i}
          key={track.previewURL}
          imgSrc={track.imgSrc}
          artistName={track.artistName}
          songName={track.songName}
          handleActiveMusic={(e) =>
            handleActiveMusic(e, {
              songName: track.songName,
              artistName: track.artistName,
              imgSrc: track.imgSrc,
              previewURL: track.previewURL,
            })
          }
          id={track.songName}
          previewURL={track.previewURL}
        />
      ))}
    </div>
  );
}
