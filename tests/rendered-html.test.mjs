import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(new URL(pathname, "http://localhost"), { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the travel log at root and preserves the plan route", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Takamatsu Travel Log \| 3 Nights \/ 4 Days<\/title>/);
  assert.match(html, /ACTUAL ROUTE/);

  const planResponse = await render("/plan");
  assert.equal(planResponse.status, 200);
  const planHtml = await planResponse.text();
  assert.match(planHtml, /TRIP NOTE/);
});

test("server-renders the actual Timeline-based travel log", async () => {
  const response = await render("/travel-log");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Takamatsu Travel Log \| 3 Nights \/ 4 Days<\/title>/);
  assert.match(html, /Takamatsu → Shodoshima → Takamatsu/);
  assert.match(html, /Busshozan Onsen/);
  assert.match(html, /LAST DAY \/ SHOPPING/);
  assert.match(html, /Takamatsu City → Yume Town → Airport/);
  assert.match(html, /Sushiro · Lunch/);
  assert.match(html, /Yume Town Shopping/);
  for (const meal of [
    "MEAL · 메리켄야",
    "DINNER · 하쿠리타바이 한베 (Hakuri tabai hanbey)",
    "LUNCH · RestleA",
    "DINNER · Rojiura",
    "LUNCH · 사누끼우동 우에하라야 (Sanuki Udon Ueharaya)",
    "DINNER · 호네츠키도리 잇카쿠 마루가메본점",
    "LUNCH · Sushiro",
  ]) {
    assert.ok(html.includes(`aria-label="${meal}"`));
  }
  const sexyPhoto = html.indexOf("Sexy한 화로");
  const dinnerBike = html.indexOf('aria-label="Rojiura에서 Takamatsu Station까지 BIKE 이동"');
  const stationPhoto = html.indexOf("첫날 눈으로만 본 다카마쓰 심볼타워");
  const roundOneBike = html.indexOf('aria-label="Takamatsu Station에서 Round One Stadium Takamatsu까지 BIKE 이동"');
  const roundOnePhoto = html.indexOf("마리오카트 전설의 시작");
  const roundOneResult = html.indexOf("결과는 외눈박이 신경준이 우승했다네요");
  const lodgingBike = html.indexOf('aria-label="Round One Stadium Takamatsu에서 숙소까지 BIKE 이동"');
  const lateSnack = html.indexOf("숙소에서 진짜늦은 간식");
  const izakayaMeal = html.indexOf('aria-label="DINNER · 하쿠리타바이 한베 (Hakuri tabai hanbey)"');
  const izakayaReview = html.indexOf("OVERALL REVIEW", izakayaMeal);
  const lodgingWalk = html.indexOf('aria-label="하쿠리타바이 한베 (Hakuri tabai hanbey)에서 숙소까지 WALK 이동"');
  const convenienceStore = html.indexOf("숙소로 복귀하기 전 편의점 털이");
  assert.ok(sexyPhoto < dinnerBike && dinnerBike < stationPhoto);
  assert.ok(stationPhoto < roundOneBike && roundOneBike < roundOnePhoto);
  assert.ok(roundOnePhoto < roundOneResult && roundOneResult < lodgingBike && lodgingBike < lateSnack);
  assert.ok(izakayaMeal < izakayaReview && izakayaReview < lodgingWalk && lodgingWalk < convenienceStore);
  assert.ok((html.match(/OVERALL REVIEW/g) ?? []).length >= 7);
  assert.doesNotMatch(html, /TIME —/);
  assert.doesNotMatch(html, /TODO · ADD ORDERED MENU|TODO · ADD RESTAURANT REVIEW/);
  assert.match(html, /THEME \/ TAKAGI-SAN/);
  assert.match(html, /SHODOSHIMA TAKAGI COLLECTION/);
  assert.match(html, /THEME \/ YADON/);
  assert.match(html, /FOUND AROUND KAGAWA/);
  assert.match(html, />121<\/dd>/);
  assert.ok(html.indexOf('id="day-4"') < html.indexOf("THEME / YADON"));
  assert.ok(html.indexOf("THEME / YADON") < html.indexOf("SEE YOU AGAIN"));
  assert.match(html, /ACTUAL ROUTE/);
  assert.doesNotMatch(html, /Kurashiki|Bikan Historical Quarter|Ohara Museum|Ivy Square/);
  assert.doesNotMatch(html, /예정 동선|계획표 기반|방문 여부는 아직/);
  for (const anchor of ["day-1", "day-2", "day-3", "day-4", "theme-yadon"]) {
    assert.match(html, new RegExp(`href="#${anchor}"`));
  }
  assert.match(html, /id="theme-yadon"/);
  assert.match(html, /날짜별 빠른 이동/);
  assert.match(html, /사진 크게 보기:/);
});

