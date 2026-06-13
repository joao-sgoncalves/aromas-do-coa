import { type Config } from "prettier";
import { type PluginOptions as TailwindOptions } from "prettier-plugin-tailwindcss";

const config: Config & TailwindOptions = {
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
