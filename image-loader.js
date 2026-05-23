export default function cloudflareImageLoader({ src, width, quality }) {
  return `${src}?w=${width}&q=${quality || 75}`;
}