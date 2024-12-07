import Link from 'next/link';
import SearchDetails from './components/SearchDetails';
import { buttonVariants } from '../components/ui/button';
import { cn } from '../lib/utils';
import truncText from '../utils/truncText';
import { Suspense } from 'react';

export async function generateMetadata({ searchParams }) {
  const query = (await searchParams).query;

  return {
    title: `Search Results for ${query} | Find Your Music`,
    description: `Browse search results for ${query}. Discover songs, albums, and artists that match your interests and preview tracks easily`,
    keywords: `${query}, search music, find songs, discover albums, music search results`,
  };
}

export default async function Page({ searchParams }) {
  const query = (await searchParams).query;
  const type = (await searchParams).type;
  return (
    <section className="mobile-container">
      <div className="flex gap-5 py-5 px-3  top-0 bg-gray-800 z-30 sticky">
        <SearchNavLink query={query} type={type} name="Albums" />
        <SearchNavLink query={query} type={type} name="Tracks" />
        <SearchNavLink query={query} type={type} name="Artists" />
      </div>
      <section className="px-4 py-12">
        <h1 className="tertiary-heading">
          Search results for {truncText(query, 12)}
        </h1>
        <Suspense>
          <SearchDetails />
        </Suspense>
      </section>
    </section>
  );
}

function SearchNavLink({
  type,
  query,
  name,
}: {
  type: string;
  query: string;
  name: string;
}) {
  return (
    <Link
      className={`${cn(
        buttonVariants({
          variant:
            type.toLowerCase() === name.toLowerCase() ? 'secondary' : 'default',
        }),
        'rounded-full'
      )}`}
      href={`/search?query=${query}&type=${name}`}
    >
      {name}
    </Link>
  );
}
