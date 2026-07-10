# yoonsangwon.dev 사이트 명세

## 1. 사이트 목적

`yoonsangwon.dev`는 윤상원이 다음 주제에 관해 배우고, 시도하고, 이해한 내용을 축적하는 개인 블로그이자 장기 학습 아카이브다.

- UI 개발
- 웹 퍼블리싱
- 반응형 웹
- 웹 접근성
- HTML과 CSS
- 인터페이스 구현
- 개발 과정의 문제 해결
- AI를 활용한 작업 방식과 실험

사이트는 글을 쉽게 작성하고, 기록을 오래 보존하며, 과거 콘텐츠를 다시 찾기 쉽게 만드는 데 목적이 있다.

## 2. 비목적

첫 번째 버전은 다음을 목적으로 하지 않는다.

- 이력서나 Resume 제공
- 채용용 포트폴리오
- 경력 타임라인
- 성과와 수치 홍보
- 대표 프로젝트 전시
- 연락·채용 전환 CTA
- 개인 브랜드를 위한 마케팅 landing page
- SNS 반응과 방문자 지표 수집

운영의 결과로 관심사와 전문성이 드러날 수는 있지만 정보 구조를 그 목적에 맞추지 않는다.

## 3. 예상 독자

우선순위 순서:

1. 과거 기록을 다시 찾는 미래의 윤상원
2. 비슷한 구현 문제를 해결하는 UI 개발자와 웹 퍼블리셔
3. 접근성, 반응형, HTML·CSS, AI 활용 실험에 관심 있는 개발자
4. 특정 글의 검색·공유 링크로 들어온 일반 독자

독자가 윤상원을 사전에 알거나 경력 맥락을 이해한다고 가정하지 않는다.

## 4. 전체 정보 구조

- `/` - 사이트 정체성과 전체 콘텐츠 인덱스
- `/writing/` - 충분히 정리한 긴 글 목록
- `/writing/[slug]/` - Writing 상세
- `/notes/` - 짧은 공부와 문제 해결 기록
- `/notes/[slug]/` - Note 상세
- `/lab/` - 직접 수행한 실험과 시행착오
- `/lab/[slug]/` - Lab 상세
- `/archive/` - 모든 공개 콘텐츠의 연도·종류별 목록
- `/about/` - 짧은 글쓴이와 블로그 소개
- `/colophon/` - 제작 의도, 레퍼런스, 기술 구성
- `/rss.xml` - 공개 콘텐츠 RSS
- `/404.html` - 찾을 수 없는 페이지
- `/sitemap-index.xml` 또는 sitemap integration이 생성하는 경로

Work, Resume, Career 페이지는 만들지 않는다.

## 5. 홈페이지 콘텐츠 순서

1. 본문으로 이동하는 skip link
2. `header`
   - `Yoon Sangwon`
   - “UI 개발과 웹에 관해 배우고 시도한 내용을 기록합니다.”
3. 구분선
4. 주요 콘텐츠 인덱스이자 주 내비게이션
   - Writing 링크와 짧은 설명
   - Notes 링크와 짧은 설명
   - Lab 링크와 짧은 설명
   - Archive
   - About
   - Colophon
   - RSS
5. 최신 Writing 3개
6. 최신 Notes 5개
7. 최신 Lab 3개
8. 구분선
9. 운영 안내
10. 개인 의견·비공개 정보 고지
11. `footer`
   - 저작권
   - Colophon

공개 콘텐츠가 없는 유형은 빈 목록이나 가짜 글을 보여주지 않는다. 섹션 설명과 목록 링크만 두거나, 공개 글이 생길 때까지 해당 최신 목록을 숨긴다.

홈에서는 주요 콘텐츠 인덱스가 내비게이션을 겸한다. 내부 페이지에서는 같은 목적지를 짧은 텍스트 내비게이션으로 제공한다.

## 6. 페이지별 역할

### Writing

