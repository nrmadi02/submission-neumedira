import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xxl: "1600px",
      sm: "640px",

      md: "768px",

      lg: "1024px",

      xl: "1280px",

      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        Inter: "'Inter', sans-serif",
      },
      backgroundImage: {
        login: "url('/assets/images/login.svg')",
      },
      colors: {
        primary: "#4D4D4D",
        second: "#ABABAB",
      },
    },
  },
  plugins: [],
} satisfies Config;
