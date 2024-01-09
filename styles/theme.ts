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
        backgroundColor: mode('#F5F6FB', '#0D0F1D')(props), // opgg #1C1C1F  hoyo #0D0F1D
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
  bg: '#F5F6FB', // basic #FFFFFF opgg #5383E8 hoyo #F5F6FB
  bg2: '#FFFFFF',
  bg3: '#F1F4F8', // #E1E1E1 opgg #FFFFFF hoyo #F1F4F8
  bg4: '#1B1D2A',
  color: '#1B1642',
  color2: '#FFFFFF', // '#E8EAEC',
  color3: '#E1E1E1',
  footerColor: '#575A7B',
  highlight: '#01bda1',
  badge: '#c1eadf',
  highlight2: '#008080',
  borderBottom: '#f5f6fb',
  snowfall: '#607d8b',
};
export const darkMode = {
  bg: '#0D0F1D', // basic #0F0F0F opgg #1C1C1F hoyo #0D0F1D
  bg2: '#1B1D2A', // hoyo #1B1D2A
  bg3: '#343746', // #303134 opgg #31313C hoyo ##343746
  bg4: '#F5F6FB',
  color: '#E8EAEC',
  color2: '#18181B', // '#1B1642',
  color3: '#292929',
  color4: '#303134',
  color5: '#FFFFFF73',
  color6: '#FFFFFFD9', // #5C5F6B
  color7: '#5C5F6B',
  footerColor: '#ced4da9a',
  highlight: '#EF80B1',
  badge: '#FC719F',
  highlight2: '#FED6D7',
  borderBottom: '#0c0f1d',
  snowfall: '#dee4fd',
};
