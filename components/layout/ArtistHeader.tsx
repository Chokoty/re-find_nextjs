import {
  Box,
  Button,
  Flex,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';

import { darkMode, lightMode } from '@/styles/theme';

export const ArtistHeader = ({ title }) => {
  const bgColor = useColorModeValue(lightMode.bg, darkMode.bg);
  const color = useColorModeValue(lightMode.color, darkMode.color);

  return (
    <Box>
      <Flex
        style={{
          backgroundColor: bgColor,
          color,
          padding: '0.5rem 1rem',
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
            <NextLink href="/artists">
              <FaArrowLeftLong style={{ width: '1.5rem', height: '1.5rem' }} />
            </NextLink>
          </Button>
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
};
