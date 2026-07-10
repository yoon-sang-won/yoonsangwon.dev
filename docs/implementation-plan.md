# yoonsangwon.dev 첫 구현 계획

## 원칙

- 이 단계에서는 문서만 확정하며 사이트 코드는 작성하지 않는다.
- 구현은 작고 독립적으로 검증 가능한 단계로 진행한다.
- 각 단계가 완료되기 전 다음 기능을 미리 추가하지 않는다.
- `docs/site-spec.md`와 `docs/content-model.md`을 구현 기준으로 사용한다.
- 구현 직전에 Astro와 GitHub Pages 공식 문서의 현재 API를 다시 확인한다.

## 단계 1. 최소 Astro 프로젝트 생성

### 작업 내용

- 현재 stable Astro 7.x로 최소 프로젝트 생성
- 지원 Node.js LTS version 확인 및 고정
- npm lockfile 생성
- static output과 `site` 설정
- global CSS entry 생성
- 불필요한 starter component와 style 제거

### 생성하거나 수정할 파일

- `package.json`
- `package-lock.json`
- `.nvmrc` 또는 동등한 Node version 파일
- `astro.config.mjs`
- `tsconfig.json`
- `src/styles/global.css`
- `src/pages/index.astro`

### 검증 방법

- dependency 설치
- development server 실행
- production build 실행
- `dist/index.html` 생성 확인
- 생성된 HTML에 불필요한 client script가 없는지 확인

### 완료 조건

- 최소 홈페이지가 정적 HTML로 build된다.
- external font, UI framework, client framework가 없다.
- Node와 package version이 재현 가능하게 기록된다.

## 단계 2. 콘텐츠 schema와 fixture 작성

### 작업 내용

- Writing, Notes, Lab collection 정의
- 공통 metadata schema 작성
- draft filtering helper 작성
- 각 collection에 검증용 draft fixture 한 개 추가
- production output에서 draft 제외 확인

### 생성하거나 수정할 파일

- `src/content.config.ts`
- `src/content/writing/[fixture].md`
- `src/content/notes/[fixture].md`
- `src/content/lab/[fixture].md`
- 필요한 최소 content utility

### 검증 방법

- 잘못된 날짜와 누락된 필수 필드가 build를 실패시키는지 확인
- `updated < published` validation 확인
- draft fixture의 route가 `dist`에 없는지 확인

### 완료 조건

- 세 콘텐츠 종류가 schema로 검증된다.
- draft가 상세 route, 목록, Archive 대상에서 제외된다.
- metadata가 `docs/content-model.md`보다 늘어나지 않는다.

## 단계 3. 공통 문서 layout 구현

### 작업 내용

- Base layout 작성
- site header, text navigation, footer 작성
- skip link와 focus style 작성
- title, description, canonical metadata 처리
- 게시일·수정일을 표시하는 재사용 구조 작성

### 생성하거나 수정할 파일

- `src/layouts/BaseLayout.astro`
- `src/layouts/ContentLayout.astro`
- `src/components/SiteHeader.astro`
- `src/components/SiteFooter.astro`
- `src/components/ContentMeta.astro`
- `src/styles/global.css`

한 번만 쓰는 짧은 markup은 component로 분리하지 않는다.

### 검증 방법

- 각 layout의 heading과 landmark 확인
- skip link keyboard 동작 확인
- navigation current state 확인
- unique title, description, canonical 확인
- client JavaScript 생성 여부 확인

### 완료 조건

- semantic HTML과 keyboard flow가 명세와 일치한다.
- 공통 구조 변경을 layout 한 곳에서 적용할 수 있다.
- focus가 모든 link에서 명확히 보인다.

## 단계 4. 홈페이지와 기본 페이지 구현

### 작업 내용

- Berkshire식 정체성·링크 인덱스 홈 구현
- Writing, Notes, Lab 목록 페이지 구현
- Archive 구현
- About, Colophon, 404 구현
- 공개 콘텐츠가 없을 때 가짜 링크를 만들지 않음

### 생성하거나 수정할 파일

- `src/pages/index.astro`
- `src/pages/writing/index.astro`
- `src/pages/notes/index.astro`
- `src/pages/lab/index.astro`
- `src/pages/archive.astro`
- `src/pages/about.astro`
- `src/pages/colophon.astro`
- `src/pages/404.astro`
- 필요한 최소 목록 component

### 검증 방법

- `docs/content-outline.md`의 순서와 문구 대조
- 모든 내비게이션 link 확인
- 빈 collection 상태 확인
- Archive의 연도·날짜·종류 정렬 확인
- 모바일에서 링크와 날짜 stack 확인

### 완료 조건

