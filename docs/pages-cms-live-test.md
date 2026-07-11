# Pages CMS 실제 통합 테스트 결과

검증일: 2026-07-11

## 결론

Hosted Pages CMS에서 Writing, Notes, Lab 초안을 실제로 생성하고 삭제했다. 세 collection 모두 날짜·시간 기반 Markdown 파일을 자동 생성했으며 기존 `Invalid extension ""` 오류는 재현되지 않았다. 테스트 파일은 모두 삭제돼 현재 콘텐츠에는 남아 있지 않지만 생성·삭제 commit으로 복구할 수 있다.

## 발견한 오류와 수정

기존 새 글 화면은 Filename 입력이 `.md`로 남았고 저장 시 `Invalid extension "" for content "writing"` 오류를 표시했다. 수동 Filename 입력을 제거하고 다음 템플릿으로 교체했다.

```yaml
filename: "{year}-{month}-{day}-{hour}{minute}{second}.md"
```

세 collection의 필드 순서도 `제목 → 본문 → 설명 → 게시일 → 수정일 → 초안`으로 바꿨다. 새 글의 기본 초안 값은 실제 화면에서 켜진 상태로 확인했다.

Pages CMS가 외부 Git push 직후 이전 configuration을 캐시한 화면을 보여 줄 수 있었다. 이 경우 좌측 저장소 메뉴에서 다른 branch로 전환한 뒤 운영 branch를 다시 선택하면 최신 `.pages.yml`을 읽는다.

## 실제 생성·삭제 commit

| Collection | 생성 파일 | 생성 commit | 삭제 commit |
| --- | --- | --- | --- |
| Writing | `src/content/writing/2026-07-11-132630.md` | `30beca7` | `b7dc41b` |
| Notes | `src/content/notes/2026-07-11-132842.md` | `7c04e93` | `cbe9c42` |
| Lab | `src/content/lab/2026-07-11-132906.md` | `1a14b63` | `41e5099` |

## 콘텐츠 생성 결과

- 한글 제목과 본문이 UTF-8로 저장됐다.
- Writing과 Lab에는 필수 description이 저장됐다.
- Notes는 선택적인 description 없이 정상 저장됐다.
- `published`는 `YYYY-MM-DD` 형식으로 저장됐다.
- 세 파일 모두 `draft: true`로 생성됐다.
- body는 YAML frontmatter 아래의 Markdown 본문으로 저장됐다.
- 자동 파일명은 숫자와 하이픈만 포함했고 공개 URL에 사용할 수 있는 형태였다.

## 편집기 확인 결과

- Filename 입력은 보이지 않았다.
- 제목 바로 아래에 rich-text Editor가 나타났다.
- Editor에서 한글 여러 문단을 입력해 Markdown으로 저장했다.
- `/` 입력 시 Text, Heading 1~3, 목록, 이미지, 표, 인용과 코드 블록 메뉴가 나타났다.
- Editor/Source 전환이 동작했다.
- Source에서 작성한 Markdown 목록은 저장 후 Editor에서 목록으로 다시 표시됐다.

Hosted Pages CMS의 UI는 네이버 블로그처럼 고정된 전체 서식 툴바를 제공하지 않는다. `.pages.yml`로 툴바 모양이나 편집 영역 높이를 바꿀 수도 없다. 현재 구성은 Pages CMS 공식 WYSIWYG Editor가 제공하는 범위에서 본문을 가장 먼저 작성할 수 있게 정리한 것이다. 고정 툴바형 편집기가 필수라면 별도 관리자 UI, 인증과 저장 API가 필요하다.

## draft 제외 결과

Writing 테스트 초안이 존재하는 상태에서 다음을 실행했다.

```sh
npm.cmd run check
npm.cmd run build
npm.cmd run verify
```

모두 통과했고 테스트 제목과 파일명이 `dist`에 없음을 확인했다. 따라서 초안은 production 상세 route, 목록, Archive, RSS, sitemap과 공개 JSON-LD에 포함되지 않았다.

## 삭제 결과와 복구

- Pages CMS 목록에서 세 테스트 파일을 삭제했다.
- 삭제 성공 알림과 삭제 commit을 확인했다.
- 원격 branch 최종 tree에 테스트 파일이 남아 있지 않다.
- 복구가 필요하면 각 삭제 commit의 직전 생성 commit에서 같은 경로의 파일을 복원할 수 있다.

## 이번 테스트에서 수행하지 않은 항목

- 실제 이미지 업로드와 삭제
- 기존 글 수정 전후의 unmanaged frontmatter 보존
- `draft: false` 공개 전환과 다시 초안 전환
- 모바일과 PC 사이의 초안 이어쓰기

이 항목들은 이번 저장 오류와 편집기 수정 범위에는 포함하지 않았으며, 실제 운영 첫 글에서 [연결 후 전체 테스트](pages-cms-setup.md#hosted-pages-cms-연결-후-전체-테스트)에 따라 별도로 확인한다.

## 현재 운영 판단

| 항목 | 판정 | 이유 |
| --- | --- | --- |
| Writing 새 글 작성 | 준비됨 | Editor 입력, 자동 파일명, 초안 저장과 삭제를 실제 확인했다. |
| Notes 새 글 작성 | 준비됨 | 선택적 description, Source Markdown, 자동 파일명과 삭제를 확인했다. |
| Lab 새 글 작성 | 준비됨 | 필수 description, Editor 본문, 자동 파일명과 삭제를 확인했다. |
| 기본 초안 처리 | 준비됨 | 실제 `draft: true` 저장과 production 제외를 확인했다. |
| 고정 툴바형 편집기 | 준비되지 않음 | Pages CMS hosted UI의 공식 설정 범위를 벗어난다. |
| 이미지·다중 기기·공개 전환 | 조건부 준비됨 | 설정과 운영 절차는 있으나 이번 실제 테스트에서는 수행하지 않았다. |
