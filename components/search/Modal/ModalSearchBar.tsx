import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoIosCloseCircle } from 'react-icons/io';

import { darkMode, lightMode } from '@/styles/theme';

type Prop = {
  addHistoryKeyword: (keyword: string) => void;
};

export default function ModalSearchBar({ addHistoryKeyword }: Prop) {
  const router = useRouter();
  const [input, setInput] = useState(''); // 검색어
  const [isHover, setIsHover] = useState(false);

  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const color7 = useColorModeValue(lightMode.color, darkMode.color7);
  const bg3 = useColorModeValue(lightMode.bg3, darkMode.bg3);

  const handleSearch = () => {
    addHistoryKeyword(input);
    router.push(`/search?q=${encodeURIComponent(input)}`);
  };

  const onBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setInput(query);
  };

  const onSearchButtonClick = () => {
    if (input.length === 0) return;
    handleSearch();
  };

  const onBarKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (input === '' || input.trim() === '') return;
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setInput('');
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap="1rem"
      p="0 1rem"
      w="100%"
      // w={width}
    >
      <InputGroup
        m="0 "
        // w={width}
      >
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
        >
          <span
            style={{
              width: '1px',
              height: '16px',
              marginLeft: '8px',
              background: color7,
              position: 'absolute',
              top: '25%',
              right: '10%',
            }}
          ></span>
        </InputLeftElement>
        <Input
          placeholder="키워드 검색"
          h="2.25rem"
          pl="3rem"
          pr="100px"
          borderRadius="2rem"
          bg={bg3}
          alignItems="center"
          value={input}
          onChange={onBarChange}
          onKeyDown={onBarKeyDown}
          focusBorderColor="#01BFA2"
          size="md"
          _hover={{
            backgroundColor: bg2,
            borderColor: '#01BFA2',
          }}
          _focus={{ backgroundColor: bg2 }}
          sx={{
            'input::placeholder': {
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            },
          }}
        />
        <InputRightElement
          pointerEvents="auto"
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          padding="0.5rem"
          w="5rem"
          _hover={{
            cursor: 'default',
          }}
        >
          {input.length > 0 && (
            <Button
              variant="ghost"
              borderRadius="50%"
              onClick={handleClear}
              p="0"
              _hover={{}}
              _active={{}}
            >
              <IoIosCloseCircle
                style={{
                  position: 'relative',
                  top: '-0.1rem',
                  right: '0.3rem',
                  width: '1.2rem',
                  height: '1.2rem',
                  color: color7,
                }}
              />
            </Button>
          )}
          <Button
            variant="ghost"
            borderRadius="50%"
            onClick={onSearchButtonClick}
            p="0"
            _hover={{}}
            _active={{}}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <FaSearch
              style={{
                position: 'relative',
                top: '-0.1rem',
                right: '0.3rem',
                width: '1.2rem',
                height: '1.2rem',
                color: isHover ? '#01BFA2' : color7,
              }}
            />
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
}