- 확정한 7개 페이지와 404가 존재한다.
- 홈에서 모든 핵심 콘텐츠 영역으로 직접 이동할 수 있다.
- 카드, 광고 영역, 대형 hero와 hamburger menu가 없다.

## 단계 5. 콘텐츠 상세 route 구현

### 작업 내용

- Writing, Notes, Lab 상세 route 생성
- collection별 ContentLayout 적용
- Markdown render
- 목록과 Archive로 돌아가는 link 제공
- code, 긴 URL, 이미지의 overflow 처리

### 생성하거나 수정할 파일

- `src/pages/writing/[slug].astro`
- `src/pages/notes/[slug].astro`
- `src/pages/lab/[slug].astro`
- `src/styles/global.css`

### 검증 방법

- 각 collection fixture의 build route 확인
- heading, time, article 구조 확인
- 긴 제목, URL, code block fixture 확인
- `200%` text zoom 확인

### 완료 조건

- 공개 Markdown 하나를 추가하면 상세 route와 모든 관련 목록에 자동 반영된다.
- 페이지 전체 가로 스크롤이 없다.
- 본문 폭과 행 길이가 명세 범위를 유지한다.

## 단계 6. RSS, sitemap과 SEO 구현

### 작업 내용

- 공식 RSS package 추가
- 공식 sitemap integration 추가
- site-wide canonical origin 적용
- draft 제외 규칙 공유
- 기본 robots.txt 작성

### 생성하거나 수정할 파일

- `src/pages/rss.xml.js` 또는 당시 공식 API가 요구하는 파일
- `astro.config.mjs`
- `public/robots.txt`
- metadata 관련 layout

### 검증 방법

- RSS XML parsing
- sitemap URL과 custom origin 확인
- draft URL 부재 확인
- 모든 HTML의 title, description, canonical 검사
- 중복 또는 빈 metadata 검사

### 완료 조건

- 공개 콘텐츠만 RSS와 sitemap에 포함된다.
- 모든 canonical이 같은 origin 규칙을 사용한다.
- RSS link가 홈과 footer에서 발견 가능하다.

## 단계 7. 반응형·접근성 검증

### 작업 내용

- mobile-first CSS 완성
- desktop의 link·date 행과 mobile stack 처리
- forced colors와 text zoom 보완
- keyboard와 screen reader flow 수정

### 생성하거나 수정할 파일

- `src/styles/global.css`
- 검증에서 발견된 해당 Astro 파일

### 검증 방법

- 320px부터 넓은 desktop까지 주요 폭 확인
- page-level horizontal overflow 검사
- 200% text zoom
- keyboard-only 탐색
- skip link, focus, current page 확인
- axe 또는 동등한 자동 검사
- 접근성 tree의 heading, landmark, list, time 확인
- reduced motion과 forced colors 확인

### 완료 조건

- 심각하거나 높은 접근성 오류가 없다.
- keyboard로 모든 기능을 사용할 수 있다.
- 긴 제목과 URL이 layout을 깨뜨리지 않는다.
- mobile에서 원본 Berkshire의 좁은 2열 문제가 재현되지 않는다.

## 단계 8. GitHub Pages 배포

### 작업 내용

- 공식 GitHub Pages workflow 작성
- Node와 npm cache·lockfile 사용
- production build 후 Pages artifact 배포
- custom domain 설정 준비
- 404와 URL path 검증

### 생성하거나 수정할 파일

- `.github/workflows/deploy.yml`
- `astro.config.mjs`
- custom domain 확정 후 `public/CNAME` 또는 당시 공식 방식
- `README.md`

### 검증 방법

- local production build
- GitHub Actions 성공
- Pages URL에서 navigation, CSS, RSS, sitemap, 404 확인
- custom domain 전환 전후 canonical 확인
- 깨진 internal link 검사

### 완료 조건

- `main` push로 자동 배포된다.
- GitHub Pages 기본 URL과 최종 지원 URL에서 asset path가 의도대로 동작한다.
- production build와 접근성 검증 결과가 기록된다.

## 첫 구현 단계

가장 먼저 수행할 단계는 **단계 1. 최소 Astro 프로젝트 생성**이다.

이 단계에서는 homepage 완성이나 content feature를 함께 만들지 않는다. Astro가 정적 HTML을 생성하고 GitHub Pages용 구조로 확장 가능한지 가장 작은 production build로 먼저 확인한다.

## 전체 완료 판단

구현은 다음이 모두 증명됐을 때 완료한다.

- `docs/site-spec.md`의 첫 번째 버전 완료 조건 충족
- production build 성공
- draft 비공개 확인
- RSS와 sitemap 검증
- keyboard·zoom·responsive 검증
- GitHub Pages 배포 성공
- 사용자 제공 사실 외의 경력·성과가 없음
- 제외 기능이 무단으로 추가되지 않음

