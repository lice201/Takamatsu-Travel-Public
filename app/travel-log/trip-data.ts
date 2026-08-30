import { withBasePath } from "../site-paths";

export type PhotoLayout = "wide" | "portrait" | "split" | "collage" | "panorama" | "panoramic";

export type PhotoSize = "xs" | "small" | "medium" | "large" | "full";

// PHOTO EDITING
// layout = shape · size = rendered width · group = block grouping
// objectPosition = crop focus · objectFit = cover / contain

export type TransportMode = "walk" | "bicycle" | "bus" | "train" | "ferry" | "flight" | "shopping";

export type TripPhoto = {
  src?: string;
  alt: string;
  caption: string;
  layout: PhotoLayout;
  size: PhotoSize;
  group?: number;
  objectPosition?: string;
  objectFit?: "cover" | "contain";
  placeholder?: boolean;
  placeholderLabel?: string;
  replacementNote?: string;
};

export type ThemeSection = {
  label: string;
  title: string;
  note: string;
  photos: TripPhoto[];
};

// Restaurant editing:
// restaurantName = store name · branchName = branch · location = city / area
// menu = ordered items · review = personal notes
export type MealStop = {
  label: "BREAKFAST" | "LUNCH" | "DINNER" | "EAT" | "MEAL";
  title?: string;
  restaurantName?: string;
  branchName?: string;
  subtitle?: string;
  location?: string;
  time?: string;
  menu?: string[];
  review?: string;
  overallReview?: string;
  note?: string;
  insertAt?: number;
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
  meals?: MealStop[];
  interstitialLegs?: InterstitialLeg[];
  mapEmphasis?: "primary" | "terminal";
};

export type TripLeg = {
  from: string;
  to: string;
  mode: TransportMode;
  startTime?: string;
  endTime?: string;
};

