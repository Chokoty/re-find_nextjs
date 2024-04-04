'use client';

import { Box, Button, Heading, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

import NotFound from '@/public/static/images/404/404-박쥐단.gif';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

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
        이용에 불편을 드려 죄송합니다.
      </Heading>
      <Text>현재 해당 페이지 복구 작업을 진행하고 있습니다. 감사합니다.</Text>
      <Text mb="1rem">에러내용: {error.message}</Text>
      <Image
        src={NotFound}
        alt="404-박쥐단"
        width={400}
        height={400}
        unoptimized
      />

      <Box
        display="flex"
        gap="0.5rem"
        mt="20px"
        justifyContent="center"
        alignItems="center"
      >
        <Link
          href="/"
          style={{
            fontSize: '16px',
            fontWeight: 600,
            padding: '0 16px',
            color: '#01bda1',
          }}
        >
          홈으로
        </Link>
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          다시 시도하기
        </Button>
      </Box>
    </Box>
  );
}
