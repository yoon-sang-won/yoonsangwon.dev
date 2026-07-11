# Pages CMS 독립 검수 보고서

검수 기준일: 2026-07-11

검수 범위는 저장소의 `.pages.yml`, Astro Content Collections, 기존 Markdown 5개, 목록·Archive·RSS·sitemap·JSON-LD, GitHub Pages workflow다. 실제 Pages CMS hosted 화면 로그인과 GitHub App 권한 승인은 수행하지 않았다.

이번 live-test 확인에서도 원격 `main`에 `.pages.yml`과 Pages CMS 콘텐츠 commit이 없고, local `feature/pages-cms` branch만 존재하는 것을 확인했다. 실제 웹 에디터 테스트 결과는 [pages-cms-live-test.md](pages-cms-live-test.md)에 별도로 기록했다.

## 검수 결과 요약

| 항목 | 판정 | 근거 |
| --- | --- | --- |
| 설정 파일 준비 상태 | **준비됨** | 공식 설정 구조, 실제 경로·필드·파일 형식·draft·media·목록 설정을 검증했고 YAML parsing이 통과했다. |
| 기존 콘텐츠 안전성 | **조건부 준비됨** | 기존 5개 파일은 직접 저장하지 않았고 임시 왕복 fixture와 production build를 통과했다. 실제 hosted CMS가 기존 파일을 저장하는 왕복은 아직 확인하지 않았다. |
| Pages CMS 연결 준비 상태 | **조건부 준비됨** | `.pages.yml`과 문서는 준비됐지만 hosted 로그인, GitHub App 저장소 권한, 실제 commit과 Actions 배포는 사용자가 확인해야 한다. |

## 발견한 문제와 수정

### 단일 미디어 폴더 문서 일치

첫 버전 `.pages.yml`은 `public/images/content` 단일 media 폴더를 사용하지만 일부 후속 운영 문서가 선택적 하위 폴더를 권장하고 있었다.

수정:

- 설계, 편집 안내와 콘텐츠 운영 문서를 단일 폴더 정책으로 통일했다.
- 글별 자동 하위 폴더는 구현하거나 지원한다고 안내하지 않는다.
- 기존 media 설정과 공개 이미지 URL은 변경하지 않았다.

### 선택적 `updated` 날짜

기존 schema의 `z.coerce.date().optional()`은 Pages CMS date field를 비웠을 때 저장될 수 있는 빈 문자열을 유효한 선택값으로 처리하지 못할 수 있었다.

수정:

- `src/content.config.ts`에서 `''`와 `null`을 `undefined`로 전처리한다.
- Pages CMS의 `updated` field는 계속 선택 사항이며 날짜 출력은 `yyyy-MM-dd`다.
- 임시 fixture에 `updated: ""`을 넣고 `astro check`와 production build를 통과시켰다.

### GitHub Pages project base path의 본문 이미지

현재 workflow는 `BASE_PATH=/yoonsangwon.dev`를 사용하지만 CMS가 본문에 기록하는 공개 경로는 `/images/content/...`다. 그대로 출력하면 도메인 루트로 요청될 수 있었다.

수정:

- Astro 7에 이미 포함된 Sätteri processor의 HAST plugin을 `astro.config.mjs`에 추가했다.
- `/images/content/...`만 build 시 현재 `BASE_PATH`를 앞에 붙인다.
- custom domain의 `BASE_PATH=/`에서는 경로를 변경하지 않는다.
- 외부 이미지와 다른 경로는 변경하지 않는다.
- 검수 fixture에서 `/repo/images/content/fixture.webp` 형태의 base 변환을 확인했다.

### GitHub Pages project base path의 Markdown 내부 링크

임시 fixture의 `/about/` 링크를 project-site base로 build했을 때 `/repo/about/`로 변환되지 않아 verifier가 실패했다.

수정:

- 이미지와 같은 Markdown HAST 처리 단계에서 루트 기준 내부 링크에도 현재 `BASE_PATH`를 적용한다.
- 외부 URL, `#fragment`와 상대 링크는 변경하지 않는다.
- custom domain의 `BASE_PATH=/`에서는 원래 링크를 유지한다.

### 중복 이미지 파일명

