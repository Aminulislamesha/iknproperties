/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#065e33',
          50: '#f0fdf5',
          100: '#dcfce8',
          200: '#bbf7d1',
          300: '#86efad',
          400: '#4ade80',
          500: '#0a874b',
          600: '#065e33',
          700: '#044c29',
          800: '#033a20',
          900: '#022414',
          950: '#01140b',
        },
        gold: {
          DEFAULT: '#d9a52d',
          50: '#fdfbf2',
          100: '#faf5de',
          200: '#f4e7b4',
          300: '#eed585',
          400: '#e5be4e',
          500: '#d9a52d',
          600: '#b88220',
          700: '#94611a',
          800: '#794c1a',
          900: '#653f19',
        },
        brandDark: '#0a1612',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'Rubik', 'system-ui', 'sans-serif'],
        bengali: ['Hind Siliguri', 'Kalpurush', 'SolaimanLipi', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(6, 94, 51, 0.15)',
        'gold-glow': '0 0 25px rgba(217, 165, 45, 0.3)',
      }
    },
  },
  plugins: [],
}
