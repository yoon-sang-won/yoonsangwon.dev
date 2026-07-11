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

## Pages CMS로 콘텐츠 관리

이 저장소는 [Pages CMS](https://app.pagescms.org)에서 Writing, Notes, Lab Markdown을 편집할 수 있도록 `.pages.yml`을 제공합니다. CMS는 공개 사이트에 관리자 UI를 추가하지 않고, GitHub의 기존 콘텐츠 파일에 commit을 만들 뿐입니다.

- 콘텐츠는 계속 `src/content/writing`, `src/content/notes`, `src/content/lab`의 Markdown + YAML frontmatter로 저장됩니다.
- 새 글은 `draft: true`로 저장되며, 초안은 사이트 목록·상세 route·Archive·RSS·sitemap에서 제외됩니다. 초안을 해제하면 기존 GitHub Actions가 GitHub Pages를 배포합니다.
- 모바일에서 초안을 저장한 뒤 PC에서 목록을 새로고침해 이어 쓸 수 있습니다. 저장 버튼으로 GitHub commit을 만든 내용만 기기 간에 이동하며, 공식 자동 저장·미저장 복구·기기 간 미저장 동기화는 확인되지 않았습니다. 같은 글을 여러 기기에서 동시에 편집하지 않습니다.
- 저장소가 공개되어 있으므로 `draft: true` 파일도 GitHub에서는 보입니다. 초안에 개인정보, 비공개 업무 정보와 인증정보를 작성하지 않습니다.
- 본문 이미지는 `public/images/content`에 저장되고 `/images/content`으로 공개됩니다. project-site base path에도 맞게 build되며 SVG는 사용하지 않습니다.
- 새 글 파일명과 공개 URL은 저장 시 `YYYY-MM-DD-HHMMSS.md` 형식으로 자동 생성됩니다. 생성 후에는 URL 안정성을 위해 파일명을 바꾸지 않습니다.
- Pages CMS를 사용할 수 없을 때는 이 README의 Markdown 직접 편집 방식으로 계속 운영할 수 있습니다. 콘텐츠와 이미지는 GitHub에 남습니다.
- Pages CMS를 제거할 때도 `.pages.yml`과 GitHub App 연결만 제거하며 기존 Markdown, 이미지와 GitHub Actions는 유지합니다. 잘못 저장한 파일과 설정은 Git history에서 복구합니다.

자세한 설계는 [`docs/pages-cms-design.md`](docs/pages-cms-design.md), 편집 방법은 [`docs/pages-cms-editor-guide.md`](docs/pages-cms-editor-guide.md), 초안 이어쓰기는 [`docs/pages-cms-draft-workflow.md`](docs/pages-cms-draft-workflow.md), 복구는 [`docs/pages-cms-recovery.md`](docs/pages-cms-recovery.md), 최초 연결은 [`docs/pages-cms-setup.md`](docs/pages-cms-setup.md), 독립 검수 결과는 [`docs/pages-cms-qa.md`](docs/pages-cms-qa.md), 실제 통합 테스트 기록은 [`docs/pages-cms-live-test.md`](docs/pages-cms-live-test.md)를 참고합니다. `.pages.yml`을 수정했다면 `npm run check && npm run build && npm run verify`를 실행하고 `git diff`에서 기존 콘텐츠가 바뀌지 않았는지 확인합니다. 현재 콘텐츠 모델에는 `tags`, `status`, 대표 이미지 필드가 없으므로 CMS에도 임의로 추가하지 않았습니다.

## 콘텐츠 운영 문서

- [콘텐츠 편집 원칙](docs/editorial-guide.md): Writing·Notes·Lab 구분, 제목·날짜·수정·이미지 기준
- [콘텐츠 Markdown 템플릿](docs/content-templates.md): 새 글을 시작할 최소 구조
- [글 발행 체크리스트](docs/publishing-checklist.md): `draft` 해제 직전 확인 항목
- [AI 글쓰기 운영 흐름](docs/ai-writing-workflow.md): AI에 제공할 정보와 사람의 최종 책임
- [콘텐츠와 배포 복구 안내](docs/recovery-guide.md): 글·이미지·설정·배포 복구
- [도메인 연결 계획](docs/domain-migration-plan.md): `yoonsangwon.dev`를 실제 연결하기 전 실행 순서와 롤백

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

아직 실제 도메인이나 `CNAME` 파일을 연결하지 않습니다. GitHub Pages 설정, DNS, HTTPS, metadata, 검색 도구와 롤백을 포함한 실행 순서는 [도메인 연결 계획](docs/domain-migration-plan.md)을 따릅니다. custom GitHub Actions workflow 배포에서는 저장소의 `CNAME` 파일이 필수가 아니므로 GitHub Pages 설정을 기준으로 관리합니다.
