'use client';
import { SWRInfiniteKeyLoader } from 'swr/infinite';
import { useInfinitePagination } from '../hooks/useInfinitePagination';
import { imgServer } from '../utils/fetcher';
import MusicCard from './MusicCard';
import SkeletonCard from './skeletons/SkeletonCard';
import ButtonLoadData from './ButtonLoadData';
import { albumTypes } from '../utils/musicTypes';
import DataNotFound from './DataNotFound';
import ErrorData from './ErrorData';

export default function AlbumsData({
  fetcherKey,
  type,
}: {
  fetcherKey: SWRInfiniteKeyLoader;
  type: string;
}) {
  const { data, size, setSize, isValidating, isLoading, error } =
    useInfinitePagination<{
      albums: Array<albumTypes>;
      meta: { returnedCount: number };
    }>(fetcherKey);

  if (isLoading)
    return <SkeletonCard length={10} className="grid-cols-5 gap-14" />;

  function formatAlbumQuery(albums): Array<albumTypes> {
    if (type === 'top-albums') return albums.albums;
    if (type === 'search-albums') return albums.search.data.albums;
  }

  if (error) return <ErrorData />;
  if (data?.[0].meta.returnedCount === 0) return <DataNotFound />;
  return (
    <div>
      <div className="flex flex-col gap-10">
        {data?.map((albums, i) => (
          <picture key={i} className="album-list-container">
            {formatAlbumQuery(albums).map((album, i) => (
              <MusicCard
                className="flex-1"
                albumId={album.id}
                index={i}
                key={album.id}
                imgSrc={`${imgServer}/albums/${album.id}/images/500x500.jpg`}
                artistName={album.artistName}
                albumName={album.name}
                artistId={
                  album.contributingArtists.primaryArtist.split('art.')[1]
                }
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
          disabled={isValidating || data.slice(-1)[0].meta.returnedCount < 5}
          setSize={setSize}
          size={size}
        />
      </div>
    </div>
  );
}
