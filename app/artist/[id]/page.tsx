import fetcher from '@/app/utils/fetcher';
import ArtistProfile from '../components/ArtistProfile';

export async function generateMetadata({ params }) {
  const artistId = (await params).id;
  const artistData = await fetcher(`/artists/${artistId}`);
  const artistName = artistData.artists[0].name;
  return {
    title: `${artistName} | Explore Music and Albums`,
    description: `Discover music by ${artistName}. Explore their albums, tracks, and preview songs to dive into their world of music.`,
    keywords: `${artistName}, music artist, ${artistName} albums, ${artistName} songs, artist preview`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const artistId = (await params).id;
  return (
    <section className="px-5 py-10">
      <ArtistProfile artistId={artistId} />
    </section>
  );
}
