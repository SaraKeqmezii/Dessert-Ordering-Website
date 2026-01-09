export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#e8a0b5',
        secondary: '#c17a8e',
        accent: '#f9e4d4',
        dark: '#5c3a45',
        light: '#fff5f7',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
