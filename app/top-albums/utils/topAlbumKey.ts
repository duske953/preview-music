'use client';
const LIMIT = 5;
export const topAlbumKey = (pageIndex = 5, previousPageData) => {
  if (previousPageData && previousPageData.data.length === 0) return null;
  return `/editorial/0/releases?limit=${LIMIT}&index=${pageIndex * LIMIT}`;
};
