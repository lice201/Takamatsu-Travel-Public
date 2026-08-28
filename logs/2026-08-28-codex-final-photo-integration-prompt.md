# Codex final photo integration prompt

- Final selected photo ZIP is treated as authoritative; do not perform another aggressive cull.
- Final counts: Day 1 12, Day 2 general 35, Takagi-san theme 6, Day 3 35, Day 4 24, Yadon theme 14; total 126.
- Next implementation goal: connect the selected photos to `/travel-log`, replacing placeholders while preserving the existing photo essay design.
- Day 2 Takagi-san remains an inline theme section within Day 2.
- Yadon theme should be rendered after all Day 1–4 itinerary content as a trip-wide bonus/theme gallery, not inside Day 4.
- Existing FOOD sections for Honetsukidori and Sushiro should receive actual food photos while leaving menus/reviews user-editable unless confirmed.
- Keep lazy loading, explicit dimensions/aspect ratios, responsive layout, and existing accessibility/reduced-motion behavior.
- Add images under `public/travel-log/...` with stable, ASCII-safe filenames and update `trip-data.ts` to reference them.
- Do not modify `/` or publish Sites publicly in this step.
