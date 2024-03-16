'use client';

import { Box, useColorModeValue } from '@chakra-ui/react';
import { Suspense } from 'react';

import SearchHeader from '@/components/search/SearchHeader';
import SearchResult from '@/components/search/SearchResult';
import { darkMode, lightMode } from '@/styles/theme';

export default function Search() {
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  return (
    <Box mb="10px" p="1rem" textAlign="center" w="100%" minH="1200px">
      <Box
        m="0 auto"
        maxW="1024px"
        w="100%"
        background={bg2}
        mb="1rem"
        pb="1rem"
        borderRadius="1rem"
        // boxShadow="0px 0px 10px rgba(0, 0, 0, 0.25)"
      >
        <SearchHeader />
        <Suspense>
          <SearchResult />
        </Suspense>
      </Box>
    </Box>
  );
}
