# 장문 읽기·탐색·접근성 QA

- 검수일: 2026-07-11
- 대상: `yoonsangwon.dev` Astro 정적 사이트와 첫 Writing 초안
- 범위: UI, 한글 웹 타이포그래피, 접근성의 독립 검수와 production 산출물 교차검증
- 원칙: 새 기능이나 디자인을 추가하지 않고 재현된 결함만 최소 수정

## 결론

| 대상 | 판정 | 이유 |
|---|---|---|
| 첫 글 공개 준비 상태 | **조건부 준비됨** | 문장·구조·모바일 가독성·BlogPosting 일치는 통과했다. `draft: true`를 유지했으며, 사용자가 아래 문장과 실제 공개일을 확인해야 한다. |
| 사이트 배포 준비 상태 | **조건부 준비됨** | production build, 내부 링크, 접근성, 반응형, RSS·sitemap·404와 draft 제외는 통과했다. 실제 GitHub Actions 배포, 누적 콘텐츠가 있는 Archive, 실제 기기와 보조기술 검증이 남았다. 2.06MB 글꼴은 느린 첫 방문에서 fallback을 쓰지만 전송량 위험이 남는다. |
| 도메인 연결 준비 상태 | **준비되지 않음** | 현재 workflow는 GitHub 저장소 하위 경로용 origin과 base를 사용한다. 먼저 Pages 배포 성공을 확인하고 workflow를 custom domain 값으로 바꾼 뒤 DNS·HTTPS·canonical·RSS·sitemap·404를 배포 URL에서 다시 확인해야 한다. |

## 테스트 환경

### 테스트한 화면 크기

- 세로: 320×568, 360×800, 390×844, 768×1024
- 가로·데스크톱: 844×390, 1024×768, 1280×800, 1440×900, 1600×900
- 200% 글자 확대 대체 검사: 320px와 1280px에서 root font size를 200% 상당으로 변경
- 실제 브라우저 zoom 200%와 OS 글자 크기 확대는 자동화하지 못했다.

### 테스트한 브라우저

- Windows 호스트의 Playwright bundled Chromium, Firefox, WebKit 엔진
- 수정 후 targeted 회귀 검사는 Chromium에서 다시 실행
- Lighthouse 13.4.0 mobile·desktop navigation audit

Playwright WebKit은 Safari와 같은 계열의 렌더링 엔진이지만 macOS Safari 실기기 검사가 아니다. Windows WebKit에서는 첫 Tab 초점 이동을 신뢰성 있게 재현하지 못해 해당 결과를 통과로 주장하지 않는다.

### 실제 확인하지 못한 환경

- macOS·iOS Safari와 VoiceOver
- Android 실제 기기
- 설치형 Windows Chrome·Edge와 NVDA
- 실제 browser zoom 200%, OS 글자 크기 확대와 Windows forced colors
- 느린 실제 모바일 회선의 첫 방문과 캐시 재방문

## 독립 검수 요약

- UI 개발자 관점: 320–1600px에서 가로 넘침·잘림·날짜 충돌을 재현하지 못했다. 링크 인덱스, 장문 폭, 긴 제목과 code block 처리가 명세와 일치했다.
- 한글 웹 타이포그래피 관점: 첫 글의 조사 오류 1건과 본문 소제목 절 구분 부족 1건을 확인했다. 글꼴 파일·라이선스·weight 범위와 한글 글리프는 통과했다.
- 접근성 관점: footer 기능 링크의 작은 클릭 영역과 상세 글 작성자 표시·About URL 불일치를 확인했다. 의미 구조, 대비, draft 제외, 날짜와 canonical은 통과했다.

## 글꼴 검수 결과

