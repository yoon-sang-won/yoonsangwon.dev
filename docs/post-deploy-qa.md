# GitHub Pages 배포 후 QA

- 확인일: 2026-07-11
- 사용자 제공 URL: `여기에 실제 github.io URL 입력`으로 placeholder 상태
- 저장소 설정에서 확인한 대상 URL: `https://yoon-sang-won.github.io/yoonsangwon.dev/`
- 판정: **배포되지 않음 — 최종 공개 검증 진행 불가**

## 판정 근거

대상 URL은 HTTPS 연결에는 성공하지만 사이트가 아니라 GitHub Pages 기본 404를 반환한다.

- 공개 저장소: `https://github.com/yoon-sang-won/yoonsangwon.dev`
- GitHub REST API: `has_pages: false`
- GitHub Actions workflow 실행: 0건
- GitHub Contents API: `This repository is empty.`
- 대상 URL 응답: HTTP 404, title `Page not found · GitHub Pages`, `Yoon Sangwon` 콘텐츠 없음

따라서 CSS·글꼴·레이아웃·canonical·JSON-LD·RSS·sitemap·draft 제외와 Lighthouse를 “실제 배포 사이트에서 통과했다”고 주장할 수 없다. 현재 문제는 사이트 구현 결함이 아니라 아직 commit, push와 Pages 배포가 이루어지지 않은 외부 상태다.

## 공개 URL별 상태

| URL | 예상 역할 | 실제 상태 |
|---|---|---|
| `https://yoon-sang-won.github.io/yoonsangwon.dev/` | 홈페이지 | **404** — GitHub Pages 기본 404 |
| `/writing/` | Writing 목록 | **404** — 공개 검증 불가 |
| `/notes/` | Notes 목록 | **404** — 공개 검증 불가 |
| `/lab/` | Lab 목록 | **404** — 공개 검증 불가 |
| `/archive/` | Archive | **404** — 공개 검증 불가 |
| `/about/` | About | **404** — 공개 검증 불가 |
| `/colophon/` | Colophon | **404** — 공개 검증 불가 |
| `/rss.xml` | RSS | **404** — 공개 검증 불가 |
| `/sitemap-index.xml` | sitemap index | **404** — 공개 검증 불가 |
| `/robots.txt` | robots | **404** — 공개 검증 불가 |
| `/missing-page/` | 사용자 정의 404 | **404**이지만 사이트의 사용자 정의 404가 아니라 GitHub 기본 404 |

모든 응답은 같은 GitHub 404 HTML 9,379 bytes였다.

## HTTPS 상태

- `yoon-sang-won.github.io`의 TLS 연결은 정상이다.
- 인증서 CN: `*.github.io`
- TLS: 1.3
- 인증서 검증: 성공
- 확인 당시 인증서 유효 기간: 2026-06-04–2026-09-02

이는 GitHub 호스트의 HTTPS가 정상이라는 뜻이며 `yoonsangwon.dev` 프로젝트 사이트가 배포됐다는 증거는 아니다.

## CSS, 글꼴과 정적 자산

실제 공개 URL에서는 모두 404이므로 자산 로딩을 확인할 수 없다.

Pages 환경변수로 만든 로컬 production 산출물은 다음을 통과했다.

- `SITE_URL=https://yoon-sang-won.github.io`
- `BASE_PATH=/yoonsangwon.dev`
- CSS 안의 글꼴 URL: `/yoonsangwon.dev/_astro/PretendardVariable.CJuje-Rk.woff2`
- WOFF2: 1개, 2,057,688 bytes
- client JavaScript: 0
- 내부 URL과 asset base 검증 통과

이 결과는 배포할 artifact의 준비 상태만 증명하며 실제 CDN 응답, cache header와 전송 속도는 증명하지 않는다.

## 모바일·데스크톱 레이아웃

실제 배포 페이지가 없어 로컬과의 screenshot·DOM·계산 스타일 비교를 진행하지 않았다. GitHub 404를 검사해 사이트 레이아웃 결과로 기록하지 않는다.

배포 후 최소 390×844와 1440×900에서 다음을 다시 비교한다.

