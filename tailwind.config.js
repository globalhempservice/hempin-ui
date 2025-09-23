/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    './playground/**/*.{ts,tsx,html}'
  ],
  theme: {
    extend: {
      colors: {
        brand: '#59f28f'
      }
    },
  },
  plugins: [],
};