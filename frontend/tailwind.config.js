/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F8F7FC',  // Background
          100: '#EDE9FE', // Lavender
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6', // Light Violet
          600: '#7C3AED',
          700: '#6D28D9', // Primary Violet
          800: '#5B21B6',
          900: '#4C1D95', // Deep Purple
          950: '#2E1065',
        },
        text: {
          dark: '#1F1B2D', // Dark Text
          muted: '#6B6475', // Secondary Text
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(109, 40, 217, 0.1), 0 2px 4px -1px rgba(109, 40, 217, 0.06)',
      }
    },
  },
  plugins: [],
}
