# `yoonsangwon.dev` 도메인 연결 계획

이 문서는 실행 계획이다. 아직 GitHub Pages custom domain, DNS, 검색 도구와 실제 도메인을 변경하지 않는다. 실행일에는 [GitHub Pages 공식 custom domain 안내](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)에서 최신 DNS 값을 다시 확인한다.

## 현재 상태

- GitHub Pages 기본 주소: `https://yoon-sang-won.github.io/yoonsangwon.dev/`
- Actions의 현재 build origin: `https://yoon-sang-won.github.io`
- 현재 base path: `/yoonsangwon.dev`
- 목표 주소: `https://yoonsangwon.dev/`
- 배포 방식: GitHub Actions

Custom domain 연결 시 origin은 `https://yoonsangwon.dev`, base path는 `/`로 바뀐다. 콘텐츠 파일명과 `/writing/...`, `/notes/...`, `/lab/...` 경로 자체는 바꾸지 않는다.

## 연결 순서

1. 도메인 등록 상태, 갱신일과 DNS 관리 권한을 확인한다.
2. 현재 사이트 전체 build와 주요 URL 목록을 보관한다.
3. GitHub 계정의 Pages domain verification 기능으로 `yoonsangwon.dev` 소유권을 먼저 확인한다.
4. 배포 workflow의 `SITE_URL`과 `BASE_PATH` 변경을 별도 branch에서 준비하고 custom domain 환경으로 로컬 build를 검증하되 아직 배포하지 않는다.
5. 저장소 **Settings → Pages → Custom domain**에 `yoonsangwon.dev`를 입력한다.
6. DNS 제공자에서 apex와 `www` 레코드를 설정한다.
7. DNS 전파와 GitHub Pages의 DNS check를 확인하면서 준비한 workflow 변경을 배포한다.
8. **Enforce HTTPS**를 활성화하고 인증서가 정상인지 확인한다.
9. production 배포의 metadata와 모든 주요 URL을 점검한다.
10. 검색 도구에 새 도메인을 등록하고 sitemap을 제출한다.

GitHub는 DNS보다 저장소의 custom domain을 먼저 설정하도록 안내한다. GitHub Actions 배포에서는 `CNAME` 파일이 필수가 아니며 기존 `CNAME`도 사용되지 않는다.

## DNS 설정 계획

- apex `yoonsangwon.dev`: DNS 제공자가 지원하면 `ALIAS` 또는 `ANAME`으로 `yoon-sang-won.github.io`를 가리킨다. 지원하지 않으면 실행일의 GitHub 공식 문서에 나온 GitHub Pages `A` 레코드를 사용한다.
- `www.yoonsangwon.dev`: `CNAME`으로 `yoon-sang-won.github.io`를 가리킨다. 저장소 경로 `/yoonsangwon.dev`는 붙이지 않는다.
- 필요할 때만 공식 문서의 `AAAA` 레코드를 함께 사용한다.
- wildcard `*.yoonsangwon.dev` 레코드는 만들지 않는다.
- 전환 전 TTL을 낮출 수 있다면 DNS 제공자 지침에 따라 미리 조정한다.

Windows에서는 `Resolve-DnsName yoonsangwon.dev`와 `Resolve-DnsName www.yoonsangwon.dev`로 결과를 확인할 수 있다. DNS 전파에는 시간이 걸릴 수 있으므로 한 번의 조회만으로 실패를 판정하지 않는다.

## HTTPS 확인

- GitHub Pages의 DNS check가 성공한 뒤 **Enforce HTTPS**를 켠다.
- `http://yoonsangwon.dev`가 `https://yoonsangwon.dev`로 이동하는지 확인한다.
- 인증서의 도메인, 만료 상태와 브라우저 경고 여부를 확인한다.
- apex와 `www` 중 GitHub Pages에 설정한 대표 주소로 일관되게 이동하는지 확인한다.
- HTML, CSS, 이미지와 RSS에 혼합 콘텐츠가 없는지 확인한다.

## 사이트 기본 URL과 파생 출력

workflow 환경값을 다음 목표로 변경한다.

```yaml
env:
  SITE_URL: https://yoonsangwon.dev
  BASE_PATH: /
```

`astro.config.mjs`의 기본 `site`는 이미 `https://yoonsangwon.dev`지만, Actions 환경값이 실제 production 값을 결정하므로 workflow도 함께 바꿔야 한다.

배포 결과에서 다음을 확인한다.

