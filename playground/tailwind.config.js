/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{ts,tsx}",
      "./components/**/*.{ts,tsx}",
      // ALSO watch the library during dev:
      "../src/**/*.{ts,tsx}"
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };