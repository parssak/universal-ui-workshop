/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    universalUI: {
      themes: [
        // https://uicolors.app/create
        {
          name: "brand",
          colors: {
            50: "#f1f8f4",
            100: "#ddeee3",
            200: "#bdddc9",
            300: "#9ac8af",
            400: "#63a482",
            500: "#428766",
            600: "#306b50",
            700: "#265641",
            800: "#204536",
            900: "#1b392d"
          }
        },
        // {
        //   name: "error",
        //   colors: {
        //     50: "#fff1f2",
        //     100: "#ffe0e1",
        //     200: "#ffc6c8",
        //     300: "#ff9ea2",
        //     400: "#ff676d",
        //     500: "#fc3d45",
        //     600: "#ea1821",
        //     700: "#c51018",
        //     800: "#a31117",
        //     900: "#86161b"
        //   }
        // }
      ]
    }
  },
  plugins: [require("./src/config/plugin.cjs")]
};
