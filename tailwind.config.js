/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",      // App Router in src
    "./src/pages/**/*.{js,ts,jsx,tsx}",    // Pages in src
    "./src/components/**/*.{js,ts,jsx,tsx}", // Components in src
    "./app/**/*.{js,ts,jsx,tsx}",          // App Router (root)
    "./pages/**/*.{js,ts,jsx,tsx}",        // Pages (root)
    "./components/**/*.{js,ts,jsx,tsx}",   // Components (root)
  ],
  theme: {
    extend: {
      colors: {
        rtgray : {
          50:  '#F9FAFB',
          100: '#F3F4F6',
          200: '#E6E6EA',
          300: '#D3D4D9',
          400: '#9EA1AD',
          500: '#6D707E',
          600: '#4D5261',
          700: '#3A3F4E',
          800: '#222634',
          900: '#141624',
          1000:'#080912'
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    function({ addUtilities }) {
    require('tailwind-scrollbar'),
    require('@tailwindcss/forms');
    }
  ],
};

