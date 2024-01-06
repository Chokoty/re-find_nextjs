import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { Sling as Hamburger } from 'hamburger-react';
import Image from 'next/image';
import NextLink from 'next/link';
import React, { useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';

import DarkModeToggle from '@/components/common/DarkModeToggle';
import MyDrawer from '@/components/common/MyDrawer';
import SearchModal from '@/components/search/SearchModal';
import { useShowShadow } from '@/hook/useShowShadow';
import { useStore } from '@/store/store';
// import { useThemeStore } from '@/store/themeStore';
import { darkMode, lightMode } from '@/styles/theme';
// import NoticeBanner from '../NoticeBanner';
// import Title from '../Title';

export const MobileHeader = () => {
  // useStore
  // const count = useStore((state) => state.count);
  const [isOpenDrawer, setIsOpenDrawer] = useStore((state) => [
    state.isOpen,
    state.setIsOpen,
  ]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const myDrawerRef = useRef(null);

  const bgColor = useColorModeValue(lightMode.bg, darkMode.bg);
  const color = useColorModeValue(lightMode.color, darkMode.color);
  const searchBgColor = useColorModeValue('#E1E1E1', '#303134');

  const boxShadowLight =
    '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)';
  const boxShadowDark =
    '0px 4px 6px -1px rgba(255, 255, 255, 0.1), 0px 2px 4px -1px rgba(255, 255, 255, 0.06)'; // 다크 모드에서의 그림자

  const boxShadow = useColorModeValue(boxShadowLight, boxShadowDark);
  const showShadow = useShowShadow(50, 0);
  // const showShadow = useShowShadow(50, 50 + 310);

  // useEffect(() => {
  //     setIsObserver(myDrawerRef);
  // }, [myDrawerRef]);

  useEffect(() => {
    if (!isOpenDrawer) {
      return;
    }
    const handleClick = (e) => {
      // console.log(e.target);
      if (
        e.target.className === 'hamburger-react' ||
        e.target.closest('.hamburger-react')
      ) {
        return;
      }
      if (e.target.tagName.toLowerCase() === 'a') {
        console.log('a');
        return; // Return early if the clicked element is an <a> tag
      }
      if (myDrawerRef.current && !myDrawerRef.current.contains(e.target)) {
        // console.log("other");
        setIsOpenDrawer(false);
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [isOpenDrawer]);

  const toggleDrawer = () => {
    setIsOpenDrawer(!isOpenDrawer);
  };

  return (
    <Box
      as="header"
      position="sticky"
      p="10px"
      top="0"
      w="100%"
      zIndex="200"
      h="3rem"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box w="3rem" h="3rem">
        <Button
          w="3rem"
          h="3rem"
          p="0.5rem"
          variant="ghost"
          borderRadius="50%"
          flexShrink={0}
        >
          {/* <NextLink href="/more">
            <FaArrowLeftLong style={{ width: '1.5rem', height: '1.5rem' }} />
          </NextLink> */}
        </Button>
      </Box>
      <Box w="6rem" h="3rem">
        <Heading
          as="h1"
          size="md"
          m="0"
          pt="0.75rem"
          noOfLines={1}
          color={color}
        >
          title
        </Heading>
      </Box>
      <Box w="3rem" h="3rem"></Box>
    </Box>
  );
};
