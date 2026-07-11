# Pages CMS 설계

## 목적

Pages CMS는 공개 사이트에 관리자 화면을 넣는 기능이 아니라, GitHub 저장소의 기존 Markdown을 브라우저에서 편집하는 외부 편집 계층으로 사용한다. 저장 후 기존 GitHub Actions가 Astro를 다시 빌드하고 GitHub Pages에 배포한다.

Pages CMS를 선택한 이유는 콘텐츠를 별도 데이터베이스나 전용 형식으로 옮기지 않고 현재 Markdown, Git history와 GitHub Actions를 그대로 유지할 수 있기 때문이다. CMS를 사용할 수 없는 때에도 같은 파일을 직접 편집할 수 있고, 공개 사이트에는 CMS runtime이나 관리자 UI를 추가하지 않는다.

Hosted Pages CMS가 실제로 읽는 설정은 원격 branch에 commit된 `.pages.yml`이다. 현재 검수 시점에는 `.pages.yml`이 local `feature/pages-cms` worktree에만 있고 원격 `main`에는 없다. 따라서 이 문서의 설계는 local build 기준으로 준비됐지만 hosted 연결 자체는 아직 완료된 것으로 판정하지 않는다.

## 현재 구조 분석

| 항목 | 현재 값 |
| --- | --- |
| Astro | `astro` 7.0.7, Content Collections API |
| 콘텐츠 경로 | `src/content/writing`, `src/content/notes`, `src/content/lab` |
| 파일 형식 | `.md`, YAML frontmatter과 Markdown 본문 |
| URL | 각 collection의 파일명/entry id로 생성되는 `/writing/{id}/`, `/notes/{id}/`, `/lab/{id}/` |
| 공개 기준 | `src/lib/site.ts`의 `!data.draft` 필터와 production 상세 route 필터 |
| 날짜 | `published` 필수, `updated` 선택, `YYYY-MM-DD` 입력 |
| 이미지 | 현재 저장된 콘텐츠 이미지는 없음. CMS 업로드 대상은 `public/images/content` |
| 배포 경로 | GitHub Actions가 `SITE_URL`과 `BASE_PATH`를 주입하며 사이트 코드는 `import.meta.env.BASE_URL`을 사용 |
| 파생 출력 | Archive, RSS, sitemap, JSON-LD가 Astro collection 데이터를 읽음 |

Astro schema의 실제 필드는 다음과 같다.

| Collection | 필수 frontmatter | 선택 frontmatter | 본문 |
| --- | --- | --- | --- |
| Writing | `title`, `description`, `published` | `updated`, `draft` | Markdown |
| Notes | `title`, `published` | `description`, `updated`, `draft` | Markdown |
| Lab | `title`, `description`, `published` | `updated`, `draft` | Markdown |

현재 파일을 전수 확인한 결과 `tags`, `status`, `slug`, 대표 이미지 필드는 없다. 따라서 `.pages.yml`에 이 필드를 추가하지 않았다. CMS에서 태그를 관리하려면 먼저 Astro schema와 사이트 출력 로직을 별도 작업으로 확장해야 한다.

현재 본문에는 일반적인 제목, 인용, 목록, 인라인 코드, fenced code block만 있다. MDX, Astro component, custom directive, HTML 확장 문법과 이미지 참조는 발견되지 않았다. rich-text가 지원하지 않는 문법을 보존해야 할 때는 Source 모드에서 편집하고 저장 전 diff를 확인한다.

## `.pages.yml` 설계

