# Pages CMS 편집 안내

## 시작하기

1. [Pages CMS](https://app.pagescms.org)에 접속합니다.
2. GitHub으로 로그인합니다.
3. GitHub App 설치 화면에서 이 블로그 저장소 하나만 허용합니다.
4. 원격에 실제로 존재하는 branch를 선택합니다. 현재 local `feature/pages-cms`는 원격에 push되지 않았으므로 Hosted Pages CMS branch 목록에 나타나지 않습니다. branch를 push한 뒤 검수는 `feature/pages-cms`, 병합 후 운영 편집은 `main`에서 진행합니다.
5. 왼쪽에 `Writing`, `Notes`, `Lab` 세 목록이 보이고 기존 글이 나타나는지 확인합니다.

## 새 글 작성

새 글을 만들 때 Filename 입력이 나타납니다. 파일명이 공개 URL이 되므로 영문 소문자와 하이픈을 사용하고, 나중에 바꾸지 않을 주소를 입력합니다.

### Writing

`Writing`에서 새 글을 선택하고 제목, 설명, 게시일을 입력합니다. 본문을 작성한 뒤 초안 스위치를 켠 상태로 저장합니다. Writing과 Lab은 설명이 필수이고 Notes는 설명을 비워 둘 수 있습니다.

### Notes

`Notes`에서 새 글을 선택합니다. 제목과 게시일을 입력하고 필요할 때만 설명을 추가합니다. 짧은 발견이나 문제 해결 과정을 Markdown 본문에 기록합니다.

### Lab

`Lab`에서 새 글을 선택하고 제목, 설명, 게시일을 입력합니다. 질문, 조건, 시도, 결과와 한계를 본문에 나누어 기록합니다. 현재 Astro schema에 `status` 필드는 없으므로 별도 상태 선택 메뉴는 없습니다.

모든 새 글은 `draft: true`로 시작합니다. 게시일은 `yyyy-MM-dd` 형식이며 수정일은 실제 내용을 고친 경우에만 입력합니다. 수정일은 게시일보다 빠를 수 없습니다.

## 초안 확인과 공개

초안은 CMS에 저장한 뒤 GitHub branch에서 Markdown 변경을 확인합니다. 로컬에서 확인하려면 저장소에서 다음을 실행하고 파일명으로 직접 URL을 엽니다.

```sh
npm run dev
```

예: `http://localhost:4321/writing/파일명/`

초안은 production 목록, 상세 경로, Archive, RSS와 sitemap에 나타나지 않습니다. 글을 공개하려면 CMS에서 초안 스위치를 끄고 저장한 뒤 GitHub Actions가 완료될 때까지 기다립니다.

## 기존 글 찾기와 수정

각 목록은 제목, 초안 상태, 게시일과 수정일을 보여 줍니다. 제목과 설명으로 검색하고 게시일·수정일·제목으로 정렬할 수 있습니다. 글을 수정할 때는 본문과 frontmatter를 함께 확인하고, 특히 파일명은 변경하지 않습니다.

현재 schema에는 태그 필드가 없으므로 태그 추가·삭제 메뉴를 사용하지 않습니다. 태그가 필요하면 먼저 콘텐츠 모델을 확장하는 별도 변경이 필요합니다.

## 여러 기기에서 초안 이어쓰기

이 프로젝트에서 임시저장은 `draft: true` 상태로 GitHub에 저장한 글을 뜻합니다. 모바일에서 작성한 내용은 저장 버튼을 눌러 GitHub commit이 생성된 경우에만 PC에서 이어 쓸 수 있습니다.

- 기기를 바꾸기 전에 반드시 저장합니다.
- PC에서 저장소와 글 목록을 새로고침한 뒤 초안을 엽니다.
- 저장하지 않은 브라우저 입력은 복구되지 않을 수 있습니다.
- 같은 글을 모바일과 PC에서 동시에 편집하지 않습니다.
- Pages CMS 공식 자동 저장이나 실시간 공동 편집을 지원한다고 가정하지 않습니다.

GitHub 저장소가 공개되어 있으면 `draft: true` 파일도 GitHub에서 보일 수 있습니다. 초안에 개인정보, 회사 내부 정보, 고객 정보, API 키, 비밀번호와 같은 민감한 내용을 작성하지 않습니다.

## 본문 편집

본문은 Markdown rich-text 편집기입니다. Editor 모드에서 제목, 소제목, 문단, 굵게, 기울임, 링크, 인용, 순서·비순서 목록, 인라인 코드, 코드 블록과 구분선을 사용할 수 있습니다. Source 모드로 Markdown 원문을 확인하거나 직접 고칠 수 있습니다.

현재 글에 Astro component, MDX, custom directive는 없지만, 새로운 특수 문법을 저장할 때는 Source 모드에서 원문을 확인하고 저장 후 GitHub diff에서 본문 손실이 없는지 확인합니다.

## 본문 이미지

1. 본문에서 이미지 삽입을 선택합니다.
2. 첫 버전의 공통 본문 이미지 폴더에 업로드합니다. 글별 하위 폴더를 따로 만들지 않습니다.
3. `png`, `jpg`, `jpeg`, `webp`, `avif`, `gif` 파일만 올립니다. SVG는 올리지 않습니다.
4. 이미지 설명 또는 alt 텍스트를 이미지 삽입 창에 입력합니다. 장식이 아닌 이미지라면 보이는 내용을 짧고 구체적으로 적습니다.
5. 저장 후 Markdown에 `/images/content/...` 경로가 기록되었는지 확인합니다.

이미지는 저장소의 `public/images/content`에 남고 사이트에서는 `/images/content`으로 공개됩니다. 파일명은 충돌 가능성을 줄이기 위해 랜덤한 안전 파일명으로 변환됩니다. 본문 표시 폭을 크게 넘지 않는 1600px 이하, WebP 우선, 파일 1MB 이내를 권장합니다. CMS는 이미지를 자동 최적화하지 않습니다. 자세한 파일명·alt·정리 기준은 [콘텐츠 편집 원칙](editorial-guide.md#이미지-운영-규칙)을 따릅니다.

글을 삭제해도 본문 이미지가 자동 삭제되지는 않습니다. 삭제 전 다른 글의 참조 여부를 확인하고, 고아 이미지는 미디어 목록에서 별도로 정리합니다.

## 글 삭제

삭제 전 파일명과 URL을 확인합니다. 삭제는 CMS에서 가능하지만 공개 URL을 방문 중인 사람이 있을 수 있으므로, 필요하면 먼저 초안 전환이나 별도 안내를 검토합니다.

## 저장 후 배포 확인

1. CMS 저장 뒤 GitHub 저장소에서 commit이 생성되었는지 확인합니다.
2. `Actions`에서 `Deploy to GitHub Pages` workflow를 엽니다.
3. build와 deploy job이 모두 성공할 때까지 기다립니다.
4. Pages 주소에서 새 글의 URL, 목록, Archive와 이미지가 정상인지 확인합니다.
5. 공개 글은 RSS와 sitemap에도 반영되는지 확인합니다.

## 실수했을 때

GitHub에서 잘못 저장된 파일의 `History`를 열고 정상 commit의 파일 내용을 복원합니다. 복원 후 build가 성공하는지 확인합니다. CMS 서비스가 중단되어도 Markdown과 이미지는 GitHub에 있으므로 로컬에서 직접 수정하고 기존 workflow로 배포할 수 있습니다.

## 공개되지 않을 때 확인할 항목

- `draft`가 켜져 있지 않은지 확인합니다.
- `published`가 실제 공개일인지 확인합니다.
- `updated`가 있다면 `published` 이후인지 확인합니다.
- 파일명과 URL에 오타가 없는지 확인합니다.
- GitHub Actions의 build 로그를 확인합니다.
- build가 성공했는데도 보이지 않으면 Pages 배포 완료와 브라우저 캐시를 확인합니다.
- 이미지가 깨지면 파일 확장자, 저장 위치와 `/images/content` 경로를 확인합니다.
- project-site 배포에서 이미지가 깨지면 `/yoonsangwon.dev/images/content/...` 경로로 생성됐는지 확인합니다.

## 관련 운영 문서

- 글의 분류, 제목, 날짜와 이미지 기준: [콘텐츠 편집 원칙](editorial-guide.md)
- 복사해서 시작할 본문 구조: [콘텐츠 Markdown 템플릿](content-templates.md)
- 공개 직전 확인: [글 발행 체크리스트](publishing-checklist.md)
- AI를 사용할 때의 입력·검수 범위: [AI 글쓰기 운영 흐름](ai-writing-workflow.md)
- 잘못 저장하거나 배포가 실패했을 때: [콘텐츠와 배포 복구 안내](recovery-guide.md)
