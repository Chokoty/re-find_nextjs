import { Box, Text, useColorModeValue, useMediaQuery } from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import React from 'react';

import { darkMode, lightMode } from '@/styles/theme';

interface Props {
  titleText: Record<string, string | undefined>;
  isMember: boolean;
}

const GalleryIndexTitle = () => {
  const [isLargerThanSmall] = useMediaQuery('(min-width: 30em)');
  const [isLargerThanMedium] = useMediaQuery('(min-width: 48em)');
  const bg = useColorModeValue(lightMode.bg, darkMode.bg);

  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );

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

  return (
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
  );
};

const TopTitle = ({ titleText, isMember }: Props) => {
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

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="center"
      textAlign="center"
    >
      {titleText.title === '팬아트 갤러리' ? (
        <>
          <Text fontSize={['xs', 'md', 'xl']}>{titleText?.description}</Text>
          <GalleryIndexTitle />
        </>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="flex-start"
          w="100%"
          m="0 auto"
          gap="1rem"
        >
          <Text
            m="0"
            as="h1"
            fontSize={['2xl', '4xl', '5xl', '4rem']}
            fontFamily={'ONE-Mobile-POP'}
          >
            {titleText.title}
          </Text>
          {isMember === false && (
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="flex-start"
            >
              <Text fontWeight="bold" fontSize={['sm', 'md', 'xl']}>
                {titleText?.description}
              </Text>
              <Text fontSize={['sm', 'md', 'xl']}>가 있어요.</Text>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default TopTitle;
