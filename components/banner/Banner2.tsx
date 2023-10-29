import { Box } from '@chakra-ui/react';
import NextImage from 'next/image';
import React from 'react';

const Banner2 = () => {
  return (
    <Box mb="40px" w="94%">
      <Box maxW="540px" borderRadius="lg" overflow="hidden" m="0 auto">
        <NextImage
          width={540}
          height={200}
          src="/static/images/banners/banner2.png"
          alt="배너2"
        />
      </Box>
    </Box>
  );
};

export default Banner2;
