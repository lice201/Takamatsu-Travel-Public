import { ScrollEffects } from "../ScrollEffects";
import { withBasePath } from "../site-paths";

export const dynamic = "force-static";

const days = [
  {
    date: "8.24",
    weekday: "MON",
    title: "다카마쓰에 스며드는 저녁",
    theme: "도착 · 시내 산책",
    color: "coral",
    items: [
      ["16:15", "다카마쓰 공항 도착", "입국 수속 후 1층 관광안내소로 이동"],
      ["16:45", "우동 여권 받기", "여권을 보여주고 ‘우동현 오모테나시 패스포트’ 문의 · 재고 확인"],
      ["17:10", "공항 리무진 → 다카마쓰역", "쿠폰북의 왕복 승차권을 첫날부터 활용"],
      ["18:20", "체크인 & 기타하마 산책", "붉은 등대와 세토내해의 늦여름 노을"],
      ["19:30", "효고마치·마루가메마치", "상점가에서 사누키 우동과 호네츠키도리"],
    ],
    photos: [
      { image: "/kitahama.jpg", alt: "다카마쓰 기타하마 앨리의 창고 카페 거리", caption: "기타하마 앨리 · 창고 카페", map: "https://www.google.com/maps/search/?api=1&query=Kitahama+Alley+Takamatsu" },
      { image: "/sunport.jpg", alt: "항구와 건물이 보이는 선포트 다카마쓰", caption: "선포트 · 항구 노을", map: "https://www.google.com/maps/search/?api=1&query=Sunport+Takamatsu" },
    ],
  },
  {
    date: "8.25",
    weekday: "TUE",
    title: "정원과 곤피라, 부채의 하루",
    theme: "리쓰린 · 고토히라 · 마루가메",
    color: "green",
    items: [
      ["06:30", "리쓰린 공원 (이른 아침)", "폭염을 피해 남정·핵심 경관만 90~100분 · 입장권 쿠폰 사용 · 완주는 하지 않아요"],
      ["08:40", "고토덴으로 고토히라 이동", "리쓰린코엔역 → 고토덴고토히라역 직통 약 50~60분 · 전후 대체 열차도 함께 확인"],
      ["10:00", "고토히라 평지 관광", "오모테산도 하단·긴료 사케 박물관·가나마루자(선택)·우동 점심 · 본궁 785계단은 오르지 않아요"],
      ["13:20", "JR로 마루가메 이동", "JR 고토히라역 → JR 마루가메역 약 25~28분 · 14시 전후 도착"],
      ["14:20", "우치와 부채 만들기 체험", "마루가메 대표 체험 · 부채 만들기 60~90분 · 사전예약 필수(전날 15:30까지)"],
      ["15:45", "마루가메성 아래쪽", "해자·성문·높은 석벽·포토존 40~60분 · 가파른 천수 등반은 하지 않아요"],
      ["17:30", "호네츠키도리 저녁", "마루가메 향토음식(와카도리 우선) · 잇카쿠는 화요일 정기휴무이니 8.25(화)에는 화요일 영업 매장을 미리 확인하세요"],
      ["19:00", "다카마쓰 복귀", "JR 마루가메역 → JR 다카마쓰역 · 너무 늦지 않은 열차로"],
    ],
    photos: [
      { image: "/ritsurin.jpg", alt: "연못과 소나무가 어우러진 리쓰린 공원", caption: "리쓰린 공원 · 이른 아침", map: "https://www.google.com/maps/search/?api=1&query=Ritsurin+Garden+Takamatsu" },
      { image: "/kotohira-konpira.jpg", alt: "고토히라 곤피라궁 주변의 전통 건물", caption: "고토히라 · 오모테산도", map: "https://www.google.com/maps/search/?api=1&query=Kotohira+Omotesando" },
      { image: "/marugame-castle.jpg", alt: "마루가메성의 높은 석벽과 성곽", caption: "마루가메성 · 석벽", map: "https://www.google.com/maps/search/?api=1&query=Marugame+Castle" },
    ],
  },
  {
    date: "8.26",
    weekday: "WED",
    title: "흰 벽과 미술관의 하루",
    theme: "구라시키 · 미관지구",
    color: "blue",
    items: [
      ["07:30", "다카마쓰역 출발", "마린라이너로 오카야마 환승 · 출발/복귀 각각 열차 2편 이상 미리 확인"],
      ["08:40", "구라시키역 도착", "오카야마역 환승 후 구라시키까지 약 17분"],
      ["09:00", "미관지구 산책", "흰 벽과 수로의 야외 거리 · 폭염을 피해 오전에 배치"],
      ["11:30", "미관지구 점심", "주 후보 + 대체 후보 · 정기휴무·웨이팅 확인"],
      ["12:30", "오하라미술관", "한낮 더위를 피하는 실내 핵심 · 8월은 무휴로 수요일에도 개관"],
      ["15:00", "아이비 스퀘어", "붉은 벽돌과 담쟁이 · 늦은 오후 실내·그늘 위주"],
      ["16:30", "다카마쓰 복귀", "구라시키 → 오카야마 환승 → 다카마쓰 · 세토대교 강풍 시 운행 확인"],
    ],
    photos: [
      { image: "/bikan.jpg", alt: "흰 벽 건물과 수로가 어우러진 구라시키 미관지구", caption: "구라시키 미관지구", map: "https://www.google.com/maps/search/?api=1&query=Kurashiki+Bikan+Historical+Quarter" },
      { image: "/ohara-museum.jpg", alt: "구라시키 오하라미술관 본관", caption: "오하라미술관", map: "https://www.google.com/maps/search/?api=1&query=Ohara+Museum+of+Art+Kurashiki" },
      { image: "/ivy-square.jpg", alt: "붉은 벽돌과 담쟁이의 구라시키 아이비 스퀘어", caption: "아이비 스퀘어", map: "https://www.google.com/maps/search/?api=1&query=Kurashiki+Ivy+Square" },
    ],
    detail: {
      badge: "구라시키 확정 · 열차 시각은 여행 직전 재확인",
      cards: [
        { tag: "실내 핵심", name: "오하라미술관", desc: "일본 최초의 서양미술 사설 미술관. 한낮 폭염을 피하는 이 날의 중심입니다. 통상 월요일 휴관이지만 8월은 무휴라 8.26(수)에도 문을 엽니다.", facts: [["운영", "09:00–17:00 (입장 16:30)"], ["요금", "성인 ¥2,000 · 학생 ¥500"]], link: "https://www.ohara.or.jp/visitor_info/", linkText: "오하라미술관 공식" },
        { tag: "오전 야외", name: "미관지구", desc: "흰 벽 창고와 버드나무 수로가 이어지는 에도시대 거리. 평지 중심이라 걷기 편하지만 그늘이 적어 오전에 걷고 한낮엔 실내로 옮기는 편이 좋아요.", facts: [["접근", "구라시키역 도보 약 15분"], ["특징", "야외·평지 · 폭염 시 시간 축소"]], link: "https://www.kurashiki-tabi.jp/", linkText: "구라시키 관광 공식" },
        { tag: "늦은 오후", name: "아이비 스퀘어", desc: "붉은 벽돌 방직공장을 개조한 담쟁이 명소. 상점·카페·공방이 모여 있어 실내·그늘 위주로 하루를 마무리하기 좋습니다.", facts: [["접근", "구라시키역 도보 약 15분"], ["대체", "상점가·카페 중 택1"]], link: "https://www.ivysquare.co.jp/access/", linkText: "아이비 스퀘어 공식" },
      ],
      caution: [
        { b: "세토대교 강풍·태풍", t: "마린라이너·특급은 세토대교를 건너 강풍·태풍 시 지연·운휴합니다. 출발 전 JR 운행 정보를 확인하고, 위험하면 출발하지 않습니다." },
        { b: "페리 쿠폰 사용 불가", t: "구라시키는 철도 왕복이라 페리 쿠폰을 쓰지 않습니다. 대신 JR 왕복 철도비 + 오하라미술관 입장료가 추가됩니다." },
        { b: "다른 쿠폰은 그대로", t: "공항 리무진 왕복과 리쓰린공원 입장 쿠폰은 다른 날 그대로 사용할 수 있어요." },
      ],
      tags: ["평지 중심", "실내 휴식", "계단 없음", "역사도시", "세토대교 강풍 주의"],
      sources: [["https://www.jr-shikoku.co.jp/", "JR 시코쿠 운행 정보"], ["https://www.jr-odekake.net/railroad/train/marineliner/", "마린라이너(JR 서일본)"], ["https://www.westjr.co.jp/global/kr/", "JR-WEST 한국어"]],
    },
  },
  {
    date: "8.27",
    weekday: "THU",
    title: "바다 성에서 공항까지",
    theme: "다마모 · 귀국",
    color: "yellow",
    items: [
      ["08:30", "다마모 공원", "바닷물이 드나드는 다카마쓰성 해자 산책"],
      ["10:30", "마지막 우동 순례", "붓카케 또는 가마타마로 여행의 마침표"],
      ["12:00", "상점가 옷 쇼핑 & 기념품", "마루가메마치 그린에서 옷을 보고 와산본·우동 선물 구매"],
      ["14:20", "공항 리무진 탑승", "쿠폰 왕복권 사용 · 출발 2시간 전 도착"],
      ["17:15", "LJ360 출발", "18:55 인천국제공항 도착"],
    ],
    photos: [
      { image: "/tamamo.jpg", alt: "해자와 다리가 보이는 다마모 공원", caption: "다마모 공원 · 귀국일 아침", map: "https://www.google.com/maps/search/?api=1&query=Tamamo+Park+Takamatsu" },
      { image: "/food-udon.jpg", alt: "쫄깃한 면과 국물이 담긴 사누키 우동", caption: "마지막 우동 순례", map: "https://www.google.com/maps/search/?api=1&query=Sanuki+Udon+Takamatsu" },
    ],
  },
];

