export const path = 'https://api.napster.com/v2.2';
export const imgServer = 'https://api.napster.com/imageserver/v2';

export default function fetcher(resource: string) {
  return fetch(`${path}/${resource}`, {
    method: 'GET',
    headers: {
      apikey: process.env.NEXT_PUBLIC_API_KEY as string,
    },
  }).then((response) => response.json());
}
