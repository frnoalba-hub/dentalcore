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
      },
      borderRadius: {
        card: '2px',
      },
      boxShadow: {
        card: '0 1px 0 rgba(17, 17, 17, 0.06), 0 1px 2px rgba(17, 17, 17, 0.04)',
        'card-hover': '0 6px 20px rgba(17, 17, 17, 0.08), 0 1px 0 rgba(17, 17, 17, 0.06)',
        drawer: '-12px 0 40px rgba(17, 17, 17, 0.12)',
        modal: '0 24px 48px rgba(17, 17, 17, 0.16), 0 2px 8px rgba(17, 17, 17, 0.06)',
      },
    },
  },
  plugins: [],
}