import {
  Box,
  Button,
  Flex,
  Link,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { PiGiftBold } from 'react-icons/pi';
import { RiMenu2Line } from 'react-icons/ri';

import MyDrawer from '@/components/common/MyDrawer';
import HeaderTab from '@/components/Header/HeaderTab';
import SearchBar from '@/components/search/SearchBar';
import SearchModal from '@/components/search/SearchModal';
import { useResponsive } from '@/hook/useResponsive';
import { darkMode, lightMode } from '@/styles/theme';

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
  const isSearchPage = router.pathname === '/search';
  const isGalleryPage = router.pathname === '/gallery';
  const isAlbumPage = router.pathname.includes('/gallery');

  const isMobile = useResponsive(); // 모바일 환경인지 체크

  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const color = useColorModeValue(lightMode.color, darkMode.color);

  return (
    <Flex
      position={isAlbumPage && !isGalleryPage ? 'static' : 'sticky'}
      zIndex="200"
      as="header"
      h="60px"
      pt="0"
      top="0"
      p="0 1rem"
      alignItems="center"
      justifyContent="space-between"
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
          <HeaderTab isCurrentPath={isCurrentPath} isAlbumPage={isAlbumPage} />
        )}
      </Box>
      {!isSearchPage && <SearchBar onOpen={onOpen} />}
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