const couponSteps = [
  ["01", "도착 즉시 확인", "다카마쓰 공항 안내 데스크에서 캠페인 대상·수령 방법을 확인하세요."],
  ["02", "교통부터 절약", "공항 리무진 왕복권을 활성화해 첫날과 마지막 날에 사용하세요."],
  ["03", "무료 혜택 배치", "리쓰린 공원 입장권은 2일차 아침에 사용하세요. 3일차 구라시키는 철도로 다녀와 페리권을 쓰지 않습니다."],
];

const foods = [
  {
    name: "사누키 우동",
    jp: "讃岐うどん",
    image: "/food-udon.jpg",
    alt: "쫄깃한 면과 국물이 담긴 사누키 우동",
    map: "https://www.google.com/maps/search/?api=1&query=Sanuki+Udon+Takamatsu",
    moment: "DAY 1 저녁 · DAY 2 아침 · DAY 4 점심",
    taste: "탄력 있는 굵은 면이 주인공. 붓카케는 진한 소스를 부어 먹고, 가마타마는 갓 삶은 면에 달걀을 섞어 고소하게 즐겨요.",
    order: "주문: 小(소) 한 그릇부터 · 튀김은 셀프",
    price: "약 ¥400–800",
  },
  {
    name: "호네츠키도리",
    jp: "骨付鳥",
    image: "/food-chicken.jpg",
    alt: "향신료를 발라 구운 카가와식 뼈 붙은 닭고기",
    map: "https://www.google.com/maps/search/?api=1&query=Honetsukidori+Marugame",
    moment: "DAY 1 저녁 · DAY 2 저녁(마루가메)",
    taste: "통닭 다리에 마늘과 후추를 강하게 입혀 구운 카가와 대표 향토음식입니다. 부드러운 ‘와카도리(히나도리)’를 우선 추천하고, 씹는 맛과 진한 풍미의 ‘오야도리’는 호불호가 있어요. 주먹밥·양배추를 곁들이면 좋습니다.",
    order: "첫 도전은 와카도리 · 잇카쿠는 화요일 정기휴무라 8.25(화)에는 화요일 영업 매장 사전 확인",
    price: "약 ¥1,000–1,500",
  },
  {
    name: "냉소면·여름 면요리",
    jp: "冷やしそうめん",
    image: "/food-somen.jpg",
    alt: "차갑게 식혀 육수에 찍어 먹는 일본 소면",
    map: "https://www.google.com/maps/search/?api=1&query=Kurashiki+Bikan+Lunch",
    moment: "DAY 3 점심 · 구라시키",
    taste: "가늘고 탄력 있는 면을 차가운 쯔유에 찍어 먹는 여름 별미입니다. 폭염 속 미관지구 야외 산책 뒤 시원하게 한 그릇 즐기기 좋아요.",
    order: "미관지구 인근 식당 · 정기휴무·웨이팅 확인",
    price: "약 ¥700–1,200",
  },
  {
    name: "올리브 소고기",
    jp: "オリーブ牛",
    image: "/food-beef.jpg",
    alt: "마블링이 보이는 일본 와규 고기",
    map: "https://www.google.com/maps/search/?api=1&query=Olive+Beef+Takamatsu",
    moment: "선택 저녁 · 여유가 있는 날 (DAY 2 저녁 메인은 호네츠키도리)",
    taste: "올리브 부산물을 섞은 사료로 키운 카가와의 브랜드 와규입니다. 스테이크나 야키니쿠로 주문하면 고소한 지방과 부드러운 육질을 느끼기 좋아요.",
    order: "메뉴에서 ‘オリーブ牛’ 표기 확인",
    price: "약 ¥2,500–6,000",
    note: "사진은 와규의 이해를 돕는 참고 이미지",
  },
  {
    name: "와산본",
    jp: "和三盆",
    image: "/food-wasanbon.jpg",
    alt: "꽃과 잎 모양으로 빚은 일본 전통 와산본 과자",
    map: "https://www.google.com/maps/search/?api=1&query=Wasanbon+Takamatsu",
    moment: "DAY 4 쇼핑 · 선물",
    taste: "카가와와 도쿠시마에서 전통 방식으로 만드는 고운 설탕입니다. 입안에서 사르르 녹는 작은 건과자와 양갱, 카스텔라로 만나볼 수 있어요.",
    order: "상점가·공항에서 작은 상자 선물용 구매",
    price: "약 ¥600–1,500",
  },
];

const fashionSpots = [
  {
    num: "01",
    name: "마루가메마치 그린",
    jp: "丸亀町グリーン",
    label: "가장 추천",
    tone: "green",
    map: "https://www.google.com/maps/search/?api=1&query=Marugamemachi+Green+Takamatsu",
    official: "https://mgreen.jp/shop-cat/fashion/",
    image: "/shop-green.jpg",
    alt: "마루가메마치 그린 쇼핑 시설 외관",
    access: "숙소에서 도보 약 12분",
    hours: "숍 11:00–20:00",
    description: "다카마쓰 중심가에서 일본 브랜드를 비교하기 가장 편한 곳이에요. 상점가 산책과 식사까지 한 동선으로 이어져 여행 마지막 날에 넣기 좋습니다.",
    brands: ["URBAN RESEARCH DOORS", "Onitsuka Tiger", "THE NORTH FACE", "MARGARET HOWELL", "green label relaxing"],
    fit: "깔끔한 일본 캐주얼 · 신발 · 아웃도어",
  },
  {
    num: "02",
    name: "가와라마치 FLAG",
    jp: "瓦町FLAG",
    label: "역과 바로 연결",
    tone: "blue",
    map: "https://www.google.com/maps/search/?api=1&query=Kawaramachi+FLAG+Takamatsu",
    official: "https://www.k-flag.jp/shop/",
    image: "/shop-flag.jpg",
    alt: "가와라마치 FLAG 쇼핑몰 외관",
    access: "고토덴 가와라마치역 직결",
    hours: "1–5층 10:00–20:00",
    description: "비가 오거나 한낮이 더울 때 특히 편한 역 연결 쇼핑몰입니다. 1–2층 패션 구역에서 남녀 캐주얼과 잡화를 빠르게 둘러볼 수 있어요.",
    brands: ["BEAMS", "Ray BEAMS", "BEAMS BOY", "ABC-MART", "패션·잡화 1–2F"],
    fit: "일본 셀렉트숍 · 데일리 캐주얼",
  },
  {
    num: "03",
    name: "다카마쓰 미쓰코시",
    jp: "高松三越",
    label: "백화점 쇼핑",
    tone: "coral",
    map: "https://www.google.com/maps/search/?api=1&query=Takamatsu+Mitsukoshi",
    official: "https://www.mitsukoshi.mistore.jp/takamatsu.html",
    image: "/shop-mitsukoshi.jpg",
    alt: "다카마쓰 미쓰코시 백화점 외관",
    access: "숙소에서 도보 약 5분",
    hours: "10:00–19:00",
    description: "숙소와 가장 가까운 백화점으로, 조금 더 차분한 의류와 잡화·명품을 찾을 때 좋아요. 지하 식품관과 선물 쇼핑도 함께 해결할 수 있습니다.",
    brands: ["여성·남성 패션", "Brooks Brothers", "Gucci", "Tiffany & Co.", "백화점 식품관"],
    fit: "프리미엄 · 단정한 옷 · 선물",
  },
  {
    num: "04",
    name: "유메타운 다카마쓰",
    jp: "ゆめタウン高松",
    label: "브랜드를 한 번에",
    tone: "yellow",
    map: "https://www.google.com/maps/search/?api=1&query=YouMe+Town+Takamatsu",
    official: "https://www.izumi.jp/tenpo/takamatsu/shop",
    image: "/shop-youme.jpg",
    alt: "유메타운 다카마쓰 대형 쇼핑몰 외관",
    access: "시내에서 버스 또는 고토덴+도보",
    hours: "매장별 영업시간 확인",
    description: "시간을 넉넉히 잡고 대중적인 브랜드를 한 번에 비교하고 싶을 때 좋은 대형 쇼핑몰입니다. 일정이 빡빡하다면 시내 세 곳을 우선하세요.",
    brands: ["UNIQLO", "GLOBAL WORK", "niko and ...", "LOWRYS FARM", "WEGO", "L.L.Bean"],
    fit: "가성비 · 캐주얼 · 가족 쇼핑",
  },
];

