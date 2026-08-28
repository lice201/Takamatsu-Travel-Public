# Google Timeline JSON inspection

- User provided exported Google Maps Timeline JSON for reconstructing the actual 2026-08-24 to 2026-08-27 Takamatsu trip.
- The file contains semanticSegments with visit, activity, and timelinePath data, including timestamps, coordinates, transport-mode candidates, distances, and Google place IDs.
- The 2026-08-24 to 2026-08-27 range contains enough data to reconstruct the trip as a manual Google-Timeline-style travel log.
- Preliminary findings:
  - 2026-08-24: Korea -> Incheon Airport -> flight -> Takamatsu Airport -> Takamatsu city.
  - 2026-08-25: Takamatsu Port -> ferry -> Shodoshima, including Shodoshima Olive Park area, then return ferry to Takamatsu.
  - 2026-08-26: Timeline shows an additional morning stop at Ritsurin Garden before Kotohira -> Marugame -> Busshozan Onsen, so the actual Day 3 route is richer than the simplified summary.
  - 2026-08-27: Takamatsu city activities -> Takamatsu Airport -> flight -> Incheon -> return home.
- Next step: resolve key visit coordinates/place IDs to human-readable place names, remove low-confidence/duplicate visits, and convert the result into a concise Day 1-4 timeline and map-ready trip-data structure for /travel-log.
