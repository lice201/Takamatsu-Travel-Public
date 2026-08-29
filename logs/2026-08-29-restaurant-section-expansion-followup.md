# Restaurant Section Expansion Follow-up

- Correction: the first Restaurant / Meal Section pass only migrated Honetsukidori and Sushiro.
- Remaining meal photo groups shown by the user still render as ordinary photos and need explicit `meal` sections.
- Next task: promote actual meal groups (e.g. first-day udon, first-day yakitori/beer, Shodoshima meal, return-day meat dinner, plus any other clearly identifiable meals) into reusable RestaurantSection blocks.
- Preserve all user-edited photo properties: order, caption, layout, size, group, objectPosition, objectFit.
- Unknown restaurant names/branch/menu/review/location must not be fabricated; sections may render with a generic meal title/label until the user fills metadata.
- Public TODO placeholders must remain hidden.
