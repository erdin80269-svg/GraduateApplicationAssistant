import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/GraduateApplicationAssistant',
  assetPrefix: '/GraduateApplicationAssistant',
};

export default nextConfig;