- 하나의 주제를 충분히 정리하고 독립적으로 읽을 수 있는 글
- 문제, 맥락, 판단과 결론이 포함될 수 있음
- 검색과 장기 참고를 고려한 설명 제공
- 목록에는 제목, 설명, 게시일 표시

### Notes

- 짧은 발견, 공부 내용, 코드 조각, 문제 해결 메모
- 완결된 에세이 형식을 요구하지 않음
- 목록에는 제목과 게시일을 우선하고 설명은 있을 때만 표시

### Lab

- 직접 수행한 구현 실험과 시행착오
- 질문, 조건, 시도, 결과, 한계를 기록
- 가능한 경우 본문에 demo나 source 링크 제공
- 성공과 실패를 모두 공개 가능한 범위에서 기록

### Archive

- Writing, Notes, Lab을 하나의 시간순 목록으로 제공
- 최신 연도부터 내림차순으로 그룹화
- 각 항목에 종류, 제목, 게시일 표시
- 클라이언트 검색과 filter 없이 HTML 링크로 탐색

### About

- 글쓴이와 블로그 목적을 짧게 설명
- 실제 경력, 연차, 소속, 성과는 사용자가 제공하기 전까지 작성하지 않음

### Colophon

- Berkshire Hathaway에서 참고한 정보 제공 원칙
- Astro, Markdown, 순수 CSS, GitHub Pages 구성
- 외부 웹폰트와 불필요한 JavaScript를 사용하지 않는 이유
- 사이트 제작·수정일

## 7. Archive 탐색 방식

첫 번째 버전:

- 연도별 heading
- 각 연도 안에서 최신순 목록
- 항목 앞에 `Writing`, `Note`, `Lab` 텍스트 표시
- 날짜와 제목을 모두 링크의 문맥으로 제공
- 페이지 상단에 유형별 목록으로 이동하는 일반 링크 제공

다음은 실제 필요가 생길 때까지 제외한다.

- 클라이언트 검색
- tag filter UI
- pagination
- 복합 정렬

검색은 콘텐츠가 충분히 쌓여 Archive와 브라우저 찾기로 탐색하기 어려워질 때 재검토한다.

## 8. Berkshire 레퍼런스 적용 규칙

- 상단에서 사이트 주체와 성격을 짧게 표시한다.
- 설명보다 실제 콘텐츠 링크를 빠르게 보여준다.
- 홈페이지를 콘텐츠 인덱스로 사용한다.
- 카드 대신 목록과 구분선을 사용한다.
- 링크 옆이나 아래에 게시일을 표시한다.
- 하단에 운영 안내, 개인 의견 고지, 저작권을 둔다.
- 방문한 링크 상태를 구분한다.

복제하지 않는 것:

- 원본 회사명, 로고, 주소와 문구
- 기업용 콘텐츠 분류
- 광고
- table 기반 2열 레이아웃
- 원본의 접근성·모바일 문제
- 오래된 HTML 구조

## 9. 시각 디자인 원칙

### 글꼴

- 외부 웹폰트를 사용하지 않는다.
- 본문은 시스템 serif stack을 우선 검토한다.
- 코드는 시스템 monospace stack을 사용한다.
- 한국어와 영문에서 읽기 품질이 떨어질 경우 시스템 sans-serif를 대안으로 비교한다.

후보:

```css
font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
```

실제 구현 단계에서 Windows, macOS, Android, iOS의 한국어 fallback을 시각 검수한 뒤 최종 확정한다.

### 색상

- 배경: 흰색
- 본문: 거의 검정
- 링크: 충분한 대비의 기본 파란색 계열
- 방문 링크: 충분한 대비의 보라색 계열
- 구분선: 본문보다 낮은 대비의 중성색
- focus outline: 배경과 링크 모두에서 분명한 색

색상만으로 링크, 콘텐츠 종류, draft 상태를 구분하지 않는다.

### 레이아웃

