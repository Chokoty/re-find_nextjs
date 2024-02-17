import { Box, useColorModeValue } from '@chakra-ui/react';

// import Image from 'next/image';
import { darkMode, lightMode } from '@/styles/theme';

const PageTitleIndex = ({ backgroundImageUrl }) => {
  const bg = useColorModeValue(lightMode.bg, darkMode.bg);

  const backgroundStyle = {
    background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 60%, ${bg} 100%), linear-gradient(90deg, ${bg} 16%, rgba(15, 15, 15, 0) 72%), url(${backgroundImageUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '140%', // 'cover','contain',
  };

  return (
    <Box
      w="100%"
      paddingTop="56.25%" // 16:9
      position="relative"
      top="-60px"
      style={backgroundStyle}
    >
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
      {/* {children} */}
    </Box>
  );
};

export default PageTitleIndex;
