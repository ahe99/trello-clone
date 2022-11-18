/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/stories/**/*.{ts,tsx}",
    "./src/context/*.{ts,tsx}",
  ],
  theme: {
    colors: {
      primary: {
        100: "#f0e6e0",
        200: "#e1cec1",
        300: "#d3b5a1",
        400: "#c49d82",
        500: "#b58463",
        600: "#916a4f",
        700: "#6d4f3b",
        800: "#483528",
        900: "#241a14",
      },
      indigo: {
        100: "#d9d9de",
        200: "#b3b3bc",
        300: "#8c8e9b",
        400: "#666879",
        500: "#404258",
        600: "#333546",
        700: "#262835",
        800: "#1a1a23",
        900: "#0d0d12",
      },
    },
    extend: {},
  },
  plugins: [],
};
