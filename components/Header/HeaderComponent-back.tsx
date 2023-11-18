import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { Sling as Hamburger } from 'hamburger-react';
import Image from 'next/image';
import NextLink from 'next/link';
import React, { useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';

import DarkModeToggle from '@/components/tools/DarkModeToggle';
import MyDrawer from '@/components/tools/MyDrawer';
import SearchModal from '@/components/tools/SearchModal';
import { useShowShadow } from '@/hook/useShowShadow';
import { useStore } from '@/store/store';
import { darkMode, lightMode } from '@/styles/theme';
// import { useThemeStore } from '@/store/themeStore';

const HeaderComponent = ({
  toggleDrawer,
  isOpenDrawer,
  myDrawerRef,
  isOpen,
  onOpen,
  onClose,
}) => {
  const bgColor = useColorModeValue(lightMode.bg, darkMode.bg);
  const color = useColorModeValue(lightMode.color, darkMode.color);
  const searchBgColor = useColorModeValue('#E1E1E1', '#303134');

  const boxShadowLight =
    '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)';
  const boxShadowDark =
    '0px 4px 6px -1px rgba(255, 255, 255, 0.1), 0px 2px 4px -1px rgba(255, 255, 255, 0.06)'; // 다크 모드에서의 그림자

  const boxShadow = useColorModeValue(boxShadowLight, boxShadowDark);
  const showShadow = useShowShadow(50, 0);

  return (
    <Flex
      position="sticky"
      zIndex="200"
      as="header"
      h="3.6rem"
      pt="0"
      top="0"
      p="0 1rem"
      // pt="50px "
      // top="-50px"
      alignItems="center"
      justifyContent="space-between"
      boxShadow={showShadow ? boxShadow : 'none'}
      style={{
        backgroundColor: bgColor,
        color,
      }}
    >
      <Button
        w="3rem"
        h="3rem"
        p="0.5rem"
        variant="ghost"
        borderRadius="50%"
        flexShrink={0}
      >
        <Link href="/">
          <Image
            alt="logo"
            width={40}
            height={40}
            src="/android-chrome-512x512.png"
            // unoptimized
          />
        </Link>
      </Button>
      <InputGroup m="0 " w="70%">
        <InputLeftElement
          pointerEvents="none"
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding="0.5rem"
        >
          <FaSearch
            style={{
              position: 'relative',
              top: '0.1rem',
              width: '1.2rem',
              height: '1.2rem',
              color,
            }}
          />
        </InputLeftElement>
        <Input
          placeholder="검색"
          h="2.5rem"
          pl="2.5rem"
          borderRadius="2rem"
          border="none"
          bg={searchBgColor}
          alignItems="center"
          onClick={onOpen}
        />
      </InputGroup>
      <Flex>
        <DarkModeToggle className="dark-mode-toggle" />
        <MyDrawer
          isOpen={isOpenDrawer}
          toggleDrawer={toggleDrawer}
          ref={myDrawerRef}
        />
        <Box className="hamburger" w="3rem" flexShrink={0}>
          <Hamburger
            label="펼치기" // An ARIA label to improve accessibility.
            size={24}
            toggled={isOpenDrawer}
            toggle={toggleDrawer}
          />
        </Box>
      </Flex>
      <SearchModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default HeaderComponent;
