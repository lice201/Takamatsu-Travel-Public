# Meal legs and overall review

## BIKE leg placement

- Added `Rojiura → Takamatsu Station` immediately after the DAY 2 Rojiura meal whose final photo is captioned `Sexy한 화로`.
- Added `Takamatsu Station → Round One Stadium Takamatsu` after the Takamatsu Station-area photos and before the Round One photo captioned `마리오카트 전설의 시작`.
- Both rows reuse the existing `Transfer` renderer, including the bicycle icon, `BIKE` mode badge, and route styling.
- Added `TripStop.interstitialLegs` with `insertAt` and optional `order` so transfer rows can be positioned between photo and meal blocks without changing photo data or order.

## Meal overall review

- Added `overallReview?: string` to `MealStop`.
- Added an empty `overallReview` field to all seven current meals so the user can edit reviews directly in `trip-data.ts`.
- `RestaurantSection` renders a full-width, subdued `OVERALL REVIEW` box after the meal photos only when the trimmed value is non-empty.
- Empty values remain completely hidden, including their label and container.
- Updated the restaurant editing guide with field placement, rendering behavior, and an example.

## Preservation checks

- Compared all 121 selected photos before and after the change.
- `caption`, `alt`, `layout`, `size`, `group`, `objectPosition`, and `objectFit` matched for every photo.
- Existing meal order matched exactly, and no photo was duplicated or removed.
- The user's current captions, restaurant names, hero copy, and other local travel-log edits were preserved in the implementation commit.

## Validation

- `npm run lint`: passed with 0 errors and 17 existing `no-img-element` warnings.
- `npm run build`: passed; `/`, `/plan`, and `/travel-log` remained static.
- `npm test`: passed, 6/6 tests.
- `npm run build:pages`: passed with the GitHub Pages basePath.
- `npm run verify:pages`: passed; both BIKE routes, 121 selected photos, and 126 available JPG files were verified. The empty overall-review label was not emitted.
- `git diff --check`: passed.

## Commit

- Implementation commit: `574de6d`
