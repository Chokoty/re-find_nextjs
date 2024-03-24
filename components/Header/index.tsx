'use client';

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
import { usePathname } from 'next/navigation';
import { PiGiftBold } from 'react-icons/pi';
import { RiMenu2Line } from 'react-icons/ri';

import HeaderTab from '@/components/Header/HeaderTab';
import SearchModalOpener from '@/components/search/Modal/SearchModalOpener';
import { useResponsive } from '@/hook/useResponsive';
import { useScroll } from '@/hook/useScroll';
import { darkMode, lightMode } from '@/styles/theme';

export default function Header() {
  const pathname = usePathname();
  const isMorePath = pathname.startsWith('/more');
  const isSearchPage = pathname.startsWith('/search');
  const isGalleryPage = pathname.includes('/gallery');

  const isMobile = useResponsive(); // 모바일 환경인지 체크
  const isScrolling = useScroll(60);

  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const color = useColorModeValue(lightMode.color, darkMode.color);
  // gallery page이면 기본적으로 transparent이지만, 스크롤할 때는 bg2로 변경 하지만, 이외에 page라면 bg2로 고정
  const backgroundColor = isGalleryPage && !isScrolling ? 'transparent' : bg2;

  if (isMorePath) return null;

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
      style={{
        backgroundImage: 'none',
        // backgroundImage: isScrolling
        //   ? 'none' // 스크롤 시에만 그라데이션 배경 적용
        //   : `linear-gradient(90deg, ${bg2} 0%, rgba(0, 0, 0, 0) 50%, ${bg2} 100%)`,
        backgroundColor,
        transition: 'background-color 0.3s, background-image 0.3s',
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
              width={32}
              height={32}
              src="/android-chrome-512x512.png"
            />
          </Link>
        </Button>
        {!isMobile && <HeaderTab />}
      </Box>
      {!isSearchPage && <SearchModalOpener />}
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
        {/* <MyDrawer
          isOpen={isOpenDrawer}
          toggleDrawer={toggleDrawer}
          ref={myDrawerRef}
        /> */}
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
    </Flex>
  );
}
