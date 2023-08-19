import { useColorModeValue } from '@chakra-ui/react';

import { lightMode, darkMode } from '@/styles/theme';

export const Footer = () => {
  const bgColor = useColorModeValue(lightMode.bg, darkMode.bg);
  const color = useColorModeValue(lightMode.footerColor, darkMode.footerColor);

  return (
    <footer style={{ backgroundColor: bgColor, color: color }}>
      <p>ⓒ2023 RE: FIND ALL RIGHTS RESERVED</p>
    </footer>
  );
};
