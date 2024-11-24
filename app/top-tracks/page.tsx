import { Metadata } from 'next';
import TopTracks from './components/TopTracks';

export const metadata: Metadata = {
  title: 'Trending Tracks | Listen to the Top Songs',
  description:
    'Discover the hottest tracks trending now. Preview the first 30 seconds of the most popular songs in one place.',
  keywords:
    'trending tracks, popular songs, top music, music previews, trending music',
};

export default function Page() {
  return (
    <section className="px-6 py-10">
      <h1 className="tertiary-heading">Trending Songs</h1>
      <TopTracks />
    </section>
  );
}
