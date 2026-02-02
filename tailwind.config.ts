import type { Config } from "tailwindcss";

const config: Config = {
  // ... reszta konfiguracji
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("@tailwindcss/typography"),
  ],
};
export default config;
