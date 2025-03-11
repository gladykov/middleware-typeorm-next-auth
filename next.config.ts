import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  serverExternalPackages: ["typeorm"],
  pageExtensions: ["tsx", "ts", "jsx", "js"],
  experimental: {
    serverMinification: false,
  },

  webpack(config) {
      config.resolve.alias = {
          ...config.resolve.alias,
          typeorm: path.resolve(__dirname, './app/compatible/typeorm.ts'),
      };
    return config;
  },
};

export default nextConfig;
