import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Menu photos are uploaded at runtime, so they cannot be part of the
  // build-time image optimizer cache.
  images: { unoptimized: true },
  experimental: {
    // Required so the sandboxed preview (different origin) can load dev assets.
    allowedDevOrigins: ["*.e2b.app"],
  },
};

export default nextConfig;
