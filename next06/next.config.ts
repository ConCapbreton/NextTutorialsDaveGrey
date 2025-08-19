import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here 
  experimental: {
    appDir: true
  },
  */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/ConCapbreton/test-blogposts-nexttut/main/images/**",
      },
    ],
  },
};

export default nextConfig;
