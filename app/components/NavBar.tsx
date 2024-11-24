'use client';
import Link from 'next/link';
import { MdAlbum, MdArtTrack, MdFavorite } from 'react-icons/md';
import SearchBar from './SearchBar';
import { useActiveMusicStore } from '../stores/activeMusicStore';
import { cn } from '../lib/utils';
import { FaHome } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';
export default function NavBar({ className }: { className: string }) {
  const activeMusic = useActiveMusicStore((state) => state.activeMusic);

  return (
    <nav
      className={cn(
        'flex gap-6 bg-slate-900 p-7 z-10',
        !activeMusic.bgPlay && activeMusic.active && '-z-50',
        activeMusic.bgPlay && activeMusic.active && 'z-50',
        className
      )}
    >
      <div className="lg:hidden">
        <Suspense>
          <SearchBar />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 items-center gap-14 justify-between lg:grid-cols-4">
        <NavIcon text="Home" href="/">
          <FaHome />
        </NavIcon>

        <NavIcon text="Albums" href="/top-albums">
          <MdAlbum />
        </NavIcon>

        <NavIcon text="Songs" href="/top-tracks">
          <MdArtTrack />
        </NavIcon>

        <NavIcon text="Favourites" href="/favourites">
          <MdFavorite />
        </NavIcon>
      </div>
    </nav>
  );
}

function NavIcon({
  children,
  text,
  href,
}: {
  children: React.ReactNode;
  text: string;
  href: string;
}) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        'flex flex-col items-center gap-1',
        pathname === href && 'text-blue-500'
      )}
    >
      <span className="text-4xl lg:text-2xl">{children}</span>
      <p className="text-sm sm:text-xs">{text}</p>
    </Link>
  );
}
