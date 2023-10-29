import { Box } from '@chakra-ui/react';
import NextImage from 'next/image';
import React from 'react';

const Banner2 = () => {
  return (
    <Box mb="40px">
      <NextImage
        width={540}
        height={200}
        src="/static/images/banners/banner2.png"
        alt="배너2"
      />
    </Box>
  );
};

export default Banner2;
