import PreviewTopTracks from './(homepage)/components/PreviewTopTracks';
import Hero from './(homepage)/components/hero';
import PreviewTopAlbums from './(homepage)/components/PreviewTopAlbums';
import PreviewTopArtists from './(homepage)/components/PreviewTopArtists';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discover Music, One Snippet at a Time',
  description:
    'Explore our collection of songs and preview the first 30 seconds of any track. Find your next favorite tune, one snippet at a time',
};

export default async function Page() {
  return (
    <section className="mobile-container">
      <Hero />
      <PreviewTopAlbums limit={5} />
      <section className="grid grid-cols-2 py-10 px-6 gap-14 md:grid-cols-1">
        <PreviewTopTracks />
        <PreviewTopArtists />
      </section>
    </section>
  );
}
