import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = path.join(repositoryRoot, "dist", "client");
const basePath = "/Takamatsu-Travel-Public";

async function readOutput(relativePath) {
  return readFile(path.join(outputRoot, ...relativePath.split("/")), "utf8");
}

async function assertOutputPath(urlPath) {
  const cleanPath = urlPath.split(/[?#]/, 1)[0];
  assert.ok(cleanPath.startsWith(`${basePath}/`) || cleanPath === basePath);
  const relativePath = cleanPath.slice(basePath.length).replace(/^\//, "");
  const outputPath = relativePath.endsWith("/") || relativePath === ""
    ? path.join(outputRoot, relativePath, "index.html")
    : path.join(outputRoot, relativePath);
  await access(outputPath);
}

const [rootHtml, travelLogHtml, planHtml] = await Promise.all([
  readOutput("index.html"),
  readOutput("travel-log/index.html"),
  readOutput("plan/index.html"),
]);

assert.match(rootHtml, /Takamatsu Travel Log/);
assert.match(rootHtml, /THEME \/ TAKAGI-SAN/);
assert.match(rootHtml, /THEME \/ YADON/);
assert.match(rootHtml, /aria-label="DINNER · 호네츠키도리 잇카쿠 마루가메본점"/);
assert.match(rootHtml, /aria-label="LUNCH · Sushiro"/);
assert.match(rootHtml, /aria-label="Rojiura에서 Takamatsu Station까지 BIKE 이동"/);
assert.match(rootHtml, /aria-label="Takamatsu Station에서 Round One Stadium Takamatsu까지 BIKE 이동"/);
assert.match(rootHtml, /aria-label="Round One Stadium Takamatsu에서 숙소까지 BIKE 이동"/);
assert.match(rootHtml, /aria-label="하쿠리타바이 한베 \(Hakuri tabai hanbey\)에서 숙소까지 WALK 이동"/);
assert.ok((rootHtml.match(/OVERALL REVIEW/g) ?? []).length >= 7);
assert.doesNotMatch(rootHtml, /TIME —/);
assert.match(travelLogHtml, /Takamatsu Travel Log/);
assert.match(planHtml, /TRIP NOTE/);

for (const html of [rootHtml, travelLogHtml, planHtml]) {
  assert.doesNotMatch(html, /(?:src|href)="\/(?!Takamatsu-Travel-Public(?:\/|"))/);
  const localUrls = [...html.matchAll(/(?:src|href)="(\/Takamatsu-Travel-Public(?:\/[^"]*)?)"/g)]
    .map((match) => match[1])
    .filter((url) => !url.includes("#"));
  await Promise.all([...new Set(localUrls)].map(assertOutputPath));
}

const photoUrls = [...rootHtml.matchAll(/src="(\/Takamatsu-Travel-Public\/travel-log\/[a-z0-9-]+\/[a-z0-9-]+\.jpg)"/g)]
  .map((match) => match[1]);
const uniquePhotoUrls = [...new Set(photoUrls)];

assert.equal(uniquePhotoUrls.length, 121);
assert.ok(uniquePhotoUrls.includes(`${basePath}/travel-log/day2/day2-03.jpg`));
assert.ok(uniquePhotoUrls.includes(`${basePath}/travel-log/day4/day4-24.jpg`));
await Promise.all(uniquePhotoUrls.map(assertOutputPath));

const photoDirectories = ["day1", "day2", "day2-takagi", "day3", "day4", "yadon"];
const exportedPhotoCount = (
  await Promise.all(photoDirectories.map(async (directory) =>
    (await readdir(path.join(outputRoot, "travel-log", directory))).filter((file) => file.endsWith(".jpg")).length
  ))
).reduce((total, count) => total + count, 0);

assert.equal(exportedPhotoCount, 126);
await access(path.join(outputRoot, ".nojekyll"));

console.log("GitHub Pages export verified: root travel log, /plan, base path assets, 121 selected photos, and 126 available photo files.");
