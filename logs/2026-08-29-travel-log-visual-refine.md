# Travel log visual refine

Implementation commit: `e18704d`

## 기존 문제점

- 사진 캡션과 이동수단 정보가 작고 대비가 약했다.
- overview 지도 안의 장소 라벨이 밀집 구간에서 겹쳤다.
- 1240px 안팎의 컨테이너와 큰 좌우 여백 때문에 사진과 지도의 시각적 힘이 약했다.

## 변경 내용

- 캡션을 `1rem / 1.55`, weight 500으로 키우고 더 진한 색과 넓은 상단 여백을 적용했다.
- BUS, TRAIN, FERRY, WALK, BIKE, SHOPPING, FLIGHT에 대응하는 공통 inline SVG 아이콘을 추가했다.
- 이동 구간을 icon + mode badge, time, route 순서로 재구성하고 타임라인 rail과 글자 크기를 키웠다.
- overview 지도는 inline 장소명을 제거하고 번호 마커 + 별도 3열 legend로 바꿔 라벨 겹침을 없앴다.
- overview를 약 35% text / 65% map 비율로 확대하고 주요 컨테이너를 최대 `1500px / 92vw`로 확장했다.
- 사진 프리셋 폭을 소폭 키워 wide, large, full 사진의 시각적 임팩트를 강화했다.
- 모바일에서는 overview를 세로 스택으로 바꾸고 장소 legend를 2열로 조정했다. 캡션은 `0.95rem`, 이동 구간은 세로 배치로 유지했다.

## 검증

- `npm run lint`: 0 errors, 기존 `no-img-element` warning 17개.
- `npm run build`: 성공.
- `npm test`: production build 및 6개 테스트 모두 통과.
- `npm run build:pages`: 4개 정적 route prerender 성공.
- `npm run verify:pages`: root travel log, `/plan`, basePath assets, 사진 126장 검증 성공.
- Pages HTML: `data-photo-size` 126개, 이동수단 SVG 31개, mode/place legend 확인.
- 작업 시작 전 존재하던 미커밋 `trip-data.ts` 편집은 구현 커밋에서 제외하고 별도 stash로 보존했다.
