# UI·접근성 QA 보고서

- 검수일: 2026-07-11
- 대상: `yoonsangwon.dev` Astro 정적 사이트
- 최종 판정: **조건부 준비됨**

## 판정 이유

명세, 정적 산출물, 로컬 production preview 기준으로 확인된 결함은 수정했다. type check와 production build가 성공했고, 내부 링크·metadata·draft 제외·RSS·sitemap·404·하위 경로·키보드·반응형·접근성 자동 검사를 통과했다.

로컬 저장소와 원격은 준비했지만 GitHub Actions를 실제 실행하지 않았고 custom domain도 아직 연결하지 않았다. 실제 저장소의 Pages 설정과 DNS를 연결한 뒤 배포 URL에서 workflow, 404, canonical, RSS와 sitemap을 다시 확인해야 한다.

## 검수 항목

- 방향: 개인 개발 블로그·장기 학습 아카이브 정체성, 링크 우선 문서 인덱스, Writing·Notes·Lab 구분, 비포트폴리오성
- 반응형: 320px·1440px, 긴 제목·연속 문자열·code block, 200% 글자 확대, 터치 목표, 최대 읽기 폭
- 접근성: landmark·heading·목록·날짜, skip link, 키보드 순서, focus, 링크 식별·visited 상태, 대비, `aria-current`, forced colors, 불필요한 ARIA
- 기능: 전체 경로, 내부 링크, collection 자동 반영, draft 제외, 하위 경로 Pages 빌드, RSS·sitemap·robots, 404, metadata, JavaScript·의존성, README, workflow, production build

## 발견한 문제와 수정한 내용

| 중요도 | 발견한 문제 | 수정한 내용 |
|---|---|---|
| 높음 | GitHub Pages workflow의 action major와 저장소형 Pages base 설정이 현재 공식 배포 구성과 일치하지 않았다. | `actions/checkout@v7`, `withastro/action@v6`, `actions/deploy-pages@v5`로 맞추고 기본 Pages origin과 `/yoonsangwon.dev` base를 build 환경에 설정했다. |
| 중간 | 홈에서 최신 글이 주요 콘텐츠 인덱스보다 먼저 나와 Berkshire식 링크 우선 구조와 사이트 명세의 순서가 뒤집혀 있었다. | 콘텐츠 인덱스를 첫 번째 main 영역으로 옮기고 Writing·Notes·Lab·Archive의 역할 설명을 함께 제공했다. 공개 글이 없는 최신 섹션은 숨긴다. |
| 중간 | 구조 확인용 `[Sample]` 3개가 공개되어 상세 route, 홈, Archive와 RSS에 가짜 콘텐츠로 노출됐다. | 세 sample을 `draft: true`로 변경했다. 최종 산출물에서 sample·draft 제목과 slug가 0건임을 확인했다. |
| 중간 | 내부 내비게이션에 RSS가 없고 현재 페이지를 나타내는 `aria-current="page"`도 없었다. footer에서도 RSS를 찾을 수 없었다. | 내부 nav와 footer에 RSS를 추가하고 구독 목적의 accessible name을 제공했다. 현재 경로에 `aria-current="page"`를 자동 적용했다. |
| 중간 | Writing·Lab 상세에서 description이 화면에 나오지 않았고, 상세 하단에 collection 목록과 Archive 복귀 링크가 없었다. | description을 content header에 표시하고 상세 하단에 두 탐색 링크를 추가했다. |
| 중간 | Archive에 유형별 목록 링크가 없고 404에 Archive 링크가 없었다. | 명세의 Writing·Notes·Lab 목록 링크와 `Archive에서 글 찾기` 링크를 추가했다. |
| 중간 | 홈 인덱스 텍스트 링크의 실제 터치 높이가 19px였다. | 텍스트 링크에 최소한의 세로 padding을 추가해 320px 화면에서 32px로 늘렸다. 행 전체 링크로 바꾸지는 않았다. |
| 낮음 | 목록에 `updated`가 있어도 수정일을 표시하지 않았고 Archive에서 Notes 종류명이 복수형으로 나왔다. | 게시일과 다른 수정일만 별도 `time`으로 표시하고 Archive 종류명은 `Note`로 정리했다. |
| 낮음 | 홈의 짧은 정체성 문구와 collection 설명이 확정된 콘텐츠 초안과 달라 장기 학습 아카이브와 세 유형의 차이가 덜 명확했다. | 확정 문구로 맞추고 meta description에는 개인 블로그·장기 학습 아카이브 목적을 명시했다. Colophon에 갱신 정보를 추가했다. |

## 실행한 명령과 결과

