import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

console.log("NEXT_PUBLIC_GITHUB_PAT in next.config.ts:", process.env.NEXT_PUBLIC_GITHUB_PAT);

export default nextConfig;
