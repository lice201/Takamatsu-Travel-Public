# Per-photo manual overrides guide

User identified that the current `actualPhotos()` helper assigns the same caption to all photos in a batch and cycles layouts automatically, making manual editing cumbersome.

Recommended refinement for manual editing:
- keep `actualPhotos()` for compact data entry
- add an optional per-photo override map keyed by numeric photo id
- allow overrides for `caption`, `alt`, `layout`, and `group`
- optionally extend later with `objectPosition` for crop-focus control

Example intended usage:

```ts
photos: actualPhotos(
  "day1",
  photoIds(2, 12),
  "다카마쓰 시내 첫날 저녁",
  "다카마쓰 시내 첫날 저녁",
  {
    2: { caption: "첫날 저녁, 생맥주", layout: "portrait" },
    3: { caption: "나카마쓰 시내 첫날 저녁", layout: "split" },
    4: { caption: "저녁 산책", layout: "wide" },
  },
)
```

This preserves concise batch creation while making individual caption/layout tuning possible in VS Code without expanding every photo into a full object.
