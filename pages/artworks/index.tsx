import { Box, Button, Text, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import AlbumGrid from '@/components/artwork/albumGrid';
import gallary from '@/data/gallary';
import members from '@/data/members';
import { useStore } from '@/store/store';
import { darkMode, lightMode } from '@/styles/theme';

const Artworks = () => {
  const setIsOpen = useStore((state) => state.setIsOpen);
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);

  useEffect(() => {
    setIsOpen(false);
    // alert('오픈 예정입니다.');
  }, []);

  return (
    <Box mt="10px" mb="10px" p="1rem" textAlign="center" w="100%">
      <Text as="h2" fontSize="3xl" fontWeight="bold">
        팬아트 갤러리
      </Text>
      <Text fontSize="md">
        왁물원에 올라온 팬아트들을 모아놓은 갤러리입니다.
      </Text>
      <Box
        m="2rem auto"
        w="94%"
        mb="2rem"
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        maxW="540px"
        overflowX="scroll" // 세로 스크롤 적용
        gap="0.5rem"
      >
        {members.map((member, index) => (
          <NextLink key={index} href={`/artworks/${member.value}`}>
            <Button key={index} p="1rem" borderRadius="1rem">
              <Text fontSize="xl" fontWeight="bold" textAlign="left">
                {member.name}
              </Text>
            </Button>
          </NextLink>
        ))}
      </Box>
      <AlbumGrid gallary={gallary} />
    </Box>
  );
};

export default Artworks;
