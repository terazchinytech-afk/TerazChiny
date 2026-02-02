import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography"; // Importujemy wtyczkę

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Twoje kolory i ustawienia
    },
  },
  plugins: [
    typography, // Używamy zaimportowanej zmiennej
  ],
};

export default config;
