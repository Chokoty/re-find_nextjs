import { Box } from '@chakra-ui/react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import React from 'react';

import MainBanner from '@/public/static/images/banners/banner2.webp';

export default function Banner2() {
  return (
    <Box
      maxW="700px"
      borderRadius="1rem"
      boxShadow="md"
      w="100%"
      // maxH="110px"
    >
      <Box maxW="700px" borderRadius="1rem" overflow="hidden" m="0 auto">
        <NextLink href="/more/about">
          <NextImage
            width={700}
            height={130}
            priority
            quality={90}
            src={MainBanner}
            alt="배너2"
            // layout="fill"
            // objectFit="cover"
          />
        </NextLink>
      </Box>
    </Box>
  );
}
