# GitHub Pages Codex Prompt

User requested a Codex prompt to deploy the current Takamatsu travel diary as a permanent GitHub Pages site.

Target URL:
- https://lice201.github.io/Takamatsu-Travel/

Key requirements:
- Use GitHub Pages, not ChatGPT Sites or Codespaces preview.
- Root URL should show the travel diary (current `/travel-log`).
- Preserve existing source structure where practical.
- Verify current vinext/Next setup for static export compatibility before changing config.
- Configure base path / asset prefix for project-site deployment under `/Takamatsu-Travel`.
- Ensure all 126 travel photos and static assets resolve correctly under the Pages subpath.
- Add GitHub Actions Pages deployment workflow.
- Validate lint/build/tests and output paths.
- Keep a deployment log and push changes to `main`.
