'use client';
import Link from 'next/link';
import MusicCard from '../../components/MusicCard';
import { useTopAlbums } from '../../hooks/swr/useAlbums';
import { imgServer } from '../../utils/fetcher';
import SkeletonCard from '@/app/components/skeletons/SkeletonCard';
import ErrorData from '@/app/components/ErrorData';
import DataNotFound from '@/app/components/DataNotFound';

export default function PreviewTopAlbums({
  title = 'Trending Albums',
  limit,
  offset = 5,
}: {
  title?: string;
  limit: number;
  offset?: number;
}) {
  const { albumsData, albumsLoading, albumsError } = useTopAlbums(
    limit,
    offset
  );
  console.log(albumsData);
  if (albumsLoading) return <SkeletonCard length={limit} />;
  if (albumsError) return <ErrorData />;
  if (!albumsData.meta || albumsData?.meta?.returnedCount === 0)
    return <DataNotFound />;
  return (
    <section className="py-9 px-5">
      <div className="flex items-center mb-8">
        <h2 className="secondary-heading">{title}</h2>
        <Link href="/top-albums" className="ml-auto text-blue-700">
          See all
        </Link>
      </div>

      <picture className="grid grid-cols-5 gap-7 xs:grid-cols-1 md:grid-cols-2 ">
        {albumsData?.albums.map((album, i) => (
          <MusicCard
            className="flex-1"
            albumId={album.id}
            index={i}
            key={album.id}
            imgSrc={`${imgServer}/albums/${album.id}/images/500x500.jpg`}
            artistName={album.artistName}
            albumName={album.name}
            artistId={album.contributingArtists.primaryArtist.split('art.')[1]}
          />
        ))}
      </picture>
    </section>
  );
}
