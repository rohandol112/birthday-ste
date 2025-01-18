/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'drop-in': 'drop-in 1.5s cubic-bezier(.17,.67,.83,.67)',
        'pop': 'pop 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'confetti-fall': 'confetti-fall 3s ease-in-out forwards',
      },
      keyframes: {
        'drop-in': {
          '0%': { 
            opacity: '0',
            transform: 'translateY(-1000px) scale(0.9)',
            filter: 'blur(10px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0) scale(1)',
            filter: 'blur(0)'
          },
        },
        pop: {
          '0%': { transform: 'scale(0)' },
          '90%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'confetti-fall': {
          '0%': { transform: 'translateY(-100vh)', opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}