`safe` filename 변환만으로는 같은 원본 파일명의 재업로드 충돌을 충분히 예방한다고 보기 어려웠다.

수정:

- media source와 세 rich-text field의 `rename`을 `random`으로 변경했다.
- 이미지 파일명은 사람이 읽는 원본 이름이 아니라 충돌 가능성을 줄인 안전한 랜덤 이름으로 저장된다.
- 글 삭제 시 본문 이미지는 자동 삭제되지 않는다는 운영 규칙을 문서화했다.

## `.pages.yml` 검수

- 저장소 루트의 `.pages.yml`을 사용한다.
- YAML parser로 문법을 확인했다.
- 공식 top-level key인 `media`, `settings`, `content`만 사용한다.
- 세 content path는 실제 `src/content/writing`, `src/content/notes`, `src/content/lab`과 일치한다.
- `yaml-frontmatter`와 `body: rich-text`가 실제 Markdown + YAML frontmatter 구조와 일치한다.
- Writing/Lab은 `title`, `description`, `published`가 필수이고 Notes의 `description`은 선택 사항이다.
- `updated`와 `draft`는 실제 schema와 일치하는 선택 필드다.
- `draft` 새 글 기본값은 `true`다.
- `published`와 `updated`는 `yyyy-MM-dd`다.
- 현재 schema에 `tags`, `status`, `slug`, 대표 이미지가 없으므로 임의로 추가하지 않았다. 따라서 태그 편집과 태그 검색은 현재 지원하지 않는다.
- rich-text는 Markdown format, Editor/Source switcher, 이미지 media source를 사용한다.
- 목록은 title, draft, published, updated를 표시하고 published 내림차순을 기본으로 한다. 검색 대상은 실제 존재하는 title과 description이다.
- `create: true`, `rename: false`, `delete: true`다.
- flat URL·파일 구조를 유지하기 위해 `subfolders: false`를 설정했다.
- `settings.content.merge: true`로 관리하지 않는 frontmatter key를 보존한다.
- commit template은 공식 `{path}`와 `{filename}` 토큰만 사용한다.
- media input은 `public/images/content`, output은 `/images/content`다.
- 허용 확장자는 PNG, JPG, JPEG, WebP, AVIF, GIF이며 SVG는 허용하지 않는다.
- 공개 사이트 bundle에 Pages CMS package나 client JavaScript를 추가하지 않았다. Markdown base-path 처리는 Astro build dependency를 사용한다.

