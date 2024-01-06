import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
// import { Sling as Hamburger } from 'hamburger-react';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { PiGiftBold } from 'react-icons/pi';
import { RiMenu2Line } from 'react-icons/ri';

// import DarkModeToggle from '@/components/common/DarkModeToggle';
import MyDrawer from '@/components/common/MyDrawer';
import HeaderTab from '@/components/Header/HeaderTab';
import SearchBar from '@/components/search/SearchBar';
import SearchModal from '@/components/search/SearchModal';
import { useResponsive } from '@/hook/useResponsive';
import { useShowShadow } from '@/hook/useShowShadow';
// import { useStore } from '@/store/store';
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
  const color = useColorModeValue(lightMode.color, darkMode.color);
  const color7 = useColorModeValue(lightMode.color, darkMode.color7);
  const bg3 = useColorModeValue(lightMode.bg3, darkMode.bg3);

  // const boxShadowLight =
  //   '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)';
  // const boxShadowDark =
  //   '0px 4px 6px -1px rgba(255, 255, 255, 0.1), 0px 2px 4px -1px rgba(255, 255, 255, 0.06)'; // 다크 모드에서의 그림자

  // const boxShadow = useColorModeValue(boxShadowLight, boxShadowDark);
  // const showShadow = useShowShadow(50, 0);

  // const handleInputClick = () => {
  //   // console.log('handleInputClick');
  //   // if (router.pathname !== '/search') {
  //   //   router.push('/search');
  //   // }
  //   onOpen();
  // };

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
        {!isMobile && <HeaderTab isCurrentPath={isCurrentPath} />}
      </Box>
      <SearchBar onOpen={onOpen} />
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
          <Tooltip label="이벤트관" aria-label="A tooltip">
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
          </Tooltip>
        </NextLink>
        {/* {isMobile && ( */}
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
        {/* )} */}
      </Flex>
      <SearchModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default HeaderComponent;
