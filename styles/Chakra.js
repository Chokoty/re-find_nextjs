import {
  ChakraProvider,
  cookieStorageManagerSSR,
  localStorageManager,
  withDefaultColorScheme,
} from '@chakra-ui/react';

import theme from './theme';

export function Chakra({ cookies, children }) {
  // b) Pass `colorModeManager` prop
  const colorModeManager =
    typeof cookies === 'string'
      ? cookieStorageManagerSSR(cookies)
      : localStorageManager;

  return (
    <ChakraProvider theme={theme} colorModeManager={colorModeManager}>
      {children}
    </ChakraProvider>
  );
}

// also export a reusable function getServerSideProps
export function getServerSideProps({ req }) {
  let cookies = '';
  try {
    cookies = req.headers.cookie ?? '';
  } catch (error) {
    console.error(error);
  }
  return { props: { cookies } };
}
