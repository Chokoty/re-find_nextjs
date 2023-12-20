import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Sling as Hamburger } from 'hamburger-react';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { PiGiftBold } from 'react-icons/pi';
import { RiMenu2Line } from 'react-icons/ri';

import DarkModeToggle from '@/components/tools/DarkModeToggle';
import MyDrawer from '@/components/tools/MyDrawer';
import SearchModal from '@/components/tools/SearchModal';
import { useResponsive } from '@/hook/useResponsive';
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
  const router = useRouter();
  const isCurrentPath = (path) => router.pathname === path;

  const isMobile = useResponsive(); // 모바일 환경인지 체크

  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const bg = useColorModeValue(lightMode.bg, darkMode.bg);
  const color = useColorModeValue(lightMode.color, darkMode.color);
  const color5 = useColorModeValue(lightMode.color, darkMode.color5);
  const color6 = useColorModeValue(lightMode.color, darkMode.color6);
  const color7 = useColorModeValue(lightMode.color, darkMode.color7);
  const bg3 = useColorModeValue(lightMode.bg3, darkMode.bg3);
  const highlight = useColorModeValue(lightMode.highlight, darkMode.highlight);

  const boxShadowLight =
    '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)';
  const boxShadowDark =
    '0px 4px 6px -1px rgba(255, 255, 255, 0.1), 0px 2px 4px -1px rgba(255, 255, 255, 0.06)'; // 다크 모드에서의 그림자

  const boxShadow = useColorModeValue(boxShadowLight, boxShadowDark);
  const showShadow = useShowShadow(50, 0);

  const handleInputClick = () => {
    console.log('handleInputClick');
    if (router.pathname !== '/search') {
      router.push('/search');
    }
    onOpen();
  };

  return (
    <Flex
      position="sticky"
      zIndex="200"
      as="header"
      h="60px"
      pt="0"
      top="0"
      p="0 1rem"
      alignItems="center"
      justifyContent="space-between"
      // boxShadow={showShadow ? boxShadow : 'none'}
      style={{
        backgroundColor: bg2,
        color,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button
          w="3rem"
          h="3rem"
          p="0.5rem"
          mr="1rem"
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
        {!isMobile && (
          <>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              position="relative"
              w="60px"
              // m="0 1rem"
            >
              <NextLink href="/artworks" passHref>
                <Text
                  w="2rem"
                  fontWeight="700"
                  color={isCurrentPath('/artworks') ? color6 : color5}
                  _hover={{
                    color: color6,
                  }}
                >
                  작품
                </Text>
              </NextLink>
              {isCurrentPath('/artworks') && (
                <Box
                  w="1rem"
                  h="0.25rem"
                  borderRadius="2px"
                  background={highlight}
                  position="absolute"
                  bottom="-0.5rem"
                  opacity="1"
                />
              )}
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              position="relative"
              w="60px"
              p="0 1rem"
            >
              <NextLink href="/artists" passHref>
                <Text
                  w="2rem"
                  color={isCurrentPath('/artists') ? color6 : color5}
                  fontWeight="700"
                  _hover={{
                    color: color6,
                  }}
                >
                  작가
                </Text>
              </NextLink>
              {isCurrentPath('/artists') && (
                <Box
                  w="1rem"
                  h="0.25rem"
                  borderRadius="2px"
                  background={highlight}
                  position="absolute"
                  bottom="-0.5rem"
                  opacity="1"
                />
              )}
            </Box>
          </>
        )}
      </Box>
      <InputGroup m="0 " w="70%">
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
          onClick={handleInputClick}
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
          pointerEvents="none"
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding="0.5rem"
        >
          <FaSearch
            style={{
              position: 'relative',
              top: '-0.1rem',
              right: '1rem',
              width: '1.2rem',
              height: '1.2rem',
              color: color7,
            }}
          />
        </InputRightElement>
      </InputGroup>
      <Flex>
        {/* <DarkModeToggle className="dark-mode-toggle" /> */}

        {!isMobile && (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            position="relative"
            w="60px"
            p="0 1rem"
          ></Box>
        )}

        <MyDrawer
          isOpen={isOpenDrawer}
          toggleDrawer={toggleDrawer}
          ref={myDrawerRef}
        />
        <NextLink href="/events">
          <Button
            w="3rem"
            h="3rem"
            // m="0 0.5rem"
            p="0"
            borderRadius="50%"
            background="none"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <PiGiftBold
              style={{
                width: '1.5rem',
                height: '1.5rem',
                color,
              }}
            />
          </Button>
        </NextLink>
        <NextLink href="/more">
          <Box
            className="hamburger"
            w="3rem"
            h="3rem"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <RiMenu2Line
              style={{
                width: '1.8rem',
                height: '1.8rem',
                color,
              }}
            />
          </Box>
        </NextLink>
      </Flex>
      <SearchModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default HeaderComponent;
