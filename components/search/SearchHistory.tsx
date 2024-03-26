import { DeleteIcon, TimeIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  IconButton,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';

import { useModalStore } from '@/store/modalStore';
import { darkMode, lightMode } from '@/styles/theme';

type Props = {
  recentSearches: string[];
  deleteHistoryKeyword: (value: string) => void;
  deleteHistoryKeywords: () => void;
  close?: () => void;
};

export default function SearchHistory({
  recentSearches,
  deleteHistoryKeyword,
  deleteHistoryKeywords,
  close,
}: Props) {
  const { colorMode } = useColorMode();
  const pathname = usePathname();
  const router = useRouter();
  const color = useColorModeValue(lightMode.color7, darkMode.color9);
  const isSearchPage = pathname === '/search';
  const { setIsOpen } = useModalStore(
    useShallow((state) => ({
      setIsOpen: state.setIsOpen,
    }))
  );

  const modalClose = () => {
    setIsOpen(false);
  };

  const moveSearchResult = (q: string) => {
    if (!isSearchPage) {
      modalClose();
    }
    router.push(`/search?q=${q}`);
  };
  return (
    <Box w="100%" p="1rem">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="1.5rem"
      >
        <Heading pl="0.5rem" as="h5" size="sm">
          최근검색어
        </Heading>
        <Box>
          {isSearchPage && (
            <Button onClick={close} size="xs" background="none">
              <Text color={color} fontSize="13px">
                닫기
              </Text>
            </Button>
          )}
          <Button onClick={deleteHistoryKeywords} size="xs" background="none">
            <Text color={color} fontSize="13px">
              전체 삭제
            </Text>
          </Button>
        </Box>
      </Box>
      {recentSearches.map((q, index) => (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px="0.5rem"
          key={index}
          // _hover={{
          //   background: colorMode === 'dark' ? 'gray.700' : 'gray.100',
          // }}
          borderRadius="0.5rem"
        >
          <Button
            flex="1"
            background="none"
            justifyContent="flex-start"
            onClick={() => moveSearchResult(q)}
          >
            <Box display="flex" flexDir="row" alignItems="center" gap="0.5rem">
              <TimeIcon color={color} />
              <Text textAlign="start">{q}</Text>
            </Box>
          </Button>
          <Box onClick={() => deleteHistoryKeyword(q)}>
            <IconButton
              // colorScheme="#01BFA2"
              aria-label="delete button"
              bg="none"
              color={color}
              variant={'ghost'}
              borderRadius="50%"
              icon={<DeleteIcon />}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
}
