import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pesabrand: {
          green: "#0E7C4A",
          dark: "#0B3B2E",
          mint: "#E7F7EF",
        },
      },
    },
  },
  plugins: [],
};

export default config;
