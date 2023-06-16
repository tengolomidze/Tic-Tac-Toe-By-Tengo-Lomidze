/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '3': 'repeat(3, 1fr)',
      },
      fontFamily: {
        'VollkornSC': ['Vollkorn SC', 'serif']
      },
      colors: {
        "main": "#d6d6d6",
        "bg": "#2e2e2e",
        "green": "#b4d273",
        "purple": "#9e86c8"
      },
    },
    screens: {
      'phone': '400px',

      'tablet': '640px',

      'laptop': '1024px',

      'desktop': '1280px',
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}
