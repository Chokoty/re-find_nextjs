import { Box, useColorModeValue } from '@chakra-ui/react';

// import Image from 'next/image';
import { darkMode, lightMode } from '@/styles/theme';

const PageTitleIndex = ({ children, backgroundImageUrl, isAlbum }) => {
  const bg = useColorModeValue(lightMode.bg, darkMode.bg);

  const backgroundStyle = {
    background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 60%, ${bg} 100%), linear-gradient(90deg, ${bg} 16%, rgba(15, 15, 15, 0) 72%), url(${backgroundImageUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top', // 'center',
    backgroundSize: '140%', // 'cover', // 'contain',
  };
  const backgroundStyle2 = {
    background: `linear-gradient(90deg, ${bg} 16%, rgba(15, 15, 15, 0) 72%), url(${backgroundImageUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top', // 'center',
    backgroundSize: '140%', // 'cover', // 'contain',
  };

  return (
    <Box
      w="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      position="relative"
    >
      <Box
        w="100%"
        position="absolute"
        top={['2rem', '4rem', '6rem']}
        p={['0 1rem', '0 2rem', '0 2rem']}
        zIndex="2"
      >
        {children}
      </Box>
      <Box
        w="100%"
        paddingTop="56.25%" // 16:9
        position="relative"
        top="-60px"
        style={isAlbum ? backgroundStyle2 : backgroundStyle}
        zIndex="1"
      >
        <Box
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
        ></Box>
        {/* <Box
        position="absolute"
        top="0px"
        left="0"
        right="0"
        bottom="0"
        zIndex="-2"
      >
        <Image
          src={backgroundImageUrl}
          // layout="fill"
          // objectFit="cover"
          layout="responsive"
          objectFit="cover"
          alt="Background Image"
          width={1920} // 이미지의 너비 설정
          height={1080} // 이미지의 높이 설정
        />
      </Box> */}
      </Box>
    </Box>
  );
};

export default PageTitleIndex;
