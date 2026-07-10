# yoonsangwon.dev 콘텐츠 모델

## 1. 모델링 원칙

- Writing, Notes, Lab을 별도 Astro Content Collection으로 관리한다.
- 콘텐츠 종류는 collection 경로에서 이미 알 수 있으므로 frontmatter에 `type`이나 `category`를 중복 저장하지 않는다.
- 목록, Archive, RSS, sitemap은 같은 collection 데이터를 사용한다.
- 첫 번째 버전에 실제로 쓰지 않는 metadata는 추가하지 않는다.
- slug는 파일명이나 collection entry ID에서 생성하고 한 번 공개한 뒤 변경하지 않는다.
- 날짜는 timezone 혼동을 피할 수 있는 ISO 형식으로 작성한다.

## 2. Collection 구조

```text
src/content/
├─ writing/
│  └─ [slug].md
├─ notes/
│  └─ [slug].md
└─ lab/
   └─ [slug].md
```

세 collection은 가능한 한 같은 기본 schema를 공유한다. Writing과 Lab의 description은 필수, Notes의 description은 선택으로 둔다.

## 3. 공통 metadata

| 필드 | 형식 | 필요 여부 | 용도와 결정 |
|---|---|---|---|
| `title` | string | 필수 | 페이지 `h1`, 목록 링크, title metadata |
| `description` | string | Writing·Lab 필수, Notes 선택 | 목록 요약, meta description, RSS summary |
| `published` | date | 필수 | 정렬, 화면 날짜, RSS |
| `updated` | date | 선택 | 의미 있는 내용 수정 때만 사용 |
| `draft` | boolean | 선택, 기본 `false` | 공개 route와 모든 파생 목록에서 제외 |
| `tags` | string[] | 첫 버전 제외 | 분류 필요가 확인된 뒤 추가 |
| `canonical` | URL | 첫 버전 제외 | 사이트 origin과 slug로 자동 생성 |
| `series` | string | 첫 버전 제외 | 실제 연재물이 생기면 추가 |
| `language` | string | 첫 버전 제외 | 기본 언어 `ko`를 사이트 수준에서 설정 |
| `type` / `category` | enum | 제외 | collection 이름과 중복 |

## 4. Writing

### 목적

하나의 주제를 충분히 정리해 다른 사람이 독립적으로 읽을 수 있는 글이다.

### frontmatter

```yaml
---
title: "추후 작성"
description: "추후 작성"
published: 2026-07-10
draft: true
---
```

### 본문 권장 순서

1. 요약 또는 문제
2. 맥락
3. 핵심 내용
4. 판단이나 배운 점
5. 참고 링크

모든 글에 같은 소제목을 강제하지 않는다. 내용에 맞게 필요한 구조만 사용한다.

## 5. Notes

### 목적

짧은 발견, 공부 내용, 코드 조각, 해결 과정과 아직 완결되지 않은 생각을 빠르게 보존한다.

### frontmatter

```yaml
---
title: "추후 작성"
published: 2026-07-10
draft: true
---
```

### 본문 권장 순서

1. 무엇을 알게 되었는지
2. 필요한 코드나 링크
3. 남은 질문

description을 작성한 경우 목록과 meta description에 사용한다. 없으면 본문 첫 문단을 자동으로 잘라 쓰지 않고 사이트 공통 설명을 fallback으로 사용한다.

## 6. Lab

### 목적

직접 실행한 구현 실험, 비교, 실패와 시행착오를 재현 가능한 형태로 기록한다.

### frontmatter

```yaml
---
title: "추후 작성"
description: "추후 작성"
published: 2026-07-10
draft: true
---
```

### 본문 권장 순서

1. 확인하려는 질문
2. 조건과 환경
3. 시도
4. 결과
5. 한계와 다음 확인
6. demo 또는 source 링크

demo와 source URL은 항상 필요한 metadata가 아니므로 frontmatter 필드로 고정하지 않고 본문에 문맥과 함께 작성한다.

## 7. 날짜 규칙

- `published`는 처음 공개한 날짜다.
- 오탈자, 링크 수정, 문장 다듬기만으로 `updated`를 바꾸지 않는다.
- 결론, 코드, 구현 방식처럼 독자의 이해에 영향을 주는 변경에만 `updated`를 추가한다.
- 화면에는 게시일을 기본으로 표시한다.
- 수정일이 있으면 “수정 YYYY-MM-DD”를 별도로 표시한다.
- 마크업은 `<time datetime="YYYY-MM-DD">`을 사용한다.
- 정렬 기준은 `published`이며 수정했다고 최신 글로 다시 올리지 않는다.

## 8. Draft 규칙

- `draft: true`인 entry는 상세 route를 생성하지 않는다.
- 홈, collection 목록, Archive, RSS, sitemap에 포함하지 않는다.
- production build 검증에서 draft title이나 slug가 `dist`에 없는지 확인한다.
- `draft` 생략 시 공개가 기본값이다. 발행 전 글에는 명시적으로 `draft: true`를 작성한다.

## 9. URL과 canonical 규칙

- URL은 collection과 slug로 생성한다.
- 날짜를 URL에 포함하지 않는다.
- title 변경만으로 slug를 바꾸지 않는다.
- canonical은 `Astro.site`와 현재 path로 자동 생성한다.
- 외부에 먼저 게시한 글을 다시 싣는 요구가 실제로 생기기 전까지 entry별 canonical override는 추가하지 않는다.

## 10. 목록 표시 모델

모든 목록 항목은 다음 view model로 정규화한다.

| 값 | 출처 |
|---|---|
| 종류 | collection 이름 |
| 제목 | `title` |
| 설명 | `description`, 있을 때만 |
| 게시일 | `published` |
| 수정일 | `updated`, 의미 있을 때만 |
| URL | collection + slug |

홈과 각 collection 목록은 설명을 표시할 수 있다. Archive는 빠른 탐색을 위해 종류, 제목, 게시일만 표시한다.

## 11. Tags 도입 기준

첫 번째 버전에는 tags를 넣지 않는다. 다음 조건이 충족될 때 제한된 `topics` 또는 `tags` 필드를 검토한다.

- 공개 콘텐츠가 약 30개 이상 축적됨
- 같은 주제의 글을 반복해서 찾기 어려움
- Writing, Notes, Lab 구분만으로 탐색이 부족함
- 실제 콘텐츠에서 5-10개의 안정적인 주제 어휘를 추출할 수 있음

도입할 경우 자유 입력으로 무제한 늘리지 않고 허용 목록을 사용한다.

## 12. Schema 검증 조건

- 빈 title 금지
- Writing·Lab의 빈 description 금지
- `updated`가 `published`보다 빠르면 build 실패
- 날짜 parsing 실패 시 build 실패
- production에서 draft 제외
- 같은 collection 안의 중복 slug 금지

## 13. 첫 버전에서 제외한 metadata

- 작성자: 모두 동일하므로 제외
- 대표 이미지: 이미지 중심 목록을 만들지 않으므로 제외
- 읽기 시간: 실제 필요가 없음
- 조회수·좋아요: 수집하지 않음
- SEO keyword: 검색엔진용 keyword field를 운영하지 않음
- featured·pinned: 콘텐츠가 적은 초기에는 필요 없음
- related posts: 자동 관계 모델을 만들지 않음
- layout 이름: collection별 route에서 결정

