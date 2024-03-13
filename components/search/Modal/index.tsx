'use client';

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
} from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { darkMode, lightMode } from '@/styles/theme';

import SearchHistory from '../SearchHistory';
import { useLocalStorage } from '../useLocalStorage';
import ModalSearchBar from './ModalSearchBar';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SearchModal({ isOpen, onClose }: Props) {
  // modal
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const pathname = usePathname();

  // color
  const color7 = useColorModeValue(lightMode.color, darkMode.color7);
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const {
    recentSearches,
    setRecentSearches,
    addHistoryKeyword,
    deleteHistoryKeyword,
    deleteHistoryKeywords,
  } = useLocalStorage();
  const searchBgColor = useColorModeValue('#E1E1E1', '#303134');

  useEffect(() => {
    if (!isOpen) return;
    const searches = localStorage.getItem('recentSearches');
    setRecentSearches(JSON.parse(searches ?? '[]'));
  }, [isOpen]);

  useEffect(() => {
    if (pathname === '/search') {
      onClose();
    }
  }, [pathname, onClose]);

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay zIndex={150} />
      <ModalContent
        maxW={['100%', '80%', '70%']}
        // maxW={['100%', '66%']}
        mt={0}
        boxShadow="none"
        border={`1px solid ${color7}`}
        borderRadius="1rem"
        background={bg2}
        p="0 0.5rem"
      >
        <ModalHeader
          display="flex"
          justifyContent="center"
          alignItems="center"
          pl={1}
          pr={1}
        >
          <ModalSearchBar addHistoryKeyword={addHistoryKeyword} />
        </ModalHeader>
        <ModalBody
          pb={6}
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
        </ModalBody>
        {/* <ModalFooter
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
        >
          현재 작가닉네임 검색만 가능합니다!
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
}
