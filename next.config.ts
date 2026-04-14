import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  allowedDevOrigins: [
    "100.99.133.95",
    "francescos-mac-mini-1",
    "francescos-mac-mini-1.ts.net",
    "*.ts.net",
  ],
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
