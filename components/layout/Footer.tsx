import { Box, useColorModeValue } from '@chakra-ui/react';

import LinkBtns from '@/components/tools/LinkBtn';
import { darkMode, lightMode } from '@/styles/theme';

export const Footer = () => {
  const bgColor = useColorModeValue(lightMode.bg, darkMode.bg);
  const color = useColorModeValue(lightMode.footerColor, darkMode.footerColor);

  return (
    <footer style={{ backgroundColor: bgColor, color }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        w="100%"
      >
        <LinkBtns />
        <p>ⓒ2023 RE: FIND ALL RIGHTS RESERVED</p>
      </Box>
    </footer>
  );
};
