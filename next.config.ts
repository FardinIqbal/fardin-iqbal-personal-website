import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Remove 'output: export' for full-stack Vercel deployment
  // This enables API routes, server actions, and dynamic rendering
  images: {
    // Enable Vercel's image optimization
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  // Enable experimental features
  experimental: {
    // Enable server actions for forms, mutations, etc.
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
