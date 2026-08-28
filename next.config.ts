import type { NextConfig } from "next";

const githubPagesBasePath = "/Takamatsu-Travel-Public";
const isGitHubPagesBuild =
  process.env.GITHUB_PAGES === "true" || process.env.npm_lifecycle_event === "build:pages";

const nextConfig: NextConfig = {
  output: isGitHubPagesBuild ? "export" : undefined,
  trailingSlash: isGitHubPagesBuild,
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubPagesBuild ? githubPagesBasePath : "",
  },
};

export default nextConfig;
