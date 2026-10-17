import { defineConfig } from "lint-staged/config";

export default defineConfig({
  "*.{astro,css,html,json,md,ts,yaml}": "pnpm run format",
});
