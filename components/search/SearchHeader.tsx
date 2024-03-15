'use client';

import { Box, useColorModeValue } from '@chakra-ui/react';
import { Suspense, useEffect, useState } from 'react';

import { darkMode, lightMode } from '@/styles/theme';

import OptionContainer from './OptionContainer';
import SearchBar from './SearchBar';

export default function SearchHeader() {
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (scrollTop > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const top = isScrolled ? '60px' : '76px';

  return (
    <Box
      background={bg2}
      position="sticky"
      pt="1rem"
      top={top}
      w="100%"
      h="100%"
      zIndex="200"
      borderRadius="1rem"
    >
      <Suspense>
        <SearchBar />
        <OptionContainer />
      </Suspense>
    </Box>
  );
}
