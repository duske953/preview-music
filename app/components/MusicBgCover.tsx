'use client';
import Image from 'next/image';
import { useActiveMusicStore } from '../stores/activeMusicStore';
import { AnimatePresence, motion } from 'framer-motion';
import MusicPlayer from './MusicPlayer';
import useErrorImg from '../hooks/useErrorImg';
import { cn } from '../lib/utils';
import user from '@/public/user.png';
const MotionMusicPlayer = motion.create(MusicPlayer);
export function MusicBgCover() {
  const activeMusic = useActiveMusicStore((state) => state.activeMusic);
  const updateActiveMusic = useActiveMusicStore((state) => state.updateMusic);
  const { imgError } = useErrorImg();

  return (
    <AnimatePresence>
      {activeMusic.active && !activeMusic.bgPlay && (
        <motion.section
          initial={{ opacity: 0, x: '-50%', y: '50%' }}
          animate={{ opacity: 1, y: '-50%' }}
          exit={{ opacity: 0, y: '-1%' }}
          className="fixed top-2/4 left-2/4 z-50"
        >
          <div className="flex flex-col items-center">
            <div className="w-96 sm:w-[23rem] 2xs:w-60">
              <Image
                width={3000}
                height={3000}
                src={imgError.error ? imgError.src : activeMusic.data.imgSrc}
                className={cn(
                  'rounded-3xl object-cover w-auto ',
                  activeMusic.data.imgSrc.includes('/_next/static') && 'w-80'
                )}
                onError={() =>
                  updateActiveMusic({
                    ...activeMusic,
                    data: { ...activeMusic.data, imgSrc: user.src },
                  })
                }
                alt={`${activeMusic.data.songName} peformed by ${activeMusic.data.artistName}`}
              />
            </div>

            <div
              className={cn(
                'mt-5 flex flex-col gap-3 self-start',
                activeMusic.data.imgSrc.includes('/_next/static') && '-mt-7'
              )}
            >
              <p className="font-bold text-xl">{activeMusic.data.songName}</p>
              <p className="text-gray-200 text-sm">
                {activeMusic.data.artistName}
              </p>
            </div>
          </div>
        </motion.section>
      )}
      {activeMusic.active && !activeMusic.bgPlay && (
        <MotionMusicPlayer
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          key="music-player"
        />
      )}
    </AnimatePresence>
  );
}

export default MusicBgCover;
