# Final photo integration — 2026-08-28

## Source set

- Source archive: `다카마쓰 여행.zip`
- SHA-256: `6D207BADD8BE8ABAA13F77BFECE0B1F006711F7714B304B41A8A2AB8747C000B`
- Final source count: 126 photos
- The original archive and extracted originals were not modified or deleted.
- No exact binary duplicates were found in the selected set.

## Public assets

All site assets use ASCII-safe JPEG paths under `public/travel-log/`:

| Folder | Count | Placement |
| --- | ---: | --- |
| `day1/` | 12 | First arrival, Takamatsu city, first evening |
| `day2/` | 35 | Port and ferry, Tonosho, Olive Park, Shodoshima, return and evening |
| `day2-takagi/` | 6 | Independent `THEME / TAKAGI-SAN` collection inside DAY 2 |
| `day3/` | 35 | Stay, Ritsurin, train, Kotohira, Marugame, Honetsukidori, Busshozan |
| `day4/` | 24 | City shopping, Sushiro, Yume Town purchases, airport and flight |
| `yadon/` | 14 | Trip-wide `THEME / YADON` collection after DAY 4 |

The 126 source images were ordered using EXIF `DateTimeOriginal` where available, normalized for EXIF orientation, resized to a maximum long edge of 2400 px, and exported as JPEG quality 88. The web derivatives total about 101 MB; the original archive remains untouched.

## Page integration

- Unique travel photos rendered: 126.
- Hero: `public/travel-log/day2/day2-03.jpg`, a wide Seto Inland Sea / ferry view.
- Epilogue: `public/travel-log/day4/day4-24.jpg`, the final flight / Seto Inland Sea view.
- Hero and Epilogue reuse existing DAY images and are not counted twice.
- DAY 2 has a dedicated Takagi-san collection and no additional map pin.
- The Yadon collection appears after DAY 4 and before the Epilogue, outside all day itineraries and without a map pin.
- Honetsukidori uses DAY 3 photos 30–32 in the existing dinner section.
- Sushiro uses DAY 4 photos 15–18 in the existing lunch section.
- Real photos omit `placeholder` and `replacementNote`, so no placeholder badge is rendered.
- Every content photo except the Hero keeps `loading="lazy"`, `decoding="async"`, and explicit dimensions.

## Remaining TODO

- Add the ordered menu and the traveller's own 1–2 line review for Honetsukidori.
- Add the ordered menu and the traveller's own 1–2 line review for Sushiro.
- Fill the trip-wide kilometre statistic after route-distance verification.

No menus, reviews, or subjective travel impressions were invented.

## Verification

- `npm run lint`: passed.
- `npm test`: passed, including the production build and 6 server-render tests.
- Tests verify 126 unique ASCII-safe travel photo URLs, backing file existence, lazy loading, theme ordering, FOOD images, and absence of placeholder badges.
- In-app browser visual QA could not start because the Windows browser-control process was blocked by an environment ACL. Production build and SSR HTML checks completed successfully instead.
- Sites deployment was intentionally not run.
