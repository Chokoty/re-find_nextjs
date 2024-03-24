import { Box, useColorMode, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';
import type { ReactNode } from 'react';

import { Isd } from '@/data/vectors';
// import Image from 'next/image';
import { darkMode, lightMode } from '@/styles/theme';

interface TopBackgroundProps {
  children: ReactNode;
  isAlbum: boolean;
}

const TopBackground = ({ children, isAlbum }: TopBackgroundProps) => {
  const bg = useColorModeValue(lightMode.bg, darkMode.bg);

  // const backgroundStyle = {
  //   background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 60%, ${bg} 100%), linear-gradient(90deg, ${bg} 16%, rgba(15, 15, 15, 0) 72%), url(${backgroundImageUrl})`,
  //   backgroundRepeat: 'no-repeat',
  //   backgroundPosition: 'top', // 'center',
  //   backgroundSize: '140%', // 'cover', // 'contain',
  // };
  // const backgroundStyle2 = {
  //   background: `linear-gradient(90deg, ${bg} 16%, rgba(15, 15, 15, 0) 72%), url(${backgroundImageUrl})`,
  //   backgroundRepeat: 'no-repeat',
  //   backgroundPosition: 'top', // 'center',
  //   backgroundSize: '140%', // 'cover', // 'contain',
  // };
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  const imageBackgroundShadow = isDarkMode
    ? 'linear-gradient(180deg, hsl(233deg 38% 8% / 80%), hsl(233deg 38% 8% / 40%) 10.88%, hsl(233deg 38% 8% / 0%) 20.67%, hsl(233deg 38% 8% / 0%) 51.23%, hsl(233deg 38% 8% / 64%) 79.23%, hsl(233 38% 8% / 1) 100.07%)'
    : 'linear-gradient(180deg, rgb(245 246 251 / 80%), hsl(0deg 0% 100% / 40%) 0%, hsl(0deg 0% 100% / 0%) 60%, #f5f6fb 87.23%, #f5f6fb 82.23%, #f5f6fb 23.07%)';

  return (
    <Box
      as="section"
      w="100%"
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
          src={Isd}
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
