import parse from 'html-react-parser';
import AnimateHeight, { Height } from 'react-animate-height';
import { Skeleton } from '@/app/components/ui/skeleton';
import { useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

export function AboutArtist({ artistName, descrtiption, isLoading }) {
  const [height, setHeight] = useState<Height>(200);
  if (isLoading)
    return (
      <div className="max-w-[50rem] mx-auto py-11 flex flex-col gap-6">
        <Skeleton className="size-7 w-52 mx-auto text-center block" />
        <Skeleton className="size-7 w-[34rem] h-96 mx-auto text-center block" />
      </div>
    );

  return (
    <div className="max-w-[50rem] mx-auto">
      <h2 className="text-center mb-7 font-bold text-5xl sm:text-3xl">
        About {artistName}
      </h2>
      <AnimateHeight height={height} id="height-about-me">
        <span className="text-gray-300 leading-[2.5]">
          {parse(`${descrtiption}` || '')}
        </span>
      </AnimateHeight>
      <p className="text-5xl -mt-6">{height === 200 && '...'}</p>
      <button
        aria-expanded={height !== 200}
        aria-controls="height-about-me"
        onClick={() => setHeight(height === 200 ? 'auto' : 200)}
        className="flex justify-center w-full text-3xl"
      >
        {height === 'auto' ? (
          <FaArrowUp className="mt-12" />
        ) : (
          <FaArrowDown className="mt-5" />
        )}
      </button>
    </div>
  );
}
