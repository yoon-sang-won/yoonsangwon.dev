# yoonsangwon.dev 기술 스택 조사

## 1. 조사 목적과 프로젝트 조건

이 문서는 2026년 6월 10일부터 7월 10일까지 개인 블로그와 정적 사이트 운영자가 공유한 경험을 바탕으로 Astro와 순수 HTML/CSS를 비교한다. 새로운 조사는 추가하지 않았다.

프로젝트 조건:

- 개인 개발 블로그이자 장기 학습 아카이브
- GitHub 코드 관리와 GitHub Pages 배포
- Writing, Notes, Lab 콘텐츠 운영
- 향후 수십 개 이상의 Markdown 문서
- Berkshire Hathaway에서 영감을 받은 문서 인덱스형 홈
- 정적이고 텍스트 중심인 디자인
- 클라이언트 JavaScript 최소화
- 한 사람이 장기간 관리
- 반응형, 접근성, 빠른 로딩, 낮은 유지비용 우선
- 모바일, 키보드, 화면 읽기 프로그램, 긴 제목과 URL 지원
- Archive, RSS, sitemap과 안정적인 자산 경로 필요

## 2. 조사 날짜

- 조사 수행일: 2026-07-10
- 주요 관찰 기간: 2026-06-10부터 2026-07-10
- 자료 우선순위: Reddit 운영 경험, Hacker News 반응, GitHub issue·PR, 실제 운영자 글, 공식 문서
- 한계: Astro 관련 최근 자료는 충분했지만 순수 HTML/CSS는 전용 제품명과 커뮤니티가 없어 직접적인 최근 후기가 적었다.

## 3. Astro와 순수 HTML/CSS 비교

| 항목 | Astro | 순수 HTML/CSS |
|---|---|---|
| 초기 시작 | Node, npm, Astro 구조 학습 필요 | 파일 작성 후 바로 배포 |
| Markdown | Content Collections로 직접 관리 | 별도 변환기나 수동 HTML 필요 |
| 글 목록 | 콘텐츠 데이터에서 자동 생성 | 목록 파일을 수동 갱신 |
| 공통 레이아웃 | Layout과 component로 공유 | 페이지마다 복제 |
| RSS·sitemap | 공식 패키지로 생성 가능 | 직접 XML 생성·갱신 |
| 배포 | GitHub Actions 빌드 필요 | 정적 파일 직접 배포 가능 |
| 의존성 | Node, Astro, Vite와 패키지 업데이트 | 빌드 도구가 없으면 없음 |
| 장기 방치 | 환경 복구·업데이트 부담 | 단일 수정은 쉬우나 전역 수정은 반복적 |
| 최종 성능 | 기본 정적 HTML, JS 0 가능 | 최소 비용을 직접 통제 |
| 적정 규모 | 여러 섹션과 수십 개 콘텐츠 | 소수의 고정 페이지 |

핵심 차이는 브라우저 결과물이 아니다. 두 방식 모두 최종 결과를 정적 HTML/CSS로 만들 수 있다. 차이는 소스 콘텐츠를 목록, Archive, RSS, sitemap과 여러 페이지로 변환하는 과정을 사람이 반복할지 빌드 도구가 담당할지에 있다.

## 4. 초기 구축 난이도

### Astro

초기에는 다음 개념을 알아야 한다.

- Node.js와 package manager
- `.astro` 파일
- `src/pages`의 파일 기반 routing
- layout과 component
- Content Collections와 frontmatter schema
- `astro.config.*`
- GitHub Actions 배포

단순한 5페이지 사이트만 보면 과한 준비다. 반면 Writing, Notes, Lab이 처음부터 예정돼 있다면 이 준비가 이후 목록과 레이아웃 자동화의 기반이 된다.

### 순수 HTML/CSS

`index.html`, 각 섹션의 HTML 파일, 하나의 CSS 파일만으로 시작할 수 있다. GitHub Pages는 정적 파일을 직접 제공하므로 가장 짧은 초기 경로다.

초기 단순성이 유지되려면 다음 조건이 필요하다.

- 페이지 수가 거의 늘지 않음
- Markdown을 사용하지 않음
- 공통 레이아웃 변경이 드묾
- 자동 목록과 RSS가 필요 없음

## 5. Markdown과 글 목록 관리

