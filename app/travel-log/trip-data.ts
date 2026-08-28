import { withBasePath } from "../site-paths";

export type PhotoLayout = "wide" | "portrait" | "split" | "collage" | "panorama";

export type TransportMode = "walk" | "bicycle" | "bus" | "train" | "ferry" | "flight" | "shopping";

export type TripPhoto = {
  src?: string;
  placeholderLabel?: string;
  group?: number;
  alt: string;
  caption: string;
  layout: PhotoLayout;
  placeholder?: boolean;
  replacementNote?: string;
};

export type ThemeSection = {
  label: string;
  title: string;
  note: string;
  photos: TripPhoto[];
};

export type MealStop = {
  label: "BREAKFAST" | "LUNCH" | "DINNER" | "EAT";
  restaurantName: string;
  time?: string;
  location?: string;
  menu: string[];
  review: string;
  photos: TripPhoto[];
};

export type TripStop = {
  name: string;
  time: string;
  lat: number;
  lng: number;
  mapX: number;
  mapY: number;
  note: string;
  photos: TripPhoto[];
  meal?: MealStop;
  mapEmphasis?: "primary" | "terminal";
};

export type TripLeg = {
  from: string;
  to: string;
  mode: TransportMode;
  startTime?: string;
  endTime?: string;
};

export type TripDay = {
  day: number;
  date: string;
  displayDate: string;
  area: string;
  title: string;
  eyebrow?: string;
  summary: string;
  stops: TripStop[];
  legs: TripLeg[];
  contextLegs?: TripLeg[];
  themes?: ThemeSection[];
};

export type MapStop = Pick<TripStop, "name" | "mapX" | "mapY" | "mapEmphasis">;

export const modeLabels: Record<TransportMode, string> = {
  walk: "WALK",
  bicycle: "BIKE",
  bus: "BUS",
  train: "TRAIN",
  ferry: "FERRY",
  flight: "FLIGHT",
  shopping: "SHOPPING",
};

const photoIds = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, index) => from + index);

const actualLayouts: PhotoLayout[] = ["wide", "portrait", "split", "collage"];

const actualPhotos = (set: string, ids: number[], alt: string, caption: string): TripPhoto[] =>
  ids.map((id, index) => ({
    src: withBasePath(`/travel-log/${set}/${set}-${String(id).padStart(2, "0")}.jpg`),
    alt: `${alt} ${index + 1}`,
    caption,
    layout: actualLayouts[index % actualLayouts.length],
  }));