- 세 collection을 각각 `Writing`, `Notes`, `Lab`으로 노출한다.
- 실제 경로와 `yaml-frontmatter` 형식을 그대로 사용한다.
- 현재 flat collection 구조를 유지하기 위해 하위 폴더 생성을 막는다.
- `body`는 frontmatter 밖의 Markdown 본문을 가리키는 `rich-text` 필드다.
- `published`와 `updated`는 `yyyy-MM-dd`로 저장한다. `updated`는 비워 둘 수 있다.
- 새 글은 `draft: true`로 시작한다.
- 목록은 제목, 초안, 게시일, 수정일을 보여 주고 게시일 내림차순으로 정렬한다. 검색은 실제 존재하는 제목과 설명만 대상으로 한다.
- 파일명은 생성 시 현재 날짜와 시간을 사용한 `YYYY-MM-DD-HHMMSS.md` 형식으로 자동 생성한다. 생성 후 rename은 막고 delete는 허용한다.
- `settings.content.merge: true`로 CMS가 모르는 기존 frontmatter 키와 본문을 보존하도록 한다.
- commit template은 Pages CMS가 제공하는 `{path}`와 `{filename}` 토큰만 사용한다.

### 파일명과 URL

현재 상세 route는 `entry.id`를 사용하므로 파일명이 곧 공개 URL의 일부다. 파일명은 frontmatter `slug`로 대체되지 않는다. Hosted 편집 화면에서 빈 Filename 값이 `.md`로 남아 저장 오류가 발생하지 않도록 Filename 입력을 숨기고, 생성 시각으로 안전한 ASCII 파일명을 자동 생성한다. 공개 후에는 파일명을 바꾸지 않는다. URL을 바꿔야 하면 기존 주소에서 새 주소로 수동 redirect를 검토해야 한다.

## Draft 공개 흐름

1. CMS에서 글을 만들면 `draft: true`로 저장한다.
2. 로컬 개발 서버에서는 직접 URL로 초안을 확인할 수 있지만, production build에서는 상세 route가 생성되지 않는다.
3. 홈페이지, collection 목록, Archive, RSS, sitemap과 JSON-LD의 공개 글 데이터에서 초안이 제외된다.
4. 내용을 확인한 뒤 `draft`를 해제하고 저장하면 GitHub Actions가 기존 workflow로 배포한다.

### 다중 기기 초안 작성

이 프로젝트에서 `draft: true`로 Pages CMS에 저장해 GitHub commit을 만드는 것을 임시저장으로 정의한다. 모든 새 Writing, Notes, Lab 항목은 이 상태로 시작한다. 저장된 Markdown 파일은 같은 저장소와 branch를 여는 다른 기기에서 다시 열 수 있지만, 저장 버튼을 누르지 않은 브라우저 입력은 기기 간에 이동하지 않는다.

기기를 바꾸기 전 저장 완료와 GitHub commit을 확인하고 기존 편집 화면을 닫는다. 새 기기에서는 목록을 새로고침한 뒤 최신 문단을 확인하고 편집한다. 같은 글을 여러 기기에서 동시에 수정하지 않는다. 공식 자동 저장, 브라우저 종료 후 미저장 복구, 이탈 경고와 기기 간 미저장 동기화는 지원된다고 가정하지 않는다. 조사 근거와 실제 기기 테스트 절차는 `docs/pages-cms-draft-workflow.md`를 따른다.

## 이미지 저장 구조

- 저장소: `public/images/content`
- 공개 URL 기준: `/images/content`
- Writing, Notes, Lab은 첫 버전에서 같은 단일 media 폴더를 사용한다. 글별 자동 하위 폴더 기능은 구현하지 않는다.
- 허용 확장자: `png`, `jpg`, `jpeg`, `webp`, `avif`, `gif`
- SVG와 외부 이미지 호스팅은 사용하지 않는다.

업로드 파일명은 Pages CMS의 `random` rename을 사용한다. 같은 원본 파일명을 다시 올려도 기존 이미지 경로를 덮어쓸 가능성을 줄이기 위해서다. Markdown 본문에는 `/images/content/{filename}` 기준의 루트 URL이 기록된다. 이미지 alt 텍스트는 본문 편집기의 이미지 삽입 대화상자에서 입력하며, 비어 있지 않게 작성한다.

