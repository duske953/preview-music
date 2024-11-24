'use client';
import heroImg from '@/public/heroImg.jpg';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="">
      <div className="bg-gradient-to-r from-gray-900 to-gray-600/10 relative">
        <Image
          width={6000}
          height={6000}
          className="w-full h-96 object-cover relative -z-40"
          src={heroImg}
          alt="Hero image of a man wearing headphones"
        />
        <div className="absolute top-2/4 -translate-y-2/4 left-7">
          <h1 className="text-4xl w-2/4 md:text-3xl md:w-3/4 sm:w-full">
            Discover the Latest Hits and Albums All in One Place
          </h1>
        </div>
      </div>
    </section>
  );
}
