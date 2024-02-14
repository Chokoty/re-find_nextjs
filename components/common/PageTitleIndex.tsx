import { Box, Text, useColorModeValue, useMediaQuery } from '@chakra-ui/react';
import Image from 'next/image';

import { darkMode, lightMode } from '@/styles/theme';

const PageTitleIndex = ({ topTitle }) => {
  const [isLargerThanSmall] = useMediaQuery('(min-width: 30em)');
  const [isLargerThanMedium] = useMediaQuery('(min-width: 48em)');
  const bg = useColorModeValue(lightMode.bg, darkMode.bg);

  let imageWidth = 150; // 기본 이미지 너비
  let top = '-2rem'; // 기본 이미지 왼쪽으로 이동
  let left = '0.3rem'; // 기본 이미지 왼쪽으로 이동

  if (isLargerThanMedium) {
    imageWidth = 150; // 화면 크기가 48em 이상인 경우
  } else if (isLargerThanSmall) {
    imageWidth = 75; // 화면 크기가 30em 이상인 경우
    top = '-1rem'; // 이미지 왼쪽으로 이동
    left = '0.6rem'; // 이미지 왼쪽으로 이동
  } else {
    imageWidth = 50; // 화면 크기가 30em 미만인 경우
    top = '-0.7rem'; // 이미지 왼쪽으로 이동
    left = '0.3rem'; // 이미지 왼쪽으로 이동
  }

  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );

  const backgroundImageUrl = '/static/images/gallery/1683378368884.jpg'; // 배경 이미지 URL

  const backgroundStyle = {
    background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, ${bg} 100%), linear-gradient(90deg, ${bg} 0%, rgba(15, 15, 15, 0) 72%), url(${backgroundImageUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <Box
      w="100%"
      h="50em"
      style={backgroundStyle}
      position="relative"
      top="-60px"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
        textAlign="center"
        w="90%"
        m="10rem auto"
      >
        <Text fontSize={['sm', 'md', 'xl']}>{topTitle?.description}</Text>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-start"
          w="100%"
          m="0 auto"
        >
          <Text
            m="0"
            as="h1"
            fontSize={['3xl', '5xl', '4rem']}
            fontFamily={'ONE-Mobile-POP'}
          >
            팬아트
          </Text>
          <Box
            className="bg-crop"
            w={['4rem', '6rem', '10rem']}
            h={['2rem', '3rem', '4rem']}
            position="relative"
            overflow="hidden"
            borderRadius={['3rem', '5rem']}
            backgroundColor={highlightColor}
            m="0 0.5rem"
          >
            <Image
              src="/static/images/4.png"
              alt="애기뺑띠"
              width={imageWidth}
              height={imageWidth}
              style={{
                position: 'absolute',
                top,
                left,
              }}
            />
          </Box>
          <Text
            m="0"
            as="h1"
            fontSize={['3xl', '5xl', '4rem']}
            fontFamily={'ONE-Mobile-POP'}
            color={highlightColor}
          >
            갤러리
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default PageTitleIndex;