const dayRoutes = [
  {
    day: "DAY 1 · 8.24 (월)",
    color: "coral",
    title: "공항 → 시내",
    mode: "공항 리무진 + 도보",
    time: "약 40~60분",
    transfer: "리무진 1회",
    stops: ["다카마쓰 공항", "다카마쓰역", "카타하라마치(숙소)", "중앙상점가"],
    links: [{ label: "공항→시내 길찾기", url: "https://www.google.com/maps/dir/?api=1&origin=Takamatsu+Airport&destination=Takamatsu+Marugamemachi+Shopping+Street&waypoints=Takamatsu+Station%7CKataharamachi+Station+Takamatsu&travelmode=transit" }],
  },
  {
    day: "DAY 2 · 8.25 (화)",
    color: "green",
    title: "리쓰린 → 고토히라 → 마루가메",
    mode: "고토덴·JR + 도보",
    time: "이동 합계 약 2시간",
    transfer: "구간별 분할 · 환승 확인",
    stops: ["리쓰린공원", "고토덴 고토히라", "고토히라 평지 도보", "JR 마루가메", "우치와 박물관·마루가메성", "호네츠키도리"],
    links: [
      { label: "① 리쓰린 → 고토히라 (고토덴 transit)", url: "https://www.google.com/maps/dir/?api=1&origin=Ritsurin+Garden+Takamatsu&destination=Kotoden+Kotohira+Station&waypoints=Ritsurin-Koen+Station+Takamatsu&travelmode=transit" },
      { label: "② 고토히라 평지 도보 (walking)", url: "https://www.google.com/maps/dir/?api=1&origin=Kotoden+Kotohira+Station&destination=JR+Kotohira+Station&waypoints=Kinryo+Sake+Museum+Kotohira%7CKanamaruza+Kotohira&travelmode=walking" },
      { label: "③ 고토히라 → 마루가메 (JR transit)", url: "https://www.google.com/maps/dir/?api=1&origin=JR+Kotohira+Station&destination=JR+Marugame+Station&travelmode=transit" },
      { label: "④ 마루가메 시내 도보 (walking)", url: "https://www.google.com/maps/dir/?api=1&origin=JR+Marugame+Station&destination=JR+Marugame+Station&waypoints=Marugame+Uchiwa+Museum%7CMarugame+Castle%7CHonetsukidori+Marugame&travelmode=walking" },
    ],
  },
  {
    day: "DAY 3 · 8.26 (수)",
    color: "blue",
    title: "구라시키 당일치기",
    mode: "JR 마린라이너 + 도보",
    time: "편도 약 70~80분",
    transfer: "오카야마역 환승 (왕복)",
    stops: ["다카마쓰역", "오카야마 환승", "구라시키역", "미관지구", "오하라미술관", "아이비 스퀘어"],
    links: [{ label: "구라시키 왕복 길찾기 (transit)", url: "https://www.google.com/maps/dir/?api=1&origin=Takamatsu+Station&destination=Takamatsu+Station&waypoints=Okayama+Station%7CKurashiki+Station%7CKurashiki+Bikan+Historical+Quarter%7COhara+Museum+of+Art%7CKurashiki+Ivy+Square%7COkayama+Station&travelmode=transit" }],
  },
  {
    day: "DAY 4 · 8.27 (목)",
    color: "yellow",
    title: "다마모 → 공항",
    mode: "도보 + 공항 리무진",
    time: "약 50~70분",
    transfer: "리무진 1회",
    stops: ["다마모 공원", "중앙상점가(쇼핑)", "다카마쓰역", "다카마쓰 공항"],
    links: [{ label: "시내→공항 길찾기", url: "https://www.google.com/maps/dir/?api=1&origin=Tamamo+Park+Takamatsu&destination=Takamatsu+Airport&waypoints=Takamatsu+Marugamemachi+Shopping+Street%7CTakamatsu+Station&travelmode=transit" }],
  },
];

const mapSpots = [
  { n: "★", name: "우리 숙소", note: "카타하라마치역 도보 1분", left: 52.48, top: 39.57, q: "Kataharamachi+Station+Takamatsu", star: true },
  { n: "1", name: "다카마쓰항", note: "세토내해 출발점", left: 36.4, top: 26.78, q: "Takamatsu+Port" },
  { n: "2", name: "선포트", note: "노을·항구 야경", left: 47.93, top: 32.3, q: "Sunport+Takamatsu" },
  { n: "3", name: "기타하마 앨리", note: "창고 카페 거리 · 도보 약 8분", left: 59.15, top: 37.15, q: "Kitahama+Alley+Takamatsu" },
  { n: "4", name: "다마모 공원", note: "바다와 맞닿은 성터 · 도보 약 10분", left: 57.03, top: 44.42, q: "Tamamo+Park+Takamatsu" },
  { n: "5", name: "중앙상점가", note: "우동·쇼핑·저녁 · 도보 약 8분", left: 48.54, top: 52.14, q: "Takamatsu+Marugamemachi+Shopping+Street" },
  { n: "6", name: "리쓰린 공원", note: "고토덴 약 10분", left: 31.24, top: 89.62, q: "Ritsurin+Garden+Takamatsu" },
];

const stampMapSpots = [
  { n: "1", name: "다카마쓰 공항", note: "DAY 1 도착 · DAY 4 출발", left: 69.99, top: 56.99, q: "Takamatsu+Airport" },
  { n: "2", name: "선포트·심볼타워", note: "다카마쓰역 앞 · 시내 도보권", left: 79.49, top: 8.17, q: "Sunport+Takamatsu+Symbol+Tower" },
  { n: "3", name: "리쓰린 공원", note: "DAY 2 아침 동선", left: 77.93, top: 17.13, q: "Ritsurin+Garden+Takamatsu" },
  { n: "4", name: "고토히라", note: "DAY 2 평지 관광 동선", left: 15.95, top: 68.16, q: "Kotohira+Station" },
];

function DayRoutes() {
  return (
    <section className="routes-section" id="routes">
      <div className="routes-heading reveal">
        <div>
          <p className="eyebrow">DAY-BY-DAY ROUTES · GOOGLE MAPS</p>
          <h2>날짜별 동선을<br /><em>지도에서 한 번에.</em></h2>
        </div>
        <p>각 카드의 링크를 누르면 구글 지도 길찾기가 순서대로 열립니다(새 탭). 전철·버스 이동은 <b>대중교통</b>, 도심 짧은 이동은 <b>도보</b> 모드로 설정했어요. 실제 시각·승강장은 앱에서 다시 확인하세요.</p>
      </div>
      <div className="routes-grid">
        {dayRoutes.map((route) => (
          <article className={`route-card ${route.color} reveal`} key={route.day}>
            <div className="route-top"><span>{route.day}</span><h3>{route.title}</h3></div>
            <div className="route-meta">
              <p><span>교통수단</span>{route.mode}</p>
              <p><span>예상 이동</span>{route.time}</p>
              <p><span>환승</span>{route.transfer}</p>
            </div>
            <ol className="route-stops" aria-label={`${route.title} 순서`}>
              {route.stops.map((stop) => <li key={stop}>{stop}</li>)}
            </ol>
            <div className="route-links">
              {route.links.map((link) => (
                <a href={link.url} target="_blank" rel="noopener noreferrer" key={link.url}>{link.label} ↗</a>
              ))}
            </div>
          </article>
        ))}
      </div>
      <p className="routes-note reveal">임베드 지도(iframe)는 Google Maps Embed API 키가 필요해 딥링크 방식으로 구성했습니다. 키가 준비되면 각 링크를 임베드로 교체할 수 있어요.</p>
    </section>
  );
}

const packingGroups = [
  { title: "증빙·결제", items: ["여권(+ 사본/사진), 신분증", "항공권(진에어)·숙소·열차 예약 캡처, Visit Japan Web QR 스크린샷", "웰컴 캠페인·우동현 패스포트 등 디지털 쿠폰 발급·캡처", "지갑, 현금(¥), 트래블/체크카드, 신용카드"] },
  { title: "전자기기", items: ["스마트폰, 보조배터리, 충전 케이블", "11자(A타입) 변환 플러그 + 멀티탭 1개(4인 공용)", "이어폰"] },
  { title: "통신", items: ["이심/유심 개통 확인 또는 모바일 Suica/ICOCA"] },
  { title: "의류(여름)", items: ["통풍 잘 되는 상·하의 여벌, 속옷·양말", "실내 냉방용 얇은 겉옷 한 장", "많이 걷는 날용 편한 신발(리쓰린·구라시키), 샌들, 잠옷"] },
  { title: "더위·햇빛(폭염 대응)", items: ["양산, 선크림, 모자, 선글라스", "휴대용 손선풍기/부채, 물통"] },
  { title: "우천·태풍", items: ["접이식 우산 또는 우비, 방수 파우치"] },
  { title: "위생·상비약", items: ["세면도구·위생용품, 물티슈·손수건, 마스크", "상비약(해열·진통·지사·소화제·밴드·개인 복용약)"] },
  { title: "기타", items: ["접이식 에코백/장바구니(기념품·와산본), 지퍼백, 세탁물 주머니"] },
];

const usefulApps = [
  ["Visit Japan Web", "입국심사·세관 신고 QR 사전 등록"],
  ["Google Maps", "지도·경로 · 오프라인 지도 저장"],
  ["NAVITIME for Japan Travel", "열차·버스 환승·시각표 (또는 Yahoo! 乗換案内 / Jorudan)"],
  ["Papago + Google 번역", "번역 · 일본어 오프라인 팩·카메라 번역"],
  ["타베로그(Tabelog)", "맛집·영업시간·정기휴무 확인"],
  ["Safety tips", "지진·태풍 등 재난 경보 (한국어 지원)"],
  ["Yahoo! JAPAN 天気", "일본 현지 상세 날씨 (태풍 시즌 대비)"],
  ["트래블월렛 / 트래블로그", "카드 잔액·환전 관리"],
  ["LINE", "일본 현지 연락·일부 예약"],
  ["(아이폰) 지갑 앱 Suica/ICOCA", "모바일 교통·편의점 결제"],
];

