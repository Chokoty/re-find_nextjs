'use client';

import { Box, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import FocusLock from 'react-focus-lock';
import { useShallow } from 'zustand/react/shallow';

import ModalSearchBar from '@/components/search/Modal/ModalSearchBar';
import SearchHistory from '@/components/search/SearchHistory';
import { useLocalStorage } from '@/components/search/useLocalStorage';
import { useResponsive } from '@/hook/useResponsive';
import { useModalStore } from '@/store/modalStore';
import { darkMode, lightMode } from '@/styles/theme';

export default function SearchModal() {
  const inputRef = useRef<HTMLInputElement>(null);
  const color7 = useColorModeValue(lightMode.color, darkMode.color7);
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const isMobile = useResponsive(); // 모바일 환경인지 체크
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
  const { setIsOpen } = useModalStore(
    useShallow((state) => ({
      setIsOpen: state.setIsOpen,
    }))
  );
  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === 'Escape' ? onClose() : null;
    const htmlElement = document.documentElement;
    htmlElement.style.overflowY = 'hidden';
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      htmlElement.style.overflowY = 'scroll';
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [onClose]);

  return (
    // 외부로 tab 키 이동을 막기 위해 FocusLock 사용
    <FocusLock>
      <Box
        zIndex={201} // overlay > header보다 위
        position="fixed"
        left="0"
        top="0"
        width="100%"
        height="100%"
        background="rgba(0 0 0 / 48%)"
        onClick={onClose}
      />
      <Box
        zIndex={1000} // modal content > header, overlay보다 위
        position="fixed"
        left="50%"
        transform={`translateX(-50%)`}
        top="0"
        maxW={isMobile ? '100%' : '75%'}
        width="100%"
        // height="100dvh"
        // display="flex"
        // justifyContent="center"
        // alignItems="flex-start"
        overflow="auto"
        overscrollBehaviorY="none"
      >
        <Box
          as="section"
          width="100%"
          // maxW={['100%', '66%']}
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
            />
            {/* <OptionContainer /> */}
          </Box>
          {/* <ModalFooter
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
        >
          현재 작가닉네임 검색만 가능합니다!
        </ModalFooter> */}
        </Box>
      </Box>
    </FocusLock>
  );
}