- mobile-first 단일 열
- 인덱스 최대 폭: 약 `72rem`
- 글 본문 최대 폭: 약 `45rem` 또는 `65ch`
- 좌우 padding: mobile `1rem`, 넓은 화면 `1.5rem` 이상
- 고정 높이와 절대 위치 사용 금지
- 카드, 그림자, 그라디언트, 배경 패널 사용 금지
- 제목과 여백을 과도하게 확대하지 않음

### 링크와 목록

- 링크는 항상 밑줄 표시
- underline offset과 thickness를 조정해 의도적인 기본형으로 표현
- `:visited` 상태 제공
- `:focus-visible`은 3px 이상 outline과 충분한 offset 제공
- 각 목록 행 전체를 block link로 만들지 않고 명확한 텍스트 링크와 날짜를 제공

## 10. 반응형 기준

- 기준은 콘텐츠가 자연스럽게 줄바꿈되는지이며 device 이름에 맞춘 breakpoint가 아니다.
- 링크명과 날짜는 넓은 화면에서 `minmax(0, 1fr) auto` 두 열로 배치할 수 있다.
- 약 `40rem` 이하에서는 링크와 날짜를 위아래로 쌓는다.
- 긴 제목과 URL에는 `overflow-wrap: anywhere`를 제한적으로 적용한다.
- code block은 자체 가로 스크롤을 허용하되 페이지 전체 가로 스크롤은 금지한다.
- 이미지와 embed는 컨테이너 너비를 넘지 않는다.
- `200%` text zoom에서 겹침, 잘림, 정보 손실이 없어야 한다.
- 터치 링크는 인접 링크와 구별되는 충분한 높이와 간격을 가진다.
- 홈 인덱스는 넓은 화면에서도 읽기 흐름이 흩어지지 않게 최대 폭을 유지한다.
- 햄버거 메뉴를 사용하지 않고 짧은 텍스트 내비게이션을 줄바꿈한다.

## 11. 접근성 기준

- `html lang="ko"`를 기본으로 설정
- skip link 제공
- `header`, `nav`, `main`, `article`, `section`, `footer`를 목적에 맞게 사용
- 페이지당 하나의 `h1`
- heading level을 건너뛰지 않음
- 현재 내비게이션 항목에 `aria-current="page"`
- 게시일과 수정일에 `time datetime`
- 링크 이름만 읽어도 목적지를 이해할 수 있음
- 모든 기능 키보드 사용 가능
- 강한 `:focus-visible` 스타일
- 색상에만 의존하지 않음
- 시각적 순서와 DOM 읽기 순서 일치
- native HTML로 해결되는 곳에 ARIA 추가 금지
- 고대비 모드에서 링크와 focus가 사라지지 않음
- motion은 기본적으로 사용하지 않으며 reduced motion에서도 정보 손실 없음

검증:

- 키보드만으로 모든 페이지와 링크 탐색
- 브라우저 접근성 트리 확인
- axe 또는 동등한 자동 검사
- 200% text zoom
- Windows High Contrast 또는 forced colors 확인
- 대표 화면 읽기 프로그램으로 제목·landmark·목록 흐름 확인

## 12. 성능 기준

- 정적 HTML 출력
- 초기 client JavaScript 0을 기본 목표로 설정
- 외부 웹폰트 0
- 첫 화면 장식 이미지 0
- CSS는 하나의 작은 global stylesheet를 기본으로 함
- third-party analytics와 embed 없음
- 불필요한 prefetch와 hydration 없음
- 이미지가 있을 때 width와 height 명시
- production build에서 빈 JavaScript bundle이 생성되지 않는지 확인
- Lighthouse Performance 95 이상을 참고 기준으로 사용하되 실제 전송량과 렌더링을 함께 확인

## 13. 기능 우선순위

### P0 - 첫 공개에 필수

