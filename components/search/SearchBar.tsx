import {
  Box,
  Button,
  Collapse,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoIosCloseCircle } from 'react-icons/io';

import { useResponsive } from '@/hook/useResponsive';
import { darkMode, lightMode } from '@/styles/theme';

import SearchHistory from './SearchHistory';
import { useLocalStorage } from './useLocalStorage';

export default function SearchBar() {
  const isMobile = useResponsive();
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get('q') ?? '';
  const [input, setInput] = useState(q); // 검색어
  const [isHover, setIsHover] = useState(false);
  const {
    recentSearches,
    addHistoryKeyword,
    deleteHistoryKeyword,
    deleteHistoryKeywords,
  } = useLocalStorage();
  const [focused, setFocused] = useState(false);

  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const color7 = useColorModeValue(lightMode.color, darkMode.color7);
  const bg3 = useColorModeValue(lightMode.bg3, darkMode.bg3);

  const handleSearch = () => {
    const trimedInput = input.trim();
    handleCloseSearchHistory();
    if (trimedInput.length > 0) {
      addHistoryKeyword(trimedInput);
    }
    router.push(`/search?q=${encodeURIComponent(trimedInput)}`);
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
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const onBarFocus = () => {
    setFocused(true);
  };

  const handleClear = () => {
    handleCloseSearchHistory();
    setInput('');
  };

  const handleCloseSearchHistory = () => {
    setFocused(false);
  };

  return (
    <Box display="flex" flexDir="column" w="100%">
      <Box
        display="flex"
        justifyContent="flex-start"
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
            placeholder="키워드 검색 (빈 칸은 전체 검색)"
            h="2.25rem"
            pl="3rem"
            pr="100px"
            borderRadius="2rem"
            bg={bg3}
            alignItems="center"
            value={input}
            onChange={onBarChange}
            onKeyDown={onBarKeyDown}
            onFocus={onBarFocus}
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
            height="100%"
            width="auto"
            justifyContent="space-between"
            alignItems="center"
            padding="0.5rem"
            gap="0.5rem"
            marginRight="0.5rem"
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
                height="100%"
                minH="30px"
                minW="30px"
                _hover={{}}
                _active={{}}
              >
                <IoIosCloseCircle
                  style={{
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
              height="100%"
              minH="30px"
              minW="30px"
              _hover={{}}
              _active={{}}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              <FaSearch
                style={{
                  width: '1.2rem',
                  height: '1.2rem',
                  color: isHover ? '#01BFA2' : color7,
                }}
              />
            </Button>
          </InputRightElement>
        </InputGroup>
        {!isMobile && (
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
      <Collapse in={focused} animateOpacity>
        <Box mt="1rem">
          <SearchHistory
            recentSearches={recentSearches}
            deleteHistoryKeyword={deleteHistoryKeyword}
            deleteHistoryKeywords={deleteHistoryKeywords}
            close={handleCloseSearchHistory}
          />
        </Box>
      </Collapse>
    </Box>
  );
}
