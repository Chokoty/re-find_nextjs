import { Box, Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';

const HalloweenBtn = () => {
  return (
    <Button
      background="black"
      color="white"
      mb="2rem"
      _hover={{ background: '#ddd', color: 'black' }}
    >
      <NextLink href="/events/할로윈">🎃 할로윈 특집 팬아트 보러가기</NextLink>
    </Button>
  );
};

export default HalloweenBtn;
