import { defineConfig } from "lint-staged/config";

export default defineConfig({
  "*.{astro,css,html,json,ts}": "pnpm check",
});
