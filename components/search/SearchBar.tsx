import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoIosCloseCircle } from 'react-icons/io';

import { useResponsive } from '@/hook/useResponsive';
import { darkMode, lightMode } from '@/styles/theme';

export default function SearchBar() {
  const isMobile = useResponsive();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get('q') ?? '';
  const [input, setInput] = useState(q); // 검색어
  const [isHover, setIsHover] = useState(false);

  const isSearchPage = pathname === '/search';
  const width = isSearchPage ? ['100%', '80%'] : ['100%', '90%', '90%'];

  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const color7 = useColorModeValue(lightMode.color, darkMode.color7);
  const bg3 = useColorModeValue(lightMode.bg3, darkMode.bg3);

  const onBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setInput(query);
  };

  const onSearchButtonClick = () => {
    if (input.length === 0) return;
    router.push(`/search?q=${encodeURIComponent(input)}`);
  };

  const onBarKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(`/search?q=${encodeURIComponent(input)}`);
    }
  };

  const handleClear = () => {
    setInput('');
  };

  useEffect(() => {
    if (!q) return;
    console.log('useEffect', q);
  }, [q]);

  return (
    <Box
      display="flex"
      justifyContent={isSearchPage === true ? 'flex-start' : 'center'}
      alignItems="center"
      gap="1rem"
      p="0 1rem"
      w={width}
    >
      <InputGroup m="0 " w={width}>
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
      {isSearchPage && !isMobile && (
        <Button
          // colorScheme="green"
          borderRadius="2rem"
          p="0 1.25rem"
          minW="4rem"
          h="36px"
          backgroundColor="#21e7ca"
          color="#1a202c"
          onClick={onSearchButtonClick}
          _hover={{
            backgroundColor: '#64f3de',
            // color: 'white',
          }}
        >
          검색
        </Button>
      )}
    </Box>
  );
}
