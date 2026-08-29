# 여행 사진 수동 편집 가이드

사진 데이터는 `app/travel-log/trip-data.ts`에 있습니다. 파일 번호를 검색하면 해당 사진을 바로 찾을 수 있습니다.

`layout`은 사진의 비율과 형태, `size`는 화면에서 차지하는 크기입니다.

```ts
photo("day2", 7, {
  alt: "사진을 설명하는 대체 텍스트",
  caption: "사진 아래에 표시할 문장",
  layout: "portrait",
  size: "medium",
  group: 1,
  objectPosition: "center",
})
```

## caption 변경

```ts
caption: "내가 원하는 문장"
```

## 사진 형태

```ts
layout: "wide"
```

- `wide`: 가로 사진
- `portrait`: 세로 사진
- `split`: 중간 비율 사진
- `collage`: 정사각형 사진
- `panorama`: 매우 넓은 사진

## 사진 크기

사진의 전체 표시 크기는 `size` 값 하나로 조절합니다.

```ts
size: "small"
```

- `xs`: 아주 작게
- `small`: 작게
- `medium`: 보통
- `large`: 크게
- `full`: photo block에서 가능한 최대 폭

### 작고 세로로

```ts
layout: "portrait",
size: "small",
```

### 크게 가로로

```ts
layout: "wide",
size: "large",
```

### 전체 폭

```ts
layout: "wide",
size: "full",
```

### 작은 사진 전체 보이기

```ts
layout: "portrait",
size: "small",
objectFit: "contain",
```

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

```ts
objectFit: "contain"
```

기본값은 기존 CSS의 `cover`입니다. `objectFit` 줄을 생략하면 기존 표시 방식을 사용합니다.
