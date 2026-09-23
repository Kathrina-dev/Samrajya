/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'forest-deep': '#173B2F',
        'forest-dark': '#102C23',
        sage: '#71806B',
        olive: '#899078',
        'cream-warm': '#F4EFE3',
        'ivory-soft': '#FAF8F2',
        sand: '#D8CDB8',
        'brown-warm': '#8A7055',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'ui-serif', 'serif'],
        displaySerif: ['DM Serif Display', 'serif'],
        ui: ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
          },
        },
      }),
    },
  },
  plugins: [],
};
