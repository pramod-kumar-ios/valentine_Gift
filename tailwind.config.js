/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.15)' },
          '50%': { transform: 'scale(1.1)' },
          '75%': { transform: 'scale(1.25)' },
        },
        // UPDATED: Glow now uses box-shadow for a more "atmospheric" romantic feel
        glow: {
          '0%, 100%': { 
            boxShadow: '0 0 15px rgba(219, 39, 119, 0.4)',
            filter: 'drop-shadow(0 0 5px rgba(219, 39, 119, 0.2))'
          },
          '50%': { 
            boxShadow: '0 0 35px rgba(219, 39, 119, 0.7)',
            filter: 'drop-shadow(0 0 15px rgba(219, 39, 119, 0.5))'
          },
        },
        float: {
          '0%': { transform: 'translateY(110vh) translateX(0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.8' },
          '50%': { transform: 'translateY(50vh) translateX(25px) rotate(15deg)' },
          '100%': { transform: 'translateY(-10vh) translateX(-25px) rotate(-15deg)', opacity: '0' },
        },
        pop: {
          '0%': { transform: 'scale(0.95) translateY(10px)', opacity: '0' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        heartbeat: 'heartbeat 1.5s ease-in-out infinite',
        // UPDATED: Glow duration slightly slowed for a more "breathing" effect
        glow: 'glow 3s ease-in-out infinite',
        float: 'float 15s linear infinite',
        pop: 'pop 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        shimmer: 'shimmer 2.5s infinite',
      },
    },
  },
  plugins: [],
}