| 명령·검사 | 결과 |
|---|---|
| `npm run` | 사용 가능 script: `dev`, `build`, `check`, `preview`; 별도 test·lint script 없음 |
| `npm run check` | 최종 22 files, 오류 0, 경고 0, hint 0 |
| `npm run build` | 최종 8 pages 생성, 성공; `sitemap-index.xml` 생성 |
| `npm run verify` | HTML 8개, JSON-LD 파싱, 내부 URL·canonical, draft 제외, WOFF2 원본 크기 확인 |
| `SITE_URL=https://example.github.io BASE_PATH=/repo npm run build` | 성공; 홈의 root 기준 잘못된 href/src 0건, canonical과 sitemap 모두 `/repo/` 포함 |
| production 산출물 내부 링크 검사 | 깨진 내부 링크 0건 |
| HTML metadata·script 검사 | 8 HTML 모두 title·description·canonical 각 1개, `<script>` 0개, 생성 `.js` 0개 |
| draft 문자열·slug 검사 | `[Sample]`, `[Draft]`, sample/draft slug 노출 0건 |
| XML 파싱 | `rss.xml`, `sitemap-index.xml`, `sitemap-0.xml` 모두 유효 |
| route HTTP 검사 | `/`, Writing, Notes, Lab, Archive, About, Colophon, RSS, sitemap, robots 모두 200 |
| 누락 경로 검사 | `/missing-page/`가 HTTP 404와 사용자 정의 404 본문 반환 |
| Lighthouse mobile navigation | Accessibility 100, Best Practices 100, SEO 100, 실패 audit 0 |
| Playwright·접근성 트리 검사 | 320px 가로 넘침 없음, 200% 글자 확대 겹침 0, 1440px shell 1152px, 키보드 trap 없음 |

초기 공개 sample이 홈·각 목록·Archive·RSS·상세 route에 자동 반영되는 상태를 확인한 뒤 draft로 전환했다. 최종 build에서 관련 route와 파생 목록이 모두 사라져 collection 자동 반영과 draft 제외를 양방향으로 확인했다.

## Berkshire 레퍼런스 반영 상태

공식 홈페이지의 현재 구조는 짧은 정체성 블록 뒤에 핵심 문서 링크가 오고, 일부 갱신일·구분선·운영 안내·고지·저작권으로 끝난다. 구현은 이 정보 제공 순서를 다음처럼 재해석했다.

- 짧은 사이트 정체성 다음에 콘텐츠 인덱스를 바로 제공한다.
- 카드 대신 목록, 행 간격과 구분선을 사용한다.
- 콘텐츠가 생기면 제목과 의미론적 날짜를 직접 노출한다.
- 운영 안내, 개인 의견·비공개 정보 고지, RSS, Colophon과 저작권을 하단에 둔다.
- 링크는 밑줄과 visited 상태를 유지한다.

회사명·주소·로고·광고·기업 문서 분류·문구·table 기반 2열 구조는 복제하지 않았다. 특정 글꼴과 파란 링크만 가져온 피상적 모방이 아니라, 홈페이지 자체를 직접적인 콘텐츠 인덱스로 쓰는 기능 구조를 반영했다.

## 방향 검수 결과

- 이력서, 경력 timeline, selected work, 채용 CTA와 성과 수치가 없어 채용용 포트폴리오로 보이지 않는다.
- 첫 화면의 주 인터페이스는 콘텐츠 설명이 붙은 링크 목록이다.
- Writing은 충분히 정리한 글, Notes는 짧은 공부·발견·문제 해결, Lab은 직접 구현한 실험·시행착오로 구분된다.
- About보다 Writing·Notes·Lab·Archive가 먼저 나오며 글과 기록이 우선한다.
- 장기 보관 목적, 운영 안내, 고지, 완성된 label·간격·구분선이 의도적으로 절제된 사이트라는 인상을 만든다.

## 반응형 검수 결과

- 320×568에서 page-level 가로 스크롤이 없었다.
- 링크와 날짜는 40rem 미만에서 쌓이고, 40rem 이상에서 두 열로 정렬된다.
- 공개 sample을 draft로 바꾸기 전 긴 연속 문자열과 code block을 320px에서 확인했다. 본문은 넘치지 않았고 code block만 자체 가로 스크롤을 사용했다.
- root font size 200% 검사에서 가로 넘침과 block 겹침이 없었다.
- 홈 주요 링크는 320px에서 최소 32px 높이였고 행 간격으로 서로 구분됐다.
- 후속 타이포그래피 개선 뒤 1440px에서 사이트 shell은 58rem(계산값 1015px), 글 본문은 42rem(735px)을 유지했다.
- 모바일 17px·데스크톱 17.5px, 줄 높이 1.75를 적용했다. 고정 높이와 취약한 절대 배치는 없으며 화면 밖에 숨긴 skip link만 의도적으로 absolute positioning을 사용한다.

