import Image from 'next/image';
import useErrorImg from '@/app/hooks/useErrorImg';
import { cn } from '@/app/lib/utils';
import { Skeleton } from '@/app/components/ui/skeleton';

export function ArtistBgCover({
  artistName,
  imgSrc,
  isLoading,
}: {
  artistName: string;
  imgSrc?: string;
  isLoading: boolean;
}) {
  const { handleErrorImg, imgError } = useErrorImg();
  return (
    <div className="relative">
      <div className="bg-gradient-to-l from-gray-900 to-gray-600/10">
        {isLoading && (
          <Skeleton className="size-full md:size-[19rem] h-[30rem]" />
        )}
        {!isLoading && (
          <Image
            src={imgError.error ? imgError.src : imgSrc}
            height={2000}
            width={2000}
            quality={100}
            onError={handleErrorImg}
            alt={`Image of ${artistName}`}
            className={cn(
              'h-[30rem] rounded-3xl  -z-40 relative object-fill',
              imgError.error && 'object-contain',
            )}
          />
        )}
      </div>

      <div className="absolute top-2/4 -translate-y-2/4 left-2/4 -translate-x-2/4 text-center">
        <p className="text-7xl font-bold sm:text-5xl">{artistName}</p>
      </div>
    </div>
  );
}
