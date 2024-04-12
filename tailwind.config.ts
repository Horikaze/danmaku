import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#2F3136",
        hover: "#5e6165",
        tsecond: "#d8d8d8",
        primary: "#36393F",
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
};
export default config;
