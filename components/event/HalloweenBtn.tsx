import { Box, Button, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';

import { darkMode, lightMode } from '@/styles/theme';

export default function HalloweenBtn() {
  const color3 = useColorModeValue(lightMode.color2, darkMode.color3);

  return (
    <Box
      w="90%"
      h="100%"
      maxW="540px"
      maxH="110px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      background={color3}
      borderRadius="lg"
      boxShadow="md"
    >
      <Button
        background="black"
        color="white"
        w="90%"
        // mb="2rem"
        _hover={{ background: '#ddd', color: 'black' }}
      >
        <NextLink href="/events/할로윈">
          🎃 할로윈 특집 팬아트 보러가기
        </NextLink>
      </Button>
    </Box>
  );
}
