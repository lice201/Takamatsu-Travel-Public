# RestaurantSection expansion

## Existing problem

- The reusable `RestaurantSection` existed, but only the DAY 3 Honetsukidori and DAY 4 Sushiro meals used it.
- The current local `trip-data.ts` was intentionally treated as the source of truth. It selected 121 unique photos while all 126 processed JPG files remained in `public/travel-log`.

## Meal migrations

- DAY 1 / `Merikenya` (`다카마쓰역점`, confirmed by the existing captions): `day1-02`, `day1-03`
- DAY 1 / neutral title `첫날 저녁`: `day1-05` through `day1-11`
- DAY 2 / neutral title `쇼도시마 점심`: `day2-19`
- DAY 2 / neutral title `다카마쓰 귀환 후 저녁`: `day2-28` through `day2-31`
- DAY 3 / neutral title `리쓰린공원 우동`: `day3-09`
- DAY 3 / existing `Honetsukidori`: `day3-30`, `day3-32`, `day3-31`
- DAY 4 / existing `Sushiro`: `day4-15` through `day4-18`

The restaurant names confirmed by existing data are `Merikenya`, `Honetsukidori`, and `Sushiro`. No restaurant name was inferred for the three neutral-title meals.

## Data and rendering

- Added `MealStop.title`, made `restaurantName` optional, and consolidated stops on `meals?: MealStop[]`.
- `RestaurantSection` uses a non-empty `restaurantName` first and falls back to `title`. Empty menu, review, branch, location, and time values remain hidden.
- Added `insertAt` so meal sections can be inserted between the remaining general-photo blocks. This keeps the original page-level photo order even after meal photos move out of `stop.photos`.
- The user's existing `panoramic` layout value was preserved and supported as a layout alias instead of rewriting that photo setting.

## Photo preservation

- Before migration, all 121 selected photo entries were snapshotted.
- After migration, all 121 keys remained unique. `alt`, `caption`, `layout`, `size`, `group`, `objectPosition`, and `objectFit` matched the snapshot for every photo.
- The final GitHub Pages HTML contained the same 121 content photos in the same order as the pre-migration snapshot.
- No meal photo is duplicated in a general `stop.photos` block. No selected photo was lost.

## Validation

- `npm run lint`: passed with 0 errors; 17 pre-existing `no-img-element` warnings.
- `npm run build`: passed; `/`, `/plan`, and `/travel-log` are static.
- `npm test`: passed, 6/6 tests.
- `npm run build:pages`: passed; four routes pre-rendered.
- `npm run verify:pages`: passed; GitHub Pages basePath, 121 selected photos, and 126 available JPG files verified.
- Additional preservation checks: 121/121 photo properties matched; 121/121 rendered-photo order matched; seven RestaurantSection meals confirmed.

## Commit

- Implementation commit: `445dc1a`
