/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brightstar: {
          blue: '#2D4BFF',
          orange: '#FF8C00',
          purple: '#B57EDC',
          yellow: '#FFD700',
          slate: '#5E6B7C',
          navy: '#1a237e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
