# VS Code local editing setup

User wants to edit the public travel-log repository directly in VS Code with fast visual feedback.

Recommended workflow:

- Open local folder: `Takamatsu-Travel-Public`
- Use VS Code integrated terminal
- Confirm git remotes with `git remote -v` (`origin` should be the public repo, `private` preserves the old private repo)
- Install dependencies once with `npm install` if needed
- Run `npm run dev` for local live preview
- Edit mainly:
  - `app/travel-log/trip-data.ts` for captions, photo ordering, grouping, FOOD text
  - `app/travel-log/travel-log.module.css` for ratios, crop/layout, responsive behavior
- Keep browser and VS Code side-by-side; saving files should trigger fast refresh
- When satisfied, commit and push to `origin/main`; GitHub Pages workflow redeploys the public site

Suggested optional VS Code extensions: GitLens, Prettier, ESLint.
