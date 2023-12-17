import { Box, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import React, { useEffect } from 'react';

// import HashLoader from 'react-spinners/HashLoader';
import EventFanarts from '@/components/events/EventFanarts';
import SearchLayout from '@/components/layout/search-layout';
import RandomFanart from '@/components/tools/RandomFanart';
import { useStore } from '@/store/store';
import { darkMode, lightMode } from '@/styles/theme';

const data = ['이세돌이 고른 팬아트', '할로윈 팬아트', '이세돌 2주년 팬아트'];

const Artworks = () => {
  const setIsOpen = useStore((state) => state.setIsOpen);
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);

  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <SearchLayout title="팬아트 갤러리">
      <Box
        // h="120vh"
        w="94%"
        m="0 auto"
        mb="2rem"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {data
          .slice()
          .reverse()
          .map((item, index) => (
            <NextLink
              key={index}
              href={`/artworks/${encodeURIComponent(item)}`}
            >
              <Box
                key={index}
                m="1rem"
                w="200px"
                h="200px"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                background={bg2}
                borderRadius="1rem"
                boxShadow="md"
              >
                {item}
              </Box>
            </NextLink>
          ))}
      </Box>
    </SearchLayout>
  );
};

export default Artworks;
