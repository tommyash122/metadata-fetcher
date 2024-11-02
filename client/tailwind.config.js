/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-dark': 'rgb(14 12 21 / 0.9)',
      },
    },
  },
  plugins: [],
}