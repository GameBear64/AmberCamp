/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
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
