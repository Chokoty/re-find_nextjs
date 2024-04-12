'use client';

import { Box, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

import ModalSearchBar from '@/components/search/Modal/ModalSearchBar';
import SearchHistory from '@/components/search/SearchHistory';
import { useLocalStorage } from '@/components/search/useLocalStorage';
import useModal from '@/hook/useModal';
import { useResponsive } from '@/hook/useResponsive';
import { darkMode, lightMode } from '@/styles/theme';

export default function SearchModal() {
  const inputRef = useRef<HTMLInputElement>(null);
  const color7 = useColorModeValue(lightMode.color, darkMode.color7);
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const isMobile = useResponsive();
  const {
    recentSearches,
    setRecentSearches,
    addHistoryKeyword,
    deleteHistoryKeyword,
    deleteHistoryKeywords,
  } = useLocalStorage();

  useEffect(() => {
    const searches = localStorage.getItem('recentSearches');
    setRecentSearches(JSON.parse(searches ?? '[]'));
    inputRef.current?.focus();
  }, []);
  const { hide } = useModal();
  const onClose = () => {
    hide();
  };

  return (
    <Box
      zIndex={1000} // modal content > header, overlay보다 위
      position="fixed"
      left="50%"
      transform={`translateX(-50%)`}
      top="0"
      maxW={isMobile ? '100%' : '75%'}
      width="100%"
      overflow="auto"
      overscrollBehaviorY="none"
    >
      <Box
        as="section"
        width="100%"
        my="0"
        boxShadow="none"
        border={`1px solid ${color7}`}
        borderTopRadius={isMobile ? '0' : '1rem'}
        borderBottomRadius="1rem"
        background={bg2}
        p="0 0.5rem"
      >
        <Box
          as="header"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p="2rem 0.5rem"
        >
          <ModalSearchBar
            inputRef={inputRef}
            addHistoryKeyword={addHistoryKeyword}
            onClose={onClose}
          />
        </Box>
        <Box
          pb={6}
          px="0.5rem"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
        >
          <SearchHistory
            recentSearches={recentSearches}
            deleteHistoryKeyword={deleteHistoryKeyword}
            deleteHistoryKeywords={deleteHistoryKeywords}
            modalClose={onClose}
          />
          {/* <OptionContainer /> */}
        </Box>
      </Box>
    </Box>
  );
}