test("travel data separates stops, timed legs, and transport modes", async () => {
  const source = await readFile(new URL("../app/travel-log/trip-data.ts", import.meta.url), "utf8");
  assert.match(source, /export type TripLeg/);
  assert.match(source, /mode: TransportMode/);
  for (const mode of ["bicycle", "bus", "train", "ferry", "flight"]) assert.match(source, new RegExp(`mode: "${mode}"`));
  for (const time of ["08:02", "09:03", "10:21–13:10", "11:59", "16:12", "21:55", "22:10"]) assert.match(source, new RegExp(time));
  assert.doesNotMatch(source, /Kurashiki|Bikan|Ohara|Ivy Square/);
});

test("all 121 selected travel photos render from ASCII-safe files", async () => {
  const response = await render("/travel-log");
  const html = await response.text();
  const imagePaths = [...html.matchAll(/<img[^>]+src="(\/travel-log\/[^"]+\.jpg)"/g)].map((match) => match[1]);
  const uniquePaths = [...new Set(imagePaths)];

  assert.equal(uniquePaths.length, 121);
  for (const path of uniquePaths) assert.match(path, /^\/travel-log\/[a-z0-9-]+\/[a-z0-9-]+\.jpg$/);
  await Promise.all(uniquePaths.map((path) => access(new URL(`public${path}`, projectRoot))));
  assert.match(html, /loading="lazy"/);
  assert.doesNotMatch(html, /PLACEHOLDER|TEMP COVER|TEMP END FRAME/);
});

