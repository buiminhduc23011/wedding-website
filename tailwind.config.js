/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#DA8C8C", // Wedding pink
        success: "#16A34A",
        error: "#DC2626",
        standby: "#475569",
        neutral: "#F8FAFC", // Page background
        white: "#FFFFFF",   // Card background
        "text-main": "#333333",
        "text-muted": "#64748B", // Medium gray for subheaders
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        script: ['Pinyon Script', 'cursive'],
        cursive: ['Dancing Script', 'cursive'],
      },
      borderRadius: {
        DEFAULT: '16px',
        'pill': '9999px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
