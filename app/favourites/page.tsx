import { Metadata } from 'next';
import FavouriteTracks from './components/FavouriteTracks';

export const metadata: Metadata = {
  title: 'Your Favorite Songs',
  description:
    'Your favorite songs. Preview and enjoy your personalized collection of top tracks anytime.',
  keywords:
    'favorite songs, saved tracks, personalized music, top songs, music collection',
};

export default function Page() {
  return (
    <section className="px-5 py-14">
      <h1 className="tertiary-heading">Favourite Tracks</h1>
      <FavouriteTracks />
    </section>
  );
}
