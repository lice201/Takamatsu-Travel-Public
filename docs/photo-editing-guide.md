# 여행 사진 수동 편집 가이드

사진 데이터는 `app/travel-log/trip-data.ts`에 있습니다. 파일 번호를 검색하면 해당 사진을 바로 찾을 수 있습니다.

```ts
photo("day2", 7, {
  alt: "사진을 설명하는 대체 텍스트",
  caption: "사진 아래에 표시할 문장",
  layout: "wide",
  group: 1,
  objectPosition: "center",
})
```

## caption 변경

```ts
caption: "내가 원하는 문장"
```

## 사진 크기와 형태

```ts
layout: "wide"
```

사용 가능한 값:

- `wide`: 큰 가로 사진
- `portrait`: 세로 사진
- `split`: 두 장 구성에 어울리는 중간 크기
- `collage`: 작은 정사각형 사진
- `panorama`: 매우 넓은 사진

## 사진 블록

같은 `group` 번호를 연속해서 지정한 사진은 같은 블록에 표시됩니다. 한 블록에는 최대 3장이 들어갑니다.

```ts
group: 2
```

## 사진 초점

세로 위치를 올리려면 두 번째 값을 줄입니다.

```ts
objectPosition: "center 30%"
```

가로·세로 값을 함께 지정할 수도 있습니다.

```ts
objectPosition: "65% 40%"
```

## 전체 사진 보이기

사진을 자르지 않고 전체가 보이게 하려면 다음 값을 추가합니다.

```ts
