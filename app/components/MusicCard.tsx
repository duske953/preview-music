import Image from 'next/image';
import Link from 'next/link';
import { Variants, motion } from 'framer-motion';
import useStartScrollAnimation from '../hooks/useStartScrollAnimation';
import useErrorImg from '../hooks/useErrorImg';
import truncText from '../utils/truncText';

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
        <Image
          className="w-full mb-5 rounded-xl"
          width={5000}
          onError={handleErrorImg}
          height={5000}
          src={imgError.error ? imgError.src : imgSrc}
          alt={`${albumName} performed by ${artistName}`}
        />
        <figcaption className="flex justify-center flex-col items-center">
          <p className="text-xs font-bold">{truncText(albumName, 15)}</p>
          <p className="text-sm text-gray-400">{truncText(artistName, 15)}</p>
        </figcaption>
      </figure>
    </MotionLink>
  );
}
