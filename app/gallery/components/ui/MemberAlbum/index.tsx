'use client';

import { Box, Text } from '@chakra-ui/react';

import MemberList from './MemberList';

export default function MemberAlbum() {
  return (
    <Box
      w="100%"
      h="100%"
      display="flex"
      flexDir="column"
      gap="30px"
      mt={['30px', '30px', '110px']}
      p="0 2rem"
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-start"
        textAlign="center"
        w="100%"
        h="80px"
      >
        <Text textAlign="left" fontWeight="800" fontSize={['xl', 'xl', '40px']}>
          멤버별 앨범 모아보기
        </Text>
      </Box>
      <MemberList />
    </Box>
  );
}
