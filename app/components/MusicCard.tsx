import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import useStartScrollAnimation from '../hooks/useStartScrollAnimation';
import useErrorImg from '../hooks/useErrorImg';
import truncText from '../utils/truncText';
import { useState } from 'react';

interface MusicCardTypes {
  imgSrc: string;
  albumName: string;
  albumId: string;
  artistName: string;
  artistId: string;
  index: number;
  className: string;
}
const MotionLink = motion.create(Link);
const MotionImage = motion.create(Image);
export default function MusicCard({
  imgSrc,
  albumName,
  albumId,
  artistName,
  artistId,
  className,
  index,
}: MusicCardTypes) {
  const { imgError, handleErrorImg } = useErrorImg();
  const [imgLoaded, setImgLoaded] = useState(false);
  const MusicCardVariants: Variants = {
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.04 },
    }),
    hidden: {
      y: -20,
      opacity: 0,
    },
  };

  const { animationRef, controls } = useStartScrollAnimation();

  function handleLoadingComplete() {
    setImgLoaded(true);
  }
  return (
    <MotionLink
      ref={animationRef}
      variants={MusicCardVariants}
      initial="hidden"
      animate={controls}
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
      href={`/album/${albumId}-${artistId}`}
    >
      <figure className={className}>
        <AnimatePresence>
          <MotionImage
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNjAwIDQwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzQ5NTA1NyIvPjwvc3ZnPg=="
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`transition duration-1000 ease-in-out w-full mb-5 rounded-xl ${
              imgLoaded ? 'opacity-100 blur-none' : 'opacity-0 blur-sm'
            }`}
            onError={handleErrorImg}
            onLoadingComplete={handleLoadingComplete}
            width={5000}
            height={5000}
            src={imgError.error ? imgError.src : imgSrc}
            alt={`${albumName} performed by ${artistName}`}
          />
        </AnimatePresence>

        <figcaption className="flex justify-center flex-col items-center">
          <p className="text-xs font-bold">{truncText(albumName, 15)}</p>
          <p className="text-sm text-gray-400">{truncText(artistName, 15)}</p>
        </figcaption>
      </figure>
    </MotionLink>
  );
}
