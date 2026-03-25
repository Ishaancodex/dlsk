import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#FAF6F0',
          dark: '#F0E6D8',
          darker: '#E8D8C0',
        },
        rose: {
          DEFAULT: '#7C2D3E',
          light: '#A04560',
          pale: '#F5E0E6',
          dark: '#5A1F2D',
        },
        gold: {
          DEFAULT: '#C9A457',
          light: '#E0C882',
          pale: '#F8F0D8',
          dark: '#A8842E',
        },
        ink: {
          DEFAULT: '#1C1410',
          mid: '#5C4230',
          warm: '#8C7060',
          light: '#C0A890',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        cormorant: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        inter: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        fadeUp: 'fadeUp 0.6s ease-out forwards',
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        shimmer: 'shimmer 1.5s infinite',
        float: 'float 3s ease-in-out infinite',
        scaleIn: 'scaleIn 0.4s ease-out forwards',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201, 164, 87, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(201, 164, 87, 0)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      boxShadow: {
        'soft': '0 2px 20px rgba(28, 20, 16, 0.08)',
        'medium': '0 4px 40px rgba(28, 20, 16, 0.12)',
        'strong': '0 8px 60px rgba(28, 20, 16, 0.18)',
        'gold': '0 4px 20px rgba(201, 164, 87, 0.3)',
        'rose': '0 4px 20px rgba(124, 45, 62, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-luxury': 'linear-gradient(135deg, #FAF6F0 0%, #F0E6D8 50%, #E8D8C0 100%)',
        'gradient-rose': 'linear-gradient(135deg, #7C2D3E 0%, #5A1F2D 100%)',
        'gradient-gold': 'linear-gradient(135deg, #C9A457 0%, #A8842E 100%)',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

export default config
