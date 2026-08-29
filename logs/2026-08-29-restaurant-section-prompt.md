# Restaurant section system prompt

User wants a reusable restaurant/meal section added to the travel log before each actual restaurant meal photo set. Requirements:
- preserve all current photo layout/size/group/objectPosition/objectFit edits
- generalize the existing Honetsukidori meal section
- add fields for restaurant name, optional branch/subtitle, location, time, menu, review, meal label
- render only populated fields; do not show TODO placeholders on public page
- allow empty menu/review/location/time while user fills them later
- use the same section style across all restaurant meals
- do not promote snacks/soft-serve/convenience items into restaurant sections unless they correspond to an actual restaurant meal
- no invented restaurant names, branches, locations, menu items, or reviews
- keep current routes/basePath/GitHub Pages/static export intact
- run lint/build/test and deploy to origin/main
