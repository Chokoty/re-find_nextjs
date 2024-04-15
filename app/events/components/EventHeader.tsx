'use client';

import { Box, Flex, Heading, useColorModeValue } from '@chakra-ui/react';

import BackButton from '@/components/Button/BackButton';
import { darkMode, lightMode } from '@/lib/theme';

type Prop = { title: string };

export default function EventHeader({ title }: Prop) {
  const bgColor2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const color = useColorModeValue(lightMode.color, darkMode.color);

  return (
    <Box
      position="sticky"
      pt="0"
      // top="60px
      top="0"
      w="100%"
      h="60px"
      zIndex="200"
    >
      <Flex
        as="header"
        h="100%"
        style={{
          backgroundColor: bgColor2,
          color,
          padding: '0 1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box w="3rem" h="3rem">
          <BackButton />
        </Box>
        <Box w="16rem" h="3rem">
          <Heading
            as="h1"
            size="md"
            m="0"
            pt="0.75rem"
            noOfLines={1}
            color={color}
          >
            {title}
          </Heading>
        </Box>
        <Box w="3rem" h="3rem"></Box>
      </Flex>
    </Box>
  );
}
