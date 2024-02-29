'use client';

import { ChakraProvider } from '@chakra-ui/provider';

import theme from '@/styles/theme';

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