### Astro

Writing, Notes, Lab을 별도 collection으로 두고 Markdown frontmatter를 검증할 수 있다. 목록은 collection을 읽어 날짜순으로 정렬하고 필요한 유형만 선택해 생성할 수 있다.

장점:

- 글 하나를 추가하면 홈, 섹션 목록, Archive, RSS에 반영 가능
- 제목, 설명, 게시일, 수정일, draft, 주제를 schema로 통일 가능
- 잘못된 날짜나 누락된 필드가 빌드에서 발견됨
- Markdown 원본이 Git에 남음

불편:

- 작성과 발행이 editor, Git, build의 개발자 workflow가 됨
- schema 오류 하나가 전체 배포를 막을 수 있음
- WordPress 같은 WYSIWYG 작성 경험은 기본 제공되지 않음

657개 글을 Astro와 GitHub Pages로 보존한 운영자는 Git 소유권과 자동화를 만족 요소로 평가하면서도 수정마다 commit과 push가 필요하다는 점을 명시했다. 최근 WordPress 이전 사례에서도 수백 개 글은 export-to-Markdown script가 있어야 현실적으로 다룰 수 있었다.

### 순수 HTML/CSS

Markdown을 그대로 웹 문서로 사용하려면 결국 변환 단계가 필요하다. 가능한 방식은 다음과 같다.

- Markdown 내용을 수동으로 HTML에 복사
- 직접 변환 script 작성
- GitHub Pages의 Jekyll 사용
- 생성된 HTML을 저장소에 함께 commit

이 중 하나를 선택하는 순간 “빌드 도구 없는 순수 HTML”이라는 장점 일부가 사라진다. 최근 backend-free GitHub Pages 사례도 콘텐츠는 Markdown에서 JSON으로 compile하고 있었다.

## 6. 공통 레이아웃 관리

### Astro

header, navigation, footer, document metadata와 본문 wrapper를 layout으로 공유한다. Berkshire식 문서 인덱스 홈도 list component와 section component 정도로 충분하다.

장점:

- 내비게이션을 한 곳에서 변경
- 날짜와 링크 표기 규칙 통일
- 접근성 landmark와 heading 구조 재사용
- 반복되는 metadata 실수 감소

주의:

- component를 잘게 나누는 것 자체가 목적이 되면 단순한 문서 구조가 복잡해진다.
- 이 프로젝트에서는 한 번만 쓰는 작은 markup을 component로 만들 필요가 없다.

### 순수 HTML/CSS

GitHub Pages는 server-side include를 제공하지 않는다. JavaScript include를 사용하지 않는다면 공통 영역을 각 HTML 파일에 복제해야 한다.

페이지가 적을 때는 가장 투명한 방법이지만 글이 늘면 다음 문제가 생긴다.

- 내비게이션 변경이 모든 문서 수정으로 번짐
- 오래된 문서에 이전 footer와 metadata가 남음
- heading과 landmark 구조가 조금씩 달라짐
- 전역 접근성 수정의 누락 가능성이 커짐

## 7. 카테고리, 태그와 Archive 확장성

### 권장 데이터 구조

- collection: Writing, Notes, Lab
- 필수 필드: title, description, published
- 선택 필드: updated, topics, draft
- Work는 별도 collection이 필요할 만큼 글이 생길 때 추가
- Archive는 모든 공개 collection을 날짜순으로 합쳐 생성

### Astro

collection에서 연도, 유형, topic을 계산할 수 있어 Archive와 분류 페이지를 자동 생성하기 쉽다. 글 수십 개 수준에서는 전체를 매번 정적으로 생성해도 충분하다.

### 순수 HTML/CSS

새 글을 추가할 때 다음을 각각 고쳐야 한다.

- 해당 섹션의 목록
- 전체 Archive
- 연도별 목록
- topic 페이지
- 이전 글·다음 글 링크

태그가 늘수록 수동 동기화 비용이 빠르게 증가한다.

## 8. RSS, sitemap, SEO 메타데이터

### Astro

공식 RSS·sitemap 도구와 content data를 사용해 생성할 수 있다. 공통 layout에서 title, description, canonical, Open Graph metadata를 출력하면 문서별 중복을 줄일 수 있다.

장점:

