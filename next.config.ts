import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.sharepal.in",
        pathname: "/categories/**",
      },
    ],
  },
};

export default nextConfig;
