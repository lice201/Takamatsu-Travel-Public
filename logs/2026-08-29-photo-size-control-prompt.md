# Photo size control refactor prompt

User requested a Codex prompt to make per-photo size editing easy across the travel-log.

Direction:
- add a dedicated per-photo `size` field with simple presets such as `xs | small | medium | large | full`
- keep `layout` responsible for aspect/shape and `size` responsible for overall rendered width
- preserve `group`, `objectPosition`, `objectFit`
- update renderer/CSS so per-photo size works even inside 1/2/3-photo blocks without being silently overridden
- migrate all 126 photo entries with explicit initial size values that preserve the current visual output as closely as possible
- extend manual editing guide with size examples
- keep GitHub Pages base path/export behavior unchanged
- validate lint/build/test/static export and push to origin/main
