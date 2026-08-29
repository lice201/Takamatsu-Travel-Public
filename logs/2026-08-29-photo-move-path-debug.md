# Photo move path debug

User moved the first DAY 3 photo into the end of DAY 2, but the image stopped loading.

Root cause: the photo helper argument controls the actual asset path. The moved image file still exists as `public/travel-log/day3/day3-01.jpg`, so the data entry must remain `photo("day3", 1, {...})` even if that entry is placed inside DAY 2's `photos` array. Changing it to `photo("day2", 36, {...})` points to a non-existent `public/travel-log/day2/day2-36.jpg` and causes the broken image.

Fix:
- Place the entry in the desired DAY 2 array location.
- Keep source reference as `photo("day3", 1, {...})`.
- Remove the original DAY 3 occurrence if duplication is not desired.
- Caption/layout/size/group can be changed freely; they do not affect the file path.
