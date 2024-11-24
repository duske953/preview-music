'use client';

import { useSearchParams } from 'next/navigation';

import SearchTracksData from './SearchTracksData';
import SearchArtistsData from './SearchArtistsData';
import AlbumsData from '@/app/components/AlbumsData';
import searchAlbumKey from '../utils/searchAlbumKey';

export default function SearchDetails() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const type = searchParams.get('type');

  if (type.toLowerCase() === 'albums') {
    return (
      <AlbumsData
        type="search-albums"
        fetcherKey={(pageIndex, previousPageData) =>
          searchAlbumKey(pageIndex, previousPageData, query)
        }
      />
    );
  }

  if (type.toLowerCase() === 'tracks')
    return <SearchTracksData query={query} />;

  if (type.toLowerCase() === 'artists')
    return <SearchArtistsData query={query} />;
}