test("photo essays use repeatable blocks and restaurant data stays editable", async () => {
  const [pageSource, photoSource, lightboxSource, dayNavigationSource, restaurantSource, dataSource, css, lightboxCss, dayNavigationCss] = await Promise.all([
    readFile(new URL("../app/travel-log/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/travel-log/PhotoSequence.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/travel-log/PhotoLightbox.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/travel-log/DayNavigation.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/travel-log/RestaurantSection.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/travel-log/trip-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/travel-log/travel-log.module.css", import.meta.url), "utf8"),
    readFile(new URL("../app/travel-log/photo-lightbox.module.css", import.meta.url), "utf8"),
    readFile(new URL("../app/travel-log/day-navigation.module.css", import.meta.url), "utf8"),
  ]);
  assert.doesNotMatch(pageSource, /^"use client"/);
  assert.match(pageSource, /<DayNavigation \/>/);
  assert.match(pageSource, /"theme-yadon"/);
  assert.match(pageSource, /stop\.meals/);
  assert.match(pageSource, /RestaurantSection key=/);
  assert.match(pageSource, /stop\.interstitialLegs/);
  assert.match(pageSource, /insertion\.kind === "meal"/);
  assert.match(pageSource, /if \(times\.length === 0\) return null/);
  assert.match(pageSource, /times\.join\(" → "\)/);
  assert.doesNotMatch(pageSource, /TIME —/);
  assert.match(photoSource, /MAX_PHOTOS_PER_BLOCK = 3/);
  assert.match(photoSource, /buildPhotoBlocks/);
  assert.doesNotMatch(photoSource, /photos\.length === 3/);
  assert.match(photoSource, /loading="lazy"/);
  assert.doesNotMatch(photoSource, /eagerFirst/);
  assert.match(dataSource, /export type MealStop/);
  for (const field of ["title", "branchName", "subtitle", "location", "time", "menu", "review", "overallReview", "note", "insertAt"]) assert.match(dataSource, new RegExp(`${field}\\?:`));
  assert.match(dataSource, /export type ThemeSection/);
  assert.match(photoSource, /<PhotoLightbox/);
  assert.match(photoSource, /returnFocusRef/);
  assert.match(photoSource, /lightboxPhotos/);
  assert.match(dataSource, /tripThemes/);
  assert.doesNotMatch(dataSource, /actualPhotos|photoIds|actualLayouts/);
  const photoEntries = [...dataSource.matchAll(/photo\("(day1|day2|day2-takagi|day3|day4|yadon)", (\d+), \{([\s\S]*?)\n\s*\}\),/g)];
  assert.equal(photoEntries.length, 121);
  assert.equal(new Set(photoEntries.map((entry) => `${entry[1]}-${entry[2]}`)).size, 121);
  for (const [, , , options] of photoEntries) {
    assert.match(options, /alt: "/);
    assert.match(options, /caption: "/);
    assert.match(options, /layout: "(?:wide|portrait|split|collage|panorama|panoramic)"/);
    assert.match(options, /size: "(?:xs|small|medium|large|full)"/);
    assert.match(options, /group: \d+/);
    assert.match(options, /objectPosition: "/);
  }
  assert.match(dataSource, /photo\("day3", 30, \{/);
  assert.match(dataSource, /photo\("day4", 15, \{/);
  assert.match(dataSource, /photo\("day2-takagi", 1, \{/);
  assert.match(dataSource, /photo\("yadon", 14, \{/);
  assert.match(dataSource, /photo\("day1", 1, \{[\s\S]*?layout: "portrait"[\s\S]*?objectFit: "contain"/);
  assert.match(dataSource, /export type PhotoSize = "xs" \| "small" \| "medium" \| "large" \| "full"/);
  assert.match(dataSource, /size: PhotoSize/);
  for (const size of ["xs", "small", "medium", "large", "full"]) {
    assert.match(dataSource, new RegExp(`size: "${size}"`));
  }
  assert.match(dataSource, /objectPosition\?: string/);
  assert.match(dataSource, /objectFit\?: "cover" \| "contain"/);
  assert.match(photoSource, /sizeClassMap: Record<TripPhoto\["size"\], string>/);
  assert.match(photoSource, /data-photo-size=\{photo\.size\}/);
  assert.match(photoSource, /objectPosition: photo\.objectPosition/);
  assert.match(photoSource, /objectFit: photo\.objectFit/);
  assert.match(restaurantSource, /const displayTitle = restaurantName/);
  assert.match(restaurantSource, /if \(!displayTitle\) return null/);
  assert.match(restaurantSource, /const overallReview = visibleText\(meal\.overallReview\)/);
  assert.match(restaurantSource, /\{overallReview && \(/);
  assert.match(restaurantSource, /mealSectionWithOverallReview/);
  assert.ok(restaurantSource.indexOf("PhotoSequence photos={meal.photos}") < restaurantSource.indexOf("{overallReview && ("));
  assert.match(restaurantSource, /meal\.menu\?\.filter/);
  assert.match(restaurantSource, /detailCount > 0/);
  assert.match(restaurantSource, /location \|\| time/);
  assert.doesNotMatch(restaurantSource, /TODO · ADD/);
  assert.match(dataSource, /restaurantName: "호네츠키도리 잇카쿠 마루가메본점"/);
  assert.match(dataSource, /restaurantName: "Sushiro"/);
  assert.equal([...dataSource.matchAll(/overallReview: /g)].length, 7);
  assert.equal([...dataSource.matchAll(/interstitialLegs: \[/g)].length, 2);
  assert.match(dataSource, /leg: { from: "Rojiura", to: "Takamatsu Station", mode: "bicycle" }/);
  assert.match(dataSource, /leg: { from: "Takamatsu Station", to: "Round One Stadium Takamatsu", mode: "bicycle" }/);
  assert.match(dataSource, /leg: { from: "Round One Stadium Takamatsu", to: "숙소", mode: "bicycle" }/);
  assert.match(dataSource, /leg: { from: "하쿠리타바이 한베 \(Hakuri tabai hanbey\)", to: "숙소", mode: "walk" }/);
  assert.match(dataSource, /meals\?: MealStop\[\]/);
  assert.equal([...dataSource.matchAll(/label: "(?:MEAL|LUNCH|DINNER)",/g)].length, 7);
  assert.match(css, /mealNotes\[data-columns="1"\]/);
  assert.match(css, /\.overallReviewBox/);
  assert.match(css, /\.overallReviewText/);
  assert.match(css, /\.mealSectionWithOverallReview[^}]*padding-bottom/);
  assert.match(css, /\.photo[^}]*background: #f7f3e9[^}]*box-shadow/s);
  assert.match(css, /photo figcaption[^}]*background: #f7f3e9[^}]*Noto Serif KR/s);
  assert.match(css, /photoBlock\[data-count="2"\]/);
  assert.match(css, /photoBlock\[data-count="3"\]/);
  assert.match(css, /\.sizeXs[^}]*--photo-width: 38%/);
  assert.match(css, /\.sizeSmall[^}]*--photo-width: 54%/);
  assert.match(css, /\.sizeMedium[^}]*--photo-width: 72%/);
  assert.match(css, /\.sizeLarge[^}]*--photo-width: 88%/);
  assert.match(css, /\.sizeFull[^}]*--photo-width: 100%/);
  assert.match(css, /photoBlock\[data-count="1"\] > \.photo[^}]*var\(--photo-width\)/s);
  assert.match(css, /photoBlock\[data-count="2"\] > \.photo[^}]*var\(--photo-weight\)/s);
  assert.match(css, /photoBlock\[data-count="3"\][\s\S]*var\(--photo-width\)/);
  assert.match(css, /--photo-mobile-width: 86%/);
  assert.match(css, /\.photoButton[^}]*cursor: zoom-in/);
  assert.match(css, /\.day[^}]*scroll-margin-top: 4\.5rem/);
  assert.match(css, /\.themeSection[^}]*scroll-margin-top: 4\.5rem/);
  assert.match(lightboxSource, /role="dialog"/);
  assert.match(lightboxSource, /aria-modal="true"/);
  for (const label of ["사진 닫기", "이전 사진", "다음 사진"]) assert.match(lightboxSource, new RegExp(`aria-label="${label}"`));
  for (const key of ["Escape", "ArrowLeft", "ArrowRight"]) assert.match(lightboxSource, new RegExp(`event\\.key === "${key}"`));
  assert.match(lightboxSource, /event\.key !== "Tab"/);
  assert.match(lightboxSource, /document\.body\.style\.overflow = "hidden"/);
  assert.match(lightboxSource, /returnFocus\?\.focus\(\)/);
  assert.match(lightboxSource, /createPortal/);
  assert.doesNotMatch(lightboxSource, /preload|new Image/);
  assert.match(lightboxCss, /object-fit: contain/);
  assert.match(lightboxCss, /max-height: min\(82vh,1200px\)/);
  assert.match(lightboxCss, /@media \(max-width: 760px\)/);
  assert.match(lightboxCss, /@media \(prefers-reduced-motion: reduce\)/);
  for (const id of ["day-1", "day-2", "day-3", "day-4", "theme-yadon"]) assert.match(dayNavigationSource, new RegExp(`id: "${id}"`));
  assert.match(dayNavigationSource, /new IntersectionObserver/);
  assert.match(dayNavigationSource, /rootMargin: "-18% 0px -72% 0px"/);
  assert.match(dayNavigationSource, /scrollIntoView/);
  assert.match(dayNavigationSource, /prefers-reduced-motion: reduce/);
  assert.match(dayNavigationSource, /aria-current=/);
  assert.match(dayNavigationCss, /position: fixed/);
  assert.match(dayNavigationCss, /data-active="true"/);
  assert.match(dayNavigationCss, /@media \(max-width: 760px\)/);
});

test("route map provides numbered places, mode icons, and non-color transport distinctions", async () => {
  const [mapSource, iconSource, timelineCss, pageCss] = await Promise.all([
    readFile(new URL("../app/travel-log/RouteMap.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/travel-log/ModeIcon.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/travel-log/timeline.module.css", import.meta.url), "utf8"),
    readFile(new URL("../app/travel-log/travel-log.module.css", import.meta.url), "utf8"),
  ]);
  assert.match(mapSource, /이날의 실제 이동 경로/);
  assert.match(mapSource, /지도 이동수단 범례/);
  assert.match(mapSource, /지도 장소 번호/);
  assert.doesNotMatch(mapSource, /markerLabel/);
  for (const mode of ["bus", "train", "ferry", "walk", "bicycle", "shopping", "flight"]) {
    assert.match(iconSource, new RegExp(`mode === "${mode}"`));
  }
  assert.match(timelineCss, /segmentFerry[^}]*stroke-dasharray/s);
  assert.match(timelineCss, /segmentTrain[^}]*stroke-width/s);
  assert.match(timelineCss, /modeBadge[^}]*inline-flex/s);
  assert.match(timelineCss, /transferBody p[^}]*font-size: clamp\(1\.35rem,2vw,2rem\)/s);
  assert.doesNotMatch(timelineCss, /min-height: 7\.5rem/);
  assert.match(timelineCss, /transferHeader \.modeBadge[^}]*font-size: \.82rem/s);
  assert.match(pageCss, /\.overview[^}]*min\(1500px, 92vw\)/s);
  assert.match(pageCss, /\.photoSequence[^}]*min\(1500px, 92vw\)/s);
  assert.match(pageCss, /photo figcaption[^}]*font: 500 1\.02rem\/1\.6/s);
  assert.match(pageCss, /mapPlaceLegend[^}]*repeat\(3/s);
  assert.match(pageCss, /@media \(max-width: 760px\)[\s\S]*mapPlaceLegend[^}]*repeat\(2/s);
});
