import {
  Box,
  Button,
  Flex,
  Link,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import React, { useState } from 'react';
import { FaComment, FaEye, FaImage, FaThumbsUp } from 'react-icons/fa';
import { HiOutlineExternalLink } from 'react-icons/hi';

import { formatArtistValue } from '@/hook/useFormatArtistValue';
import { useModifiedImageUrl } from '@/hook/useModifiedImageUrl';
import { useResponsive } from '@/hook/useResponsive';
import { useResponsiveLink } from '@/hook/useResponsiveLink';
import { darkMode, lightMode } from '@/styles/theme';

const iconStyle = {
  width: '1rem',
  height: '1rem',
};
const iconStyleMobile = {
  width: '0.6rem',
  height: '0.6rem',
};

const MasonryCard = ({
  nickname,
  artwork,
  isFocused,
  onToggleFocus,
  isGallery,
}) => {
  const [imageHeight, setImageHeight] = useState(null);
  const isMobile = useResponsive();
  const article_link = useResponsiveLink('', 'article');
  const widthValue = useBreakpointValue({ base: '180px', sm: '236px' });
  const modifiedUrl300 = useModifiedImageUrl(artwork?.img_url_list[0], 300);
  const highlight = useColorModeValue(lightMode.highlight, darkMode.highlight);

  const handleImageLoad = (e) => {
    setImageHeight(e.target.height);
  };

  // console.log(artwork);

  return (
    <Box
      w={widthValue}
      // maxHeight="500px"
      pb="16px"
      display="inline-block"
      position="relative"
      key={artwork?.id}
      m="0 1rem"
    >
      <Box position="relative">
        <Box
          width={widthValue}
          maxHeight="800px"
          overflow="hidden"
          borderRadius="1rem"
          position="relative"
        >
          <NextImage
            alt={artwork?.title}
            width={236}
            height={236}
            style={{
              objectFit: 'cover',
              objectPosition: 'center top',
              width: '100%',
              height: '100%',
              borderRadius: '1rem',
              filter: artwork?.deleted ? 'blur(6px)' : 'none', // 블러 처리
            }}
            src={
              artwork?.img_url === ''
                ? 'http://via.placeholder.com/236x236'
                : modifiedUrl300
            }
            unoptimized
            onLoad={handleImageLoad}
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
          onClick={() => onToggleFocus(artwork?.id)}
          onMouseEnter={() => onToggleFocus(artwork?.id)}
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
              {artwork.board}
            </Text>

            {imageHeight >= 212 && (
              <>
                <Flex
                  flexDir="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text
                    fontSize={['sm', 'xl']}
                    fontWeight="400"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    maxWidth="100%"
                    textAlign="center"
                  >
                    {artwork?.author}
                  </Text>
                  <Text
                    fontSize={['sm', 'xl']}
                    fontWeight="400"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    maxWidth="100%"
                    textAlign="center"
                  >
                    {artwork?.date?.split(' ')[0].slice(0, -1)}
                  </Text>
                </Flex>
                <Flex
                  flexDir="row"
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                  // w="90%"
                  gap="1rem"
                >
                  <Box
                    display="flex"
                    flexDir="row"
                    justifyContent="center"
                    alignItems="center"
                    gap="0.3rem"
                  >
                    <FaEye style={isMobile ? iconStyleMobile : iconStyle} />
                    <Text fontSize={['xs', 'lg']} fontWeight="400">
                      {formatArtistValue(artwork.view)}
                    </Text>
                  </Box>
                  <Box
                    display="flex"
                    flexDir="row"
                    justifyContent="center"
                    alignItems="center"
                    gap="0.3rem"
                  >
                    <FaThumbsUp
                      style={isMobile ? iconStyleMobile : iconStyle}
                    />
                    <Text fontSize={['xs', 'lg']} fontWeight="400">
                      {formatArtistValue(artwork.like)}
                    </Text>
                  </Box>
                  <Box
                    display="flex"
                    flexDir="row"
                    justifyContent="center"
                    alignItems="center"
                    gap="0.3rem"
                  >
                    <FaComment style={isMobile ? iconStyleMobile : iconStyle} />
                    <Text fontSize={['xs', 'lg']} fontWeight="400">
                      {formatArtistValue(artwork.comments)}
                    </Text>
                  </Box>
                </Flex>
              </>
            )}
            {imageHeight < 212 && (
              <>
                {imageHeight > 140 && (
                  <Text
                    fontSize={['xs', 'sm']}
                    fontWeight="400"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    maxWidth="100%"
                    textAlign="center"
                  >
                    {artwork?.date?.split(' ')[0].slice(0, -1)}
                  </Text>
                )}
                <Flex
                  flexDir="row"
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                  // w="100%"
                  gap="1rem"
                >
                  <Box>
                    <FaEye style={iconStyle} />
                    <Text fontSize={['xs', 'sm']} fontWeight="400">
                      {formatArtistValue(artwork.view)}
                    </Text>
                  </Box>
                  <Box>
                    <FaThumbsUp style={iconStyle} />
                    <Text fontSize={['xs', 'sm']} fontWeight="400">
                      {formatArtistValue(artwork.like)}
                    </Text>
                  </Box>
                  <Box>
                    <FaComment style={iconStyle} />
                    <Text fontSize={['xs', 'sm']} fontWeight="400">
                      {formatArtistValue(artwork.comments)}
                    </Text>
                  </Box>
                </Flex>
              </>
            )}
            <Flex
              w="100%"
              flexDir="row"
              justifyContent="center"
              alignItems="center"
            >
              {isGallery && (
                <Button
                  _hover={{
                    textDecoration: 'none',
                    cursor: 'pointer',
                    backgroundColor: 'cyan.400',
                  }}
                  // target="_blank"
                  // rel="noopener noreferrer" // 보안상의 이유료 이 부분도 추가합니다.
                  colorScheme="cyan"
                  borderRadius="1rem"
                  w="30%"
                  h={['2.5rem', '3rem']}
                  mr="1rem"
                >
                  <NextLink href={`/artists/${artwork?.author}`} passHref>
                    <Text
                      textAlign="center"
                      alignItems="center"
                      fontSize={['xs', 'md']}
                    >
                      작가
                    </Text>
                  </NextLink>
                </Button>
              )}
              <Button
                as={Link}
                className="link_to_wakzoo"
                href={article_link + artwork.id}
                isExternal
                _hover={{
                  textDecoration: 'none',
                  cursor: 'pointer',
                  backgroundColor: 'green.400',
                }}
                target="_blank"
                rel="noopener noreferrer" // 보안상의 이유료 이 부분도 추가합니다.
                colorScheme="green"
                borderRadius="1rem"
                w="40%"
                h={['2.5rem', '3rem']}
              >
                <Text fontSize={['xs', 'md']}>왁물원</Text> &nbsp;
                <HiOutlineExternalLink />
              </Button>
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
        <Text fontWeight={500} noOfLines={1} w="100%">
          {artwork?.title}
        </Text>
        {isGallery && (
          <NextLink href={`/artists/${artwork?.author}`} passHref>
            <Text color={highlight} fontWeight={500}>
              작가: {artwork?.author}
            </Text>
          </NextLink>
        )}
      </Box>
    </Box>
  );
};

export default MasonryCard;
