import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button, Input, Text, Box } from '@chakra-ui/react';

const Artists = () => {
  const router = useRouter();
  const [nickname, setNickname] = useState('');

  const handleSearch = () => {
    if (nickname) {
      router.push(`/artists/${nickname}`);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box mt="10px" mb="10px" p="1rem" textAlign="center">
      <Text as="h1">작가 프로필 검색</Text>
      <Box mt="10px" display="flex" flexDirection="column" alignItems="center">
        <Input
          placeholder="왁물원 아이디"
          maxW="400px"
          size="md"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <Button colorScheme="blue" size="md" mt="10px" onClick={handleSearch}>
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default Artists;
