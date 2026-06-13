import { type Configuration } from "lint-staged";

const config: Configuration = {
  "*.{css,json,md,ts,tsx,yaml}": "pnpm format:check",
  "*.{ts,tsx}": "pnpm lint",
};

export default config;
