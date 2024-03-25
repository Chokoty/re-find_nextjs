'use client';

import { Box, useColorMode, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import { getStaticImage } from '@/lib/getStaticImage';
import { darkMode, lightMode } from '@/styles/theme';

interface TopBackgroundProps {
  children: ReactNode;
}

const TopBackground = ({ children }: TopBackgroundProps) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  const pathname = usePathname().replace('/gallery', '');
  const bgStaticSrc = getStaticImage(pathname.slice(1));
  const imageBackgroundShadow = isDarkMode
    ? 'linear-gradient(180deg, hsl(233deg 38% 8% / 80%), hsl(233deg 38% 8% / 40%) 10.88%, hsl(233deg 38% 8% / 0%) 20.67%, hsl(233deg 38% 8% / 0%) 51.23%, hsl(233deg 38% 8% / 64%) 79.23%, hsl(233 38% 8% / 1) 100.07%)'
    : 'linear-gradient(rgba(245, 246, 251, 0.8), rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 30%, rgb(245, 246, 251) 98.23%, rgb(245, 246, 251) 89.23%, rgb(245, 246, 251) 24.07%)';

  return (
    <Box
      as="section"
      w="100%"
      h="100%"
      maxH="751px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      position="relative"
    >
      <Box
        w="100%"
        // paddingTop="56.25%" // 16:9
        position="relative"
        top="-60px"
        // style={isAlbum ? backgroundStyle2 : backgroundStyle}
        // aspectRatio="16/9"
        aspectRatio="1200/675"
        zIndex="1"
      >
        {/* <Box
          position="relative"
          // top={['-8rem', '-12.5rem', '-16rem']}
          top="100px"
          p={['1rem', '1rem', '2rem']}
          w="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
          textAlign="center"
          zIndex="-1"
        ></Box> */}
        <Image
          src={bgStaticSrc}
          // layout="fill"
          // objectFit="cover"
          // layout="responsive"
          // objectFit="cover"
          alt="Background Image"
          priority
          quality={100}
          width={1920}
          height={1080}
          style={{
            width: '100%',
            maxHeight: '751px',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.5,
          }}
        />
      </Box>
      <Box
        position="absolute"
        width="100%"
        height="100%"
        top="-60px"
        zIndex="2"
        background={imageBackgroundShadow}
      />
      <Box
        w="100%"
        position="absolute"
        top={['2rem', '4rem', '6rem']}
        p={['0 1rem', '0 2rem', '0 2rem']}
        zIndex="2"
      >
        {children}
      </Box>
    </Box>
  );
};

export default TopBackground;
