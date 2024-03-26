/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'base-x': 'var(--base-x)',
        base: 'var(--base)',
        'base-m': 'var(--base-m)',
        'base-s': 'var(--base-s)',
        'base-xs': 'var(--base-xs)', //for borders
        'base-xxs': 'var(--base-xxs)', //for borders
        txtPrimary: 'var(--txtPrimary)',
        txtSecondary: 'var(--txtSecondary)',
        icon: 'var(--icon)',
        'primary-light': 'var(--primary-light)',
        primary: 'var(--primary)',
        'primary-shade': 'var(--primary-shade)',
        'primary-dark': 'var(--primary-dark)',
      },
    },
    fontFamily: {
      code: 'Cascadia Code',
    },
    keyframes: ({ theme }) => ({
      wiggle: {
        '0%, 100%': { transform: 'rotate(-3deg)' },
        '50%': { transform: 'rotate(3deg)' },
      },
      shadowPulse: {
        '0%': { boxShadow: `0 0 0 0 ${theme('colors.primary')}`},
        '70%': { boxShadow: '0 0 0 10px rgba(0, 0, 0, 0)'},
        '100%': {boxShadow: '0 0 0 50px rgba(0, 0, 0, 0)'}
      }
    }),
    animation: {
      wiggle: 'wiggle 1s ease-in-out infinite',
      shadowPulse: 'shadowPulse 2s ease-in-out infinite',
    },
    screens: {
      //https://tailwindcss.com/docs/responsive-design
      '2xl': { max: '1535px' },
      // => @media (max-width: 1535px)

      xl: { max: '1279px' },
      // => @media (max-width: 1279px)

      lg: { max: '1024px' },
      // => @media (max-width: 1024px)

      md: { max: '800px' },
      // => @media (max-width: 800px)

      sm: { max: '639px' },
      // => @media (max-width: 639px)
      xs: '430px',
    },
  },
  plugins: [],
};
