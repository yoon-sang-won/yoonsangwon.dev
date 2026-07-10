# 구조화 데이터

JSON-LD는 `src/lib/structured-data.ts`에서 한 번만 생성하고 `BaseLayout.astro`가 출력한다. 문자열은 `JSON.stringify`한 뒤 `<`를 이스케이프하며, URL은 `Astro.site`와 현재 base 경로로 절대 URL을 만든다.

## 페이지별 유형

### 홈

하나의 `@graph`에 다음 두 유형을 넣는다.

- `WebSite`: `@id`, `url`, `name`, `description`, `inLanguage`
- `Person`: `@id`, `name`, 사이트 `url`, About를 가리키는 `mainEntityOfPage`

한글 이름은 확인된 표기가 없어 넣지 않았다. 실제 외부 프로필도 확인되지 않아 `sameAs`를 넣지 않았다.

### Writing·Notes·Lab 상세

공개 상세 페이지에는 `BlogPosting`을 사용한다.

- `headline`
- 화면에도 표시되는 `description`
- ISO 8601 형식의 `datePublished`
- frontmatter에 실제 `updated`가 있을 때만 `dateModified`
- 사이트의 Person을 가리키는 `author`
- 절대 `url`
- 현재 문서를 가리키는 `mainEntityOfPage`
- `inLanguage: ko-KR`

초안은 로컬 개발 서버에서만 상세 경로가 생기고 `noindex`로 표시된다. production에서는 상세 route 자체가 생성되지 않으므로 JSON-LD도 공개 산출물에 없다.

## 의도적으로 사용하지 않는 속성과 유형

- `sameAs`: 확인된 공식 외부 프로필이 없음
- 한글 이름: 사용자 확인 전에는 표기를 추정하지 않음
- 직장, 경력, 소속, 자격, 수상, 성과: 확인된 정보가 아니며 사이트 목적과 무관함
- `image`: 실제 대표 이미지가 없음
- `dateModified`: 실제 수정일 frontmatter가 없으면 제외
- `BreadcrumbList`: 현재 상세 페이지의 상단 collection 링크만으로 탐색이 단순하며 추가 이점이 확인되지 않음
- `CollectionPage`: 목록 자체의 기본 metadata와 의미론적 HTML로 충분해 과도한 마크업을 피함

## 검증

```sh
npm run check
npm run build
npm run verify
```

`npm run verify`는 생성된 모든 JSON-LD를 `JSON.parse`하고, 홈의 `WebSite`·`Person`이 한 번만 출력되는지 확인한다. 초안 상세는 `npm run dev` 후 해당 URL의 페이지 소스에서 JSON-LD를 복사해 JSON 파서 또는 Schema.org Validator로 추가 확인한다. Google Rich Results Test는 `BlogPosting` 검색 기능 적용 가능성을 확인할 때 보조적으로 사용한다.

## custom domain 연결 후 확인

`.github/workflows/deploy.yml`의 `SITE_URL`을 `https://yoonsangwon.dev`, `BASE_PATH`를 `/`로 변경한 뒤 다음을 다시 검사한다.

- `WebSite`, `Person`, `BlogPosting`의 `@id`, `url`, `mainEntityOfPage`
- canonical과 JSON-LD URL의 origin 일치
- About URL 응답
- 중복 JSON-LD와 저장소 base 경로 잔존 여부
