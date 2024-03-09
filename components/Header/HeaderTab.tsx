import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';

import { darkMode, lightMode } from '@/styles/theme';

type Prop = {
  isCurrentPath: (path: string) => boolean;
};

export default function HeaderTab({ isCurrentPath }: Prop) {
  const color5 = useColorModeValue(lightMode.color, darkMode.color5);
  const color6 = useColorModeValue(lightMode.color, darkMode.color6);
  const highlight = useColorModeValue(lightMode.highlight, darkMode.highlight);

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        position="relative"
        w="60px"
        // m="0 1rem"
      >
        <NextLink href="/gallery" passHref>
          <Text
            w="3rem"
            fontWeight="700"
            textAlign="center"
            color={isCurrentPath('/gallery') ? color6 : color5}
            _hover={{
              color: color6,
            }}
          >
            갤러리
          </Text>
        </NextLink>
        {isCurrentPath('/gallery') && (
          <Box
            w="1rem"
            h="0.25rem"
            borderRadius="2px"
            background={highlight}
            position="absolute"
            bottom="-0.5rem"
            opacity="1"
          />
        )}
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        position="relative"
        w="60px"
        p="0 1rem"
      >
        <NextLink href="/artists" passHref>
          <Text
            w="2rem"
            color={isCurrentPath('/artists') ? color6 : color5}
            fontWeight="700"
            _hover={{
              color: color6,
            }}
          >
            작가
          </Text>
        </NextLink>
        {isCurrentPath('/artists') && (
          <Box
            w="1rem"
            h="0.25rem"
            borderRadius="2px"
            background={highlight}
            position="absolute"
            bottom="-0.5rem"
            opacity="1"
          />
        )}
      </Box>
    </>
  );
}
