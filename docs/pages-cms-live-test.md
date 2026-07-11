# Pages CMS 실제 통합 테스트 결과

검증일: 2026-07-11

## Hosted 새 글 저장 오류와 수정

Writing 새 글 화면에서 제목과 설명을 입력해도 Filename이 `.md`로 남았고 저장 시 `Invalid extension "" for content "writing"` 오류가 표시됐다. GitHub에는 콘텐츠 commit이 생성되지 않았다. 원인은 수동 Filename 필드가 비어 있는 상태에서 확장자만 남은 것이며, 세 collection의 파일명을 생성 시각 기반 `YYYY-MM-DD-HHMMSS.md`로 자동 생성하도록 변경했다. 제목 다음에 rich-text 본문을 배치해 작성 동선도 줄였다. 실제 Hosted 저장 성공 여부는 이 설정을 `main`에 반영한 뒤 새 초안 생성·삭제로 다시 확인한다.

## 결론

현재 local worktree와 원격 GitHub 저장소에서는 Pages CMS가 실제로 생성·수정·삭제한 콘텐츠 커밋을 확인할 수 없다. 사용자가 웹 에디터에서 테스트했다고 알려 주었지만, 현재 확인 가능한 Git 증거와 원격 branch 상태에는 그 결과가 반영되어 있지 않다.

따라서 다음 항목은 **통과로 판정하지 않는다**.

- 테스트 Writing 초안 생성
- frontmatter와 Markdown 수정
- 이미지 업로드
- 초안 공개 전환
- 다시 초안 전환
- 테스트 글 삭제
- 다른 기기에서 초안 이어쓰기

## 확인한 저장소와 Git 상태

### 현재 local 상태

- branch: `feature/pages-cms`
- 이 branch는 local에서만 존재한다.
- `main`과 `origin/main`은 모두 `4a2ae3b`다.
- working tree에는 `.pages.yml`, Pages CMS 문서와 QA 수정분이 아직 commit되지 않았다.
- 현재 `src/content`에는 기존 Markdown 5개만 있다.
- `public/images` 디렉터리와 업로드 이미지가 없다.

### 원격 branch

`git ls-remote --heads origin` 결과 원격에는 `main`만 있다. `feature/pages-cms` 원격 branch는 없다.

### 원격 커밋

현재 원격의 커밋은 다음 두 개뿐이다.

