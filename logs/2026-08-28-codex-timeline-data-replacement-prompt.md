# 2026-08-28 Codex 실제 타임라인 데이터 반영 프롬프트

## 목적
기존 `/travel-log` 정적 여행기 skeleton은 유지하고, 계획표 기반 더미 동선을 Google Timeline 기반 실제 2026-08-24~2026-08-27 여행 동선으로 교체하는 2차 Codex 작업을 준비한다.

## 현재 구조 확인
- `app/travel-log/page.tsx`
- `app/travel-log/RouteMap.tsx`
- `app/travel-log/RevealObserver.tsx`
- `app/travel-log/travel-log.module.css`
- `app/travel-log/trip-data.ts`

현재 `trip-data.ts`는 Day 2를 Ritsurin/Kotohira/Marugame, Day 3를 Kurashiki로 두고 있어 실제 여행과 다르다.
현재 `RouteMap.tsx`는 단일 polyline 기반의 계획 경로 스케치이며 caption/aria 문구도 예정 동선 기준이다.

## 실제 여행 동선 기준
- Day 1 8/24: 인천공항 → 비행 → 다카마쓰공항 → 공항버스 → 다카마쓰 시내
- Day 2 8/25: 다카마쓰항 → 페리 → 도노쇼항 → 버스 → 쇼도시마 올리브공원/올리브원 일대 → 도노쇼항 → 페리 → 다카마쓰 시내
- Day 3 8/26: 숙소 → 자전거 → 리쓰린공원 → 다카마쓰역 → 열차 → 고토히라 → 열차 → 마루가메 → 열차 → 다카마쓰 → 붓쇼잔 → 붓쇼잔 온천 → 다카마쓰 시내
- Day 4 8/27: 다카마쓰 시내 → 공항버스 → 다카마쓰공항 → 비행 → 인천공항 → 귀가

### 확인된 주요 시간
#### Day 2
- 08:02~09:03 다카마쓰항 → 쇼도시마 페리
- 09:47~10:16 버스 이동
- 10:21~13:10 쇼도시마 올리브공원/올리브원 일대 체류
- 13:10~13:35 버스 이동
- 15:47~16:45 도노쇼항 → 다카마쓰항 페리

#### Day 3
- 08:48 숙소 출발
- 09:08~11:26 리쓰린공원 일대
- 11:59~13:02 다카마쓰 → 고토히라 열차
- 13:05~16:12 고토히라 일대
- 16:12~16:39 고토히라 → 마루가메 열차
- 16:45~18:44 마루가메 일대
- 18:44~19:24 마루가메 → 다카마쓰 열차
- 19:46~20:02 다카마쓰 → 붓쇼잔 열차
- 20:12~21:43 붓쇼잔 온천 체류
- 21:55~22:10 붓쇼잔 → 다카마쓰 열차

## 구현 지침
- 기존 `/` 메인 페이지는 변경하지 않는다.
- `/travel-log`의 사진 에세이형 레이아웃과 reveal 효과를 유지한다.
- 계획표 기반 문구(`예정`, `실제 이동 후 수정`, `계획표 기반`)는 실제 기록 기반 문구로 교체한다.
- `trip-data.ts`를 확장해 이동 구간(transfer/leg) 개념을 표현한다.
- 이동수단 예시: ferry, train, bus, walk, bicycle, flight.
- 지도는 단일 polyline만 쓰지 말고 이동수단별 segment를 분리해 스타일을 다르게 표현할 수 있게 한다.
  - ferry: dashed
  - train: strong solid
  - bus: medium solid
  - walk/bicycle: thin or dotted
  - flight: optional long dashed/arc, 단 전체 일본 여행 개요에만 필요할 경우 사용
- GPS 원본의 모든 점을 노출하지 말고 의미 있는 stop만 사용한다.
- 사진은 여전히 실제 사진 미입력 상태이므로 기존 TEMP/placeholder 전략을 유지하되 Day 2와 Day 3의 교체 TODO를 실제 방문 장소 기준으로 수정한다.
- 확인되지 않은 식당/상점 이름은 추측하지 않는다.
- 실제 전체 이동거리/사진 수가 확정되지 않았으면 `—` 유지.
- Day 2 area/title은 Shodoshima 중심으로, Day 3는 Ritsurin → Kotohira → Marugame → Busshozan 중심으로 수정한다.
- Day 3의 리쓰린공원은 실제로 8/26에 방문한 것으로 반영한다.
- Kurashiki 관련 Day 3 데이터와 사진 placeholder는 제거하거나 실제 동선과 무관한 경우 사용하지 않는다.

## 검증
- `npm run lint`
- `npm run build`
- `npm test` 가능하면 실행
- `/`와 `/travel-log` 둘 다 build/SSR 정상 확인
- 관련 없는 파일 수정 금지

## 로그
작업 후 새 로그를 추가해 실제 Timeline 반영 내용, 수정 파일, 데이터 구조 변경, 지도 segment 표현, 검증 결과, 아직 사진으로 확정해야 할 부분을 기록한다.
