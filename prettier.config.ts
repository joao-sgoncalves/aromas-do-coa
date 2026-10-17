import type { Config } from "prettier";
import type { PluginOptions as AstroOptions } from "prettier-plugin-astro";
import type { PluginOptions as TailwindOptions } from "prettier-plugin-tailwindcss";

const config: Config & AstroOptions & TailwindOptions = {
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};

export default config;
