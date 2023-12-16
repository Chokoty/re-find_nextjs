import { Box } from '@chakra-ui/react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import React from 'react';

const Banner2 = () => {
  return (
    <Box
      maxW="700px"
      borderRadius="lg"
      boxShadow="md"
      // w="94%"
      // maxH="110px"
    >
      <Box maxW="700px" borderRadius="lg" overflow="hidden" m="0 auto">
        <NextLink href="/more/about">
          <NextImage
            width={800}
            height={200}
            src="/static/images/banners/banner2.png"
            alt="배너2"
            // layout="fill"
            // objectFit="cover"
          />
        </NextLink>
      </Box>
    </Box>
  );
};

export default Banner2;
