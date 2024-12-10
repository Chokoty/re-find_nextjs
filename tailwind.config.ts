import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    // './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xxs: '320px',
      // => @media (min-width: 320px) { ... }
      xs: '375px',
      // => @media (min-width: 375px) { ... }
      '2xs': '478px',
      // => @media (min-width: 478px) { ... }
      sm: '640px',
      // => @media (min-width: 640px) { ... }
      md: '768px',
      // => @media (min-width: 768px) { ... } // isMobile
      '2md': '992px',
      // => @media (min-width: 992px) { ... }
      lg: '1024px',
      // => @media (min-width: 1024px) { ... }
      xl: '1280px',
      // => @media (min-width: 1280px) { ... }
      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: 'var(--black)',
      white: 'var(--white)',
      purple: 'var(--purple)',
      midnight: 'var(--midnight)',
      metal: 'var(--metal)',
      tahiti: 'var(--tahiti)',
      silver: 'var(--silver)',
      'bubble-gum': 'var(--bubble-gum)',
      bermuda: 'var(--bermuda)',
    },
    extend: {
      textShadow: {
        worldCup:
          '-1px 0 #000000, 0 1px #000000, 1px 0 #000000, 0 -1px #000000',
      },
      colors: {
        'custom-dark': '#17181C',
        // border: 'var(--border)',
        // background color
        'dark-background': 'var(--darkmode-bg)',
        'light-background': 'var(--lightmode-bg)',
        // card color (white mode is bg-white)
        'dark-card': 'var(--darkmode-card-bg)',
        // footer color (white mode is bg-white)
        'dark-footer': 'var(--darkmode-footer-bg)',
        // hightlight color
        'green-highlight': 'var(--mainColor-100)',
        'pink-highlight': 'var(--mainColor-200)',
        whiteAlpha: {
          50: 'var(--whiteAlpha-50)',
          100: 'var(--whiteAlpha-100)',
          200: 'var(--whiteAlpha-200)',
          300: 'var(--whiteAlpha-300)',
          400: 'var(--whiteAlpha-400)',
          500: 'var(--whiteAlpha-500)',
          600: 'var(--whiteAlpha-600)',
          700: 'var(--whiteAlpha-700)',
          800: 'var(--whiteAlpha-800)',
          900: 'var(--whiteAlpha-900)',
        },
        blackAlpha: {
          50: 'var(--blackAlpha-50)',
          100: 'var(--blackAlpha-100)',
          200: 'var(--blackAlpha-200)',
          300: 'var(--blackAlpha-300)',
          400: 'var(--blackAlpha-400)',
          500: 'var(--blackAlpha-500)',
          600: 'var(--blackAlpha-600)',
          700: 'var(--blackAlpha-700)',
          800: 'var(--blackAlpha-800)',
          900: 'var(--blackAlpha-900)',
        },
        redAlpha: {
          200: 'var(--redAlpha-200)',
          300: 'var(--redAlpha-300)',
        },
        yellowAlpha: {
          200: 'var(--yellowAlpha-200)',
          300: 'var(--yellowAlpha-300)',
        },
        orangeAlpha: {
          200: 'var(--orangeAlpha-200)',
          300: 'var(--orangeAlpha-300)',
        },
        greenAlpha: {
          200: 'var(--greenAlpha-200)',
          300: 'var(--greenAlpha-300)',
        },
        tealAlpha: {
          200: 'var(--tealAlpha-200)',
          300: 'var(--tealAlpha-300)',
        },
        blueAlpha: {
          200: 'var(--blueAlpha-200)',
          300: 'var(--blueAlpha-300)',
        },
        cyanAlpha: {
          200: 'var(--cyanAlpha-200)',
          300: 'var(--cyanAlpha-300)',
        },
        purpleAlpha: {
          200: 'var(--purpleAlpha-200)',
          300: 'var(--purpleAlpha-300)',
        },
        pinkAlpha: {
          200: 'var(--pinkAlpha-200)',
          300: 'var(--pinkAlpha-300)',
        },
        black: {
          200: 'var(--black-200)',
        },
        gray: {
          50: 'var(--gray-50)',
          100: 'var(--gray-100)',
          125: 'var(--gray-125)',
          150: 'var(--gray-150)',
          200: 'var(--gray-200)',
          300: 'var(--gray-300)',
          400: 'var(--gray-400)',
          500: 'var(--gray-500)',
          600: 'var(--gray-600)',
          700: 'var(--gray-700)',
          800: 'var(--gray-800)',
          900: 'var(--gray-900)',
        },
        red: {
          50: 'var(--red-50)',
          100: 'var(--red-100)',
          200: 'var(--red-200)',
          300: 'var(--red-300)',
          400: 'var(--red-400)',
          500: 'var(--red-500)',
          600: 'var(--red-600)',
          700: 'var(--red-700)',
          800: 'var(--red-800)',
          900: 'var(--red-900)',
        },
        orange: {
          50: 'var(--orange-50)',
          100: 'var(--orange-100)',
          200: 'var(--orange-200)',
          300: 'var(--orange-300)',
          400: 'var(--orange-400)',
          500: 'var(--orange-500)',
          600: 'var(--orange-600)',
          700: 'var(--orange-700)',
          800: 'var(--orange-800)',
          900: 'var(--orange-900)',
        },
        yellow: {
          50: 'var(--yellow-50)',
          100: 'var(--yellow-100)',
          200: 'var(--yellow-200)',
          300: 'var(--yellow-300)',
          400: 'var(--yellow-400)',
          500: 'var(--yellow-500)',
          600: 'var(--yellow-600)',
          700: 'var(--yellow-700)',
          800: 'var(--yellow-800)',
          900: 'var(--yellow-900)',
        },
        green: {
          50: 'var(--green-50)',
          100: 'var(--green-100)',
          200: 'var(--green-200)',
          300: 'var(--green-300)',
          400: 'var(--green-400)',
          500: 'var(--green-500)',
          600: 'var(--green-600)',
          700: 'var(--green-700)',
          800: 'var(--green-800)',
          900: 'var(--green-900)',
        },
        teal: {
          50: 'var(--teal-50)',
          75: 'var(--teal-75)',
          100: 'var(--teal-100)',
          200: 'var(--teal-200)',
          300: 'var(--teal-300)',
          400: 'var(--teal-400)',
          500: 'var(--teal-500)',
          600: 'var(--teal-600)',
          700: 'var(--teal-700)',
          800: 'var(--teal-800)',
          900: 'var(--teal-900)',
        },
        blue: {
          50: 'var(--blue-50)',
          100: 'var(--blue-100)',
          200: 'var(--blue-200)',
          300: 'var(--blue-300)',
          400: 'var(--blue-400)',
          500: 'var(--blue-500)',
          600: 'var(--blue-600)',
          700: 'var(--blue-700)',
          800: 'var(--blue-800)',
          900: 'var(--blue-900)',
        },
        cyan: {
          50: 'var(--cyan-50)',
          100: 'var(--cyan-100)',
          200: 'var(--cyan-200)',
          300: 'var(--cyan-300)',
          400: 'var(--cyan-400)',
          500: 'var(--cyan-500)',
          600: 'var(--cyan-600)',
          700: 'var(--cyan-700)',
          800: 'var(--cyan-800)',
          900: 'var(--cyan-900)',
        },
        purple: {
          50: 'var(--purple-50)',
          100: 'var(--purple-100)',
          200: 'var(--purple-200)',
          300: 'var(--purple-300)',
          400: 'var(--purple-400)',
          500: 'var(--purple-500)',
          600: 'var(--purple-600)',
          700: 'var(--purple-700)',
          800: 'var(--purple-800)',
          900: 'var(--purple-900)',
        },
        pink: {
          50: 'var(--pink-50)',
          100: 'var(--pink-100)',
          200: 'var(--pink-200)',
          300: 'var(--pink-300)',
          400: 'var(--pink-400)',
          500: 'var(--pink-500)',
          600: 'var(--pink-600)',
          700: 'var(--pink-700)',
          800: 'var(--pink-800)',
          900: 'var(--pink-900)',
        },
      },
      borderWidth: {
        base: '1px',
      },
      objectPosition: {
        'center-top': 'center top',
      },
      boxShadow: {
        wakdoo: '0 2px 4px rgba(105, 80, 48, 0.2)',
        cardBox: '0 8px 20px 0 rgba(0,0,0,.08)',
        img: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
        base: '0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: 'rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 5px 10px,rgba(0, 0, 0, 0.4) 0px 15px 40px',
        navTop: '0 2px 4px 0 hsla(0,0%,80.8%,.5)',
        navTopDark: '0 2px 6px 0 hsl(0deg 0.17% 44.65% / 31%)',
        navBottom: '0 -2px 4px 0 rgba(33,37,41,.08)',
      },
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(236px, 1fr))',
      },
      keyframes: {
        modalRenderFromBottom: {
          '0%': { opacity: '0', transform: 'translateY(100%)' }, // 최하단으로부터 시작
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        modalRenderFromTop: {
          '0%': { opacity: '0', transform: 'translateY(-100%)' }, // 최상단으로부터 시작
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        modalRender: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        modalRemove: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(0.75rem)' },
        },
        modalRemoveFromTop: {
          '0%': { opacity: '1', transform: 'translateY(0)' }, // 최상단으로 끝
          '100%': { opacity: '0', transform: 'translateY(-100%)' },
        },
      },
      animation: {
        modalRender: 'modalRender 0.2s ease-out',
        modalRenderFromTop: 'modalRenderFromTop 0.3s ease-out',
        modalRenderFromBottom: 'modalRenderFromBottom 0.3s ease-out',
        modalRemove: 'modalRemove 0.2s ease-out',
        modalRemoveFromTop: 'modalRemoveFromTop 0.3s ease-out',
      },
      fontFamily: {
        pop: ['var(--font-one-mobile-pop)'],
      },
      backgroundImage: {},
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      );
    }),
  ],
  darkMode: 'class',
  // important: true,
};

export default config;
