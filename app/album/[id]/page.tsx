import AlbumDetails from '../components/AlbumDetails';
import TopArtistsAlbums from '../components/TopArtistAlbums';
import fetcher from '@/app/utils/fetcher';
export async function generateMetadata({ params }) {
  const id = (await params).id;
  const albumDetail = await fetcher(`/albums/${id.split('-')[0]}`);
  const albumName = albumDetail.albums[0].name;
  const artistName = albumDetail.albums[0].artistName;
  return {
    title: `${albumName} by ${artistName} | Preview Tracks`,
    description: `Explore the album ${albumName} by ${artistName}. Preview the first 30 seconds of each track and dive into the music you love.`,
    keywords: `${albumName}, ${artistName}, music album, album preview, ${albumName} tracks`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const albumId = id.split('-')[0];
  const artistId = `art.${id.split('-')[1]}`;
  return (
    <section className="px-4 py-9 mobile-container">
      <AlbumDetails albumId={albumId} artistId={artistId} />
      <section className="py-16">
        <h2 className="text-3xl mb-4">More Albums</h2>
        <div className="mobile-container">
          <TopArtistsAlbums artistId={artistId} />
        </div>
      </section>
    </section>
  );
}
