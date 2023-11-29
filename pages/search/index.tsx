import { Box, Button, Heading, Input, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import SearchLayout from '@/components/layout/search-layout';
import { useStore } from '@/store/store';

const Search = () => {
  const setIsOpen = useStore((state) => state.setIsOpen);

  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query) {
      // router.push(`/artists/${query}`);
    }
    alert('준비중입니다!');
  };
  const handleKeyPress2 = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearchNickname = () => {
    if (nickname) {
      router.push(`/artists/${nickname}`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchNickname();
    }
  };

  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <SearchLayout title="검색">
      <Heading as="h1" size="lg">
        작가 프로필 검색
      </Heading>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="1rem"
        mb="4rem"
      >
        <Input
          placeholder="왁물원 닉네임"
          maxW="400px"
          size="md"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <Button colorScheme="blue" size="md" onClick={handleSearchNickname}>
          Search
        </Button>
      </Box>
      <Heading as="h1" size="lg">
        제목, 키워드, 말머리로 검색
      </Heading>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="1rem"
        mb="4rem"
      >
        <Input
          placeholder="제목, 키워드, 말머리"
          maxW="400px"
          size="md"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress2}
        />
        <Button colorScheme="blue" size="md" onClick={handleSearch}>
          Search
        </Button>
      </Box>
    </SearchLayout>
  );
};

export default Search;
