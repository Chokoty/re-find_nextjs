import { Box, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import React, { useEffect } from 'react';

// import HashLoader from 'react-spinners/HashLoader';
import EventFanarts from '@/components/events/EventFanarts';
import SearchLayout from '@/components/layout/search-layout';
import RandomFanart from '@/components/tools/RandomFanart';
import { useStore } from '@/store/store';
import { darkMode, lightMode } from '@/styles/theme';

const data = [
  {
    key: '이세돌이 고른 팬아트',
    title: '이세돌이 고른 팬아트',
    query: '',
  },
  {
    key: '할로윈 팬아트',
    title: '🎃 할로윈 특집 🎃',
    query: '',
  },
  {
    key: '이세돌 2주년 팬아트',
    title: '이세돌 2주년 팬아트',
    query: '',
  },
  {
    key: '이세돌 2주년 팬아트',
    title: '이세돌 2주년 팬아트',
    query: '',
  },
  {
    key: '이세돌 2주년 팬아트',
    title: '이세돌 2주년 팬아트',
    query: '',
  },
  {
    key: '이세돌 2주년 팬아트',
    title: '이세돌 2주년 팬아트',
    query: '',
  },
];

const Artworks = () => {
  const setIsOpen = useStore((state) => state.setIsOpen);
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);

  useEffect(() => {
    setIsOpen(false);
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
        m="0 auto"
        mt="3rem"
        w="94%"
        mb="2rem"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <SimpleGrid
          w={['100%', '90%']}
          minChildWidth={['150px', '200px']} // 모바일에서는 150px, 그 외에서는 200px
          spacing={['0.5rem', '0.75rem']}
          justifyContent="center"
          alignItems="center"
          placeItems="center"
          m="0 auto"
        >
          {data
            .slice()
            .reverse()
            .map((item, index) => (
              <NextLink
                key={index}
                href={`/artworks/${encodeURIComponent(item.key)}`}
              >
                <Box
                  key={index}
                  p="1rem"
                  m={['0', '0.5rem']}
                  mb=" 1rem"
                  w={['158px', '200px']}
                  h={['158px', '200px']}
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-start"
                  alignItems="center"
                  background={bg2}
                  borderRadius="1rem"
                  boxShadow="md"
                >
                  <Text fontSize="xl" fontWeight="bold" textAlign="left">
                    {item.key}
                  </Text>
                </Box>
              </NextLink>
            ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Artworks;
