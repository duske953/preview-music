import type { Metadata } from 'next';
import { Audiowide } from 'next/font/google';
import './globals.css';
import NavBar from './components/NavBar';
import Provider from './Providers';
import { BgMusicPlayer } from './components/MusicPlayer';
import MusicBgCover from './components/MusicBgCover';
import Overlay from './components/Overlay';
import Link from 'next/link';
import { MobileSearchBar } from './components/SearchBar';
import NextTopLoader from 'nextjs-toploader';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Suspense } from 'react';
const audioWide = Audiowide({
  subsets: ['latin'],
  weight: ['400'],
});

export const metadata: Metadata = {
  creator: 'Eloho Kennedy',
  applicationName: 'Preview Music, Music web app',
  authors: [{ name: 'Eloho Kennedy', url: 'https://eloho.vercel.ap' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${audioWide.className} antialiased`}>
        <section className="grid grid-cols-[0.22fr_1fr] lg:grid-cols-1 max-w-[150rem] mx-auto">
          <Provider>
            <NavBar className="flex-col h-svh fixed left-0 top-0 w-[18%] lg:hidden" />
            <section className="col-[2_/_-1] lg:col-span-1">
              <main className="min-h-svh">{children}</main>
              <Suspense>
                <NextTopLoader showSpinner={false} />
              </Suspense>

              <ToastContainer
                className={`${audioWide.className} antialiased`}
                bodyClassName={`${audioWide.className} antialiased`}
                theme="dark"
                hideProgressBar={true}
              />
              <div className="sticky w-full bottom-0">
                <BgMusicPlayer />
                <NavBar className="left-0 top-0 hidden lg:flex flex-col" />
              </div>
            </section>
            <MobileSearchBar />
            <MusicBgCover />
            <Overlay />
          </Provider>
        </section>

        <footer className="text-center py-5 absolute left-2/4 -translate-x-[19%] lg:-translate-x-2/4 lg:w-full">
          <p>
            Created with love by{' '}
            <Link
              className="text-blue-500"
              target="_blank"
              rel="noreferrer noopener"
              href="https://eloho.vercel.app"
            >
              Eloho Kennedy
            </Link>
          </p>
        </footer>
      </body>
    </html>
  );
}
