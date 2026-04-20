/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gus-black':  '#000000',
        'gus-dark':   '#111111',
        'gus-gold':   '#bda57b',
        'gus-gold-l': '#d4bc92',
        'gus-green':  '#9abd4c',
        'gus-green-d':'#7a9c38',
      },
      fontFamily: {
        logo:  ['"Great Vibes"', 'cursive'],
        serif: ['"Playfair Display"', 'serif'],
        sans:  ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
