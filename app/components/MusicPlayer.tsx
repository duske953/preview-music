'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { ForwardedRef, forwardRef, useContext } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import ForwardIcon from './ForwardIcon';
import LikedSong from './LikedSongs';
import Image from 'next/image';
import { useShallow } from 'zustand/react/shallow';
import { useActiveMusicStore } from '../stores/activeMusicStore';
import { cn } from '../lib/utils';
import { AudioPlayerContext } from '../Providers';
import truncText from '../utils/truncText';

const MotionFaPause = motion.create(ForwardIcon);
const MotionFaPlay = motion.create(ForwardIcon);

const MusicPlayer = forwardRef(function MusicPlayer(
  props,
  ref: ForwardedRef<HTMLDivElement>
) {
  const activeMusic = useActiveMusicStore((state) => state.activeMusic);
  return (
    <div
      className="fixed bottom-5 w-[100%] right-0 left-0 m-auto z-[1000]"
      ref={ref}
    >
      <div className="flex items-center justify-center gap-24">
        <MusicActionBtn />
        <LikedSong
          className="ml-0"
          imgSrc={activeMusic.data.imgSrc}
          previewURL={activeMusic.data.previewURL}
          iconSize="size-10"
          artistName={activeMusic.data.artistName}
          songName={activeMusic.data.songName}
        />
      </div>
    </div>
  );
});

export function BgMusicPlayer() {
  const activeMusic = useActiveMusicStore((state) => state.activeMusic);
  const updateActiveMusic = useActiveMusicStore((state) => state.updateMusic);

  function handleDisplayMusicCover(e) {
    const actionBtn = e.target.closest('.action-btn');
    if (actionBtn) return;
    updateActiveMusic({ ...activeMusic, bgPlay: false });
  }

  return (
    <AnimatePresence>
      {activeMusic.active && activeMusic.bgPlay && (
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="sticky bottom-0 bg-slate-800/100 px-2 py-3 md:w-full"
        >
          <div
            onClick={handleDisplayMusicCover}
            className="grid grid-cols-3 items-center gap-3 cursor-pointer relative"
          >
            <div className="flex gap-10 items-center col-[1_/_4]">
              <div>
                <Image
                  width={1000}
                  height={1000}
                  src={activeMusic.data?.imgSrc}
                  className="object-cover size-16 rounded-full absolute top-2/4 -translate-y-2/4 xs:size-12"
                  alt={`${activeMusic.data?.songName} peformed by ${activeMusic.data?.artistName}`}
                />
              </div>
              <div className="col-[2_/_9] ml-16 sm:ml-8">
                <p className="text-xs">
                  {truncText(activeMusic.data?.songName, 12)}
                </p>
                <p className="text-sm text-gray-400">
                  {activeMusic.data?.artistName}
                </p>
              </div>
            </div>

            <div className="ml-auto grid grid-cols-2 action-btn col-[11]">
              <MusicActionBtn iconSize="size-7" />
              <LikedSong
                className="ml-0"
                iconSize="size-7"
                imgSrc={activeMusic.data.imgSrc}
                previewURL={activeMusic.data.previewURL}
                artistName={activeMusic.data.artistName}
                songName={activeMusic.data.songName}
              />
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

interface MusicActionBtnTypes {
  iconSize?: string;
  className?: string;
}

function MusicActionBtn({ iconSize, className }: MusicActionBtnTypes) {
  const audioPlayerRef = useContext(AudioPlayerContext);

  const updateActiveMusic = useActiveMusicStore(
    useShallow((state) => state.updateMusic)
  );
  const activeMusic = useActiveMusicStore(
    useShallow((state) => state.activeMusic)
  );

  function handlePlayMusic() {
    updateActiveMusic({ ...activeMusic, paused: !activeMusic.paused });
  }

  return (
    <button onClick={handlePlayMusic} className={cn(className)}>
      <AnimatePresence>
        {!activeMusic.paused ? (
          <MotionFaPause
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
          >
            <FaPause
              onClick={() => audioPlayerRef.current.pause()}
              className={cn('size-10', iconSize)}
            />
          </MotionFaPause>
        ) : (
          <MotionFaPlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
          >
            <FaPlay
              onClick={() => audioPlayerRef.current.play()}
              className={cn('size-10', iconSize)}
            />
          </MotionFaPlay>
        )}
      </AnimatePresence>
    </button>
  );
}

export default MusicPlayer;
