/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    universalUI: {
      themes: [
        {
          name: "neutral",
          color: "orange"
        },
        {
          name: "error",
          color: "pink"
        }
      ]
    }
  },
  plugins: [require("./src/config/plugin.cjs")]
};
