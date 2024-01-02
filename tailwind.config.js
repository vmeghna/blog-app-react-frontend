/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        abril: "Abril Fatface",
        raleway: "Raleway",
      },
    },
  },
  daisyui: {
    themes: ["emerald"],
  },
  plugins: [require("daisyui")],
};
