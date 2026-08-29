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
  assert.match(html, /Honetsukidori/);
  assert.match(html, /aria-label="DINNER · Honetsukidori"/);
  assert.match(html, /aria-label="LUNCH · Sushiro"/);
  assert.match(html, /TODO · ADD RESTAURANT REVIEW/);
  assert.match(html, /THEME \/ TAKAGI-SAN/);
  assert.match(html, /SHODOSHIMA SIDE STORY/);
  assert.match(html, /THEME \/ YADON/);
  assert.match(html, /FOUND AROUND KAGAWA/);
  assert.match(html, />126<\/dd>/);
  assert.ok(html.indexOf('id="day-4"') < html.indexOf("THEME / YADON"));
  assert.ok(html.indexOf("THEME / YADON") < html.indexOf("SEE YOU AGAIN"));
  assert.match(html, /ACTUAL ROUTE/);
  assert.doesNotMatch(html, /Kurashiki|Bikan Historical Quarter|Ohara Museum|Ivy Square/);
  assert.doesNotMatch(html, /예정 동선|계획표 기반|방문 여부는 아직/);
});

test("travel data separates stops, timed legs, and transport modes", async () => {
  const source = await readFile(new URL("../app/travel-log/trip-data.ts", import.meta.url), "utf8");
  assert.match(source, /export type TripLeg/);
  assert.match(source, /mode: TransportMode/);
  for (const mode of ["bicycle", "bus", "train", "ferry", "flight"]) assert.match(source, new RegExp(`mode: "${mode}"`));
  for (const time of ["08:02", "09:03", "10:21–13:10", "11:59", "16:12", "21:55", "22:10"]) assert.match(source, new RegExp(time));
  assert.doesNotMatch(source, /Kurashiki|Bikan|Ohara|Ivy Square/);
});

test("all 126 final travel photos render from ASCII-safe files", async () => {
  const response = await render("/travel-log");
  const html = await response.text();
  const imagePaths = [...html.matchAll(/<img[^>]+src="(\/travel-log\/[^"]+\.jpg)"/g)].map((match) => match[1]);
  const uniquePaths = [...new Set(imagePaths)];

  assert.equal(uniquePaths.length, 126);
  for (const path of uniquePaths) assert.match(path, /^\/travel-log\/[a-z0-9-]+\/[a-z0-9-]+\.jpg$/);
  await Promise.all(uniquePaths.map((path) => access(new URL(`public${path}`, projectRoot))));
  assert.match(html, /loading="lazy"/);
  assert.doesNotMatch(html, /PLACEHOLDER|TEMP COVER|TEMP END FRAME/);
});

test("photo essays use repeatable blocks and meal data stays editable", async () => {
  const [pageSource, dataSource, css] = await Promise.all([
    readFile(new URL("../app/travel-log/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/travel-log/trip-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/travel-log/travel-log.module.css", import.meta.url), "utf8"),
  ]);
  assert.match(pageSource, /MAX_PHOTOS_PER_BLOCK = 3/);
  assert.match(pageSource, /buildPhotoBlocks/);
  assert.doesNotMatch(pageSource, /photos\.length === 3/);
  assert.match(pageSource, /loading="lazy"/);
  assert.doesNotMatch(pageSource, /eagerFirst/);
  assert.match(dataSource, /export type MealStop/);
  assert.match(dataSource, /export type ThemeSection/);
  assert.match(dataSource, /tripThemes/);
  assert.doesNotMatch(dataSource, /actualPhotos|photoIds|actualLayouts/);
  const photoEntries = [...dataSource.matchAll(/photo\("(day1|day2|day2-takagi|day3|day4|yadon)", (\d+), \{([\s\S]*?)\n\s*\}\),/g)];
  assert.equal(photoEntries.length, 126);
  assert.equal(new Set(photoEntries.map((entry) => `${entry[1]}-${entry[2]}`)).size, 126);
  for (const [, , , options] of photoEntries) {
    assert.match(options, /alt: "/);
    assert.match(options, /caption: "/);
    assert.match(options, /layout: "(?:wide|portrait|split|collage|panorama)"/);
    assert.match(options, /size: "(?:xs|small|medium|large|full)"/);
    assert.match(options, /group: \d+/);
    assert.match(options, /objectPosition: "/);
  }
  assert.match(dataSource, /photo\("day3", 30, \{[\s\S]*?caption: "호네츠키도리"/);
  assert.match(dataSource, /photo\("day4", 15, \{[\s\S]*?caption: "스시로 점심"/);
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
  assert.match(pageSource, /sizeClassMap: Record<TripPhoto\["size"\], string>/);
  assert.match(pageSource, /data-photo-size=\{photo\.size\}/);
  assert.match(pageSource, /objectPosition: photo\.objectPosition/);
  assert.match(pageSource, /objectFit: photo\.objectFit/);
  assert.match(dataSource, /review: ""/);
  assert.match(css, /photoBlock\[data-count="2"\]/);
  assert.match(css, /photoBlock\[data-count="3"\]/);
  assert.match(css, /\.sizeXs[^}]*--photo-width: 34%/);
  assert.match(css, /\.sizeSmall[^}]*--photo-width: 50%/);
  assert.match(css, /\.sizeMedium[^}]*--photo-width: 68%/);
  assert.match(css, /\.sizeLarge[^}]*--photo-width: 84%/);
  assert.match(css, /\.sizeFull[^}]*--photo-width: 100%/);
  assert.match(css, /photoBlock\[data-count="1"\] > \.photo[^}]*var\(--photo-width\)/s);
  assert.match(css, /photoBlock\[data-count="2"\] > \.photo[^}]*var\(--photo-weight\)/s);
  assert.match(css, /photoBlock\[data-count="3"\][\s\S]*var\(--photo-width\)/);
  assert.match(css, /--photo-mobile-width: 82%/);
});

test("route map provides non-color transport distinctions and actual-route labels", async () => {
  const [mapSource, css] = await Promise.all([
    readFile(new URL("../app/travel-log/RouteMap.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/travel-log/timeline.module.css", import.meta.url), "utf8"),
  ]);
  assert.match(mapSource, /이날의 실제 이동 경로/);
  assert.match(mapSource, /지도 이동수단 범례/);
  assert.match(css, /segmentFerry[^}]*stroke-dasharray/s);
  assert.match(css, /segmentTrain[^}]*stroke-width/s);
  assert.match(css, /legendFERRY/);
  assert.match(css, /segmentShopping[^}]*stroke-dasharray/s);
  assert.match(css, /legendSHOPPING/);
});
