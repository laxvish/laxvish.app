import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicitly pin Turbopack root so local worktrees don't trigger root inference issues.
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
