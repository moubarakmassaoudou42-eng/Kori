import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1B7A3D",
          dark: "#125C2C",
          light: "#E8F5EC",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#F2751A",
          dark: "#D9600A",
          light: "#FFF1E6",
          foreground: "#FFFFFF",
        },
        cream: "#FFFBF5",
        muted: {
          DEFAULT: "#F1F5F0",
          foreground: "#5B6B60",
        },
        foreground: "#1F2A22",
        background: "#FFFBF5",
        border: "#E7E3D8",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        elegant: "0 10px 40px -10px rgba(15, 23, 42, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