1. [`62d2528`](https://github.com/yoon-sang-won/yoonsangwon.dev/commit/62d2528) — 초기 Astro 프로젝트
2. [`4a2ae3b`](https://github.com/yoon-sang-won/yoonsangwon.dev/commit/4a2ae3b) — Pages 설정 변경 후 배포를 트리거한 빈 커밋

`4a2ae3b`에는 콘텐츠·이미지·`.pages.yml` 변경이 없다. Pages CMS 생성·수정·삭제 커밋, 테스트 파일명, media commit은 Git 기록에서 발견되지 않았다.

원격 `main`의 `.pages.yml`도 아직 존재하지 않는다. 따라서 현재 원격 저장소만 기준으로는 Hosted Pages CMS가 이 설정을 읽어 통합 테스트를 수행할 수 있는 상태가 아니다.

## GitHub Actions와 배포 결과

- [run #1](https://github.com/yoon-sang-won/yoonsangwon.dev/actions/runs/29108035527)은 build 후 Pages deployment 단계에서 GitHub Pages가 활성화되지 않아 실패했다.
- [run #2](https://github.com/yoon-sang-won/yoonsangwon.dev/actions/runs/29108209275)은 `4a2ae3b`에 대해 build와 deploy 모두 성공했다.
- run #2 성공은 사이트 배포 안정성의 증거이지 Pages CMS 콘텐츠 통합 테스트의 증거는 아니다.
- 현재 workflow는 `main` push에 반응하고 `SITE_URL=https://yoon-sang-won.github.io`, `BASE_PATH=/yoonsangwon.dev`를 사용한다.

현재 배포 사이트는 공개 Writing, Notes, Lab 글이 없는 상태다. [Writing](https://yoon-sang-won.github.io/yoonsangwon.dev/writing/), [Notes](https://yoon-sang-won.github.io/yoonsangwon.dev/notes/), [Lab](https://yoon-sang-won.github.io/yoonsangwon.dev/lab/), [Archive](https://yoon-sang-won.github.io/yoonsangwon.dev/archive/)가 모두 빈 공개 목록을 보여 준다. [RSS](https://yoon-sang-won.github.io/yoonsangwon.dev/rss.xml)도 item이 없고 sitemap에는 정적 페이지 URL만 있다.

## 시나리오별 판정

| 시나리오 | 증거 | 판정 |
| --- | --- | --- |
| Writing 초안 생성 | 테스트 파일과 CMS commit 없음 | 확인 불가 |
| 생성 frontmatter | 원격 테스트 파일 없음 | 확인 불가 |
| Markdown 본문 수정 | 원격 테스트 파일 없음 | 확인 불가 |
| 이미지 업로드 | `public/images`와 media commit 없음 | 확인 불가 |
| `draft: true` 공개 제외 | 기존 draft 콘텐츠와 local build 검증으로만 확인 | 로컬 조건 통과, live 미검증 |
| `draft: false` 공개 | 공개 테스트 파일 없음 | 확인 불가 |
| 다시 draft 전환 | 전환 commit 없음 | 확인 불가 |
| 삭제 | 삭제 commit과 대상 파일 없음 | 확인 불가 |
| 다른 기기 이어쓰기 | Pages CMS UI·저장 commit 증거 없음 | 확인 불가 |
| Actions 배포 | run #2 성공 | 사이트 배포만 통과 |

## 기존 사이트 반영 상태

현재 원격에는 테스트 콘텐츠가 없으므로 다음 반영을 확인할 대상도 없다.

- 홈페이지 최신 글: 테스트 글 없음
- Writing, Notes, Lab 목록: 모두 빈 공개 목록
- Archive: 공개 글 없음
- RSS: item 없음
- sitemap: 테스트 URL 없음
- 공개 BlogPosting JSON-LD: 테스트 글 없음
- 이미지: 업로드 파일 없음

이 결과는 테스트 글이 정상적으로 draft 제외됐다는 뜻이 아니라, 원격에 테스트 글 자체가 없다는 뜻이다.

## local에서 이미 검증된 부분

현재 local Pages CMS 변경분에 대해서는 다음이 통과했다.

- `.pages.yml` YAML 및 구조 검증
- 기존 Markdown 5개 frontmatter 파싱
- `updated: ""` 왕복 fixture
- Markdown heading, link, quote, list, inline code, fenced code block, rule, image alt fixture
- `/repo` base path 이미지 URL 변환 fixture
- `npm.cmd run check`
- 기본 production build와 `npm.cmd run verify`
- `/repo` base path build와 verify

이 검증들은 local 변경의 정적·build-time 안전성을 증명하지만, Hosted Pages CMS의 실제 저장·commit·다중 기기 동작을 증명하지 않는다.

## 실제 테스트를 재개하는 절차

현재 작업 제한상 push와 merge는 수행하지 않는다. 사용자가 다음을 직접 진행해야 한다.

단계별 34개 확인 항목은 [Pages CMS 연결 설정의 전체 테스트](pages-cms-setup.md#hosted-pages-cms-연결-후-전체-테스트)를 기준으로 기록한다.

1. local `feature/pages-cms` 변경분을 검토하고 commit한다.
2. `feature/pages-cms`를 원격에 push한다.
3. Pages CMS에서 GitHub 로그인 후 이 저장소 하나만 허용한다.
4. 원격 `feature/pages-cms` branch를 선택하고 `.pages.yml` 인식 여부를 확인한다.
5. 실제 테스트 초안을 만들고 저장한다.
6. 생성 commit, 파일, `draft: true`, Markdown 본문을 확인한다.
7. 모바일 편집을 끝내고 PC에서 목록을 새로고침해 같은 초안을 연다.
8. PC에서 본문과 이미지를 추가하고 다시 draft로 저장한다.
9. `draft: false`로 공개한 뒤 Actions와 사이트 파생 결과를 확인한다.
10. 다시 `draft: true`로 바꾸고 사이트에서 제거되는지 확인한다.
11. 테스트 글을 삭제하고 이미지가 고아 파일로 남았는지 확인한다.
12. 각 단계의 commit SHA와 파일 diff를 이 문서의 표에 기록한다.

테스트를 `main`에서 직접 수행하지 않고 branch에서 수행한다. 공개 저장소이므로 `draft: true`인 파일도 GitHub에서 보일 수 있으며, 초안에 개인정보·비공개 업무 정보·인증정보를 입력하지 않는다.

## 장애 시 복구

- 본문 또는 frontmatter를 잘못 저장하면 해당 파일의 GitHub History에서 정상 commit을 복원한다.
- 글 삭제 후 복구하려면 삭제 직전 commit의 파일을 되살린다.
- 이미지 삭제 전에는 다른 글에서 참조하는지 확인한다.
- `.pages.yml` 문제는 정상 버전으로 되돌린 뒤 `npm.cmd run check`, `npm.cmd run build`, `npm.cmd run verify`를 실행한다.
- Actions 실패는 build와 deploy job을 나누어 확인한다. Pages 설정 404는 GitHub Settings → Pages 활성화 상태를 먼저 확인한다.

## 남은 제약

- 현재 remote에는 `.pages.yml`이 없으므로 Hosted Pages CMS 연결 상태를 remote 기준으로 준비됨이라고 판정할 수 없다.
- 실제 Pages CMS commit·파일·이미지·다중 기기 저장은 아직 증명되지 않았다.
- 프로젝트에 lint script가 없어 lint는 실행할 수 없다.
- 원격 변경과 Pages CMS 로그인은 이 작업에서 수행하지 않는다.
