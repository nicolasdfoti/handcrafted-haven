import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias["@public"] = path.join(__dirname, "public");
    return config;
  },
};

export default nextConfig;