- 게시물과 RSS·sitemap의 불일치 방지
- custom domain을 기준으로 canonical URL 생성
- frontmatter를 단일 metadata 원본으로 사용

주의:

- `site` 설정이 틀리면 canonical, sitemap, RSS URL도 함께 틀릴 수 있다.
- draft 제외 규칙을 모든 출력에 동일하게 적용해야 한다.

### 순수 HTML/CSS

각 HTML의 metadata와 별도 RSS·sitemap XML을 사람이 갱신해야 한다. 자동화 script를 만들면 작은 정적 사이트 생성기를 직접 유지하는 셈이 된다.

## 9. GitHub Pages 배포 과정

### Astro 권장 흐름

1. Markdown과 source를 `main`에 push
2. GitHub Actions에서 Node와 dependency 설치
3. Astro build 실행
4. 생성된 `dist` artifact 업로드
5. GitHub Pages에 artifact 배포

자주 발생할 수 있는 문제:

- Pages의 source가 GitHub Actions로 설정되지 않음
- 잘못된 Node version
- lockfile과 package manager 불일치
- `site` 또는 `base` 설정 오류
- 대소문자가 다른 file path가 Windows에서는 통과하고 Linux CI에서 실패
- frontmatter schema 오류로 전체 build 중단
- custom domain 변경 후 canonical 또는 CNAME 설정 불일치

### 순수 HTML/CSS 흐름

정적 파일을 Pages가 읽는 branch와 directory에 push하면 된다. 별도 build가 없으므로 실패 지점이 적다.

다만 Markdown converter나 asset script를 추가하면 그 script를 로컬에서 실행해 결과물을 commit하거나 Actions에서 실행해야 한다.

## 10. 루트 도메인과 프로젝트 경로에서의 자산 경로 처리

두 배포 형태를 구분해야 한다.

- 사용자 사이트: `https://username.github.io/`
- 프로젝트 사이트: `https://username.github.io/repository/`

custom root domain인 `https://yoonsangwon.dev/`를 사용하면 정상 상태에서는 root-relative URL이 단순하다. 하지만 preview, repository subpath, 도메인 전환 과정에서는 가정이 달라질 수 있다.

### Astro에서 확인할 사항

- `site`에 최종 canonical origin 설정
- 프로젝트 사이트일 때 `base` 설정
- internal link와 asset URL에 framework가 제공하는 base 값을 일관되게 사용
- RSS, sitemap, canonical도 동일한 origin·base 규칙 사용

### 순수 HTML/CSS에서 확인할 사항

- `/styles.css` 같은 root-relative URL은 project path에서 깨질 수 있음
- 상대 경로는 문서 깊이에 따라 달라질 수 있음
- custom domain만 지원할 것인지 GitHub 기본 URL도 지원할 것인지 결정 필요

## 11. 의존성 업데이트와 빌드 오류 가능성

Astro 7 출시는 Reddit에서 265표·37댓글, Hacker News에서 211점·60댓글을 얻어 성능 개선에 대한 만족이 컸다. 동시에 “6이 나온 지 얼마 안 된 것 같다”는 upgrade 피로 반응도 나타났다.

실제 Astro 6에서 7로 올린 GitHub PR은 Astro 본체와 `@astrojs/*` package를 함께 올리고 Content Collections와 여러 adapter에 대한 readiness test를 추가했다. Astro 7의 더 엄격한 HTML parsing은 닫히지 않은 tag처럼 이전 compiler가 보정하던 markup을 build error로 바꿀 수 있다.

이 프로젝트에서 위험을 줄이는 방법:

- dependency를 Astro와 공식 RSS·sitemap 도구로 제한
- React, Tailwind, CMS, View Transitions를 초기에 추가하지 않음
- lockfile commit
- Node LTS version 명시
- 자동 major update를 바로 merge하지 않음
- update 전 local build와 Pages preview 확인

순수 HTML/CSS는 build dependency가 없으면 이 위험이 없다. 대신 수동 반복과 불일치가 주요 오류 원인이 된다.

## 12. 장기간 방치한 뒤 다시 수정할 때의 부담

