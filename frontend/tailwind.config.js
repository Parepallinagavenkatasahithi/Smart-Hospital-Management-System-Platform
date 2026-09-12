/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        health: {
          ivory: '#F8F7F3',
          charcoal: '#202320',
          olive: '#66705A',
          sage: '#DDE5D8',
          terracotta: '#A86A50',
          gold: '#B28A45',
          red: '#B85C56',
          gray: '#ECEBE6',
        },
        brand: {
          50: '#f4f6f3',
          100: '#dde5d8',
          200: '#becdb5',
          300: '#9cb08f',
          400: '#7c946e',
          500: '#66705a',
          600: '#525b48',
          700: '#404738',
          800: '#30342a',
          900: '#202320',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
