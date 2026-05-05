export default function searchAlbumKey(
  pageIndex,
  previousPageData,
  query: string
) {
  return () => {
    if (previousPageData && previousPageData.data.length === 0)
      return null;
    return `/search/album?q=${query}&index=${
      pageIndex * 10
    }&limit=10`;
  };
}
