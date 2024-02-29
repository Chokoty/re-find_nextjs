import {
  Box,
  Button,
  Flex,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React, { useEffect, useRef } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';

import BackButton from '@/components/common/BackButton';
import { useShowShadow } from '@/hook/useShowShadow';
import { useDrawerStore } from '@/store/drawerStore';
import { darkMode, lightMode } from '@/styles/theme';

export default function MoreHeader({ title, isIndex }) {
  const [isOpenDrawer, setIsOpenDrawer] = useDrawerStore((state) => [
    state.isOpen,
    state.setIsOpen,
  ]);

  const myDrawerRef = useRef(null);

  const bgColor = useColorModeValue(lightMode.bg, darkMode.bg);
  const bgColor2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const color = useColorModeValue(lightMode.color, darkMode.color);

  const boxShadowLight =
    '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)';
  const boxShadowDark =
    '0px 4px 6px -1px rgba(255, 255, 255, 0.1), 0px 2px 4px -1px rgba(255, 255, 255, 0.06)'; // 다크 모드에서의 그림자

  const boxShadow = useColorModeValue(boxShadowLight, boxShadowDark);
  const showShadow = useShowShadow(50, 0);

  useEffect(() => {
    if (!isOpenDrawer) {
      return;
    }
    const handleClick = (e) => {
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
      position="sticky"
      pt="0"
      top="0"
      w="100%"
      zIndex="200"
      boxShadow={showShadow ? boxShadow : 'none'}
    >
      <Flex
        as="header"
        h="60px"
        backgroundColor={bgColor2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box w="3rem" h="3rem" pl="1rem">
          {isIndex ? (
            <Button
              w="3rem"
              h="3rem"
              p="0.5rem"
              variant="ghost"
              borderRadius="50%"
              flexShrink={0}
            >
              <NextLink href="/">
                <FaArrowLeftLong
                  style={{ width: '1.5rem', height: '1.5rem' }}
                />
              </NextLink>
            </Button>
          ) : (
            <BackButton />
          )}
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
            {title}
          </Heading>
        </Box>
        <Box w="3rem" h="3rem"></Box>
      </Flex>
    </Box>
  );
}
