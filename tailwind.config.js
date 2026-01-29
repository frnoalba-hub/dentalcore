/** @type {import('tailwindcss').Config} */
    module.exports = {
      content: ["./src/**/*.{js,jsx,ts,tsx}"],
      theme: {
        extend: {
          colors: {
            background: '#050505',
            surface: '#121212',
            primary: '#C0C0C0',
            secondary: '#E5E5E5',
            accent: '#00D4FF',
            muted: '#262626',
          },
          animation: {
            'fade-in': 'fadeIn 0.5s ease-out forwards',
          },
          keyframes: {
            fadeIn: {
              '0%': { opacity: '0', transform: 'translateY(10px)' },
              '100%': { opacity: '1', transform: 'translateY(0)' },
            },
          },
        },
      },
      plugins: [],
    }
