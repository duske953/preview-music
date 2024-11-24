'use client';
import { FaSearch } from 'react-icons/fa';
import { Input } from './ui/input';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

export default function SearchBar({ fn }: { fn?: () => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const type = searchParams.get('type');
  const [searchValue, setSearchValue] = useState(query || '');
  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!searchValue) return;
    router.push(`/search?query=${searchValue}&type=${type || 'Albums'} `);
    fn?.();
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  return (
    <form onSubmit={handleSearch} className="z-[10000]" action="/search">
      <div className="relative">
        <Input
          value={searchValue}
          onChange={handleInputChange}
          type="text"
          className="rounded-md px-7"
          placeholder="search"
        />
        <FaSearch className="absolute top-2/4 -translate-y-2/4 left-1 opacity-10" />
      </div>
    </form>
  );
}

export function MobileSearchBar() {
  const [openSearchBar, setOpenSearchBar] = useState(false);

  return (
    <div className="hidden lg:block">
      <AnimatePresence>
        {!openSearchBar ? (
          <motion.button
            key="search-mobile-button"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -200 }}
            onClick={() => setOpenSearchBar(true)}
            type="button"
            className="bg-slate-800/95 fixed z-[100] right-0 top-0 p-2 rounded-full"
          >
            <FaSearch className="cursor-pointer size-5 flex-shrink-0" />
          </motion.button>
        ) : (
          <>
            <motion.div
              key="search-bar"
              initial={{ opacity: 0, y: -100, x: '-50%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -200 }}
              className="fixed z-[3000] left-2/4  top-4"
            >
              <SearchBar fn={() => setOpenSearchBar(false)} />
            </motion.div>

            <motion.div
              key="overlay"
              onClick={() => setOpenSearchBar(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed backdrop-blur-3xl top-0 z-[2000] size-full cursor-pointer"
            >
              &nbsp;
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
