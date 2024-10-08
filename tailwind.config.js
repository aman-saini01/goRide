/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'lora': ['Lora', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'opensans': ['Open Sans', 'sans-serif'],
        'worksans': ['Work Sans', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
        'sourcesans': ['Source Sans Pro', 'sans-serif'],
        'lilita': ['Lilita One', 'sans-serif'],
      },
      backgroundImage:{
        'roadBg':"url('/src/assets/roadBg.png')"
      },
    },
  },
  plugins: [],
}

