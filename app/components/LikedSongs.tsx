import { AnimatePresence, motion } from 'framer-motion';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import ForwardIcon from './ForwardIcon';
import { favouriteTracksStore } from '../stores/favouriteTracksStore';
import { cn } from '../lib/utils';
const MotionIoHeart = motion.create(ForwardIcon);
const MotionIoHeartOutline = motion.create(ForwardIcon);
export default function LikedSong({
  artistName,
  songName,
  previewURL,
  imgSrc,
  className,
  iconSize,
}: {
  artistName: string;
  songName: string;
  previewURL: string;
  imgSrc: string;
  className?: string;
  iconSize?: string;
}) {
  const favouritesMusic = favouriteTracksStore(
    (state) => state.favouriteTracks
  );

  const favouriteMusic = favouritesMusic.find(
    (track) => track.artistName === artistName && track.songName === songName
  );

  const storeFavouriteMusic = favouriteTracksStore(
    (state) => state.storeFavouriteTrack
  );
  const deleteFavouriteMusic = favouriteTracksStore(
    (state) => state.deleteFavouriteTrack
  );

  function handleLikeMusic(
    { artistName, songName, previewURL, imgSrc },
    action: string
  ) {
    if (action === 'add')
      storeFavouriteMusic({ artistName, songName, previewURL, imgSrc });
    if (action === 'delete') deleteFavouriteMusic({ artistName, songName });
  }

  return (
    <div className={cn('ml-auto like-btn col-[8]', className)}>
      <AnimatePresence initial={false}>
        {!favouriteMusic && favouriteMusic?.songName !== songName ? (
          <MotionIoHeartOutline
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <IoHeartOutline
              onClick={() =>
                handleLikeMusic(
                  { artistName, songName, previewURL, imgSrc },
                  'add'
                )
              }
              className={cn('cursor-pointer text-2xl', iconSize)}
            />
          </MotionIoHeartOutline>
        ) : (
          <MotionIoHeart
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <IoHeart
              onClick={() =>
                handleLikeMusic(
                  { artistName, songName, previewURL, imgSrc },
                  'delete'
                )
              }
              className={cn('cursor-pointer text-2xl text-red-500', iconSize)}
            />
          </MotionIoHeart>
        )}
      </AnimatePresence>
    </div>
  );
}
