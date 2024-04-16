import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    // './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      purple: '#3f3cbb',
      midnight: '#121063',
      metal: '#565584',
      tahiti: '#3ab7bf',
      silver: '#ecebff',
      'bubble-gum': '#ff77e9',
      bermuda: '#78dcca',
    },
    extend: {
      colors: {
        background: 'rgba(var(--background))',
        border: 'rgba(var(--border))',
        card: 'rgba(var(--card))',
        'copy-primary': 'rgba(var(--copy-primary))',
        'copy-secondary': 'rgba(var(--copy-secondary))',
        cta: 'rgba(var(--cta))',
        'cta-active': 'rgba(var(--cta-active))',
        'cta-text': 'rgba(var(--cta-text))',
        brown: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b',
        },
        gray: {
          300: '#e0e0e0',
        },
        hightlight: 'rgba(var(--hightlight))',
        'dashed-border': 'rgba(var(--dashed-border))',
      },
      screens: {
        '2xs': '320px',
        // => @media (min-width: 320px) { ... }
        xs: '375px',
        // => @media (min-width: 375px) { ... }
        sm: '640px',
        // => @media (min-width: 640px) { ... }
        md: '768px',
        // => @media (min-width: 768px) { ... }
        lg: '1024px',
        // => @media (min-width: 1024px) { ... }
        xl: '1280px',
        // => @media (min-width: 1280px) { ... }
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
      boxShadow: {
        wakdoo: '0 2px 4px rgba(105, 80, 48, 0.2)',
      },
      backgroundImage: {},
    },
  },
  plugins: [],
  darkMode: 'class',
};

export default config;
