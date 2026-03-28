/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        accent: '#0047FF',
        brand: {
          900: '#111111',
          100: '#FDFDFD',
          border: '#E5E5E5'
        }
      }
    },
  },
  plugins: [],
}