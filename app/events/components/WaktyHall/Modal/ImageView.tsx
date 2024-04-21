import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import React, { useState } from 'react';
import { HiOutlineExternalLink } from 'react-icons/hi';

import { useResponsiveLink } from '@/hooks/useResponsiveLink';
import { darkMode, lightMode } from '@/lib/theme';

// const iconStyle = {
//   width: '1rem',
//   height: '1rem',
// };
// const iconStyleMobile = {
//   width: '0.6rem',
//   height: '0.6rem',
// };

type Props = {
  width: number;
  nickname: string;
  artwork: DoorBehindFanart;
  isFocused: boolean;
  onToggleFocus: (id: number | null) => void;
  isGallery: boolean;
};

export default function ImageView({
  width,
  artwork,
  isFocused,
  onToggleFocus,
  isGallery,
}: Props) {
  const [imageHeight, setImageHeight] = useState<number | null>(null);
  // const isMobile = useResponsive();
  const article_link = useResponsiveLink('', 'article');
  // const widthValue = useBreakpointValue({ base: '180px', sm: '236px' });
  const highlight = useColorModeValue(lightMode.highlight, darkMode.highlight);

  const handleImageLoad = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    setImageHeight((e.target as HTMLImageElement).height);
  };

  const { img_url, nickname, title, url, board } = artwork;

  return (
    <Box
      w={`${width}px`}
      // maxHeight="500px"
      pb="16px"
      display="inline-block"
      position="relative"
      m="0 1rem"
    >
      <Box position="relative">
        <Box
          width={`${width}px`}
          maxHeight="800px"
          overflow="hidden"
          borderRadius="1rem"
          position="relative"
        >
          <NextImage
            alt={title}
            width={236}
            height={236}
            style={{
              objectFit: 'cover',
              objectPosition: 'center top',
              width: '100%',
              height: '100%',
              borderRadius: '1rem',
            }}
            src={img_url ?? 'http://via.placeholder.com/236x236'}
            onLoad={handleImageLoad}
            unoptimized
          />
        </Box>
        <Box
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
          borderRadius="1rem"
          zIndex={1}
          background={isFocused ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.0)'}
          onClick={() => onToggleFocus(0)}
          onMouseEnter={() => onToggleFocus(0)}
        />
        {isFocused && (
          // <Link
          //   className="link-to-wakzoo-from-profile"
          //   href={artwork?.id ? article_link + artwork.id : '#'}
          //   isExternal
          // >
          <Flex
            flexDir="column"
            position="absolute"
            top={0}
            right={0}
            bottom={0}
            left={0}
            borderRadius="1rem"
            zIndex={2}
            background="rgba(0, 0, 0, 0.3)"
            justifyContent="space-between"
            alignItems="center"
            color="white"
            fontSize="2rem"
            fontWeight="bold"
            cursor="pointer"
            p={['0.5rem ', '1rem 0']}
            onMouseLeave={() => onToggleFocus(null)}
          >
            <Text
              fontSize={['sm', 'xl']}
              fontWeight="600"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              maxWidth="100%"
            >
              {board}
            </Text>
            <Flex
              w="100%"
              flexDir="row"
              justifyContent="center"
              alignItems="center"
            >
              {isGallery && (
                <NextLink
                  href={`https://re-find.xyz/artists/${nickname}`}
                  target="_blank"
                  style={{
                    background: 'cyan',
                    borderRadius: '1rem',
                    width: '30%',
                    height: '3rem',
                    marginRight: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    textAlign="center"
                    alignItems="center"
                    fontSize={['xs', 'md']}
                  >
                    작가
                  </Text>
                </NextLink>
              )}
              <NextLink
                href={article_link + url.split('/').at(-1)}
                target="_blank"
                style={{
                  background: '#48bb78',
                  borderRadius: '1rem',
                  width: '40%',
                  height: '3rem',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <Text fontSize={['xs', 'md']}>왁물원</Text>
                <HiOutlineExternalLink size="1rem" />
              </NextLink>
            </Flex>
          </Flex>
          // </Link>
        )}
      </Box>
      <Box
        h="auto"
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        mt="0.5rem"
      >
        <Text textAlign="center" fontWeight={500} noOfLines={1} w="100%">
          {title}
        </Text>
        {isGallery && (
          <NextLink
            href={`https://re-find.xyz/artists/${nickname}`}
            target="_blank"
          >
            <Text textAlign="center" color={highlight} fontWeight={500}>
              작가: {nickname}
            </Text>
          </NextLink>
        )}
      </Box>
    </Box>
  );
}
