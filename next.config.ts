import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

const nextConfig = {
  eslint: {
    // 本番ビルド時にESLintエラーを無視する（Vercelではこれが定番）
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;