| 작업 | Astro | 순수 HTML/CSS |
|---|---|---|
| 문장 하나 수정 | Node 환경과 build 확인 필요 | 해당 HTML 직접 수정 |
| 내비게이션 변경 | layout 한 곳 수정 | 모든 문서 수정 |
| 새 글 추가 | Markdown과 frontmatter 작성 | HTML, 목록, Archive, RSS 수정 |
| 수년 뒤 환경 복구 | Node·dependency 호환성 확인 | 브라우저와 editor만 필요 |
| 접근성 전역 수정 | shared layout/component 수정 | 누락 없이 전체 파일 수정 |

Astro의 장기 위험은 toolchain 복구이고 순수 HTML의 장기 위험은 중복된 문서의 일관성이다. Markdown 원본 자체는 Astro에서 분리해 보존할 수 있으므로 framework를 바꾸더라도 콘텐츠 이동성은 비교적 높다.

## 13. 실제 사용자들이 반복적으로 언급한 불만

### Astro

- 콘텐츠 발행이 Git 기반 개발자 workflow가 됨
- Node와 package update를 계속 관리해야 함
- major version 주기가 빠르게 느껴짐
- theme과 integration이 많을수록 upgrade가 어려워짐
- Content Collections schema 오류가 build를 막음
- GitHub Pages의 `site`, `base`, Actions 설정이 direct upload보다 복잡함
- View Transitions 같은 선택 기능이 analytics와 script lifecycle을 복잡하게 만듦

### 순수 HTML/CSS

- 새 글마다 이전 파일을 복제함
- 최근 글과 Archive를 따로 수정함
- 공통 header와 footer 변경이 전체 파일 수정으로 번짐
- metadata, RSS, sitemap이 실제 글과 어긋나기 쉬움
- Markdown을 원하면 결국 converter가 필요함
- tag, pagination, 이전·다음 글을 추가하는 순간 자체 generator를 만들게 됨

## 14. 실제 사용자들이 반복적으로 언급한 만족 요소

### Astro

- Markdown과 Git으로 콘텐츠 소유
- 정적 HTML과 적은 client JavaScript
- layout과 content list 자동화
- 수백 개 글도 file 기반으로 관리
- WordPress export를 script로 정리·검증 가능
- 무료 정적 hosting과 빠른 PageSpeed
- `.astro` component가 HTML에 가까움

### 순수 HTML/CSS

- 설치와 build 없음
- source와 browser 결과가 직접적으로 연결됨
- package 보안 경고와 major upgrade 없음
- 장기간 방치해도 단일 파일을 바로 수정 가능
- HTML, CSS, JavaScript 전송량 완전 통제
- GitHub Pages 배포 실패 지점 최소화

## 15. Astro가 적합한 조건

- Markdown으로 글을 작성함
- Writing, Notes, Lab처럼 여러 content type이 있음
- 글이 10-20개를 넘어 계속 증가할 가능성이 높음
- Archive, topic, RSS, sitemap을 자동 생성해야 함
- 공통 layout과 접근성 구조를 한 곳에서 관리하고 싶음
- Node와 GitHub Actions를 유지할 수 있음
- 최종 output은 정적 HTML로 유지하고 싶음

## 16. 순수 HTML/CSS가 적합한 조건

- 전체 페이지가 5-10개에서 거의 늘지 않음
- blog보다 고정된 개인 소개 사이트에 가까움
- Markdown을 사용하지 않음
- 자동 목록, Archive, RSS가 필요 없음
- Node와 npm을 완전히 배제하는 것이 최우선임
- build 실패 가능성을 없애는 것이 반복 작업 감소보다 중요함

## 17. 이 프로젝트에 대한 기술 선택 제안

### 제안: 최소 구성의 Astro

`yoonsangwon.dev`에는 Astro를 Markdown과 공통 template을 정적 HTML로 변환하는 얇은 build layer로 사용하는 것이 적합하다.

최소 stack:

- Astro 7
- Astro Content Collections
- Markdown
- 순수 CSS
- 필요한 경우에만 작은 vanilla JavaScript
- Node.js LTS와 npm lockfile
- 공식 GitHub Pages Action
- GitHub Pages
- 공식 RSS와 sitemap package

초기 제외:

- React, Vue, Svelte integration
- Tailwind CSS
- MDX
- CMS
- View Transitions
- client router
- analytics SDK
- image pipeline
- Pagefind와 별도 검색
- comment system
- UI component library

