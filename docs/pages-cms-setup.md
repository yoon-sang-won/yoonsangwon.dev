# Pages CMS 연결 설정

이 작업은 저장소에 `.pages.yml`을 추가하는 단계까지 자동으로 준비한다. GitHub 계정과 Pages CMS 연결은 사용자가 직접 진행해야 한다.

## Hosted Pages CMS 연결

1. [app.pagescms.org](https://app.pagescms.org)에 접속합니다.
2. **Sign in with GitHub**를 선택합니다.
3. 안내에 따라 GitHub App을 설치합니다.
4. 권한 대상은 이 블로그 저장소 하나만 선택합니다. 전체 계정의 모든 저장소를 허용하지 않습니다.
5. Pages CMS에서 블로그 저장소를 엽니다.
6. 원격에 존재하는 작업 branch를 선택합니다. 현재 local `feature/pages-cms`는 아직 원격에 push되지 않았으므로 push 전에는 목록에 나타나지 않습니다.
7. 저장소 루트의 `.pages.yml`을 Pages CMS가 읽는지 확인합니다.
8. `Writing` 목록과 기존 Markdown의 제목·게시일을 확인하되 저장하지 않습니다.
9. `Notes` 목록과 기존 Markdown의 제목·게시일을 확인하되 저장하지 않습니다.
10. `Lab` 목록과 기존 Markdown의 제목·게시일을 확인하되 저장하지 않습니다.
11. 테스트 글에는 개인정보·회사 정보·인증정보를 넣지 않고 항상 `draft: true`로 시작합니다.
12. `main`을 연결하기 전에 원격 `feature/pages-cms`에서 아래 전체 테스트를 완료합니다. 병합 후 운영 편집 branch는 `main`입니다.

현재 확인 결과 원격 `main`에는 `.pages.yml`이 없고 Pages CMS 생성 commit도 없습니다. 따라서 이 절차의 7~12단계는 설정 branch가 원격에 올라간 뒤 다시 수행해야 합니다.

## 연결 후 첫 점검

새 글을 저장하기 전에 다음을 확인합니다.

- Writing은 제목·설명·게시일이 필수입니다.
- Notes는 설명을 생략할 수 있습니다.
- Lab은 제목·설명·게시일이 필수입니다.
- 수정일은 선택 사항이며 날짜 형식은 `yyyy-MM-dd`입니다.
- 새 글의 초안 값은 켜져 있어야 합니다.
- Filename 입력은 보이지 않으며 저장 시 날짜·시간 기반 파일명이 자동 생성됩니다. 기존 글의 파일명은 바꿀 수 없습니다.
- 본문은 Markdown rich-text이며 Editor/Source 전환이 가능합니다.
- 본문 이미지의 저장 폴더는 `public/images/content`입니다.
- SVG 업로드가 허용되지 않습니다.
- 같은 이름의 이미지를 올려도 안전한 랜덤 파일명으로 저장됩니다.
- 권장 이미지 조건은 1600px 이하, WebP 우선, 1MB 이내입니다. 이는 권장값이며 CMS가 강제하지는 않습니다.

## 권한과 운영

GitHub App 권한은 이 블로그 저장소 하나로 제한합니다. Pages CMS는 변경을 GitHub commit으로 저장하며, 사이트의 공개 운영은 기존 GitHub Actions workflow가 담당합니다. CMS에 사이트 관리자 UI나 실행 JavaScript를 추가하는 방식이 아닙니다.

연결이 끝난 뒤에도 첫 공개 글은 다음을 순서대로 확인합니다.

1. 초안으로 저장
2. GitHub commit과 diff 확인
3. Actions build 확인
4. 공개 전환 후 Actions 재실행 확인
5. Pages에서 URL과 이미지 확인

실제 Pages CMS 로그인, GitHub App 설치와 권한 승인, hosted editor의 저장 결과는 이 저장소의 로컬 검증으로 대체할 수 없습니다.

## Hosted Pages CMS 연결 후 전체 테스트

- [ ] 1. local `feature/pages-cms` 변경을 검토하고 commit한다.
- [ ] 2. `feature/pages-cms` branch를 원격에 push한다.
- [ ] 3. Pages CMS에서 GitHub로 로그인한다.
- [ ] 4. GitHub App 권한을 블로그 저장소 하나로 제한한다.
- [ ] 5. 해당 저장소와 원격 `feature/pages-cms` branch를 선택한다.
- [ ] 6. Writing, Notes, Lab 목록을 각각 확인한다.
- [ ] 7. 모바일에서 Writing 테스트 초안을 만든다.
- [ ] 8. 제목 바로 아래의 Editor에서 한글 본문 세 문단을 작성한다.
- [ ] 9. `/` 명령과 Source 전환이 동작하는지 확인한다.
- [ ] 10. `draft: true` 상태로 저장한다.
- [ ] 11. GitHub에서 Markdown 파일과 생성 commit을 확인한다.
- [ ] 12. production 사이트에서 초안이 제외됐는지 확인한다.
- [ ] 13. 모바일 편집 화면을 종료한다.
- [ ] 14. PC에서 Pages CMS에 접속해 같은 저장소와 branch를 연다.
- [ ] 15. 저장소와 Writing 목록을 새로고침한다.
- [ ] 16. 같은 초안을 열어 모바일에서 작성한 내용을 확인한다.
- [ ] 17. PC에서 본문을 추가한다.
- [ ] 18. 이미지 한 개를 `public/images/content`에 업로드한다.
- [ ] 19. 이미지가 전달하는 의미를 alt 텍스트로 입력한다.
- [ ] 20. 다시 `draft: true` 상태로 저장한다.
- [ ] 21. 모바일에서 목록과 글을 새로고침해 PC 변경 내용을 확인한다.
- [ ] 22. 두 기기에서 같은 글을 동시에 편집하지 않았는지 확인한다.
- [ ] 23. PC에서 `draft: false`로 바꾸고 저장한다.
- [ ] 24. GitHub Actions의 build와 deploy 실행을 확인한다.
- [ ] 25. 홈페이지 최신 글에 나타나는지 확인한다.
- [ ] 26. Writing 목록에 나타나는지 확인한다.
- [ ] 27. Archive에 나타나는지 확인한다.
- [ ] 28. RSS에 item이 생겼는지 확인한다.
- [ ] 29. sitemap에 공개 URL이 생겼는지 확인한다.
- [ ] 30. 공개 상세 페이지의 BlogPosting JSON-LD를 확인한다.
- [ ] 31. 테스트 글을 다시 `draft: true`로 저장하고 공개 사이트에서 제거됐는지 확인한다.
- [ ] 32. 테스트 글을 삭제하고 다음 build에서 공개 결과에 남지 않는지 확인한다.
- [ ] 33. 다른 글이 참조하지 않는 테스트 이미지만 미디어 목록에서 삭제한다.
- [ ] 34. 삭제 직전 Git commit에서 테스트 Markdown과 이미지를 복구할 수 있는지 확인한다.
