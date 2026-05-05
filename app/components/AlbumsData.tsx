'use client';
import { SWRInfiniteKeyLoader } from 'swr/infinite';
import { useInfinitePagination } from '../hooks/useInfinitePagination';
import MusicCard from './MusicCard';
import SkeletonCard from './skeletons/SkeletonCard';
import ButtonLoadData from './ButtonLoadData';
import { albumTypes } from '../utils/musicTypes';
import DataNotFound from './DataNotFound';
import ErrorData from './ErrorData';

export default function AlbumsData({
  fetcherKey,
}: {
  fetcherKey: SWRInfiniteKeyLoader;
}) {
  const { data, size, setSize, isValidating, isLoading, error } =
    useInfinitePagination<{ data: albumTypes[]; total: number }>(fetcherKey);

  if (isLoading)
    return <SkeletonCard length={10} className="grid-cols-5 gap-14" />;

  if (error) return <ErrorData />;
  if (!data || data[0]?.total <= 0) return <DataNotFound />;

  const total = data[0].total || 0;
  const currentCount = data.reduce(
    (acc, curr) => acc + (curr.data?.length || 0),
    0,
  );

  return (
    <div>
      <div className="flex flex-col gap-10">
        {data.map((pageData, i) => (
          <picture key={i} className="album-list-container">
            {pageData?.data?.map((album, i) => (
              <MusicCard
                className="flex-1"
                albumId={album.id.toString()}
                index={i}
                key={album.id}
                imgSrc={album.cover_xl || album.cover_big}
                artistName={album.artist.name}
                albumName={album.title}
                artistId={album.artist.id.toString()}
              />
            ))}
          </picture>
        ))}
      </div>
      {isValidating && !isLoading && (
        <SkeletonCard length={10} className="grid-cols-5 gap-9" />
      )}

      <div className="flex justify-center pt-8">
        <ButtonLoadData
          disabled={isValidating || currentCount >= total}
          setSize={() => setSize(size + 1)}
          size={size}
        />
      </div>
    </div>
  );
}