현재 workflow의 project-site `BASE_PATH`는 `/yoonsangwon.dev`이다. `astro.config.mjs`의 Sätteri HAST plugin이 CMS 본문의 루트 기준 내부 링크와 `/images/content/...` 이미지를 build 시 `/yoonsangwon.dev/...`로 변환한다. custom domain에서 `BASE_PATH: /`를 사용하면 원래 경로를 그대로 유지한다. 외부 URL, fragment와 상대 경로는 변환하지 않는다.

사이트는 원본 이미지를 그대로 정적 출력하며 CMS가 이미지 최적화를 수행한다고 가정하지 않는다. 본문 표시 폭을 크게 넘지 않는 1600px 이하, WebP 우선, 파일 1MB 이내를 권장한다. 현재 CSS는 `max-width: 100%`와 `height: auto`로 모바일 가로 넘침을 막지만, 이미지 고유 크기 정보가 없는 Markdown 이미지는 layout shift가 생길 수 있으므로 중요한 이미지는 업로드 전에 크기를 줄인다.

글을 삭제해도 본문 이미지 파일이 자동으로 삭제되지는 않는다. 삭제 전 다른 글에서 같은 파일을 참조하는지 확인하고, 사용하지 않는 파일만 Pages CMS 미디어 목록에서 별도로 삭제한다.

## 공개 저장소의 초안 주의

`draft: true`는 production 사이트에서만 글을 숨긴다. 공개 GitHub 저장소에서는 초안 Markdown과 commit을 열람할 수 있으므로 회사·고객·동료 정보, 개인 연락처, API key·token·password, 비공개 계약, 내부 관리 화면과 회사 코드 원본을 초안에도 기록하지 않는다.

## 기존 데이터 보호

`merge: true`는 CMS에 정의하지 않은 기존 frontmatter 키를 삭제하지 않도록 하는 안전장치다. 기존 본문과 날짜 값도 자동 변환하지 않는다. 이 설정이 있어도 기존 글을 일괄 재저장하지 않으며, 첫 수정 전 원본 diff를 확인한다.

## CMS에서 관리하지 않는 항목

Astro 컴포넌트, CSS, `src/content.config.ts`, 사이트 정보, Archive/RSS/sitemap/JSON-LD 로직, GitHub Actions workflow, 배포 설정은 CMS collection에 넣지 않는다. 사이트 설정은 코드에 직접 관리되고 있어 이번 작업에서 별도 file 항목으로 옮기지 않았다.

## 알려진 호환성 제한

- 현재 schema에 태그가 없으므로 태그 목록과 태그 검색은 제공하지 않는다.
- `updated`는 `published`보다 빠를 수 없다. CMS에서 수정일을 입력할 때 이 규칙을 지킨다.
- CMS가 수정일을 비운 값을 `updated: ""`로 저장해도 `src/content.config.ts`가 이를 없는 값으로 처리한다.
- 현재 본문은 표준 Markdown 위주라 rich-text 호환성이 높지만, 새로운 특수 문법은 Source 모드에서 보존 여부를 확인한다.
- Pages CMS 로그인, GitHub App 권한, 실제 CMS 저장 결과와 Actions 실행은 로컬 검증 범위 밖이다.
- 실제 미디어 업로드 후 GitHub Pages의 배포 URL과 이미지 파일 존재 여부는 hosted CMS 연결 뒤 한 번 확인해야 한다.
- 실제 생성·수정·삭제 commit과 다중 기기 초안 저장은 현재 Git 기록에서 확인되지 않았다.

## 롤백

CMS가 잘못 저장한 경우 GitHub의 해당 파일 History에서 정상 commit의 파일 내용을 복원하거나, 되돌릴 commit을 만든다. 복원 전 현재 변경분을 별도 확인하고, 복원 후 `npm run check && npm run build && npm run verify`를 실행한다. `.pages.yml` 자체를 되돌리면 CMS 연결은 사라지지만 GitHub에 남은 Markdown 콘텐츠와 사이트 배포 workflow에는 영향이 없다.
