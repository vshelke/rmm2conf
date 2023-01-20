/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#DBD0C0",
        secondary: "#FAEEE0",
        tertiary: "#F9E4C8",
        lighter: "#F9CF93"
      },
    },
  },
  plugins: [],
}
