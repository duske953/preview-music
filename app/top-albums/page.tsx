import { Metadata } from 'next';
import AlbumsData from '../components/AlbumsData';
import { topAlbumKey } from './utils/topAlbumKey';

export const metadata: Metadata = {
  title: 'Trending Albums | Discover the Hottest Music Albums',
  description:
    'Stay updated with the most popular albums in music right now. Explore and preview trending albums with ease.',
  keywords:
    'trending albums, popular music, music previews, hot albums, top music albums',
};

export default function Page() {
  return (
    <section className="px-4 py-10">
      <h1 className="tertiary-heading">Trending Albums</h1>
      <AlbumsData type="top-albums" fetcherKey={topAlbumKey} />
    </section>
  );
}
