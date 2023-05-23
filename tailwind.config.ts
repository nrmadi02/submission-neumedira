import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
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
