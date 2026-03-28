import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    /** Inlines route CSS to reduce render-blocking linked stylesheets (LCP/FCP). */
    inlineCss: true,
    /** Tree-shake lucide-react imports — smaller client bundles. */
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
