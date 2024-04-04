'use client';

import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoIosCloseCircle } from 'react-icons/io';
import { useDebounce } from 'react-use';
import { useShallow } from 'zustand/react/shallow';

import { useArtistSearchInfoStore } from '@/store/artistSearchInfoStore';
import { darkMode, lightMode } from '@/styles/theme';

import HelpPopOver from '../search/HelpPopOver';

const helpMessage = '대소문자 구분: 검색은 대소문자를 구분합니다.';

export default function ArtistsSearchInput() {
  const bg = useColorModeValue(lightMode.bg, darkMode.bg);
  const bg3 = useColorModeValue(lightMode.bg3, darkMode.bg3);
  const color7 = useColorModeValue(lightMode.color, darkMode.color7);
  const [input, setInput] = useState('');
  const { setDebounceValue } = useArtistSearchInfoStore(
    useShallow((state) => ({
      setDebounceValue: state.setDebounceValue,
    }))
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleClearInputText = () => {
    setInput('');
  };

  useDebounce(
    () => {
      setDebounceValue(input);
    },
    600,
    [input]
  );

  return (
    <InputGroup
      display="flex"
      alignItems="center"
      justifyContent="center"
      maxW="400px"
      mb="1rem"
    >
      <InputLeftElement w="3rem" pointerEvents="none">
        <FaSearch
          style={{
            color: '#5C5F6B',
            position: 'relative',
            top: '0.1rem',
            width: '1.2rem',
            height: '1.2rem',
          }}
        />
      </InputLeftElement>
      <Input
        pr="50px"
        placeholder="왁물원 닉네임"
        focusBorderColor="#01BFA2"
        size="md"
        value={input}
        onChange={handleSearch}
        // onKeyDown={handleKeyPress}
        backgroundColor={bg3}
        borderWidth="2px"
        borderRadius="2rem"
        _hover={{
          backgroundColor: bg,
          borderColor: '#01BFA2',
        }}
        _focus={{ backgroundColor: bg }}
      />

      <InputRightElement
        w="3rem"
        // mr="0.5rem"
        // pointerEvents="auto"
        // display="flex"
        // justifyContent="flex-end"
        // alignItems="center"
        // padding="0.5rem"
        // _hover={{
        //   cursor: 'default',
        // }}
      >
        {input.length > 0 && (
          <Button
            variant="ghost"
            borderRadius="50%"
            onClick={handleClearInputText}
            p="0"
            _hover={{}}
            _active={{}}
          >
            <IoIosCloseCircle
              style={{
                color: color7,
                width: '20px',
                height: '20px',
              }}
            />
          </Button>
        )}
        {/* {input.length > 0 ? (
          
        ) : (
          <HelpPopOver description={helpMessage} placement="left" />
        )} */}
      </InputRightElement>
    </InputGroup>
  );
}
