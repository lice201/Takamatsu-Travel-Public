# Map legend internal SVG spacing diagnosis

## User observation
After reducing `.mapLegend` CSS gaps, the legend still looked nearly unchanged and icon/label pairs still appeared too far apart.

## Diagnosis
The remaining visual spacing is likely not mainly the flex `gap`. `ModeIcon.tsx` uses a shared `viewBox="0 0 24 24"`, while several icon drawings occupy only part of that box (for example bus starts at x=4, shopping at x=5, walk is especially narrow). This leaves invisible whitespace inside each SVG element. As a result, even a small CSS `gap` can still look visually large.

## Recommended fix
Limit the next change strictly to map legend presentation:
- keep RouteMap structure unchanged
- make `.mapLegend b` use `gap: 0`
- slightly reduce the legend SVG box and/or use a very small negative/right margin so the visible glyph sits close to its label
- preserve a clear item-to-item column gap
- do not modify transfer `.modeBadge` styling
- verify BUS/WALK/FERRY/BIKE/TRAIN/SHOPPING individually because their SVG visible bounds differ

Suggested initial CSS direction:
```css
.mapLegend b { gap: 0; white-space: nowrap; }
.mapLegend svg {
  width: .9rem;
  height: .9rem;
  margin-right: .08rem;
  flex: none;
}
```
If the visual gap is still large, use a small negative `margin-right` (for example `-.05rem`) only for `.mapLegend svg`, not `.modeBadge svg`.

## Guardrails
Do not change trip data, captions, route map geometry, transfer UI, Lightbox, DAY navigation, RestaurantSection, or user-authored content.
