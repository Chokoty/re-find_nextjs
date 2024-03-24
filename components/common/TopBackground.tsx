import { Box, useColorModeValue } from '@chakra-ui/react';
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
          }}
        />
      </Box>
      <Box
        position="absolute"
        width="100%"
        height="100%"
        top="-60px"
        zIndex="2"
        background="linear-gradient(
          270deg,
          hsla(0,0%,7%,.8),
          hsla(0,0%,7%,.4) 10.88%,
          hsla(0,0%,7%,0) 20.67%,
          hsla(0,0%,7%,0) 51.23%,
          hsla(0,0%,7%,.64) 79.23%,
          #121212 100.07%
        )"
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
