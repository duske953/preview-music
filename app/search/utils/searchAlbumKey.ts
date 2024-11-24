export default function searchAlbumKey(
  pageIndex,
  previousPageData,
  query: string
) {
  return () => {
    if (previousPageData && previousPageData.meta.returnedCount < 5)
      return null;
    return `/search?query=${query}&offset=${
      pageIndex * 10
    }&per_type_limit=10&type=album`;
  };
}
