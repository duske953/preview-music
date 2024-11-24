export default function truncText(text: string | undefined, length: number) {
  if (!text) return '';
  return `${text.slice(0, length)}${text.length > length ? '...' : ''}`;
}
