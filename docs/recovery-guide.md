# 콘텐츠와 배포 복구 안내

가장 먼저 추가 편집을 멈추고 문제가 생기기 직전의 정상 GitHub commit을 확인한다. 기본 원칙은 전체 저장소를 과거로 강제로 돌리는 것이 아니라, 문제가 있는 파일만 복원하거나 잘못된 commit을 새 revert commit으로 취소하는 것이다. `reset --hard`와 force push는 사용하지 않는다.

복구 후에는 `npm.cmd run check`, `npm.cmd run build`, `npm.cmd run verify`를 실행하고 GitHub Actions와 공개 사이트를 확인한다. Pages CMS 세부 설정은 [기술 복구 안내](pages-cms-recovery.md)도 참고한다.

## Pages CMS에서 글을 잘못 수정했을 때

1. 같은 글을 더 저장하지 않는다.
2. GitHub에서 해당 Markdown 파일을 열고 **History**를 선택한다.
3. 마지막 정상 버전과 잘못된 버전의 차이를 확인한다.
4. 정상 내용을 같은 파일 경로에 복원한다.
5. `draft: true`로 먼저 저장하고 build를 확인한다.
6. 공개 글이었다면 검토 후 다시 공개한다.

제목이나 본문만 잘못된 경우 전체 branch를 되돌리지 않는다. 파일명은 공개 URL이므로 복원 과정에서도 바꾸지 않는다.

## 글을 삭제했을 때

삭제 commit 바로 이전의 파일을 같은 collection과 같은 파일명으로 복원한다. GitHub 웹 화면에서는 삭제 commit의 이전 상태에서 원문을 복사할 수 있고, 로컬에서는 다음 형태로 복원할 수 있다.

```sh
git restore --source=<삭제-직전-정상-commit> -- src/content/writing/<파일명>.md
```

복원된 파일을 확인하고 새 복구 commit을 만든다. 처음에는 `draft: true`로 두며, 이미지 경로와 내부 링크도 함께 확인한다.

## 이미지를 삭제했을 때

삭제 전 commit에서 이미지를 원래 `public/images/content/...` 경로와 파일명으로 복원한다. 다른 경로에 복원하면 기존 Markdown URL이 계속 깨진다.

```sh
git restore --source=<삭제-직전-정상-commit> -- public/images/content/<경로와-파일명>
```

복원 후 저장소 전체에서 해당 이미지 URL을 검색하고, build된 페이지에서 실제로 보이는지 확인한다. 원본에 개인정보나 비밀정보가 있었다면 복원하지 말고 안전하게 편집한 새 이미지와 새 URL로 교체한다.

## `.pages.yml` 오류가 생겼을 때

1. Pages CMS에서 추가 저장을 중단한다.
2. GitHub History에서 마지막으로 정상 동작한 `.pages.yml`을 찾는다.
3. 해당 파일만 정상 버전으로 복원한다.
4. YAML 문법과 `src/content.config.ts`의 필드 이름을 비교한다.
5. 정상 설정이 원격 branch에 반영된 뒤 Pages CMS에서 저장소를 새로고침한다.

Hosted Pages CMS는 원격 branch의 `.pages.yml`을 읽는다. 로컬 파일만 수정해서는 복구되지 않는다.

## GitHub Actions 배포가 실패했을 때

GitHub 저장소의 **Actions → Deploy to GitHub Pages**에서 실패한 실행을 연다.

- build 단계 실패: 로그에 표시된 Markdown 파일의 필수 필드, 날짜, Markdown과 내부 경로를 확인한다.
- deploy 단계 실패: 저장소 **Settings → Pages**가 GitHub Actions를 사용하도록 설정됐는지 확인한다.
- Pages 설정이나 일시 장애: 콘텐츠를 반복 수정하지 말고 실패 원인을 확인한 뒤 workflow를 다시 실행한다.

문제 commit을 고친 새 commit 또는 revert commit을 만들고 build와 deploy가 모두 성공했는지 확인한다.

## GitHub commit에서 파일 복구

비개발자는 GitHub 파일 화면의 **History**에서 정상 내용을 확인해 현재 파일에 복원할 수 있다. 로컬에서는 다음 순서가 안전하다.

```sh
git status
git restore --source=<정상-commit> -- <복구할-파일>
git diff -- <복구할-파일>
npm.cmd run check
npm.cmd run build
npm.cmd run verify
```

확인 후 복구 commit을 만든다. 복구와 관계없는 로컬 변경이 있다면 먼저 분리하고 덮어쓰지 않는다.

## 정상 commit으로 되돌아가기

한 commit 전체가 잘못됐고 그 이후 정상 변경을 보존해야 한다면 history를 지우지 않는 `git revert`를 사용한다.

```sh
git revert <잘못된-commit>
```

여러 commit이나 merge commit을 되돌릴 때는 범위와 기준 branch에 따라 결과가 달라지므로 먼저 담당자가 diff를 확인한다. `git reset --hard`, force push와 branch 삭제로 복구하지 않는다.

## Pages CMS를 사용할 수 없을 때

콘텐츠는 GitHub 저장소의 Markdown 파일이므로 Pages CMS 없이도 운영할 수 있다.

1. 저장소를 최신 상태로 받는다.
2. 종류에 맞는 `src/content/writing`, `src/content/notes`, `src/content/lab`의 `.md` 파일을 편집한다.
3. [Markdown 템플릿](content-templates.md)의 frontmatter 형식을 유지한다.
4. 새 글에는 `draft: true`를 명시한다.
5. 검사와 production build를 실행한다.
6. Git diff에서 의도한 파일만 바뀌었는지 확인한 뒤 commit한다.
7. 공개할 때만 `draft: false`로 바꾸거나 draft 줄을 제거한다.

이미지는 `public/images/content` 아래에 넣고 본문에는 `/images/content/...` 공개 경로를 사용한다.
