import { Box } from '@chakra-ui/react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import React from 'react';

const Banner2 = () => {
  return (
    <Box
      w="94%"
      h="90.7px"
      maxW="540px"
      maxH="110px"
      borderRadius="lg"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      boxShadow="md"
    >
      <Box maxW="540px" borderRadius="lg" overflow="hidden" m="0 auto">
        <NextLink href="/about">
          <NextImage
            width={540}
            height={200}
            src="/static/images/banners/banner2.png"
            alt="배너2"
          />
        </NextLink>
      </Box>
    </Box>
  );
};

export default Banner2;