Astro를 visual framework로 쓰지 않고 build-time document generator로 제한하면 Berkshire식 직접적인 문서 구조와 순수 HTML에 가까운 runtime을 유지하면서 수동 목록 관리만 제거할 수 있다.

## 18. 추천에 대한 반대 논거

가장 강한 반대 논거는 장기 toolchain 유지다. 수년 후 문장 하나만 수정하려 할 때 순수 HTML은 바로 고칠 수 있지만 Astro는 Node 설치, dependency 복구, 경우에 따라 major upgrade가 필요하다.

두 번째 논거는 실제 콘텐츠 양의 불확실성이다. 글이 수십 개까지 늘지 않고 5-10개 문서에 머문다면 Content Collections와 CI build는 해결할 문제가 없는 구조가 된다.

따라서 다음이 확인되면 순수 HTML/CSS로 결정을 바꿀 수 있다.

- 1년 후에도 글이 매우 적고 발행 빈도가 낮음
- RSS와 자동 Archive를 포기할 수 있음
- Node·npm을 장기적으로 유지하지 않겠다는 요구가 확정됨

## 19. 공식 문서로 재확인해야 하는 기술적 주장

구현 직전에 다음을 당시 최신 공식 문서에서 다시 확인해야 한다. 이 문서는 2026-07-10 조사 결과를 기록한 것이며 변하는 version·배포 설정의 최종 명세가 아니다.

1. Astro가 지원하는 Node.js version 범위
2. 최신 Astro project 생성과 Content Collections API
3. Astro 7 Markdown·MDX pipeline의 breaking change
4. GitHub Pages 공식 Action의 최신 workflow 예제
5. custom domain에서 필요한 `site` 설정
6. project site에서 필요한 `base`와 asset URL 처리
7. RSS package의 collection 사용법과 custom data 지원
8. sitemap integration의 draft·dynamic route 처리
9. GitHub Pages의 custom domain, HTTPS, CNAME 동작
10. GitHub Actions artifact와 Pages 권한 설정

## 20. 주요 출처 목록

| 제목 | 플랫폼 | 날짜 | URL |
|---|---|---:|---|
| Astro 7.0 | Astro 공식 블로그 / Hacker News 논의 | 2026-06-22 공개, 2026-07-07 HN | https://astro.build/blog/astro-7/ |
| Astro 7.0 Released: A Summary of What's New | Reddit r/astrojs | 2026-06-23 | https://www.reddit.com/r/astrojs/comments/1ud6hi7/astro_70_released_a_summary_of_whats_new/ |
| Why I Built a Personal Archive and Why Astro + GitHub Pages | luminousky | 2026-07-01 | https://luminousky.com/archive/luminousky/log/why-i-built-a-personal-archive/ |
| Weekly Showoff Thread: what have you built with Astro this week? | Reddit r/astrojs | 2026-06-16 | https://www.reddit.com/r/astrojs/comments/1u7anlw/weekly_showoff_thread_what_have_you_built_with/ |
| Migrating a WordPress website to Astro | Reddit r/astrojs | 2026-06-25 | https://www.reddit.com/r/astrojs/comments/1uflzey/migrating_a_wordpress_website_to_astro/ |
| Who's out there building Astro sites and applications for customers? | Reddit r/astrojs | 2026-06-17 | https://www.reddit.com/r/astrojs/comments/1u89pyb/whos_out_there_building_astro_sites_and/ |
| chore: upgrade Astro from v6 to v7 | GitHub PR - shawn-sandy/astro-basics | 2026-07-01 | https://github.com/shawn-sandy/astro-basics/pull/343 |
| Migrate marketing site from Astro to Next.js | GitHub PR - letmepost/letmepost.dev | 2026-07-07 | https://github.com/letmepost/letmepost.dev/pull/143 |
| Experimental incremental static builds | GitHub PR - withastro/astro | 2026-06-15 | https://github.com/withastro/astro/pull/17084 |
| Add Family Recipe Box project card | GitHub PR - heckerdj/resume-as-code | 2026-07-06 | https://github.com/heckerdj/resume-as-code/pull/42 |
| Astro official site | Astro 공식 문서 | 2026-07-10 접근 | https://astro.build/ |
| Deploy your Astro Site to GitHub Pages | Astro 공식 문서 | 2026-07-10 접근 | https://docs.astro.build/en/guides/deploy/github/ |

