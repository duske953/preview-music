import { imgServer } from './fetcher';
export default function fetchImage(
  type: string,
  dimension: string,
  id: string
) {
  return `${imgServer}/${type}/${id}/images/${dimension}.jpg`;
}
