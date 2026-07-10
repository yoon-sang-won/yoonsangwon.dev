import { urlFor } from '../lib/site';

export function GET(context: { site: URL }) {
  const sitemap = new URL(urlFor('sitemap-index.xml'), context.site);
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
