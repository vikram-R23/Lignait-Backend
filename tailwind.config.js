/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        orbit1: {
          '0%': { transform: 'rotate(0deg) translateX(110px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(110px) rotate(-360deg)' },
        },
        orbit2: {
          '0%': { transform: 'rotate(120deg) translateX(170px) rotate(-120deg)' },
          '100%': { transform: 'rotate(480deg) translateX(170px) rotate(-480deg)' },
        },
        orbit3: {
          '0%': { transform: 'rotate(240deg) translateX(230px) rotate(-240deg)' },
          '100%': { transform: 'rotate(600deg) translateX(230px) rotate(-600deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      },
      animation: {
        'orbit-1': 'orbit1 8s linear infinite',
        'orbit-2': 'orbit2 12s linear infinite',
        'orbit-3': 'orbit3 16s linear infinite',
        'float': 'float 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}