# Individual photo data refactor

- 기존 문제: `actualPhotos()`, `photoIds()`, `actualLayouts`가 여러 사진의 caption과 index 기반 layout을 한 번에 생성해 개별 사진을 찾고 수정하기 어려웠다.
- 변경 구조: 실제 여행 사진을 모두 `photo(set, id, options)` 호출로 명시하고 각 options에 `alt`, `caption`, `layout`, `group`, `objectPosition`을 직접 기록했다.
- 삭제한 batch helper: `actualPhotos()`, `photoIds()`, `actualLayouts`를 제거했다.
- 새 `photo()` helper: `set`과 `id`로 `/travel-log/{set}/{set}-{NN}.jpg` 경로만 만들며 caption, layout, group, crop 값은 생성하거나 숨기지 않는다.
- `TripPhoto` 필드: `objectPosition?: string`과 `objectFit?: "cover" | "contain"`을 추가했다.
- 126장 변환: DAY 1 12장, DAY 2 35장, Takagi-san 6장, DAY 3 35장, DAY 4 24장, Yadon 14장을 모두 개별 항목으로 변환했다.
- FOOD: Honetsukidori 3장과 Sushiro 4장을 개별 `photo()` 항목으로 유지했다.
- THEME: Takagi-san 6장과 Yadon 14장을 개별 `photo()` 항목으로 유지했다.
- 우동 패스포트: `day1-01.jpg`에 `layout: "portrait"`, `objectFit: "contain"`을 데이터로 명시했다.
- 렌더링: `<img>` inline style에 사진별 `objectPosition`과 `objectFit`을 전달한다.
- CSS: 1장 블록도 `wide`, `portrait`, `split`, `collage`, `panorama` 선택을 반영하도록 조정하고 CSS의 강제 `contain`은 제거했다.
- 초기 화면 보존: 기존 batch별 layout 순환과 3장 단위 group을 명시값으로 옮겼다. 배포 전 사이트와 새 export의 고유 사진 126장 순서 및 51개 block 구성이 동일하다.
- 테스트: `npm run lint` 성공(기존 `<img>` warning 17건, error 0건).
- 테스트: `npm test` 성공, 6/6 통과. 일반 vinext build 성공.
- Pages: `npm run build:pages`와 `npm run verify:pages` 성공. `/`, `/plan`, base path와 126개 실제 파일을 확인했다.
- 수동 편집 가이드: `docs/photo-editing-guide.md`.
- 구현 commit SHA: `a547f443becdbe5237fb0a4a6f4eac8e9e38ace8`.
