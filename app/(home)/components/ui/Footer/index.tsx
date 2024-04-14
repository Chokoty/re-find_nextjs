import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';

import { darkMode, lightMode } from '@/lib/theme';

import LinkBtns from './LinkBtn';

export default function Footer() {
  const bgColor = useColorModeValue(lightMode.bg, darkMode.bg);
  const color = useColorModeValue(lightMode.footerColor, darkMode.footerColor);
  // const width = useBreakpointValue({ base: '90%', md: '100%' });

  return (
    <footer
      style={{
        backgroundColor: bgColor,
        color,
        paddingBottom: '3rem',
        width: '100%',
        borderRadius: '1rem',
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        borderRadius="1rem"
        // w={width}
        w="100%"
      >
        <LinkBtns />
        <Box w="90%" pb="1rem">
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
            <Text fontSize="sm" textAlign="left" mb="1.5rem">
              문의 및 지원
            </Text>
          </Link>
          <Text fontSize="sm" textAlign="left" w="100%" maxW="310px">
            RE:FIND는 수익 창출을 하지 않으며 왁타버스 구성원과 팬들을 위해
            만들어진 팬메이드 비공식 사이트입니다.
          </Text>
        </Box>
        <Box pb="1rem"></Box>
        <Text fontSize="sm" textAlign="center">
          Copyright &copy; 2023 RE:FIND. All Rights Reserved.
        </Text>
      </Box>
    </footer>
  );
}
