import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "next-sitemap.config.js",
    "components/CreativeOperatorSite.tsx",
    "components/PortfolioExperience.tsx",
    "components/layout/Footer.tsx",
    "components/ui/ContactForm.tsx",
    "components/ui/CustomCursor.tsx",
    "components/ui/LiveTicker.tsx",
    "components/ui/Scramble.tsx",
  ]),
]);
