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
    ? 'linear-gradient(180deg, rgba(18, 18, 18, 0.5) 51.43%, #121212 100%),linear-gradient(75deg, #121212 0%, rgba(18, 18, 18, 0.00) 45.72%)'
    : 'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 31.43%, #ffffff 86%), linear-gradient(91deg, #ffffff 0%, rgb(255 255 255 / 0%) 57.72%)';
  const imageOpacity = isDarkMode ? 0.8 : 0.7;
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
        top={['0px', '-60px']}
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
            opacity: imageOpacity,
          }}
        />
      </Box>
      <Box
        position="absolute"
        width="100%"
        height="100%"
        top={['0px', '-60px']}
        zIndex="2"
        background={imageBackgroundShadow}
      />
      <Box
        w="100%"
        position="absolute"
        bottom={['1rem', '8rem', '10rem', '14rem', '20rem']}
        p={['0 1rem', '0 2rem', '0 2rem']}
        zIndex="2"
      >
        {children}
      </Box>
    </Box>
  );
};

export default TopBackground;