export const tripDays: TripDay[] = [
  {
    day: 1,
    date: "2026-08-24",
    displayDate: "8.24",
    area: "Incheon → Takamatsu",
    title: "바다 건너, 다카마쓰에 도착",
    summary: "인천공항을 출발해 다카마쓰공항에 내린 뒤 공항버스로 시내에 들어온 여행의 첫날.",
    contextLegs: [{ from: "Incheon Airport", to: "Takamatsu Airport", mode: "flight" }],
    stops: [
      {
        name: "Takamatsu Airport",
        time: "—",
        lat: 34.2142,
        lng: 134.0155,
        mapX: 73,
        mapY: 84,
        note: "비행을 마치고 카가와에서 여행을 시작한 첫 지점.",
        photos: actualPhotos("day1", [1], "여행 첫날의 우동 패스포트", "우동 패스포트"),
      },
      {
        name: "Takamatsu City",
        time: "—",
        lat: 34.3428,
        lng: 134.0466,
        mapX: 78,
        mapY: 54,
        note: "공항버스를 타고 시내로 이동해 시작한 다카마쓰의 첫 저녁.",
        photos: actualPhotos("day1", photoIds(2, 12), "다카마쓰 시내 첫날 저녁", "다카마쓰 시내 첫날 저녁"),
      },
    ],
    legs: [{ from: "Takamatsu Airport", to: "Takamatsu City", mode: "bus" }],
  },
  {
    day: 2,
    date: "2026-08-25",
    displayDate: "8.25",
    area: "Takamatsu → Shodoshima → Takamatsu",
    title: "바다를 건너 올리브 섬으로",
    summary: "다카마쓰항에서 페리를 타고 도노쇼항에 도착해 버스로 올리브공원과 올리브원 일대를 다녀온 쇼도시마 당일치기.",
    stops: [
      {
        name: "Takamatsu Port",
        time: "08:02",
        lat: 34.3522,
        lng: 134.0507,
        mapX: 78,
        mapY: 51,
        note: "아침 페리에 올라 세토내해를 건너기 시작했다.",
        photos: actualPhotos("day2", photoIds(1, 5), "다카마쓰항과 쇼도시마행 페리", "다카마쓰항과 쇼도시마행 페리"),
      },
      {
        name: "Tonosho Port",
        time: "09:03–09:47",
        lat: 34.4861,
        lng: 134.1871,
        mapX: 55,
        mapY: 24,
        note: "도노쇼항에 도착해 섬 안쪽으로 향하는 버스를 기다렸다.",
        photos: actualPhotos("day2", [6], "도노쇼항 도착 후", "도노쇼항 도착 후"),
      },
      {
        name: "Olive Park / Olive Garden",
        time: "10:21–13:10",
        lat: 34.4722,
        lng: 134.2748,
        mapX: 68,
        mapY: 32,
        note: "쇼도시마 올리브공원과 올리브원 일대에서 약 세 시간을 보냈다.",
        photos: actualPhotos("day2", photoIds(7, 20), "쇼도시마 올리브공원과 주변 풍경", "쇼도시마 올리브공원과 주변 풍경"),
      },
      {
        name: "Tonosho Port",
        time: "13:35–15:47",
        lat: 34.4861,
        lng: 134.1871,
        mapX: 55,
        mapY: 24,
        note: "버스로 도노쇼항에 돌아와 오후 페리 출발을 기다렸다.",
        photos: actualPhotos("day2", photoIds(21, 27), "엔젤로드와 도노쇼 일대", "엔젤로드와 도노쇼 일대"),
      },
      {
        name: "Takamatsu Port",
        time: "16:45",
        lat: 34.3522,
        lng: 134.0507,
        mapX: 78,
        mapY: 51,
        note: "오후 페리로 세토내해를 다시 건너 다카마쓰에 돌아왔다.",
        photos: actualPhotos("day2", photoIds(28, 35), "다카마쓰 귀환 후 저녁", "다카마쓰 귀환 후 저녁"),
      },
    ],
    legs: [
      { from: "Takamatsu Port", to: "Tonosho Port", mode: "ferry", startTime: "08:02", endTime: "09:03" },
      { from: "Tonosho Port", to: "Olive Park / Olive Garden", mode: "bus", startTime: "09:47", endTime: "10:16" },
      { from: "Olive Park / Olive Garden", to: "Tonosho Port", mode: "bus", startTime: "13:10", endTime: "13:35" },
      { from: "Tonosho Port", to: "Takamatsu Port", mode: "ferry", startTime: "15:47", endTime: "16:45" },
    ],
    themes: [{
      label: "THEME / TAKAGI-SAN",
      title: "SHODOSHIMA SIDE STORY",
      note: "쇼도시마에서 발견한 포스터, 굿즈와 테마 택시를 한데 모았다.",
      photos: actualPhotos("day2-takagi", photoIds(1, 6), "쇼도시마 타카기양 컬렉션", "타카기양 관련 발견물"),
    }],
  },
  {
    day: 3,
    date: "2026-08-26",
    displayDate: "8.26",
    area: "Ritsurin → Kotohira → Marugame → Busshozan",
    title: "정원에서 온천까지, 가장 긴 하루",
    summary: "자전거로 리쓰린공원에 다녀온 뒤 열차로 고토히라와 마루가메를 잇고, 붓쇼잔 온천에서 하루를 마무리한 긴 이동의 기록.",
    stops: [
      {
        name: "Takamatsu Stay",
        time: "08:48",
        lat: 34.344,
        lng: 134.052,
        mapX: 78,
        mapY: 54,
        note: "숙소에서 자전거로 출발했다. 정확한 숙소 위치는 공개 지도에 표시하지 않는다.",
        photos: actualPhotos("day3", [1], "숙소에서 남긴 늦은 간식", "숙소에서 남긴 늦은 간식"),
      },
      {
        name: "Ritsurin Garden",
        time: "09:08–11:26",
        lat: 34.3294,
        lng: 134.0434,
        mapX: 76,
        mapY: 58,
        note: "연못과 소나무 사이를 걸으며 오전 시간을 보낸 실제 DAY 3의 첫 방문지.",
        photos: actualPhotos("day3", photoIds(2, 9), "리쓰린공원의 정원과 풍경", "리쓰린공원"),
      },
      {
        name: "Takamatsu Station",
        time: "11:59",
        lat: 34.3505,
        lng: 134.0468,
        mapX: 78,
        mapY: 52,
        note: "자전거 이동을 마치고 고토히라행 열차에 올랐다.",
        photos: actualPhotos("day3", [10], "고토히라로 향하는 열차", "고토히라행 열차"),
      },
      {
        name: "Kotohira",
        time: "13:05–16:12",
        lat: 34.1904,
        lng: 133.8225,
        mapX: 24,
        mapY: 88,
        note: "고토히라 일대에서 오후 세 시간을 보냈다.",
        photos: actualPhotos("day3", photoIds(11, 27), "고토히라의 거리와 방문지", "고토히라"),
      },
      {
        name: "Marugame",
        time: "16:45–18:44",
        lat: 34.286,
        lng: 133.8002,
        mapX: 18,
        mapY: 68,
        note: "고토히라에서 열차로 이동해 해 질 무렵까지 마루가메에 머물렀다.",
        photos: actualPhotos("day3", [28, 29], "마루가메 도착 후의 풍경", "마루가메"),
        meal: {
          label: "DINNER",
          restaurantName: "Honetsukidori",
          time: "—",
          location: "Marugame",
          menu: [],
          review: "",
          photos: actualPhotos("day3", photoIds(30, 32), "마루가메 호네츠키도리 식사", "호네츠키도리"),
        },
      },
      {
        name: "Takamatsu",
        time: "19:24–19:46",
        lat: 34.3505,
        lng: 134.0468,
        mapX: 78,
        mapY: 52,
        note: "마루가메에서 돌아와 붓쇼잔으로 가는 열차를 갈아탔다.",
        photos: actualPhotos("day3", [33], "다카마쓰 환승 구간", "다카마쓰 환승"),
      },
      {
        name: "Busshozan Onsen",
        time: "20:12–21:43",
        lat: 34.2805,
        lng: 134.0431,
        mapX: 70,
        mapY: 72,
        note: "붓쇼잔 온천에서 길었던 하루의 마지막 시간을 보냈다.",
        photos: actualPhotos("day3", [34, 35], "붓쇼잔역과 온천 뒤 기록", "붓쇼잔"),
      },
      {
        name: "Takamatsu",
        time: "22:10",
        lat: 34.3428,
        lng: 134.0466,
        mapX: 78,
        mapY: 54,
        note: "마지막 열차로 다카마쓰 시내에 돌아오며 가장 긴 하루를 마쳤다.",
        photos: [],
      },
    ],
    legs: [
      { from: "Takamatsu Stay", to: "Ritsurin Garden", mode: "bicycle", startTime: "08:48", endTime: "09:08" },
      { from: "Ritsurin Garden", to: "Takamatsu Station", mode: "bicycle", startTime: "11:26" },
      { from: "Takamatsu Station", to: "Kotohira", mode: "train", startTime: "11:59", endTime: "13:02" },
      { from: "Kotohira", to: "Marugame", mode: "train", startTime: "16:12", endTime: "16:39" },
      { from: "Marugame", to: "Takamatsu", mode: "train", startTime: "18:44", endTime: "19:24" },
      { from: "Takamatsu", to: "Busshozan", mode: "train", startTime: "19:46", endTime: "20:02" },
      { from: "Busshozan", to: "Takamatsu", mode: "train", startTime: "21:55", endTime: "22:10" },
    ],
  },
  {
    day: 4,
    date: "2026-08-27",
    displayDate: "8.27",
    area: "Takamatsu City → Yume Town → Airport",
    eyebrow: "LAST DAY / SHOPPING",
    title: "마지막 날은 쇼핑으로",
    summary: "여행 마지막 날은 관광보다 쇼핑에 집중했다. 다카마쓰 시내를 둘러본 뒤 유메타운으로 이동해 스시로에서 점심을 먹고 마지막 쇼핑을 마친 뒤 공항버스로 다카마쓰공항으로 향했다.",
    stops: [
      {
        name: "Takamatsu City Shopping",
        time: "—",
        lat: 34.3428,
        lng: 134.0466,
        mapX: 78,
        mapY: 54,
        mapEmphasis: "primary",
        note: "마지막 날의 첫 장면은 귀국 준비보다 다카마쓰 시내의 상점가와 쇼핑이었다. 유메타운까지의 세부 이동수단과 시각은 원본 메모에서 확인되지 않아 쇼핑 흐름으로만 표시했다.",
        photos: actualPhotos("day4", photoIds(1, 14), "다카마쓰 시내의 마지막 날 쇼핑", "다카마쓰 시내 쇼핑"),
      },
      {
        name: "Yume Town Takamatsu",
        time: "—",
        lat: 34.3167,
        lng: 134.0425,
        mapX: 73,
        mapY: 63,
        mapEmphasis: "primary",
        note: "시내 쇼핑을 마친 뒤 유메타운 다카마쓰로 이동해 마지막 날의 중심 시간을 보냈다.",
        photos: [],
      },
      {
        name: "Sushiro · Lunch",
        time: "—",
        lat: 34.3167,
        lng: 134.0425,
        mapX: 73,
        mapY: 63,
        mapEmphasis: "primary",
        note: "유메타운 구간 안에서 스시로에 들러 여행 마지막 점심을 먹었다.",
        photos: [],
        meal: {
          label: "LUNCH",
          restaurantName: "Sushiro",
          time: "—",
          location: "Yume Town Takamatsu",
          menu: [],
          review: "",
          photos: actualPhotos("day4", photoIds(15, 18), "유메타운 다카마쓰 스시로 점심", "스시로 점심"),
        },
      },
      {
        name: "Yume Town Shopping",
        time: "—",
        lat: 34.3167,
        lng: 134.0425,
        mapX: 73,
        mapY: 63,
        mapEmphasis: "primary",
        note: "점심 뒤 다시 매장을 둘러보며 여행의 마지막 쇼핑을 마무리했다.",
        photos: actualPhotos("day4", [19, 20], "유메타운에서 마친 마지막 쇼핑", "유메타운 쇼핑"),
      },
      {
        name: "Takamatsu Airport",
        time: "—",
        lat: 34.2142,
        lng: 134.0155,
        mapX: 73,
        mapY: 84,
        mapEmphasis: "terminal",
        note: "유메타운에서 공항버스를 타고 마지막 종착점인 다카마쓰공항으로 향했다.",
        photos: actualPhotos("day4", photoIds(21, 24), "다카마쓰공항과 귀국편", "다카마쓰공항과 귀국편"),
      },
    ],
    legs: [
      { from: "Takamatsu City Shopping", to: "Yume Town Takamatsu", mode: "shopping" },
      { from: "Yume Town Takamatsu", to: "Sushiro · Lunch", mode: "shopping" },
      { from: "Sushiro · Lunch", to: "Yume Town Shopping", mode: "shopping" },
      { from: "Yume Town Shopping", to: "Takamatsu Airport", mode: "bus" },
    ],
    contextLegs: [{ from: "Takamatsu Airport", to: "Incheon Airport", mode: "flight" }],
  },
];

