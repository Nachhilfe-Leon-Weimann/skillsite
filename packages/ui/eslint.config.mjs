import { defineConfig } from "eslint/config";

import config from "@skillsite/config/eslint/next.mjs";

export default defineConfig([
  ...config,
  {
    rules: {
      // Library package: there is no app router/pages directory to link into.
      "@next/next/no-html-link-for-pages": "off",
    },
  },
]);
