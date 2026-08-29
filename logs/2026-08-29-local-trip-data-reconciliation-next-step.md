# Local trip-data reconciliation — next step

After the reusable Restaurant / Meal Section deployment, the public GitHub Pages build is healthy at 126 unique photos. However, the user's local uncommitted `app/travel-log/trip-data.ts` currently contains only 121 `photo()` calls and at least one unfinished `panoramic` layout value.

Recommended next step before any new feature work:

1. Compare the local uncommitted `trip-data.ts` against the deployed `main` version.
2. Preserve all user-authored caption/layout/size/group/objectPosition/objectFit edits.
3. Identify exactly which 5 photo references are missing or were moved/duplicated; do not guess.
4. Reconcile back to 126 unique photos total.
5. Replace invalid/incomplete `panoramic` values with the valid layout value only after verifying user intent (likely `panorama` if that is the intended existing type).
6. Run lint/build/test and static export verification before committing.
7. Only after the local diff is clean and validated should it be committed and pushed to `origin/main`.

The Restaurant / Meal Section itself is considered complete and deployed; this reconciliation is a local-content integrity task, not a restaurant-system regression fix.
