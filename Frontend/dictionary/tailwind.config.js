/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        main: ["Poppins"],
      },
      fontSize: {
        xxs: "0.6rem",
      },
      lineHeight: {
        xxs: "0.75rem",
      },
      maxHeight:{
        100:"36rem"
      }
    },
  },
  plugins: [],
};