- page-level 가로 넘침
- site shell과 장문 본문 폭
- 제목·날짜 줄바꿈
- footer와 link index 간격
- Pretendard 로드 전후 줄 수
- 첫 화면에서 Writing·Notes·Lab·Archive 접근 단계

## 내부 링크와 404

- 실제 사이트 내부 링크: 검증 불가
- 실제 사용자 정의 404: 검증 불가
- 로컬 Pages-base production build: 내부 링크 0건 깨짐, 사용자 정의 `404.html` 생성 확인

배포 후에는 모든 내부 링크를 같은 origin에서 순회하고, 존재하지 않는 경로가 HTTP 404와 사이트의 한국어 404 본문을 함께 반환하는지 확인해야 한다.

## RSS와 sitemap

- 공개 `/rss.xml`: 404
- 공개 `/sitemap-index.xml`: 404
- 공개 `/robots.txt`: 404
- 로컬 Pages-base build: 세 파일 생성, XML·내부 URL 검증 통과

현재 공개 상태는 **실패**다. 배포 후 HTTP 200, MIME type, XML parse, absolute URL과 draft slug 부재를 다시 검사한다.

## canonical

공개 페이지가 없어 실제 canonical은 검증할 수 없다.

로컬 Pages-base build의 홈 canonical은 다음과 같이 올바르게 생성됐다.

`https://yoon-sang-won.github.io/yoonsangwon.dev/`

About 등 내부 페이지도 같은 origin과 `/yoonsangwon.dev/` base를 사용한다. 배포 후 page source에서 실제 응답 URL과 canonical이 일치하는지 다시 확인해야 한다.

## JSON-LD와 Google Rich Results Test 대상

현재 공개 URL이 404이므로 Google Rich Results Test에 넣을 수 있는 사이트 페이지가 없다.

| 페이지 | 현재 공개 여부 | 예상 JSON-LD schema type | Rich Results Test 판단 |
|---|---|---|---|
| 홈페이지 | 404 | `WebSite`, `Person` (`@graph`) | 배포 후 검사. Google rich result 지원 유형이 아닐 수 있으므로 JSON 유효성과 entity 연결은 Schema.org Validator도 함께 사용 |
| About | 404 | 현재 JSON-LD 없음 | 지원 rich result 예상 없음. 화면의 실제 About 존재와 홈 `Person.mainEntityOfPage` 연결만 확인 |
| 공개 Writing 상세 | 없음 | `BlogPosting` | 공개 글이 생긴 뒤 해당 상세 URL 검사 |
| 공개 Notes 상세 | 없음 | `BlogPosting` | 공개 Note가 생긴 뒤 해당 상세 URL 검사 |
| 공개 Lab 상세 | 없음 | `BlogPosting` | 공개 Lab이 생긴 뒤 해당 상세 URL 검사 |

첫 Writing `why-this-blog-is-text-first`는 `draft: true`이므로 공개 Rich Results Test 대상에서 제외한다.

로컬 Pages-base build의 홈 JSON-LD는 `JSON.parse`를 통과했고 `WebSite`·`Person`의 URL은 github.io origin과 repository base를 사용한다. 이는 실제 공개 검증을 대신하지 않는다.

## draft 제외 상태

- 로컬 Pages-base production build: `npm run verify` 통과
- 첫 Writing route, 제목과 slug: production HTML·RSS·sitemap에서 제외
- 실제 공개 사이트: 전체가 404이므로 draft 제외를 독립적으로 확인할 수 없음

배포 후 다음 URL이 404인지 직접 확인한다.

`https://yoon-sang-won.github.io/yoonsangwon.dev/writing/why-this-blog-is-text-first/`

동시에 홈·Writing·Archive·RSS·sitemap에 제목과 slug가 없는지 검사해야 한다.

## 글꼴 로딩과 fallback

실제 공개 사이트에서 글꼴 요청, cache header, transfer size, `font-display: optional` 동작과 차단 fallback은 확인하지 못했다.

로컬 production 검수에서 확인된 값:

- 요청 예정 수: WOFF2 1개
- 크기: 2,057,688 bytes
- 로드 실패 시 system sans-serif fallback으로 본문 표시
- `font-display: optional`로 느린 첫 방문에는 fallback 우선

배포 후 실제 CDN에서 다음을 다시 측정한다.

