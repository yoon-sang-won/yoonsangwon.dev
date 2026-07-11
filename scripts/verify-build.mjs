import assert from 'node:assert/strict';
import { access, readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const base = `/${(process.env.BASE_PATH ?? '/').replace(/^\/+|\/+$/g, '')}`.replace(
  /^\/$/,
  '',
);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) => {
        const file = path.join(directory, entry.name);
        return entry.isDirectory() ? walk(file) : file;
      }),
    )
  ).flat();
}

const files = await walk(dist);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
assert(htmlFiles.length > 0, '생성된 HTML이 없습니다.');

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)];
  assert.equal(canonicals.length, 1, `${file}: canonical은 하나여야 합니다.`);
  assert.doesNotThrow(() => new URL(canonicals[0][1]), `${file}: canonical이 절대 URL이 아닙니다.`);

  for (const [, json] of html.matchAll(
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
  )) {
    assert.doesNotThrow(() => JSON.parse(json), `${file}: JSON-LD 파싱 실패`);
  }

  for (const [, href] of html.matchAll(/href="(\/[^"#?]*)/g)) {
    assert(
      !base || href === base || href.startsWith(`${base}/`),
      `${file}: base 밖의 내부 URL ${href}`,
    );
    const relative = href.slice(base.length).replace(/^\//, '');
    const target = path.join(dist, relative || 'index.html');
    const candidate = path.extname(target) ? target : path.join(target, 'index.html');
    await assert.doesNotReject(access(candidate), `${file}: 깨진 내부 URL ${href}`);
  }

  for (const [, src] of html.matchAll(/src="(\/[^"#?]*)/g)) {
    assert(
      !base || src === base || src.startsWith(`${base}/`),
      `${file}: base 밖의 asset URL ${src}`,
    );
  }
}

const home = await readFile(path.join(dist, 'index.html'), 'utf8');
const homeJson = [...home.matchAll(
  /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
)].map((match) => JSON.parse(match[1]));
assert.equal(homeJson.length, 1, '홈 JSON-LD는 한 번만 출력되어야 합니다.');
assert.deepEqual(
  homeJson[0]['@graph'].map((item) => item['@type']),
  ['WebSite', 'Person'],
  '홈 JSON-LD 유형이 올바르지 않습니다.',
);

const contentFiles = (await walk(path.join(root, 'src', 'content'))).filter((file) =>
  file.endsWith('.md'),
);
const output = await Promise.all(
  files.filter((file) => /\.(?:html|xml)$/.test(file)).map((file) => readFile(file, 'utf8')),
).then((parts) => parts.join('\n'));

for (const file of contentFiles) {
  const source = await readFile(file, 'utf8');
  if (!/^---[\s\S]*?^draft:\s*true\s*$[\s\S]*?^---/m.test(source)) continue;
  const collection = path.basename(path.dirname(file));
  const id = path.basename(file, '.md');
  await assert.rejects(
    access(path.join(dist, collection, id, 'index.html')),
    `${collection}/${id}: draft route가 생성되었습니다.`,
  );
  const title = source.match(/^title:\s*["']?(.+?)["']?\s*$/m)?.[1];
  assert(!title || !output.includes(title), `${collection}/${id}: draft 제목이 노출되었습니다.`);
}

const fonts = files.filter((file) => file.endsWith('.woff2'));
assert.equal(fonts.length, 1, 'production build에는 WOFF2 글꼴 하나만 있어야 합니다.');
assert.equal((await stat(fonts[0])).size, 2_057_688, 'Pretendard 원본 파일 크기가 다릅니다.');

console.log(`검증 완료: HTML ${htmlFiles.length}개, JSON-LD, 내부 URL, canonical, draft, 글꼴`);
