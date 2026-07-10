# 타이포그래피

## 선택

본문, 내비게이션과 글 목록에는 **Pretendard Variable v1.3.9**를 사용한다. 한글·영문·숫자를 함께 다루고, Windows·macOS·모바일에서 같은 글꼴 파일을 사용해 시스템 글꼴만 쓸 때보다 인상 차이를 줄일 수 있다. 사이트명 `Yoon Sangwon`에만 기존 시스템 serif를 제한적으로 유지한다.

- 공식 출처: https://github.com/orioncactus/pretendard
- 사용 파일: `src/assets/fonts/PretendardVariable.woff2`
- 원본 경로: `packages/pretendard/dist/web/variable/woff2/PretendardVariable.woff2`
- 버전: `v1.3.9`
- 파일 크기: 2,057,688 bytes
- 라이선스: SIL Open Font License 1.1
- 라이선스 원문: `src/assets/fonts/LICENSE.txt`

공식 문서는 Pretendard를 크로스 플랫폼과 다국어 조판에 맞춘 글꼴로 소개하며 가변 글꼴을 제공한다. 라이선스는 상업적 사용, 포함과 재배포를 허용한다. 저장소에는 공식 배포 파일을 수정하지 않고 그대로 포함했다.

## 제공 방식 비교

| 방식 | 장점 | 단점 | 결정 |
|---|---|---|---|
| 공식 WOFF2 자체 호스팅 | 동일 출처 한 요청, 외부 서비스·개인정보 전송 없음, GitHub Pages와 함께 버전 고정 | 최초 WOFF2 전송 약 2.06MB | 선택 |
| 공식 가변 다이나믹 서브셋 CDN | 페이지에 사용된 글자 조각만 받아 초기 전송량을 줄일 수 있음 | jsDelivr 등 외부 요청, 여러 조각 요청 가능, 외부 장애·정책·캐시 의존, 방문 IP 등 연결 정보가 제3자에 전달됨 | 제외 |

장문 한글은 사용하는 글자 수가 늘수록 여러 서브셋을 요청할 수 있다. 이 사이트는 이미지와 클라이언트 JavaScript가 없고 개인정보·장기 운영·동일 출처 제공을 우선하므로 자체 호스팅을 선택했다. 실제 전송량이 운영 단계에서 문제가 된다는 측정 결과가 생기면 공식 다이나믹 서브셋 또는 직접 만든 명시적 서브셋을 다시 검토한다.

## CSS 설정

- `font-weight: 45 920`: 공식 가변 글꼴의 축 범위를 그대로 선언한다.
- 실제 UI는 기본 400과 강조 700만 사용한다. 별도 굵기 파일은 추가하지 않는다.
- `font-display: optional`: 느린 첫 방문에서는 fallback을 유지해 2.06MB 글꼴이 첫 표시를 늦추거나 뒤늦게 레이아웃을 바꾸지 않게 한다. 빠른 연결이나 캐시 재방문에서는 Pretendard를 사용한다.
- preload는 사용하지 않는다. 모든 페이지에서 2.06MB 파일을 최고 우선순위로 강제할 근거가 아직 없으며, CSS와 브라우저 캐시의 기본 흐름을 먼저 측정한다.
- fallback: `"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif`

## 적용 수치

- 모바일 기본 글자: 17px (`106.25%`)
- 40rem 이상 기본 글자: 17.5px (`109.375%`)
- 기본 줄 높이: `1.75`
- 장문 본문 최대 폭: `42rem`
- 사이트 인덱스 최대 폭: `58rem`
- 한글 본문: `word-break: keep-all`과 비상 줄바꿈용 `overflow-wrap: anywhere`

고정 높이는 사용하지 않는다. 긴 URL과 코드는 필요한 곳에서 줄바꿈하고, 코드 블록과 표는 자체 가로 스크롤을 허용해 페이지 전체가 옆으로 밀리지 않게 한다.

## 실제 기기 확인 항목

- Windows Chrome·Edge: `Segoe UI`/`Malgun Gothic`에서 Pretendard로 바뀔 때 줄 수와 한글 기준선 변화
- macOS·iOS Safari: `Apple SD Gothic Neo` fallback과 Pretendard의 글자 폭 차이, 가변 굵기 표시
- 두 환경 공통: 로딩 전후 레이아웃 이동, 400·700 구분, 한글·영문·숫자 혼합 문장
- Android와 iOS: 느린 네트워크 첫 방문, 캐시 재방문, 200% 확대와 긴 URL
