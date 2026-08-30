# Transfer and caption visual polish

## New transfer legs

- Added `Round One Stadium Takamatsu → 숙소` as a `BIKE` transfer after the final Round One result photo and before the late-night lodging snack photo.
- Added `하쿠리타바이 한베 (Hakuri tabai hanbey) → 숙소` as a `WALK` transfer after that meal's overall review and before the convenience-store photo.
- Preserved the existing `Rojiura → Takamatsu Station` and `Takamatsu Station → Round One Stadium Takamatsu` bicycle transfers.
- No address, coordinates, or inferred time were added for the lodging.

## Unknown transfer time

- `LegTime` now returns `null` when both `startTime` and `endTime` are absent.
- When only one endpoint exists, only that confirmed value is shown.
- When both exist, they are shown as `start → end`.
- Confirmed that `TIME —` is absent from source and exported HTML.

## Transfer typography and spacing

- Increased desktop route text to `clamp(1.35rem, 2vw, 2rem)` and mobile route text to `clamp(1.15rem, 5.2vw, 1.45rem)`.
- Enlarged transfer mode labels, icons, and time while retaining route text as the strongest element.
- Removed the fixed `7.5rem` minimum height and reduced the top margin, rail column, gaps, and body padding.
- Added safe wrapping for long route names on narrow screens.

## Review and photo spacing

- Restaurant sections with an overall review receive responsive bottom padding before the next photo or transfer block.
- Desktop spacing uses `clamp(2.25rem, 4.5vw, 4rem)` and mobile spacing uses `clamp(1.75rem, 7vw, 2.75rem)`.

## Polaroid-inspired captions

- Replaced the flat caption treatment with a warm off-white photo surface, subtle border, and soft shadow.
- Added a connected warm caption area with more padding and a readable serif-oriented font stack.
- Kept the existing photo grids, dimensions, layout, size, group, crop, and responsive width rules unchanged.
- The styling is limited to page photo figures and does not change image data.

## Content preservation

- Snapshotted 799 protected content and photo-presentation fields before implementation.
- Before and after SHA-256: `9559ef532d528deb4e36fa3e2424ff2c4d6d62910666a1414bd1503963134402`.
- All protected strings matched, including captions, alt text, restaurant details, menu, review, overall review, summaries, notes, meal titles, Hero, Epilogue, and Theme copy.
- All 121 photo identifiers and their order matched; no image was added or removed.

## Validation

- `npm run lint`: passed with 0 errors and 17 existing `no-img-element` warnings.
- `npm run build`: passed; `/`, `/plan`, and `/travel-log` remained static.
- `npm test`: passed, 6/6 tests.
- `npm run build:pages`: passed; four routes pre-rendered.
- `npm run verify:pages`: passed; basePath, both new transfers, existing transfers, no `TIME —`, 121 selected photos, and 126 available JPG files verified.
- Local preview opened at `http://localhost:3001/`. Automated desktop/mobile browser inspection could not start because the Windows browser-control runtime failed at its sandbox ACL initialization; responsive behavior is covered by source and static-render tests, but this visual inspection was not machine-verified.

## Commit

- Implementation commit: `2fd42d6`