const emergencyContacts = [
  {
    group: "긴급 (일본 현지)",
    rows: [
      { label: "경찰", tel: "110", note: "사건·사고 신고" },
      { label: "구급·화재", tel: "119", note: "응급·소방" },
    ],
  },
  {
    group: "대한민국 재외공관 · 영사 (카가와·오카야마 관할 = 주고베 총영사관)",
    rows: [
      { label: "주고베 총영사관 대표", tel: "+81-78-221-4853", note: "업무시간 09:00~17:00" },
      { label: "24시간 긴급(사건사고)", tel: "+81-90-5099-0414", note: "긴급연락 전용" },
      { label: "영사콜센터", tel: "+82-2-3210-0404", note: "24시간 · 국내 발신·유료" },
      { label: "총영사관 주소", tel: "", note: "神戸市 中央区 中山手通 2-21-5 (〒650-0004)" },
    ],
  },
  {
    group: "여행자 지원 (24시간·한국어)",
    rows: [
      { label: "JNTO 재팬 비지터 핫라인", tel: "+81-50-3816-2787", note: "국내 050-3816-2787 · 사고·재해·관광 안내" },
    ],
  },
  {
    group: "개인 채움 항목 (값은 직접 입력)",
    rows: [
      { label: "숙소 연락처·주소", tel: "", note: "____________________" },
      { label: "진에어 고객센터 / 여행자보험 사고접수", tel: "", note: "____________________" },
      { label: "카드사 분실신고", tel: "", note: "____________________" },
      { label: "동행 4인 연락처", tel: "", note: "____________________" },
    ],
  },
];

