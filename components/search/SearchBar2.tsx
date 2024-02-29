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
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoIosCloseCircle } from 'react-icons/io';

import { useResponsive } from '@/hook/useResponsive';
import { darkMode, lightMode } from '@/styles/theme';

export default function SearchBar2({ isSearchPage }) {
  const isMobile = useResponsive();

  const [input, setInput] = useState(''); // 검색어
  const [isHover, setIsHover] = useState(false);
  const [width, setWidth] = useState(['100%', '90%', '90%']);

  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const color7 = useColorModeValue(lightMode.color, darkMode.color7);
  const bg3 = useColorModeValue(lightMode.bg3, darkMode.bg3);

  const handleInputClick = () => {
    console.log('handleInputClick');
    // handleSearch2();
    // if (input.length > 0) {
    //   router.push(`/search?keyword=${encodeURIComponent(input)}`);
    // }
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleInputClick();
    }
  };

  const handleSearch = (e) => {
    // console.log(e.target.value);
    setInput(e.target.value);
  };

  const handleClear = () => {
    setInput('');
  };

  useEffect(() => {
    if (isSearchPage === true) {
      setWidth(['100%', '80%']);
    }
  }, []);

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
          onChange={handleSearch}
          onClick={handleInputClick}
          onKeyPress={handleEnterKeyPress}
          focusBorderColor="#01BFA2"
          size="md"
          // value={nickname}
          // onChange={handleSearch}
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
            onClick={handleInputClick}
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
          backgroundColor="#7dedda"
          onClick={handleInputClick}
          _hover={{
            backgroundColor: '#01BFA2',
            color: 'white',
          }}
        >
          <Text fontSize="1rem" fontWeight="700" color="#01BFA2">
            검색
          </Text>
        </Button>
      )}
    </Box>
  );
}