1. 최초 요청의 HTTP 200, MIME type과 transfer size
2. reload의 memory/disk cache 또는 304 여부
3. 글꼴 URL을 차단한 상태의 본문 표시와 가로 넘침
4. 느린 모바일 네트워크에서 FCP와 font swap 여부

## Lighthouse

실제 사이트가 404이므로 모바일·데스크톱 Lighthouse를 실행하지 않았다. GitHub 기본 404의 점수는 이 사이트의 성능 증거가 아니기 때문이다.

배포 후 홈페이지와 첫 공개 장문 상세에서 각각 mobile·desktop navigation audit를 실행한다. 기록할 항목은 Performance, Accessibility, Best Practices, SEO, FCP, LCP, CLS, TBT와 전체 전송량이다.

## 장문 읽기와 Berkshire식 링크 인덱스

- 실제 공개 장문: 없음
- 첫 Writing: draft라 공개 URL 없음
- 실제 홈 link index: 404라 확인 불가

로컬 production 구조는 link-first 홈과 42rem 장문 본문, 1.75 line-height, 본문 소제목·문단 간격을 유지한다. 배포 후 실제 렌더링에서 동일한 계산값과 탐색 순서를 다시 확인해야 한다.

## 이번에 수정한 내용

사이트 구현 결함은 발견하지 못해 코드와 디자인을 수정하지 않았다. 이 문서만 추가했다.

Pages용 production build는 다시 실행했다.

- `npm run check`: 오류·경고·hint 0
- `npm run build`: 8 pages, 성공
- `npm run verify`: JSON-LD, 내부 URL, canonical, draft 제외와 글꼴 검증 통과

## 배포를 실제로 완료하기 위한 조건

1. 현재 로컬 파일을 검토한 뒤 commit한다.
2. `main` branch를 `origin`에 push한다.
3. GitHub Settings → Pages에서 Source를 GitHub Actions로 설정한다.
4. `Deploy to GitHub Pages` workflow의 build와 deploy job 성공을 확인한다.
5. workflow가 제공한 `page_url` 또는 실제 github.io URL을 다시 제공한다.
6. 이 문서의 14개 공개 검증 항목을 실제 응답 기준으로 다시 실행한다.

commit, push, Pages 설정과 배포는 외부에 공개되는 변경이므로 이번 검수 요청만으로 대신 수행하지 않았다.

## Windows에서 사용자가 직접 확인할 항목

배포가 완료된 뒤 실제 URL에서 확인한다.

1. 설치형 Chrome·Edge의 100%·200% zoom
2. 강력 새로고침과 cache 재방문의 Pretendard 표시·줄 수 변화
3. NVDA의 skip link, landmark, heading, 목록과 날짜 읽기 순서
4. Windows High Contrast의 링크 밑줄과 focus outline
5. 긴 제목·URL·code block의 가로 넘침

현재 Windows 호스트에서 자동 검사를 수행했지만 설치형 브라우저·NVDA·실사용 환경을 확인했다고 주장하지 않는다.

## macOS에서 사용자가 직접 확인할 항목

배포가 완료된 뒤 실제 URL에서 확인한다.

1. Safari의 Pretendard variable weight 400·700 표시
2. Apple SD Gothic Neo fallback과 Pretendard의 줄 수·기준선 차이
3. 100%·200% zoom과 좁은 창의 줄바꿈
4. VoiceOver의 skip link, landmark, heading, 목록과 날짜 순서
5. iPhone 세로·가로 화면의 link index와 footer 터치 간격

macOS·iOS 실제 환경은 이번에 확인하지 않았다.

## 최종 판단

- 첫 글을 `draft: false`로 전환: **아직 전환하지 말 것.** 먼저 Pages 배포를 정상화하고 사용자가 글의 사실·공개일을 확인한 뒤, 공개 상세 URL의 BlogPosting·레이아웃·Lighthouse를 검사해야 한다.
- 커스텀 도메인 연결: **아직 연결하지 말 것.** github.io 기본 배포와 14개 공개 검증 항목이 통과한 뒤 workflow의 `SITE_URL`·`BASE_PATH`를 custom domain 값으로 바꾸고 DNS를 연결한다.
