import { type NextConfig } from "next";

const config: NextConfig = {
  typedRoutes: true,
  experimental: {
    typedEnv: true,
  },
};

export default config;
