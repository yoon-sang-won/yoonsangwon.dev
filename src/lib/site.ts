import { getCollection, type CollectionEntry } from 'astro:content';

export const SITE_NAME = 'Yoon Sangwon';
export const SITE_TAGLINE = 'UI 개발과 웹에 관해 배우고 시도한 내용을 기록합니다.';
export const SITE_DESCRIPTION =
  '반응형 웹, 접근성, HTML과 CSS, 인터페이스 구현, 문제 해결과 AI를 활용한 작업 방식을 기록하는 개인 블로그이자 장기 학습 아카이브입니다.';

export const collectionNames = ['writing', 'notes', 'lab'] as const;
export type CollectionName = (typeof collectionNames)[number];
export type PublishedEntry = CollectionEntry<CollectionName>;

export const collectionInfo: Record<
  CollectionName,
  { title: string; description: string }
> = {
  writing: {
    title: 'Writing',
    description: '하나의 주제를 충분히 이해하고 정리한 글입니다.',
  },
  notes: {
    title: 'Notes',
    description: '짧게 남긴 공부, 발견과 문제 해결 기록입니다.',
  },
  lab: {
    title: 'Lab',
    description: '직접 구현하고 확인한 실험과 시행착오를 기록합니다.',
  },
};

export function urlFor(path = '') {
  const base = import.meta.env.BASE_URL;
  const cleanPath = path.replace(/^\/+/, '');
  return `${base}${cleanPath}`.replace(/\/{2,}/g, '/');
}

export function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function sortNewest<T extends PublishedEntry>(entries: T[]) {
  return [...entries].sort(
    (a, b) => b.data.published.valueOf() - a.data.published.valueOf(),
  );
}

export async function getPublished(collection: CollectionName) {
  const entries = await getCollection(collection, ({ data }) => !data.draft);
  return sortNewest(entries);
}

export async function getAllPublished() {
  const groups = await Promise.all(collectionNames.map(getPublished));
  return sortNewest(groups.flat());
}
