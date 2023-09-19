/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'weather-primary': '#000668A',
        'weather-secondary': '#004E71'
      }
    },
    fontFamily: {
      roboto: ['Roboto', 'sans-serif']
    }
  },
  plugins: []
}
