# Individual photo editing refactor prompt

User requested refactoring the travel-log photo data model so photos are no longer managed primarily through grouped `actualPhotos(...)` calls with shared captions and automatic layouts.

Goal:
- make every photo independently editable in `trip-data.ts`
- per-photo caption
- per-photo alt
- per-photo layout
- per-photo group/block placement
- per-photo objectPosition/focal point
- preserve existing 126 photos, current ordering, food/theme structure, GitHub Pages base path, and visual output as much as possible
- keep editing ergonomic for manual VS Code changes
- validate lint/build/tests and Pages-compatible static export

Preferred outcome: explicit `TripPhoto` objects for all currently rendered photos, optionally aided by a small `photo()` helper for path boilerplate only. Avoid hiding captions/layouts inside batch generators.