- Pretendard Variable v1.3.9의 공식 WOFF2를 자체 호스팅한다. 저장소 파일은 공식 배포본과 크기 2,057,688 bytes 및 SHA-256 `9599f12fd42fc0bce1cd50b47a0c022e108d7aa64dd0d1bb0ed44f3282d900b4`가 일치했다.
- 공식 출처: [orioncactus/pretendard](https://github.com/orioncactus/pretendard/tree/v1.3.9)
- 라이선스: SIL Open Font License 1.1. 공식 저장소는 글꼴 단독 판매를 제외한 상업적 사용·수정·재배포를 허용한다고 명시한다. `src/assets/fonts/LICENSE.txt`가 v1.3.9 원문과 일치하고 글꼴 metadata에도 라이선스와 저작권이 들어 있다.
- `@font-face`의 `font-weight: 45 920`은 공식 가변 글꼴 선언과 일치해 WebKit 범위 누락이 없다.
- 실제 UI는 400과 700만 사용한다. 얇은 본문 weight는 없다.
- fallback은 Windows에서 `Segoe UI`·`Malgun Gothic`, macOS에서 `-apple-system`·`Apple SD Gothic Neo`, 마지막에 generic `sans-serif`를 둔다. code는 시스템 monospace stack을 사용한다.
- 전송은 WOFF2 한 요청, 2,057,688 bytes다. 요청 수는 적지만 첫 방문 전송량은 크다.
- `font-display: optional`로 느린 첫 방문에는 fallback을 유지한다. 50 KiB/s·150ms 지연 Chromium 에뮬레이션에서 Pretendard가 아직 로드되지 않은 상태로 FCP 288ms, 본문 표시와 가로 넘침 없음이 확인됐다.
- 글꼴 요청을 차단한 320px 검사에서도 본문 2,271자가 표시되고 page-level 가로 넘침이 없었다.
- Lighthouse CLS는 mobile·desktop 모두 0이었다. 실제 Windows·macOS에서 fallback과 Pretendard의 기준선·줄 수 차이는 별도 확인이 필요하다.

## 장문 가독성 검수 결과

- 기본 글자 크기는 모바일 17px, 40rem 이상 17.5px, 줄 높이 1.75다.
- 장문 본문은 최대 42rem이며 1440px에서 약 735px로 유지됐다. 넓은 화면에서도 한 줄이 과도하게 길지 않다.
- 한글 본문은 `word-break: keep-all`과 비상 줄바꿈용 `overflow-wrap: anywhere`를 함께 사용한다.
- 문단 사이는 1.1rem으로 구분되며, 첫 소제목을 제외한 본문 `h2` 앞 여백을 2.25rem으로 늘려 앞 절과 다음 절의 경계를 분명히 했다.
- 링크는 파란색·밑줄, 방문 링크는 보라색·밑줄을 함께 사용해 색에만 의존하지 않는다.
- 한글·영문·숫자와 괄호, inline code의 크기와 줄바꿈에서 자동화로 재현된 결함이 없었다. 실제 OS별 안티앨리어싱과 기준선은 미확인이다.

## 반응형 검수 결과

- 지정한 모든 viewport에서 홈, Archive, 목록, 첫 Writing 초안과 긴 문자열·code sample의 page-level 가로 스크롤이 없었다.
- 320px 첫 글 본문 폭은 약 271px, 390px에서는 약 341px, 768px에서는 약 701px, 1024px 이상에서는 최대 약 735px였다.
- 긴 제목은 컨테이너 안에서 줄바꿈하고, code block과 표만 자체 가로 스크롤을 허용한다.
- 40rem 미만에서는 제목·날짜가 쌓이고, 이상에서는 `minmax(0, 1fr) auto` 두 열로 배치돼 날짜와 제목이 충돌하지 않는다.
- 메뉴는 작은 화면에서 JavaScript 없이 줄바꿈한다. footer 링크는 수정 후 Chromium 320px에서 높이 42px로 측정됐다.
- root font size 200% 대체 검사에서 320px·1280px 모두 가로 넘침이 없었다.
- 실제 공개 콘텐츠가 0개여서 많은 글이 누적된 Archive의 실제 밀도와 매우 길거나 매우 짧은 공개 글 조합은 확인하지 못했다.

## Berkshire 형식과 사용 편의 검수 결과

- 첫 화면은 짧은 정체성 다음에 Writing, Notes, Lab, Archive, About, Colophon과 RSS로 직접 이동하는 링크 인덱스를 제공한다.
- 카드·그림자·배경 패널 없이 구분선과 간격으로 계층을 나눈다.
- 공개 글이 생기면 링크 제목과 날짜가 같은 목록 데이터에서 나오며 모바일에서는 날짜가 다음 줄로 내려간다.
- 최신 글 영역은 공개 콘텐츠가 있을 때만 인덱스 다음에 나타난다. Archive 이동은 홈 인덱스, 내부 nav와 상세 하단에서 제공한다.
- 레트로 색·serif만 흉내 낸 화면이나 평범한 card grid로 바뀌지 않았다. 현재 빈 콘텐츠 상태에서도 label, 설명, 운영 안내와 footer가 있어 미완성 wireframe처럼 보이지 않는다.

## 접근성 검수 결과

- `lang="ko"`, skip link, `header`·`nav`·`main`·`article`·`section`·`footer`, 페이지당 h1 하나와 순차적인 h2를 확인했다.
- Chromium·Firefox에서 첫 Tab은 skip link로 이동했고 Enter 뒤 `main#main-content`로 초점이 이동했다. outline은 0.2rem이다.
- 링크·목록·날짜는 native `a`·`ul`·`li`·`time`을 사용하며 이름 없는 링크와 잘못된 ARIA를 찾지 못했다.
- 넓은 화면의 CSS grid에서도 DOM 순서는 제목→날짜→설명으로 유지된다.
- 최저 주요 텍스트 대비 측정값은 7.46:1이었다. 링크는 밑줄, focus는 outline을 함께 사용한다.
- JSON-LD script 외 client JavaScript는 0이며 JavaScript가 비활성화돼도 핵심 콘텐츠가 동일하게 남는다.
- Lighthouse Accessibility는 mobile·desktop 모두 100이었다.
- NVDA·VoiceOver와 실제 forced colors는 확인하지 못했다.

## 첫 Writing 글 검수 결과

- `draft: true`를 유지했으며 production 상세 route, 홈·Writing·Archive 목록, RSS와 sitemap에 포함되지 않는다.
- 제목·description과 본문은 개인 블로그를 텍스트 중심 기록 공간으로 운영하려는 같은 내용을 설명한다.
- 가상의 직장·경력·고객·프로젝트·성과·수치가 없고 이력서·채용 포트폴리오 홍보 문구로 변질되지 않았다.
- 7개 소제목과 짧은 문단으로 구성돼 모바일에서 읽기 흐름이 끊기지 않는다.
- 반복적인 결론이나 과도한 추상 문장은 추가로 수정하지 않았다.
- 문법상 어색했던 “이 사이트는 그렇게 기록의 본진으로 만들기로 했다”만 “이 사이트를 그렇게 기록의 본진으로 만들기로 했다”로 고쳤고 `docs/content-review.md`에 기록했다.
- 화면의 작성자 `Yoon Sangwon`, 게시일 `2026-07-11`, 제목과 description은 draft BlogPosting과 일치한다.

## JSON-LD 검수 결과

- 생성된 JSON-LD는 모두 `JSON.parse`를 통과했다.
- 홈은 하나의 `@graph`에 `WebSite`와 `Person`을 한 번씩만 출력한다.
- draft 상세는 `BlogPosting` 하나를 출력하며 `noindex`다. production에는 해당 route와 JSON-LD가 없다.
- `@id`, `url`, `mainEntityOfPage`, author URL과 canonical은 절대 URL이다.
- BlogPosting author의 `url`은 실제 `/about/`를 가리키고 화면에도 같은 이름의 About 링크를 표시한다.
- `datePublished`는 frontmatter와 화면의 게시일이 일치한다. `updated`가 없으므로 `dateModified`를 만들지 않는다.
- 가짜 image, sameAs, 소셜 프로필, 경력·소속·성과는 없다.
- canonical과 JSON-LD는 현재 build의 `https://yoonsangwon.dev` origin 규칙을 공유한다.

## 성능 및 안정성 검수 결과

- `npm run check`: 22 files, 오류·경고·hint 0
- `npm run build`: 8 HTML page 생성, 성공
- `npm run verify`: JSON-LD, 내부 URL, canonical, draft 제외와 글꼴 검증 통과
- 생성 자산: WOFF2 1개 2,057,688 bytes, client JavaScript와 `.js` bundle 0, 별도 client stylesheet 요청 0
- 깨진 내부 링크 0건, RSS·sitemap XML 유효, custom 404가 누락 경로에서 HTTP 404로 응답
- 빈 favicon을 명시해 브라우저의 암묵적 `/favicon.ico` 404와 console error를 제거했다. 새 시각 디자인은 추가하지 않았다.
- 최종 Lighthouse:
  - mobile: Performance 56, Accessibility 100, Best Practices 100, SEO 100
  - desktop: Performance 83, Accessibility 100, Best Practices 100, SEO 100
  - CLS 0, TBT 0ms
- Lighthouse Performance는 2.06MB 글꼴 전체를 렌더 의존성으로 모델링해 mobile FCP·LCP 10.8s, desktop 1.8s로 계산했다. 반면 동일 production preview의 실제 Chromium 50 KiB/s 에뮬레이션은 fallback FCP 288ms를 기록했다. 따라서 점수는 전송량 위험으로 유지하되 “본문이 10.8초 동안 보이지 않는다”는 실제 관찰로 해석하지 않는다.
- custom domain용 build와 실제 GitHub Pages workflow는 이번 검수에서 실행하지 않았다.

## 수정한 내용

1. 첫 글의 조사 오류 1문장을 최소 수정하고 content review에 기록했다.
2. 장문 본문 소제목의 앞 여백을 늘려 절 경계를 분명히 했다.
3. footer 기능 링크의 세로 클릭 영역을 늘렸다.
4. 상세 글에 작성자·About 링크를 표시하고 BlogPosting author URL을 같은 About 페이지로 맞췄다.
5. `font-display`를 `optional`로 바꿔 느린 첫 방문의 fallback 표시와 늦은 layout swap 방지를 우선했다.
6. 새 아이콘 디자인 없이 빈 favicon을 명시해 불필요한 404를 제거했다.

## 실제 Windows에서 확인할 항목

1. 설치형 Chrome·Edge에서 강력 새로고침과 캐시 재방문을 비교해 Segoe UI·Malgun Gothic fallback에서 Pretendard로 바뀌는지와 줄 수 변화를 본다.
2. 브라우저 zoom 200%와 Windows 텍스트 크기 확대에서 홈, 첫 Writing, Archive, 긴 URL과 code block을 확인한다.
3. 키보드만으로 skip link, nav, 본문 링크와 footer를 이동하고 focus outline이 잘리지 않는지 본다.
4. NVDA로 제목·landmark·목록·작성자·게시일 읽기 순서를 확인한다.
5. Windows High Contrast에서 링크 밑줄, visited와 focus가 유지되는지 확인한다.
6. 터치 가능한 Windows 기기에서 nav와 footer 링크의 오조작 여부를 확인한다.

## 실제 macOS에서 확인할 항목

1. Safari에서 `font-weight: 45 920` 가변 축과 400·700 차이가 정상인지 확인한다.
2. Apple SD Gothic Neo fallback과 Pretendard의 한글·영문·숫자·괄호 기준선, 줄 수와 layout shift를 비교한다.
3. Safari zoom 200%, macOS 글자 확대와 좁은 창에서 가로 넘침·잘림을 확인한다.
4. VoiceOver로 skip link, nav, h1→h2, 목록, 작성자·날짜와 footer 순서를 확인한다.
5. iPhone 세로·가로 화면에서 긴 제목, inline code, footer와 터치 간격을 확인한다.
6. 방문한 링크의 보라색과 focus outline이 실제 디스플레이에서 충분히 구분되는지 확인한다.

## 공개 전에 사용자가 읽어야 하는 첫 글 문장

다음 내용이 실제 경험과 운영 의도에 맞는지 사용자가 직접 확인해야 한다.

1. “메모가 여러 서비스와 폴더에 흩어지면 당시에는 편해도 시간이 지난 뒤에는 맥락을 되짚기 어려웠다.”
2. “플랫폼은 유입과 대화의 통로로 활용할 수 있지만, 원문과 축적의 중심은 이곳에 두려 한다.”
3. “이곳에서는 해결하지 못한 문제와 판단을 바꾼 이유도 가능한 범위에서 함께 기록하고 싶다.”
4. “자동 검사만 통과하는 데서 끝내지 않고 키보드 순서와 실제 기기에서의 줄바꿈도 살펴볼 계획이다.”
5. “AI는 글과 코드의 초안을 빠르게 만들고 빠뜨린 항목을 찾는 도구로 사용한다.”
6. “그렇더라도 게시 전에 사실과 문장, 코드가 실제로 맞는지는 직접 검토하려 한다.”
7. `published: 2026-07-11`이 실제 공개일인지, 공개하는 날로 바꿀지 확인한다.
