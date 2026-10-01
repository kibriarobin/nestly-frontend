import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "https://nestly-backend.vercel.app/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;