import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  IconButton,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import Link from 'next/link';

type Props = {
  recentSearches: string[];
  deleteHistoryKeyword: (value: string) => void;
  deleteHistoryKeywords: () => void;
};

export default function SearchHistory({
  recentSearches,
  deleteHistoryKeyword,
  deleteHistoryKeywords,
}: Props) {
  const { colorMode } = useColorMode();
  return (
    <Box w="100%" p="1rem" mt="2rem">
      <Box display="flex" justifyContent="space-between" alignItems="center ">
        <Heading pl="0.5rem" mb="1.5rem" as="h5" size="sm">
          최근검색어
        </Heading>
        <Button onClick={deleteHistoryKeywords} size="xs" background="none">
          <Text color="gray.500" fontSize="13px">
            전체 삭제
          </Text>
        </Button>
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
            <Text textAlign="start">{q}</Text>
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