export const tripThemes: ThemeSection[] = [{
  label: "THEME / YADON",
  title: "FOUND AROUND KAGAWA",
  note: "여행 중 카가와 곳곳에서 발견한 야돈 조형물, 장식, 맨홀과 굿즈를 모았다.",
  photos: actualPhotos("yadon", photoIds(1, 14), "카가와 곳곳의 야돈 컬렉션", "야돈 관련 발견물"),
}];

export const overviewStops: MapStop[] = [
  { name: "Takamatsu Airport", mapX: 73, mapY: 84 },
  { name: "Takamatsu", mapX: 78, mapY: 54 },
  { name: "Takamatsu Port", mapX: 78, mapY: 51 },
  { name: "Tonosho Port", mapX: 55, mapY: 24 },
  { name: "Olive Park", mapX: 68, mapY: 32 },
  { name: "Tonosho Port", mapX: 55, mapY: 24 },
  { name: "Takamatsu Port", mapX: 78, mapY: 51 },
  { name: "Ritsurin", mapX: 76, mapY: 58 },
  { name: "Takamatsu", mapX: 78, mapY: 52 },
  { name: "Kotohira", mapX: 24, mapY: 88 },
  { name: "Marugame", mapX: 18, mapY: 68 },
  { name: "Takamatsu", mapX: 78, mapY: 52 },
  { name: "Busshozan", mapX: 70, mapY: 72 },
  { name: "Takamatsu", mapX: 78, mapY: 54 },
  { name: "Yume Town", mapX: 73, mapY: 63, mapEmphasis: "primary" },
  { name: "Takamatsu Airport", mapX: 73, mapY: 84, mapEmphasis: "terminal" },
];

