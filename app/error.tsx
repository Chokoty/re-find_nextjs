'use client';

import { Box, Heading } from '@chakra-ui/react';
import Image from 'next/image';
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
        에러가 발생했습니다. - {error.message}
      </Heading>

      <Image
        src={NotFound}
        alt="404-박쥐단"
        width={400}
        height={400}
        unoptimized
      />
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        다시 시도하기
      </button>
    </Box>
  );
}
