import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  darkMode: "class",
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",
      blue: "#0827f5",
      green: {
        400: "#4dff4d",
        500: "#1aff1a",
        600: "#00e600",
        700: "#00b300",
      },
      gunmetal: {
        700: "#3e3f4e",
        800: "#2b2c37",
      },
      indigo: "#e4ebfa",
      red: {
        50: "#f871711a",
        400: "#ff9898",
        500: "#f87171",
        600: "#ea5555",
        900: "#ff0000",
      },
      richBlack: "#000112",
      slate: "#828fa3",
      violet: {
        50: "#f4f7fd",
        400: "#a8a4ff",
        600: "#726fcd",
        700: "#635fc7",
        800: "#302e83",
        900: "#201e57",
      },
      yellow: "#ffb81c",
      zinc: "#20212c",
      gradient: "rgba(0, 0, 0, 0.7)",
    },
    fontSize: {
      xl: "1.5rem",
      lg: "1.125rem",
      md: "0.9375rem",
      sm: "0.75rem",
      "body-lg": ["0.8125rem", "1.75"],
      "body-md": "0.75rem",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      zIndex: {
        "100": "100",
      },
    },
  },
  plugins: [],
} satisfies Config;
