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
    // Allow SVG images
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
