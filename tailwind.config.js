/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        warm: {
          50: '#faf9f7',
          100: '#f5f3f0',
          200: '#e8e4df',
          300: '#d4cec6',
          400: '#b8b0a4',
          500: '#9c9285',
          600: '#8b7e74',
          700: '#736960',
          800: '#605850',
          900: '#504a44',
          950: '#2a2723',
        },
        desktop: {
          bg: '#2c2c2e',
          surface: '#3a3a3c',
          elevated: '#48484a',
        },
      },
      fontFamily: {
        sans: ['"SF Pro Display"', '"SF Pro"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"SF Mono"', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'window-open': 'windowOpen 0.2s ease-out forwards',
        'window-close': 'windowClose 0.15s ease-in forwards',
        'dock-bounce': 'dockBounce 0.5s ease-in-out',
        'cursor-blink': 'cursorBlink 1s step-end infinite',
        'icon-jiggle': 'iconJiggle 0.3s ease-in-out',
        'fade-in': 'fadeIn 0.2s ease-out forwards',
        'slide-down': 'slideDown 0.15s ease-out forwards',
        'confetti': 'confetti 3s ease-out forwards',
      },
      keyframes: {
        windowOpen: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        windowClose: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
        dockBounce: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '30%': { transform: 'translateY(-20px) scale(1.1)' },
          '50%': { transform: 'translateY(-10px) scale(1.05)' },
          '70%': { transform: 'translateY(-5px) scale(1.02)' },
        },
        cursorBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        iconJiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-3deg)' },
          '75%': { transform: 'rotate(3deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        confetti: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
        },
      },
      boxShadow: {
        'window': '0 22px 70px 4px rgba(0, 0, 0, 0.56), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'dock': '0 0 0 1px rgba(255, 255, 255, 0.2), 0 20px 40px rgba(0, 0, 0, 0.4)',
        'menu': '0 10px 30px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
      },
    },
  },
  plugins: [],
};
