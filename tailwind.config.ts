import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        aegean: {
          50: "#eef9ff",
          100: "#d9f1ff",
          500: "#1689d8",
          600: "#0870bb",
          700: "#075b98",
          800: "#0b4774",
          900: "#0c3658",
          950: "#06243d"
        },
        sunset: "#f27d52",
        sand: "#f7f5f0"
      },
      boxShadow: {
        card: "0 18px 50px rgba(6, 36, 61, 0.08)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-manrope)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
