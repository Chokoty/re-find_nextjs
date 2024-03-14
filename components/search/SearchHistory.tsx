import { DeleteIcon, TimeIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  IconButton,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  const isSearchPage = pathname === '/search';
  return (
    <Box w="100%" p="1rem">
      <Box display="flex" justifyContent="space-between" alignItems="center ">
        <Heading pl="0.5rem" mb="1.5rem" as="h5" size="sm">
          최근검색어
        </Heading>
        <Box>
          {isSearchPage && (
            <Button onClick={close} size="xs" background="none">
              <Text color="gray.500" fontSize="13px">
                닫기
              </Text>
            </Button>
          )}
          <Button onClick={deleteHistoryKeywords} size="xs" background="none">
            <Text color="gray.500" fontSize="13px">
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
          _hover={{
            background: colorMode === 'dark' ? 'gray.700' : 'gray.100',
          }}
          borderRadius="0.5rem"
        >
          <Link style={{ flex: 1 }} href={`/search?q=${q}`} prefetch={false}>
            <Box display="flex" flexDir="row" alignItems="center" gap="0.5rem">
              <TimeIcon color="gray.500" />
              <Text textAlign="start">{q}</Text>
            </Box>
          </Link>
          <Box onClick={(e) => deleteHistoryKeyword(q)}>
            <IconButton
              // colorScheme="#01BFA2"
              aria-label="delete button"
              bg="none"
              color="gray.500"
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
