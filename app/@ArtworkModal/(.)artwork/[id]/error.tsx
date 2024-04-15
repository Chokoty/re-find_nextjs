'use client';

import { Box, Button, Heading, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { ErrorImage } from '@/lib/images';

import { Modal } from './modal';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <Modal>
      <Box
        w="100%"
        h="100%"
        display="flex"
        flexDir="column"
        alignItems="center"
        px="20px"
        py="50px"
      >
        <Heading as="h1" size="md" mb="20px">
          이용에 불편을 드려 죄송합니다.
        </Heading>
        <Box mb="2rem">
          <Text>현재 해당 게시글의 대한 정보가 없습니다.</Text>
          {/* <Text>에러내용: {error.message}</Text> */}
        </Box>
        <Image
          src={ErrorImage}
          alt="404-박쥐단"
          width={400}
          height={400}
          unoptimized
        />

        <Box
          display="flex"
          gap="0.5rem"
          mt="3rem"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            onClick={() => router.back()}
            style={{
              fontSize: '16px',
              fontWeight: 600,
              padding: '0 16px',
              color: '#01bda1',
            }}
          >
            뒤로 가기
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
