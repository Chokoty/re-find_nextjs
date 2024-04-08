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
import { FaArrowRightLong } from 'react-icons/fa6';
import { MdPerson } from 'react-icons/md';

import { formatArtistValue } from '@/hook/useFormatArtistValue';
import { useModifiedImageUrl } from '@/hook/useModifiedImageUrl';
import { useResponsiveLink } from '@/hook/useResponsiveLink';
import styles from '@/styles/MasonryCard.module.scss';
import { darkMode, lightMode } from '@/styles/theme';

type Props = {
  artwork: ArtworkList | GalleryArtworkList;
};

export default function MasonryCard({ artwork }: Props) {
  const [imageHeight, setImageHeight] = useState<number | null>(null);
  // const isMobile = useResponsive();
  const article_link = useResponsiveLink('', 'article');
  const widthValue = useBreakpointValue({ base: '180px', sm: '236px' });
  const modifiedUrl300 = useModifiedImageUrl({
    url: artwork.img_url_list[0],
    size: 300,
  });
  const highlight = useColorModeValue(lightMode.highlight, darkMode.highlight);
  const authorTextColor = useColorModeValue('rgb(23, 25, 35)', '#FFFFFFB3');

  const handleImageLoad = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    setImageHeight((e.target as HTMLImageElement).height);
  };

  const authorName = 'author' in artwork ? artwork.author : '';

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
      <Box className={styles.cardContainer} position="relative">
        <Box
          width={widthValue}
          maxHeight="800px"
          overflow="hidden"
          borderRadius="20px"
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
              borderRadius: '20px',
              filter: artwork?.deleted ? 'blur(6px)' : 'none', // 블러 처리
              background: 'rgb(245, 245, 245)',
            }}
            src={
              artwork?.img_url === ''
                ? 'http://via.placeholder.com/236x236'
                : modifiedUrl300
            }
            onLoad={handleImageLoad}
            unoptimized
          />
        </Box>
        <Box
          className={styles.overlay}
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
          borderRadius="20px"
          zIndex={1}
        />
        <Flex
          className={styles.hoverContainer}
          style={
            imageHeight && imageHeight <= 200
              ? {
                  padding: 0,
                }
              : undefined
          }
          flexDir="column"
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
          borderRadius="20px"
          border="1px solid rgba(255, 255, 255, 0.70)"
          zIndex={2}
          background="rgba(0, 0, 0, 0.5)"
          justifyContent="space-between"
          alignItems="center"
          color="white"
          fontSize="2rem"
          fontWeight="bold"
          // cursor="pointer"
          p={['0.5rem 0', '1rem 0']}
        >
          <Box
            style={
              imageHeight && imageHeight <= 200
                ? {
                    display: imageHeight <= 55 ? 'none' : 'flex',
                    paddingBottom: '5px',
                    paddingTop: 0,
                    flex: 1,
                  }
                : undefined
            }
            className={styles.body}
            width="100%"
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            alignItems="center"
            h="80%"
            borderBottom="1px solid rgba(255, 255, 255, 0.70)"
            p="1rem"
          >
            <Text
              className={styles.board}
              w="100%"
              textAlign="left"
              fontSize={['sm', 'lg']}
              fontWeight="600"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {artwork.board.replace(/&#\d+;/g, '').trim()}
            </Text>
            <Flex
              className={styles.info}
              flexDir="row"
              w="100%"
              justifyContent="flex-start"
              alignItems="center"
              gap="0.5rem"
            >
              <Box
                display="flex"
                flexDir="row"
                justifyContent="center"
                alignItems="center"
                gap="0.3rem"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                maxWidth="100%"
              >
                <Box w="14px" h="14px">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </Box>
                <Text
                  fontSize={['xs', 'sm', '15px']}
                  fontWeight="400"
                  color="#FFFFFFB3"
                  textAlign="center"
                >
                  {artwork?.date?.split(' ')[0].slice(2, -1)}
                </Text>
              </Box>
              <Box
                display="flex"
                flexDir="row"
                justifyContent="center"
                alignItems="center"
                gap="0.3rem"
              >
                <FaEye
                  size="14px"
                  // style={widthValue === '180px' ? iconStyleMobile : iconStyle}
                  color="#FFFFFFB3"
                />
                <Text
                  fontSize={['xs', 'sm', '15px']}
                  fontWeight="400"
                  color="#FFFFFFB3"
                >
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
                  size="14px"
                  // style={widthValue === '180px' ? iconStyleMobile : iconStyle}
                  color="#FFFFFFB3"
                />
                <Text
                  fontSize={['xs', 'sm', '15px']}
                  fontWeight="400"
                  color="#FFFFFFB3"
                >
                  {formatArtistValue(artwork.like)}
                </Text>
              </Box>
            </Flex>
          </Box>
          <Box
            style={
              imageHeight && imageHeight <= 200
                ? {
                    paddingTop: 0,
                    flex: imageHeight <= 120 ? 1 : 0.5,
                  }
                : undefined
            }
            className={styles.footer}
            display="flex"
            flexDir="row"
            gap="0.5rem"
            justifyContent="center"
            alignItems="center"
            w="100%"
            h="20%"
            pt="1rem"
            px="1rem"
          >
            {/* <NextLink
              className={styles.btns}
              href={`/artists/${authorName}`}
              style={{
                flex: 0.5,
              }}
              prefetch={false}
            >
              <Box
                className={styles.textBox}
                w="100%"
                display="flex"
                flexDir="row"
                alignItems="center"
                justifyContent="center"
                gap="4px"
                _hover={{
                  textDecoration: 'none',
                  cursor: 'pointer',
                  backgroundColor: 'black',
                  color: 'white',
                }}
                // rel="noopener noreferrer" // 보안상의 이유료 이 부분도 추가합니다.
                borderRadius="800px"
                background="white"
                padding="8px 10px"
                fontSize="xs"
                color="black"
                transition="all 0.2s ease-in-out"
              >
                <MdPerson />
                작가
              </Box>
            </NextLink> */}
            <NextLink
              className={styles.btns}
              // href={article_link + artwork.id}
              href={`/artwork/${artwork.id}`}
              // target="_blank"
              style={{
                flex: 1,
              }}
            >
              <Box
                className={styles.textBox}
                w="100%"
                display="flex"
                flexDir="row"
                alignItems="center"
                justifyContent="center"
                gap="10px"
                _hover={{
                  textDecoration: 'none',
                  cursor: 'pointer',
                  backgroundColor: 'pink.400',
                  color: 'rgba(0, 0, 0, 0.7)',
                }}
                // rel="noopener noreferrer" // 보안상의 이유료 이 부분도 추가합니다.
                borderRadius="11px"
                background="linear-gradient(92deg, #FF4195 0%, #FF72B0 100%)"
                padding="8px 10px"
                fontSize="xs"
                color="white"
                transition="all 0.2s ease-in-out"
              >
                {/* 왁물원<span>에서 보기</span> */}
                자세히보기
                <FaArrowRightLong />
              </Box>
            </NextLink>
          </Box>
        </Flex>
      </Box>
      <Box
        h="auto"
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="start"
        mt="0.5rem"
      >
        <Text
          fontSize="md"
          textAlign="left"
          fontWeight={500}
          noOfLines={1}
          w="100%"
        >
          {artwork?.title}
        </Text>
        <NextLink href={`/artists/${authorName}`} passHref>
          <Text
            fontSize="sm"
            textAlign="left"
            color={authorTextColor}
            fontWeight={500}
            _hover={{
              color: highlight,
            }}
          >
            작가: {authorName}
          </Text>
        </NextLink>
      </Box>
    </Box>
  );
}
