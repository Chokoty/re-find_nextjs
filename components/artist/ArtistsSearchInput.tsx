import {
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { FaSearch } from 'react-icons/fa';

import { darkMode, lightMode } from '@/styles/theme';

type Props = {
  nickname: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ArtistsSearchInput({ nickname, handleSearch }: Props) {
  const bg = useColorModeValue(lightMode.bg, darkMode.bg);
  const bg3 = useColorModeValue(lightMode.bg3, darkMode.bg3);

  return (
    <InputGroup
      display="flex"
      alignItems="center"
      justifyContent="center"
      maxW="400px"
      mb="1rem"
    >
      <Input
        placeholder="왁물원 닉네임"
        focusBorderColor="#01BFA2"
        size="md"
        value={nickname}
        onChange={handleSearch}
        // onKeyDown={handleKeyPress}
        backgroundColor={bg3}
        borderRadius="2rem"
        _hover={{
          backgroundColor: bg,
          borderColor: '#01BFA2',
        }}
        _focus={{ backgroundColor: bg }}
      />
      <InputRightElement pointerEvents="none" mr="1rem">
        <FaSearch
          style={{
            color: '#5C5F6B',
            position: 'relative',
            top: '0.1rem',
            width: '1.2rem',
            height: '1.2rem',
          }}
        />
      </InputRightElement>
    </InputGroup>
  );
}