- canonical: 모든 페이지가 `https://yoonsangwon.dev/...`를 사용한다.
- Open Graph: `og:url`과 페이지별 제목·description이 새 origin을 사용한다.
- JSON-LD: `url`, `mainEntityOfPage` 등 모든 URL이 새 origin을 사용하고 JSON parsing에 성공한다.
- RSS: feed와 각 item link가 새 도메인을 사용한다.
- sitemap: 포함 URL이 새 도메인이고 draft가 없다.
- `robots.txt`: sitemap 위치가 새 도메인을 가리키며 공개 페이지 crawling을 막지 않는다.
- 내부 링크와 `/images/content/...`: base path 없이 custom domain에서 열린다.

## 기존 github.io 주소 확인

GitHub Pages custom domain을 설정하면 기본 `github.io` 주소가 custom domain으로 이동하는지 다음 URL로 확인한다.

- 홈페이지
- Writing, Notes, Lab과 Archive
- 공개 글 하나씩
- RSS, sitemap과 robots.txt
- 본문 이미지 하나

기존 주소가 새 주소로 이동하지 않거나 경로가 손실되면 검색 도구 등록 전에 원인을 해결한다. 외부 프로필과 직접 관리하는 링크는 새 도메인으로 갱신한다.

## 배포 후 검수

1. `npm.cmd run check`, `npm.cmd run build`, `npm.cmd run verify`를 custom domain 환경값으로 실행한다.
2. GitHub Actions의 build와 deploy가 모두 성공했는지 확인한다.
3. 데스크톱과 모바일에서 주요 페이지, 404, 이미지와 긴 코드 블록을 확인한다.
4. 페이지 source에서 canonical, Open Graph와 JSON-LD를 확인한다.
5. RSS와 sitemap을 XML로 열고 새 origin과 draft 제외를 확인한다.
6. 브라우저 개발자 도구에서 404, redirect loop와 mixed content 요청이 없는지 확인한다.
7. 기존 github.io 주요 URL의 이동 결과를 기록한다.

## Google Search Console

1. `yoonsangwon.dev` Domain property를 DNS 방식으로 인증한다.
2. 필요하면 `https://yoonsangwon.dev/` URL-prefix property도 추가한다.
3. 새 sitemap을 제출한다.
4. URL 검사에서 홈페이지와 대표 글의 indexing 가능 여부를 확인한다.
5. 기존 github.io property를 소유하고 있고 도구가 해당 이동을 지원하는 경우에만 Change of Address 적용 여부를 검토한다. 적용 가능성을 확인하지 않고 실행하지 않는다.
6. 전환 후 색인, 페이지 오류와 구조화 데이터 보고서를 관찰한다.

[Google Search Console 시작 안내](https://developers.google.com/search/docs/monitor-debug/search-console-start)와 [URL 변경 사이트 이동 안내](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)를 실행일에 다시 확인한다.

## 네이버 서치어드바이저

1. 네이버 서치어드바이저에 `https://yoonsangwon.dev`를 등록한다.
2. 실행 시점에 제공되는 방법으로 사이트 소유권을 확인한다.
3. `robots.txt` 검사와 URL 수집 가능 여부를 확인한다.
4. 새 sitemap과 RSS 제출 기능이 제공되면 새 도메인 URL을 등록한다.
5. 수집 현황과 오류를 확인하되 검색 노출을 보장된 결과로 간주하지 않는다.

## 롤백

도메인 연결 뒤 사이트가 열리지 않거나 핵심 URL이 깨지면 다음 순서로 되돌린다.

1. 실패한 배포와 DNS 상태를 기록하고 추가 변경을 멈춘다.
2. workflow의 `SITE_URL`을 `https://yoon-sang-won.github.io`, `BASE_PATH`를 `/yoonsangwon.dev`로 되돌린다.
3. 정상 commit으로 배포해 기본 github.io 주소가 다시 동작하는지 확인한다.
4. GitHub **Settings → Pages**에서 custom domain을 제거한다.
5. 기본 주소 복구를 확인한 뒤 custom domain용 DNS 레코드를 제거하거나 원래 값으로 되돌린다.
6. 검색 도구의 sitemap과 속성은 사이트가 안정된 뒤 정리한다.

DNS부터 급히 삭제하면 복구 중 상태를 판단하기 어려워질 수 있다. 먼저 github.io 배포를 정상화하고 custom domain 설정과 DNS를 순서대로 되돌린다.
