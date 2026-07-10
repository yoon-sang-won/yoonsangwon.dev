import type { CollectionEntry } from 'astro:content';
import {
  formatDate,
  SITE_DESCRIPTION,
  SITE_NAME,
  urlFor,
  type CollectionName,
} from './site';

export function websiteJsonLd(site: URL) {
  const home = new URL(urlFor(), site);
  const personId = new URL(home);
  personId.hash = 'person';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': new URL('#website', home),
        url: home,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: 'ko-KR',
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: SITE_NAME,
        url: home,
        mainEntityOfPage: new URL(urlFor('about/'), site),
      },
    ],
  };
}

export function articleJsonLd(
  entry: CollectionEntry<CollectionName>,
  description: string,
  url: URL,
) {
  const home = new URL(urlFor(), url);
  const personId = new URL(home);
  personId.hash = 'person';

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: entry.data.title,
    description,
    datePublished: formatDate(entry.data.published),
    ...(entry.data.updated && {
      dateModified: formatDate(entry.data.updated),
    }),
    author: {
      '@type': 'Person',
      '@id': personId,
      name: SITE_NAME,
      url: new URL(urlFor('about/'), url),
    },
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    inLanguage: 'ko-KR',
  };
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
