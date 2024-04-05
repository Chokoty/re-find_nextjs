// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react';
import type { StyleFunctionProps } from '@chakra-ui/styled-system';
import { mode } from '@chakra-ui/theme-tools';

// 2. Add your color mode config
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

// 3. extend the theme
const theme = extendTheme({
  config,
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        backgroundColor: mode('#f8f9fa', '#121212')(props), // opgg #1C1C1F  hoyo #0D0F1D
        color: mode('gray.900', 'gray.50')(props),
      },
      '::selection': {
        background: 'blue.500',
        color: 'white',
      },
    }),
  },
  colors: {
    darkmode: {
      bg: '#121212',
      color: '#E8EAEC',
      footer: '#ced4da9a',
    },
    lightmode: {
      bg: '#f8f9fa',
      color: '#1B1642',
      footer: '#222222',
    },
    myblack: {
      100: '#282828',
      200: '#24292e',
    },
    mainColor: {
      100: '#01bda1',
      200: '#ef5a9a',
    },
  },
});

export default theme;

export const lightMode = {
  bg: '#f8f9fa', // basic #FFFFFF opgg #5383E8 hoyo #F5F6FB
  bg2: '#FFFFFF',
  bg3: '#F1F4F8', // #E1E1E1 opgg #FFFFFF hoyo #F1F4F8
  bg4: '#262424',
  color: '#1B1642',
  color2: '#FFFFFF', // '#E8EAEC',
  color3: '#E1E1E1',
  color7: '#383839',
  color8: '#7b7b7b',
  color9: '#b5b5b5',
  footerColor: '#575A7B',
  highlight: '#01bda1',
  badge: '#c1eadf',
  highlight2: '#008080',
  borderBottom: '#f5f6fb',
  snowfall: '#607d8b',
};
export const darkMode = {
  bg: '#121212', // basic #0F0F0F opgg #1C1C1F hoyo #0D0F1D
  bg2: '#262424', // hoyo #1B1D2A
  bg3: '#434343', // #303134 opgg #31313C hoyo ##343746
  bg4: '#F5F6FB',
  color: '#E8EAEC',
  color2: '#18181B', // '#1B1642',
  color3: '#292929',
  color4: '#303134',
  color5: '#FFFFFF73',
  color6: '#FFFFFFD9', // #5C5F6B
  color7: '#d5d5d5',
  color8: '#8b8b8b',
  color9: '#afafaf',
  footerColor: '#ced4da9a',
  highlight: '#EF80B1',
  badge: '#FC719F',
  highlight2: '#FED6D7',
  borderBottom: '#0c0f1d',
  snowfall: '#dee4fd',
};
