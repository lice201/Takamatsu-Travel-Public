# 2026-08-28 사진 블록 및 FOOD 섹션 확장

- `TripStop.photos`의 3장 전용 조건을 제거하고 최대 3장 단위의 반복 가능한 photo block으로 자동 분할한다.
- 사진이 10장 이상이어도 `3 + 3 + 3 + 1` 형태로 여러 블록에 나뉘어 포토북 리듬을 유지한다.
- `TripPhoto.group`을 선택적으로 추가해 데이터에서 사진 구획을 지정할 수 있게 했다.
- Desktop은 1장 wide, 2장 split, 3장 large + small + final 구성을 사용한다.
- Mobile은 기본 1열이며 2장 block만 2열 pair로 유지한다.
- 모든 stop 및 meal 사진은 `loading="lazy"`, 명시적인 width/height, placeholder aspect-ratio를 유지한다.
- `MealStop` 타입과 `TripStop.meal`을 추가했다.
- DAY 3 Marugame에 `DINNER · Honetsukidori`, DAY 4 Yume Town 구간에 `LUNCH · Sushiro` FOOD 섹션을 추가했다.
- 메뉴와 후기는 실제 데이터가 없어 빈 배열과 빈 문자열로 유지하며 화면에는 편집용 TODO를 표시한다.
- 음식 사진은 각 식당 3장 placeholder로 시작하고 2~6장도 같은 photo block 구조로 처리된다.
- TODO: replace with actual Honetsukidori food photo.
- TODO: replace with actual Sushiro sushi photo.
- TODO: add restaurant review.
- 검증: `npm run lint` 오류 없음(기존 img 경고 17건), `npm run build`, `npm test` 6/6 통과.
- Sites 공개 배포는 수행하지 않는다.
