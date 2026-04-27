/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        violet: {
          50:  '#f0eeff',
          100: '#e3deff',
          200: '#ccc4ff',
          300: '#ab9dff',
          400: '#8B7FF5',
          500: '#6B5CE7',
          600: '#5B4FE9',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
        },
        dark: {
          900: '#07070D',
          800: '#0D0D18',
          700: '#12121F',
          600: '#1A1A2E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
        '10xl': ['10rem', { lineHeight: '0.9' }],
        '11xl': ['12rem', { lineHeight: '0.85' }],
      },
      letterSpacing: {
        tightest: '-0.06em',
        tighter: '-0.04em',
        tight: '-0.02em',
      },
    },
  },
  plugins: [],
}
