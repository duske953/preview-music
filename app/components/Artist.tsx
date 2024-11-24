import { Variants, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import fetchImage from '../utils/fetchImage';
import useErrorImg from '../hooks/useErrorImg';
import { cn } from '../lib/utils';
import useStartScrollAnimation from '../hooks/useStartScrollAnimation';
export default function Artist({
  id,
  name,
  size,
  index,
}: {
  id: string;
  name: string;
  size: string;
  index: number;
}) {
  const { handleErrorImg, imgError } = useErrorImg();
  const { animationRef, controls } = useStartScrollAnimation();
  const artistVariant: Variants = {
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.09 },
    }),
    hidden: {
      y: 20,
      opacity: 0,
    },
  };

  return (
    <motion.figure
      className=""
      ref={animationRef}
      animate={controls}
      key={id}
      variants={artistVariant}
      initial="hidden"
      whileInView="visible"
      custom={index}
      viewport={{ once: true }}
    >
      <Link className="flex flex-col gap-2 items-center" href={`artist/${id}`}>
        <Image
          className={cn('object-cover rounded-full', size)}
          width={1000}
          height={1000}
          src={
            imgError.error ? imgError.src : fetchImage('artists', '633x422', id)
          }
          alt={`Image of ${name}`}
          onError={handleErrorImg}
        />

        <figcaption>
          <span className="text-sm text-gray-300">
            {`${name.slice(0, 15)}${name.length > 15 ? '...' : ''}`}
          </span>
        </figcaption>
      </Link>
    </motion.figure>
  );
}
