# Per-photo size control refactor

Implementation commit: `427d537`

## Changes

- Added the required `PhotoSize` type: `xs | small | medium | large | full`.
- Kept `layout` responsible for image shape and aspect ratio, while `size` independently controls rendered width.
- Migrated all 126 travel photos to an explicit `size` value.
- Preserved the passport photo as `portrait + medium + contain`.
- Added reusable size CSS variables that work in one-, two-, and three-photo blocks.
- Changed mobile photo blocks to a readable one-column flow with an 82% minimum preset width and preserved portrait/panorama ratios.
- Updated the photo editing guide and regression tests.

## Validation

- `npm run lint`: passed with 0 errors and 17 pre-existing `no-img-element` warnings.
- `npm test`: passed; production build and all 6 tests succeeded.
- `npm run build:pages`: passed; 4 static routes prerendered.
- `npm run verify:pages`: passed; root travel log, `/plan`, base-path assets, and 126 photos verified.
- `git diff --check`: passed.
- In-app browser runtime QA was attempted twice but could not start because the Windows sandbox failed while applying read ACLs. The affected size, block-count, and mobile rules are covered by source and rendered-output tests instead.
