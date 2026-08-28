# Codespaces preview 404

- Existing `app.github.dev` preview returned HTTP 404.
- Conclusion: stale/dead Codespaces preview URL or inactive forwarded port, not necessarily a `/travel-log` code failure.
- Recommended workflow: reopen the repository Codespace, run the dev server, then use the Ports panel's current Open in Browser URL for port 3000 and append `/travel-log`.
- Do not rely on a hardcoded old `app.github.dev` hostname in README because Codespace/port URLs can become invalid after stop/delete/recreate.
- For a permanent public URL, use a deployment target such as GitHub Pages only after verifying static export compatibility with the current vinext/Next structure.