## 접근성 검수 결과

- `html lang="ko"`, banner·navigation·main·region·contentinfo, 페이지당 h1 하나와 순차 heading을 확인했다.
- 첫 Tab은 skip link로 이동했고 3px focus outline이 보였다. Enter 후 `main#main-content`로 focus와 viewport가 이동했다.
- 홈의 전체 Tab 순서는 skip link → 인덱스 7개 링크 → footer RSS → 제작 정보였고 trap이나 누락이 없었다.
- 링크는 색상뿐 아니라 밑줄로 구분되고 `:visited`가 별도 보라색으로 정의돼 있다.
- Lighthouse의 색상 대비 검사를 포함한 접근성 audit 49개가 모두 통과했다.
- 게시일·수정일은 `time datetime="YYYY-MM-DD"`로 출력된다.
- Archive에서는 현재 메뉴 하나만 `aria-current="page"`로 확인됐다.
- forced colors와 reduced motion을 함께 활성화해도 링크 밑줄과 3px focus outline이 유지됐다.
- native landmark·heading·list·link·time을 사용했으며 잘못된 role이나 상태 ARIA는 발견하지 못했다.

## 기능 검수 결과

- 전체 정적 페이지, RSS, sitemap과 robots가 production preview에서 정상 응답했다.
- 빈 메뉴와 깨진 내부 링크가 없다.
- 모든 파생 목록은 같은 Content Collections 데이터와 `getPublished()`를 사용한다.
- draft는 상세 route, 홈, 목록, Archive, RSS와 sitemap에서 제외됐다.
- root domain과 저장소형 `/repo/` Pages 경로를 각각 build해 내부 URL과 canonical을 확인했다.
- 404는 정적 파일로 생성되며 preview에서 실제 404 status를 반환했다.
- 핵심 콘텐츠는 JavaScript 없이 이용 가능하고 client bundle이 없다.
- 의존성은 Astro, 공식 RSS·sitemap과 검사 도구뿐이며 UI framework나 불필요한 runtime이 없다.
- README의 Node 24, 실행 명령, frontmatter, draft와 Pages base 설정은 실제 코드와 일치한다.

## 사용자가 브라우저와 실제 기기에서 확인할 부분

1. Windows Chrome·Edge와 Android, macOS·iOS Safari에서 Pretendard 로딩 전후의 가독성, 줄바꿈과 레이아웃 이동을 확인한다.
2. 실제 200% browser zoom과 OS 글자 크기 확대에서 홈과 실제 긴 글을 다시 확인한다.
3. NVDA 또는 VoiceOver로 홈, 실제 Writing 상세와 Archive의 제목·landmark·목록·날짜 읽기 흐름을 확인한다.
4. 터치 기기에서 인덱스와 좁은 footer 링크의 오조작 여부를 확인한다.
5. 실제 방문 기록이 있는 브라우저에서 visited 색이 탐색 이력을 충분히 구분하는지 확인한다.
6. 실제 콘텐츠를 공개하기 전에 sample을 대체하고 Writing·Notes·Lab의 내용 차이가 글 자체에서도 유지되는지 확인한다.
7. GitHub 저장소에서 Pages source를 GitHub Actions로 지정하고 workflow 성공을 확인한다.
8. custom domain을 사용할 때 GitHub Pages 설정과 DNS를 연결한 뒤 HTTPS, canonical, 내부 링크, RSS, sitemap과 404를 배포 URL에서 재검사한다. custom Actions workflow에서는 `public/CNAME`을 만들지 않는다.

## 2026-07-11 후속 타이포그래피·구조화 데이터 검사

- Pretendard Variable v1.3.9 공식 WOFF2(2,057,688 bytes)와 SIL OFL 1.1 원문을 저장소에서 자체 호스팅한다.
- production과 `/repo/` base build가 모두 성공했고, 생성된 WOFF2는 한 파일이다.
- 홈 JSON-LD의 `WebSite`·`Person`과 로컬 draft 상세의 `BlogPosting`을 실제 HTML에서 `JSON.parse`했다.
- 320px·1440px·root 글자 크기 200% 시뮬레이션에서 가로 넘침과 viewport 밖 block이 0건이었다.
- 초안 상세의 첫 Tab은 skip link로 이동하고 Enter 뒤 `main`에 초점이 놓였다.
- 개발 서버에서 글꼴 요청은 최초 200, reload cache 검증은 304였으며 페이지 오류 응답은 없었다.
- 첫 Writing 글은 2,449자(본문 공백 포함)이며 `draft: true`라 production route, RSS와 sitemap에서 제외됐다.
