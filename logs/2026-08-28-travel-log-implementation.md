# 2026-08-28 `/travel-log` 구현 로그

## 작업 목적

기존 여행계획 페이지(`/`)를 유지하면서, 2026년 8월 24–27일 다카마쓰 3박 4일 여행을 사진과 이동 경로 중심으로 정리할 별도 정적 여행기 페이지(`/travel-log`)의 1차 골격을 추가한다.

현재 실제 사진과 확정 메모가 모두 전달되지 않았으므로 계획된 장소를 실제 방문지로 단정하지 않는다. 알 수 없는 사진 수·이동 거리·시각은 `—`로 두고, 기존 공개 이미지는 코드와 화면에서 TEMP placeholder로 명확히 표시한다.

## 조사한 기존 프로젝트 구조

- Next.js App Router + React + TypeScript 프로젝트이며 `vinext`로 개발·빌드한다.
- 기존 핵심 파일은 `app/page.tsx`, `app/globals.css`, `app/ScrollEffects.tsx`, `app/layout.tsx`다.
- 기존 메인 페이지는 하나의 긴 여행계획 페이지이며, `public/`에 다카마쓰·리쓰린·고토히라·마루가메·구라시키 관련 이미지가 있다.
- `.openai/hosting.json`에 기존 Sites 프로젝트 ID가 설정되어 있다.
- 기존 `tests/rendered-html.test.mjs`는 이미 제거된 starter loading skeleton만 검사해 현재 제품과 맞지 않았다.

## 새로 만든 파일

- `app/travel-log/page.tsx`
  - `/travel-log` 전용 metadata, hero, overview, DAY 1–4, footer를 렌더한다.
- `app/travel-log/trip-data.ts`
  - 날짜, 제목, 장소, 좌표, 메모, 사진, 사진 레이아웃, 교체 TODO를 컴포넌트와 분리했다.
- `app/travel-log/RouteMap.tsx`
  - 전체 경로와 DAY별 경로를 같은 SVG 컴포넌트로 렌더한다.
- `app/travel-log/RevealObserver.tsx`
  - IntersectionObserver 기반의 한 번만 나타나는 가벼운 reveal을 담당한다.
- `app/travel-log/travel-log.module.css`
  - 기존 전역 스타일과 격리된 포토북 전용 반응형 스타일이다.
- `logs/2026-08-28-travel-log-implementation.md`
  - 이 구현 기록이다.

## 수정한 파일

- `tests/rendered-html.test.mjs`
  - 오래된 starter skeleton 검사를 제거했다.
  - 기존 `/` 페이지가 유지되는지, `/travel-log`가 서버 렌더되는지, DAY 1–4 데이터와 모든 임시 이미지 파일이 존재하는지 검사하도록 갱신했다.

기존 `app/page.tsx`, `app/globals.css`, `app/layout.tsx`는 수정하지 않았다.

## 지도 구현 방식

- 외부 API, API key, 지도 타일, 추가 패키지를 사용하지 않는 경량 SVG 지도를 선택했다.
- `trip-data.ts`에는 실제 위도·경도와 SVG 표시 좌표를 함께 둔다.
- 전체 지도는 주요 지점과 경로선을 표시하고, DAY별 지도는 해당 날짜의 지점만 간결하게 표시한다.
- 실제 이동이 확정되면 데이터의 장소·순서·좌표만 수정하면 된다.

## 데이터 구조

- `TripDay`: day, date, displayDate, area, title, summary, stops
- `TripStop`: name, time, lat, lng, mapX, mapY, note, photos
- `TripPhoto`: src, alt, caption, layout, placeholder, replacementNote
- 사진 레이아웃 값: `wide`, `portrait`, `split`, `collage`, `panorama`

모든 현재 사진은 `placeholder: true`이며 `replacementNote`에 실제 사진 교체 TODO를 기록했다.

## 디자인 결정

- warm off-white 배경, charcoal 텍스트, muted Setouchi blue 포인트를 사용했다.
- Georgia 계열 serif 큰 제목과 sans-serif metadata를 조합해 여행 포토북 분위기를 만들었다.
- 사진을 넓은 대표 컷, 세로 컷, 비대칭 2열, 3장 collage, full-bleed panorama로 섞었다.
- 모바일에서는 1열 중심으로 전환하고 세로 사진의 비율만 유지한다.
- 내비게이션에는 기존 계획 페이지로 돌아가는 링크와 DAY anchor를 제공한다.
- `prefers-reduced-motion`에서는 reveal과 이미지 transition을 제거한다.
- 이미지에는 고정 width/height, alt, lazy loading(첫 핵심 사진 제외), async decoding을 적용했다.

## 실행한 테스트와 결과

- 로컬 `/travel-log` 요청: HTTP 200, `text/html`
- `npm run lint`: 성공(오류 0). 기존 페이지와 새 페이지의 `<img>` 사용에 관한 Next 권고 warning은 남아 있다. vinext 호환 안정성을 우선해 의도적으로 `<img>`를 사용했다.
- `npm run build`: 성공. `/`와 `/travel-log` 두 경로가 함께 빌드됐다.
- `npm test`: 최초에는 오래된 starter skeleton 테스트 2개가 현재 사이트를 기대하지 않아 실패했다. 테스트를 제품 기준으로 교체한 뒤 3개 모두 성공했다.
  - 기존 여행계획 홈페이지 서버 렌더
  - 별도 `/travel-log` 서버 렌더
  - DAY 데이터와 placeholder 이미지 파일 존재 확인
- `git diff --check`: 통과.
- 인앱 브라우저 콘솔 검사는 Windows 샌드박스의 브라우저 연결 초기화 실패로 실행하지 못했다. 대신 개발 서버 렌더, 프로덕션 빌드, 두 경로의 worker 서버 렌더 테스트에서 런타임 오류가 없음을 확인했다.

## 실제 사진으로 교체해야 하는 부분

- HERO의 `/sunport.jpg`
- DAY 1 공항·다카마쓰 거리·노을 사진
- DAY 2 리쓰린·고토히라·마루가메 사진
- DAY 3 구라시키 미관지구·세부 장면·방문 장소 사진
- DAY 4 마지막 아침·식사·공항 사진
- Footer의 `/yashima.jpg`

교체 지점은 `trip-data.ts`의 `replacementNote`와 `page.tsx`의 `TEMP` 주석으로 찾을 수 있다. `trip-data.ts`에서 `src`, `alt`, `caption`만 바꾸면 대부분의 사진을 교체할 수 있다.

## 이후 해야 할 작업

1. 실제 사진을 `public/travel-log/day1`–`day4`에 정리한다.
2. 실제 방문 장소·순서·시각·캡션·좌표를 `trip-data.ts`에 반영한다.
3. 실제 사진 수와 이동 거리를 계산해 overview의 `—`를 교체한다.
4. 최종 대표 사진을 고른 뒤 HERO와 Footer 이미지를 교체한다.
5. 실제 브라우저에서 desktop/mobile 레이아웃과 콘솔을 최종 확인한다.
