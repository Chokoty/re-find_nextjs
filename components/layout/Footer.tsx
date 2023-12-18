import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';

import LinkBtns from '@/components/tools/LinkBtn';
import { darkMode, lightMode } from '@/styles/theme';

export const Footer = () => {
  const bgColor = useColorModeValue(lightMode.bg, darkMode.bg);
  const color = useColorModeValue(lightMode.footerColor, darkMode.footerColor);

  return (
    <footer style={{ backgroundColor: bgColor, color, paddingBottom: '3rem' }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        w="100%"
      >
        <LinkBtns />
        <Box pb="1rem">
          <Text fontSize="md" fontWeight="700" textAlign="left" mb="0.5rem">
            고객센터
          </Text>
          <Text fontSize="sm" textAlign="left">
            팀 리파인드
          </Text>
          <Text fontSize="sm" textAlign="left" mb="1.5rem">
            contact@re-find.xyz
          </Text>
          <Link href="/more/support">
            <Text fontSize="sm" textAlign="left">
              문의 및 지원
            </Text>
          </Link>
        </Box>
        <Box pb="1rem"></Box>
        <Text fontSize="sm" textAlign="center">
          Copyright ⓒ 2023 RE:FIND. All Rights Reserved.
        </Text>
      </Box>
    </footer>
  );
};
