import { useColorModeValue } from '@chakra-ui/react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type Theme = 'light' | 'dark';

type ColorScheme = {
  bg: string;
  color: string;
  color2: string;
  footerColor: string;
  highlight: string;
  badge: string;
  highlight2: string;
};

type ThemeStore = {
  theme: Theme;
  toggleTheme: () => void;
  colors: {
    light: ColorScheme;
    dark: ColorScheme;
  };
};

export const useThemeStore = create<
  ThemeStore,
  [['zustand/devtools', ThemeStore]]
>(
  devtools((set) => ({
    theme: 'light',
    toggleTheme: () =>
      set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light',
      })),
    colors: {
      light: {
        bg: '#FFFFFF',
        color: '#1B1642',
        color2: '#E8EAEC',
        footerColor: '#575A7B',
        highlight: '#01bda1',
        badge: '#c1eadf',
        highlight2: '#008080',
      },
      dark: {
        bg: '#0F0F0F',
        color: '#E8EAEC',
        color2: '#1B1642',
        footerColor: '#ced4da9a',
        highlight: '#ef5a9a',
        badge: '#FC719F',
        highlight2: '#FED6D7',
      },
    },
  }))
);
