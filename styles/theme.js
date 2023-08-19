// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react';
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
    global: (props) => ({
      body: {
        backgroundColor: mode('#FFFFFF', '#0F0F0F')(props),
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
      bg: '#0F0F0F',
      color: '#E8EAEC',
      footer: '#ced4da9a',
    },
    lightmode: {
      bg: '#FFFFFF',
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
  bg: '#FFFFFF',
  color: '#1B1642',
  color2: '#E8EAEC',
  footerColor: '#575A7B',
  highlight: '#01bda1',
  badge: '#c1eadf',
  highlight2: '#008080',
};
export const darkMode = {
  bg: '#0F0F0F',
  color: '#E8EAEC',
  color2: '#18181B', //'#1B1642',
  footerColor: '#ced4da9a',
  highlight: '#ef5a9a',
  badge: '#FC719F',
  highlight2: '#FED6D7',
};
