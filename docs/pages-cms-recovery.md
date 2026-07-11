# Pages CMS 복구 안내

Pages CMS의 저장 결과는 GitHub commit이므로 대부분의 실수는 Git 기록에서 복구할 수 있다. 복구 후에는 `npm.cmd run check`, `npm.cmd run build`, `npm.cmd run verify`를 실행한다.

비개발자가 글·이미지·배포 문제를 순서대로 복구하는 방법은 [콘텐츠와 배포 복구 안내](recovery-guide.md)를 먼저 참고한다. 이 문서는 Pages CMS 설정과 Git 작업에 관한 기술 세부사항을 보충한다.

## 본문이나 frontmatter를 잘못 덮어쓴 경우

1. GitHub에서 해당 Markdown 파일을 연다.
2. `History`에서 정상 상태의 commit을 찾는다.
3. 정상 내용을 현재 파일에 복원한다.
4. 새 복구 commit을 만든다.
5. Actions build와 배포를 확인한다.

전체 branch를 되돌리지 않고 해당 파일만 복구하는 것이 기본 원칙이다.

## 글을 잘못 삭제한 경우

삭제 commit의 바로 이전 commit에서 파일 내용을 확인하고 같은 경로에 복원한다. 파일명이 URL이므로 원래 경로와 파일명을 그대로 사용한다. 복원 후 초안으로 둘 글은 `draft: true`를 확인한다.

## 이미지를 잘못 삭제한 경우

삭제 전 commit에서 이미지 파일을 같은 `public/images/content` 경로로 복원한다. Markdown의 이미지 URL과 파일명이 일치하는지 확인한다. 다른 글도 같은 이미지를 참조하는지 검색한다.

## `.pages.yml` 오류로 CMS가 열리지 않는 경우

1. 마지막 정상 `.pages.yml` commit으로 복원한다.
2. YAML parser로 문법을 확인한다.
3. content path와 field key가 `src/content.config.ts`와 일치하는지 확인한다.
4. 원격 branch에 정상 설정이 반영된 뒤 Pages CMS에서 저장소를 새로고침한다.

`.pages.yml`이 local에만 있고 원격 branch에 없으면 Hosted Pages CMS는 읽을 수 없다.

## Astro build 실패

다음 순서로 확인한다.

1. Actions 로그에서 실패한 Markdown 파일과 field를 찾는다.
2. `published`, `updated`, `draft`, 필수 description을 확인한다.
3. `updated`가 `published`보다 빠르지 않은지 확인한다.
4. 로컬에서 type/content validation과 production build를 실행한다.
5. 잘못 저장된 파일만 정상 commit으로 복구한다.

## GitHub Actions 실패

- build 실패: 콘텐츠 schema, Markdown, 내부 URL을 확인한다.
- deploy 실패: GitHub Settings → Pages가 GitHub Actions source로 활성화됐는지 확인한다.
- GitHub Pages가 비활성화된 상태의 404 deployment 오류는 콘텐츠 문제가 아니므로 Pages 설정을 먼저 고친다.
- 실패 원인을 수정한 뒤 workflow를 다시 실행하거나 새 commit으로 배포를 트리거한다.

## 전체 작업을 되돌리는 경우

여러 파일이 함께 잘못 바뀐 경우 정상 commit을 기준으로 revert commit을 만든다. history를 삭제하는 reset이나 force push는 사용하지 않는다. 공유 branch에서는 기존 commit을 보존하는 revert가 안전하다.

## Pages CMS를 사용할 수 없을 때

Markdown 파일을 직접 편집할 수 있다.

1. 종류에 맞는 `src/content/writing`, `src/content/notes`, `src/content/lab` 파일을 수정한다.
2. YAML frontmatter와 Markdown 본문 형식을 유지한다.
3. 검증 명령을 실행한다.
4. 정상 변경만 commit한다.

Pages CMS 서비스가 중단돼도 콘텐츠와 이미지는 GitHub에 남는다.

## Pages CMS 제거와 롤백

CMS를 제거하려면 `.pages.yml`과 Pages CMS 운영 문서만 제거한다. 기존 Markdown, Astro 코드와 GitHub Actions는 그대로 유지할 수 있다. 이미지 base-path 처리를 더 이상 사용하지 않을 때만 `astro.config.mjs`의 관련 processor와 `scripts/verify-build.mjs` asset 검사를 함께 검토한다.