export type InterstitialLeg = {
  insertAt: number;
  order?: number;
  leg: TripLeg;
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

const photo = (
  set: string,
  id: number,
  options: Omit<TripPhoto, "src">,
): TripPhoto => ({
  src: withBasePath(`/travel-log/${set}/${set}-${String(id).padStart(2, "0")}.jpg`),
  ...options,
});

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
        note: "카가와 현에 첫 걸음을 내딛다.",
        photos: [
          photo("day1", 1, {
            alt: "여행 첫날의 우동 패스포트",
            caption: "여행 첫날 받은 우동 패스포트 : 여권 안에는 카가와 현 내의 다양한 명소들과 지류 할인쿠폰이 담겨져 있다.",
            layout: "portrait",
            size: "medium",
            group: 1,
            objectPosition: "center",
            objectFit: "contain",
          }),
        ],
      },
      {
        name: "Takamatsu Station",
        time: "—",
        lat: 34.3428,
        lng: 134.0466,
        mapX: 78,
        mapY: 54,
        note: "공항버스를 타고 시내로 이동해 저녁부터 먹었다.",
        photos: [
          photo("day1", 4, {
            alt: "다카마쓰 시내 첫날 저녁 3",
            caption: "다카마쓰 심볼 타워 : 다카마쓰에서 가장 높은 건물로, 시내를 한눈에 볼 수 있는 전망대가 있다.",
            layout: "split",
            size: "medium",
            group: 1,
            objectPosition: "center",
          }),
          photo("day1", 12, {
            alt: "다카마쓰 시내 첫날 저녁 11",
            caption: "숙소로 복귀하기 전 편의점 털이. 간단한 맥주와 군것질거리를 즐겼다",
            layout: "split",
            size: "large",
            group: 4,
            objectPosition: "center",
          }),
        ],
        meals: [
          {
            label: "MEAL",
            restaurantName: "메리켄야",
            branchName: "다카마쓰역 앞점",
            location: "6-20 Nishinomarucho, Takamatsu, Kagawa 760-0021 일본",
            menu: [],
            review: "",
            overallReview: "나빼고 다 온우동, 나는 냉우동을 먹었는데 다카마쓰에서의 우동은,, 면발이 매우 쫄깃했다. 그리고 가격도 싸다. 퇴근하신 직장인 분들이 혼밥하러 자주 오시는 거 같은데 자기가 사는 도시에 이런 우동 맛집이 있다면 정말 기쁠 거 같다.",
            insertAt: 0,
            photos: [
              photo("day1", 2, {
                alt: "다카마쓰 시내 첫날 저녁 1",
                caption: "메리켄야 다카마쓰역점",
                layout: "wide",
                size: "large",
                group: 1,
                objectPosition: "center",
              }),
              photo("day1", 3, {
                alt: "다카마쓰 시내 첫날 저녁 2",
                caption: "메리켄야 다카마쓰역점",
                layout: "portrait",
                size: "small",
                group: 1,
                objectPosition: "center",
              }),
            ],
          },
          {
            label: "DINNER",
            title: "Izakaya in Takamatsu",
            restaurantName: "하쿠리타바이 한베 (Hakuri tabai hanbey)",
            location: "Takamatsu7-10 Furubabacho, Takamatsu, Kagawa 760-0045 일본",
            menu: [],
            review: "",
            overallReview: "하나에 50엔의 야키토리 꼬치라서 무작정 시켰더니 요금이 생각보다 많이 나왔다. 소금구이는 무난했지만, 소스가 발라져 있는 꼬치는 어쩔 땐 너무 짜고 어쩔 땐 괜찮고 나름 복불복을 타는 듯 했다. 일본 이자카야의 한 형태를 알 수 있게 해주는 가게였다.",
            insertAt: 1,
            photos: [
              photo("day1", 5, {
                alt: "다카마쓰 시내 첫날 저녁 4",
                caption: "개쩌는 생맥주. 딱 500mL 정도 되는 거 같았다. 일본의 나마비루 차원이 달라!",
                layout: "portrait",
                size: "medium",
                group: 2,
                objectPosition: "center",
              }),
              photo("day1", 6, {
                alt: "다카마쓰 시내 첫날 저녁 5",
                caption: "호네츠키도리 웨이팅을 보고 경악한 후 아무데나 들어간 술집. 각종 꼬치를 다양하게 팔고 있었다.",
                layout: "collage",
                size: "large",
                group: 2,
                objectPosition: "center",
              }),
              photo("day1", 7, {
                alt: "다카마쓰 시내 첫날 저녁 6",
                caption: "내가 시킨 칵테일. 무난한 풍선껌 맛이 났다. 안에 들어있는 사탕은 정말 맛있었는데 아직도 어떤 제품인지 모르겠다.",
                layout: "collage",
                size: "small",
                group: 2,
                objectPosition: "center",
              }),
              photo("day1", 8, {
                alt: "다카마쓰 시내 첫날 저녁 7",
                caption: "민성이 형이 시킨 칵테일. 무난한 메론소다 맛이 났다. 참고로 저 빛나는 고리는 민성이 형이 한국까지 가지고 왔다 ㅋㅋ",
                layout: "split",
                size: "small",
                group: 3,
                objectPosition: "center",
              }),
              photo("day1", 9, {
                alt: "다카마쓰 시내 첫날 저녁 8",
                caption: "동인이가 시킨 칵테일. 미도리사워 맛이랑 비슷했다. 손에 끼고 있는 반지가 너무 눈부셨다. 시대팅 어그로 1등 감이다.",
                layout: "collage",
                size: "small",
                group: 3,
                objectPosition: "center",
              }),
              photo("day1", 10, {
                alt: "다카마쓰 시내 첫날 저녁 9",
                caption: "승원이가 시킨 칵테일. 생긴 것과 다르게 술맛이 제일 강했다. 열쇠고리처럼 생긴 초콜릿은 마치 m&m 같았다.",
                layout: "collage",
                size: "small",
                group: 3,
                objectPosition: "center",
              }),
              photo("day1", 11, {
                alt: "다카마쓰 시내 첫날 저녁 10",
                caption: "술집간판부터 현지의 느낌이 강했다. 실제로 직장인 분들이 간단하게 한잔 하려고 많이 찾으셨던 거 같다.",
                layout: "portrait",
                size: "medium",
                group: 4,
                objectPosition: "center",
              }),
            ],
          },
        ],
        interstitialLegs: [
          {
            insertAt: 1,
            order: 20,
            leg: { from: "하쿠리타바이 한베 (Hakuri tabai hanbey)", to: "숙소", mode: "walk" },
          },
        ],
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
    summary: "다카마쓰에 온 이상 페리를 타야 했다. 쇼도시마 올리브공원과 엔젤로드를 보고 다카마쓰로 돌아온 하루.",
    stops: [
      {
        name: "Takamatsu Port",
        time: "08:02",
        lat: 34.3522,
        lng: 134.0507,
        mapX: 78,
        mapY: 51,
        note: "아침 페리에 올라 세토내해를 마주했다.",
        photos: [
          photo("day2", 1, {
            alt: "다카마쓰항과 쇼도시마행 페리 1",
            caption: "다카마쓰항에서 쇼도시마로. 페리는 생각보다 엄청 컸다.",
            layout: "wide",
            size: "large",
            group: 1,
            objectPosition: "center",
          }),
          photo("day2", 2, {
            alt: "다카마쓰항과 쇼도시마행 페리 2",
            caption: "페리 내에서 팔고 있는 간단한 우동. 야돈이 그려져 있는 유부가 올려져 있다. 맛은 그냥 그렇다.",
            layout: "portrait",
            size: "small",
            group: 1,
            objectPosition: "center",
          }),
          photo("day2", 3, {
            alt: "다카마쓰항과 쇼도시마행 페리 3",
            caption: "거의 도착했을때쯤 쇼도시마내 건물들이 보였다.",
            layout: "wide",
            size: "large",
            group: 1,
            objectPosition: "center",
          }),
          photo("day2", 4, {
            alt: "다카마쓰항과 쇼도시마행 페리 4",
            caption: "옹기종기 모여있는 쇼도시마 주택가.",
            layout: "wide",
            size: "large",
            group: 2,
            objectPosition: "center",
          }),
          photo("day2", 5, {
            alt: "다카마쓰항과 쇼도시마행 페리 5",
            caption: "우리가 탔던 야돈 테마의 페리 외부. 내부엔 야돈 관련 장식과 기념품이 있었다.",
            layout: "wide",
            size: "medium",
            group: 2,
            objectPosition: "right",
          }),
        ],
      },
      {
        name: "Tonosho Port",
        time: "09:03–09:47",
        lat: 34.4861,
        lng: 134.1871,
        mapX: 55,
        mapY: 24,
        note: "도노쇼항에 도착해 섬 안쪽으로 향하는 버스를 기다렸다.",
        photos: [
          photo("day2", 6, {
            alt: "도노쇼항 도착 후 1",
            caption: "올리브향이 나는 사이다. 가격은 200엔인데 양이 적어서 아쉬웠다. 맛은 조금 더 특이한 사이다 맛이다.",
            layout: "portrait",
            size: "medium",
            group: 1,
            objectPosition: "center",
          }),
        ],
      },
      {
        name: "Olive Park / Olive Garden",
        time: "10:21–13:10",
        lat: 34.4722,
        lng: 134.2748,
        mapX: 68,
        mapY: 32,
        note: "쇼도시마 올리브공원과 올리브원 일대에서 약 세 시간을 보냈다.",
        photos: [
          photo("day2", 7, {
            alt: "쇼도시마 올리브공원과 주변 풍경 1",
            caption: "올리브 공원으로 올라가는 길. 오르막길이라서 꽤나 힘들었다.",
            layout: "wide",
            size: "full",
            group: 1,
            objectPosition: "center",
          }),
          photo("day2", 8, {
            alt: "쇼도시마 올리브공원과 주변 풍경 2",
            caption: "주변에는 주인이 있는건가 싶은 올리브 나무들이 정말 많았다.",
            layout: "portrait",
            size: "small",
            group: 1,
            objectPosition: "center",
          }),
          photo("day2", 9, {
            alt: "쇼도시마 올리브공원과 주변 풍경 3",
            caption: "사람들이 이 우체통에서 사진을 많이 찍었다. 마녀배달부 키키를 안 봐서 이것도 관련이 있는지까지는 모르겠다.",
            layout: "portrait",
            size: "medium",
            group: 1,
            objectPosition: "center",
          }),
          photo("day2", 10, {
            alt: "쇼도시마 올리브공원과 주변 풍경 4",
            caption: "탁트인 올리브공원 주변 풍경은 정말 아름다웠다. 덥지만 날씨도 정말 맑았기 때문에.",
            layout: "collage",
            size: "full",
            group: 2,
            objectPosition: "center",
          }),
          photo("day2", 11, {
            alt: "쇼도시마 올리브공원과 주변 풍경 5",
            caption: "올리브오일?이 뿌려져 있는 아이스크림. 적당히 맛있었던 거 같다.",
            layout: "portrait",
            size: "small",
            group: 2,
            objectPosition: "center",
          }),
          photo("day2", 12, {
            alt: "쇼도시마 올리브공원과 주변 풍경 6",
            caption: "우뚝 솟아있는 올리브공원 앞 기둥이다.",
            layout: "portrait",
            size: "medium",
            group: 2,
            objectPosition: "center",
          }),
          photo("day2", 13, {
            alt: "쇼도시마 올리브공원과 주변 풍경 7",
            caption: "처음엔 누군가 했더니 그리스 로마 신화에 나오는 지혜의 여신 아테나였다. 상징하는 나무가 올리브나무이다 보니까 세워둔 거 같다.",
            layout: "split",
            size: "medium",
            group: 3,
            objectPosition: "center",
          }),
          photo("day2", 14, {
            alt: "쇼도시마 올리브공원과 주변 풍경 8",
            caption: "적혀있는 내용으론 이 섬에서 올리브를 재배하기까지의 배경이 담겨 있다. 이 곳에서도 많은 사람들이 사진을 찍었다.",
            layout: "collage",
            size: "medium",
            group: 3,
            objectPosition: "center",
          }),
          photo("day2", 15, {
            alt: "쇼도시마 올리브공원과 주변 풍경 9",
            caption: "마녀배달부 키키에 나온다는 그 하얀 풍차이다. 건너편에 보이는 바다 풍경 또한 예쁘다.",
            layout: "split",
            size: "full",
            group: 3,
            objectPosition: "center",
          }),
          photo("day2", 16, {
            alt: "쇼도시마 올리브공원과 주변 풍경 10",
            caption: "사람들이 풍차 뒷면에선 사진을 잘 안 찍던데, 아무래도 바다 풍경을 같이 담고 싶어서이지 않았을까.",
            layout: "portrait",
            size: "large",
            group: 4,
            objectPosition: "center",
          }),
          photo("day2", 17, {
            alt: "쇼도시마 올리브공원과 주변 풍경 11",
            caption: "올리브 공원을 쭉 내려오면 해수욕장이 있었다. 꽤나 수영하는 사람이 많았다. 정말 시원해보이고 재밌어보였다.",
            layout: "collage",
            size: "large",
            group: 4,
            objectPosition: "center",
          }),
          photo("day2", 18, {
            alt: "쇼도시마 올리브공원과 주변 풍경 12",
            caption: "동인, 경준은 신발을 벗고 바다에 발을 담갔다. 근데 모래가 햇빛 때문에 불처럼 달궈져서 정말 죽을 뻔했다. 바닷물도 생각보다 미지근했다. 아무래도 안쪽까지 들어가야 차가울지 싶다.",
            layout: "collage",
            size: "medium",
            group: 4,
            objectPosition: "center",
          }),
          photo("day2", 20, {
            alt: "쇼도시마 올리브공원과 주변 풍경 14",
            caption: "올리브 정원 입구",
            layout: "portrait",
            size: "medium",
            group: 5,
            objectPosition: "center",
          }),
        ],
        meals: [
          {
            label: "LUNCH",
            title: "RestleA in the Olive Garden",
            restaurantName: "RestleA",
            location: "일본 〒761-4434 Kagawa, Shozu District, Shodoshima, Nishimura, 甲2171−甲２１７１",
            menu: [],
            review: "",
            overallReview: "올리브 정원이라고 따로 구역이 있었던 거 같은데 유독 우리가 못 찾은 거 같기도 하고.. 구글맵이 길찾기를 이상하게 해서 식당을 찾는데 꽤나 고생했다. 중간에 투덜거리는 사람도 분명 있었을 것이다. (내 얘기 맞음) 하지만 이 올리브 소면은 그 하소연을 잠재울 만큼 시원하고 맛있었다. 튀김과 적당한 밥의 양도 훌륭했다. 이 식당으로 가자고 제안한 민성이형에게 정말 고마웠다. ",
            insertAt: 12,
            photos: [
              photo("day2", 19, {
                alt: "쇼도시마 올리브공원과 주변 풍경 13",
                caption: "올리브 소면 정식",
                layout: "split",
                size: "full",
                group: 5,
                objectPosition: "center",
              }),
            ],
          },
        ],
      },
      {
        name: "Angel Road / Tonosho Port",
        time: "13:35–15:47",
        lat: 34.4861,
        lng: 134.1871,
        mapX: 55,
        mapY: 24,
        note: "간장박물관을 갈 수도 있었지만 너무 더웠기 때문에 바로 엔젤로드로 가기로 결심했다.",
        photos: [
          photo("day2", 21, {
            alt: "엔젤로드와 도노쇼 일대 1",
            caption: "처음에 동인, 경준은 '뭐야, 생각보다 작은데?'라고 생각했다.",
            layout: "wide",
            size: "large",
            group: 1,
            objectPosition: "center",
          }),
          photo("day2", 22, {
            alt: "엔젤로드와 도노쇼 일대 2",
            caption: "엔젤로드 외진 돌바닥에서 사진 한 장",
            layout: "portrait",
            size: "small",
            group: 1,
            objectPosition: "center",
          }),
          photo("day2", 23, {
            alt: "엔젤로드와 도노쇼 일대 3",
            caption: "엔젤로드에 어서오세요.. 라고 말하는 것 같은 돌간판",
            layout: "split",
            size: "medium",
            group: 1,
            objectPosition: "center",
          }),
          photo("day2", 24, {
            alt: "엔젤로드와 도노쇼 일대 4",
            caption: "중간에 절벽?위로 올라가는 계단이 있길래 올라가봤다. 올라가니까 종이 하나 있었고, 다들 한두번씩 종을 울리고 내려갔다.",
            layout: "collage",
            size: "large",
            group: 2,
            objectPosition: "center",
          }),
          photo("day2", 25, {
            alt: "엔젤로드와 도노쇼 일대 5",
            caption: "확실히 올라오니까 위에서 내려다보는 풍경은 정말 좋았다. 사진 한 장 더.",
            layout: "wide",
            size: "large",
            group: 2,
            objectPosition: "center",
          }),
          photo("day2", 26, {
            alt: "엔젤로드와 도노쇼 일대 6",
            caption: "바닥에서 봤을 땐 잘 몰랐었는데, 높은 곳에서 바라보는 엔젤로드는 참 예쁜 거 같다. 힘들지만 올라온 보람이 있었다.",
            layout: "split",
            size: "large",
            group: 2,
            objectPosition: "center",
          }),
          photo("day2", 27, {
            alt: "엔젤로드와 도노쇼 일대 7",
            caption: "김승원 눈감았다",
            layout: "split",
            size: "large",
            group: 3,
            objectPosition: "center",
          }),
        ],
      },
      {
        name: "Takamatsu Port",
        time: "16:45",
        lat: 34.3522,
        lng: 134.0507,
        mapX: 78,
        mapY: 51,
        note: "오후 페리로 세토내해를 다시 건너 다카마쓰에 돌아왔다.",
        photos: [
          photo("day2", 32, {
            alt: "다카마쓰 귀환 후 저녁 5",
            caption: "일본 스타벅스도 한잔. 직원분이 친절하시고 시즌 메뉴가 맛있어요.",
            layout: "portrait",
            size: "small",
            group: 2,
            objectPosition: "center",
          }),
          photo("day2", 33, {
            alt: "다카마쓰 귀환 후 저녁 6",
            caption: "첫날 눈으로만 본 다카마쓰 심볼타워에 올라갔는데, 20시 이후엔 식당을 이용해야만 전망대를 볼 수 있다고 한다. 그래서 식당 밖에서 대충 찍음. 빛 반사가 너무 잘 돼서 사진이 예쁘게 나오지는 않았다.",
            layout: "portrait",
            size: "medium",
            group: 2,
            objectPosition: "center",
          }),
          photo("day2", 34, {
            alt: "다카마쓰 귀환 후 저녁 7",
            caption: "마리오카트 전설의 시작",
            layout: "split",
            size: "medium",
            group: 3,
            objectPosition: "center",
          }),
          photo("day2", 35, {
            alt: "다카마쓰 귀환 후 저녁 8",
            caption: "결과는 외눈박이 신경준이 우승했다네요~",
            layout: "wide",
            size: "medium",
            group: 3,
            objectPosition: "center",
          }),
          photo("day3", 1, {
            alt: "숙소에서 남긴 늦은 간식 1",
            caption: "숙소에서 진짜늦은 간식. 아마 새벽 1시 넘어서 먹고 새벽 3시 넘어서 잤다.",
            layout: "split",
            size: "medium",
            group: 4,
            objectPosition: "center",
          }),
        ],
        meals: [
          {
            label: "DINNER",
            title: "다카마쓰 귀환 후 저녁",
            restaurantName: "Rojiura",
            location: "1-chome-2-20 Tokiwacho, Takamatsu, Kagawa 760-0054 일본",
            menu: [],
            review: "",
            overallReview: "사장님이 한국어를 잘 하셔서 여기서 인기 있는 메뉴를 한국어로 설명해주셨다. 실제로 우리가 시켜먹었던 우설, 안창살, 갈비는 모두 맛있었다. 마지막에 간도 시켜먹었는데 간은 그냥 순대 간 맛이랑 비슷했지만, 특유의 비린 향이 나지 않아서 괜찮았다. 혼밥하러 오는 사람도 있는 만큼, 혼자 여행하러 온 사람도 즐기고 가기 괜찮은 가게라고 생각한다.",
            insertAt: 0,
            photos: [
              photo("day2", 28, {
                alt: "다카마쓰 귀환 후 저녁 1",
                caption: "개쩌는 우설. 근데 두입 먹으면 사라져있어서 슬펐다.",
                layout: "portrait",
                size: "medium",
                group: 1,
                objectPosition: "center",
              }),
              photo("day2", 29, {
                alt: "다카마쓰 귀환 후 저녁 2",
                caption: "개쩌는 갈비. 그냥 맛있었다.",
                layout: "portrait",
                size: "medium",
                group: 1,
                objectPosition: "center",
              }),
              photo("day2", 30, {
                alt: "다카마쓰 귀환 후 저녁 3",
                caption: "개쩌는 안창살. 솔직히 나는 이게 제일 맛있었다!!",
                layout: "split",
                size: "medium",
                group: 1,
                objectPosition: "center",
              }),
              photo("day2", 31, {
                alt: "다카마쓰 귀환 후 저녁 4",
                caption: "Sexy한 화로",
                layout: "collage",
                size: "large",
                group: 2,
                objectPosition: "center",
              }),
            ],
          },
        ],
        interstitialLegs: [
          {
            insertAt: 0,
            order: 20,
            leg: { from: "Rojiura", to: "Takamatsu Station", mode: "bicycle" },
          },
          {
            insertAt: 2,
            leg: { from: "Takamatsu Station", to: "Round One Stadium Takamatsu", mode: "bicycle" },
          },
          {
            insertAt: 4,
            leg: { from: "Round One Stadium Takamatsu", to: "숙소", mode: "bicycle" },
          },
        ],
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
      title: "SHODOSHIMA TAKAGI COLLECTION",
      note: "쇼도시마에서 발견한 타카기양 관련 기록물과 발견물들을 모아 정리한 테마 섹션. \  (1000% 신경준의 사심이다)",
      photos: [
        photo("day2-takagi", 1, {
          alt: "쇼도시마 타카기양 컬렉션 1",
          caption: "어흐 예뻐",
          layout: "wide",
          size: "large",
          group: 1,
          objectPosition: "center",
        }),
        photo("day2-takagi", 2, {
          alt: "쇼도시마 타카기양 컬렉션 2",
          caption: "어흐 예쁘다22",
          layout: "portrait",
          size: "small",
          group: 1,
          objectPosition: "center",
        }),
        photo("day2-takagi", 3, {
          alt: "쇼도시마 타카기양 컬렉션 3",
          caption: "이 달력은 비매품이라 정말 아쉬웠다.",
          layout: "split",
          size: "medium",
          group: 1,
          objectPosition: "center",
        }),
        photo("day2-takagi", 4, {
          alt: "쇼도시마 타카기양 컬렉션 4",
          caption: "예쁜 껍데기 안에 들어있는 건 성게장이었다.",
          layout: "collage",
          size: "large",
          group: 2,
          objectPosition: "center",
        }),
        photo("day2-takagi", 5, {
          alt: "쇼도시마 타카기양 컬렉션 5",
          caption: "사진 OK라고 걸어두신게 정말 멋있었다.",
          layout: "portrait",
          size: "medium",
          group: 2,
          objectPosition: "center",
        }),
        photo("day2-takagi", 6, {
          alt: "쇼도시마 타카기양 컬렉션 6",
          caption: "쇼도시마에 어서와!",
          layout: "wide",
          size: "medium",
          group: 2,
          objectPosition: "center",
        }),
      ],
    }],
  },
  {
    day: 3,
    date: "2026-08-26",
    displayDate: "8.26",
    area: "Ritsurin → Kotohira → Marugame → Busshozan",
    title: "Kagawa Day",
    summary: "자전거로 리쓰린공원에 다녀온 뒤 열차로 고토히라와 마루가메를 잇고, 붓쇼잔 온천에서 하루를 마무리한 긴 이동의 기록.",
    stops: [
      {
        name: "Takamatsu Stay",
        time: "08:48",
        lat: 34.344,
        lng: 134.052,
        mapX: 78,
        mapY: 54,
        note: "숙소에서 자전거로 출발했다. 양산을 못써서 정말 죽을 뻔 했다. 날씨가 너무 더웠다.",
        photos: [
        ],
      },
      {
        name: "Ritsurin Garden",
        time: "09:08–11:26",
        lat: 34.3294,
        lng: 134.0434,
        mapX: 76,
        mapY: 58,
        note: "3일차 첫 방문지. 입장료가 있었지만 우리는 여행객 쿠폰으로 무료로 들어갈 수 있었다.",
        photos: [
          photo("day3", 2, {
            alt: "리쓰린공원의 정원과 풍경 1",
            caption: "리쓰린공원 표지판",
            layout: "wide",
            size: "large",
            group: 1,
            objectPosition: "center",
          }),
          photo("day3", 3, {
            alt: "리쓰린공원의 정원과 풍경 2",
            caption: "중간중간 힘없게 피어있는 연꽃. 얘네도 더운가보다.",
            layout: "portrait",
            size: "small",
            group: 1,
            objectPosition: "center",
          }),
          photo("day3", 4, {
            alt: "리쓰린공원의 정원과 풍경 3",
            caption: "날씨가 맑기도 하고 나무가 참 푸릇푸릇해서 물이 초록빛이다.",
            layout: "wide",
            size: "large",
            group: 1,
            objectPosition: "center",
          }),
          photo("day3", 5, {
            alt: "리쓰린공원의 정원과 풍경 4",
            caption: "밥 주는 척 했더니 허겁지겁 오는 잉어들 ㅋㅋ",
            layout: "collage",
            size: "small",
            group: 2,
            objectPosition: "center",
          }),
          photo("day3", 6, {
            alt: "리쓰린공원의 정원과 풍경 5",
            caption: "중간에 말차와 화과자를 대접해주는 공간이 있길래 가봤다. 화과자는 그냥 팥만쥬 느낌이었다. 그래도 맛있었다.",
            layout: "portrait",
            size: "large",
            group: 2,
            objectPosition: "center",
          }),
          photo("day3", 7, {
            alt: "리쓰린공원의 정원과 풍경 6",
            caption: "티켓에도 보인 나룻배 서비스랑 조그만한 돌다리. 개인적으로 이 사진이 제일 예쁘다고 생각한다.",
            layout: "wide",
            size: "full",
            group: 3,
            objectPosition: "center",
          }),
          photo("day3", 8, {
            alt: "리쓰린공원의 정원과 풍경 7",
            caption: "이건 반대 시점에서 찍은 사진. 나룻배가 지나가는 모습이 정말 예뻤다.",
            layout: "wide",
            size: "full",
            group: 4,
            objectPosition: "center",
          }),
        ],
        meals: [
          {
            label: "LUNCH",
            title: "리쓰린공원 우동",
            restaurantName: "사누끼우동 우에하라야 (Sanuki Udon Ueharaya)",
            location: "1-chome-18-8 Ritsurincho, Takamatsu, Kagawa 760-0073 일본",
            menu: [],
            review: "",
            overallReview: "멸치 육수가 돋보였던 우동집. 특이하게 면을 받으면 우리가 직접 뜨거운 물에 면을 데쳐서 국물을 부어 먹는 방식이었다. 가격도 싸고 정말 맛있었다.",
            insertAt: 7,
            photos: [
              photo("day3", 9, {
                alt: "리쓰린공원의 정원과 풍경 8",
                caption: "나는 기본적인 자루 우동에 유부 추가, 고로케 추가해서 먹었다.",
                layout: "wide",
                size: "large",
                group: 5,
                objectPosition: "center",
              }),
            ],
          },
        ],
      },
      {
        name: "Takamatsu Station",
        time: "11:59",
        lat: 34.3505,
        lng: 134.0468,
        mapX: 78,
        mapY: 52,
        note: "드디어 자전거 이동을 마치고 고토히라행 열차에 올랐다.",
        photos: [
          photo("day3", 10, {
            alt: "고토히라로 향하는 열차 1",
            caption: "고토히라행 열차. 나는 열차에서 그냥 기절했는데 민성이형은 볼 때마다 사진을 찍고 있었다. 대단한 사람이야",
            layout: "split",
            size: "large",
            group: 1,
            objectPosition: "center",
          }),
        ],
      },
      {
        name: "Kotohira",
        time: "13:05–16:12",
        lat: 34.1904,
        lng: 133.8225,
        mapX: 24,
        mapY: 88,
        note: "고토히라 일대에서 오후 세 시간을 보냈다.",
        photos: [
          photo("day3", 11, {
            alt: "고토히라의 거리와 방문지 1",
            caption: "고토히라역이 우리가 타는 노선의 종착역이었다.",
            layout: "wide",
            size: "large",
            group: 1,
            objectPosition: "center",
          }),
          photo("day3", 12, {
            alt: "고토히라의 거리와 방문지 2",
            caption: "고토히라 사케 박물관 입구. 사케 판매대에는 사케를 시음해볼 수 있는 곳이 있었는데 공짜는 아니었다. 3잔에 500엔",
            layout: "portrait",
            size: "small",
            group: 2,
            objectPosition: "center",
          }),
          photo("day3", 13, {
            alt: "고토히라의 거리와 방문지 3",
            caption: "고토히라 사케 박물관 내부",
            layout: "split",
            size: "medium",
            group: 2,
            objectPosition: "left",
          }),
          photo("day3", 14, {
            alt: "고토히라의 거리와 방문지 4",
            caption: "고토히라 사케 박물관 로고",
            layout: "collage",
            size: "small",
            group: 2,
            objectPosition: "right",
          }),
          photo("day3", 15, {
            alt: "고토히라의 거리와 방문지 5",
            caption: "사케제조과정1",
            layout: "split",
            size: "medium",
            group: 2,
            objectPosition: "center",
          }),
          photo("day3", 16, {
            alt: "고토히라의 거리와 방문지 6",
            caption: "사케제조과정2",
            layout: "portrait",
            size: "medium",
            group: 2,
            objectPosition: "center",
          }),
          photo("day3", 17, {
            alt: "고토히라의 거리와 방문지 7",
            caption: "사케제조과정3",
            layout: "split",
            size: "medium",
            group: 3,
            objectPosition: "center",
          }),
          photo("day3", 18, {
            alt: "고토히라의 거리와 방문지 8",
            caption: "사케제조과정4",
            layout: "collage",
            size: "small",
            group: 3,
            objectPosition: "center",
          }),
          photo("day3", 19, {
            alt: "고토히라의 거리와 방문지 9",
            caption: "고토히라 사케박물관 다양한 간판",
            layout: "wide",
            size: "medium",
            group: 3,
            objectPosition: "center",
          }),
          photo("day3", 20, {
            alt: "고토히라의 거리와 방문지 10",
            caption: "고토히라 거리. 일본식 건축물이 옹기종기 모여있어서 예뻤다.",
            layout: "portrait",
            size: "large",
            group: 4,
            objectPosition: "center",
          }),
          photo("day3", 21, {
            alt: "고토히라의 거리와 방문지 11",
            caption: "고토히라 우동 아이스크림. 실제로 간장을 뿌려주신 거 같았다. 개인적으로 파가 킥이었다고 생각한다.",
            layout: "portrait",
            size: "small",
            group: 4,
            objectPosition: "center",
          }),
          photo("day3", 22, {
            alt: "고토히라의 거리와 방문지 12",
            caption: "고토히라 신사 등반과정. 이때가 아마 300계단정도 올랐을 때다. 힐을 신고 여기서 내려오는 여자를 보았다. 무서운 모먼트.",
            layout: "split",
            size: "large",
            group: 4,
            objectPosition: "center",
          }),
          photo("day3", 23, {
            alt: "고토히라의 거리와 방문지 13",
            caption: "불지옥으로의 입구",
            layout: "portrait",
            size: "medium",
            group: 5,
            objectPosition: "center",
          }),
          photo("day3", 24, {
            alt: "고토히라의 거리와 방문지 14",
            caption: "고토히라 신사 안내표지판. 785계단을 오르면 본궁이 있고, 1368계단을 오르면 신사가 있다.",
            layout: "wide",
            size: "medium",
            group: 6,
            objectPosition: "center",
          }),
          photo("day3", 25, {
            alt: "고토히라의 거리와 방문지 15",
            caption: "고토히라 신사 중간쯤. 이게 한 560계단? 정도 됐던 거 같다. 여기서 참배하는 사람도 많았다.",
            layout: "split",
            size: "medium",
            group: 7,
            objectPosition: "center",
          }),
          photo("day3", 26, {
            alt: "고토히라의 거리와 방문지 16",
            caption: "고토히라 신사 본궁에서...결국 785계단에서 포기했다.",
            layout: "wide",
            size: "large",
            group: 8,
            objectPosition: "center",
          }),
          photo("day3", 27, {
            alt: "고토히라의 거리와 방문지 17",
            caption: "고토히라 신사 본궁. 여기서 1엔을 던지고 소원을 빌었다. 동인이가 소원비는 법을 알려줘서 옆에서 보고 따라했다.",
            layout: "wide",
            size: "large",
            group: 9,
            objectPosition: "center",
          }),
          photo("day3", 28, {
            alt: "마루가메 도착 후의 풍경 1",
            caption: "떠나기 전 고토히라역. 스무디 때문에 기차를 한번 놓치고 30분정도 더 기다렸다 ㅠㅠ",
            layout: "wide",
            size: "medium",
            group: 1,
            objectPosition: "center",
          }),
        ],
      },
      {
        name: "Marugame",
        time: "16:45–18:44",
        lat: 34.286,
        lng: 133.8002,
        mapX: 18,
        mapY: 68,
        note: "고토히라에서 열차로 이동해 호네츠키도리를 위해 마루가메에 방문했다.",
        photos: [


        ],
        meals: [
          {
            label: "DINNER",
            restaurantName: "호네츠키도리 잇카쿠 마루가메본점",
            time: "—",
            location: "317 Hamamachi, Marugame, Kagawa 763-0022 일본",
            menu: [],
            review: "",
            overallReview: "17시에 오픈인데 벌써 앞에서 기다리는 사람들이 많았다. 매장은 엄청 넓었지만 그럼에도 웨이팅이 있다는 건 이 식당의 인기를 체감하게 해준다. 호네츠키도리는 전반적으로 짜고 자극적인 맛이어서, 술안주로는 제격인 거 같다. 그래서 사람들이 맥주를 한가득 퍼담아서 먹는 거 같다. ",
            photos: [
              photo("day3", 30, {
                alt: "마루가메 호네츠키도리 식사 1",
                caption: "호네츠키도리 얘는 영계 - 부드럽지만 개인적으로 나는 한국 치킨 닭다리 양념 간 강한 버전에 그친다고 생각했다.",
                layout: "wide",
                size: "large",
                group: 1,
                objectPosition: "center",
              }),
              photo("day3", 32, {
                alt: "마루가메 호네츠키도리 식사 3",
                caption: "호네츠키도리 얘는 노계 - 질겨서 먹기엔 힘들었지만. 그 맛의 깊이가 좀 더 있었다고 생각한다. ",
                layout: "wide",
                size: "large",
                group: 2,
                objectPosition: "center",
              }),
              photo("day3", 31, {
                alt: "마루가메 호네츠키도리 식사 2",
                caption: "아마도 이게 우리의 마지막 단체사진..여행의 끝이 다가온다는 거겠지..",
                layout: "portrait",
                size: "medium",
                group: 3,
                objectPosition: "center",
              }),

            ],
          },
        ],
      },
      {
        name: "Takamatsu",
        time: "19:24–19:46",
        lat: 34.3505,
        lng: 134.0468,
        mapX: 78,
        mapY: 52,
        note: "마루가메를 뒤로한 채 다카마쓰로 떠난다",
        photos: [
          photo("day3", 33, {
            alt: "다카마쓰 환승 구간 1",
            caption: "사실 저건 반대편으로 가는 기차다.",
            layout: "wide",
            size: "full",
            group: 1,
            objectPosition: "center",
          }),
        ],
      },
      {
        name: "Busshozan Onsen",
        time: "20:12–21:43",
        lat: 34.2805,
        lng: 134.0431,
        mapX: 70,
        mapY: 72,
        note: "붓쇼잔 온천에서 길었던 하루의 마지막 시간을 보냈다.",
        photos: [
          photo("day3", 34, {
            alt: "붓쇼잔역과 온천 뒤 기록 1",
            caption: "붓쇼잔역 야돈 표지판. 이번 여행의 마지막 역이 되었다.",
            layout: "portrait",
            size: "medium",
            group: 1,
            objectPosition: "center",
          }),
          photo("day3", 35, {
            alt: "붓쇼잔역과 온천 뒤 기록 2",
            caption: "붓쇼잔 온천에서 뽑아먹은 우유. 시중에 파는 건지는 모르겠지만 맛있었다. 커피우유도 맛있다고 한다.",
            layout: "portrait",
            size: "medium",
            group: 1,
            objectPosition: "center",
          }),
        ],
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
    summary: "여행 마지막 날은 쇼핑에 집중했다. 각자 원하는 바가 달랐기에 동인/승원/민성, 경준 이렇게 나눠서 자유 쇼핑 시간을 가졌다. 각자 다카마쓰 시내를 둘러본 뒤 버스 시간에 맞춰 다같이 유메타운으로 이동해 스시로에서 점심을 먹고 마지막 쇼핑을 마친 뒤 공항버스로 다카마쓰공항으로 향했다.",
    stops: [
      {
        name: "Takamatsu City Shopping",
        time: "—",
        lat: 34.3428,
        lng: 134.0466,
        mapX: 78,
        mapY: 54,
        mapEmphasis: "primary",
        note: "마지막 날의 사진들은 경준/민성의 시점에 맞춰져 있다. 이걸 보고 있는 동인/승원 중에서 추가하고 싶은 사진이 있다면 경준씨에게 연락해주길 바란다. ",
        photos: [
          photo("day4", 1, {
            alt: "다카마쓰 시내의 마지막 날 쇼핑 1",
            caption: "마루가메마치그린 3층 레코드 음반 샵. 다양한 음반들을 볼 수 있었다.",
            layout: "wide",
            size: "large",
            group: 1,
            objectPosition: "center",
          }),
          photo("day4", 2, {
            alt: "다카마쓰 시내의 마지막 날 쇼핑 2",
            caption: "처음 봤을땐 큐스토인줄 알았는데 아니었다. 아무튼 일본은 이런 카와이 컨셉이 잘 먹히는 듯?",
            layout: "portrait",
            size: "small",
            group: 2,
            objectPosition: "center",
          }),
          photo("day4", 3, {
            alt: "다카마쓰 시내의 마지막 날 쇼핑 3",
            caption: "이상한 구루구루 노래 큐스토 앨범이다. 노래가 좋은지는 모르겠는데 귀엽긴 해..",
            layout: "collage",
            size: "small",
            group: 2,
            objectPosition: "center",
          }),
          photo("day4", 4, {
            alt: "다카마쓰 시내의 마지막 날 쇼핑 4",
            caption: "JPOP 국밥라인 요루시카",
            layout: "split",
            size: "large",
            group: 3,
            objectPosition: "center",
          }),
          photo("day4", 5, {
            alt: "다카마쓰 시내의 마지막 날 쇼핑 5",
            caption: "JPOP의 신 요네즈켄시",
            layout: "split",
            size: "large",
            group: 3,
            objectPosition: "center",
          }),

          photo("day4", 10, {
            alt: "다카마쓰 시내의 마지막 날 쇼핑 10",
            caption: "민성이형이랑 같이 간 포켓몬카드샵. 나는 카드 가격을 보고 경악했다.",
            layout: "portrait",
            size: "medium",
            group: 4,
            objectPosition: "center",
          }),
          photo("day4", 11, {
            alt: "다카마쓰 시내의 마지막 날 쇼핑 11",
            caption: "뚱카츄.. 자기 취향인 카드가 몇십만원대의 가격이라면 정말 마음이 아플 거 같다. ",
            layout: "portrait",
            size: "medium",
            group: 4,
            objectPosition: "center",
          }),
          photo("day4", 12, {
            alt: "다카마쓰 시내의 마지막 날 쇼핑 12",
            caption: "카드 가챠인 거 같은데 1회에 10000엔이다. 액수부터 차원이달라",
            layout: "portrait",
            size: "medium",
            group: 4,
            objectPosition: "center",
          }),
          photo("day4", 13, {
            alt: "다카마쓰 시내의 마지막 날 쇼핑 13",
            caption: "시내를 떠나기 전 허겁지겁 찾아온 커피집. 현금만 받는다는 걸 모르고 있던 민성/경준은 겨우 수중에 있는 1000엔씩 모아서 지불했다. 하마터면 접시닦을 뻔~~",
            layout: "split",
            size: "large",
            group: 5,
            objectPosition: "center",
          }),
          photo("day4", 14, {
            alt: "다카마쓰 시내의 마지막 날 쇼핑 14",
            caption: "잘 가라고 맞이해주는 돌고래 표지판. 정말 다카마쓰 시내에서 작별이다.",
            layout: "portrait",
            size: "medium",
            group: 6,
            objectPosition: "center",
          }),
        ],
      },
      {
        name: "Yume Town Takamatsu",
        time: "—",
        lat: 34.3167,
        lng: 134.0425,
        mapX: 73,
        mapY: 63,
        mapEmphasis: "primary",
        note: "시내 쇼핑을 마친 뒤 유메타운으로 이동해 여행을 마무리하는 시간을 보냈다.",
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
        meals: [
          {
            label: "LUNCH",
            restaurantName: "Sushiro",
            time: "—",
            location: "608-1 Sanjocho, Takamatsu, Kagawa 761-8072 일본",
            menu: [],
            review: "",
            overallReview: "민성이형이 생 오징어 타격을 맞고 제대로 즐기지 못했던 다소 찝찝한 식사. 가격은 나름 싼 거 같긴 한데.. 역시 퀄리티를 기대할 순 없었다 ㅠㅠ",
            photos: [
              photo("day4", 15, {
                alt: "유메타운 다카마쓰 스시로 점심 1",
                caption: "일본식 계란찜. 부드럽고 맛있다.",
                layout: "collage",
                size: "medium",
                group: 1,
                objectPosition: "center",
              }),
              photo("day4", 16, {
                alt: "유메타운 다카마쓰 스시로 점심 2",
                caption: "뭐였더라..참지인가? 사실 스시 구분은 아직도 어렵다.",
                layout: "portrait",
                size: "small",
                group: 1,
                objectPosition: "center",
              }),
              photo("day4", 17, {
                alt: "유메타운 다카마쓰 스시로 점심 3",
                caption: "동인이가 먹길래 따라먹은 연어알 초밥",
                layout: "split",
                size: "medium",
                group: 2,
                objectPosition: "center",
              }),
              photo("day4", 18, {
                alt: "유메타운 다카마쓰 스시로 점심 4",
                caption: "100엔에 간편하게 팔고 있는 오렌지 쥬스",
                layout: "collage",
                size: "xs",
                group: 2,
                objectPosition: "center",
              }),
            ],
          },
        ],
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
        photos: [
          photo("day4", 19, {
            alt: "유메타운에서 마친 마지막 쇼핑 1",
            caption: "유니클로에서 파는 유희왕 티셔츠",
            layout: "portrait",
            size: "medium",
            group: 1,
            objectPosition: "center",
          }),
          photo("day4", 20, {
            alt: "유메타운에서 마친 마지막 쇼핑 2",
            caption: "유니클로에서 파는 '스쿠나한테 선빵을 치는 범부' 티셔츠 ",
            layout: "portrait",
            size: "medium",
            group: 1,
            objectPosition: "center",
          }),
        ],
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
        photos: [
          photo("day4", 21, {
            alt: "다카마쓰공항과 귀국편 1",
            caption: "비행기에서 바라본 다카마쓰 공항의 마지막 모습",
            layout: "wide",
            size: "large",
            group: 1,
            objectPosition: "center",
          }),
          photo("day4", 22, {
            alt: "다카마쓰공항과 귀국편 2",
            caption: "잘있어 정말 그리울거야",
            layout: "wide",
            size: "full",
            group: 2,
            objectPosition: "center",
          }),
          photo("day4", 23, {
            alt: "다카마쓰공항과 귀국편 3",
            caption: "점점 멀어져 간다..",
            layout: "split",
            size: "full",
            group: 1,
            objectPosition: "center",
          }),
          photo("day4", 24, {
            alt: "다카마쓰공항과 귀국편 4",
            caption: "하늘에서 바라보는 세토내해는 정말 아름답구만",
            layout: "collage",
            size: "full",
            group: 2,
            objectPosition: "center",
          }),
        ],
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
  photos: [
    photo("yadon", 1, {
      alt: "카가와 곳곳의 야돈 컬렉션 1",
      caption: "야돈 자판기",
      layout: "portrait",
      size: "medium",
      group: 1,
      objectPosition: "center",
    }),
    photo("yadon", 2, {
      alt: "카가와 곳곳의 야돈 컬렉션 2",
      caption: "페리에서 편하게 쉬는 야돈",
      layout: "collage",
      size: "medium",
      group: 1,
      objectPosition: "center",
    }),
    photo("yadon", 3, {
      alt: "카가와 곳곳의 야돈 컬렉션 3",
      caption: "페리 바깥 테이블/의자",
      layout: "split",
      size: "medium",
      group: 1,
      objectPosition: "center",
    }),
    photo("yadon", 4, {
      alt: "카가와 곳곳의 야돈 컬렉션 4",
      caption: "야돈 스티커사진. 이거 찍다가 페리 놓칠뻔함",
      layout: "panoramic",
      size: "large",
      group: 2,
      objectPosition: "center",
    }),
    photo("yadon", 5, {
      alt: "카가와 곳곳의 야돈 컬렉션 5",
      caption: "포켓몬센터 카가와",
      layout: "portrait",
      size: "large",
      group: 3,
      objectPosition: "center",
    }),
    photo("yadon", 6, {
      alt: "카가와 곳곳의 야돈 컬렉션 6",
      caption: "포켓몬센터 잠자는 야돈",
      layout: "portrait",
      size: "medium",
      group: 2,
      objectPosition: "center",
    }),
    photo("yadon", 7, {
      alt: "카가와 곳곳의 야돈 컬렉션 7",
      caption: "엎드려있는 야돈",
      layout: "collage",
      size: "large",
      group: 3,
      objectPosition: "center",
    }),
    photo("yadon", 8, {
      alt: "카가와 곳곳의 야돈 컬렉션 8",
      caption: "누워 있는 야돈",
      layout: "collage",
      size: "large",
      group: 3,
      objectPosition: "center",
    }),
    photo("yadon", 9, {
      alt: "카가와 곳곳의 야돈 컬렉션 9",
      caption: "야돈 포스터",
      layout: "collage",
      size: "medium",
      group: 3,
      objectPosition: "center",
    }),
    photo("yadon", 10, {
      alt: "카가와 곳곳의 야돈 컬렉션 10",
      caption: "다카마쓰 야돈 맨홀",
      layout: "portrait",
      size: "large",
      group: 4,
      objectPosition: "center",
    }),
    photo("yadon", 11, {
      alt: "카가와 곳곳의 야돈 컬렉션 11",
      caption: "마루가메 야돈 맨홀",
      layout: "split",
      size: "large",
      group: 4,
      objectPosition: "center",
    }),
    photo("yadon", 12, {
      alt: "카가와 곳곳의 야돈 컬렉션 12",
      caption: "야돈 굿즈",
      layout: "collage",
      size: "medium",
      group: 4,
      objectPosition: "center",
    }),
    photo("yadon", 13, {
      alt: "카가와 곳곳의 야돈 컬렉션 13",
      caption: "야돈 포스터",
      layout: "wide",
      size: "large",
      group: 5,
      objectPosition: "center",
    }),
    photo("yadon", 14, {
      alt: "카가와 곳곳의 야돈 컬렉션 14",
      caption: "공항에서 마지막으로 본 야돈",
      layout: "portrait",
      size: "medium",
      group: 6,
      objectPosition: "center",
    }),
  ],
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
  { value: "121", label: "Photos" },
  { value: "—", label: "Kilometres" },
] as const;