# Restaurant / Meal editing guide

식당 데이터는 `app/travel-log/trip-data.ts`의 각 stop 안에 있는 `meals` 배열에서 편집합니다. 실제 식당 방문이 확인된 경우에만 사용하고, 간식·음료·기념품 음식은 일반 사진으로 유지합니다.

```ts
meals: [{
  label: "DINNER",
  restaurantName: "Restaurant Name",
  branchName: "",
  subtitle: "",
  location: "Takamatsu, Kagawa",
  time: "18:30",
  menu: ["Udon", "Tempura"],
  review: "상단에 표시할 짧은 후기를 작성합니다.",
  overallReview: "사진 아래에 표시할 전체적인 후기를 길게 작성합니다.",
  note: "",
  photos: [
    photo("day1", 2, {
      alt: "음식 사진 설명",
      caption: "사진 캡션",
      layout: "wide",
      size: "large",
      group: 1,
      objectPosition: "center",
    }),
  ],
}],
```

## 필드

- `label`: `BREAKFAST`, `LUNCH`, `DINNER`, `EAT` 중 하나
- `restaurantName`: 식당명. 비어 있으면 식당 정보 UI 없이 사진만 표시
- `branchName`: 지점명
- `subtitle`: 식당명 아래의 짧은 보조 설명
- `location`: 도시 또는 지역
- `time`: 식사 시간
- `menu`: 실제 주문 메뉴
- `review`: 상단 정보 영역에 표시하는 짧은 후기
- `overallReview`: 음식 사진 아래의 full-width 박스에 표시하는 긴 전체 후기. 비워두면 박스도 숨김
- `note`: 추가 메모
- `photos`: 기존 `TripPhoto` 구조를 그대로 사용

빈 문자열, 빈 배열, `—` 값은 공개 화면에 표시되지 않습니다. `overallReview`도 공백 또는 빈 문자열이면 하단 박스 전체가 렌더링되지 않습니다. MENU와 REVIEW 중 하나만 채우면 한 열 전체 폭을 사용하고, 둘 다 채우면 데스크톱에서 두 열로 표시됩니다. 모바일에서는 모든 정보가 한 열로 쌓입니다.

식당명·지점명·메뉴·후기는 확인된 내용만 입력하며 추측해서 채우지 않습니다.
