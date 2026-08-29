# Restaurant / Meal Section system

Implementation commit: `23f6a35`

## 기존 구조

- `MealStop`은 label, restaurantName, time, location, 필수 menu/review, photos만 지원했다.
- FOOD UI가 `page.tsx` 내부에 있었고 빈 menu/review를 공개 TODO 문구로 표시했다.
- Honetsukidori와 Sushiro는 별도 meal 데이터가 있었지만 확장 가능한 지점명·보조 설명·메모 필드는 없었다.

## 새 구조

- `MealStop`에 optional `branchName`, `subtitle`, `note`를 추가했다.
- `menu`와 `review`를 optional로 변경해 정보가 적은 식당도 자연스럽게 작성할 수 있게 했다.
- `PhotoSequence.tsx`로 기존 사진 renderer를 분리해 일반 여행 사진과 FOOD 사진이 같은 layout/size/group 규칙을 사용한다.
- `RestaurantSection.tsx`를 추가해 label, restaurantName, branch/subtitle, location/time, menu/review, note, photos를 일관된 순서로 렌더링한다.

## 조건부 렌더링

- 빈 문자열과 `—`는 표시하지 않는다.
- menu가 비어 있으면 MENU 영역을 만들지 않는다.
- review가 비어 있으면 REVIEW 영역을 만들지 않는다.
- MENU 또는 REVIEW 하나만 있으면 한 열 전체 폭, 둘 다 있으면 데스크톱 두 열을 사용한다.
- restaurantName이 비어 있으면 식당 정보 UI 없이 기존 사진만 표시한다.
- 모바일에서는 metadata, menu, review가 모두 한 열로 쌓인다.

## Migration

- Honetsukidori: 기존 `DINNER`, `Honetsukidori`, `Marugame`, 사진 데이터를 새 공통 컴포넌트로 렌더링한다.
- Sushiro: 기존 `LUNCH`, `Sushiro`, `Yume Town Takamatsu`, 사진 데이터를 같은 공통 컴포넌트로 렌더링한다.
- 정확한 식당 방문이 추가로 확인되지 않아 다른 stop은 Restaurant Section으로 승격하지 않았다.

## 사진 설정 보호

- 구현 diff에서 126개 `photo()` 항목의 order, caption, alt, layout, size, group, objectPosition, objectFit을 변경하지 않았다.
- 작업 시작 전 존재한 사용자 미커밋 사진 편집은 별도 stash로 보존했으며 최종 배포 뒤 작업 폴더에 복원한다.

## 검증 및 Pages

- `npm run lint`: 0 errors, 기존 `no-img-element` warning 17개.
- `npm run build`: 성공.
- `npm test`: production build 및 6개 테스트 모두 통과.
- `npm run build:pages`: 4개 정적 route prerender 성공.
- `npm run verify:pages`: root travel log, `/plan`, basePath assets, 사진 126장 검증 성공.
- GitHub Pages workflow `33240365102`: success.
- 공개 URL HTTP 200, Honetsukidori/Sushiro section 확인, TODO/MENU/REVIEW 빈 UI 미노출, 사진 126장 확인.
