/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  options: {
    safelist: [/(border|bg|text)-(.*)-(\\d{1}0{1,2})/],
  },
};
