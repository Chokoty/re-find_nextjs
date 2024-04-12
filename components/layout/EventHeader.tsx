'use client';

import {
  Box,
  Button,
  Flex,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FaArrowLeftLong } from 'react-icons/fa6';

import { darkMode, lightMode } from '@/styles/theme';

type Prop = { title: string };

export default function GalleryHeader({ title }: Prop) {
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
          <Button
            w="3rem"
            h="3rem"
            p="0.5rem"
            variant="ghost"
            borderRadius="50%"
            flexShrink={0}
          >
            <NextLink href="/events">
              <FaArrowLeftLong style={{ width: '1.5rem', height: '1.5rem' }} />
            </NextLink>
          </Button>
          {/* <BackButton /> */}
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
