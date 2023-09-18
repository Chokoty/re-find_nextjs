import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  InputGroup,
  Input,
  InputLeftElement,
  Flex,
  Button,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { lightMode, darkMode } from '@/styles/theme';
import Link from 'next/link';
import DarkModeToggle from '../DarkModeToggle';
import MyDrawer from '../MyDrawer';
import NoticeBanner from '../NoticeBanner';
import { Sling as Hamburger } from 'hamburger-react';

import { useStore } from '../../store/store';
import { useThemeStore } from '../../store/themeStore';
import { useShowShadow } from '../../hook/useShowShadow';

import Title from '../Title';
import { FaSearch } from 'react-icons/fa';
export const Header = () => {
  // useStore
  // const count = useStore((state) => state.count);
  const [isOpen, setIsOpen] = useStore((state) => [
    state.isOpen,
    state.setIsOpen,
  ]);

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
    if (!isOpen) {
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
        setIsOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box
      position="sticky"
      pt="50px "
      top="-50px"
      zIndex="200"
      boxShadow={showShadow ? boxShadow : 'none'}
      // overflow="hidden"
    >
      <NoticeBanner />

      <Flex
        as="header"
        style={{
          backgroundColor: bgColor,
          color: color,
          padding: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
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
              unoptimized
            />
          </Link>
        </Button>
        {/* <Button w="3rem" h="3rem" p="0.5rem" variant="ghost">
          <Link href="/">
            <Title onTitleClick={null} />
          </Link>
        </Button> */}
        <Box display="flex" justifyContent="center" m="0 1rem" w="70%">
          <InputGroup m="0 1rem">
            <InputLeftElement
              pointerEvents="none"
              display="flex"
              justifyContent="center"
              alignItems="center"
              padding="0.5rem"
            >
              {/* <Image
                alt="logo"
                width={20}
                height={20}
                src="/android-chrome-512x512.png"
                unoptimized
              /> */}
              <FaSearch
                style={{
                  marginTop: '0.3rem',
                  width: '1.2rem',
                  height: '1.2rem',
                  color: color,
                }}
              />
            </InputLeftElement>
            <Input
              placeholder="검색"
              h="3rem"
              borderRadius="3rem"
              border="none"
              bg={searchBgColor}
              alignItems="center"
            />
          </InputGroup>
        </Box>
        <Flex>
          <DarkModeToggle className="dark-mode-toggle" />
          <MyDrawer
            isOpen={isOpen}
            toggleDrawer={toggleDrawer}
            ref={myDrawerRef}
          />
          <Box className="hamburger" w="3rem" flexShrink={0}>
            <Hamburger
              label="펼치기" // An ARIA label to improve accessibility.
              size={24}
              toggled={isOpen}
              toggle={toggleDrawer}
            />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};