설정 문법은 Pages CMS의 [configuration overview](https://pagescms.org/docs/configuration/), [fields](https://pagescms.org/docs/configuration/content/fields/), [rich-text](https://pagescms.org/docs/configuration/fields/rich-text/), [media](https://pagescms.org/docs/configuration/media/), [settings](https://pagescms.org/docs/configuration/settings/) 기준으로 대조했다.

## 기존 콘텐츠와 Markdown 호환성

현재 5개 파일을 모두 파싱했다. 확인한 실제 frontmatter는 한글·영문 제목과 설명, ISO 날짜, `draft: true`, 선택적 `updated`다. 기존 파일에는 태그 배열이 없다.

임시 fixture로 다음을 확인했다.

- YAML frontmatter와 따옴표가 필요한 한글 제목·설명
- 빈 수정일
- boolean draft
- 한글·영문 혼합 본문
- heading
- 링크
- blockquote
- ordered/unordered list
- inline code
- fenced code block
- horizontal rule
- 이미지 alt 텍스트
- 긴 본문 문자열

기존 파일에서 발견하지 못한 위험 문법:

- MDX
- Astro component
- HTML block
- custom directive
- remark/rehype 전용 문법
- footnote
- definition list
- 복잡한 table
- 수식
- Mermaid
- 커스텀 블록

새로운 특수 문법을 추가한 글은 Editor 모드보다 Source 모드에서 편집하고, 저장 직후 Git diff에서 본문과 frontmatter의 변경을 확인한다. 기존 콘텐츠를 일괄 재저장하거나 자동 변환하지 않았다.

## URL 검수

- Astro 상세 route는 `entry.id`를 사용하고 파일명이 공개 URL의 일부다.
- CMS filename input은 생성할 때만 표시된다.
- `rename: false`로 기존 URL 변경을 막는다.
- `subfolders: false`로 현재 flat collection 구조를 유지한다.
- 한글 제목은 표시용 제목이며 URL 파일명은 생성 화면의 Filename 입력에서 별도로 정한다. 문서에는 영문 소문자와 하이픈 사용을 안내했다.
- 기존 콘텐츠 파일은 수정하지 않았으므로 기존 공개 URL은 변경되지 않았다.
- 삭제는 파일을 제거하므로 Archive와 목록은 다음 build에서 자동으로 사라진다. 외부에 공유된 URL의 redirect는 자동 생성되지 않는다.

## 미디어 검수

| 항목 | 결과 |
| --- | --- |
| 저장소 경로 | `public/images/content` 단일 폴더 |
| CMS 공개 경로 | `/images/content/...` |
| project-site build 경로 | `/yoonsangwon.dev/images/content/...` |
| custom domain build 경로 | `/images/content/...` |
| 파일명 | `random` rename |
| 허용 확장자 | `png`, `jpg`, `jpeg`, `webp`, `avif`, `gif` |
| SVG | 차단 |
| alt | rich-text 이미지 삽입 시 입력, 문서에 작성법 안내 |
| 모바일 | 기존 CSS의 `max-width: 100%; height: auto` 확인 |
| 최적화 | CMS 자동 최적화에 의존하지 않음 |

권장 업로드 값은 1600px 이하, WebP 우선, 1MB 이내다. 이는 운영 권장값이며 `.pages.yml`에서 강제하지 않는다. 이미지 고유 크기를 Markdown에서 알 수 없으므로 layout shift 가능성은 남아 있다. 중요한 이미지는 업로드 전에 크기를 줄인다.

글 삭제와 이미지 삭제는 별도다. 다른 글이 참조하지 않는지 확인한 뒤 고아 이미지만 수동으로 삭제한다.

## 파생 출력 검수

- 홈페이지 최신 글: `getPublished`와 `getAllPublished`가 `draft`를 제외한다.
- Writing, Notes, Lab 목록: 각 collection의 `getPublished`를 사용한다.
- Archive: `getAllPublished`만 사용한다.
- RSS: `getAllPublished` 결과만 item으로 생성한다.
- sitemap: production build에서 공개 route만 생성한다.
- JSON-LD: 공개 상세 route와 초안 로컬 route의 규칙이 기존 코드와 일치한다. `updated`가 없으면 `dateModified`를 만들지 않는다.
- GitHub Pages: 기존 `.github/workflows/deploy.yml`을 변경하지 않았다.

## 실행한 검증

| 검증 | 결과 |
| --- | --- |
| YAML parse 및 Pages CMS 구조 검증 | 통과 |
| 전체 Markdown frontmatter 파싱 | 5개 통과 |
| `npm.cmd run check` | 0 errors, 0 warnings, 0 hints |
| 임시 왕복 fixture build | 통과 |
| `BASE_PATH=/repo npm.cmd run build` | 통과 |
| fixture 이미지 URL base 변환 | `/repo/images/content/...` 확인 |
| fixture Markdown 내부 링크 base 변환 | `/repo/about/` 확인 |
| fixture RSS 반영 | title, description, published, URL 확인 |
| fixture sitemap 반영 | URL 확인 |
| 기본 `npm.cmd run build` | 통과, 8 pages |
| `npm.cmd run verify` | JSON-LD, canonical, draft, 내부 URL, asset base 검사 통과 |
| lint | 기존 `package.json`에 lint script가 없어 실행 불가 |
| 기존 콘텐츠 diff | fixture 제거 후 기존 콘텐츠 변경 없음 |

## 실제 Pages CMS 화면에서 확인할 항목

1. GitHub App 권한을 이 저장소 하나로 제한한다.
2. `Writing`, `Notes`, `Lab` 세 collection이 보이는지 확인한다.
3. 기존 파일을 열어 제목·설명·게시일·본문이 보이는지 확인하되 첫 확인에서는 저장하지 않는다.
4. 새 글 생성 시 Filename 입력이 생성 화면에만 보이는지 확인한다.
5. 새 글을 초안으로 저장하고 GitHub diff에서 `draft: true`, `updated` 빈 값, 본문을 확인한다.
6. 한글 제목을 입력해도 Filename을 영문 소문자와 하이픈으로 직접 정할 수 있는지 확인한다.
7. Source 모드 전환과 이미지 alt 입력을 확인한다.
8. 이미지 업로드 후 `public/images/content` 경로와 랜덤 파일명을 확인한다.
9. project-site Pages URL에서 실제 이미지가 `/yoonsangwon.dev/images/content/...`로 열리는지 확인한다.
10. 공개 전환 후 GitHub Actions build/deploy, 목록, Archive, RSS와 sitemap을 확인한다.
11. 파일 삭제 후 다음 build에서 목록·Archive·RSS·sitemap에서 사라지는지 확인한다.
12. Pages CMS가 모르는 frontmatter key가 있는 실제 파일은 저장 전후 diff로 보존되는지 확인한다.

## main 병합 전 판단

로컬 검증 기준으로는 **조건부 병합 가능**이다. 다음 hosted 확인을 완료한 뒤 병합한다.

- 실제 Pages CMS 로그인과 저장소 권한 확인
- 기존 글 한 개의 저장 전후 diff 확인
- 초안 생성·공개 전환·삭제의 Actions 결과 확인
- 실제 이미지 업로드와 project-site base URL 확인
- 파일명 rename 비활성화 확인
- GitHub Pages 배포 후 RSS, sitemap, JSON-LD와 기존 URL 확인

## 완료 판정

| 항목 | 판정 | 이유와 남은 확인 |
| --- | --- | --- |
| `.pages.yml` 설정 준비 상태 | **준비됨** | 공식 2.1.8 schema, 실제 경로·필드와 YAML parsing을 다시 대조했다. |
| Writing 관리 준비 상태 | **조건부 준비됨** | local 설정과 fixture는 통과했다. Hosted 화면의 목록·생성·수정·삭제를 확인해야 한다. |
| Notes 관리 준비 상태 | **조건부 준비됨** | 선택적 description을 포함한 local schema는 일치한다. Hosted 저장 결과를 확인해야 한다. |
| Lab 관리 준비 상태 | **조건부 준비됨** | 실제 schema에 없는 status를 추가하지 않았다. Hosted 저장 결과를 확인해야 한다. |
| 초안 및 공개 전환 준비 상태 | **조건부 준비됨** | local production build에서 draft 제외는 통과했다. 실제 CMS commit과 Actions 전환은 미검증이다. |
| 모바일·PC 다중 기기 작성 준비 상태 | **조건부 준비됨** | GitHub에 저장된 초안을 다시 여는 운영 절차는 준비됐다. 실제 두 기기 테스트가 필요하다. |
| 이미지 업로드 준비 상태 | **조건부 준비됨** | 확장자·경로·base 변환 fixture는 통과했다. Hosted 업로드와 실제 이미지 표시를 확인해야 한다. |
| 기존 콘텐츠 안전성 | **조건부 준비됨** | 기존 5개 파일은 변경하지 않았고 전체 parsing이 통과했다. Hosted rich-text 저장 전후 diff 확인이 필요하다. |
| GitHub Pages 배포 안정성 | **준비됨** | 기본 build와 실제 `/yoonsangwon.dev` base build, verifier가 모두 통과했다. |
| Hosted Pages CMS 연결 준비 상태 | **조건부 준비됨** | local 설정은 준비됐지만 원격 branch push, 로그인과 GitHub App 권한 확인이 필요하다. |
| main 병합 준비 상태 | **조건부 준비됨** | 34단계 Hosted 테스트와 실제 Actions 배포를 마친 뒤 병합한다. |

## 롤백

- 코드 수정은 Git diff에서 `astro.config.mjs`, `src/content.config.ts`, `scripts/verify-build.mjs`를 되돌릴 수 있다.
- CMS 콘텐츠 오류는 GitHub 파일 History에서 정상 commit의 Markdown을 복원한다.
- `.pages.yml`을 이전 버전으로 복원해 CMS 연결만 되돌릴 수 있다. 콘텐츠와 기존 GitHub Actions는 별도로 남는다.
- 복원 후 `npm.cmd run check`, `npm.cmd run build`, `npm.cmd run verify`를 다시 실행한다.
