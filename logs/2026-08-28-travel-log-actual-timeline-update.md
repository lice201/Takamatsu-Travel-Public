# 2026-08-28 `/travel-log` 실제 Timeline 동선 반영

## 변경 목적

기존 `/travel-log`의 사진 에세이 디자인을 유지하면서 여행 전 계획 데이터를 2026년 8월 24–27일 Google Maps Timeline에서 복원한 실제 동선으로 교체했다. 원본 GPS point 전체 대신 의미 있는 방문지와 이동 구간만 사용하고, 짧은 환승·중복 visit·확인되지 않은 상점과 식당은 제외했다.

## 실제 Timeline 기준 여행 동선

- DAY 1: 인천공항 → 비행 → 다카마쓰공항 → 공항버스 → 다카마쓰 시내
- DAY 2: 다카마쓰항 → 페리 → 도노쇼항 → 버스 → 쇼도시마 올리브공원/올리브원 → 버스 → 도노쇼항 → 페리 → 다카마쓰항
- DAY 3: 숙소 → 자전거 → 리쓰린공원 → 다카마쓰역 → 열차 → 고토히라 → 열차 → 마루가메 → 열차 → 다카마쓰 → 열차 → 붓쇼잔 온천 → 열차 → 다카마쓰
- DAY 4: 다카마쓰 시내 → 공항버스 → 다카마쓰공항 → 비행 → 인천공항

## 수정한 파일

- `app/travel-log/trip-data.ts`
- `app/travel-log/RouteMap.tsx`
- `app/travel-log/page.tsx`
- `app/travel-log/timeline.module.css` (신규)
- `tests/rendered-html.test.mjs`
- `logs/2026-08-28-travel-log-actual-timeline-update.md` (신규)

기존 `/` 페이지, `app/globals.css`, `app/travel-log/RevealObserver.tsx`, 기존 사진 에세이 CSS는 수정하지 않았다.

## `TripLeg` / transport 구조

`TripStop`과 별도로 `TripLeg`을 추가했다. `from`, `to`, `mode`, `startTime`, `endTime`을 가지며 mode는 `walk`, `bicycle`, `bus`, `train`, `ferry`, `flight` 중 하나다. 각 DAY의 `stops` 사이를 `legs`가 연결하고, 같은 데이터가 본문의 수직 시간축과 SVG 지도 segment에 함께 사용된다. DAY 1·4의 한국↔일본 비행은 카가와 지도 범위를 깨지 않도록 `contextLegs`에 분리했다.

## RouteMap 변경

- 단일 polyline을 이동 구간별 SVG line으로 교체했다.
- 페리: dashed, 열차: 굵은 solid, 버스: 중간 solid, 도보/자전거: 얇은 dotted/dashed.
- 색 외에도 dash pattern, 굵기, text legend로 이동수단을 구분한다.
- overview에서 Kurashiki를 제거하고 Takamatsu, Airport, Tonosho, Olive Park, Ritsurin, Kotohira, Marugame, Busshozan을 표시한다.
- aria-label, title, desc를 모두 “실제 이동 경로” 기준으로 수정했다.

## DAY 2 변경

기존 리쓰린 → 고토히라 → 마루가메 계획을 제거하고 쇼도시마 당일치기로 교체했다.

- 08:02–09:03 다카마쓰항 → 도노쇼항, Ferry
- 09:47–10:16 도노쇼항 → 올리브공원/올리브원, Bus
- 10:21–13:10 올리브공원/올리브원 체류
- 13:10–13:35 올리브공원 → 도노쇼항, Bus
- 15:47–16:45 도노쇼항 → 다카마쓰항, Ferry

다카마쓰항, 페리/세토내해, 도노쇼, 올리브공원, 쇼도시마 풍경용 TEMP 사진도 실제 순서에 맞게 다시 구성했다.

## DAY 3 변경 및 Kurashiki 제거

Kurashiki, Bikan Historical Quarter, Ohara Museum, Ivy Square 데이터와 placeholder를 전부 제거했다. DAY 3은 리쓰린공원(09:08–11:26), 고토히라(13:05–16:12), 마루가메(16:45–18:44), 붓쇼잔 온천(20:12–21:43)을 잇는 실제 장거리 이동일로 교체했다. 열차 시간 11:59–13:02, 16:12–16:39, 18:44–19:24, 19:46–20:02, 21:55–22:10도 `TripLeg`에 반영했다.

기존 Kurashiki public 이미지는 다른 페이지에서 사용할 수 있으므로 삭제하지 않았다.

## 테스트 결과

- 로컬 `/travel-log`: HTTP 200
- `npm run lint`: 성공, 오류 0. 기존 `<img>` 사용에 관한 Next 권고 warning 17개는 유지했다.
- `npm run build`: 성공. `/`와 `/travel-log` 모두 빌드됐다.
- `npm test`: 5개 모두 성공.
  - 기존 `/` 서버 렌더
  - 실제 동선 `/travel-log` 서버 렌더 및 Kurashiki 제거
  - `TripLeg`, 시간, 이동수단 데이터
  - 모든 TEMP 이미지 파일 존재
  - 이동수단별 dash/굵기/텍스트 범례
- reduced motion과 기존 reveal 구현은 변경하지 않았다.

## 실제 사진 교체 TODO

- DAY 1: 다카마쓰공항, 시내 첫 저녁
- DAY 2: 다카마쓰항, 페리/세토내해, 도노쇼항, 올리브공원, 올리브원·쇼도시마 풍경, 귀항
- DAY 3: 리쓰린공원, 고토히라, 마루가메, 붓쇼잔 온천
- DAY 4: 다카마쓰 마지막 아침, 공항
- HERO와 Footer 대표 사진

권장 폴더는 `public/travel-log/day1/`부터 `public/travel-log/day4/`까지다. 사진을 넣은 뒤 `trip-data.ts`의 `src`, `alt`, `caption`을 수정한다.

## 아직 확인되지 않은 장소

- DAY 1·4의 정확한 공항버스 시각
- DAY 4 마지막 식당·상점 이름
- 짧은 환승 중 들른 소규모 상점·편의점

확인되지 않은 상호는 임의로 추가하지 않았다. 사진 촬영 시각이나 사용자 기억으로 확인된 뒤에만 반영한다.
