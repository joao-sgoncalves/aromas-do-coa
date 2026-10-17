import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";

export default defineConfig({
  files: ["**/*.ts"],
  extends: [
    js.configs.recommended,
    tseslint.configs.recommended,
    astro.configs.recommended,
  ],
});
