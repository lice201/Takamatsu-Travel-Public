# Restaurant section next step

The next priority is to standardize restaurant/meal sections across the travel log before adding lower-priority features like lightbox or advanced navigation.

Current issue:
- Honetsukidori has a dedicated FOOD section, but restaurant metadata is not consistently represented.
- Other restaurant meal photos are still rendered as ordinary photo groups with captions only.
- The user wants restaurant name, location, ordered menu, and later review text to have a clear visual section.

Recommended structure:
- Use a reusable meal/restaurant section for actual restaurant visits only.
- Keep snacks, soft serve, drinks, and incidental food as normal photos unless they represent a notable venue visit.
- Fields should support: meal label, restaurant name, branch/store name, area/location, ordered menu items, optional visit time, optional review, and photos.
- Do not fabricate unresolved venue names, menu items, or reviews. Empty fields should render as neutral TODO/editable placeholders or be hidden cleanly.
- Preserve current photo order/layout/size/group/objectPosition/objectFit values.
- Existing Honetsukidori and Sushiro meal sections should be migrated to the generalized structure without visual regression.
- Other confirmed restaurant visits can later be migrated once the user supplies/validates venue names and menu data.

Suggested priority after this:
1. Restaurant section system
2. User fills captions/meal details/day summaries
3. Lightbox
4. Day navigation
5. Final responsive/share QA
