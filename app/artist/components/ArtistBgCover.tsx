import fetchImage from '@/app/utils/fetchImage';
import Image from 'next/image';
import useErrorImg from '@/app/hooks/useErrorImg';
import { cn } from '@/app/lib/utils';

export function ArtistBgCover({
  artistId,
  artistName,
}: {
  artistId: string;
  artistName: string;
}) {
  const { handleErrorImg, imgError } = useErrorImg();
  return (
    <div className="relative">
      <div className="bg-gradient-to-l from-gray-900 to-gray-600/10">
        <Image
          src={
            imgError.error
              ? imgError.src
              : fetchImage('artists', '633x422', artistId)
          }
          height={2000}
          width={2000}
          quality={100}
          onError={handleErrorImg}
          alt={`Image of ${artistName}`}
          className={cn(
            'h-[30rem] rounded-3xl  -z-40 relative object-cover',
            imgError.error && 'object-contain'
          )}
        />
      </div>

      <div className="absolute top-2/4 -translate-y-2/4 left-2/4 -translate-x-2/4 text-center">
        <p className="text-7xl font-bold sm:text-5xl">{artistName}</p>
      </div>
    </div>
  );
}
