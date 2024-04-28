'use client';

import {
  Box,
  Button,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaAngleLeft } from 'react-icons/fa6';

import GALLERY_LIST, { MEMBERS } from '@/app/gallery/lib/const';
import { darkMode, lightMode } from '@/lib/theme';

import ShareLinkButton from './Button/ShareLinkButton';

const getTitleInfo = (type: string) => {
  if (type === 'galleryHome') {
    return {
      title: '팬아트 갤러리',
      description: '왁물원에 올라온 모든 팬아트들을 한 곳에서!',
    };
  }

  const album = GALLERY_LIST.find((item) => item.value === type);
  const member = MEMBERS.find((item) => item.value === type);

  return {
    title: album?.title || `${member?.name ?? ''} 팬아트`,
    description: album?.description || '',
  };
};

export default function GalleryTitle({ pageType }: { pageType: string }) {
  const router = useRouter();
  const { title, description } = getTitleInfo(pageType);
  const handleBackButton = () => {
    router.back();
  };
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  const color = isDarkMode ? 'rgb(255 255 255 / 60%)' : 'rgb(0 0 0 / 60%)';

  return (
    <Box
      display="flex"
      flexDirection="column"
      // alignItems={['center', 'flex-start']}
      // justifyContent={['center', 'flex-start']}
      alignItems={'flex-start'}
      justifyContent={'flex-start'}
      w="100%"
      minH="14rem"
    >
      {pageType === 'galleryHome' ? (
        <>
          <Box w="100%" h={['2rem', '4rem', '5rem']}></Box>
          <Text fontSize={['xs', 'md', 'xl']} fontWeight="600">
            {description}
          </Text>
          <GalleryHomeTitle />
        </>
      ) : (
        <>
          <Button
            variant="link"
            display="flex"
            alignItems="center"
            flexDir="row"
            gap="5px"
            color={color}
            onClick={handleBackButton}
            mb={['2rem', '4rem', '5rem']}
          >
            <FaAngleLeft />
            <Text color={color}>팬아트 갤러리로 돌아가기</Text>
          </Button>
          <Text
            m="0"
            as="h1"
            // fontSize={['2xl', '4xl', '5xl', '4rem']}
            fontSize={['3xl', '5xl', '3.5rem']}
            fontFamily={'ONE-Mobile-POP'}
          >
            {title}
          </Text>
          <Box mb="1.5rem">
            <Text fontWeight="bold" fontSize={['sm', 'md', 'xl']}>
              {description}
            </Text>
          </Box>
          <ShareLinkButton />
        </>
      )}
    </Box>
  );
}

const GalleryHomeTitle = () => {
  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
    >
      <Text
        m="0"
        as="h1"
        fontSize={['3xl', '5xl', '3.5rem']}
        fontFamily={'ONE-Mobile-POP'}
      >
        팬아트
      </Text>
      <Box
        className="bg-crop"
        w={['5rem', '7rem', '9rem']}
        h={['1.8rem', '2.7rem', '3.6rem']}
        position="relative"
        overflow="hidden"
        borderRadius={['3rem', '5rem']}
        backgroundColor={highlightColor}
        m="0 0.5rem"
      >
        <Image
          src="/static/images/4.png"
          alt="애기뺑띠"
          fill
          priority
          sizes="(max-width: 479px) 15vw, (max-width: 500px) 40vw, 60vw"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            objectFit: 'cover',
          }}
          unoptimized
        />
      </Box>
      <Text
        m="0"
        as="h1"
        fontSize={['3xl', '5xl', '3.5rem']}
        fontFamily={'ONE-Mobile-POP'}
        color={highlightColor}
      >
        갤러리
      </Text>
    </Box>
  );
};
