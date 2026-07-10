import rss from '@astrojs/rss';
import { getAllPublished, SITE_DESCRIPTION, SITE_NAME, urlFor } from '../lib/site';

export async function GET(context: { site: URL }) {
  const entries = await getAllPublished();

  return rss({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    site: new URL(urlFor(), context.site),
    customData: '<language>ko-KR</language>',
    items: entries.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description ?? '짧은 기록입니다.',
      pubDate: entry.data.published,
      link: urlFor(`${entry.collection}/${entry.id}/`),
    })),
  });
}
