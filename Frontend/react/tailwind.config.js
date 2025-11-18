/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
        fontFamily: {
        a1: ['a1'], // fallback ke liye sans-serif
        a2: ['a2'],
        a3:['a3'],
        a4:['a4'],
        a5:['a5'],
        a6:['a6'],
      },
    },
  },
  plugins: [],
}
