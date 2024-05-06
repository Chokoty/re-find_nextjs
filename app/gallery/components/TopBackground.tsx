'use client';

import { Box, useColorMode, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import { getStaticImage } from '@/app/gallery/lib/getStaticImage';
import { darkMode, lightMode } from '@/lib/theme';

interface TopBackgroundProps {
  children: ReactNode;
}

const TopBackground = ({ children }: TopBackgroundProps) => {
  const { colorMode } = useColorMode();
  const bg = useColorModeValue(lightMode.bg, darkMode.bg);
  const isDarkMode = colorMode === 'dark';
  const pathname = usePathname().replace('/gallery', '');
  const bgStaticSrc = getStaticImage(pathname.slice(1));
  const imageBackgroundShadow = isDarkMode
    ? `linear-gradient(180deg, ${bg}80 51.43%, ${bg} 100%),linear-gradient(75deg, ${bg} 0%, ${bg}00 45.72%)`
    : `linear-gradient(180deg, ${bg}00 31.43%, ${bg} 86%),linear-gradient(91deg, ${bg} 0%, ${bg}00 57.72%)`;
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
          unoptimized
        />
      </Box>
      <Box
        position="absolute"
        width="100%"
        height="100%"
        top={['0px', '-59px']} // 4k screen으로가면 +1을 해주어 shadow를 아래로 내려줘야 뜨는 현상이 없어진다.
        zIndex="2"
        background={imageBackgroundShadow}
      />
      <Box
        w="100%"
        h={['100%', 'unset']}
        display={['flex', 'block']}
        position="absolute"
        // bottom={['1rem', '8rem', '10rem', '14rem', '20rem']}
        // top={['-2rem', '4rem', '8rem', '10rem']}
        top="0"
        mt="1rem"
        p={['0 1rem', '0 2rem', '0 2rem']}
        zIndex="2"
      >
        {children}
      </Box>
    </Box>
  );
};

export default TopBackground;
