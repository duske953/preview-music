'use client';
export const topAlbumKey = (pageIndex, previousPageData) => {
  if (previousPageData && previousPageData.albums.length === 0) return null;
  return `/albums/top?limit=10&offset=${pageIndex * 10}&range=month`;
};