- 홈 콘텐츠 인덱스
- Writing, Notes, Lab 목록과 상세
- Archive
- 공개 글 날짜
- draft 제외
- Markdown 추가 시 목록 자동 반영
- page title과 description
- canonical URL
- RSS
- sitemap
- 404
- GitHub Pages 자동 배포
- responsive·keyboard·screen reader 검증

### P1 - 콘텐츠가 생기면 검토

- 관련 글
- 이전·다음 글
- 수정 이력 설명
- topic 페이지

### 제외

- 검색
- 댓글, 좋아요, 조회수
- 로그인
- 뉴스레터
- 다크 모드
- 복잡한 tag filter
- 애니메이션
- 이미지 중심 thumbnail
- SNS 공유 button
- Resume, 경력 timeline, Selected Work
- 채용·연락 CTA

## 14. SEO, RSS와 sitemap 기준

- 각 페이지에 고유한 title과 description
- `yoonsangwon.dev`를 기준으로 canonical 생성
- Open Graph는 text metadata만 제공하며 기본 이미지 제작은 필수 아님
- 공개 콘텐츠만 sitemap과 RSS에 포함
- draft는 모든 목록, route, RSS, sitemap에서 제외
- RSS에는 title, description, published, canonical link 포함
- 수정일은 실제 내용이 의미 있게 바뀐 경우만 갱신
- 삭제보다 URL 보존과 정정 안내를 우선
- robots.txt는 공개 정적 사이트의 색인을 막지 않게 단순하게 유지

## 15. 최종 기술 스택

- Astro 7.x
- Astro Content Collections
- Markdown
- 순수 CSS
- 필요한 경우에만 작은 vanilla JavaScript
- Node.js LTS와 npm lockfile
- 공식 RSS package
- 공식 sitemap integration
- GitHub Actions
- GitHub Pages

구현 직전에 최신 Astro 공식 문서에서 지원 Node version, Content Collections API, RSS·sitemap API와 GitHub Pages workflow를 다시 확인하고 정확한 version을 고정한다.

사용하지 않는 것:

- React, Vue, Svelte
- Tailwind CSS
- MDX
- CMS
- View Transitions
- client router
- UI component library
- analytics SDK
- 외부 웹폰트

## 16. GitHub Pages 배포 방식

1. source와 Markdown을 `main` branch에 push
2. GitHub Actions에서 고정한 Node와 npm lockfile 사용
3. production build 실행
4. `dist` artifact 업로드
5. GitHub Pages 배포

설정 원칙:

- 최종 custom domain은 `https://yoonsangwon.dev`
- Astro `site`는 custom origin으로 설정
- repository subpath preview가 필요하면 `base`를 공식 문서에 따라 설정
- internal URL, canonical, RSS, sitemap이 같은 origin 규칙을 사용
- Windows에서 성공한 경로가 Linux Actions에서도 일치하도록 file name 대소문자 검사
- 배포 전 production build와 generated URL 검사

## 17. 첫 번째 버전 완료 조건

- 명시한 7개 페이지와 콘텐츠 상세 route가 존재한다.
- 공개 Writing, Notes, Lab이 홈·각 목록·Archive에 자동 반영된다.
- draft 콘텐츠는 build output에 route를 만들지 않는다.
- 모든 페이지에 고유 title, description, canonical이 있다.
- RSS와 sitemap에 공개 콘텐츠만 포함된다.
- custom domain과 GitHub Pages 경로에서 내부 링크와 asset이 깨지지 않는다.
- mobile부터 desktop까지 페이지 전체 가로 스크롤이 없다.
- 200% text zoom에서 콘텐츠 손실이 없다.
- 키보드로 모든 링크를 탐색할 수 있고 focus가 보인다.
- heading, landmark, list, time 요소가 의미론적으로 구성된다.
- production build가 성공한다.
- 초기 client JavaScript가 없거나 명시적으로 승인된 최소량뿐이다.
- README나 Colophon에 기술 구성과 운영 방법이 기록된다.
