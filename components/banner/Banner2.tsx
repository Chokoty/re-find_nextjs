import { Box } from '@chakra-ui/react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import React from 'react';

const Banner2 = () => {
  return (
    <Box w="94%" maxW="540px" maxH="110px" borderRadius="lg" boxShadow="md">
      <Box maxW="540px" borderRadius="lg" overflow="hidden" m="0 auto">
        <NextLink href="/more/about">
          <NextImage
            width={540}
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
