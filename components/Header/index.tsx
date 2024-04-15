'use client';

import {
  Box,
  Button,
  Flex,
  Link,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { PiGiftBold } from 'react-icons/pi';
import { RiMenu2Line } from 'react-icons/ri';

import SearchModalOpener from '@/app/search/components/Modal/SearchModalOpener';
import DesktopHeaderTab from '@/components/Header/DesktopHeaderTab';
import Modals from '@/components/Modal/Modals';
import { useResponsive } from '@/hooks/useResponsive';
import { useScroll } from '@/hooks/useScroll';
import { darkMode, lightMode } from '@/lib/theme';

export default function Header() {
  const pathname = usePathname();
  const isMorePath = pathname.startsWith('/more');
  const isSearchPage = pathname.startsWith('/search');
  const isGalleryPage = pathname.includes('/gallery');

  const isMobile = useResponsive();
  const isScrolling = useScroll(60);
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const color = useColorModeValue(lightMode.color, darkMode.color);
  // gallery page이면 기본적으로 transparent이지만, 스크롤할 때는 bg2로 변경 하지만, 이외에 page라면 bg2로 고정
  const backgroundColor =
    isGalleryPage && !isScrolling ? 'rgba(0, 0, 0, 0.30)' : bg2;
  const backdropFilter = isGalleryPage && !isScrolling ? 'blur(6px)' : 'none';

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
        backgroundColor,
        backdropFilter,
        transition: 'background-color 0.3s, background-image 0.3s',
        borderBottom:
          isDarkMode || isGalleryPage ? 'none' : '1px solid #ececec',
        color,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box w="3rem" h="3rem" p="0.5rem" mr="1rem" borderRadius="50%">
          <Link href="/">
            <Image
              alt="logo"
              width={32}
              height={32}
              src="/android-chrome-512x512.png"
            />
          </Link>
        </Box>
        {!isMobile && <DesktopHeaderTab />}
      </Box>
      {!isSearchPage && <SearchModalOpener />}
      <Flex>
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
        <Modals />
      </Flex>
    </Flex>
  );
}
