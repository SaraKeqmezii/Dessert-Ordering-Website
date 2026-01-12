export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D4A574',
        secondary: '#5D4037',
        accent: '#FFF8E7',
        dark: '#3E2723',
        light: '#FFFAF0',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
