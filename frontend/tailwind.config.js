/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Open Sans', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
}