export default function Home() {
  return (
    <main>
      <ScrollEffects />
      <header className="nav">
        <a className="brand" href="#top" aria-label="여행 계획 처음으로">
          <span className="brand-mark">瀬</span>
          <span>TAKAMATSU<br /><small>TRIP NOTE</small></span>
        </a>
        <nav aria-label="페이지 메뉴">
          <a href="#overview">개요</a>
          <a href="#flight">항공</a>
          <a href="#stay">숙소</a>
          <a href="#day3">구라시키</a>
          <a href="#routes">동선</a>
          <a href="#itinerary">일정</a>
          <a href="#food">먹거리</a>
          <a href="#budget">경비</a>
          <a href="#packing">준비물</a>
          <a href="#emergency">비상연락</a>
        </nav>
        <a className="nav-date" href="#itinerary">3박 4일 <span>↘</span></a>
      </header>

      <section className="hero photo-hero" id="top">
        <div className="photo-hero-img">
          <img src={withBasePath("/yashima.jpg")} alt="야시마에서 내려다본 다카마쓰 시가지와 세토내해 파노라마" />
          <span className="photo-hero-credit">Takamatsu from Yashima · Photo: Photos of Japan (CC0), Wikimedia Commons</span>
        </div>
        <div className="photo-hero-copy">
          <p className="eyebrow">KAGAWA · JAPAN / SUMMER 2026</p>
          <h1>느리게,<br /><em>다카마쓰.</em></h1>
          <p className="hero-lead">이른 아침 정원에서 평지 관광까지, 우동 한 그릇에서 노을까지.<br />쿠폰북과 함께 알차게 누리는 세토내해 3박 4일.</p>
          <div className="hero-actions">
            <a className="primary" href="#itinerary">일정 펼쳐보기 <span>↓</span></a>
            <span className="date-line">2026. 08. 24 — 08. 27</span>
          </div>
          <p className="hero-members">멤버 : 동인, 민성, 승원, 경준</p>
        </div>
      </section>

      <section className="overview" id="overview">
        <img className="yadon-peek yadon-peek-one" src={withBasePath("/yadon02.png")} alt="" aria-hidden="true" />
        <div className="overview-title reveal">
          <p className="eyebrow">TRIP OVERVIEW · LATE AUGUST</p>
          <h2>뜨거운 여름,<br /><em>바다처럼 느긋하게.</em></h2>
          <p>8월 말 다카마쓰는 여전히 한여름입니다. 다만 세토내해의 맑은 풍경과 늦은 저녁까지 이어지는 긴 하루 덕분에, 속도만 조금 늦추면 정원·평지 관광과 구라시키 당일치기까지 충분히 즐길 수 있어요.</p>
        </div>
        <div className="trip-fit reveal">
          <p>TRAVEL VERDICT</p>
          <h3>더위를 기준으로,<br /><span>동선을 짜야 해요.</span></h3>
          <div className="fit-meter"><i /><i /><i /><i /><i /></div>
          <p>정확한 8월 24–27일 예보는 출발 7–10일 전에 확인해야 합니다. 지금은 작년 같은 날짜의 실제 기록을 보수적으로 참고해, 오전 7–11시와 오후 4시 이후를 야외 핵심 시간으로 잡고 12–15시는 식사·카페·이동에 쓰는 편이 안전해요.</p>
        </div>
        <div className="weather-tips reveal">
          <div><b>01</b><span>얇고 통풍되는 옷</span><p>실내 냉방용 가벼운 셔츠도 한 장</p></div>
          <div><b>02</b><span>양산·선크림·물</span><p>그늘이 적은 정원·거리에서는 필수</p></div>
          <div><b>03</b><span>소나기 대비</span><p>접이식 우산과 방수 파우치 준비</p></div>
          <div><b>04</b><span>태풍·세토대교 확인</span><p>구라시키행 열차 운행 공지를 출발 전 점검</p></div>
        </div>
        <div className="weather-history reveal">
          <div className="weather-history-intro">
            <p className="eyebrow">LAST YEAR · OBSERVED, NOT FORECAST</p>
            <h3>우리가 가는 날짜,<br /><em>작년에는 35°C 안팎.</em></h3>
            <p>2025년 8월 24–27일 다카마쓰는 나흘 평균기온이 30.7°C, 낮 최고기온 평균이 35.3°C였습니다. 네 날 모두 비다운 비가 기록되지 않아 이동은 수월했지만, 아침 최저도 평균 27.4°C로 밤까지 더위가 이어졌어요.</p>
            <a href="https://www.data.jma.go.jp/stats/etrn/view/daily_s1.php?block_no=47891&day=&month=8&prec_no=72&view=a1s&year=2025" target="_blank" rel="noopener noreferrer">일본 기상청 실제 관측표 ↗</a>
          </div>
          <div className="weather-history-days" aria-label="2025년 8월 24일부터 27일까지 다카마쓰 실제 기온">
            <div><span>8.24</span><b>35.8°</b><small>평균 31.3° · 최저 28.1°</small></div>
            <div><span>8.25</span><b>35.5°</b><small>평균 30.5° · 최저 27.6°</small></div>
            <div><span>8.26</span><b>34.9°</b><small>평균 30.6° · 최저 27.1°</small></div>
            <div><span>8.27</span><b>34.8°</b><small>평균 30.5° · 최저 26.8°</small></div>
          </div>
          <div className="weather-history-note">
            <span>WHAT THIS MEANS</span>
            <p><strong>8월 26일 구라시키 당일치기도 폭염 기준으로 배치</strong> · 오전 11시 전 미관지구 야외 산책 · 12–15시는 냉방이 되는 열차·오하라미술관 실내 관람 · 이동 중 물을 미리 보충하세요.</p>
          </div>
        </div>
      </section>

      <section className="flight-section reveal" id="flight">
        <div className="section-heading light">
          <p>FLIGHT PLAN</p>
          <h2>하늘길부터<br />정확하게.</h2>
        </div>
        <div className="flight-board">
          <article>
            <div className="flight-meta"><span>OUTBOUND</span><strong>JIN AIR · LJ369</strong></div>
            <div className="flight-route">
              <div><b>14:30</b><span>ICN</span><small>인천국제공항</small></div>
              <div className="route-line"><div className="track"><i className="plane">✈</i></div><span className="dur">1h 45m</span></div>
              <div className="align-right"><b>16:15</b><span>TAK</span><small>다카마쓰 공항</small></div>
            </div>
            <p className="flight-date">2026. 08. 24 월요일</p>
          </article>
          <article>
            <div className="flight-meta"><span>RETURN</span><strong>JIN AIR · LJ360</strong></div>
            <div className="flight-route">
              <div><b>17:15</b><span>TAK</span><small>다카마쓰 공항</small></div>
              <div className="route-line"><div className="track"><i className="plane">✈</i></div><span className="dur">1h 40m</span></div>
              <div className="align-right"><b>18:55</b><span>ICN</span><small>인천국제공항</small></div>
            </div>
            <p className="flight-date">2026. 08. 27 목요일</p>
          </article>
        </div>
      </section>

      <section className="passport-section reveal" id="passport">
        <figure className="passport-photo">
          <img src={withBasePath("/udon-passport.svg")} alt="우동현 오모테나시 패스포트 참고 일러스트" loading="lazy" />
          <figcaption>우동현 오모테나시 패스포트 (참고 일러스트) · 실제 사진은 현장에서 촬영해 교체하세요</figcaption>
        </figure>
        {/* 실제 패스포트 사진을 쓰려면 public/udon-passport.jpg 등으로 파일을 넣고 src만 교체. 배포용이라 저작권 안전한 원본 일러스트를 임시로 사용. */}
        <div className="passport-copy">
          <p className="eyebrow">FIRST STOP AT TAKAMATSU AIRPORT</p>
          <h2>도착하자마자,<br /><em>우동 여권부터.</em></h2>
          <p className="passport-intro">입국장을 나오면 1층 관광안내소에서 “우동현 오모테나시 패스포트(うどん県おもてなしパスポート)”를 문의하세요. 우동집과 관광시설의 참여 혜택을 여행 내내 챙길 수 있어요.</p>
          <div className="passport-steps">
            <div><b>01</b><span>1층 관광안내소</span><p>도착 로비에서 안내 표지를 따라 이동</p></div>
            <div><b>02</b><span>여권 제시</span><p>해외 여행자용 패스포트 수령 문의</p></div>
            <div><b>03</b><span>첫날부터 활용</span><p>참여 우동집·관광지 혜택과 도장 확인</p></div>
          </div>
          <div className="passport-alert"><span>!</span><p>배포 장소·재고·혜택은 바뀔 수 있어요. 16:15 도착 후 현장에서 먼저 확인하고, 수령이 어렵다면 다카마쓰역 관광안내소에도 문의하세요.</p></div>
        </div>
      </section>

      <section className="stay-section" id="stay">
        <div className="stay-heading reveal">
          <p className="eyebrow">STAY CONFIRMED · 3 NIGHTS</p>
          <h2>항구와 상점가<br />사이의 <em>우리 집.</em></h2>
          <p>카타하라마치역에서 도보 약 1분, 다카마쓰역·중앙상점가를 함께 누리기 좋은 위치예요. 이른 아침 출발과 늦은 저녁 식사 모두 이동 부담이 적습니다.</p>
          <a
            className="stay-link"
            href="https://www.airbnb.co.kr/rooms/1405400177499554945?guests=1&adults=1&s=67&unique_share_id=a9b94dd3-4a49-4309-9a4a-75fe728da66a"
            target="_blank"
            rel="noopener noreferrer"
          >
            에어비앤비 숙소 보기 <span>↗</span>
          </a>
        </div>
        <div className="stay-card reveal">
          <div className="stay-price">
            <span>확정 숙박비 · 4인 총액</span>
            <strong>₩550,000</strong>
            <small>1인 분담 ₩137,500 · 3박</small>
          </div>
          <div className="stay-facts">
            <div><b>4.9</b><span>평점 · 후기 71개</span></div>
            <div><b>5</b><span>최대 인원</span></div>
            <div><b>3</b><span>침대</span></div>
            <div><b>1</b><span>침실 · 욕실</span></div>
          </div>
          <p>마루노우치 파크 102 · 셀프 체크인 · 짐 보관 가능 · 세탁기/건조기</p>
        </div>
        <a className="stay-mappin reveal" href="https://www.google.com/maps/search/?api=1&query=Kataharamachi+Station+Takamatsu" target="_blank" rel="noopener noreferrer" aria-label="숙소 위치(카타하라마치역 기준) 구글 지도에서 보기">
          <div className="stay-mappin-visual" aria-hidden="true">
            <span className="pin">📍</span>
            <b>片原町駅</b>
            <small>Kataharamachi Stn.</small>
          </div>
          <div className="stay-mappin-copy">
            <span>GOOGLE MAPS</span>
            <strong>카타하라마치역 기준 · 도보 약 1분</strong>
            <p>개인정보 보호를 위해 정확한 호실 대신 <b>가장 가까운 역(카타하라마치역)</b> 위치로 핀을 표시했어요. 정확한 주소·출입 안내는 에어비앤비 예약 내역에서 확인하세요.</p>
            <em>지도 열기 ↗</em>
          </div>
        </a>
        {/* 정밀 핀이 필요하면 예약 상세의 정확 주소로 query=<주소> 또는 query=<위도,경도> 로 교체. iframe 임베드는 Google Maps Embed API 키 필요. */}
        <div className="stay-access reveal">
          <div><span>01</span><strong>카타하라마치역</strong><p>도보 약 1분</p></div>
          <div><span>02</span><strong>다카마쓰역</strong><p>도보·고토덴 · 당일치기에 유리</p></div>
          <div><span>03</span><strong>중앙상점가</strong><p>식사·쇼핑을 도보로</p></div>
        </div>
      </section>

      <section className="play-map-section" id="play-map">
        <div className="play-map-heading reveal">
          <p className="eyebrow">PLAY MAP · FROM OUR STAY</p>
          <h2>숙소에서 시작하는<br /><em>다카마쓰 놀거리.</em></h2>
          <p>카타하라마치 숙소를 중심으로 항구·정원·상점가를 묶었어요. 번호를 누르면 실제 지도에서 위치를 바로 확인할 수 있습니다.</p>
        </div>
        <div className="play-map-figure reveal">
          <img src={withBasePath("/takamatsu-map.png")} alt="다카마쓰 시내 지도 · 숙소와 주요 스팟 위치" loading="lazy" />
          {mapSpots.map((s) => (
            <a
              key={s.name}
              className={`map-pin${s.star ? " star" : ""}`}
              style={{ left: `${s.left}%`, top: `${s.top}%` }}
              href={`https://www.google.com/maps/search/?api=1&query=${s.q}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${s.name} 구글 지도에서 보기`}
              title={s.name}
            >
              <b>{s.n}</b>
            </a>
          ))}
          <span className="map-attr">© OpenStreetMap contributors · © CARTO</span>
        </div>
        <div className="play-map-legend2 reveal" aria-label="숙소 주변 주요 스팟">
          {mapSpots.map((s) => (
            <a className="pm-legend" key={s.name} href={`https://www.google.com/maps/search/?api=1&query=${s.q}`} target="_blank" rel="noopener noreferrer">
              <b className={s.star ? "star" : ""}>{s.n}</b>
              <span>{s.name}<small>{s.note}</small></span>
            </a>
          ))}
        </div>
        <p className="play-map-note reveal">지도의 핀은 실제 위치 기준으로 표시했어요. 핀이나 아래 목록을 누르면 구글 지도에서 정확한 위치가 새 탭으로 열립니다. 거리 표기는 숙소(카타하라마치역) 기준.</p>
      </section>

      <section className="night-section" id="night-options">
        <div className="night-heading reveal">
          <div>
            <p className="eyebrow">OPTIONAL AFTER DARK · 숙소 주변</p>
            <h2>필수 일정 밖의<br /><em>다카마쓰 밤.</em></h2>
          </div>
          <p>대부분 숙소(카타하라마치) 도보권의 밤 선택지예요. DAY별 필수 일정이 아니니 체력과 실제 영업 여부를 보고 가까운 한 곳만 가볍게 다녀오세요.</p>
        </div>
        <div className="night-grid">
          <article className="night-card reveal">
            <small>01 · 가지야마치 · 현지 저녁 식사</small>
            <h3>잇카쿠 다카마쓰점</h3>
            <dl>
              <div><dt>분위기</dt><dd>활기찬 로컬 식당</dd></div>
              <div><dt>예상 체류</dt><dd>약 60–90분</dd></div>
              <div><dt>숙소 복귀</dt><dd>가타하라마치 숙소까지 도보 약 10–15분</dd></div>
              <div><dt>영업·이용</dt><dd>평일 17:00–23:00 · 주말·공휴일 11:00–23:00 · <b>화요일 휴무</b></dd></div>
            </dl>
            <a href="https://www.ikkaku.co.jp/" target="_blank" rel="noopener noreferrer">공식 영업정보 ↗</a>
          </article>
          <article className="night-card reveal">
            <small>02 · 도리마치 · 간식·음료 쇼핑</small>
            <h3>마루나카 도리마치점</h3>
            <dl>
              <div><dt>분위기</dt><dd>차분한 동네 슈퍼마켓</dd></div>
              <div><dt>예상 체류</dt><dd>약 20–30분</dd></div>
              <div><dt>숙소 복귀</dt><dd>가타하라마치 숙소까지 도보 약 5–10분</dd></div>
              <div><dt>영업·이용</dt><dd>08:00–23:00</dd></div>
            </dl>
            <a href="https://www.google.com/maps/search/?api=1&query=Marunaka+Torimachi+Takamatsu" target="_blank" rel="noopener noreferrer">지도에서 보기 ↗</a>
          </article>
          <article className="night-card reveal">
            <small>03 · 가타하라마치–마루가메마치</small>
            <h3>중앙상점가·마루가메마치</h3>
            <dl>
              <div><dt>분위기</dt><dd>아케이드 야간 산책</dd></div>
              <div><dt>예상 체류</dt><dd>약 30–60분</dd></div>
              <div><dt>숙소 복귀</dt><dd>숙소까지 도보 약 5–15분</dd></div>
              <div><dt>영업·이용</dt><dd>보행 공간 상시 통행 · 점포별 영업시간 상이</dd></div>
            </dl>
            <a href="https://www.google.com/maps/search/?api=1&query=Takamatsu+Marugamemachi+Shopping+Street" target="_blank" rel="noopener noreferrer">지도에서 보기 ↗</a>
          </article>
          <article className="night-card reveal">
            <small>04 · 다카마쓰역 북쪽 워터프런트</small>
            <h3>다카마쓰항·선포트</h3>
            <dl>
              <div><dt>분위기</dt><dd>항구 불빛과 바닷바람</dd></div>
              <div><dt>예상 체류</dt><dd>약 30–45분</dd></div>
              <div><dt>숙소 복귀</dt><dd>도보 약 20–25분 또는 고토덴 1정거장</dd></div>
              <div><dt>영업·이용</dt><dd>야외 산책로 상시 통행 · 개별 시설은 영업시간 상이</dd></div>
            </dl>
            <a href="https://www.google.com/maps/search/?api=1&query=Sunport+Takamatsu" target="_blank" rel="noopener noreferrer">지도에서 보기 ↗</a>
          </article>
        </div>
      </section>

      <DayRoutes />

      <section className="itinerary" id="itinerary">
        <div className="section-heading">
          <p>JOURNEY BY DAY</p>
          <h2>일자별<br /><em>여행 계획.</em></h2>
          <span>날짜별 상세 일정과 주요 관광지 사진을 함께 담았어요. 사진을 누르면 구글 지도가 새 탭에서 열립니다.</span>
        </div>
        <div className="day-stack">
          {days.map((day) => (
            <article className={`day-block ${day.color} reveal`} key={day.date} id={`day-${day.date}`}>
              <div className="day-block-head">
                <div className="day-block-date"><b>{day.date}</b><span>{day.weekday}</span></div>
                <div className="day-block-title"><p>{day.theme}</p><h3>{day.title}</h3></div>
              </div>
              {day.photos && (
                <div className="day-photos" aria-label={`${day.date} 관광지 사진`}>
                  {day.photos.map((ph) => (
                    <a className="day-photo" href={ph.map} target="_blank" rel="noopener noreferrer" key={ph.image} aria-label={`${ph.caption} 지도에서 보기`}>
                      <img src={withBasePath(ph.image)} alt={ph.alt} loading="lazy" />
                      <span>{ph.caption}<b>지도 ↗</b></span>
                    </a>
                  ))}
                </div>
              )}
              <div className="timeline">
                {day.items.map(([time, title, text]) => (
                  <div className="timeline-item" key={`${day.date}-${time}`}>
                    <time>{time}</time>
                    <div><strong>{title}</strong><p>{text}</p></div>
                  </div>
                ))}
              </div>
              {day.detail && (
                <div className="day-detail">
                  <div className="day-detail-badge"><span className="verify-badge">{day.detail.badge}</span></div>
                  <div className="day3-cards">
                    {day.detail.cards.map((c) => (
                      <article key={c.name}>
                        <span>{c.tag}</span>
                        <h4>{c.name}</h4>
                        <p>{c.desc}</p>
                        <dl>{c.facts.map(([dt, dd]) => <div key={dt}><dt>{dt}</dt><dd>{dd}</dd></div>)}</dl>
                        <a href={c.link} target="_blank" rel="noopener noreferrer">{c.linkText} ↗</a>
                      </article>
                    ))}
                  </div>
                  <div className="day3-caution">
                    <h4>구라시키 확정 · 꼭 확인</h4>
                    <ul>{day.detail.caution.map((c) => <li key={c.b}><b>{c.b}</b> {c.t}</li>)}</ul>
                    <div className="tag-row">{day.detail.tags.map((t) => <span key={t}>{t}</span>)}</div>
                    <div className="source-row">{day.detail.sources.map(([u, l]) => <a key={u} href={u} target="_blank" rel="noopener noreferrer">{l} ↗</a>)}</div>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
        <p className="photo-credit reveal">사진: Wikimedia Commons 등 공개 라이선스 자료 · 각 사진은 원본 페이지의 라이선스 조건을 따릅니다. 상세 크레딧은 페이지 하단 참조.</p>
      </section>

      <section className="planb-section" id="plan-b">
        <div className="planb-head reveal">
          <div>
            <p className="eyebrow">TYPHOON / STRONG WIND · PLAN B</p>
            <h2>태풍·강풍용<br /><em>Plan B.</em></h2>
          </div>
          <p>3일차 구라시키는 세토대교를 건너기 때문에 강풍·태풍에 취약합니다. 아래는 정상 날씨의 확정안과 별개로, <b>쿠폰·예약보다 안전과 귀국편을 우선</b>하는 대비책이에요. 8월은 태풍 시즌이라 매일 아침 상황을 확인하세요.</p>
        </div>

        <div className="planb-check reveal">
          <h3>STEP 1 · 출발 여부부터 판단</h3>
          <ul>
            <li><b>전날 18:00 1차 확인 → 당일 06:00 최종 확인</b> · JR 시코쿠/JR 서일본 운행정보와 기상청 태풍·강풍 특보를 함께 봅니다.</li>
            <li><b>세토대교(마린라이너·특급) 운휴·지연 안내가 뜨면 출발하지 않습니다.</b> 다리 위 강풍은 예고 없이 운행을 멈출 수 있어요.</li>
            <li>애매하면 구라시키 대신 <b>시내 실내(B-1)</b>로 전환 — 왕복 2~3시간 발이 묶이는 위험을 피합니다.</li>
          </ul>
          <div className="source-row">
            <a href="https://www.jr-shikoku.co.jp/" target="_blank" rel="noopener noreferrer">JR 시코쿠 운행정보 ↗</a>
            <a href="https://www.jr-odekake.net/railroad/train/marineliner/" target="_blank" rel="noopener noreferrer">마린라이너(JR 서일본) ↗</a>
            <a href="https://www.jma.go.jp/bosai/" target="_blank" rel="noopener noreferrer">일본 기상청 방재정보 ↗</a>
          </div>
        </div>

        <div className="planb-grid reveal">
          <article className="planb-card b1">
            <span>PLAN B-1</span>
            <h3>철도 운휴/위험 → 시내 실내로</h3>
            <p>세토대교 구간이 불안하면 구라시키를 포기하고 다카마쓰 시내 실내·아케이드로 하루를 대체합니다. 대부분 숙소 도보권이라 이동 위험이 적어요.</p>
            <ul>
              <li>다카마쓰시립미술관 — 냉방 실내 관람</li>
              <li>중앙상점가·마루가메마치 그린·가와라마치 FLAG — 아케이드 쇼핑</li>
              <li>유메타운 다카마쓰 — 대형 실내몰(반나절)</li>
              <li>기타하마 앨리 카페 — 비 오는 날 분위기</li>
            </ul>
            <a href="https://www.city.takamatsu.kagawa.jp/museum/takamatsu/" target="_blank" rel="noopener noreferrer">미술관 공식 안내 ↗</a>
          </article>
          <article className="planb-card b2">
            <span>PLAN B-2</span>
            <h3>시내 이동도 위험 → 대기·귀국 우선</h3>
            <p>강풍·폭우로 시내 이동도 위험하면 관광을 취소하고 숙소나 가까운 안전한 실내에서 대기합니다.</p>
            <ul>
              <li>해안·항구·하천·지하 공간은 피합니다</li>
              <li>항공편(진에어)과 공항 접근부터 확인 — 귀국이 최우선</li>
              <li>물·식량 미리 확보(마루나카 도리마치점 도보 5~10분)</li>
              <li>Safety tips 앱 재난경보 · 숙소 호스트 연락처 확인</li>
            </ul>
            <strong>쿠폰 절약액보다 안전이 우선</strong>
          </article>
        </div>

        <div className="planb-note reveal">
          <span>비·폭염만 심할 때 (운휴는 아님)</span>
          <p>구라시키는 가되 실내 비중을 늘립니다 — 오하라미술관·상점가·카페 시간을 늘리고 미관지구 야외 산책은 짧게. 양산·물·환승 여유를 넉넉히 두세요.</p>
        </div>
        <p className="decision-time reveal">권장 판단 타임라인: 전날 18:00 1차 확인 → 당일 06:00 최종 확인 · 실제 발표 시각에 따라 달라질 수 있습니다.</p>
      </section>

      <section className="yadon-section" id="yadon">
        <div className="yadon-heading reveal">
          <div>
            <p className="eyebrow">UDON-KEN × YADON</p>
            <h2>느긋하게 만나는<br /><em>야돈 파라다이스.</em></h2>
          </div>
          <div>
            <p>‘우동’과 일본어 발음이 닮은 야돈은 가가와현의 우동현 PR단입니다. 한 곳만 보고 끝내기보다 공항·거리·교통수단에서 야돈을 하나씩 발견하는 작은 보물찾기처럼 즐겨보세요.</p>
            <a href="https://yadon.my-kagawa.jp/" target="_blank" rel="noopener noreferrer">야돈 파라다이스 공식 사이트 ↗</a>
          </div>
        </div>

        <div className="yadon-grid">
          <article className="yadon-card reveal">
            <div className="yadon-card-photo"><img src={withBasePath("/yadon-stamp.jpg")} alt="2026 야돈과 함께하는 가가와 여행 스탬프 랠리 안내" loading="lazy" /></div>
            <div><small>01 · 여행 기간에 딱 맞아요</small><h3>2026 야돈 스탬프 랠리</h3><p>2026년 4월 24일부터 12월 31일까지 진행되어 이번 여행 기간에도 참여할 수 있어요. 공항이나 관광안내소에서 리플릿을 먼저 확인하세요.</p><a href="https://yadon.my-kagawa.jp/stamp2026/" target="_blank" rel="noopener noreferrer">참여 방법 보기 ↗</a></div>
          </article>
          <article className="yadon-card reveal">
            <div className="yadon-card-photo transport"><img src={withBasePath("/yadon-airport-bus.jpg")} alt="야돈 디자인의 다카마쓰 공항 리무진버스" /></div>
            <div><small>02 · 도착하는 순간부터</small><h3>야돈 공항 리무진버스</h3><p>다카마쓰 공항과 시내를 잇는 래핑 버스입니다. 차량 점검이나 배차에 따라 일반 차량이 올 수도 있으니 만나면 행운의 첫 야돈으로 기록해보세요.</p><a href="https://www.yadon.my-kagawa.jp/traffic/" target="_blank" rel="noopener noreferrer">교통편 확인 ↗</a></div>
          </article>
          <article className="yadon-card reveal">
            <div className="yadon-card-photo transport"><img src={withBasePath("/yadon-train.jpg")} alt="야돈을 래핑한 고토덴 열차" loading="lazy" /></div>
            <div><small>03 · DAY 2에 노려보기</small><h3>야돈 고토덴 열차</h3><p>다카마쓰 시내와 고토히라·아야가와를 잇는 고토덴에 야돈 래핑 열차가 운행합니다. 리쓰린·고토히라로 이동하는 2일차 동선과 잘 맞으니 만나면 행운의 야돈으로 기록해보세요. 매편 고정은 아니라 배차는 당일 확인이 좋아요.</p><a href="https://www.yadon.my-kagawa.jp/traffic/" target="_blank" rel="noopener noreferrer">교통편 확인 ↗</a></div>
          </article>
        </div>

        <div className="yadon-stamp-spots reveal">
          <div className="yadon-stamp-head"><span>STAMP RALLY</span><h3>우리 동선에서 들르기 쉬운 스탬프 후보</h3></div>
          <p>스탬프 랠리는 카가와 곳곳에 설치돼요. 아래 지도는 이번 3박 4일 동선에서 무리 없이 들를 수 있는 후보 위치입니다. <b>실제 스탬프 설치 지점·앱 방식은 공식 사이트에서 확인</b>하세요.</p>
          <div className="play-map-figure reveal">
            <img src={withBasePath("/stamp-map.png")} alt="카가와 스탬프 후보 위치 지도" loading="lazy" />
            {stampMapSpots.map((s) => (
              <a key={s.name} className="map-pin" style={{ left: `${s.left}%`, top: `${s.top}%` }} href={`https://www.google.com/maps/search/?api=1&query=${s.q}`} target="_blank" rel="noopener noreferrer" aria-label={`${s.name} 구글 지도에서 보기`} title={s.name}><b>{s.n}</b></a>
            ))}
            <span className="map-attr">© OpenStreetMap contributors · © CARTO</span>
          </div>
          <div className="play-map-legend2 reveal" aria-label="스탬프 후보 스팟">
            {stampMapSpots.map((s) => (
              <a className="pm-legend" key={s.name} href={`https://www.google.com/maps/search/?api=1&query=${s.q}`} target="_blank" rel="noopener noreferrer"><b>{s.n}</b><span>{s.name}<small>{s.note}</small></span></a>
            ))}
          </div>
          <a className="yadon-stamp-official" href="https://yadon.my-kagawa.jp/stamp2026/" target="_blank" rel="noopener noreferrer">공식 스탬프 설치 장소·참여 방법 ↗</a>
        </div>

        <div className="yadon-hunt reveal">
          <div><span>CITY HUNT</span><h3>시내에서 찾는 야돈 3개</h3></div>
          <a href="https://www.google.com/maps/search/?api=1&query=Takamatsu+Airport" target="_blank" rel="noopener noreferrer"><b>공항 야돈 피규어</b><small>2층 국내선 출발 로비 · 귀국 전 사진</small></a>
          <a href="https://www.google.com/maps/search/?api=1&query=Takamatsu+Central+Post+Office" target="_blank" rel="noopener noreferrer"><b>야돈 우체통</b><small>다카마쓰 중앙우체국 앞 · 미쓰코시와 함께</small></a>
          <a href="https://www.google.com/maps/search/?api=1&query=Minamishinmachi+Shopping+Street+Takamatsu" target="_blank" rel="noopener noreferrer"><b>야돈 포켓몬 맨홀</b><small>상점가 남부 산마치 돔 아래 · 산책 중 발견</small></a>
        </div>

        <div className="yadon-route reveal">
          <img src={withBasePath("/yadon07.png")} alt="가가와현 우동현 PR단 야돈" />
          <div><span>추천 일정 배치</span><p><b>DAY 1</b> 공항 버스 → <b>DAY 2</b> 고토덴 열차 → <b>DAY 4</b> 시내 우체통·맨홀 → 공항 피규어</p></div>
        </div>
        <p className="yadon-credit">이미지 및 캐릭터 자료: 야돈 파라다이스 in 가가와 공식 사이트 · ©Pokémon. ©Nintendo/Creatures Inc./GAME FREAK inc.</p>
      </section>

      <section className="food-section" id="food">
        <img className="yadon-peek yadon-peek-three" src={withBasePath("/yadon02.png")} alt="" aria-hidden="true" />
        <div className="food-heading reveal">
          <div>
            <p className="eyebrow">KAGAWA FOOD CHECKLIST</p>
            <h2>한 그릇씩<br /><em>기억하는 카가와.</em></h2>
          </div>
          <div>
            <p>우동만 먹고 돌아오기엔 카가와의 맛이 너무 많아요. 일정 안에 자연스럽게 넣기 좋은 다섯 가지를 가격대와 주문 팁까지 모았습니다.</p>
            <span>사진을 누르면 다카마쓰·구라시키의 구글 지도 검색이 열려요.</span>
          </div>
        </div>
        <div className="food-grid">
          {foods.map((food, index) => (
            <article className={`food-card reveal food-${index + 1}`} key={food.name}>
              <a href={food.map} target="_blank" rel="noopener noreferrer" aria-label={`${food.name}을 판매하는 곳 구글 지도에서 찾기`}>
                <div className="food-photo">
                  <img src={withBasePath(food.image)} alt={food.alt} loading="lazy" />
                  <span>{food.jp}</span>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                </div>
                <div className="food-copy">
                  <small>{food.moment}</small>
                  <div className="food-title"><h3>{food.name}</h3><strong>{food.price}</strong></div>
                  <p>{food.taste}</p>
                  <div className="food-order"><span>ORDER TIP</span><p>{food.order}</p></div>
                  {food.note && <small className="food-note">{food.note}</small>}
                  <span className="food-map-link">먹을 곳 지도에서 찾기 ↗</span>
                </div>
              </a>
            </article>
          ))}
        </div>
        <div className="food-plan reveal">
          <span>우리 일정에 넣기</span>
          <p><b>첫날 저녁</b> 호네츠키도리</p>
          <p><b>둘째 날</b> 고토히라 우동 점심 + 마루가메 호네츠키도리 저녁</p>
          <p><b>셋째 날</b> 구라시키 점심(냉소면 등)</p>
          <p><b>마지막 날</b> 우동 + 와산본 쇼핑 · 여유 있는 날 올리브 소고기</p>
        </div>
        <p className="photo-credit reveal">음식 사진: Wikimedia Commons 공개 라이선스 자료 · 가격은 매장과 메뉴에 따라 달라질 수 있습니다.</p>
      </section>

      <section className="fashion-section" id="fashion">
        <img className="yadon-peek yadon-peek-four" src={withBasePath("/yadon05.png")} alt="" aria-hidden="true" />
        <div className="fashion-heading reveal">
          <div>
            <p className="eyebrow">TAKAMATSU FASHION SHOPPING</p>
            <h2>여행 가방에<br /><em>새 옷 한 벌.</em></h2>
          </div>
          <div>
            <p>숙소 주변에는 상점가형 쇼핑과 백화점이 가까이 모여 있어요. 취향과 남은 시간에 따라 한두 곳만 골라도 충분합니다.</p>
            <span>2026년 7월 공식 입점·영업 정보 기준 · 휴무와 영업시간은 방문 전 재확인</span>
          </div>
        </div>
        <div className="fashion-route reveal" aria-label="숙소에서 출발하는 옷 쇼핑 추천 동선">
          <div><b>STAY</b><span>카타하라마치 숙소</span><small>출발</small></div>
          <i>→</i>
          <div><b>5 MIN</b><span>다카마쓰 미쓰코시</span><small>프리미엄</small></div>
          <i>→</i>
          <div><b>12 MIN</b><span>마루가메마치 그린</span><small>가장 추천</small></div>
          <i>→</i>
          <div><b>+ 6 MIN</b><span>가와라마치 FLAG</span><small>일본 캐주얼</small></div>
        </div>
        <div className="fashion-grid">
          {fashionSpots.map((spot) => (
            <article className={`fashion-card ${spot.tone} reveal`} key={spot.name}>
              <a className="fashion-photo" href={spot.map} target="_blank" rel="noopener noreferrer" aria-label={`${spot.name} 구글 지도에서 보기`}>
                <img src={withBasePath(spot.image)} alt={spot.alt} loading="lazy" />
                <span>GOOGLE MAPS ↗</span>
              </a>
              <div className="fashion-card-content">
                <div className="fashion-card-top">
                  <span>{spot.num}</span>
                  <b>{spot.label}</b>
                </div>
                <p className="fashion-jp">{spot.jp}</p>
                <h3>{spot.name}</h3>
                <p className="fashion-description">{spot.description}</p>
                <div className="fashion-meta">
                  <p><span>ACCESS</span>{spot.access}</p>
                  <p><span>HOURS</span>{spot.hours}</p>
                  <p><span>BEST FOR</span>{spot.fit}</p>
                </div>
                <div className="brand-cloud" aria-label={`${spot.name} 주요 브랜드`}>
                  {spot.brands.map((brand) => <span key={brand}>{brand}</span>)}
                </div>
                <div className="fashion-actions">
                  <a href={spot.map} target="_blank" rel="noopener noreferrer">구글 지도 ↗</a>
                  <a href={spot.official} target="_blank" rel="noopener noreferrer">공식 매장 목록 ↗</a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="fashion-verdict reveal">
          <span>추천 선택</span>
          <p><b>시간이 1–2시간이면</b> 숙소 → 미쓰코시 → 마루가메마치 그린</p>
          <p><b>일본 캐주얼 중심이면</b> 마루가메마치 그린 → 가와라마치 FLAG</p>
          <p><b>반나절 쇼핑이면</b> 유메타운 단독 방문</p>
        </div>
      </section>

      <section className="budget-section" id="budget">
        <div className="budget-heading reveal">
          <p className="eyebrow">ESTIMATED BUDGET · 1 PERSON</p>
          <h2>이번 여행,<br /><em>얼마쯤 들까?</em></h2>
          <p>항공권과 숙소는 결제한 금액, 나머지는 쿠폰북을 활용했을 때의 여유 있는 예상치입니다.</p>
        </div>
        <div className="budget-total reveal">
          <span>예상 총경비</span>
          <strong>₩817,500</strong>
          <small>1인 확정 37.25만 원 + 현지 예상 44.5만 원</small>
          <div className="budget-bar" aria-label="확정 비용 45.6%, 예상 비용 54.4%">
            <i /><i />
          </div>
          <div className="budget-legend"><span>● 확정 비용 45.6%</span><span>● 현지 예상 54.4%</span></div>
        </div>
        <div className="budget-list reveal">
          <div className="confirmed"><span>항공권</span><small>확정</small><b>₩235,000</b></div>
          <div className="confirmed"><span>숙소 · 3박</span><small>55만 원 ÷ 4명</small><b>₩137,500</b></div>
          <div><span>현지 교통</span><small>리무진 쿠폰 + 구라시키 JR 왕복</small><b>₩55,000</b></div>
          <div><span>식비 · 카페</span><small>하루 약 4만 원</small><b>₩160,000</b></div>
          <div><span>입장·체험</span><small>오하라미술관·부채 체험 등</small><b>₩40,000</b></div>
          <div><span>eSIM·보험</span><small>출발 전 준비</small><b>₩25,000</b></div>
          <div><span>쇼핑·기념품</span><small>개인 예산</small><b>₩100,000</b></div>
          <div><span>예비비</span><small>약 5%</small><b>₩65,000</b></div>
        </div>
        <div className="budget-note reveal">
          <span>COUPON EFFECT</span>
          <p>공항 리무진 왕복과 리쓰린 공원 입장은 쿠폰으로 절약하는 전제예요. 3일차 구라시키는 페리를 이용하지 않아 페리 쿠폰 절약은 없고, 대신 <b>JR 왕복 철도비(마린라이너 왕복·약 ¥3,700)와 오하라미술관 입장료(성인 ¥2,000)</b>가 현지 교통·입장 예산에 반영돼 있습니다.</p>
        </div>
      </section>

      <section className="coupon reveal" id="coupon">
        <div className="coupon-stamp"><span>KAGAWA</span><b>COUPON</b><small>WELCOME 2026</small></div>
        <div className="coupon-main">
          <p className="eyebrow">SMART SAVING ROUTE</p>
          <h2>쿠폰북이<br /><em>여행의 동선</em>이 되게.</h2>
          <p className="coupon-intro">여행 기간은 ‘다카마쓰 웰컴 캠페인’ 대상 기간에 포함돼요. 약 4만 원 상당의 디지털 쿠폰을 일정 속에 자연스럽게 넣었습니다.</p>
          <div className="coupon-links">
            <a href="https://www.my-kagawa.jp/" target="_blank" rel="noopener noreferrer">카가와 관광 공식(쿠폰·캠페인 안내) ↗</a>
            <a href="https://www.newswire.co.kr/newsRead.php?no=1036520" target="_blank" rel="noopener noreferrer">캠페인 보도자료(근거) ↗</a>
            <a href="https://www.takamatsu-airport.com/kr/" target="_blank" rel="noopener noreferrer">다카마쓰공항(수령처 안내) ↗</a>
          </div>
          <small className="coupon-links-note">쿠폰 발급 화면·수령 방식은 도착 후 공항 인포메이션에서 최종 확인하세요. 링크는 참고용 공식 안내처입니다.</small>
          <div className="coupon-steps">
            {couponSteps.map(([num, title, text]) => (
              <div key={num}><b>{num}</b><h3>{title}</h3><p>{text}</p></div>
            ))}
          </div>
          <div className="coupon-note">
            <span>!</span>
            <p><strong>사용 전 꼭 확인</strong> 캠페인은 2026년 8월 31일까지 운영되고 쿠폰은 9월 6일까지 사용 가능하다고 안내되어 있어요. 수량·대상 항공편·발급 조건은 출발 직전에 다시 확인하세요. 3일차 구라시키는 철도로 다녀와 페리 쿠폰은 사용하지 않습니다.</p>
          </div>
        </div>
      </section>

      <section className="packing-section" id="packing">
        <div className="packing-heading reveal">
          <div>
            <p className="eyebrow">PACKING CHECKLIST · SUMMER</p>
            <h2>가방에<br /><em>챙길 물건.</em></h2>
          </div>
          <p>여름 다카마쓰(카가와)·구라시키(오카야마) 여행에 맞춘 준비물이에요. 항목을 탭하면 체크됩니다(브라우저에 임시 저장되지 않으니 출발 전 한 번 더 확인하세요).</p>
        </div>
        <div className="packing-grid">
          {packingGroups.map((group) => (
            <article className="packing-card reveal" key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>
                    <label><input type="checkbox" /><span>{item}</span></label>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="apps-section" id="apps">
        <div className="apps-heading reveal">
          <div>
            <p className="eyebrow">USEFUL APPS</p>
            <h2>깔아두면<br /><em>유용한 앱.</em></h2>
          </div>
          <p>출발 전 미리 설치·로그인해 두면 편해요. 항목을 탭하면 체크됩니다(브라우저에 저장되지 않으니 참고용).</p>
        </div>
        <ul className="apps-grid">
          {usefulApps.map(([name, use]) => (
            <li key={name}>
              <label><input type="checkbox" /><span><b>{name}</b><small>{use}</small></span></label>
            </li>
          ))}
        </ul>
      </section>

      <section className="emergency-contacts" id="emergency">
        <div className="emergency-contacts-heading reveal">
          <div>
            <p className="eyebrow">EMERGENCY CONTACTS</p>
            <h2>비상 연락망,<br /><em>미리 저장.</em></h2>
          </div>
          <p>다카마쓰(카가와)·구라시키(오카야마)는 <b>주고베 대한민국 총영사관</b> 관할입니다. 번호를 누르면 바로 전화 연결됩니다. 공식 출처 · 확인 기준일 2026-08-06.</p>
        </div>
        <div className="emergency-contacts-grid">
          {emergencyContacts.map((block) => (
            <article className="contacts-card reveal" key={block.group}>
              <h3>{block.group}</h3>
              <ul>
                {block.rows.map((row) => (
                  <li key={row.label}>
                    <span className="contact-label">{row.label}</span>
                    {row.tel ? (
                      <a className="contact-tel" href={`tel:${row.tel.replace(/[^+\d]/g, "")}`}>{row.tel}</a>
                    ) : (
                      <span className="contact-fill">{row.note}</span>
                    )}
                    {row.tel && row.note && <small className="contact-note">{row.note}</small>}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="contacts-source reveal">출처: 주고베 대한민국 총영사관 공식 안내(overseas.mofa.go.kr/jp-kobe-ko), 외교부 영사콜센터, 일본정부관광국(JNTO) Japan Visitor Hotline · 확인 기준일 2026-08-06. 번호·운영시간은 출발 전 재확인하세요.</p>
      </section>

      <section className="travel-notes reveal">
        <div className="section-heading">
          <p>KEEP IN MIND</p>
          <h2>여름 여행<br />작은 메모.</h2>
        </div>
        <div className="note-grid">
          <div><span>☀</span><h3>한낮은 천천히</h3><p>8월의 카가와는 덥고 습해요. 물·양산을 챙기고 12–15시는 실내와 이동 중심으로.</p></div>
          <div><span>≈</span><h3>열차는 시간표대로</h3><p>구라시키행 마린라이너·특급은 세토대교를 건너 강풍·태풍 시 지연·운휴합니다. 출발 전 JR 운행 정보를 확인하고 위험하면 가지 않아요.</p></div>
          <div><span>○</span><h3>실내·카페를 안전망으로</h3><p>폭염이나 비가 심하면 구라시키 오하라미술관·상점·카페 등 실내 비중을 늘리고, 미관지구 야외 시간은 줄이세요.</p></div>
          <div><span>¥</span><h3>현금도 조금</h3><p>교통카드가 편하지만 작은 우동집과 사찰 주변 상점은 현금만 받는 경우가 있어요.</p></div>
        </div>
      </section>

      <section className="credits-section reveal" id="credits">
        <p className="eyebrow">PHOTO CREDITS</p>
        <p className="credits-intro">아래 사진은 위키미디어 커먼즈의 공개 라이선스 자료입니다. 각 저작자와 라이선스를 표기합니다.</p>
        <ul className="credits-list">
          <li>다카마쓰 파노라마(야시마) — Photos of Japan · <b>CC0</b></li>
          <li>리쓰린 공원 — KimonBerlin · <b>CC BY-SA 2.0</b></li>
          <li>고토히라(곤피라) — Sei F · <b>CC BY-SA 2.0</b></li>
          <li>마루가메성 — Toto-tarou · <b>CC BY-SA 3.0</b></li>
          <li>기타하마 앨리 — 663highland · <b>CC BY 2.5</b></li>
          <li>구라시키 미관지구 — Suicasmo · <b>CC BY-SA 4.0</b></li>
          <li>오하라미술관 — setouchi · <b>CC BY-SA 3.0</b></li>
          <li>아이비 스퀘어 — tatushin · <b>Public domain</b></li>
          <li>음식·기타 스팟 사진 — Wikimedia Commons 공개 라이선스</li>
        </ul>
        <p className="credits-note">우동 여권 이미지는 저작권 안전을 위한 원본 참고 일러스트입니다. 캐릭터 자료(야돈)는 ©Pokémon, ©Nintendo/Creatures Inc./GAME FREAK inc. · 야돈 파라다이스 in 가가와 공식 사이트.</p>
      </section>

      <footer>
        <div><span className="brand-mark">瀬</span><p>TAKAMATSU<br />TRIP NOTE</p></div>
        <p>바다와 정원 사이,<br />우리의 늦여름 휴가.<br /><span className="footer-members">멤버 : 동인, 민성, 승원, 경준</span></p>
        <p className="footer-date">24 — 27<br /><span>AUG 2026</span></p>
      </footer>
    </main>
  );
}