export const overviewLegs: TripLeg[] = [
  { from: "Takamatsu Airport", to: "Takamatsu", mode: "bus" },
  { from: "Takamatsu", to: "Takamatsu Port", mode: "walk" },
  { from: "Takamatsu Port", to: "Tonosho Port", mode: "ferry" },
  { from: "Tonosho Port", to: "Olive Park", mode: "bus" },
  { from: "Olive Park", to: "Tonosho Port", mode: "bus" },
  { from: "Tonosho Port", to: "Takamatsu Port", mode: "ferry" },
  { from: "Takamatsu Port", to: "Ritsurin", mode: "bicycle" },
  { from: "Ritsurin", to: "Takamatsu", mode: "bicycle" },
  { from: "Takamatsu", to: "Kotohira", mode: "train" },
  { from: "Kotohira", to: "Marugame", mode: "train" },
  { from: "Marugame", to: "Takamatsu", mode: "train" },
  { from: "Takamatsu", to: "Busshozan", mode: "train" },
  { from: "Busshozan", to: "Takamatsu", mode: "train" },
  { from: "Takamatsu", to: "Yume Town", mode: "shopping" },
  { from: "Yume Town", to: "Takamatsu Airport", mode: "bus" },
];

export const tripStats = [
  { value: "3", label: "Nights" },
  { value: "4", label: "Days" },
  { value: "126", label: "Photos" },
  { value: "—", label: "Kilometres" },
] as const;
