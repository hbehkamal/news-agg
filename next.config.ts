import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Allow any protocol (http, https)
        hostname: '**', // Allow any hostname
      },
    ],
  },
};

export default nextConfig;
