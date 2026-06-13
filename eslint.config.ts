import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import jestDom from "eslint-plugin-jest-dom";
import testingLibrary from "eslint-plugin-testing-library";

const config = defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  testingLibrary.configs["flat/react"],
  jestDom.configs["flat/recommended"],
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["./", "../"],
              message:
                "Relative imports are not allowed. Use the @/ alias from the project root instead.",
            },
          ],
        },
      ],
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "type"],
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "always",
          warnOnUnassignedImports: true,
        },
      ],
    },
  },
  prettier,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default config;
