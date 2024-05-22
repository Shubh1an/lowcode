/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        refine: {
          '0%': {
            width: '0%',
          },
          '100%': {
            width: '101%',
          },
        },
      },
      animation: {
        'refine-slide': 'refine 2s infinite',
      },
    },
  },
  plugins: [],
};
