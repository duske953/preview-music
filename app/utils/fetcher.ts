'use server';

export default async function fetcher(url: string) {
  return await fetch(`https://api.deezer.com${url}`).then((r) => r.json());
}
