'use client';

import { Box, Heading } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

import ErrorImage from '@/public/static/images/404/404-박쥐단.gif';

export default function NotFound() {
  return (
    <Box
      m="0 auto"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="80vh"
      width="80%"
    >
      <Heading as="h1" size="md" mb="20px">
        404 - 존재하지 않는 페이지입니다.
      </Heading>
      <Link href="/">홈으로 이동하기</Link>
      <Image
        src={ErrorImage}
        alt="404-박쥐단"
        width={400}
        height={400}
        unoptimized
      />
    </Box>
  );
}
