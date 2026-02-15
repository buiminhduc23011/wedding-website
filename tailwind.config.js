/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4CAF50", // Sage Green from invitation
        secondary: "#FFF9C4", // Cream/Yellowish Light background
        accent: "#388E3C", // Darker green for text/buttons
        neutral: "#FAFAFA",
        "text-main": "#333333",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        script: ['Dancing Script', 'cursive'],
      },
      borderRadius: {
        DEFAULT: '16px',
        'xl': '24px',
      }
    },
  },
  plugins: [],
}
