import Image from 'next/image';
import { MouseEvent } from 'react';
import LikedSong from './LikedSongs';
import { Variants, motion } from 'framer-motion';
import useErrorImg from '../hooks/useErrorImg';
import { cn } from '../lib/utils';
import { useActiveMusicStore } from '../stores/activeMusicStore';
import useStartScrollAnimation from '../hooks/useStartScrollAnimation';
import truncText from '../utils/truncText';

export interface MusicTypes {
  imgSrc: string;
  songName: string;
  artistName: string;
  id: string;
  previewURL: string;
  index: number;
  handleActiveMusic: (e: MouseEvent<HTMLDivElement>) => void;
}

export default function MusicItem({
  imgSrc,
  songName,
  artistName,
  previewURL,
  index,
  handleActiveMusic,
}: MusicTypes) {
  const { imgError, handleErrorImg } = useErrorImg();
  const activeMusic = useActiveMusicStore((state) => state.activeMusic);
  const { animationRef, controls } = useStartScrollAnimation();
  const musicItemVariant: Variants = {
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.004 },
    }),
    hidden: {
      y: 20,
      opacity: 0,
    },
  };

  return (
    <>
      <motion.div
        ref={animationRef}
        animate={controls}
        variants={musicItemVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={index}
        onClick={handleActiveMusic}
        className={cn(
          'grid relative grid-cols-3 xs:grid-cols-3 items-center sm:gap-2 cursor-pointer px-2 py-5 border-slate-600 ',
          activeMusic.active &&
            activeMusic.data.previewURL === previewURL &&
            'bg-slate-900/100  rounded-xl'
        )}
      >
        <div className="flex gap-10 items-center col-[1_/_4]">
          <div>
            <Image
              width={1000}
              height={1000}
              src={imgError.error ? imgError.src : imgSrc}
              placeholder="blur"
              onError={handleErrorImg}
              blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRm knyJckliyjqTzSlT54b6bk+h0R//2Q=="
              className="size-16 rounded-full object-cover xs:size-12 absolute top-2/4 -translate-y-2/4"
              alt={`${songName} peformed by ${artistName}`}
            />
          </div>
          <div className="ml-16 sm:ml-8">
            <p className="text-sm sm:text-xs">{truncText(songName, 35)}</p>
            <p className="text-gray-400 sm:text-xs">{artistName}</p>
          </div>
        </div>

        <LikedSong
          artistName={artistName}
          imgSrc={imgSrc}
          songName={songName}
          previewURL={previewURL}
        />
      </motion.div>
    </>
  );
}
