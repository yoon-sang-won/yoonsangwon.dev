# yoonsangwon.dev

개발, UI, 웹 접근성, 반응형 구현, 작업 방식과 AI 활용에 관해 배우고 시도한 내용을 기록하는 개인 블로그이자 장기 학습 아카이브입니다.

## 로컬 실행

Node.js 24와 npm을 사용합니다.

```sh
npm install
npm run dev
```

검증과 production build:

```sh
npm run check
npm run build
npm run verify
npm run preview
```

`astro check`가 Astro 템플릿과 TypeScript 진단을 함께 수행합니다. `verify`는 build 결과의 JSON-LD, 내부 URL, canonical, draft 제외와 글꼴 파일을 검사합니다. 별도의 ESLint나 포매터는 첫 버전에 추가하지 않았습니다.

## 새 글 추가

종류에 맞는 폴더에 Markdown 파일을 하나 만듭니다.

- Writing: `src/content/writing/파일명.md`
- Notes: `src/content/notes/파일명.md`
- Lab: `src/content/lab/파일명.md`

Writing과 Lab의 frontmatter:

```yaml
---
title: "글 제목"
description: "목록과 검색 결과에 표시할 한두 문장"
published: 2026-07-10
updated: 2026-07-11 # 수정한 경우에만
draft: true # 공개할 때 false로 변경하거나 이 줄을 제거
---
```

Notes는 `description`을 생략할 수 있습니다. 파일명이 URL이 되므로 공개 후에는 가능하면 바꾸지 않습니다. `draft: true`인 글은 목록, 상세 페이지, Archive, RSS와 sitemap에서 제외됩니다. 파일을 추가한 뒤 `npm run check && npm run build`로 확인합니다.

### draft 글 로컬 확인

개발 서버에서는 `draft: true`인 글도 직접 URL로 열 수 있지만 목록에는 표시하지 않습니다. 첫 Writing 초안은 다음 순서로 확인합니다.

```sh
npm run dev
```

`http://localhost:4321/writing/why-this-blog-is-text-first/`을 열면 상단의 초안 안내와 `noindex` metadata를 함께 확인할 수 있습니다. 검토 후 공개하려면 frontmatter의 `published`를 실제 공개일로 확인하고 `draft: false`로 바꾸거나 `draft` 줄을 제거합니다. 이어서 `npm run check && npm run build && npm run verify`를 실행합니다.

## 배포 주소 설정

GitHub 저장소는 `yoon-sang-won/yoonsangwon.dev`이며 기본 Pages 주소는 다음과 같습니다.

`https://yoon-sang-won.github.io/yoonsangwon.dev/`

`.github/workflows/deploy.yml`의 build 환경이 이 주소를 한 곳에서 관리합니다.

```yaml
env:
  SITE_URL: https://yoon-sang-won.github.io
  BASE_PATH: /yoonsangwon.dev
```

`astro.config.mjs`는 이 환경변수를 canonical, RSS, sitemap과 내부 경로에 함께 사용합니다. 로컬 기본값은 향후 사용할 `https://yoonsangwon.dev`와 `/`이지만 Actions에서는 위 값으로 덮어씁니다.

## GitHub Pages 배포

`main` branch에 push하면 `.github/workflows/deploy.yml`이 Node.js 24에서 production build를 실행하고 `dist`를 GitHub Pages에 배포합니다.

```sh
git add .
git commit -m "Prepare GitHub Pages deployment"
git push -u origin main
```

GitHub 저장소의 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 선택합니다. 이후 **Actions → Deploy to GitHub Pages**에서 build와 deploy job이 모두 성공했는지 확인합니다.

## custom domain 연결

아직 `CNAME` 파일을 만들지 않습니다. 나중에 `yoonsangwon.dev`를 연결할 때 다음을 수행합니다.

1. `.github/workflows/deploy.yml`의 `SITE_URL`을 `https://yoonsangwon.dev`, `BASE_PATH`를 `/`로 변경합니다.
2. GitHub **Settings → Pages → Custom domain**에 `yoonsangwon.dev`를 저장합니다.
3. DNS 제공자에서 apex domain을 GitHub Pages로 연결하고 필요하면 `www` CNAME을 `yoon-sang-won.github.io`로 설정합니다.
4. DNS 전파 후 **Enforce HTTPS**를 켜고 canonical, RSS, sitemap과 404를 다시 확인합니다.

custom GitHub Actions workflow 배포에서는 저장소의 `CNAME` 파일이 필요하지 않으므로 GitHub Pages 설정을 기준으로 관리합니다.
